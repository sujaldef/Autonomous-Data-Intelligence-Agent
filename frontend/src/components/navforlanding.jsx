import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import { Fingerprint, Menu, X, Activity } from 'lucide-react';

const NavForLanding = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Handle background blur on scroll
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Architecture', path: '/architecture' },
    { name: 'Protocol', path: '/protocol' },
    { name: 'Docs', path: '/docs' },
  ];

  return (
    <nav
      className={`fixed top-0 w-full z-[100] transition-all duration-500 border-b ${
        isScrolled
          ? 'bg-app-80 backdrop-blur-xl border-white/10 py-4'
          : 'bg-transparent border-transparent py-8'
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-8 md:px-12 flex justify-between items-center">
        {/* LOGO AREA */}
        <Link to="/" className="flex items-center gap-3 group">
          <div className="relative">
            <Fingerprint
              className="text-[#98465f] w-6 h-6 transition-transform group-hover:scale-110"
              strokeWidth={1.5}
            />
            <motion.div
              animate={{ opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-[#98465f] rounded-full"
            />
          </div>
          <span className="text-white text-sm font-bold tracking-[0.4em] uppercase">
            ADIA<span className="text-slate-600 font-light">.SYS</span>
          </span>
        </Link>

        {/* DESKTOP NAV - Slim Typography */}
        <div className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-10">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="text-[10px] uppercase tracking-[0.3em] text-slate-400 hover:text-white transition-colors relative group"
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-[#98465f] transition-all group-hover:w-full" />
              </Link>
            ))}
          </div>

          <div className="h-4 w-px bg-white/10" />

          {/* DYNAMIC CTA */}
          <Link to="/auth">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center gap-3 px-6 py-2 border border-white/10 bg-white/5 rounded-none group hover:bg-white hover:border-white transition-all duration-300"
            >
              <Activity
                size={12}
                className="text-[#98465f] group-hover:text-black animate-pulse"
              />
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-white group-hover:text-black">
                {location.pathname === '/auth'
                  ? 'System_Lock'
                  : 'Access_Portal'}
              </span>
            </motion.button>
          </Link>
        </div>

        {/* MOBILE TOGGLE */}
        <button
          className="md:hidden text-white"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* MOBILE MENU OVERLAY */}
      <motion.div
        initial={false}
        animate={
          mobileMenuOpen ? { opacity: 1, x: 0 } : { opacity: 0, x: '100%' }
        }
        className="fixed inset-0 bg-app z-[90] flex flex-col items-center justify-center gap-8 md:hidden"
      >
        {navLinks.map((link) => (
          <a
            key={link.name}
            href={link.path}
            onClick={() => setMobileMenuOpen(false)}
            className="text-xl uppercase tracking-[0.5em] text-white font-light"
          >
            {link.name}
          </a>
        ))}
        <Link
          to="/auth"
          onClick={() => setMobileMenuOpen(false)}
          className="mt-4 px-10 py-4 bg-[#98465f] text-white text-xs tracking-[0.4em] uppercase"
        >
          Initialize
        </Link>
      </motion.div>
    </nav>
  );
};

export default NavForLanding;
