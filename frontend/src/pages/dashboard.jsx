import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ArrowUpRight,
  Database,
  Plus,
  Settings,
  Search,
  Cpu,
  Zap,
  ShieldCheck,
  Filter,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../components/navbar';

const projects = [
  {
    id: 'PRJ-1024',
    name: 'Q4 Revenue Analysis',
    sources: ['SQL', 'RAG'],
    status: 'ACTIVE',
    lastActivity: '02M_AGO',
  },
  {
    id: 'PRJ-1187',
    name: 'Customer Feedback Engine',
    sources: ['MongoDB', 'RAG'],
    status: 'PROCESSING',
    lastActivity: '01H_AGO',
  },
  {
    id: 'PRJ-1402',
    name: 'Inventory Audit 2026',
    sources: ['SQL'],
    status: 'COMPLETED',
    lastActivity: 'YESTERDAY',
  },
  {
    id: 'PRJ-1520',
    name: 'Churn Prediction Model',
    sources: ['SQL', 'CSV'],
    status: 'IDLE',
    lastActivity: '03D_AGO',
  },
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { label: 'Uptime', value: '99.99%', icon: Zap },
    { label: 'Neural_Load', value: '1,284', icon: Cpu },
    { label: 'Throughput', value: '4.2 TB', icon: Database },
    { label: 'Logic_Gate', value: 'VERIFIED', icon: ShieldCheck },
  ];

  return (
    <div className="min-h-screen bg-app text-muted font-satoshi selection-accent">
      <Navbar />

      {/* Subtle CAD Grid Background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 py-10">
        {/* --- HEADER --- */}
        <header className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          <div className="flex items-center gap-6">
            {/* USER AVATAR - STRICT RECTANGLE */}
            <div className="h-20 w-20 bg-app-strong border border-white/10 flex items-center justify-center overflow-hidden">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=0a0a0c"
                alt="user"
                className="w-full h-full object-cover grayscale"
              />
            </div>

            {/* USER INFO */}
            <div className="flex flex-col">
              <p className="text-[10px] uppercase tracking-[0.3em] text-[#98465f] font-bold mb-1">
                Operator_Core
              </p>
              <h1 className="text-xl text-white tracking-widest font-bold uppercase mb-1">
                Alex Rivera
              </h1>
              <span className="text-xs tracking-widest text-muted uppercase">
                ID: OPR-7742
              </span>
            </div>
          </div>

          {/* TELEMETRY STATS - HUD GRID */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/5 border border-white/10 shrink-0">
            {stats.map((stat, i) => (
              <div
                key={i}
                className="bg-app px-6 py-4 flex flex-col min-w-[140px] hover-bg-app-strong transition-colors"
              >
                <span className="text-[9px] uppercase tracking-[0.2em] text-muted font-bold mb-2">
                  {stat.label}
                </span>
                <div className="flex items-center gap-3">
                  <stat.icon
                    size={12}
                    strokeWidth={1.5}
                    className="text-[#98465f]"
                  />
                  <span className="text-sm font-bold text-white tracking-widest leading-none">
                    {stat.value}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </header>

        {/* --- ACTION BAR --- */}
        <section className="flex items-center gap-4 mb-10 border-b border-white/5 pb-6">
          {/* SEARCH */}
          <div className="relative flex-grow max-w-md">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              size={14}
              strokeWidth={1.5}
            />
            <input
              type="text"
              placeholder="SEARCH PROTOCOLS..."
              className="w-full bg-app-strong border border-white/10 rounded-none
                         py-2.5 pl-9 pr-3 text-xs tracking-widest text-white uppercase
                         focus:outline-none focus:border-[#98465f]/50
                         placeholder:text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* NEW BUTTON */}
          <button className="flex items-center gap-2 px-6 py-2.5 bg-white text-black hover:bg-slate-200 text-[10px] font-bold tracking-[0.2em] uppercase transition-colors rounded-none">
            <Plus size={14} strokeWidth={2} />
            Initialize
          </button>

          {/* SETTINGS */}
          <button className="p-2.5 border border-white/10 rounded-none text-slate-500 hover:text-white bg-[#0a0a0c]">
            <Settings size={14} strokeWidth={1.5} />
          </button>
        </section>

        {/* --- GRID HEADER --- */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <Database size={14} className="text-[#98465f]" strokeWidth={1.5} />
            <h2 className="text-[10px] uppercase tracking-[0.3em] font-bold text-white">
              Active Workspaces
            </h2>
          </div>
          <button className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-slate-500 hover:text-white transition-colors">
            <Filter size={12} strokeWidth={1.5} />
            Filter
          </button>
        </div>

        {/* --- PROJECT GRID --- */}
        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {projects.map((project, idx) => (
            <Link to={`/projects/${project.id.toLowerCase()}`} key={project.id}>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
                className="bg-[#0a0a0c] border border-white/5 rounded-none p-6 hover:border-[#98465f]/40 transition-colors group relative flex flex-col h-full"
              >
                {/* Active Indicator Line */}
                <div
                  className={`absolute top-0 left-0 w-full h-px transition-colors ${project.status === 'ACTIVE' ? 'bg-[#98465f]' : 'bg-transparent group-hover:bg-white/10'}`}
                />

                {/* Top */}
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[9px] font-mono tracking-widest text-slate-600">
                    {project.id}
                  </span>
                  <ArrowUpRight
                    size={14}
                    strokeWidth={1}
                    className="text-slate-600 group-hover:text-white transition-colors"
                  />
                </div>

                {/* Title */}
                <h3 className="text-sm text-white tracking-wide uppercase mb-4 flex-grow">
                  {project.name}
                </h3>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.sources.map((s) => (
                    <span
                      key={s}
                      className="text-[9px] font-bold tracking-widest uppercase px-2 py-1 border border-white/5 bg-black/50 text-slate-500 rounded-none"
                    >
                      {s}
                    </span>
                  ))}
                </div>

                {/* Footer */}
                <div className="flex justify-between items-center text-[9px] uppercase tracking-widest font-bold pt-4 border-t border-white/5">
                  <span
                    className={`${
                      project.status === 'ACTIVE'
                        ? 'text-[#98465f]'
                        : project.status === 'PROCESSING'
                          ? 'text-blue-400'
                          : 'text-slate-600'
                    }`}
                  >
                    {project.status}
                  </span>
                  <span className="text-slate-600 font-mono">
                    {project.lastActivity}
                  </span>
                </div>
              </motion.div>
            </Link>
          ))}
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
