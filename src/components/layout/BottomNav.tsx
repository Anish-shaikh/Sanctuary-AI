'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Heart, MessageSquare, FileText, ShieldAlert, ShieldCheck } from 'lucide-react';

export default function BottomNav() {
  const pathname = usePathname();

  const tabs = [
    { name: 'Companion', href: '/', icon: Heart },
    { name: 'AI Check-In', href: '/check-in', icon: MessageSquare },
    { name: 'Relief & Law', href: '/relief', icon: FileText },
    { name: 'Triage', href: '/triage', icon: ShieldAlert },
    { name: 'Safety & PIN', href: '/safety', icon: ShieldCheck },
  ];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-card border-t border-border py-2 px-4 z-50">
      <div className="max-w-7xl mx-auto flex justify-between items-center px-4 md:px-12">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = pathname === tab.href || (tab.href === '/triage' && pathname.startsWith('/counsellor'));
          
          return (
            <Link key={tab.name} href={tab.href} className="flex flex-col items-center gap-1 group">
              <Icon 
                className={`w-6 h-6 ${isActive ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'} transition-colors`} 
                strokeWidth={isActive ? 2.5 : 1.5}
              />
              <span className={`text-[10px] font-medium ${isActive ? 'text-foreground' : 'text-muted-foreground'}`}>
                {tab.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
