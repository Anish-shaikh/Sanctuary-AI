"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { Mic, Send, HeartPulse, Shield, FileText } from "lucide-react";

const GREETINGS: Record<string, string> = {
  "हिन्दी (Hindi)": "नमस्ते पूजा जी। मैं सुरक्षा साथी (Sanctuary AI) हूँ। आप पूरी तरह सुरक्षित हैं। आज आपका मन कैसा महसूस कर रहा है? आप किसी भी चिंता या डर के बारे में खुलकर बता सकती हैं।",
  "English": "Hello Pooja. I am your Sanctuary AI Companion. You are completely safe. How are you feeling today? You can openly share any worries or fears you might have.",
  "Tamil": "வணக்கம் பூஜா. நான் உங்கள் சங்சுவரி AI தோழன். நீங்கள் முற்றிலும் பாதுகாப்பாக உள்ளீர்கள். இன்று நீங்கள் எப்படி உணருகிறீர்கள்?",
  "Telugu": "నమస్తే పూజా. నేను మీ శాంక్చువరీ AI సహచరుడిని. మీరు పూర్తిగా సురక్షితంగా ఉన్నారు. ఈ రోజు మీరు ఎలా భావిస్తున్నారు?",
  "Marathi": "नमस्कार पूजा. मी तुझा सँक्चुअरी एआय सोबती आहे. तू पूर्णपणे सुरक्षित आहेस. आज तुला कसं वाटतंय?",
  "Bengali": "নমস্কার পূজা। আমি আপনার স্যাংচুয়ারি এআই সঙ্গী। আপনি সম্পূর্ণ নিরাপদ। আজ আপনার কেমন লাগছে?"
};

const AI_RESPONSE: Record<string, string> = {
  "हिन्दी (Hindi)": "साझा करने के लिए धन्यवाद। मैं अब आपके काउंसलर के लिए एक डिस्ट्रेस रिपोर्ट तैयार करने के लिए आपके इनपुट का विश्लेषण करूंगा। क्या आप चाहते हैं कि मैं अभी इस रिपोर्ट का विश्लेषण करूं?",
  "English": "Thank you for sharing. I will now analyze your inputs to generate a distress report for your counsellor. Would you like me to analyze this report now?",
  "Tamil": "பகிர்ந்தமைக்கு நன்றி. நான் இப்போது உங்கள் அறிக்கையை பகுப்பாய்வு செய்கிறேன்.",
  "Telugu": "పంచుకున్నందుకు ధన్యవాదాలు. నేను ఇప్పుడు మీ నివేదికను విశ్లేషిస్తాను.",
  "Marathi": "सामायिक केल्याबद्दल धन्यवाद. मी आता तुमच्या अहवालाचे विश्लेषण करेन.",
  "Bengali": "শেয়ার করার জন্য ধন্যবাদ। আমি এখন আপনার রিপোর্ট বিশ্লেষণ করব।"
};

interface Message {
  id: string;
  role: 'ai' | 'user';
  text: string;
  isInitial?: boolean;
}

export default function CheckInPage() {
  const router = useRouter();
  const [text, setText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("हिन्दी (Hindi)");
  const [messages, setMessages] = useState<Message[]>([]);
  const [showAnalyzeButton, setShowAnalyzeButton] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Using Mock Patient 1 for the demo
  const MOCK_PATIENT_ID = "p1"; 

  // Set initial message when language changes (if no user messages exist)
  useEffect(() => {
    const hasUserMessages = messages.some(m => m.role === 'user');
    if (!hasUserMessages) {
      setMessages([{ id: 'init', role: 'ai', text: GREETINGS[selectedLanguage], isInitial: true }]);
    }
  }, [selectedLanguage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    // Add user message
    const newMessages = [...messages, { id: Date.now().toString(), role: 'user' as const, text }];
    setMessages(newMessages);
    setText("");
    
    // Simulate AI response
    setTimeout(() => {
      const responseText = AI_RESPONSE[selectedLanguage] || AI_RESPONSE["English"];
      setMessages(prev => [...prev, { id: (Date.now() + 1).toString(), role: 'ai', text: responseText }]);
      setShowAnalyzeButton(true);
    }, 1000);
  };

  const handleAnalyze = async () => {
    setIsSubmitting(true);
    
    // Combine all user messages for analysis
    const combinedText = messages.filter(m => m.role === 'user').map(m => m.text).join('\n');
    
    try {
      const res = await fetch('/api/analyze', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          patientId: MOCK_PATIENT_ID,
          text: combinedText,
          mood: "Neutral" // Defaulting since we removed the mood dropdown to match UI
        })
      });
      
      const data = await res.json();
      
      if (res.ok && data.checkIn) {
        router.push(`/check-in/result?id=${data.checkIn.id}`);
      } else {
        console.error("Failed to submit", data);
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error(error);
      setIsSubmitting(false);
    }
  };

  const languages = ["हिन्दी (Hindi)", "English", "Tamil", "Telugu", "Marathi", "Bengali"];
  const chips = ["Threat Encountered", "Court Anxiety", "Compensation Delay", "Grounding Exercise"];

  return (
    <div className="flex flex-col min-h-[calc(100vh-220px)] justify-between">
      
      {/* Top Language Selector */}
      <div className="flex items-center gap-3 overflow-x-auto py-2 no-scrollbar border-b border-border/50 pb-4 shrink-0">
        {languages.map((lang) => (
          <button 
            key={lang} 
            onClick={() => setSelectedLanguage(lang)}
            className={`px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap border transition ${
              selectedLanguage === lang 
                ? 'bg-[#8A5A3B] text-white border-[#8A5A3B]' 
                : 'bg-background text-muted-foreground border-border hover:bg-muted'
            }`}
          >
            {lang}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div className="flex-1 py-6 space-y-4 overflow-y-auto no-scrollbar">
        {messages.map((msg) => (
          <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] rounded-2xl p-4 ${
              msg.role === 'user' 
                ? 'bg-[#365A71] text-white rounded-br-sm' 
                : 'bg-[#F8F5F2] border border-border rounded-bl-sm text-foreground'
            }`}>
              {msg.role === 'ai' && msg.isInitial && (
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="h-4 w-4 text-[#8A5A3B]" />
                  <span className="text-xs font-bold">Sanctuary AI - Trauma Companion</span>
                  <span className="text-[10px] font-bold text-white bg-[#B82E2E] px-2 rounded-sm">HIGH (75/100)</span>
                </div>
              )}
              
              <p className="text-sm leading-relaxed">{msg.text}</p>
              
              {msg.role === 'ai' && msg.isInitial && (
                <div className="bg-[#EBE2D9] text-[#8A5A3B] text-xs font-medium px-3 py-1.5 rounded-md flex items-center gap-2 w-fit mt-3">
                  <HeartPulse className="h-3 w-3" />
                  Detected Emotion: Apprehension & Vigilance
                </div>
              )}
            </div>
          </div>
        ))}
        
        {/* Analyze Button appearing after user sends a message */}
        {showAnalyzeButton && (
          <div className="flex justify-start">
            <button 
              onClick={handleAnalyze}
              disabled={isSubmitting}
              className="bg-[#B82E2E] text-white px-5 py-3 rounded-xl font-bold flex items-center gap-2 hover:bg-[#962525] transition shadow-md disabled:opacity-50"
            >
              {isSubmitting ? (
                <span className="h-5 w-5 block border-2 border-white border-t-transparent rounded-full animate-spin"></span>
              ) : (
                <FileText className="w-5 h-5" />
              )}
              Analyze Report Now
            </button>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Bottom Input Area */}
      <div className="space-y-3 pt-4 shrink-0 mt-auto">
        {/* Quick Chips */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
          {chips.map(chip => (
            <button 
              key={chip} 
              type="button"
              onClick={() => setText(prev => prev ? `${prev} ${chip}` : chip)}
              className="px-3 py-1.5 bg-background border border-border rounded-full text-[10px] font-bold text-[#8A5A3B] whitespace-nowrap hover:bg-muted transition"
            >
              {chip}
            </button>
          ))}
        </div>

        {/* Input Bar */}
        <form onSubmit={handleSendMessage} className="flex items-center gap-3">
          <button type="button" className="p-3 bg-[#B82E2E] text-white rounded-full hover:bg-[#962525] transition shrink-0">
            <Mic className="h-5 w-5" />
          </button>
          <div className="flex-1 bg-background border border-border rounded-full flex items-center px-4 py-1 h-12 shadow-sm">
            <input 
              type="text" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder={`Share your thoughts in ${selectedLanguage.split(' ')[0]}...`} 
              className="flex-1 bg-transparent border-none outline-none text-sm text-foreground placeholder:text-muted-foreground"
            />
          </div>
          <button 
            type="submit" 
            disabled={!text.trim()}
            className="p-3 bg-[#D4C3B3] text-[#8A5A3B] rounded-full hover:bg-[#C2AE9C] transition shrink-0 disabled:opacity-50"
          >
             <Send className="h-5 w-5" />
          </button>
        </form>
      </div>

    </div>
  );
}
