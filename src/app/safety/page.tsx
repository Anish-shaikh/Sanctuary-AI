'use client';

import { ShieldCheck, EyeOff, Lock, AlertTriangle, Phone } from 'lucide-react';

export default function SafetyPage() {
  const helplines = [
    { name: "NHAA National Helpline", number: "14566", type: "primary" },
    { name: "Police Emergency", number: "112", type: "emergency" },
    { name: "Women Helpline", number: "1091", type: "secondary" }
  ];

  return (
    <div className="space-y-6 pb-6">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <ShieldCheck className="w-6 h-6 text-[#8A5A3B]" />
          Safety & Privacy
        </h1>
        <p className="text-sm text-muted-foreground mt-1">
          Your safety is our priority. Use these tools to protect yourself and your data.
        </p>
      </div>

      {/* Quick Exit (Panic Button) */}
      <button className="w-full bg-[#B82E2E] hover:bg-[#962525] transition text-white p-6 rounded-2xl flex flex-col items-center justify-center shadow-lg active:scale-95">
        <AlertTriangle className="w-10 h-10 mb-2" />
        <span className="text-xl font-bold uppercase tracking-widest">Quick Exit</span>
        <span className="text-xs text-red-200 mt-1">Instantly closes app & clears screen</span>
      </button>

      {/* Privacy Tools */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-card border border-border p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-muted transition">
          <div className="bg-muted p-3 rounded-full text-foreground">
            <EyeOff className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-foreground">Camouflage</h3>
          <p className="text-[10px] text-muted-foreground">Disguise app as calendar</p>
        </div>
        
        <div className="bg-card border border-border p-4 rounded-xl flex flex-col items-center justify-center text-center gap-2 cursor-pointer hover:bg-muted transition">
          <div className="bg-muted p-3 rounded-full text-foreground">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="font-bold text-sm text-foreground">Evidence Vault</h3>
          <p className="text-[10px] text-muted-foreground">Securely save media</p>
        </div>
      </div>

      {/* Helplines */}
      <div>
        <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <Phone className="w-4 h-4 text-[#8A5A3B]" />
          Emergency Helplines
        </h3>
        <div className="space-y-3">
          {helplines.map((helpline, idx) => (
            <div key={idx} className="bg-card border border-border p-4 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-foreground text-sm">{helpline.name}</h4>
                <p className="text-sm text-muted-foreground mt-0.5">Call now for immediate help</p>
              </div>
              <a 
                href={`tel:${helpline.number}`} 
                className={`px-4 py-2 rounded-lg font-bold flex items-center gap-2 ${
                  helpline.type === 'emergency' 
                    ? 'bg-[#B82E2E] text-white' 
                    : helpline.type === 'primary' 
                      ? 'bg-[#365A71] text-white' 
                      : 'bg-muted text-foreground'
                }`}
              >
                <Phone className="w-4 h-4" />
                {helpline.number}
              </a>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
