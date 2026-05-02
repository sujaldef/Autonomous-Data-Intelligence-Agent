import React, { useState } from 'react';
import { Database, Sparkles, Send, Zap, Shield, Cpu, TerminalSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const starterPrompts = [
  'ANALYZE MONTHLY REVENUE GROWTH FOR FY24',
  'COMPARE SQL VS MONGODB DATA INTEGRITY',
  'SUMMARIZE CUSTOMER FEEDBACK ANOMALIES',
];

const QueryPage = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 space-y-10">
      {/* Header Section */}
      <header>
        <div className="flex items-center gap-2 mb-4">
          <TerminalSquare size={14} strokeWidth={1.5} className="text-[#98465f]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-slate-500">Neural Link Active</span>
        </div>
        <h1 className="text-3xl font-light text-white tracking-widest uppercase mb-3">Intelligence Query</h1>
        <p className="text-slate-500 text-xs tracking-wide max-w-xl">
          Execute natural language instructions across structured databases, vector indices, and document stores. Deterministic output guaranteed.
        </p>
      </header>

      {/* Main Query Terminal */}
      <section className="relative">
        <div className="bg-[#0a0a0c] border border-white/10 p-4">
          <div className="flex items-center gap-2 border-b border-white/5 pb-3 mb-3">
            <span className="text-[9px] font-mono text-[#98465f] uppercase tracking-widest">INPUT_BUFFER</span>
            <div className="h-px flex-1 bg-white/5" />
          </div>
          
          <textarea
            rows="5"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="DEFINE QUERY PARAMETERS..."
            className="w-full bg-transparent p-2 text-sm text-slate-300 outline-none placeholder:text-slate-700 resize-none font-mono uppercase tracking-wide"
          />
          
          <div className="flex items-center justify-between pt-4 mt-2 border-t border-white/5">
            <div className="flex gap-3">
              {['SQL', 'NoSQL', 'Vector'].map(db => (
                <div key={db} className="flex items-center gap-1.5">
                  <div className="h-1.5 w-1.5 bg-emerald-500 rounded-none" />
                  <span className="text-[9px] font-bold tracking-[0.2em] text-slate-500 uppercase">{db}</span>
                </div>
              ))}
            </div>
            <button className="flex items-center gap-3 px-6 py-2 bg-white hover:bg-slate-200 text-black text-[10px] font-bold uppercase tracking-[0.2em] transition-colors rounded-none">
              <span>Execute</span>
              <Send size={12} strokeWidth={2} />
            </button>
          </div>
        </div>
      </section>

      {/* Starter Prompts */}
      <div>
        <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-600 block mb-4">Suggested Protocols</span>
        <div className="flex flex-col gap-2">
          {starterPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setQuery(prompt)}
              className="w-full text-left px-4 py-3 bg-[#0a0a0c] border border-white/5 text-[10px] tracking-widest font-mono text-slate-400 hover:text-white hover:border-white/20 transition-colors rounded-none flex items-center justify-between group"
            >
              <span>{prompt}</span>
              <span className="text-slate-700 group-hover:text-[#98465f] transition-colors">&rarr;</span>
            </button>
          ))}
        </div>
      </div>

      {/* Infrastructure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-8 border-t border-white/5">
        {[
          { title: 'Node', val: 'ADIA-v3-Core', icon: Cpu, color: 'text-[#98465f]' },
          { title: 'Security', val: 'AES-256', icon: Shield, color: 'text-slate-400' },
          { title: 'Latency', val: '< 50ms', icon: Zap, color: 'text-slate-400' },
        ].map((item, i) => (
          <div key={i} className="flex flex-col gap-2 p-5 bg-[#0a0a0c] border border-white/5 rounded-none">
            <div className="flex items-center justify-between mb-2">
              <p className="text-[9px] font-bold text-slate-600 uppercase tracking-[0.2em]">{item.title}</p>
              <item.icon size={12} strokeWidth={1.5} className={item.color} />
            </div>
            <p className="text-xs font-mono text-slate-300">{item.val}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryPage;