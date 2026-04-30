import React, { useState } from 'react';
import { 
  Search, 
  Filter, 
  Calendar, 
  Database, 
  ExternalLink, 
  Trash2, 
  Clock,
  ChevronRight,
  MoreVertical,
  ArrowUpRight,
  FileText
} from 'lucide-react';

const HistoryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const historyItems = [
    {
      id: 1,
      query: "Show me the monthly revenue growth for 2024 and identify drivers.",
      timestamp: "Oct 24, 2023 • 14:20",
      project: "Revenue Analysis",
      type: "Hybrid (SQL + RAG)",
      summary: "Revenue grew 14.2% in Q1. Key drivers: New subscription tier and improved retention.",
      status: "Success"
    },
    {
      id: 2,
      query: "List all users who churned in the last 30 days and their total lifetime value.",
      timestamp: "Oct 23, 2023 • 09:15",
      project: "Churn Prediction",
      type: "SQL Query",
      summary: "42 users churned. Average LTV: $1,240. Significant correlation with low login frequency.",
      status: "Success"
    },
    {
      id: 3,
      query: "What are the common complaints in the Q3 customer feedback logs?",
      timestamp: "Oct 22, 2023 • 16:45",
      project: "Customer Feedback",
      type: "RAG Analysis",
      summary: "Top complaints: UI latency (40%), Missing export features (25%), Documentation gaps (15%).",
      status: "Success"
    }
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-8">
        
        {/* --- Header & Global Actions --- */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              <Clock className="text-indigo-400" size={24} />
              Query Intelligence History
            </h1>
            <p className="text-slate-500 text-sm mt-1">Review, re-run, or audit your past AI interactions.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search past queries..." 
                className="bg-slate-900/50 border border-white/5 rounded-xl py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-indigo-500/50 w-64"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-white/5 rounded-xl text-sm font-medium hover:bg-slate-800 transition-all text-slate-300">
              <Filter size={16} />
              Filters
            </button>
          </div>
        </div>

        {/* --- Filters Bar --- */}
        <div className="flex gap-4 mb-8 overflow-x-auto pb-2">
          {['All Time', 'Revenue Analysis', 'Customer Feedback', 'SQL Only', 'RAG Only'].map((tag, i) => (
            <button key={i} className={`whitespace-nowrap px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
              i === 0 ? 'bg-indigo-500/10 border-indigo-500/50 text-indigo-400' : 'bg-transparent border-white/5 text-slate-500 hover:border-white/20'
            }`}>
              {tag}
            </button>
          ))}
        </div>

        {/* --- History Table/List --- */}
        <div className="bg-slate-900/20 border border-white/5 rounded-2xl overflow-hidden backdrop-blur-sm">
          <div className="grid grid-cols-12 gap-4 px-6 py-4 border-b border-white/5 text-[10px] uppercase tracking-widest font-bold text-slate-500 bg-white/5">
            <div className="col-span-5">Query Details</div>
            <div className="col-span-2">Source Project</div>
            <div className="col-span-2">Engine Type</div>
            <div className="col-span-2">Timestamp</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>

          <div className="divide-y divide-white/5">
            {historyItems.map((item) => (
              <div 
                key={item.id} 
                className="grid grid-cols-12 gap-4 px-6 py-5 hover:bg-white/[0.02] transition-all group cursor-pointer"
              >
                {/* Query Info */}
                <div className="col-span-5">
                  <p className="text-sm font-medium text-slate-200 line-clamp-1 group-hover:text-indigo-400 transition-colors">
                    {item.query}
                  </p>
                  <p className="text-xs text-slate-500 mt-1.5 flex items-center gap-2">
                    <FileText size={12} />
                    {item.summary}
                  </p>
                </div>

                {/* Project */}
                <div className="col-span-2 flex items-center">
                  <span className="text-xs px-2.5 py-1 bg-slate-800 rounded-lg border border-white/5 text-slate-300">
                    {item.project}
                  </span>
                </div>

                {/* Type */}
                <div className="col-span-2 flex items-center gap-2">
                  <Database size={14} className="text-slate-600" />
                  <span className="text-xs text-slate-400">{item.type}</span>
                </div>

                {/* Timestamp */}
                <div className="col-span-2 flex flex-col justify-center">
                  <div className="text-xs text-slate-300">{item.timestamp.split('•')[0]}</div>
                  <div className="text-[10px] text-slate-500 uppercase">{item.timestamp.split('•')[1]}</div>
                </div>

                {/* Actions */}
                <div className="col-span-1 flex items-center justify-end gap-2">
                  <button className="p-2 text-slate-500 hover:text-indigo-400 hover:bg-indigo-500/10 rounded-lg transition-all">
                    <ArrowUpRight size={18} />
                  </button>
                  <button className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all opacity-0 group-hover:opacity-100">
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Empty State Placeholder --- */}
        <div className="mt-8 p-10 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center text-slate-600">
          <Calendar size={48} className="mb-4 opacity-20" />
          <p className="text-sm font-medium">Looking for older records?</p>
          <button className="text-indigo-500 text-xs mt-2 hover:underline">Archive Settings</button>
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;