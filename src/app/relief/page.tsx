'use client';

import { CheckCircle2, Circle, FileText, AlertCircle, IndianRupee } from 'lucide-react';

export default function ReliefPage() {
  const milestones = [
    { title: "FIR Registered", date: "12 Oct 2026", status: "completed" },
    { title: "Investigation", date: "In Progress", status: "current" },
    { title: "Charge-sheet", date: "Pending", status: "upcoming" }
  ];

  const entitlements = [
    { title: "Travel Allowance", amount: "₹500 / hearing", status: "Available" },
    { title: "Interim Relief", amount: "25% of ₹85,000", status: "Processing" },
  ];

  return (
    <div className="space-y-6 pb-6">
      
      {/* Current Stage */}
      <div className="bg-[#365A71] text-white p-6 rounded-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-4 opacity-20">
          <FileText className="w-24 h-24" />
        </div>
        <h2 className="text-sm font-bold text-blue-200 mb-1 tracking-widest uppercase">Current Status</h2>
        <h1 className="text-3xl font-bold mb-2">Stage 2: Investigation</h1>
        <p className="text-sm text-blue-100 max-w-sm">
          The police are currently collecting evidence. Your designated Investigating Officer is DSP R. Sharma.
        </p>
      </div>

      {/* Progress Tracker */}
      <div className="bg-card border border-border p-5 rounded-xl space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-[#8A5A3B]" />
          Case Progress
        </h3>
        
        <div className="relative pl-2 space-y-6">
          <div className="absolute left-[15px] top-3 bottom-3 w-0.5 bg-border"></div>
          
          {milestones.map((milestone, idx) => (
            <div key={idx} className="relative flex gap-4">
              <div className="bg-card relative z-10 pt-0.5">
                {milestone.status === "completed" ? (
                  <CheckCircle2 className="w-5 h-5 text-green-600 bg-white rounded-full" />
                ) : milestone.status === "current" ? (
                  <div className="w-5 h-5 border-4 border-[#365A71] bg-white rounded-full"></div>
                ) : (
                  <Circle className="w-5 h-5 text-muted-foreground bg-white" />
                )}
              </div>
              <div>
                <h4 className={`font-bold ${milestone.status === "upcoming" ? "text-muted-foreground" : "text-foreground"}`}>
                  {milestone.title}
                </h4>
                <p className="text-xs text-muted-foreground">{milestone.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Entitlements */}
      <div>
        <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
          <IndianRupee className="w-4 h-4 text-[#8A5A3B]" />
          Your Entitlements
        </h3>
        <div className="grid gap-3">
          {entitlements.map((item, idx) => (
            <div key={idx} className="bg-card border border-border p-4 rounded-xl flex items-center justify-between">
              <div>
                <h4 className="font-bold text-foreground text-sm">{item.title}</h4>
                <p className="text-lg font-bold text-[#365A71] mt-1">{item.amount}</p>
              </div>
              <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                item.status === 'Available' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'
              }`}>
                {item.status}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
