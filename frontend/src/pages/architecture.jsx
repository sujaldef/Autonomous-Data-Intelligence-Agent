import React, { useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import {
  Server,
  Cpu,
  Wrench,
  Database,
  BrainCircuit,
  Activity,
  LineChart,
  Search,
  HardDrive,
  Lock,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NavForLanding from '../components/navforlanding';

const Architecture = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const layers = [
    {
      id: 1,
      name: 'API Layer',
      tech: 'FastAPI',
      icon: <Server size={18} className="text-[#98465f]" />,
      desc: 'Stateless REST interface acting as the secure entry point. Handles session context mapping, Pydantic validation, and routes requests.',
      subItems: ['POST /query', 'POST /action', 'GET /history'],
    },
    {
      id: 2,
      name: 'Agent Layer',
      tech: 'LangChain',
      icon: <Cpu size={18} className="text-[#98465f]" />,
      desc: 'The cerebral cortex. Uses ReAct pattern to parse intent, generate JSON tool execution plans, and synthesize answers.',
      subItems: [
        'Intent Classification',
        'Plan Generation',
        'Response Synthesis',
      ],
    },
    {
      id: 3,
      name: 'Tool Layer',
      tech: 'Python Deterministic',
      icon: <Wrench size={18} className="text-[#98465f]" />,
      desc: 'Isolated execution nodes. The LLM delegates calculations and reads here to guarantee truth.',
      tools: [
        {
          name: 'SQL Engine',
          icon: <Database size={14} />,
          desc: 'Read-only generator',
        },
        {
          name: 'Insight',
          icon: <LineChart size={14} />,
          desc: 'Anomaly detection',
        },
        {
          name: 'Action',
          icon: <Activity size={14} />,
          desc: 'Threshold alerting',
        },
        {
          name: 'RAG',
          icon: <Search size={14} />,
          desc: 'FAISS top-k retrieval',
        },
      ],
    },
    {
      id: 4,
      name: 'Memory Layer',
      tech: 'Session Cache',
      icon: <BrainCircuit size={18} className="text-[#98465f]" />,
      desc: 'Short-term conversational context and long-term semantic context via FAISS for doc injection.',
      subItems: ['Session Dict', 'FAISS Index'],
    },
    {
      id: 5,
      name: 'Database Layer',
      tech: 'Storage',
      icon: <HardDrive size={18} className="text-[#98465f]" />,
      desc: 'Raw structured tabular data and chunked unstructured embeddings ready for retrieval.',
      subItems: ['SQLite', 'Document Store'],
    },
  ];

  return (
    <main
      ref={containerRef}
      className="bg-app text-strong font-satoshi selection-accent overflow-hidden relative"
    >
      <NavForLanding />

      {/* --- BACKGROUND MESH --- */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(rgba(255,255,255,0.2) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,#050507_100%)]" />
      </div>

      {/* --- FULL SCREEN HERO --- */}
      {/* --- UPDATED STRUCTURAL BACKGROUND --- */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[#050507]">
        {/* Perspective Grid (Isometric Floor) */}
        <div
          className="absolute inset-0 opacity-[0.05]"
          style={{
            backgroundImage: `linear-gradient(#98465f 1px, transparent 1px), linear-gradient(90deg, #98465f 1px, transparent 1px)`,
            backgroundSize: '100px 100px',
            transform: 'perspective(1000px) rotateX(60deg) translateY(-100px)',
            maskImage:
              'radial-gradient(ellipse at center, black, transparent 80%)',
          }}
        />

        {/* Layered Accent Glows */}
        <div className="absolute top-1/4 -left-20 w-[500px] h-[500px] bg-[#98465f]/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[400px] bg-white/[0.02] blur-[100px] rounded-full" />
      </div>

      <header className="relative z-10 min-h-screen flex flex-col justify-center px-6 md:px-20 max-w-7xl mx-auto overflow-hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* TEXT CONTENT */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <div className="w-2 h-2 rotate-45 border border-[#98465f]" />
              <span className="text-[10px] tracking-[0.5em] uppercase text-[#98465f] font-bold">
                System Topology
              </span>
            </div>

            <h1 className="text-6xl md:text-8xl font-light tracking-tighter leading-[0.85] text-white mb-8">
              Five Layers <br />
              <span
                className="font-serif italic text-white/30"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Of Logic.
              </span>
            </h1>

            <p className="text-white/40 text-sm md:text-base font-light leading-relaxed max-w-md border-l border-white/10 pl-6 mb-12">
              ADIA physically separates reasoning from execution. The LLM acts
              as the brain, while independent, sandboxed tool layers handle the
              compute to ensure zero-hallucination outputs.
            </p>

            {/* Connectivity Meta */}
            <div className="flex items-center gap-6">
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-widest text-white/20 mb-1 font-bold">
                  Latency
                </span>
                <span className="text-xs font-mono text-white/60">
                  ~140ms / hop
                </span>
              </div>
              <div className="h-6 w-px bg-white/10" />
              <div className="flex flex-col">
                <span className="text-[8px] uppercase tracking-widest text-white/20 mb-1 font-bold">
                  Engine
                </span>
                <span className="text-xs font-mono text-white/60">
                  V-Series Agent
                </span>
              </div>
            </div>
          </motion.div>

          {/* ISOMETRIC LAYER VISUALIZATION */}
          <div className="hidden lg:flex justify-center items-center relative h-[600px]">
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 * i }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: i * 0.15,
                  duration: 1,
                  ease: [0.16, 1, 0.3, 1],
                }}
                style={{
                  zIndex: 5 - i,
                  top: `${25 + i * 10}%`,
                  width: `${300 - i * 20}px`,
                  height: '160px',
                  rotateX: '55deg',
                  rotateZ: '-35deg',
                }}
                className="absolute border border-white/10 bg-white/[0.02] backdrop-blur-md flex items-center justify-center group"
              >
                {/* Subtle Glow on the 'Active' Layer (Agent Layer) */}
                {i === 1 && (
                  <div className="absolute inset-0 bg-[#98465f]/10 shadow-[0_0_50px_rgba(152,70,95,0.2)]" />
                )}

                <div className="text-[8px] uppercase tracking-[0.4em] text-white/20 font-bold -rotate-12 translate-y-4 translate-x-4">
                  LEVEL_0{5 - i}
                </div>

                {/* Decorative Corner Accents */}
                <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-white/20" />
                <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-white/20" />
              </motion.div>
            ))}

            {/* Vertical 'Data Connector' Line */}
            <motion.div
              initial={{ height: 0 }}
              animate={{ height: '50%' }}
              transition={{ delay: 0.8, duration: 1.5 }}
              className="absolute w-px bg-gradient-to-b from-transparent via-[#98465f] to-transparent z-10"
            />
          </div>
        </div>

        {/* SCROLL CUE */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
          <span className="text-[9px] uppercase tracking-[0.5em] text-white/20 font-bold">
            Inspect Node Architecture
          </span>
          <motion.div
            animate={{ height: [40, 80, 40] }}
            transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            className="w-px bg-gradient-to-b from-white/40 to-transparent"
          />
        </div>
      </header>

      {/* --- ARCHITECTURE STACK --- */}
      <section className="relative z-10 py-20 px-6 md:px-20 max-w-5xl mx-auto">
        <div className="space-y-16">
          {layers.map((layer, idx) => (
            <motion.div
              key={layer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex flex-col md:flex-row gap-6 items-start group"
            >
              {/* Left Column */}
              <div className="flex items-center gap-4 w-40 shrink-0 mt-2">
                <div className="w-10 h-10 rounded-full border border-white/10 bg-app-strong flex items-center justify-center">
                  {layer.icon}
                </div>
                <span className="text-[9px] font-bold text-muted tracking-[0.2em]">
                  L{layer.id}
                </span>
              </div>

              {/* Right Column */}
              <div className="flex-1 bg-app-strong border border-white/5 p-6 md:p-8 hover:border-[#98465f]/30 transition-colors">
                <div className="flex justify-between items-start mb-4">
                  <h2 className="text-2xl font-light tracking-tight">
                    {layer.name}
                  </h2>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#98465f] font-bold">
                    {layer.tech}
                  </span>
                </div>

                <p className="text-muted text-xs leading-relaxed mb-6">
                  {layer.desc}
                </p>

                {layer.tools ? (
                  <div className="grid grid-cols-2 gap-3">
                    {layer.tools.map((tool, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 border border-white/5 bg-black/40"
                      >
                        <div className="text-muted">{tool.icon}</div>
                        <div>
                          <h4 className="text-[10px] font-bold uppercase tracking-wider text-strong">
                            {tool.name}
                          </h4>
                          <p className="text-[8px] text-muted uppercase tracking-widest">
                            {tool.desc}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="flex flex-wrap gap-2">
                    {layer.subItems.map((item, i) => (
                      <span
                        key={i}
                        className="px-3 py-1.5 bg-black/40 border border-white/5 text-[8px] uppercase tracking-[0.2em] text-muted"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* --- FOOTER CTA --- */}
      <section className="relative z-10 py-32 border-t border-white/5 mt-20 text-center flex flex-col items-center justify-center">
        <h3 className="text-2xl font-light tracking-tight mb-8">
          Explore the logic protocol
        </h3>
        <Link to="/protocol">
          <button className="group relative flex items-center gap-4 bg-white px-8 py-4 overflow-hidden">
            <span className="relative z-10 text-black group-hover:text-white text-[9px] font-bold uppercase tracking-[0.3em]">
              View Execution Protocol
            </span>
            <ChevronRight
              className="relative z-10 text-black group-hover:text-white group-hover:translate-x-1 transition-transform"
              size={14}
            />
            <div className="absolute inset-0 bg-[#98465f] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </button>
        </Link>
      </section>
    </main>
  );
};

export default Architecture;
