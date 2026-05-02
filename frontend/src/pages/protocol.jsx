import React from 'react';
import { motion } from 'framer-motion';
import {
  Network,
  TerminalSquare,
  BrainCircuit,
  ActivitySquare,
  PenTool,
  ArrowRight,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NavForLanding from '../components/navforlanding';

const Protocol = () => {
  const steps = [
    {
      id: '01',
      title: 'Intent Classification',
      subtitle: 'Semantic Routing',
      icon: <Network className="text-white" size={16} />,
      content:
        'The LLM analyzes the natural language input to label the query as DATA_RETRIEVAL, INSIGHT_ANALYSIS, ACTION_TRIGGER, VISUALISATION, or RAG_QUERY.',
      code: "if intent == 'DATA_RETRIEVAL':\n  route_to(sql_agent)\nelif intent == 'INSIGHT_ANALYSIS':\n  route_to(insight_engine)",
    },
    {
      id: '02',
      title: 'Plan Generation',
      subtitle: 'ReAct Loop',
      icon: <BrainCircuit className="text-white" size={16} />,
      content:
        "The LLM produces a 'Thought' and outputs an ordered list of tool calls required to solve the problem using the DB schema.",
      code: 'Thought: I need to query sales for Q1\nAction: execute_sql_query\nArgs: {"query": "SELECT SUM(revenue)..."}',
    },
    {
      id: '03',
      title: 'Execution Loop',
      subtitle: 'Deterministic Run',
      icon: <ActivitySquare className="text-white" size={16} />,
      content:
        'Tools run in secure Python environments. The LLM waits for exact outputs (e.g., sums). Errors auto-correct the plan.',
      code: 'Observation: 128400\nThought: Now I need previous month data.\nAction: execute_sql_query...',
    },
    {
      id: '04',
      title: 'Response Synthesis',
      subtitle: 'Translation',
      icon: <PenTool className="text-white" size={16} />,
      content:
        'The LLM combines verified facts into a cohesive, conversational response, ensuring zero numerical hallucination.',
      code: 'Final Answer: Revenue fell 6.2% (-$8,500). Primary cause: Electronics dropped 24.2%.',
    },
  ];

  return (
    <main className="bg-[#020203] text-white font-satoshi selection-accent overflow-hidden relative">
      <NavForLanding />

      {/* --- PROTOCOL BACKGROUND --- */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-[600px] h-[600px] bg-[#98465f]/5 rounded-full blur-[150px] -top-40 -right-40" />
        <div className="absolute w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-[120px] top-1/2 -left-20" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/noise.png')] opacity-[0.03]" />
      </div>

      {/* --- FULL SCREEN HEADER --- */}
      <header className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="inline-flex items-center gap-3 px-3 py-1.5 border border-white/10 rounded-full bg-white/5 mb-6">
            <TerminalSquare size={12} className="text-[#98465f]" />
            <span className="text-[8px] font-bold uppercase tracking-[0.4em] text-slate-300">
              ReAct Framework
            </span>
          </div>

          <h1 className="text-5xl md:text-6xl font-light tracking-[-0.03em] mb-6">
            The Execution{' '}
            <span className="font-serif italic text-slate-500">Protocol</span>
          </h1>
          <p className="text-sm md:text-base text-slate-400 font-light leading-relaxed max-w-lg mx-auto">
            A step-by-step breakdown of how ADIA parses intent, plans tool
            usage, executes deterministic logic, and synthesizes grounded
            answers.
            <br />
            <br />
            <span className="text-[10px] uppercase tracking-widest text-[#98465f] font-bold">
              Scroll to trace protocol &darr;
            </span>
          </p>
        </motion.div>
      </header>

      {/* --- TIMELINE/WORKFLOW --- */}
      <section className="relative z-10 max-w-5xl mx-auto px-6 md:px-20 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group relative"
            >
              <div className="bg-[#0a0a0c]/80 border border-white/5 p-6 md:p-8 h-full flex flex-col relative z-10 hover:border-[#98465f]/30 transition-colors duration-500">
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-light text-white/5 font-serif italic tracking-tighter group-hover:text-white/10 transition-colors">
                    {step.id}
                  </span>
                  <div className="w-8 h-8 rounded-sm bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#98465f] group-hover:border-[#98465f] transition-all duration-500">
                    {step.icon}
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="text-xl font-light mb-1">{step.title}</h3>
                  <h4 className="text-[8px] uppercase tracking-[0.3em] text-[#98465f] font-bold">
                    {step.subtitle}
                  </h4>
                </div>

                <p className="text-slate-400 text-xs leading-relaxed mb-6 flex-grow">
                  {step.content}
                </p>

                <div className="bg-black/50 border border-white/5 rounded-sm p-3 mt-auto">
                  <div className="flex gap-1.5 mb-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-700" />
                  </div>
                  <pre className="text-[9px] text-slate-300 font-mono leading-relaxed whitespace-pre-wrap">
                    {step.code}
                  </pre>
                </div>
              </div>

              {index % 2 === 0 && index !== steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-[5%] lg:-right-[10%] translate-x-1/2 -translate-y-1/2 z-0 opacity-20">
                  <ArrowRight
                    size={24}
                    className="text-white"
                    strokeWidth={1}
                  />
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-16 p-5 border border-red-900/30 bg-red-950/10 flex items-start gap-4"
        >
          <ShieldAlert size={20} className="text-red-500 mt-1" />
          <div>
            <h4 className="text-[10px] font-bold uppercase tracking-widest text-red-400 mb-1">
              Safety Enforcement
            </h4>
            <p className="text-slate-400 text-xs leading-relaxed">
              Before execution, the SQL Engine performs AST validation. Non-
              <code className="text-red-300">SELECT</code> statements are
              rejected.
            </p>
          </div>
        </motion.div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="relative z-10 py-20 border-t border-white/5 text-center flex flex-col justify-center items-center">
        <Link to="/docs">
          <button className="group relative flex items-center gap-4 bg-white px-8 py-4 overflow-hidden">
            <span className="relative z-10 text-black group-hover:text-white text-[9px] font-bold uppercase tracking-[0.3em]">
              Access API Docs
            </span>
            <ChevronRight
              className="relative z-10 text-black group-hover:text-white group-hover:translate-x-1 transition-transform duration-500"
              size={14}
            />
            <div className="absolute inset-0 bg-[#98465f] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Protocol;
