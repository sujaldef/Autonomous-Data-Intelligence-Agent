import React from 'react';
import { NavLink, Outlet, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Clock3,
  Sparkles,
  LayoutDashboard,
  ChevronLeft,
  Database,
  Terminal,
  Activity,
  Cpu,
  Bell,
} from 'lucide-react';

const projectCatalog = {
  'q4-revenue-analysis': {
    name: 'Q4 Revenue',
    id: 'PRJ-1024',
    status: 'Active',
    color: 'bg-emerald-500',
  },
  'customer-feedback-engine': {
    name: 'Feedback',
    id: 'PRJ-1187',
    status: 'Processing',
    color: 'bg-violet-500',
  },
  'inventory-audit-2024': {
    name: 'Audit 2024',
    id: 'PRJ-1402',
    status: 'Completed',
    color: 'bg-sky-500',
  },
  'churn-prediction-model': {
    name: 'Churn AI',
    id: 'PRJ-1520',
    status: 'Idle',
    color: 'bg-slate-500',
  },
};

const navItems = [
  { to: 'query', label: 'Intelligence', icon: Sparkles },
  { to: 'history', label: 'Audit Trail', icon: Clock3 },
  { to: 'analytics', label: 'Metrics', icon: BarChart3 },
  { to: 'notifications', label: 'Notifications', icon: Bell },
];

const ProjectLayout = () => {
  const { projectId } = useParams();
  const project = projectCatalog[projectId] || {
    name: 'Workspace',
    id: 'PRJ-000',
    color: 'bg-cyan-500',
  };

  return (
    <div className="flex h-screen bg-[#020617] text-slate-200 overflow-hidden font-sans">
      {/* --- SLIM COMMAND DOCK (Joined Left) --- */}
      <aside className="w-20 lg:w-64 flex flex-col bg-[#050912] border-r border-white/5 z-20">
        {/* Project Selector / Back Button */}
        <div className="p-4 border-b border-white/5">
          <Link
            to="/"
            className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-white/5 transition-colors group"
          >
            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-slate-900 border border-white/10 text-slate-400 group-hover:text-white group-hover:border-white/20 transition-all">
              <ChevronLeft size={16} />
            </div>
            <span className="hidden lg:block text-xs font-bold uppercase tracking-widest text-slate-500 group-hover:text-slate-300">
              Dashboard
            </span>
          </Link>
        </div>

        {/* Project Branding */}
        <div className="p-6">
          <div className="flex items-center gap-4">
            <div
              className={`h-3 w-3 rounded-full ${project.color} shadow-[0_0_10px_rgba(0,0,0,0.5)]`}
            />
            <div className="hidden lg:block">
              <h2 className="text-sm font-black text-white truncate w-32 tracking-tight">
                {project.name}
              </h2>
              <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                ID: {project.id}
              </p>
            </div>
          </div>
        </div>

        {/* Navigation Rail */}
        <nav className="flex-1 px-4 space-y-2">
          <div className="hidden lg:block px-3 mb-4">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-600">
              Operations
            </span>
          </div>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  [
                    'flex items-center gap-4 px-3 py-3 rounded-xl text-sm font-bold transition-all group',
                    isActive
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 shadow-[0_0_20px_rgba(6,182,212,0.1)]'
                      : 'text-slate-500 hover:text-slate-200 hover:bg-white/5 border border-transparent',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={20} strokeWidth={isActive ? 2.5 : 2} />

                    <span className="hidden lg:block">{item.label}</span>

                    {isActive && (
                      <motion.div
                        layoutId="activePill"
                        className="hidden lg:block ml-auto h-1.5 w-1.5 rounded-full bg-cyan-400 shadow-[0_0_8px_#22d3ee]"
                      />
                    )}
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>

        {/* System Health (Footer of Sidebar) */}
        <div className="p-6 mt-auto border-t border-white/5 bg-slate-950/30">
          <div className="flex items-center gap-4">
            <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-900 border border-white/10 flex items-center justify-center text-emerald-500">
              <Activity size={18} />
            </div>
            <div className="hidden lg:block">
              <p className="text-[10px] font-black text-slate-500 uppercase">
                Agent Status
              </p>
              <p className="text-xs font-bold text-white">
                Live & Synchronized
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* --- MAIN STAGE --- */}
      <main className="flex-1 flex flex-col relative bg-[#020617] overflow-y-auto">
        {/* Subtle Backdrop Accent */}
        <div className="absolute top-0 left-0 w-full h-[300px] bg-gradient-to-b from-cyan-500/5 to-transparent pointer-events-none" />

        {/* Top Control Bar (Professional High-Density) */}
        <header className="h-14 shrink-0 flex items-center justify-between px-8 border-b border-white/5 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
              <Database size={14} className="text-indigo-400" />
              <span className="text-[10px] font-mono font-bold text-slate-300">
                SQL_MASTER_DB
              </span>
            </div>
            <div className="flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 rounded-lg">
              <Cpu size={14} className="text-cyan-400" />
              <span className="text-[10px] font-mono font-bold text-slate-300">
                ADIA_v3.2_OAI
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="flex items-center gap-2 px-4 py-1.5 bg-cyan-500 text-black text-xs font-black rounded-lg hover:bg-cyan-400 transition-colors shadow-lg shadow-cyan-500/20">
              <Terminal size={14} />
              SYNC ASSETS
            </button>
          </div>
        </header>

        {/* Sub-Page Content */}
        <div className="flex-1 relative">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default ProjectLayout;
