import React from 'react';
import { BarChart3, TrendingUp, Layers, Database, ArrowUpRight, Calendar } from 'lucide-react';

const AnalyticsPage = () => {
  const bars = [40, 55, 45, 60, 80, 70, 90, 85, 100, 95, 110, 115];

  return (
    <div className="p-8 space-y-8 overflow-y-auto">
      <div className="flex items-end justify-between">
        <div>
          <span className="text-[10px] font-black text-cyan-500 uppercase tracking-[0.3em]">Telemetry Dashboard</span>
          <h1 className="text-2xl font-bold text-white mt-1">Operational Analytics</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400">
          <Calendar size={14} /> Last 30 Days
        </button>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: 'Revenue', val: '$4.2M', delta: '+12%', icon: TrendingUp, color: 'text-emerald-400' },
          { label: 'Latency', val: '142ms', delta: '-18%', icon: Layers, color: 'text-cyan-400' },
          { label: 'Queries', val: '18.4k', delta: '+3%', icon: BarChart3, color: 'text-indigo-400' },
          { label: 'Sources', val: 'Live', delta: '3/3', icon: Database, color: 'text-amber-400' },
        ].map((m, i) => (
          <div key={i} className="p-5 bg-[#050912] border border-white/5 rounded-2xl relative overflow-hidden group">
            <m.icon size={24} className={`absolute -right-2 -bottom-2 opacity-5 ${m.color}`} />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest mb-1">{m.label}</p>
            <div className="flex items-baseline justify-between">
              <h3 className="text-2xl font-bold text-white">{m.val}</h3>
              <span className={`text-[10px] font-black ${m.delta.includes('-') ? 'text-rose-400' : 'text-emerald-400'}`}>{m.delta}</span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 p-6 bg-[#050912] border border-white/5 rounded-[2rem]">
          <div className="flex justify-between items-center mb-8">
            <h3 className="text-sm font-black uppercase tracking-widest text-white">Throughput Trends</h3>
            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-400/10 px-2 py-1 rounded">+14.2% Growth</span>
          </div>
          <div className="flex items-end gap-2 h-48 px-2">
            {bars.map((h, i) => (
              <div key={i} className="flex-1 bg-gradient-to-t from-indigo-600/50 to-cyan-400 rounded-t-lg transition-all hover:brightness-125" style={{ height: `${h}%` }} />
            ))}
          </div>
        </div>

        <div className="p-6 bg-[#050912] border border-white/5 rounded-[2rem] flex flex-col">
          <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6">Source Mix</h3>
          <div className="space-y-6 flex-grow flex flex-col justify-center">
            {[
              { name: 'SQL Query', val: '54%', color: 'bg-indigo-500' },
              { name: 'Vector Search', val: '28%', color: 'bg-cyan-500' },
              { name: 'Document RAG', val: '18%', color: 'bg-emerald-500' },
            ].map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-[10px] font-black uppercase text-slate-500 mb-2">
                  <span>{s.name}</span>
                  <span>{s.val}</span>
                </div>
                <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                  <div className={`h-full ${s.color} rounded-full`} style={{ width: s.val }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default AnalyticsPage;