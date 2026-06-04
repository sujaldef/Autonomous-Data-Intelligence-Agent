import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Layers,
  Database,
  Calendar,
} from 'lucide-react';

const AnalyticsPage = () => {
  const bars = [40, 55, 45, 60, 80, 70, 90, 85, 100, 95, 110, 115];

  return (
    <div className="p-8 space-y-8 overflow-y-auto">
      {/* HEADER */}
      <div className="flex items-end justify-between border-b border-white/5 pb-6">
        <div>
          <span className="text-[10px] font-bold text-[#98465f] uppercase tracking-[0.3em] block mb-2">
            Telemetry Dashboard
          </span>
          <h1 className="text-2xl font-light text-white uppercase tracking-widest">
            Operational Analytics
          </h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0c] border border-white/10 rounded-none text-[10px] uppercase font-bold tracking-[0.2em] text-slate-400 hover:text-white transition-colors">
          <Calendar size={12} strokeWidth={1.5} /> Last 30 Days
        </button>
      </div>

      {/* METRIC CARDS */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 border border-white/10">
        {[
          {
            label: 'Revenue',
            val: '$4.2M',
            delta: '+12%',
            icon: TrendingUp,
            color: 'text-emerald-500',
          },
          {
            label: 'Latency',
            val: '142ms',
            delta: '-18%',
            icon: Layers,
            color: 'text-[#98465f]',
          },
          {
            label: 'Queries',
            val: '18.4k',
            delta: '+3%',
            icon: BarChart3,
            color: 'text-white',
          },
          {
            label: 'Sources',
            val: 'Live',
            delta: '3/3',
            icon: Database,
            color: 'text-amber-500',
          },
        ].map((m, i) => (
          <div
            key={i}
            className="p-6 bg-app relative group hover-bg-app-strong transition-colors flex flex-col"
          >
            <m.icon
              size={20}
              strokeWidth={1}
              className={`absolute top-6 right-6 opacity-20 ${m.color}`}
            />
            <p className="text-[9px] font-bold text-muted uppercase tracking-[0.2em] mb-4">
              {m.label}
            </p>
            <div className="flex items-baseline justify-between mt-auto">
              <h3 className="text-2xl font-mono text-strong tracking-tight">
                {m.val}
              </h3>
              <span
                className={`text-[9px] font-bold tracking-widest ${m.delta.includes('-') ? 'text-rose-500' : 'text-emerald-500'}`}
              >
                {m.delta}
              </span>
            </div>
          </div>
        ))}
      </section>

      {/* CHARTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* THROUGHPUT BAR CHART */}
        <div className="lg:col-span-2 p-6 bg-app-strong border border-white/10 rounded-none flex flex-col">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              Throughput Trends
            </h3>
            <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 tracking-widest border border-emerald-500/20">
              +14.2% Growth
            </span>
          </div>

          <div className="flex items-end gap-1 h-48 mt-auto">
            {bars.map((h, i) => (
              <div
                key={i}
                className="flex-1 bg-white/10 hover:bg-[#98465f] transition-colors rounded-none"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
          {/* Chart Axis fake labels */}
          <div className="flex justify-between mt-4 text-[8px] font-mono text-muted border-t border-white/5 pt-2">
            <span>WK_01</span>
            <span>WK_12</span>
          </div>
        </div>

        {/* SOURCE MIX HORIZONTAL BARS */}
        <div className="p-6 bg-app-strong border border-white/10 rounded-none flex flex-col">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-8 pb-4 border-b border-white/5">
            Source Mix
          </h3>

          <div className="space-y-6 flex-grow flex flex-col justify-center">
            {[
              { name: 'SQL Query', val: '54%', color: 'bg-[#98465f]' },
              { name: 'Vector Search', val: '28%', color: 'bg-white/40' },
              { name: 'Document RAG', val: '18%', color: 'bg-white/20' },
            ].map((s) => (
              <div key={s.name}>
                <div className="flex justify-between text-[9px] font-bold uppercase tracking-widest text-muted mb-2">
                  <span>{s.name}</span>
                  <span className="font-mono text-strong">{s.val}</span>
                </div>
                {/* Thin HUD bar */}
                <div className="h-1 w-full bg-white/5 rounded-none overflow-hidden">
                  <div
                    className={`h-full ${s.color} rounded-none`}
                    style={{ width: s.val }}
                  />
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
