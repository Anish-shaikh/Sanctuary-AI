import Link from 'next/link';
import { Shield, Phone, AlertTriangle, EyeOff } from 'lucide-react';

export default function Navbar() {
  return (
    <div className="bg-background border-b border-border">
      {/* Top Header */}
      <div className="flex h-16 items-center px-6 max-w-7xl mx-auto justify-between">
        <div className="flex items-center gap-3">
          <div className="bg-[#8A5A3B] text-white p-2 rounded-md">
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="font-bold text-foreground text-lg tracking-tight">Sanctuary AI</h1>
              <span className="bg-[#EBE2D9] text-[#8A5A3B] text-xs font-bold px-2 py-0.5 rounded-sm">NHAA 14566</span>
            </div>
            <p className="text-xs text-muted-foreground font-medium">SC/ST PoA Distress Monitor</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <button className="p-2 bg-muted rounded-md text-foreground hover:bg-zinc-200 transition">
            <EyeOff className="h-4 w-4" />
          </button>
          <button className="flex items-center gap-2 bg-[#365A71] text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-[#2A4759] transition">
            <Phone className="h-4 w-4" />
            14566
          </button>
          <button className="flex items-center gap-2 bg-[#B82E2E] text-white px-4 py-2 rounded-md text-sm font-bold hover:bg-[#962525] transition">
            <AlertTriangle className="h-4 w-4" />
            SOS
          </button>
        </div>
      </div>

      {/* Portal Mode Toggle */}
      <div className="bg-muted/50 border-t border-border">
        <div className="flex h-12 items-center px-6 max-w-7xl mx-auto justify-between">
          <span className="text-xs font-bold text-muted-foreground tracking-widest uppercase">Portal Mode:</span>
          <div className="flex bg-muted rounded-full p-1 border border-border">
            <Link href="/" className="px-4 py-1 rounded-full bg-[#8A5A3B] text-white text-xs font-bold transition">
              Victim Companion
            </Link>
            <Link href="/triage" className="px-4 py-1 rounded-full text-muted-foreground text-xs font-bold hover:text-foreground transition flex items-center gap-1">
              <Shield className="h-3 w-3" />
              Authority Triage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
