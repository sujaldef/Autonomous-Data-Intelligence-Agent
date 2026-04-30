import React from 'react';
import {
  Clock3,
  RotateCcw,
  ExternalLink,
  Search,
  FileText,
} from 'lucide-react';

const historyItems = [
  {
    query: 'Show monthly revenue growth for 2024',
    project: 'Q4 Revenue Analysis',
    timestamp: '2 mins ago',
    status: 'Success',
    summary: 'Revenue increased 14.2% in Q1 with the strongest lift in March.',
  },
  {
    query: 'Summarize customer complaints from the latest logs',
    project: 'Customer Feedback Engine',
    timestamp: '1 hour ago',
    status: 'Success',
    summary:
      'Top themes were latency, missing exports, and onboarding friction.',
  },
  {
    query: 'Compare inventory counts across stores',
    project: 'Inventory Audit 2024',
    timestamp: 'Yesterday',
    status: 'Draft',
    summary: 'The audit identified variance in two warehouse locations.',
  },
];

const HistoryPage = () => {
  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
              <Clock3 size={16} className="text-indigo-600" />
              History
            </div>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Past queries and outcomes
            </h2>
            <p className="mt-2 text-sm text-slate-600">
              Search, review, or re-run previous work without leaving the
              project shell.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <div className="relative">
              <Search
                size={16}
                className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
              />
              <input
                type="text"
                placeholder="Search history"
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-10 py-3 text-sm outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white sm:w-72"
              />
            </div>
            <button className="inline-flex items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-semibold text-slate-700 transition-colors hover:border-slate-300 hover:bg-slate-50">
              <RotateCcw size={16} />
              Refresh
            </button>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        {historyItems.map((item) => (
          <article
            key={item.query}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-md"
          >
            <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
              <div className="space-y-3">
                <div className="inline-flex rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600">
                  {item.project}
                </div>
                <h3 className="text-lg font-semibold tracking-tight text-slate-950">
                  {item.query}
                </h3>
                <p className="max-w-3xl text-sm leading-6 text-slate-600">
                  {item.summary}
                </p>
              </div>

              <div className="flex items-center gap-3 lg:flex-col lg:items-end">
                <span
                  className={`rounded-full px-3 py-1 text-xs font-semibold ${item.status === 'Success' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}
                >
                  {item.status}
                </span>
                <p className="text-sm text-slate-500">{item.timestamp}</p>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center gap-3 border-t border-slate-100 pt-4 text-sm text-slate-600">
              <span className="inline-flex items-center gap-2 rounded-full bg-slate-50 px-3 py-1">
                <FileText size={14} /> Query result saved
              </span>
              <button className="inline-flex items-center gap-2 font-semibold text-indigo-700 hover:text-indigo-800">
                Open details
                <ExternalLink size={14} />
              </button>
            </div>
          </article>
        ))}
      </section>
    </div>
  );
};

export default HistoryPage;
