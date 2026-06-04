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
    color: '#98465f',
  },
  'prj-1187': {
    name: 'Customer Feedback Engine',
    id: 'PRJ-1187',
    status: 'PROCESSING',
    color: '#98465f',
  },
  'prj-1402': {
    name: 'Inventory Audit 2026',
    id: 'PRJ-1402',
    status: 'COMPLETED',
    color: '#98465f',
  },
  'prj-1520': {
    name: 'Churn Prediction Model',
    id: 'PRJ-1520',
    status: 'IDLE',
    color: '#98465f',
  },
};

const navItems = [
  { to: 'query', label: 'Intelligence', icon: Sparkles },
  { to: 'history', label: 'History', icon: Clock3 },
  { to: 'analytics', label: 'Analytics', icon: BarChart3 },
  { to: 'notifications', label: 'Notifications', icon: Bell },
];

const ProjectLayout = () => {
  const { projectId } = useParams();
  const safeId = projectId ? projectId.toLowerCase() : 'prj-1024';
  const project = projectCatalog[safeId] || {
    name: 'Unknown Workspace',
    id: safeId.toUpperCase(),
    color: '#98465f',
    status: 'OFFLINE',
  };

  return (
    <div className="flex flex-col h-screen bg-[#0a0a0c] text-slate-400 selection:bg-[#98465f]/30">
      
      <div className="flex flex-1 overflow-hidden">
        {/* --- COMMAND DOCK (Sidebar) --- */}
        <aside className="w-20 lg:w-64 flex flex-col bg-[#0a0a0c] border-r border-white/5 z-20 shrink-0 relative">
          
          {/* Dashboard Grid Style Synchronization */}
          <div className="absolute inset-0 pointer-events-none opacity-[0.03]" style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
            backgroundSize: '20px 20px',
          }} />

          {/* Back Button Console Link */}
          <div className="p-4 border-b border-white/5 relative z-10">
            <Link
              to="/dashboard"
              className="flex items-center gap-3 px-3 py-2 hover:bg-white/[0.02] transition-all group rounded-none border border-transparent hover:border-white/5"
            >
              <div className="flex h-6 w-6 shrink-0 items-center justify-center bg-black border border-white/10 text-slate-500 group-hover:border-[#98465f]/40 group-hover:text-white transition-colors">
                <ChevronLeft size={13} strokeWidth={1.5} />
              </div>
              <span className="hidden lg:block text-[9px] font-bold uppercase tracking-[0.2em] text-slate-500 group-hover:text-[#98465f] transition-colors font-mono">
                Console Return
              </span>
            </Link>
          </div>

          {/* Navigation Matrix Rail */}
          <nav className="flex-1 px-4 space-y-1.5 py-6 relative z-10">
            <div className="hidden lg:block px-3 mb-4">
              <span className="text-[9px] font-bold uppercase tracking-[0.25em] text-slate-600 font-mono">
                System Operations
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
                      'flex items-center gap-3.5 px-3 py-2.5 rounded-none text-xs font-bold uppercase tracking-wider font-sans transition-all group border relative',
                      isActive
                        ? 'bg-white/[0.02] text-white border-white/5 border-t-[#98465f]'
                        : 'text-slate-500 hover:text-white hover:bg-white/[0.01] border-transparent hover:border-white/5',
                    ].join(' ')
                  }
                >
                  {({ isActive }) => (
                    <>
                      {/* Active State Structural Bar */}
                      {isActive && (
                        <div className="absolute top-0 left-0 w-full h-px bg-[#98465f]" />
                      )}
                      <Icon 
                        size={14} 
                        className={isActive ? 'text-[#98465f]' : 'text-slate-600 group-hover:text-white transition-colors'} 
                      />
                      <span className="hidden lg:block text-[10px] uppercase font-bold tracking-widest">{item.label}</span>
                    </>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* Sidebar System Descriptor Footer */}
          <div className="p-4 border-t border-white/5 text-[8px] font-mono font-bold tracking-widest uppercase text-slate-600 relative z-10 hidden lg:block">
            NODE // {project.id}
          </div>

        </aside>

        {/* --- MAIN STAGE --- */}
        <main
          id="main-scroll-container"
          className="flex-1 flex flex-col relative bg-[#0a0a0c] overflow-y-auto"
        >
          {/* Top Control Bar (HUD High-Density) */}
          <header className="h-14 shrink-0 flex items-center justify-between px-8 border-b border-white/5 bg-[#0a0a0c] sticky top-0 z-10">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 border border-white/5 bg-white/[0.01]">
                <Database
                  size={12}
                  strokeWidth={1.5}
                  className="text-[#98465f]"
                />
                <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  Data Layer Mounted
                </span>
              </div>
              <div className="flex items-center gap-2 px-3 py-1 border border-white/5 bg-white/[0.01]">
                <Box size={12} strokeWidth={1.5} className="text-[#98465f]" />
                <span className="text-[9px] font-mono font-bold tracking-widest text-slate-400 uppercase">
                  Documents Indexed
                </span>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button className="flex items-center gap-2 px-5 py-2 bg-white text-black hover:bg-slate-200 text-[10px] font-bold tracking-widest uppercase transition-colors rounded-none">
                <Terminal size={13} strokeWidth={2} />
                Refresh Node
              </button>
            </div>
          </header>

          {/* Sub-Page Content Area */}
          <div className="flex-1 relative">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProjectLayout;