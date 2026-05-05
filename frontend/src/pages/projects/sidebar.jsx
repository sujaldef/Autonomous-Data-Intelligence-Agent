import React from 'react';
import { NavLink, Outlet, useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  BarChart3,
  Clock3,
  Sparkles,
  ChevronLeft,
  Database,
  Terminal,
  Activity,
  Cpu,
  Bell,
  Box,
} from 'lucide-react';
import Navbar from '../../components/navbar';

const projectCatalog = {
  'prj-1024': {
    name: 'Q4 Revenue Analysis',
    id: 'PRJ-1024',
    status: 'ACTIVE',
    color: 'bg-[#98465f]',
  },
  'prj-1187': {
    name: 'Customer Feedback Engine',
    id: 'PRJ-1187',
    status: 'PROCESSING',
    color: 'bg-blue-500',
  },
  'prj-1402': {
    name: 'Inventory Audit 2026',
    id: 'PRJ-1402',
    status: 'COMPLETED',
    color: 'bg-emerald-500',
  },
  'prj-1520': {
    name: 'Churn Prediction Model',
    id: 'PRJ-1520',
    status: 'IDLE',
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
  const safeId = projectId ? projectId.toLowerCase() : 'prj-1024';
  const project = projectCatalog[safeId] || {
    name: 'Unknown Workspace',
    id: safeId.toUpperCase(),
    color: 'bg-slate-700',
    status: 'OFFLINE',
  };

  return (
    <div className="flex flex-col h-screen bg-app text-muted font-satoshi selection-accent">
      {/* Top Navbar */}
      <Navbar />

      <div className="flex flex-1 overflow-hidden">
        {/* --- COMMAND DOCK (Sidebar) --- */}
        <aside className="w-20 lg:w-64 flex flex-col bg-app border-r border-white/5 z-20 shrink-0 relative">
          {/* Subtle Grid Background for Sidebar */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-[radial-gradient(white_1px,transparent_1px)] [background-size:20px_20px]" />

          {/* Back Button */}
          <div className="p-4 border-b border-white/5 relative z-10">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2 hover:bg-white/5 transition-colors group rounded-none border border-transparent hover:border-white/10"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-black border border-white/10 text-slate-500 group-hover:text-white transition-colors">
                <ChevronLeft size={14} strokeWidth={1.5} />
              </div>
              <span className="hidden lg:block text-[10px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-white transition-colors">
                Console Return
              </span>
            </Link>
          </div>

          {/* Project Branding */}
          <div className="p-6 border-b border-white/5 relative z-10 bg-app-strong">
            <div className="flex items-center gap-4">
              <div
                className={`h-2 w-2 ${project.color} shadow-[0_0_8px_currentColor] opacity-80`}
              />
              <div className="hidden lg:block">
                <p className="text-[9px] font-mono text-muted uppercase tracking-widest mb-1">
                  ID: {project.id}
                </p>
                <h2 className="text-xs font-bold text-strong uppercase tracking-widest leading-tight">
                  {project.name}
                </h2>
              </div>
            </div>
          </div>

          {/* Navigation Rail */}
          <nav className="flex-1 px-4 py-6 space-y-1 relative z-10">
            <div className="hidden lg:block px-3 mb-6">
              <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-muted">
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
                    `flex items-center gap-4 px-3 py-3 rounded-none text-[10px] uppercase font-bold tracking-[0.2em] transition-all group border-l-2 ${
                      isActive
                        ? 'bg-white/5 text-white border-[#98465f]'
                        : 'text-muted hover:text-ui hover:bg-white/5 border-transparent'
                    }`
                  }
                >
                  {({ isActive }) => (
                    <>
                      <Icon
                        size={16}
                        strokeWidth={isActive ? 2 : 1.5}
                        className={isActive ? 'text-[#98465f]' : 'text-muted'}
                      />
                      <span className="hidden lg:block">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* System Health Footer */}
          <div className="p-6 mt-auto border-t border-white/5 bg-app-strong relative z-10">
            <div className="flex items-center gap-4">
              <div className="h-8 w-8 shrink-0 pill-bg border border-white/5 flex items-center justify-center text-emerald-500">
                <Activity size={14} strokeWidth={1.5} />
              </div>
              <div className="hidden lg:block">
                <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest mb-0.5">
                  SYS_STATUS
                </p>
                <p className="text-[10px] font-mono text-emerald-500 tracking-wider">
                  SYNCED
                </p>
              </div>
            </div>
          </div>
        </aside>

        {/* --- MAIN STAGE --- */}
        <main id="main-scroll-container" className="flex-1 flex flex-col relative bg-app overflow-y-auto">
          {/* Top Control Bar (HUD High-Density) */}
          <header className="h-14 shrink-0 flex items-center justify-between px-8 border-b border-white/5 bg-[#0a0a0c] sticky top-0 z-10">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-black/50">
                <Database
                  size={12}
                  strokeWidth={1.5}
                  className="text-[#98465f]"
                />
                <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400">
                  SRC_SQL_01
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 border border-white/10 bg-black/50">
                <Box size={12} strokeWidth={1.5} className="text-[#98465f]" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400">
                  RAG_IDX_A
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-4 py-1.5 bg-[#98465f] hover:bg-[#b35c75] text-black text-[9px] font-bold tracking-[0.2em] uppercase transition-colors rounded-none">
                <Terminal size={12} strokeWidth={2} />
                Refresh Node
              </button>
            </div>
          </header>

          {/* Sub-Page Content */}
          <div className="flex-1 relative">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectLayout;
