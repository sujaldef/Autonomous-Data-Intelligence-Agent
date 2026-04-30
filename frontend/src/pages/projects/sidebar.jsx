import React from 'react';
import { NavLink, Outlet, useParams } from 'react-router-dom';
import { BarChart3, Clock3, Sparkles, CircleDashed } from 'lucide-react';

const projectCatalog = {
  'q4-revenue-analysis': {
    name: 'Q4 Revenue Analysis',
    id: 'PRJ-1024',
    owner: 'Alex Rivera',
    status: 'Active',
    sources: 'SQL · RAG',
  },
  'customer-feedback-engine': {
    name: 'Customer Feedback Engine',
    id: 'PRJ-1187',
    owner: 'Alex Rivera',
    status: 'Processing',
    sources: 'MongoDB · RAG',
  },
  'inventory-audit-2024': {
    name: 'Inventory Audit 2024',
    id: 'PRJ-1402',
    owner: 'Alex Rivera',
    status: 'Completed',
    sources: 'SQL',
  },
  'churn-prediction-model': {
    name: 'Churn Prediction Model',
    id: 'PRJ-1520',
    owner: 'Alex Rivera',
    status: 'Idle',
    sources: 'SQL · CSV',
  },
};

const navItems = [
  { to: 'query', label: 'Query', icon: Sparkles },
  { to: 'history', label: 'History', icon: Clock3 },
  { to: 'analytics', label: 'Analytics', icon: BarChart3 },
];

const ProjectLayout = () => {
  const { projectId } = useParams();
  const project = projectCatalog[projectId] || {
    name: 'Project Workspace',
    id: projectId || 'Unknown',
    owner: 'Unknown',
    status: 'Active',
    sources: 'SQL · MongoDB · RAG',
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col lg:flex-row">
        <aside className="border-b border-slate-200 bg-white/95 px-5 py-6 backdrop-blur lg:sticky lg:top-0 lg:h-screen lg:w-80 lg:border-b-0 lg:border-r">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-slate-500">
                  Project
                </p>
                <h1 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950">
                  {project.name}
                </h1>
              </div>
              <div className="rounded-2xl bg-slate-900 p-3 text-white">
                <CircleDashed size={20} />
              </div>
            </div>

            <div className="mt-5 space-y-2 text-sm text-slate-600">
              <p>
                <span className="font-semibold text-slate-900">ID:</span>{' '}
                {project.id}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Owner:</span>{' '}
                {project.owner}
              </p>
              <p>
                <span className="font-semibold text-slate-900">Sources:</span>{' '}
                {project.sources}
              </p>
            </div>

            <div className="mt-5 inline-flex rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
              {project.status}
            </div>
          </div>

          <nav className="mt-6 grid gap-2 sm:grid-cols-3 lg:grid-cols-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.to}
                  to={item.to}
                  className={({ isActive }) =>
                    [
                      'flex items-center gap-3 rounded-2xl border px-4 py-3 text-sm font-semibold transition-colors',
                      isActive
                        ? 'border-slate-900 bg-slate-900 text-white shadow-lg shadow-slate-900/10'
                        : 'border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50',
                    ].join(' ')
                  }
                >
                  <Icon size={16} />
                  <span>{item.label}</span>
                </NavLink>
              );
            })}
          </nav>

          <div className="mt-6 rounded-3xl border border-slate-200 bg-white p-4 text-sm text-slate-600">
            <p className="font-semibold text-slate-900">Workspace notes</p>
            <p className="mt-2 leading-6">
              Switch between Query, History, and Analytics without reloading the
              project shell.
            </p>
          </div>
        </aside>

        <main className="flex-1 px-4 py-6 sm:px-6 lg:px-8 lg:py-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProjectLayout;
