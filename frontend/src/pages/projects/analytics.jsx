import React from 'react';
import {
  ArrowDownRight,
  ArrowUpRight,
  BarChart3,
  CalendarDays,
  Database,
  Layers,
  TrendingUp,
} from 'lucide-react';

const metrics = [
  {
    label: 'Total Revenue',
    value: '$4.2M',
    delta: '+12.5%',
    isUp: true,
    icon: TrendingUp,
  },
  {
    label: 'Active Users',
    value: '18.4k',
    delta: '+3.2%',
    isUp: true,
    icon: BarChart3,
  },
  {
    label: 'Latency',
    value: '142ms',
    delta: '-18%',
    isUp: false,
    icon: Layers,
  },
  {
    label: 'Connected Sources',
    value: '3',
    delta: 'Live',
    isUp: true,
    icon: Database,
  },
];

const analyticsBars = [54, 68, 62, 74, 88, 82, 96, 90, 104, 98, 114, 120];

const AnalyticsPage = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <BarChart3 size={16} className="text-indigo-600" />
              Analytics
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Project performance and connector usage
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              A compact overview of trends, connector mix, and recent signals.
            </p>
          </div>

          <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-white">
            <CalendarDays size={16} />
            Last 30 days
          </button>
        </div>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => {
          const Icon = metric.icon;
          return (
            <article
              key={metric.label}
              className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="rounded-2xl bg-slate-100 p-3 text-slate-700">
                  <Icon size={18} />
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${metric.isUp ? 'text-emerald-600' : 'text-rose-600'}`}
                >
                  {metric.isUp ? (
                    <ArrowUpRight size={14} />
                  ) : (
                    <ArrowDownRight size={14} />
                  )}
                  {metric.delta}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-500">{metric.label}</p>
              <p className="mt-1 text-2xl font-semibold tracking-tight text-slate-950">
                {metric.value}
              </p>
            </article>
          );
        })}
      </section>

      <section className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h3 className="text-lg font-semibold text-slate-950">
                Revenue trend
              </h3>
              <p className="text-sm text-slate-600">
                Monthly values from the current project.
              </p>
            </div>
            <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700">
              +14.2% QoQ
            </span>
          </div>

          <div className="mt-6 flex h-64 items-end gap-2 rounded-2xl bg-slate-50 p-4">
            {analyticsBars.map((height, index) => (
              <div
                key={index}
                className="flex-1 rounded-t-2xl bg-gradient-to-t from-indigo-600 to-cyan-400"
                style={{ height: `${height}%` }}
              />
            ))}
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold text-slate-950">Source mix</h3>
          <p className="mt-1 text-sm text-slate-600">
            How the project currently uses each connector.
          </p>

          <div className="mt-6 space-y-4">
            {[
              { name: 'SQL', value: '54%', tone: 'bg-indigo-500' },
              { name: 'MongoDB', value: '28%', tone: 'bg-cyan-500' },
              { name: 'RAG', value: '18%', tone: 'bg-emerald-500' },
            ].map((item) => (
              <div key={item.name}>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="font-medium text-slate-700">
                    {item.name}
                  </span>
                  <span className="text-slate-500">{item.value}</span>
                </div>
                <div className="h-2 rounded-full bg-slate-100">
                  <div
                    className={`h-2 rounded-full ${item.tone}`}
                    style={{ width: item.value }}
                  />
                </div>
              </div>
            ))}
          </div>
        </article>
      </section>
    </div>
  );
};

export default AnalyticsPage;
