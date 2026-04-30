import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import {
  LayoutDashboard,
  FolderKanban,
  Search,
  Bell,
  Command,
  Cpu,
  Circle,
} from 'lucide-react';

const navItems = [
  { to: '/dashboard', label: 'Console', icon: LayoutDashboard },
  {
    to: '/projects/q4-revenue-analysis/query',
    label: 'Workspaces',
    icon: FolderKanban,
  },
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-[100] border-b border-white/5 bg-[#020617]/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-2.5">
        {/* --- Left: Branding --- */}
        <div className="flex items-center gap-8">
          <Link to="/dashboard" className="flex items-center gap-3 group">
            <div className="relative">
              <div className="absolute -inset-1 bg-cyan-500 rounded-lg blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
              <div className="relative flex h-8 w-8 items-center justify-center rounded-lg bg-slate-900 border border-white/10 shadow-inner">
                <Cpu size={18} className="text-cyan-400" />
              </div>
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-[13px] font-black text-white tracking-tighter uppercase">
                ADIA<span className="text-cyan-500">.</span>SYSTEMS
              </span>
              <span className="text-[9px] font-mono font-bold text-slate-500 tracking-widest">
                v3.2_CORE
              </span>
            </div>
          </Link>

          {/* --- Navigation --- */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    `flex items-center gap-2.5 px-4 py-2 rounded-xl text-xs font-bold tracking-wide transition-all ${
                      isActive
                        ? 'bg-white/5 text-white border border-white/10 shadow-lg'
                        : 'text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent'
                    }`
                  }
                >
                  <Icon size={14} strokeWidth={2.5} />
                  {item.label}
                </NavLink>
              );
            })}
          </nav>
        </div>

      

        {/* --- Right: Global Status & Profile --- */}
        <div className="flex items-center gap-5">
          {/* Agent Status */}
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/5 border border-emerald-500/10">
            <div className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <Circle
                size={8}
                className="relative inline-flex rounded-full fill-emerald-500 text-emerald-500"
              />
            </div>
            <span className="text-[10px] font-black text-emerald-500 uppercase tracking-widest">
              Agent Link Active
            </span>
          </div>

          <div className="h-4 w-px bg-white/10 mx-1" />

          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-white transition-colors relative">
              <Bell size={18} />
              <span className="absolute -top-1 -right-1 h-2 w-2 bg-indigo-500 rounded-full border-2 border-[#020617]" />
            </button>

            <div className="h-8 w-8 rounded-full border border-white/10 bg-slate-800 flex items-center justify-center overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex"
                alt="user"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
