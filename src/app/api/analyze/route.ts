import { NextResponse } from 'next/server';
import { analyzeCheckIn } from '@/services/ai';
import { addCheckIn, getPatient } from '@/services/db';

export async function POST(req: Request) {
  try {
    const { patientId, text, mood, history, baseline } = await req.json();

    if (!patientId || !text || !mood) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Fetch patient data if not provided in the request
    let patientHistory = history || [];
    let patientBaseline = baseline || 20;

    if (!history || !baseline) {
      const patient = await getPatient(patientId);
      if (patient) {
        patientHistory = patient.history;
        patientBaseline = patient.baselineDistress;
      }
    }

    // 1. Analyze with AI using the new schema
    const analysis = await analyzeCheckIn(text, patientHistory, patientBaseline);

    // 2. Save check-in
    const checkIn = await addCheckIn({
      patientId,
      date: new Date().toISOString(),
      text,
      mood,
      sentiment: analysis.sentiment,
      distressScore: analysis.distressScore,
      stressLevel: analysis.stressLevel,
      linguisticDriftScore: analysis.linguisticDrift,
      riskLevel: analysis.riskLevel,
      explanation: analysis.explanation,
      signals: analysis.signals,
      confidence: analysis.confidence
    });

    return NextResponse.json({ checkIn, analysis });
  } catch (error) {
    console.error('Error processing check-in:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
