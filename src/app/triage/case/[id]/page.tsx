import { getPatient } from '@/services/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ChevronLeft, ShieldAlert, Activity, AlertTriangle, PhoneCall, History } from 'lucide-react';

export default async function CaseDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params;
  const patient = await getPatient(resolvedParams.id);
  
  if (!patient) return notFound();

  return (
    <div className="max-w-3xl mx-auto py-6 space-y-6 pb-20">
      
      {/* Header */}
      <div className="flex items-center gap-3 border-b border-border pb-4">
        <Link href="/triage" className="p-2 bg-muted text-foreground rounded-full hover:bg-zinc-200 transition">
          <ChevronLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-foreground flex items-center gap-2">
            {patient.name}
            {patient.currentRisk === 'HIGH' && (
              <span className="bg-[#B82E2E] text-white text-[10px] px-1.5 py-0.5 rounded-sm uppercase">Critical</span>
            )}
          </h1>
          <p className="text-xs text-muted-foreground mt-0.5">Case ID: {patient.id}</p>
        </div>
      </div>

      {/* Dynamic Distress Bar */}
      <div className="bg-card border border-border p-5 rounded-xl space-y-4">
        <div className="flex justify-between items-end">
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <Activity className="w-5 h-5 text-[#B82E2E]" />
            Distress Level
          </h3>
          <span className="text-2xl font-black text-[#B82E2E]">75<span className="text-sm text-muted-foreground font-normal">/100</span></span>
        </div>
        
        <div className="w-full h-4 bg-muted rounded-full overflow-hidden flex">
          <div className="h-full bg-green-500 w-1/3"></div>
          <div className="h-full bg-orange-500 w-1/3"></div>
          <div className="h-full bg-[#B82E2E] w-[15%]"></div>
        </div>
        <div className="flex justify-between text-[10px] font-bold text-muted-foreground uppercase">
          <span>Normal</span>
          <span>Elevated</span>
          <span className="text-[#B82E2E]">Critical</span>
        </div>
      </div>

      {/* Explainable AI: Root Drivers */}
      <div className="bg-red-50 border border-red-100 p-5 rounded-xl space-y-3">
        <h3 className="font-bold text-red-900 flex items-center gap-2">
          <AlertTriangle className="w-5 h-5 text-[#B82E2E]" />
          Explainable AI: Root Drivers
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2 text-sm text-red-800">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B82E2E] mt-1.5 shrink-0"></div>
            <strong>Housing Threat:</strong> Repeated mentions of landlord eviction threats.
          </li>
          <li className="flex items-start gap-2 text-sm text-red-800">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B82E2E] mt-1.5 shrink-0"></div>
            <strong>Coercion:</strong> Local leaders demanding case withdrawal.
          </li>
          <li className="flex items-start gap-2 text-sm text-red-800">
            <div className="w-1.5 h-1.5 rounded-full bg-[#B82E2E] mt-1.5 shrink-0"></div>
            <strong>Night Shift Anxiety:</strong> Linguistic markers show extreme fear of returning home late.
          </li>
        </ul>
      </div>

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <button className="bg-[#B82E2E] text-white p-3 rounded-xl font-bold flex flex-col items-center justify-center gap-2 hover:bg-[#962525] transition shadow-md active:scale-95">
          <ShieldAlert className="w-6 h-6" />
          <span className="text-sm">Deploy Mobile Unit</span>
        </button>
        <button className="bg-[#365A71] text-white p-3 rounded-xl font-bold flex flex-col items-center justify-center gap-2 hover:bg-[#2A4759] transition shadow-md active:scale-95">
          <PhoneCall className="w-6 h-6" />
          <span className="text-sm">Contact NGO Partner</span>
        </button>
      </div>

      {/* Historical Trajectory */}
      <div className="bg-card border border-border p-5 rounded-xl space-y-4">
        <h3 className="font-bold text-foreground flex items-center gap-2">
          <History className="w-5 h-5 text-[#8A5A3B]" />
          Historical Trajectory
        </h3>
        
        {/* Mock Chart Area */}
        <div className="h-32 flex items-end gap-2 pt-4 border-b border-l border-border px-2 pb-1 relative">
          <div className="absolute top-0 w-full border-t border-dashed border-red-200"></div>
          <div className="absolute top-1/2 w-full border-t border-dashed border-orange-200"></div>
          
          <div className="flex-1 bg-green-500/80 rounded-t-sm" style={{ height: '30%' }}></div>
          <div className="flex-1 bg-green-500/80 rounded-t-sm" style={{ height: '35%' }}></div>
          <div className="flex-1 bg-orange-500/80 rounded-t-sm" style={{ height: '60%' }}></div>
          <div className="flex-1 bg-[#B82E2E]/90 rounded-t-sm shadow-[0_0_8px_rgba(184,46,46,0.5)]" style={{ height: '90%' }}></div>
        </div>
        <div className="flex justify-between text-[10px] text-muted-foreground font-bold">
          <span>Week 1</span>
          <span>Week 2</span>
          <span>Week 3</span>
          <span>Today</span>
        </div>
      </div>

    </div>
  );
}
