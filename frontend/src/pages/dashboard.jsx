import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Database, 
  Activity, 
  Settings, 
  Plus, 
  User,
  LayoutDashboard,
  Server,
  Clock,
  ChevronRight,
  Search,
  Box
} from 'lucide-react';

const Dashboard = () => {
  const user = {
    name: "Alex Rivera",
    email: "alex.r@adia-systems.ai",
    role: "Senior Data Analyst",
    projectsCount: 4
  };

  const projects = [
    {
      id: 1,
      routeId: 'q4-revenue-analysis',
      name: "Q4 Revenue Analysis",
      sources: ["SQL", "RAG"],
      status: "Active",
      lastActivity: "2 mins ago",
      accent: "text-blue-400",
      glow: "shadow-blue-500/10"
    },
    {
      id: 2,
      routeId: 'customer-feedback-engine',
      name: "Customer Feedback Engine",
      sources: ["MongoDB", "RAG"],
      status: "Processing",
      lastActivity: "1 hour ago",
      accent: "text-purple-400",
      glow: "shadow-purple-500/10"
    },
    {
      id: 3,
      routeId: 'inventory-audit-2024',
      name: "Inventory Audit 2024",
      sources: ["SQL"],
      status: "Completed",
      lastActivity: "Yesterday",
      accent: "text-emerald-400",
      glow: "shadow-emerald-500/10"
    },
    {
      id: 4,
      routeId: 'churn-prediction-model',
      name: "Churn Prediction Model",
      sources: ["SQL", "CSV"],
      status: "Idle",
      lastActivity: "3 days ago",
      accent: "text-slate-400",
      glow: "shadow-slate-500/10"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200 font-sans selection:bg-indigo-500/30">
      {/* Sidebar / Nav Overlay (Optional Visual) */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* --- Top Profile Header --- */}
        <header className="relative overflow-hidden bg-slate-900/40 border border-white/5 rounded-3xl p-8 mb-10">
          <div className="absolute top-0 right-0 p-8 opacity-10">
            <Box size={120} />
          </div>
          
          <div className="relative flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-6">
              <div className="relative group">
                <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-full blur opacity-40 group-hover:opacity-75 transition duration-1000"></div>
                <div className="relative h-20 w-20 bg-slate-900 rounded-full flex items-center justify-center border border-white/10">
                  <User size={40} className="text-indigo-400" />
                </div>
              </div>
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-slate-400">
                    Welcome, {user.name.split('')[0]}
                  </h1>
                  <span className="bg-indigo-500/10 text-indigo-400 text-[10px] px-2 py-0.5 rounded-full border border-indigo-500/20 uppercase tracking-widest font-semibold">Pro</span>
                </div>
                <p className="text-slate-400 mt-1 flex items-center gap-2">
                  <span className="text-indigo-400 font-medium">{user.role}</span>
                  <span className="w-1 h-1 rounded-full bg-slate-700"></span>
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="relative flex-grow md:flex-grow-0">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                <input 
                  type="text" 
                  placeholder="Search projects..." 
                  className="w-full md:w-64 bg-slate-950/50 border border-white/5 rounded-xl py-2.5 pl-10 pr-4 focus:outline-none focus:border-indigo-500/50 transition-all text-sm"
                />
              </div>
              <button className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl transition-all font-semibold shadow-lg shadow-indigo-600/20">
                <Plus size={18} />
                <span className="hidden sm:inline">New Project</span>
              </button>
            </div>
          </div>
        </header>

        {/* --- Key Metrics --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Active Projects', val: user.projectsCount, icon: LayoutDashboard, color: 'text-blue-400' },
            { label: 'Data Sources', val: '12', icon: Database, color: 'text-purple-400' },
            { label: 'API Queries', val: '1.2k', icon: Server, color: 'text-emerald-400' },
            { label: 'Avg. Latency', val: '24ms', icon: Activity, color: 'text-orange-400' },
          ].map((stat, i) => (
            <div key={i} className="bg-slate-900/30 border border-white/5 p-6 rounded-2xl hover:bg-slate-900/50 transition-colors group">
              <div className="flex items-center justify-between mb-4">
                <div className={`p-2 rounded-lg bg-slate-950 border border-white/5 ${stat.color}`}>
                  <stat.icon size={20} />
                </div>
                <ChevronRight size={16} className="text-slate-600 group-hover:text-slate-400 transition-colors" />
              </div>
              <p className="text-slate-500 text-sm font-medium">{stat.label}</p>
              <p className="text-2xl font-bold text-white mt-1">{stat.val}</p>
            </div>
          ))}
        </div>

        {/* --- Projects Grid --- */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <h2 className="text-xl font-bold text-white">Active Pipelines</h2>
            <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse"></div>
          </div>
          <button className="text-sm text-slate-400 hover:text-indigo-400 transition-colors">View Archival</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {projects.map((project) => (
            <Link
              key={project.id} 
              to={`/projects/${project.routeId}/query`}
              className={`group bg-slate-900/40 rounded-2xl p-6 border border-white/5 hover:border-white/10 transition-all duration-300 hover:-translate-y-1 shadow-xl ${project.glow}`}
            >
              <div className="flex justify-between items-start mb-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">{project.name}</h3>
                  <div className="flex items-center gap-2 text-slate-500 text-xs">
                    <Clock size={12} />
                    <span>Updated {project.lastActivity}</span>
                  </div>
                </div>
                <span className={`text-[10px] px-2.5 py-1 rounded-md font-bold uppercase tracking-wider bg-slate-950 border border-white/5 ${project.accent}`}>
                  {project.status}
                </span>
              </div>

              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {project.sources.map(source => (
                    <span key={source} className="flex items-center gap-1.5 text-xs bg-indigo-500/5 text-indigo-300/80 px-2.5 py-1 rounded-lg border border-indigo-500/10">
                      <Database size={10} />
                      {source}
                    </span>
                  ))}
                </div>

                <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <div key={i} className="h-7 w-7 rounded-full border-2 border-slate-900 bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                        {String.fromCharCode(64 + i)}
                      </div>
                    ))}
                  </div>
                  <button className="p-2 bg-slate-950 hover:bg-indigo-600 rounded-lg border border-white/5 transition-all text-slate-400 hover:text-white">
                    <Settings size={18} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
          
          {/* Create New Card (Ghost State) */}
          <button className="border-2 border-dashed border-white/5 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 text-slate-500 hover:text-indigo-400 hover:border-indigo-500/30 hover:bg-indigo-500/5 transition-all group">
            <div className="p-3 rounded-full bg-slate-900 group-hover:scale-110 transition-transform">
              <Plus size={24} />
            </div>
            <span className="font-medium">Initialize New Agent</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;