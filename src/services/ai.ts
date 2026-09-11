import { GoogleGenAI } from '@google/genai';
import { CheckIn } from '@/lib/types';

export interface AIAnalysisResult {
  sentiment: string;
  distressScore: number;
  stressLevel: 'low' | 'moderate' | 'high';
  linguisticDrift: number;
  riskLevel: 'low' | 'moderate' | 'high';
  signals: string[];
  explanation: string[];
  confidence: number;
}

// Deterministic mock fallback
function getMockAnalysis(text: string, history: CheckIn[], baseline: number): AIAnalysisResult {
  const lowerText = text.toLowerCase();
  
  let distressScore = baseline || 20;
  let stressLevel: 'low' | 'moderate' | 'high' = 'low';
  let linguisticDrift = 10;
  let sentiment = 'Neutral';
  let riskLevel: 'low' | 'moderate' | 'high' = 'low';
  const signals: string[] = [];
  const explanation: string[] = [];
  
  if (lowerText.includes('tired') || lowerText.includes('exhausted')) {
    distressScore += 20;
    signals.push("Fatigue");
    sentiment = 'Slightly Negative';
  }
  
  if (lowerText.includes('sleep') || lowerText.includes('awake')) {
    distressScore += 15;
    signals.push("Sleep Disruption");
  }
  
  if (lowerText.includes('hard') || lowerText.includes('overwhelmed') || lowerText.includes('too much')) {
    distressScore += 30;
    linguisticDrift += 25;
    signals.push("Overwhelmed");
    sentiment = 'Negative';
  }
  
  if (lowerText.includes('memory') || lowerText.includes('memories') || lowerText.includes('flashback')) {
    distressScore += 40;
    linguisticDrift += 20;
    signals.push("Intrusive Memories");
    sentiment = 'Very Negative';
  }
  
  if (lowerText.includes('hopeless') || lowerText.includes('give up')) {
    distressScore += 45;
    linguisticDrift += 40;
    signals.push("Hopelessness");
    sentiment = 'Very Negative';
  }

  // Cap scores
  distressScore = Math.min(100, distressScore);
  linguisticDrift = Math.min(100, linguisticDrift);

  if (distressScore > 75) {
    stressLevel = 'high';
    riskLevel = 'high';
    explanation.push("Elevated distress markers detected.");
    explanation.push("Strong negative language and potential trauma recall patterns.");
  } else if (distressScore > 50) {
    stressLevel = 'moderate';
    riskLevel = 'moderate';
    explanation.push("Moderate stress indicators present.");
    explanation.push("Some negative sentiment but mostly consistent with normal daily stress.");
  } else {
    stressLevel = 'low';
    riskLevel = 'low';
    explanation.push("Language indicates stability.");
    explanation.push("No acute distress markers detected.");
  }

  if (signals.length === 0) {
    signals.push("Routine communication");
  }

  return {
    sentiment,
    distressScore,
    stressLevel,
    linguisticDrift,
    riskLevel,
    signals,
    explanation,
    confidence: 0.85
  };
}

export async function analyzeCheckIn(text: string, history: CheckIn[], baseline: number): Promise<AIAnalysisResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  
  if (!apiKey) {
    console.log("No GEMINI_API_KEY found, using deterministic demo mode.");
    await new Promise(resolve => setTimeout(resolve, 1500));
    return getMockAnalysis(text, history, baseline);
  }

  try {
    const ai = new GoogleGenAI({ apiKey });
    
    // Formatting history for the prompt
    const historyText = history.slice(-5).map(h => `- Date: ${h.date}, Text: "${h.text}", Distress: ${h.distressScore}`).join('\n');

    const prompt = `
      You are an AI assistant for "MannRakshak", a Mental Health Monitoring System for victims of atrocities.
      Your job is to analyze a current check-in message based on previous check-in history and a personal baseline.
      Do NOT diagnose mental illness or predict suicide. 
      Provide decision support by identifying distress signals, stress levels, and linguistic drift.
      
      Personal Baseline Distress Score: ${baseline}/100
      
      Recent History (up to 5 check-ins):
      ${historyText || "No prior history available."}
      
      Current Check-in Text: "${text}"
      
      Respond ONLY with a valid JSON object matching this exact schema:
      {
        "sentiment": "String (e.g., Neutral, Negative, Very Negative)",
        "distressScore": Number (0-100),
        "stressLevel": "low" | "moderate" | "high",
        "linguisticDrift": Number (0-100, deviation from stable baseline language),
        "riskLevel": "low" | "moderate" | "high",
        "signals": ["Array", "of", "String", "signals like 'Fatigue', 'Hopelessness'"],
        "explanation": ["Array", "of", "2-3 strings", "briefly explaining the reasoning behind the scores"],
        "confidence": Number (0-1, e.g., 0.9 for high confidence)
      }
    `;

    const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
            responseMimeType: 'application/json',
        }
    });

    const resultText = response.text;
    if (!resultText) {
        throw new Error("Empty response from Gemini");
    }
    
    const parsed = JSON.parse(resultText) as AIAnalysisResult;
    return parsed;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    console.log("Falling back to demo mode due to API error.");
    return getMockAnalysis(text, history, baseline);
  }
}
