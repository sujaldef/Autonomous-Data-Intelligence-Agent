import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Activity,
  ArrowUpRight,
  Database,
  Plus,
  Settings,
  Search,
  Cpu,
  Zap,
  ShieldCheck,
  LayoutGrid,
  Filter,
  MoreVertical
} from 'lucide-react';

const projects = [
  { id: 1, name: 'Q4 Revenue Analysis', routeId: 'q4-revenue-analysis', sources: ['SQL', 'RAG'], status: 'Active', lastActivity: '2 mins ago', glow: 'shadow-emerald-500/10 border-emerald-500/20' },
  { id: 2, name: 'Customer Feedback Engine', routeId: 'customer-feedback-engine', sources: ['MongoDB', 'RAG'], status: 'Processing', lastActivity: '1 hour ago', glow: 'shadow-violet-500/10 border-violet-500/20' },
  { id: 3, name: 'Inventory Audit 2024', routeId: 'inventory-audit-2024', sources: ['SQL'], status: 'Completed', lastActivity: 'Yesterday', glow: 'shadow-sky-500/10 border-sky-500/20' },
  { id: 4, name: 'Churn Prediction Model', routeId: 'churn-prediction-model', sources: ['SQL', 'CSV'], status: 'Idle', lastActivity: '3 days ago', glow: 'shadow-slate-500/10 border-slate-500/20' },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Agent Uptime', value: '99.9%', icon: Zap, color: 'text-amber-400' },
    { label: 'Active Queries', value: '1,284', icon: Cpu, color: 'text-indigo-400' },
    { label: 'Data Synced', value: '4.2 TB', icon: Database, color: 'text-cyan-400' },
    { label: 'Security Status', value: 'Verified', icon: ShieldCheck, color: 'text-emerald-400' },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-cyan-500/30">
      {/* Background Ambient Glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-indigo-500/5 blur-[120px] rounded-full" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-cyan-500/5 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6 py-10">
        
        {/* --- Top Section: Profile & Identity --- */}
        <header className="flex flex-col md:flex-row md:items-center justify-between mb-12 gap-6">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="absolute -inset-1 bg-gradient-to-r from-cyan-500 to-indigo-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
              <div className="relative h-14 w-14 rounded-2xl bg-slate-900 border border-white/10 flex items-center justify-center overflow-hidden">
                <img src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex" alt="Avatar" className="h-12 w-12" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Alex Rivera</h1>
              <p className="text-slate-500 text-sm font-medium tracking-wide">Senior Data Intelligence Analyst</p>
            </div>
          </div>

          {/* --- KPI Row --- */}
          <div className="grid grid-cols-2 md:flex items-center gap-4 md:gap-8 bg-white/5 border border-white/10 px-6 py-3 rounded-[2rem] backdrop-blur-sm">
            {stats.map((stat, i) => (
              <div key={i} className="flex flex-col md:items-center">
                <span className="text-[10px] uppercase font-black tracking-widest text-slate-500 mb-1">{stat.label}</span>
                <div className="flex items-center gap-2">
                  <stat.icon size={14} className={stat.color} />
                  <span className="text-sm font-bold text-white tracking-tight">{stat.value}</span>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* --- Action Bar: Search & Add Project --- */}
        <section className="flex flex-col md:flex-row items-center gap-4 mb-10">
          <div className="relative flex-grow group w-full">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-cyan-400 transition-colors" size={18} />
            <input 
              type="text" 
              placeholder="Search projects, datasets, or neural logs..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-12 pr-4 text-sm focus:outline-none focus:ring-1 focus:ring-cyan-500/50 transition-all placeholder:text-slate-600"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex items-center gap-3 w-full md:w-auto">
            <button className="flex-grow md:flex-grow-0 flex items-center justify-center gap-2 px-6 py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-2xl text-sm font-bold transition-all shadow-lg shadow-indigo-600/20 active:scale-95">
              <Plus size={18} />
              New Project
            </button>
            <button className="p-3.5 bg-white/5 border border-white/10 rounded-2xl text-slate-400 hover:text-white transition-all">
              <Settings size={20} />
            </button>
          </div>
        </section>

        {/* --- Grid Header --- */}
        <div className="flex items-center justify-between mb-6 px-2">
          <div className="flex items-center gap-2">
            <LayoutGrid size={16} className="text-cyan-400" />
            <h2 className="text-xs uppercase font-black tracking-[0.2em] text-slate-400">Active Intelligence Workspace</h2>
          </div>
          <button className="flex items-center gap-2 text-xs font-bold text-slate-500 hover:text-white transition-colors">
            <Filter size={14} />
            Filter by status
          </button>
        </div>

        {/* --- Project Cards Grid --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {projects.map((project) => (
            <motion.div
              key={project.id}
              whileHover={{ y: -5 }}
              className="group"
            >
              <Link
                to={`/projects/${project.routeId}/query`}
                className={`flex flex-col h-full rounded-[2rem] border bg-slate-900/40 p-6 transition-all duration-300 shadow-xl ${project.glow} hover:bg-slate-900/60`}
              >
                <div className="flex justify-between items-start mb-6">
                  <div className="h-10 w-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                    <Database size={20} />
                  </div>
                  <button className="text-slate-600 hover:text-white">
                    <MoreVertical size={18} />
                  </button>
                </div>

                <div className="flex-grow">
                  <h3 className="text-lg font-bold text-white mb-2 group-hover:text-cyan-400 transition-colors leading-tight">
                    {project.name}
                  </h3>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.sources.map((source) => (
                      <span key={source} className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-slate-400">
                        {source}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-5 border-t border-white/5 flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-[10px] uppercase font-black text-slate-600 tracking-tighter mb-1">Status</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-md w-fit ${
                      project.status === 'Active' ? 'bg-emerald-500/10 text-emerald-400' :
                      project.status === 'Processing' ? 'bg-violet-500/10 text-violet-400 animate-pulse' :
                      'bg-slate-500/10 text-slate-500'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                  <div className="flex flex-col items-end">
                    <span className="text-[10px] uppercase font-black text-slate-600 tracking-tighter mb-1">Activity</span>
                    <span className="text-[10px] font-bold text-slate-400">{project.lastActivity}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;