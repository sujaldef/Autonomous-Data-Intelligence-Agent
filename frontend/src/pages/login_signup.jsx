import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ChevronRight, Fingerprint, ShieldCheck } from 'lucide-react';
import NavForLanding from '../components/navforlanding';

const Auth = () => {
  const [mode, setMode] = useState('login'); // 'login' or 'signup'

  return (
    <main className="min-h-screen mt-20 bg-app font-satoshi text-strong flex items-center justify-center px-6 relative overflow-hidden">
      <NavForLanding />

      {/* Background Decor - Matches Landing Page Grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `radial-gradient(white 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }}
        />
        <div className="absolute top-0 right-1/4 w-px h-screen bg-white/5" />
        <div className="absolute top-1/2 left-0 w-screen h-px bg-white/5" />
      </div>

      <div className="w-full max-w-5xl grid lg:grid-cols-2 gap-20 items-center relative z-10">
        {/* Left Side: Brand Narrative */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="hidden lg:block"
        >
          <div className="flex items-center gap-3 mb-8">
            <Fingerprint
              className="text-[#98465f]"
              size={20}
              strokeWidth={1.5}
            />
            <span className="text-[10px] tracking-[0.5em] uppercase text-muted font-medium">
              Identity Gateway
            </span>
          </div>

          <h1 className="text-6xl font-light tracking-[-0.04em] leading-[1.1] text-strong mb-8">
            Initialize <br />
            <span className="italic font-serif text-slate-500">
              Secure Session
            </span>
          </h1>

          <p className="max-w-sm text-muted text-lg font-light leading-[1.8] mb-12 border-l border-[#98465f]/30 pl-8">
            Access the tool-augmented layer. Enter your credentials to verify
            deterministic authority.
          </p>

          <div className="flex items-center gap-4 opacity-40">
            <ShieldCheck size={18} className="text-white" strokeWidth={1} />
            <span className="text-[9px] uppercase tracking-[0.3em] text-white font-light">
              Protocol: AES-256 Cloud Isolation
            </span>
          </div>
        </motion.div>

        {/* Right Side: Interactive Form Container */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="relative bg-app-strong border border-white/5 p-10 md:p-16 shadow-2xl"
        >
          {/* Form Header / Toggle */}
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-[10px] uppercase tracking-[0.4em] text-[#98465f] font-bold mb-2">
                {mode === 'login' ? 'Existing Operator' : 'New Intelligence'}
              </h2>
              <h3 className="text-3xl font-light tracking-tight text-white capitalize">
                {mode}
              </h3>
            </div>
            <button
              onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
              className="text-[10px] uppercase tracking-widest text-muted hover:text-white transition-colors pb-1 border-b border-white/10"
            >
              Switch to {mode === 'login' ? 'Sign Up' : 'Login'}
            </button>
          </div>

          <form className="space-y-8">
            <AnimatePresence mode="wait">
              {mode === 'signup' && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2"
                >
                  <label className="text-[9px] uppercase tracking-[0.3em] text-slate-500 pl-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full bg-transparent border-b border-white/10 py-3 text-white font-light focus:outline-none focus:border-[#98465f] transition-colors placeholder:text-slate-800"
                    placeholder="IDENTIFY_NAME"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] text-slate-500 pl-1">
                Email Address
              </label>
              <input
                type="email"
                className="w-full bg-transparent border-b border-white/10 py-3 text-white font-light focus:outline-none focus:border-[#98465f] transition-colors placeholder:text-slate-800"
                placeholder="OPERATOR_EMAIL"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[9px] uppercase tracking-[0.3em] text-slate-500 pl-1">
                Access Key
              </label>
              <input
                type="password"
                className="w-full bg-transparent border-b border-white/10 py-3 text-white font-light focus:outline-none focus:border-[#98465f] transition-colors placeholder:text-slate-800"
                placeholder="••••••••"
              />
            </div>

            <div className="pt-6">
              <button className="group relative w-full flex items-center justify-between bg-white px-8 py-5 transition-all duration-500 overflow-hidden">
                <span className="relative z-10 text-black group-hover:text-white text-[11px] font-bold uppercase tracking-[0.4em] transition-colors duration-500">
                  {mode === 'login' ? 'Authenticate' : 'Register Node'}
                </span>
                <ChevronRight
                  className="relative z-10 text-black group-hover:text-white group-hover:translate-x-1 transition-all duration-500"
                  size={16}
                />

                {/* Background Hover Slide */}
                <div className="absolute inset-0 bg-[#98465f] translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              </button>
            </div>
          </form>

          {/* Navigation Back */}
          <div className="mt-12 pt-8 border-t border-white/5">
            <Link
              to="/"
              className="text-[9px] uppercase tracking-[0.3em] text-slate-600 hover:text-[#98465f] transition-colors flex items-center gap-2"
            >
              <span className="w-4 h-[1px] bg-slate-800" />
              Return to Nexus
            </Link>
          </div>

          {/* Decorative Corner */}
          <div className="absolute top-0 right-0 w-12 h-12 border-t border-r border-white/10" />
        </motion.div>
      </div>

      {/* Footer Branding */}
      <div className="absolute bottom-10 left-10 text-[9px] uppercase tracking-[0.5em] text-slate-800 hidden md:block">
        ADIA Systems // Secure_Entry_Point
      </div>
    </main>
  );
};

export default Auth;
