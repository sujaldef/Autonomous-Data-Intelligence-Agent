import React, { useState } from 'react';
import { Database, Sparkles, Send, ArrowRight } from 'lucide-react';

const starterPrompts = [
  'Show monthly revenue growth for 2024',
  'Compare SQL and MongoDB data quality',
  'Summarize customer feedback trends',
];

const QueryPage = () => {
  const [query, setQuery] = useState('');

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-indigo-600">
              Query workspace
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-950">
              Ask a question across SQL, MongoDB, and RAG.
            </h2>
            <p className="mt-3 text-sm leading-6 text-slate-600">
              Keep the sidebar fixed while the main panel updates with each
              project page.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 text-xs font-semibold text-slate-600">
            <span className="rounded-full bg-slate-100 px-3 py-1">SQL</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">MongoDB</span>
            <span className="rounded-full bg-slate-100 px-3 py-1">RAG</span>
          </div>
        </div>

        <div className="mt-6 grid gap-3 lg:grid-cols-[1fr_auto]">
          <textarea
            rows="4"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Ask about revenue, customers, usage spikes, or feedback themes..."
            className="min-h-32 w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-900 outline-none transition-colors placeholder:text-slate-400 focus:border-indigo-300 focus:bg-white"
          />
          <button className="inline-flex items-center justify-center gap-2 rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white shadow-lg shadow-slate-950/10 transition-transform hover:-translate-y-0.5">
            <Send size={18} />
            Run query
          </button>
        </div>

        <div className="mt-4 flex flex-wrap gap-2">
          {starterPrompts.map((prompt) => (
            <button
              key={prompt}
              onClick={() => setQuery(prompt)}
              className="rounded-full border border-slate-200 bg-white px-3 py-1.5 text-xs font-medium text-slate-600 transition-colors hover:border-indigo-200 hover:bg-indigo-50 hover:text-indigo-700"
            >
              {prompt}
            </button>
          ))}
        </div>
      </section>

      <section className="grid gap-4 lg:grid-cols-2">
        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Sparkles size={16} className="text-indigo-600" />
            Suggested workflow
          </div>
          <div className="mt-4 space-y-3 text-sm text-slate-600">
            <p className="rounded-2xl bg-slate-50 px-4 py-3">
              1. Start with a business question.
            </p>
            <p className="rounded-2xl bg-slate-50 px-4 py-3">
              2. Blend structured data with document context.
            </p>
            <p className="rounded-2xl bg-slate-50 px-4 py-3">
              3. Review the answer and drill into the history or analytics tabs.
            </p>
          </div>
        </article>

        <article className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
            <Database size={16} className="text-indigo-600" />
            Connected sources
          </div>
          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {['Revenue_DB', 'Customer_Feedback', 'Vector_Search'].map(
              (source) => (
                <div
                  key={source}
                  className="rounded-2xl border border-slate-200 bg-slate-50 p-4 text-sm font-medium text-slate-700"
                >
                  {source}
                </div>
              ),
            )}
          </div>
          <button className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-indigo-700 hover:text-indigo-800">
            View source settings
            <ArrowRight size={16} />
          </button>
        </article>
      </section>
    </div>
  );
};

export default QueryPage;
