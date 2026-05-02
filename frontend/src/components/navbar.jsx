import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, FolderKanban, Cpu, User } from 'lucide-react';

const Navbar = () => {
  const navItems = [
    { to: '/dashboard', label: 'CONSOLE', icon: LayoutDashboard },
    { to: '/projects', label: 'WORKSPACES', icon: FolderKanban },
  ];

  return (
    <header className="sticky top-0 z-[100] bg-app border-b border-white/5 px-8">
      <div className="max-w-[1400px] mx-auto h-14 flex items-center justify-between">
        {/* LOGO & NAV GROUPED LEFT */}
        <div className="flex items-center gap-12">
          <NavLink to="/" className="flex items-center gap-3">
            <Cpu size={16} className="text-[#98465f]" />
            <span className="text-[10px] tracking-[0.4em] text-white font-bold uppercase">
              ADIA
            </span>
          </NavLink>

          <nav className="flex items-center gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `flex items-center gap-2 px-4 py-1.5 text-[10px] tracking-[0.2em] font-bold uppercase transition-all ${
                    isActive
                      ? 'text-white border border-white/10 bg-white/5'
                      : 'text-muted hover:text-ui'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>

        {/* MINIMAL USER/STATUS ACTION */}
        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-1 h-1 bg-emerald-500 rounded-full animate-pulse" />
            <span className="text-[9px] text-muted tracking-widest uppercase font-mono">
              SYS_OK
            </span>
          </div>
          <button className="h-7 w-7 border border-white/10 flex items-center justify-center text-muted hover:text-white transition-colors">
            <User size={14} />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
