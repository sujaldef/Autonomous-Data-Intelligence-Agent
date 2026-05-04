import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Fingerprint, Zap, ArrowRight } from 'lucide-react';

const End = () => {
  // UseMemo prevents stars from repositioning on every hover/render
  const starField = useMemo(
    () =>
      Array.from({ length: 40 }).map((_, i) => ({
        id: i,
        size: Math.random() * 2 + 1, // small to large
        top: `${Math.random() * 80}%`,
        right: `${-10 - Math.random() * 30}%`,
        duration: 1.5 + Math.random() * 3,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.7 + 0.3,
      })),
    [],
  );

  return (
    <section className="py-40 relative overflow-hidden bg-[#020203] font-satoshi">
      {/* MULTI-SCALE METEOR SHOWER */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        {starField.map((star) => (
          <motion.div
            key={star.id}
            className="absolute bg-gradient-to-r from-transparent via-white/40 to-white"
            style={{
              height: star.size > 2 ? '1.5px' : '1px',
              width: star.size * 50, // Trails are proportional to size
              top: star.top,
              right: star.right,
              transform: 'rotate(-30deg)',
              opacity: star.opacity,
              willChange: 'transform',
            }}
            animate={{
              x: ['0vw', '-150vw'],
              y: ['0vh', '80vh'],
            }}
            transition={{
              duration: star.duration,
              delay: star.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}

        {/* Static Background Stars (The "Glow") */}
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Deep Vignette Mask */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#020203_95%)]" />
      </div>

      {/* CONTENT LAYER */}
      <div className="max-w-4xl mx-auto px-10 relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 0.5, scale: 1 }}
          className="flex items-center gap-2 justify-center mb-10"
        >
          <Zap size={12} className="text-[#98465f]" />
          <span className="text-[8px] tracking-[0.6em] uppercase text-slate-500 font-bold">
            Encrypted Archive
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, letterSpacing: '0.2em' }}
          whileInView={{ opacity: 1, letterSpacing: '-0.04em' }}
          transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl md:text-5xl font-extralight text-white mb-14 uppercase leading-[1.1]"
        >
          Access the <br />
          <span className="font-serif italic text-slate-600">
            Technical
          </span>{' '}
          Architecture.
        </motion.h2>

        <div className="flex flex-col items-center gap-12">
          {/* THE NEW "DATA-PULSE" BUTTON */}
          <motion.button
            whileHover="hover"
            initial="initial"
            className="group relative"
          >
            {/* Animated Border Ring */}
            <div className="absolute -inset-2 border border-white/5 rounded-full scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-700" />

            {/* Main Button Body */}
            <div className="relative flex items-center gap-6 px-12 py-5 bg-transparent border border-white/10 overflow-hidden transition-all duration-500 group-hover:border-[#98465f]">
              {/* Inner Hover Slide */}
              <div className="absolute inset-0 bg-[#98465f] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-px" />

              <Fingerprint
                size={18}
                className="relative z-10 text-[#98465f] group-hover:text-white transition-colors duration-500"
              />

              <span className="relative z-10 text-white text-[10px] font-bold uppercase tracking-[0.5em]">
                Request Internal Docs
              </span>

              <ArrowRight
                size={14}
                className="relative z-10 text-white/40 group-hover:text-white group-hover:translate-x-2 transition-all duration-500"
              />
            </div>
          </motion.button>

          <p className="max-w-xs text-[10px] text-slate-600 font-light leading-relaxed tracking-[0.1em] uppercase">
            FAISS vector integration <br /> + ReAct reasoning loop prompt
            schemas
          </p>
        </div>
      </div>

      {/* MINIMALIST FOOTER */}
      <div className="absolute bottom-10 left-10 right-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[8px] uppercase tracking-[0.4em] text-slate-800">
        <div className="flex items-center gap-3">
          <p>© 2026 ADIA Systems</p>
          <div className="h-3 w-px bg-slate-900" />
          <p className="text-slate-900 font-bold">Classified</p>
        </div>
        <div className="flex gap-12">
          {['Specs', 'Audit', 'Terminal'].map((link) => (
            <a
              key={link}
              href="#"
              className="hover:text-white transition-all duration-300 relative group"
            >
              {link}
              <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#98465f] group-hover:w-full transition-all duration-300" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default End;
