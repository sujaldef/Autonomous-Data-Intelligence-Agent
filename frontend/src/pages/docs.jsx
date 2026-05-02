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
      <header className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="max-w-2xl"
        >
          <div className="flex items-center gap-3 mb-6">
            <Code2 className="text-[#98465f]" size={14} />
            <span className="text-[9px] tracking-[0.4em] uppercase text-muted font-bold">
              Developer Docs
            </span>
          </div>
          <h1 className="text-5xl md:text-6xl font-light tracking-tight mb-6 text-strong">
            System{' '}
            <span className="font-serif italic text-muted">Reference</span>
          </h1>
          <p className="text-sm text-muted font-light leading-relaxed max-w-lg">
            Complete technical specification of the ADIA API boundaries, data
            pipelines, and underlying technology stack.
            <br />
            <br />
            <span className="text-[10px] uppercase tracking-widest text-[#98465f] font-bold">
              Scroll for documentation &darr;
            </span>
          </p>
        </motion.div>
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
