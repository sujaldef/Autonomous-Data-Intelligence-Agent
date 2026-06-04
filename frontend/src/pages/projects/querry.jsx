import React, { useState } from 'react';
import {
  Database,
  Sparkles,
  Send,
  Zap,
  Shield,
  Cpu,
  Terminal,
  ArrowDown,
  ChevronDown,
  ChevronUp,
  Check,
  BarChart3,
  Search,
  Layers,
  HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const starterPrompts = [
  { text: 'What caused revenue to drop last month?', cat: 'REVENUE' },
  { text: 'Which products generated the most sales?', cat: 'SALES' },
  { text: 'Summarize customer feedback from this quarter.', cat: 'FEEDBACK' },
];

const QueryPage = () => {
  const [query, setQuery] = useState('');
  const [showResults, setShowResults] = useState(false);
  const [isSourcesOpen, setIsSourcesOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleExecute = () => {
    if (!query.trim()) return;
    setIsAnalyzing(true);
    setShowResults(false);
    
    // Simulate minor analytical processing telemetry delay
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1100);
  };

  const handlePromptClick = (promptText) => {
    setQuery(promptText);
    setIsAnalyzing(true);
    setShowResults(false);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 1000);
  };

  return (
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-10 text-slate-400 selection:bg-emerald-500/20">
      
      {/* --- PAGE HEADER --- */}
      <header className="mb-8 border-b border-white/5 pb-6">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={14} className="text-emerald-400 animate-pulse" />
          <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase tracking-[0.25em]">
            ADIA Intelligence Engine
          </span>
        </div>
        <h1 className="text-2xl lg:text-3xl font-light tracking-wide text-white mb-2">
          What would you like to verify?
        </h1>
        <p className="text-slate-500 text-xs font-sans max-w-3xl">
          Query indexed network streams, relational data tables, dynamic financial reports, or historical corporate logs.
        </p>
      </header>

      {/* --- MASTER WORKSPACE GRID --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* --- LEFT HAND CONTROL COLUMN (INPUT CONSOLE & SUGGESTIONS) --- */}
        <div className="xl:col-span-1 space-y-6">
          
          {/* TERMINAL INPUT CARD */}
          <div className="bg-[#0a0a0c] border border-white/10 p-4 relative group focus-within:border-emerald-500/40 transition-colors">
            <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
              <div className="flex items-center gap-2">
                <Terminal size={12} className="text-emerald-500" />
                <span className="text-[9px] font-mono text-slate-400 uppercase tracking-widest">
                  INPUT_BUFFER
                </span>
              </div>
              <span className="text-[8px] font-mono text-slate-600">v4.2.0-STABLE</span>
            </div>

            <textarea
              rows="4"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="DEFINE INQUIRY MATRIX CONFIGURATION..."
              className="w-full bg-black/30 border border-white/5 p-3 text-xs text-slate-200 outline-none placeholder:text-slate-700 resize-none font-mono uppercase tracking-wide focus:border-white/10 transition-colors"
            />

            <div className="flex flex-col gap-4 pt-3 mt-1">
              {/* Linked Data Sources */}
              <div className="flex flex-wrap gap-x-4 gap-y-2 border-t border-b border-white/5 py-2.5">
                {['Document Stream', 'Database Core'].map((db) => (
                  <div key={db} className="flex items-center gap-1.5">
                    <div className="h-1.5 w-1.5 bg-emerald-500 shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                    <span className="text-[9px] font-bold tracking-[0.15em] text-slate-400 uppercase">
                      {db}
                    </span>
                  </div>
                ))}
              </div>
              
              {/* Dispatch Action */}
              <button
                onClick={handleExecute}
                disabled={isAnalyzing || !query.trim()}
                className="w-full flex items-center justify-center gap-3 px-5 py-2.5 bg-white hover:bg-slate-200 disabled:bg-slate-800 disabled:text-slate-600 text-black text-[10px] font-bold uppercase tracking-[0.2em] transition-colors rounded-none"
              >
                <span>{isAnalyzing ? 'Processing...' : 'Execute Inquiry'}</span>
                <Send size={11} strokeWidth={2.5} className={isAnalyzing ? 'animate-bounce' : ''} />
              </button>
            </div>
          </div>

          {/* SUGGESTED PRESETS */}
          <div className="bg-[#0a0a0c] border border-white/5 p-4">
            <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-500 block mb-3">
              Suggested Matrices
            </span>
            <div className="space-y-2">
              {starterPrompts.map((prompt) => (
                <button
                  key={prompt.text}
                  onClick={() => handlePromptClick(prompt.text)}
                  className="w-full text-left p-3 bg-black/40 border border-white/5 text-[10px] tracking-wider font-mono text-slate-400 hover:text-white hover:border-emerald-500/30 transition-all rounded-none flex items-start gap-3 group"
                >
                  <span className="text-emerald-500/70 group-hover:text-emerald-400 text-[9px] border border-emerald-500/20 bg-emerald-500/5 px-1 font-bold shrink-0">
                    {prompt.cat}
                  </span>
                  <span className="line-clamp-2 flex-1 pt-0.5">{prompt.text}</span>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* --- RIGHT HAND ANALYSIS OUTPUT SCREEN (FLUID MATRIX WORKSPACE) --- */}
        <div className="xl:col-span-2 w-full min-w-0">
          
          {/* TELEMETRY LOADING STATE */}
          {isAnalyzing && (
            <div className="bg-[#0a0a0c] border border-white/5 p-12 text-center flex flex-col items-center justify-center space-y-4">
              <Cpu className="text-emerald-500 animate-spin" size={24} strokeWidth={1.5} />
              <div className="space-y-1">
                <p className="text-[10px] font-mono text-slate-300 uppercase tracking-[0.2em]">Executing Parser Nodes</p>
                <p className="text-[9px] font-mono text-slate-600">MAPPING REGIONAL REVENUE RECORDS...</p>
              </div>
            </div>
          )}

          {/* IDLE PLACEHOLDER STATE */}
          {!showResults && !isAnalyzing && (
            <div className="bg-[#0a0a0c]/40 border border-dashed border-white/10 p-12 text-center flex flex-col items-center justify-center text-slate-600 space-y-3">
              <Layers size={20} strokeWidth={1.5} />
              <p className="text-[10px] font-mono uppercase tracking-[0.2em]">Workspace Empty</p>
              <p className="text-xs font-sans max-w-sm mx-auto">Configure your telemetry criteria inside the input terminal or choose a baseline prompt configuration to run compilation metrics.</p>
            </div>
          )}

          {/* DYNAMIC RESULTS PANEL VIEW */}
          <AnimatePresence>
            {showResults && !isAnalyzing && (
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                className="space-y-4"
              >
                {/* 0. Status System Header Bar */}
                <div className="flex items-center justify-between bg-[#0a0a0c] border border-white/5 px-4 py-3">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 bg-emerald-500 rounded-none shadow-[0_0_6px_rgba(16,185,129,0.6)]" />
                    <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-emerald-400 font-bold">
                      Telemetry Resolved
                    </span>
                  </div>
                  <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                    SYS_GEN_TIMESTAMP: 2026-06-04
                  </span>
                </div>

                {/* 1. Executive Narrative Brief */}
                <div className="bg-[#0a0a0c] border border-white/5 p-5 lg:p-6 space-y-4">
                  <div>
                    <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                      EXECUTIVE COMPILATION NARRATIVE
                    </span>
                    <h3 className="text-lg lg:text-xl font-light text-slate-100 tracking-wide leading-relaxed">
                      Monthly metrics verify a micro-drop of{' '}
                      <span className="text-rose-500 font-mono font-bold bg-rose-500/5 px-1.5 py-0.5 border border-rose-500/10">
                        6.2%
                      </span>{' '}
                      across primary pipeline nodes.
                    </h3>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t border-white/5 text-xs">
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                        Isolated Deviation Vector
                      </span>
                      <p className="text-slate-400 font-sans leading-relaxed">
                        Primary variance isolates to <span className="text-white font-medium">Electronics output sinking 24%</span>, generating significant friction against positive trends across ancillary consumer catalog streams.
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest block">
                        Prescribed System Directives
                      </span>
                      <p className="text-slate-400 font-sans leading-relaxed">
                        Deploy aggressive visibility protocols and short-interval price structures targeting high-margin inventory nodes to recover baseline margin pacing immediately.
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. Structured Metric Vector Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {[
                    { label: 'Delta Metric', val: '-6.2%', color: 'text-rose-500', icon: ArrowDown },
                    { label: 'Primary Vector', val: 'ELECTRONICS', color: 'text-slate-200 font-sans tracking-wide text-sm' },
                    { label: 'Net Valuation Variance', val: '-$8,500', color: 'text-rose-400' },
                  ].map((card, idx) => (
                    <div key={idx} className="bg-[#0a0a0c] border border-white/5 p-4 flex flex-col justify-between">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">
                        {card.label}
                      </span>
                      <div className="mt-3 flex items-baseline justify-between">
                        <span className={`text-xl font-mono font-bold tracking-tight ${card.color}`}>
                          {card.val}
                        </span>
                        {card.icon && <card.icon size={13} className="text-rose-500 shrink-0" />}
                      </div>
                    </div>
                  ))}
                </div>

                {/* 3. Graphical Matrix Visualization */}
                <div className="bg-[#0a0a0c] border border-white/5 p-5">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <BarChart3 size={13} className="text-emerald-400" />
                      <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                        30-Day Velocity Spectrum
                      </span>
                    </div>
                    <span className="text-[9px] font-mono text-slate-600 uppercase tracking-widest">
                      Interval View
                    </span>
                  </div>

                  {/* High Density Cyberpunk Custom Scaled Chart */}
                  <div className="h-36 flex items-end gap-2.5 pt-4 border-b border-l border-white/5 px-2">
                    {[62, 75, 88, 70, 54, 38, 48].map((val, idx) => (
                      <div key={idx} className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end group">
                        <div
                          style={{ height: `${val}%` }}
                          className={`w-full transition-all duration-500 relative rounded-none ${
                            idx === 5
                              ? 'bg-rose-950/40 border border-rose-500/50 shadow-[0_0_8px_rgba(239,68,68,0.15)]'
                              : 'bg-slate-900 border border-white/10 group-hover:bg-slate-800 group-hover:border-white/20'
                          }`}
                        >
                          <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-slate-400 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap bg-black px-1 border border-white/10 z-10">
                            {(val * 0.4).toFixed(1)}k
                          </div>
                        </div>
                        <span className="text-[8px] font-mono text-slate-600 uppercase tracking-tighter mt-0.5">
                          INT_{idx + 1}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 4. Action Directives List */}
                <div className="bg-[#0a0a0c] border border-white/5 p-5 space-y-4">
                  <div className="flex items-center gap-2 border-b border-white/5 pb-2.5">
                    <Zap size={13} className="text-emerald-400" />
                    <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                      Action Diagnostics Matrix
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                      { title: 'Trigger Promos', desc: 'Isolate stagnant electronic pipelines to balance sitting catalog assets.' },
                      { title: 'Pricing Review', desc: 'Isolate parallel marketplace competitors for regional variance.' },
                      { title: 'Expand Channels', desc: 'Automate fulfillment flags to redistribute regional inventories.' }
                    ].map((item, i) => (
                      <div key={i} className="p-3 bg-black/40 border border-white/5 flex flex-col justify-between font-mono">
                        <div>
                          <div className="text-slate-600 text-[9px] mb-1">[{i + 1}]</div>
                          <span className="text-slate-200 text-[10px] font-bold uppercase tracking-wider block mb-1">
                            {item.title}
                          </span>
                          <span className="text-slate-500 text-[11px] font-sans block leading-normal">
                            {item.desc}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Collapsible Verification Stream Panel */}
                <div className="bg-[#0a0a0c] border border-white/5 overflow-hidden">
                  <button
                    onClick={() => setIsSourcesOpen(!isSourcesOpen)}
                    className="w-full flex items-center justify-between p-4 text-left hover:bg-white/[0.01] transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      <Database size={13} className="text-emerald-400" />
                      <span className="text-[10px] font-mono text-slate-300 uppercase tracking-widest">
                        Audited Validation Vectors
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-[9px] font-mono text-slate-500 uppercase tracking-wider">
                        3 Active Pools
                      </span>
                      {isSourcesOpen ? <ChevronUp size={13} className="text-slate-400" /> : <ChevronDown size={13} className="text-slate-400" />}
                    </div>
                  </button>

                  {isSourcesOpen && (
                    <div className="p-4 space-y-2 bg-black/30 border-t border-white/5 font-mono text-xs text-slate-400 divide-y divide-white/5">
                      {[
                        { title: 'Sales Record DB', details: '12,458 entries indexed and checked for matrix matching.' },
                        { title: 'Q1 Corporate Strategy PDF', details: '3 strategic alignment parameters isolated and correlated.' },
                        { title: 'Feedback Data Pool', details: 'Unstructured customer logging arrays parsed through analytical filters.' }
                      ].map((source, idx) => (
                        <div key={idx} className={`flex justify-between items-start gap-4 ${idx > 0 ? 'pt-2.5' : ''}`}>
                          <div>
                            <div className="flex items-center gap-2 text-slate-200">
                              <Check size={11} className="text-emerald-400 shrink-0" />
                              <span className="uppercase tracking-wider text-[10px] font-bold">{source.title}</span>
                            </div>
                            <p className="text-[10px] text-slate-500 mt-0.5 font-sans leading-relaxed">
                              {source.details}
                            </p>
                          </div>
                          <span className="text-[8px] font-bold text-emerald-400 bg-emerald-500/5 px-1.5 py-0.5 border border-emerald-500/20 shrink-0">
                            VERIFIED
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default QueryPage;