"use client";

import { Patient, RiskLevel } from '@/lib/types';
import Link from 'next/link';
import { ShieldAlert, Map, AlertTriangle, ChevronRight } from 'lucide-react';

interface CounsellorViewProps {
  initialPatients: Patient[];
}

export function CounsellorView({ initialPatients }: CounsellorViewProps) {
  // Sort high risk first
  const sortedPatients = [...initialPatients].sort((a, b) => {
    if (a.currentRisk === 'HIGH' && b.currentRisk !== 'HIGH') return -1;
    if (a.currentRisk !== 'HIGH' && b.currentRisk === 'HIGH') return 1;
    return 0;
  });

  return (
    <div className="space-y-6">
      
      {/* Filters */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
        <button className="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-[#365A71] text-white">All Districts</button>
        <button className="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-background border border-border text-foreground hover:bg-muted">High Risk Only</button>
        <button className="px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap bg-background border border-border text-foreground hover:bg-muted">New Alerts (3)</button>
      </div>

      {/* Heatmap Area (Mocked visually) */}
      <div className="bg-card border border-border rounded-xl p-4 overflow-hidden relative min-h-[250px] flex flex-col justify-between">
        <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
          <Map className="w-64 h-64" />
        </div>
        <div>
          <h3 className="font-bold text-foreground flex items-center gap-2">
            <ShieldAlert className="w-4 h-4 text-[#B82E2E]" />
            Predictive Heatmap
          </h3>
          <p className="text-xs text-muted-foreground mt-1">Live distress clustering across zones</p>
        </div>
        
        {/* Mock Map points */}
        <div className="relative h-32 mt-4">
          <div className="absolute top-4 left-1/4 w-4 h-4 bg-red-500 rounded-full animate-ping opacity-75"></div>
          <div className="absolute top-4 left-1/4 w-4 h-4 bg-red-600 rounded-full"></div>
          <span className="absolute top-9 left-[22%] text-[10px] font-bold bg-white text-red-600 px-1 rounded shadow">Zone A: 3 Alerts</span>

          <div className="absolute bottom-4 right-1/3 w-3 h-3 bg-orange-500 rounded-full"></div>
          <span className="absolute bottom-8 right-[30%] text-[10px] font-bold bg-white text-orange-600 px-1 rounded shadow">Zone B: 1 Alert</span>
        </div>
      </div>

      {/* Active Cases Table */}
      <div>
        <h3 className="font-bold text-foreground mb-3 px-1">Active High-Risk Cases</h3>
        <div className="grid gap-3">
          {sortedPatients.map(patient => (
            <Link key={patient.id} href={`/triage/case/${patient.id}`} className="block">
              <div className="bg-card border border-border p-4 rounded-xl flex items-center justify-between hover:border-primary transition group">
                <div className="flex items-start gap-3">
                  <div className={`p-2 rounded-lg ${patient.currentRisk === 'HIGH' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>
                    <AlertTriangle className="w-5 h-5" />
                  </div>
                  <div>
                    <h4 className="font-bold text-foreground text-sm flex items-center gap-2">
                      {patient.name}
                      {patient.currentRisk === 'HIGH' && (
                        <span className="bg-[#B82E2E] text-white text-[10px] px-1.5 py-0.5 rounded-sm">CRITICAL</span>
                      )}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-0.5">Last Signal: {patient.lastCheckInDate || 'N/A'}</p>
                  </div>
                </div>
                <div className="text-muted-foreground group-hover:text-primary transition">
                  <ChevronRight className="w-5 h-5" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

    </div>
  );
}
