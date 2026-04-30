import React, { useState } from 'react';
import { Database, Sparkles, Send, Zap, Shield, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

const starterPrompts = [
  'Show monthly revenue growth for 2024',
  'Compare SQL and MongoDB data quality',
  'Summarize customer feedback trends',
];

const QueryPage = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="max-w-5xl mx-auto px-8 py-10 space-y-10">
      {/* Header Section */}
      <header>
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-cyan-400" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Neural Intelligence Link</span>
        </div>
        <h1 className="text-3xl font-bold text-white tracking-tight">How can ADIA assist you today?</h1>
        <p className="text-slate-400 mt-2 text-sm max-w-xl leading-relaxed">
          Ask complex questions across your structured SQL databases, MongoDB clusters, and RAG-enabled document stores.
        </p>
      </header>

      {/* Main Query Terminal */}
      <section className="relative group">
        <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500/20 to-indigo-500/20 rounded-[2rem] blur-xl opacity-0 group-focus-within:opacity-100 transition duration-500" />
        <div className="relative bg-[#050912] border border-white/10 rounded-[2rem] p-2 shadow-2xl shadow-black">
          <textarea
            rows="5"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Describe the data insight you need..."
            className="w-full bg-transparent px-6 py-6 text-lg text-slate-200 outline-none placeholder:text-slate-600 resize-none font-medium"
          />
          <div className="flex items-center justify-between px-4 py-3 bg-white/[0.02] border-t border-white/5 rounded-b-[1.8rem]">
            <div className="flex gap-2">
              {['SQL', 'NoSQL', 'Vector'].map(db => (
                <span key={db} className="text-[9px] font-black tracking-widest px-2 py-1 rounded bg-white/5 border border-white/10 text-slate-500 uppercase">{db}</span>
              ))}
            </div>
            <button className="flex items-center gap-2 px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-black text-sm font-black rounded-xl transition-all shadow-lg shadow-cyan-500/20 active:scale-95">
              <span>EXECUTE QUERY</span>
              <Send size={14} strokeWidth={3} />
            </button>
          </div>
        </div>
      </section>

      {/* Starter Prompts */}
      <div className="flex flex-wrap gap-3">
        {starterPrompts.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setQuery(prompt)}
            className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-cyan-400 hover:border-cyan-400/30 transition-all"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Infrastructure Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-white/5">
        {[
          { title: 'Processing Node', val: 'ADIA-v3-Core', icon: Cpu, color: 'text-indigo-400' },
          { title: 'Security Protocol', val: 'AES-256 / SOC2', icon: Shield, color: 'text-emerald-400' },
          { title: 'Execution Mode', val: 'Low Latency', icon: Zap, color: 'text-amber-400' },
        ].map((item, i) => (
          <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-white/[0.02] border border-white/5">
            <item.icon size={18} className={item.color} />
            <div>
              <p className="text-[10px] font-black text-slate-600 uppercase tracking-tighter">{item.title}</p>
              <p className="text-xs font-bold text-slate-300">{item.val}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default QueryPage;