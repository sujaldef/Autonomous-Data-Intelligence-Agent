import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  BotMessageSquare,
  Database,
  BarChart3,
  Search,
  Activity,
} from 'lucide-react';

const Execution = () => {
  const [activeStep, setActiveStep] = useState(0);
  const traceRef = useRef(null);
  const traceInView = useInView(traceRef, { amount: 0.3 });

  const traceSteps = [
    {
      label: 'Intent Classification',
      icon: <BotMessageSquare size={18} />,
      detail: "LLM identifies query as 'Analytical Insight'",
      code: 'POST /query -> intent: INSIGHT_ANALYSIS',
    },
    {
      label: 'SQL Generation & Execution',
      icon: <Database size={18} />,
      detail: 'Deterministic tool generates read-only SELECT',
      code: 'SELECT SUM(revenue) FROM sales WHERE date...',
    },
    {
      label: 'Insight Computation',
      icon: <BarChart3 size={18} />,
      detail: 'Pandas/Scipy computes Z-score anomalies',
      code: 'delta = -6.2% | driver: Electronics',
    },
    {
      label: 'RAG Context Injection',
      icon: <Search size={18} />,
      detail: 'FAISS retrieves top-5 board report chunks',
      code: "Retrieving: 'Supply chain delays X12 Pro'",
    },
    {
      label: 'Synthesis & Action',
      icon: <Activity size={18} />,
      detail: 'Natural language explanation + alert trigger',
      code: 'Action: alert_trigger(revenue_drop_threshold)',
    },
  ];

  useEffect(() => {
    if (traceInView && activeStep < traceSteps.length) {
      const timer = setTimeout(() => setActiveStep((s) => s + 1), 1500);
      return () => clearTimeout(timer);
    }
  }, [traceInView, activeStep, traceSteps.length]);

  return (
    <section ref={traceRef} className="py-40 bg-white/2">
      <div className="max-w-6xl mx-auto px-8">
        <div className="mb-20">
          <h2 className="text-xs font-bold tracking-[0.5em] text-[#98465f] uppercase mb-4 text-center">
            System Execution
          </h2>
          <h3 className="text-4xl md:text-5xl font-light text-white tracking-tighter text-center uppercase">
            Live Reasoning Trace
          </h3>
        </div>

        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-white/10 -translate-x-1/2 hidden md:block" />

          <div className="space-y-24">
            {traceSteps.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={`relative flex items-center justify-between w-full ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
              >
                <div className="w-full md:w-[45%] bg-app-strong border border-white/5 p-8 rounded-sm hover:border-[#98465f]/50 transition-colors group">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="p-3 bg-white/5 rounded-full text-[#98465f] group-hover:scale-110 transition-transform">
                      {step.icon}
                    </div>
                    <h4 className="text-lg font-light tracking-tight text-strong">
                      {step.label}
                    </h4>
                  </div>
                  <p className="text-muted text-sm font-light mb-6 uppercase tracking-wider leading-relaxed">
                    {step.detail}
                  </p>
                  <div className="bg-black/40 p-3 font-mono text-[10px] text-emerald-500/80 border-l border-emerald-500/30">
                    {step.code}
                  </div>
                </div>

                {/* Center Node */}
                <div className="absolute left-1/2 -translate-x-1/2 hidden md:flex h-10 w-10 rounded-full bg-app border border-white/20 items-center justify-center z-10">
                  <div
                    className={`h-2 w-2 rounded-full ${i < activeStep ? 'bg-[#98465f] shadow-[0_0_10px_#98465f]' : 'bg-white/10'}`}
                  />
                </div>

                <div className="hidden md:block w-[45%]" />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Execution;
