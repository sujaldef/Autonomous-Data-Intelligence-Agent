import React from 'react';
import { Search, Filter, Database, ArrowUpRight, Activity } from 'lucide-react';

const HistoryPage = () => {
  const historyItems = [
    {
      id: 'LOG-9142',
      query: 'ANALYZE MONTHLY REVENUE GROWTH FOR FY24',
      time: '14:20:05',
      date: '2024-10-24',
      project: 'PRJ-1024',
      type: 'HYBRID',
      status: 'COMPLETE',
    },
    {
      id: 'LOG-9141',
      query: 'LIST CHURN PROBABILITIES LAST 30 DAYS',
      time: '09:15:12',
      date: '2024-10-23',
      project: 'PRJ-1520',
      type: 'SQL',
      status: 'COMPLETE',
    },
    {
      id: 'LOG-9140',
      query: 'EXTRACT COMPLAINT TOPICS FROM FEEDBACK',
      time: '16:45:33',
      date: '2024-10-22',
      project: 'PRJ-1187',
      type: 'VECTOR',
      status: 'COMPLETE',
    },
  ];

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/5">
        <div>
          <span className="text-[10px] font-bold text-[#98465f] uppercase tracking-[0.3em] block mb-2">
            Audit Trail
          </span>
          <h1 className="text-2xl font-light text-white tracking-widest uppercase">
            Intelligence History
          </h1>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              size={12}
              strokeWidth={2}
            />
            <input
              placeholder="SEARCH LOGS..."
              className="bg-app-strong border border-white/10 rounded-none py-2 pl-8 pr-4 text-[10px] tracking-widest text-white uppercase focus:border-[#98465f]/50 outline-none w-64 transition-colors placeholder:text-muted"
            />
          </div>
          <button className="p-2 border border-white/10 bg-[#0a0a0c] text-slate-500 hover:text-white transition-colors rounded-none">
            <Filter size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* DATA GRID */}
      <div className="bg-app-strong border border-white/10 overflow-hidden rounded-none">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-black/50 border-b border-white/10">
              <th className="px-6 py-4 text-[9px] font-bold text-muted uppercase tracking-[0.2em]">
                Execution Log
              </th>
              <th className="px-6 py-4 text-[9px] font-bold text-muted uppercase tracking-[0.2em]">
                Origin
              </th>
              <th className="px-6 py-4 text-[9px] font-bold text-muted uppercase tracking-[0.2em]">
                Engine
              </th>
              <th className="px-6 py-4 text-[9px] font-bold text-muted uppercase tracking-[0.2em] text-right">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {historyItems.map((item) => (
              <tr
                key={item.id}
                className="hover-bg-app transition-colors group"
              >
                <td className="px-6 py-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-[9px] font-mono text-ui bg-white/5 px-1.5 py-0.5">
                      {item.id}
                    </span>
                    <span className="text-[9px] font-mono text-muted tracking-wider">
                      {item.date} {item.time}
                    </span>
                  </div>
                  <p className="text-[11px] font-mono tracking-wide text-ui group-hover:text-white transition-colors">
                    {item.query}
                  </p>
                </td>
                <td className="px-6 py-5">
                  <span className="text-[9px] font-bold pill-bg border border-white/5 text-muted px-2 py-1 uppercase tracking-widest">
                    {item.project}
                  </span>
                </td>
                <td className="px-6 py-5">
                  <div className="flex items-center gap-2">
                    <Database
                      size={12}
                      strokeWidth={1.5}
                      className="text-[#98465f]"
                    />
                    <span className="text-[10px] font-bold tracking-widest text-muted uppercase">
                      {item.type}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-5">
                  <div className="flex flex-col items-end gap-2">
                    <div className="flex items-center gap-1.5 text-emerald-500">
                      <Activity size={10} strokeWidth={2} />
                      <span className="text-[9px] font-bold uppercase tracking-widest">
                        {item.status}
                      </span>
                    </div>
                    <button className="text-muted hover:text-white transition-colors flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold">
                      View <ArrowUpRight size={10} strokeWidth={2} />
                    </button>
                  </div>
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
