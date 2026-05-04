import React, { Suspense, useRef, useMemo, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars, Float, Points, PointMaterial } from '@react-three/drei';
import { motion, useScroll, useTransform } from 'framer-motion';
import * as THREE from 'three';
import {
  Network,
  TerminalSquare,
  BrainCircuit,
  ActivitySquare,
  PenTool,
  ShieldAlert,
  ChevronRight,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import NavForLanding from '../components/navforlanding';

// ─── SUBTLE SHOOTING STARS ──────────────────────────────────────────────────
const ShootingStar = () => {
  const ref = useRef();
  // Randomize characteristics for a natural feel
  const config = useMemo(() => ({
    x: (Math.random() - 0.5) * 50,
    y: 15 + Math.random() * 10,
    z: (Math.random() - 0.5) * 20,
    speed: 0.03 + Math.random() * 0.04, // Much slower and subtle
    length: 10 + Math.random() * 20,
    delay: Math.random() * 5,
  }), []);

  useFrame((state) => {
    if (!ref.current) return;
    const t = state.clock.getElapsedTime() + config.delay;
    
    // Create a periodic appearance
    const cycle = t % 12; // Star appears every 12 seconds
    const progress = cycle / 4; // Animation lasts 4 seconds

    if (cycle < 4) {
      // Natural diagonal trajectory
      ref.current.position.x = config.x + progress * 25;
      ref.current.position.y = config.y - progress * 20;
      // Subtle fade in and out using sine
      ref.current.material.opacity = Math.sin(progress * Math.PI) * 0.3;
    } else {
      // Hide star during "reloading" phase
      ref.current.material.opacity = 0;
    }
  });

  // Using a Line with a gradient-like material for a "streak" look
  const points = useMemo(() => [
    new THREE.Vector3(0, 0, 0),
    new THREE.Vector3(-0.5, 0.5, 0)
  ], []);

  return (
    <line ref={ref}>
      <bufferGeometry attach="geometry" setFromPoints={points} />
      <lineBasicMaterial attach="material" color="#ffffff" transparent opacity={0} linewidth={1} />
    </line>
  );
};

// ─── GALAXY CORE ─────────────────────────────────────────────────────────────
const GalaxyCore = () => {
  const starsRef = useRef();
  
  useFrame((state) => {
    // Very slow, cinematic drift
    starsRef.current.rotation.y = state.clock.getElapsedTime() * 0.005;
  });

  return (
    <group ref={starsRef}>
      {/* Background static stars */}
      <Stars 
        radius={100} 
        depth={50} 
        count={7000} 
        factor={4} 
        saturation={0} 
        fade 
        speed={0.5} 
      />
      
      {/* Several shooting stars with different timings */}
      <ShootingStar />
      <ShootingStar />
      <ShootingStar />
      <ShootingStar />
    </group>
  );
};

// ─── SCENE ───────────────────────────────────────────────────────────────────
const GlobeScene = () => (
  <Canvas
    camera={{ position: [0, 0, 15], fov: 45 }}
    gl={{ antialias: true, alpha: true }}
    style={{ background: 'transparent' }}
  >
    <Suspense fallback={null}>
      <GalaxyCore />
    </Suspense>
  </Canvas>
);

// ─── DATA ────────────────────────────────────────────────────────────────────
const steps = [
  {
    id: '01',
    title: 'Intent Classification',
    subtitle: 'Semantic Routing',
    icon: <Network size={15} />,
    content: 'The LLM analyzes natural language to label the query as DATA_RETRIEVAL or ACTION_TRIGGER.',
    code: "intent = classify(query)\nif intent == 'DATA': route_to(sql_agent)",
  },
  {
    id: '02',
    title: 'Plan Generation',
    subtitle: 'ReAct Loop',
    icon: <BrainCircuit size={15} />,
    content: "A 'Thought' token is emitted, then an ordered tool-call manifest is assembled.",
    code: 'Action: execute_sql_query\nArgs: {"query": "SELECT..."}',
  },
  {
    id: '03',
    title: 'Execution Loop',
    subtitle: 'Deterministic Run',
    icon: <ActivitySquare size={15} />,
    content: 'Tools run in sandboxed Python environments. LLM waits for exact numeric outputs.',
    code: 'Observation: 128400\nThought: Need previous month.',
  },
  {
    id: '04',
    title: 'Response Synthesis',
    subtitle: 'Translation Layer',
    icon: <PenTool size={15} />,
    content: 'Verified facts are woven into a cohesive reply. No hallucination survives the chain.',
    code: 'Final Answer: Revenue -6.2%\nCause: Electronics dropped.',
  },
];

// ─── PAGE ─────────────────────────────────────────────────────────────────────
const Protocol = () => {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.2], [1, 0.95]);
  const canvasY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  return (
    <main className="bg-[#000000] text-[#d4d8e2] overflow-x-hidden min-h-screen selection:bg-white/20">
      <NavForLanding />

      <header className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        {/* Background Gradients for Depth */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_#080810_0%,_#000000_100%)]" />
        
        {/* The 3D Space Layer */}
        <motion.div style={{ y: canvasY }} className="absolute inset-0 z-0 pointer-events-none">
           <GlobeScene />
        </motion.div>

        {/* Cinematic Grain */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none mix-blend-screen bg-[url('https://res.cloudinary.com/dlbv8m9vj/image/upload/v1683556060/noise_nt6l7p.png')]" />

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale }}
          className="relative z-10 text-center px-6 pointer-events-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 border border-white/10 rounded-full bg-white/[0.02] backdrop-blur-sm mb-10"
          >
            <TerminalSquare size={12} className="text-white/40" />
            <span className="text-[10px] font-medium uppercase tracking-[0.5em] text-white/40">
              React Framework · V4.1
            </span>
          </motion.div>

          <h1 className="text-[clamp(3rem,12vw,7.5rem)] font-light tracking-tighter text-white leading-[0.85] mb-6">
            The Execution
            <br />
            <span 
              className="italic font-serif bg-gradient-to-b from-white via-white/90 to-white/30 bg-clip-text text-transparent"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Protocol
            </span>
          </h1>

          <p className="text-[15px] text-white/30 leading-relaxed max-w-[440px] mx-auto mb-20 font-light tracking-wide">
            A high-fidelity trace of how AI agents parse intent, plan logic, execute tools deterministically, and synthesize grounded answers.
          </p>

          <div className="flex flex-col items-center gap-4">
            <span className="text-[9px] uppercase tracking-[0.6em] text-white/20 font-bold">Scroll to Trace</span>
            <div className="w-px h-20 bg-gradient-to-b from-white/20 via-white/10 to-transparent" />
          </div>
        </motion.div>

        {/* HUD Elements */}
        <div className="absolute bottom-12 left-12 z-20 font-mono text-[10px] text-white/10 tracking-[0.3em] uppercase">
          LAT 0.0° · LON 0.0° <br /> ALT ∞ · SYS NOMINAL
        </div>
        <div className="absolute bottom-12 right-12 z-20 font-mono text-[10px] text-white/10 tracking-[0.3em] text-right uppercase">
          UPTIME 99.97% <br /> PROTOCOL ACTIVE
        </div>
      </header>

      {/* ── STEPS SECTION ─────────────────────────────────────────────────── */}
      <section className="relative z-10 max-w-7xl mx-auto px-6 py-40">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.03] border border-white/[0.03]">
          {steps.map((step, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group bg-black p-10 hover:bg-[#030305] transition-all duration-700 border-r border-white/[0.03] last:border-r-0"
            >
              <div className="text-white/5 text-6xl font-serif italic mb-8 group-hover:text-white/10 transition-colors">
                {step.id}
              </div>
              <h3 className="text-white text-xl font-light mb-2">{step.title}</h3>
              <p className="text-[10px] text-white/20 uppercase tracking-[0.3em] mb-8 font-bold">{step.subtitle}</p>
              <p className="text-[13px] text-white/40 leading-relaxed mb-10 font-light">{step.content}</p>
              <div className="bg-[#050505] p-5 rounded-sm border border-white/[0.05] font-mono text-[11px] text-white/30 overflow-hidden">
                <code className="block whitespace-pre opacity-80">{step.code}</code>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Safety Footer within Section */}
        <div className="mt-12 p-8 border border-red-500/10 bg-red-500/[0.01] flex items-center gap-6">
          <ShieldAlert size={18} className="text-red-500/30" />
          <p className="text-[12px] text-white/20 tracking-wide">
            <span className="text-red-500/40 font-bold mr-2 uppercase">Safety Layer:</span> 
            AST validation enforces read-only mode. SELECT only — write ops blocked at parse time.
          </p>
        </div>
      </section>
    </main>
  );
};

export default Protocol;