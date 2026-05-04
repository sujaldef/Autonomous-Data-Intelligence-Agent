import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ChevronRight, ShieldCheck } from 'lucide-react';
import WaveField from './WaveField';
const Hero = () => {
  const navigate = useNavigate();
  const { scrollYProgress } = useScroll();

  const leftSideOpacity = useTransform(scrollYProgress, [0, 0.12], [1, 0]);
  const leftSideX = useTransform(scrollYProgress, [0, 0.12], [0, -40]);

  return (
    <section className="relative h-screen flex items-center pl-10 md:pl-24 overflow-hidden bg-app font-satoshi text-ui">
      {/* PURE CSS/MOTION BACKGROUND - Zero Lag */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* WAVE FIELD */}
        <div className="absolute inset-0 opacity-70">
          <WaveField />
        </div>

        {/* VIGNETTE */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,transparent_20%,#050507_100%)]" />
      </div>

      <motion.div
        style={{ opacity: leftSideOpacity, x: leftSideX }}
        className="relative w-full md:w-3/5 z-20"
      >
        {/* Status */}
        <div className="flex items-center gap-4 mb-14">
          <div className="flex items-center gap-2 px-3 py-1 border border-white/10 rounded-full bg-white/5 backdrop-blur-md">
            <span className="w-1.5 h-1.5 rounded-full bg-[#98465f] shadow-[0_0_8px_#98465f]" />
            <span className="text-[9px] tracking-[0.5em] uppercase text-muted font-medium">
              Core_v1.0_Stable
            </span>
          </div>
        </div>

        <h1 className="text-5xl md:text-[5.5rem] font-light tracking-[-0.03em] leading-[0.95] text-white mb-10">
          Data <br />
          has a <span className="text-white/30 italic font-serif">
            voice
          </span>{' '}
          now.
        </h1>

        <p className="max-w-lg text-muted text-lg font-light leading-[1.8] tracking-wide mb-16 border-l border-[#98465f]/30 pl-8">
          A tool-augmented layer designed for deterministic outcomes. ADIA
          transitions your infrastructure from probabilistic guesswork to
          verifiable computational truth.
        </p>

        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-12">
          <button
            onClick={() => navigate('/auth')}
            className="group relative flex items-center gap-6 bg-white px-12 py-6 overflow-hidden transition-all duration-500"
          >
            <span className="relative z-10 text-black group-hover:text-white text-[11px] font-bold uppercase tracking-[0.4em]">
              Initialize Core
            </span>
            <ChevronRight
              className="relative z-10 text-black group-hover:text-white group-hover:translate-x-2 transition-all duration-500"
              size={18}
            />
            <div className="absolute inset-0 bg-[#98465f] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          </button>

          <div className="flex items-center gap-4 opacity-40 hover:opacity-100 transition-opacity duration-500">
            <ShieldCheck size={20} className="text-white" strokeWidth={1} />
            <span className="text-[10px] uppercase tracking-[0.3em] text-white font-light leading-tight">
              Encrypted <br /> Logic Gate
            </span>
          </div>
        </div>
      </motion.div>

      {/* Decorative hairline accents */}
      <div className="absolute bottom-10 left-10 right-10 h-[1px] bg-white/5" />
      <div className="absolute top-0 right-32 w-[1px] h-screen bg-white/5" />
    </section>
  );
};

export default Hero;
