import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Box, PlaySquare, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import NavForLanding from '../components/navforlanding';

const Docs = () => {
  const endpoints = [
    {
      method: 'POST',
      path: '/query',
      desc: 'Submit a natural language query for the agent to resolve.',
    },
    {
      method: 'POST',
      path: '/action',
      desc: 'Define a conditional business rule.',
    },
    {
      method: 'POST',
      path: '/visualise',
      desc: 'Request a chart rendering for a dataset.',
    },
    {
      method: 'GET',
      path: '/history',
      desc: 'Fetch session history and cached tool outputs.',
    },
    {
      method: 'POST',
      path: '/rag/ingest',
      desc: 'Upload docs for FAISS vector indexing.',
    },
  ];

  const stack = [
    {
      category: 'API',
      name: 'FastAPI',
      why: 'Async execution & Pydantic v2 validation.',
    },
    {
      category: 'LLM',
      name: 'LangChain',
      why: 'ReAct loop management & tool abstractions.',
    },
    { category: 'DB', name: 'SQLite', why: 'Zero-config portable SQL-92.' },
    {
      category: 'Vector',
      name: 'FAISS',
      why: 'Fast nearest-neighbour search.',
    },
    {
      category: 'Embed',
      name: 'sentence-transformers',
      why: 'Local execution.',
    },
    {
      category: 'Analysis',
      name: 'pandas + scipy',
      why: 'DataFrames & anomaly detection.',
    },
  ];

  return (
    <main className="bg-app text-muted font-satoshi selection-accent overflow-hidden relative pb-20">
      <NavForLanding />

      {/* BACKGROUND */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 right-0 w-[600px] h-screen bg-gradient-to-l from-black/80 to-transparent" />
      </div>

      {/* --- FULL SCREEN HERO --- */}
      {/* --- UPDATED BACKGROUND & HERO --- */}
<div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
  {/* The Galaxy Drift (Slow & subtle) */}
  <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#0a0a12_0%,_#000000_100%)]" />
  
  {/* Star particles overlay (Subtle CSS stars) */}
  <div className="absolute inset-0 opacity-20" 
       style={{ backgroundImage: `radial-gradient(white 1px, transparent 0)`, backgroundSize: '100px 100px' }} />
  
  {/* The "Neural" Glow behind text */}
  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#98465f]/5 blur-[120px] rounded-full" />
</div>

<header className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto overflow-hidden">
  <div className="grid lg:grid-cols-2 gap-12 items-center">
    
    {/* TEXT CONTENT */}
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="flex items-center gap-3 mb-8">
        <div className="h-px w-8 bg-[#98465f]/50" />
        <span className="text-[10px] tracking-[0.5em] uppercase text-[#98465f] font-bold">
          Technical Specification
        </span>
      </div>
      
      <h1 className="text-6xl md:text-8xl font-light tracking-tighter mb-8 text-white leading-[0.9]">
        System <br />
        <span className="font-serif italic text-white/40" style={{ fontFamily: "'Playfair Display', serif" }}>
          Reference
        </span>
      </h1>
      
      <p className="text-sm md:text-base text-white/40 font-light leading-relaxed max-w-md mb-10 tracking-wide">
        Complete technical specification of the ADIA API boundaries, data
        pipelines, and underlying technology stack. Designed for deterministic 
        execution.
      </p>

      <div className="flex gap-8 items-center">
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-white/20 tracking-widest font-bold mb-1">Status</span>
          <span className="text-xs text-emerald-500/80 font-mono flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Live Production
          </span>
        </div>
        <div className="h-8 w-px bg-white/10" />
        <div className="flex flex-col">
          <span className="text-[10px] uppercase text-white/20 tracking-widest font-bold mb-1">Version</span>
          <span className="text-xs text-white/60 font-mono">v4.1.0-stable</span>
        </div>
      </div>
    </motion.div>

    {/* VISUAL ELEMENT (The "Flow" Visualization) */}
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 1.2, delay: 0.2 }}
      className="hidden lg:flex justify-center relative"
    >
      {/* Abstract API Node visualization */}
      <div className="relative w-80 h-80 flex items-center justify-center">
        <motion.div 
          animate={{ rotate: 360 }}
          transition={{ duration: 50, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 border border-white/5 rounded-full" 
        />
        <motion.div 
          animate={{ rotate: -360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="absolute inset-8 border border-[#98465f]/10 rounded-full border-dashed" 
        />
        
        <div className="z-10 p-8 bg-black border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl shadow-[#98465f]/5">
           <Code2 className="text-[#98465f] mb-4" size={32} />
           <div className="space-y-2">
              <div className="h-1.5 w-24 bg-white/10 rounded-full overflow-hidden">
                <motion.div 
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
                  className="h-full w-full bg-gradient-to-r from-transparent via-[#98465f] to-transparent" 
                />
              </div>
              <div className="h-1 w-16 bg-white/5 rounded-full" />
           </div>
        </div>

        {/* Floating Data Tags */}
        {[ 
          { label: 'POST', top: '10%', right: '0%' },
          { label: 'GET', bottom: '15%', left: '-5%' },
          { label: 'JSON', top: '40%', left: '-15%' }
        ].map((tag, i) => (
          <motion.span 
            key={i}
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, delay: i * 0.5, repeat: Infinity }}
            className="absolute p-2 bg-white/[0.03] border border-white/10 text-[8px] font-mono tracking-widest text-white/40 rounded"
            style={{ top: tag.top, right: tag.right, left: tag.left }}
          >
            {tag.label}
          </motion.span>
        ))}
      </div>
    </motion.div>
  </div>

  {/* SCROLL INDICATOR */}
  <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3">
    <span className="text-[8px] uppercase tracking-[0.5em] text-white/20 font-bold">Documentation API</span>
    <motion.div 
      animate={{ y: [0, 8, 0], opacity: [0.2, 0.5, 0.2] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="w-px h-12 bg-gradient-to-b from-[#98465f] to-transparent" 
    />
  </div>
</header>

      <div className="relative z-10 max-w-6xl mx-auto px-6 md:px-20 grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* --- LEFT COLUMN: API Endpoints --- */}
        <div className="lg:col-span-7 space-y-12">
          <section>
            <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-6">
              <PlaySquare size={14} className="text-[#98465f]" />
              <h2 className="text-lg text-white font-light uppercase tracking-widest">
                Core Endpoints
              </h2>
            </div>

            <div className="space-y-3">
              {endpoints.map((ep, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col sm:flex-row sm:items-center gap-4 p-4 bg-app-strong border border-white/5 hover:border-white/20 transition-colors"
                >
                  <div className="flex items-center gap-3 w-32 shrink-0">
                    <span
                      className={`text-[8px] font-bold tracking-widest px-2 py-0.5 rounded-sm 
                      ${ep.method === 'GET' ? 'bg-blue-900/30 text-blue-400' : 'bg-emerald-900/30 text-emerald-400'}`}
                    >
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs text-white">
                      {ep.path}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {ep.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-6">
              <ArrowUpRight size={14} className="text-[#98465f]" />
              <h2 className="text-lg text-white font-light uppercase tracking-widest">
                Enhancements
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="p-5 border border-white/5 bg-[#0a0a0c]/80">
                <h3 className="text-white text-sm mb-3">v1.1 Release</h3>
                <ul className="space-y-2 text-xs text-slate-500">
                  <li className="flex gap-2">
                    <span>&rsaquo;</span> React dashboard UI
                  </li>
                  <li className="flex gap-2">
                    <span>&rsaquo;</span> Webhook alerts
                  </li>
                  <li className="flex gap-2">
                    <span>&rsaquo;</span> Scheduled rules
                  </li>
                </ul>
              </div>
              <div className="p-5 border border-white/5 bg-[#0a0a0c]/80">
                <h3 className="text-white text-sm mb-3">v2.0 Roadmap</h3>
                <ul className="space-y-2 text-xs text-slate-500">
                  <li className="flex gap-2">
                    <span>&rsaquo;</span> Multi-agent arch
                  </li>
                  <li className="flex gap-2">
                    <span>&rsaquo;</span> Prophet Forecasting
                  </li>
                  <li className="flex gap-2">
                    <span>&rsaquo;</span> DuckDB federation
                  </li>
                </ul>
              </div>
            </div>
          </section>
        </div>

        {/* --- RIGHT COLUMN: Tech Stack --- */}
        <div className="lg:col-span-5">
          <div className="sticky top-24">
            <div className="flex items-center gap-3 border-b border-white/10 pb-3 mb-6">
              <Box size={14} className="text-[#98465f]" />
              <h2 className="text-lg text-white font-light uppercase tracking-widest">
                Tech Stack
              </h2>
            </div>

            <div className="space-y-2">
              {stack.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="p-4 border border-white/5 bg-[#0a0a0c]/50 hover:bg-[#0a0a0c] transition-colors"
                >
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-white text-sm font-medium">
                      {item.name}
                    </span>
                    <span className="text-[8px] uppercase tracking-[0.2em] text-[#98465f] font-bold">
                      {item.category}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500 leading-relaxed">
                    {item.why}
                  </p>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 p-5 border border-white/5 bg-[radial-gradient(ellipse_at_top_right,_rgba(152,70,95,0.1)_0%,_transparent_70%)]">
              <Database size={16} className="text-white mb-3" />
              <h4 className="text-white text-xs font-bold uppercase tracking-widest mb-2">
                Limitations
              </h4>
              <p className="text-[10px] text-slate-400 leading-relaxed mb-4">
                SQLite write-locking limits multi-user throughput. FAISS flat
                index degrades beyond 100K chunks.
              </p>
              <Link
                to="/auth"
                className="text-[#98465f] text-[10px] font-bold uppercase tracking-[0.2em] hover:text-white transition-colors"
              >
                Initialize App &rarr;
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Docs;
