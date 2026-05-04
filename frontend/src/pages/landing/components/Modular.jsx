import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Globe, Code2, Terminal, Lock, Cpu } from 'lucide-react';

const Modular = () => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start'],
  });

  // Smoothing the scroll value to prevent "laggy" jumps
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Creative Animations
  const rotate = useTransform(smoothProgress, [0, 1], [0, 360]);
  const scale = useTransform(smoothProgress, [0, 0.5, 1], [0.8, 1.1, 0.8]);
  const opacity = useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  // 3D Tilt for the main engine
  const rotateX = useTransform(smoothProgress, [0, 1], [15, -15]);

  const layers = [
    {
      icon: <Globe size={20} strokeWidth={1} />,
      title: 'API Gateway',
      tech: 'Edge Routing',
      pos: 'top',
    },
    {
      icon: <Code2 size={20} strokeWidth={1} />,
      title: 'Agent Layer',
      tech: 'ReAct Loop',
      pos: 'right',
    },
    {
      icon: <Terminal size={20} strokeWidth={1} />,
      title: 'Tool Layer',
      tech: 'Python Exec',
      pos: 'bottom',
    },
    {
      icon: <Lock size={20} strokeWidth={1} />,
      title: 'Data Layer',
      tech: 'Vector DB',
      pos: 'left',
    },
  ];

  return (
    <section
      ref={containerRef}
      className="py-60 relative flex items-center bg-app overflow-hidden min-h-screen font-satoshi text-ui"
    >
      {/* Background Decorative Mesh */}
      <div className="absolute inset-0 opacity-10 [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)]">
        <div
          className="absolute inset-0 brightness-50 mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E\")",
          }}
        />
      </div>

      <div className="container mx-auto px-10 md:px-24 grid grid-cols-1 lg:grid-cols-2 gap-10 items-center relative z-10">
        {/* TEXT CONTENT */}
        <motion.div style={{ opacity }}>
          <div className="flex items-center gap-3 mb-6">
            <Cpu className="text-[#98465f]" size={16} />
            <span className="text-[10px] tracking-[0.5em] uppercase text-muted font-medium">
              Core Infrastructure
            </span>
          </div>

          <h3 className="text-5xl md:text-7xl font-extralight text-strong tracking-tighter mb-10 leading-none">
            MODULAR <br />
            <span className="italic font-serif text-slate-500">
              ENGINEERING
            </span>
          </h3>

          <p className="text-muted max-w-sm text-lg font-light leading-[1.8] mb-12">
            A decoupled five-layer stack. We separate reasoning from execution
            to ensure zero-hallucination outputs.
          </p>

          <div className="flex flex-wrap gap-3">
            {['FastAPI', 'LangChain', 'FAISS', 'SQLite'].map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 border border-white/5 bg-white/2 text-[9px] uppercase tracking-widest text-muted"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* THE VISUAL ENGINE */}
        <div className="relative flex justify-center items-center h-[700px] perspective-[1500px]">
          {/* Static Inner Glow */}
          <div className="absolute w-64 h-64 bg-[#98465f]/10 blur-[120px] rounded-full" />

          <motion.div
            style={{
              rotate,
              scale,
              rotateX,
              transformStyle: 'preserve-3d',
            }}
            className="relative w-[450px] h-[450px] border border-white/5 rounded-full flex items-center justify-center"
          >
            {/* Dashed Orbit Line */}
            <div className="absolute inset-0 border border-dashed border-white/10 rounded-full" />

            {layers.map((layer, i) => {
              const angle = i * 90 * (Math.PI / 180);
              // Calculate positioning
              const x = Math.cos(angle) * 225;
              const y = Math.sin(angle) * 225;

              return (
                <motion.div
                  key={i}
                  style={{
                    x,
                    y,
                    transformStyle: 'preserve-3d',
                  }}
                  className="absolute"
                >
                  {/* Item Container - Counters parent rotation to stay upright */}
                  <motion.div
                    style={{
                      rotate: useTransform(rotate, (r) => -r),
                      rotateX: useTransform(rotateX, (r) => -r),
                    }}
                    className="group relative flex flex-col items-center"
                  >
                    {/* The Card */}
                    <div className="bg-app-strong border border-white/10 backdrop-blur-xl p-6 w-40 h-40 flex flex-col justify-between transition-all duration-500 group-hover:border-[#98465f]/50 group-hover:bg-[#0a0a0c]">
                      <div className="text-[#98465f] group-hover:scale-110 transition-transform duration-500">
                        {layer.icon}
                      </div>

                      <div>
                        <h4 className="text-strong text-[10px] font-bold tracking-[0.2em] uppercase mb-1">
                          {layer.title}
                        </h4>
                        <p className="text-[9px] text-muted uppercase tracking-widest">
                          {layer.tech}
                        </p>
                      </div>

                      {/* Corner Accent */}
                      <div className="absolute top-0 right-0 w-4 h-4 border-t border-r border-white/5 group-hover:border-[#98465f] transition-colors" />
                    </div>
                  </motion.div>
                </motion.div>
              );
            })}

            {/* Central Core Element */}
            <motion.div
              style={{ rotate: useTransform(rotate, (r) => -r * 2) }}
              className="w-20 h-20 border border-white/10 flex items-center justify-center bg-app"
            >
              <div className="w-8 h-8 border border-[#98465f] rotate-45 animate-pulse" />
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator Hairline */}
      <div className="absolute right-10 top-1/2 -translate-y-1/2 h-32 w-[1px] bg-white/5">
        <motion.div
          style={{ scaleY: smoothProgress, originY: 0 }}
          className="w-full h-full bg-[#98465f]"
        />
      </div>
    </section>
  );
};

export default Modular;
