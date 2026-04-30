import React from 'react';
import { Search, Filter, Database, ArrowUpRight, Clock, FileText, Activity } from 'lucide-react';

const HistoryPage = () => {
  const historyItems = [
    { id: 1, query: "Show me the monthly revenue growth for 2024", time: "14:20", date: "Oct 24", project: "Revenue", type: "Hybrid", status: "Complete" },
    { id: 2, query: "List all users who churned in the last 30 days", time: "09:15", date: "Oct 23", project: "Churn", type: "SQL", status: "Complete" },
    { id: 3, query: "What are common complaints in feedback logs?", time: "16:45", date: "Oct 22", project: "Feedback", type: "RAG", status: "Complete" },
  ];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">Intelligence History</h1>
          <p className="text-xs text-slate-500 uppercase font-black tracking-widest mt-1">Audit Trail & Neural Logs</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={14} />
            <input placeholder="Search logs..." className="bg-white/5 border border-white/10 rounded-xl py-2 pl-9 pr-4 text-xs focus:ring-1 focus:ring-cyan-500/50 outline-none w-64 transition-all" />
          </div>
          <button className="p-2 bg-white/5 border border-white/10 rounded-xl text-slate-400 hover:text-white transition-all">
            <Filter size={18} />
          </button>
        </div>
      </div>

      <div className="bg-[#050912] border border-white/5 rounded-2xl overflow-hidden shadow-2xl">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-white/[0.02] border-b border-white/5">
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Execution Log</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Origin</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Engine</th>
              <th className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {historyItems.map((item) => (
              <tr key={item.id} className="hover:bg-white/[0.01] transition-colors group">
                <td className="px-6 py-5">
                  <p className="text-sm font-bold text-slate-200 truncate max-w-md group-hover:text-cyan-400 transition-colors">{item.query}</p>
                  <div className="flex items-center gap-3 mt-1.5 text-[10px] text-slate-500 font-bold uppercase tracking-tighter">
                    <span className="flex items-center gap-1"><Clock size={10} /> {item.date} • {item.time}</span>
                    <span className="text-emerald-500 flex items-center gap-1"><Activity size={10} /> {item.status}</span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <span className="text-[10px] font-black bg-slate-800 text-slate-300 px-2 py-1 rounded border border-white/5 uppercase tracking-widest">{item.project}</span>
                </td>
                <td className="px-6 py-5 flex items-center gap-2">
                  <Database size={14} className="text-indigo-500" />
                  <span className="text-xs font-medium text-slate-400">{item.type}</span>
                </td>
                <td className="px-6 py-5 text-right">
                  <button className="p-2 text-slate-500 hover:text-white transition-all">
                    <ArrowUpRight size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default HistoryPage;