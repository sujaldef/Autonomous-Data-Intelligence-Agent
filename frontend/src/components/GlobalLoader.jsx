import React from 'react';
import { Cpu } from 'lucide-react';

export default function GlobalLoader() {
  return (
    <div className="min-h-screen bg-app flex flex-col items-center justify-center font-satoshi selection-accent relative">
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />
      <div className="flex flex-col items-center gap-4 relative z-10">
        <Cpu size={32} className="text-[#98465f] animate-pulse" />
        <div className="flex flex-col items-center gap-2">
          <p className="text-xs uppercase tracking-[0.3em] text-[#98465f] font-bold">
            Initializing
          </p>
          <div className="h-1 w-32 bg-white/5 overflow-hidden">
            <div className="h-full bg-[#98465f] w-1/3 animate-[slide_1.5s_ease-in-out_infinite]" />
          </div>
        </div>
      </div>
      <style>{`
        @keyframes slide {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
      `}</style>
    </div>
  );
}
