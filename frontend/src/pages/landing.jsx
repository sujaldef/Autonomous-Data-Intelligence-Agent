import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform, useInView } from 'framer-motion';
import { 
  Database, Sparkles, Cpu, Zap, ArrowRight, Terminal, Fingerprint, 
  Globe, Layers, ChevronRight, Code2, Lock, Unplug, BrainCircuit, BotMessageSquare
} from 'lucide-react';

// --- STYLED COMPONENTS (Utilizing Tailwind) ---
const ButtonPrimary = ({ children, icon: Icon, ...props }) => (
  <motion.button 
    whileHover={{ scale: 1.03, boxShadow: "0 20px 40px rgba(6, 182, 212, 0.2)" }}
    whileTap={{ scale: 0.97 }}
    className="group px-8 py-4 bg-gradient-to-r from-cyan-600 to-indigo-600 rounded-2xl font-bold text-white flex items-center gap-3 shadow-2xl shadow-indigo-500/15" 
    {...props}
  >
    {children} {Icon && <Icon size={20} className="group-hover:translate-x-1 transition-transform" />}
  </motion.button>
);

const ButtonSecondary = ({ children, ...props }) => (
  <motion.button 
    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)", borderColor: "rgba(255,255,255,0.2)" }}
    className="px-8 py-4 bg-slate-950/50 border border-white/5 rounded-2xl font-bold text-slate-300 transition-colors" 
    {...props}
  >
    {children}
  </motion.button>
);

const SectionTag = ({ children, icon: Icon }) => (
  <motion.div 
    initial={{ opacity: 0, y: 15 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full border border-cyan-500/20 bg-cyan-500/5 text-cyan-300 text-xs font-black tracking-widest uppercase mb-6"
  >
    <Icon size={14} className="text-cyan-500" /> {children}
  </motion.div>
);

// --- ANIMATION VARIANTS ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 100 } }
};

const terminalLineVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: { opacity: 1, x: 0 }
};

// --- HELPER COMPONENTS ---

// 1. Particle Background for Hero
const ParticleField = () => {
  const particles = Array.from({ length: 40 });
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-cyan-500 rounded-full"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            opacity: Math.random() * 0.5 + 0.1,
          }}
          animate={{
            y: [0, Math.random() * -200 - 50],
            opacity: [0, Math.random() * 0.5 + 0.1, 0],
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

// 2. Interactive Logic Flow Visual
const LogicFlowVisual = () => {
  const steps = [
    { icon: BotMessageSquare, label: 'Intent' },
    { icon: BrainCircuit, label: 'Plan' },
    { icon: Terminal, label: 'Tools' },
    { icon: Database, label: 'Truth' },
  ];
  return (
    <div className="flex items-center justify-center gap-2 md:gap-4 font-mono text-[10px] uppercase tracking-wider text-slate-600">
      {steps.map((step, i) => (
        <React.Fragment key={i}>
          <motion.div 
            className="flex flex-col items-center gap-2"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.2 }}
          >
            <div className="p-3 rounded-full bg-slate-900 border border-white/5 text-cyan-400">
              <step.icon size={18} />
            </div>
            <span>{step.label}</span>
          </motion.div>
          {i < steps.length - 1 && (
            <motion.div 
              className="h-px w-6 md:w-12 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 + 0.1, duration: 0.5 }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

// --- MAIN COMPONENT ---
const AdiaManifesto = () => {
  const [activeTerminalLine, setActiveTerminalLine] = useState(0);
  const terminalRef = useRef(null);
  const terminalInView = useInView(terminalRef, { once: true, margin: "-100px" });

  const { scrollYProgress } = useScroll();
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.9]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const architectureY = useTransform(scrollYProgress, [0.3, 0.6], [100, 0]);

  const terminalLines = [
    { text: "ADIA :: AGENT_CORE // INITIALIZING...", color: "text-slate-500" },
    { text: "> AUTHENTICATING SESSION [JWT_VALID]", color: "text-emerald-500" },
    { text: "> PARSING SCHEMA: revenue_data.db", color: "text-slate-200" },
    { text: "> SYSTEM PROMPT LOADED [ReActMode]", color: "text-slate-200" },
    { text: "> RECEIVING INQUIRY: 'Why did conversion drop in March?'", color: "text-cyan-400" },
    { text: "ADIA :: PLAN // [SQL_QUERY, INSIGHT_ENGINE, RAG_RETRIEVER]", color: "text-indigo-400 font-bold" },
    { text: "> EXECUTING TOOL 1/3: sql_query('conversion_metrics')", color: "text-slate-200" },
    { text: "> RESULT: [March: 2.1%, Feb: 3.8%]", color: "text-white" },
    { text: "> EXECUTING TOOL 2/3: insight_engine('anomaly_detect')", color: "text-slate-200" },
    { text: "> EXECUTING TOOL 3/3: rag_retriever('marketing_campaigns')", color: "text-slate-200" },
    { text: "ADIA :: SYNTHESIS // CONFIDENCE: 98.1%", color: "text-emerald-400 font-bold" },
    { text: ">> Dropped due to logic error in the checkout flow (see logs/camp_beta.txt).", color: "text-white" },
  ];

  useEffect(() => {
    if (terminalInView && activeTerminalLine < terminalLines.length) {
      const timer = setTimeout(() => {
        setActiveTerminalLine(prev => prev + 1);
      }, activeTerminalLine === 5 || activeTerminalLine === 10 ? 1200 : 400); // Pause for thought
      return () => clearTimeout(timer);
    }
  }, [terminalInView, activeTerminalLine, terminalLines.length]);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30 overflow-x-hidden">
      
      {/* --- CINEMATIC HERO SECTION --- */}
      <motion.section 
        className="relative h-screen flex flex-col justify-center items-center px-6 text-center z-10 origin-bottom"
        style={{ scale: heroScale, opacity: heroOpacity }}
      >
        <ParticleField />
        
        {/* Core Visual: The Agent Eye */}
        <motion.div 
          className="relative mb-12"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="absolute inset-0 bg-cyan-500 rounded-full blur-[100px] opacity-20" />
          <div className="relative h-28 w-28 rounded-full border border-cyan-500/30 bg-slate-950 flex items-center justify-center p-1 shadow-[0_0_60px_rgba(6,182,212,0.3)]">
            <motion.div 
              className="h-full w-full rounded-full bg-[#050912] border-4 border-slate-900 flex items-center justify-center relative overflow-hidden"
              animate={{ borderColor: ["#0f172a", "#164e63", "#0f172a"] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
              <Fingerprint className="text-cyan-500 opacity-60" size={50} strokeWidth={1} />
              {/* Scanline Effect */}
              <motion.div 
                className="absolute inset-x-0 h-1 bg-cyan-500/50 blur-sm"
                animate={{ y: [-60, 60] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative z-10"
        >
          <motion.div variants={itemVariants}>
            <SectionTag icon={Unplug}>Offline-First Intelligence</SectionTag>
          </motion.div>
          
          <motion.h1 
            variants={itemVariants}
            className="text-6xl md:text-8xl font-black tracking-tight text-white mb-6 leading-[0.9] max-w-5xl mx-auto"
          >
            AUTONOMOUS <br className="hidden sm:block"/> DATA <span className="text-cyan-400">INTELLIGENCE</span>.
          </motion.h1>
          
          <motion.p 
            variants={itemVariants}
            className="max-w-2xl mx-auto text-slate-400 text-lg md:text-xl leading-relaxed mb-12"
          >
            ADIA is a configurable AI agent system that reasons through complex data structures, 
            executes deterministic tools, and acts as your dedicated Digital Data Analyst.
          </motion.p>
          
          <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <ButtonPrimary icon={ArrowRight}>Initialize Console</ButtonPrimary>
            <ButtonSecondary>Explore Core Logic</ButtonSecondary>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-600 text-xs font-bold uppercase tracking-widest"
          animate={{ opacity: [0.2, 1, 0.2] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Scroll to Manifest
          <div className="h-10 w-6 rounded-full border-2 border-slate-800 p-1 flex justify-center">
            <motion.div 
              className="h-2 w-2 bg-slate-600 rounded-full"
              animate={{ y: [0, 16, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.section>

      {/* --- CORE PRINCIPLE (Logic & The Tool Layer) --- */}
      <section className="py-32 px-6 relative z-10 bg-[#040813] border-y border-white/5" id="logic">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            
            {/* Text & Principal Feature */}
            <motion.div 
              className="lg:col-span-5"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.6 }}
            >
              <SectionTag icon={BrainCircuit}>The ReAct Framework</SectionTag>
              <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-6 leading-tight">
                LLM = Planner. <br/> Tools = Execution.
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-10">
                The core principle of ADIA is separating reasoning from action. The LLM handles the "why" and "how," 
                generating a step-by-step plan. Independent, deterministic tools handle the computation, querying, 
                and RAG retrieval, ensuring grounded truths.
              </p>
              <LogicFlowVisual />
            </motion.div>

            {/* Interactive Terminal Visual */}
            <motion.div 
              ref={terminalRef}
              className="lg:col-span-7 bg-[#010309] border border-white/5 rounded-3xl p-6 font-mono text-[11px] md:text-xs text-slate-300 shadow-2xl shadow-cyan-950/20 relative overflow-hidden h-[400px]"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-150px" }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              {/* Terminal Header */}
              <div className="flex items-center justify-between pb-4 border-b border-white/5 mb-5 text-slate-600 uppercase tracking-wider text-[10px] font-bold">
                <span>ADIA Agent Console v1.0.2</span>
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-rose-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-amber-500/50" />
                  <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/50 animate-pulse" />
                </div>
              </div>

              {/* Terminal Content (Animated Lines) */}
              <div className="space-y-2.5 overflow-y-auto h-[320px] pr-2 scrollbar-thin">
                <AnimatePresence>
                  {terminalLines.slice(0, activeTerminalLine).map((line, index) => (
                    <motion.p
                      key={index}
                      variants={terminalLineVariants}
                      initial="hidden"
                      animate="visible"
                      className={`${line.color} leading-relaxed`}
                      transition={{ duration: 0.3 }}
                    >
                      {line.text}
                    </motion.p>
                  ))}
                </AnimatePresence>
                {activeTerminalLine < terminalLines.length && (
                   <motion.span 
                     className="inline-block h-3 w-1.5 bg-cyan-400 align-middle ml-1"
                     animate={{ opacity: [1, 0, 1] }}
                     transition={{ duration: 0.8, repeat: Infinity }}
                   />
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* --- ARCHITECTURE LAYERS (Scroll Triggered) --- */}
      <section className="py-32 px-6 relative z-10" id="architecture">
        <motion.div className="max-w-7xl mx-auto" style={{ y: architectureY }}>
          <div className="text-center mb-20 max-w-2xl mx-auto">
            <SectionTag icon={Layers}>System Description</SectionTag>
            <h2 className="text-5xl font-black text-white tracking-tighter mb-5">MODULAR BY DESIGN</h2>
            <p className="text-slate-500 text-lg">From API endpoints to vector embeddings, ADIA is built on a clean, scalable stack.</p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
          >
            {[
              { icon: Globe, title: 'API Gateway', tech: 'FastAPI', desc: 'Secure entry point handling session context, validation, and routing.' },
              { icon: Code2, title: 'Agent Layer', tech: 'LangChain', desc: 'Core orchestrator utilizing ReAct reasoning loops for planning.' },
              { icon: Terminal, title: 'Tool Layer', tech: 'Deterministic Python', desc: 'Independent units executing SQL, RAG, analysis, and automation.' },
              { icon: Lock, title: 'Data Layer', tech: 'SQL / FAISS', desc: 'Unified access to structured databases and unstructured context.' },
            ].map((step, i) => (
              <motion.div 
                key={i} 
                className="relative bg-slate-900/40 border border-white/5 rounded-3xl p-8 group overflow-hidden"
                variants={itemVariants}
                whileHover={{ y: -8, borderColor: "rgba(6,182,212,0.2)", backgroundColor: "rgba(15,23,42,0.6)" }}
              >
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 h-32 w-32 bg-gradient-to-br from-cyan-600/10 to-transparent blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
                
                <div className="mb-8 h-16 w-16 bg-slate-950 border border-white/5 rounded-2xl flex items-center justify-center text-slate-500 group-hover:border-cyan-500/40 group-hover:text-cyan-400 transition-all shadow-inner relative z-10">
                  <step.icon size={30} strokeWidth={1.5} />
                </div>
                <div className="relative z-10">
                  <h4 className="text-xl font-bold text-white mb-2">{step.title}</h4>
                  <p className="text-cyan-500 font-mono text-xs uppercase font-bold tracking-widest mb-5">{step.tech}</p>
                  <p className="text-slate-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </motion.div>
            ))}
            </motion.div>
        </motion.div>
      </section>

      {/* --- CTA / Manifesto Footer --- */}
      <section className="py-40 px-6 text-center relative z-10" id="security">
        {/* Intense background gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.15)_0%,_transparent_60%)]" />
        </div>

        <motion.div 
          className="relative z-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-slate-950 border border-white/5 mb-10 text-slate-400 text-sm">
            <Fingerprint size={16} className="text-cyan-500" /> Grounded Truth in Data
          </div>
          <h2 className="text-6xl md:text-7xl font-black text-white tracking-tighter mb-8 leading-[0.95]">
            UPGRADE TO AUTONOMOUS <br/> INTELLIGENCE.
          </h2>
          <p className="text-slate-400 mb-14 text-lg md:text-xl max-w-xl mx-auto leading-relaxed">
            ADIA is designed to eliminate hallucination, ensure deterministic execution, and 
            transform your data assets into proactive strategic insights.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
            <ButtonPrimary icon={ChevronRight}>Initialize ADIA Free</ButtonPrimary>
            <button className="flex items-center gap-2.5 text-slate-500 font-bold hover:text-white transition-colors group">
              Request Technical Manifesto <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="mt-28 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8 text-slate-700 text-xs font-bold uppercase tracking-[0.2em]">
            <p>© 2026 ADIA Autonomous Systems. All rights reserved.</p>
            <div className="flex gap-8">
              {['GitHub', 'Docs', 'Security Audit'].map(link => (
                <a key={link} href="#" className="hover:text-cyan-500 transition-colors">{link}</a>
              ))}
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default AdiaManifesto;