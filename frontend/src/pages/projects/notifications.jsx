import React, { useState } from 'react';
import {
  Bell,
  Mail,
  MessageSquare,
  Zap,
  Clock,
  Settings2,
  ChevronLeft,
  ChevronRight,
  AlertCircle,
  ShieldCheck,
  Search,
  SlidersHorizontal,
  CheckCircle2,
  XCircle,
  Play
} from 'lucide-react';

const NotificationsPage = () => {
  const [page, setPage] = useState(1);
  const [activeCategory, setActiveCategory] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');

  // Categories for filtering
  const categories = ['All', 'Revenue', 'Customers', 'Inventory', 'System'];

  // Logs updated for human scannability
  const logs = [
    {
      id: 'LOG-902',
      event: 'Revenue alert triggered',
      target: 'Email',
      time: '14:32:00',
      status: 'Sent',
      severity: 'Critical'
    },
    {
      id: 'LOG-901',
      event: 'Database update completed',
      target: 'System',
      time: '13:00:15',
      status: 'Viewed',
      severity: 'Low'
    },
    {
      id: 'LOG-899',
      event: 'Sales anomaly detected',
      target: 'Slack',
      time: '10:45:00',
      status: 'Failed',
      severity: 'High'
    },
    {
      id: 'LOG-898',
      event: 'Weekly report ready',
      target: 'Email',
      time: 'Yesterday',
      status: 'Viewed',
      severity: 'Low'
    },
    {
      id: 'LOG-897',
      event: 'Security login: Alex R.',
      target: 'System',
      time: '2026-06-03',
      status: 'Sent',
      severity: 'Medium'
    },
  ];

  return (
    // Fluid wrapper filling 100% width of parent content containers dynamically
    <div className="w-full px-4 sm:px-6 lg:px-8 py-6 lg:py-10 space-y-6 lg:space-y-8 text-slate-400 selection:bg-[#98465f]/30">
      
      {/* --- HEADER --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-end border-b border-white/5 pb-6 gap-4">
        <div className="w-full md:max-w-2xl">
          <div className="mb-2">
            <span className="text-[10px] font-mono text-[#98465f] uppercase tracking-[0.25em] font-bold">
              Telemetry Systems
            </span>
          </div>
          <h1 className="text-xl lg:text-2xl text-white font-light tracking-widest uppercase mb-2">
            Manage your alerts
          </h1>
          <p className="text-slate-500 text-xs font-sans">
            Choose what notifications you receive and where they are sent.
          </p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0c] border border-white/10 text-[10px] font-bold tracking-[0.2em] text-slate-400 hover:text-white transition-colors uppercase rounded-none shrink-0 w-full md:w-auto justify-center">
          <Settings2 size={12} strokeWidth={1.5} />
          Manage Alerts
        </button>
      </header>

      {/* --- ALERT HEALTH KPI CARDS --- */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {[
          { label: 'Active Alerts', value: '24', detail: 'Running rules', color: 'text-white' },
          { label: 'Alerts Sent', value: '156', detail: 'This month', color: 'text-slate-300' },
          { label: 'Failed Alerts', value: '2', detail: 'Requires review', color: 'text-rose-500' },
          { label: 'Delivery Rate', value: '98.7%', detail: 'Target > 95%', color: 'text-emerald-400' },
        ].map((kpi, idx) => (
          <div key={idx} className="bg-[#0a0a0c] border border-white/5 p-5 flex flex-col justify-between hover:bg-white/[0.02] transition-colors">
            <span className="text-[9px] font-mono text-slate-500 uppercase tracking-widest">{kpi.label}</span>
            <div className="mt-4 flex items-baseline justify-between">
              <span className={`text-2xl font-mono font-light tracking-tight ${kpi.color}`}>{kpi.value}</span>
              <span className="text-[9px] text-slate-600 font-mono uppercase">{kpi.detail}</span>
            </div>
          </div>
        ))}
      </div>

      {/* --- FILTER & SEARCH CONTROLS --- */}
      <div className="flex flex-col lg:flex-row gap-4 justify-between items-stretch lg:items-center bg-[#0a0a0c] border border-white/5 p-3">
        <div className="flex flex-wrap gap-1.5 overflow-x-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 text-[9px] font-mono uppercase tracking-wider transition-colors shrink-0 ${
                activeCategory === cat
                  ? 'bg-[#98465f] text-white font-bold'
                  : 'bg-white/5 text-slate-400 hover:bg-white/10 hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="relative flex items-center w-full lg:max-w-xs">
          <Search size={13} className="absolute left-3 text-slate-600" />
          <input
            type="text"
            placeholder="Search alerts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-black/40 border border-white/10 pl-9 pr-3 py-2 text-xs font-sans text-slate-300 placeholder:text-slate-700 outline-none focus:border-[#98465f]/50"
          />
        </div>
      </div>

      {/* --- CORE MATRIX LAYOUT GRID --- */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 items-start">
        
        {/* --- LEFT / MAIN PANELS (2 Columns wide at xl screens) --- */}
        <div className="xl:col-span-2 space-y-6 w-full min-w-0">
          
          {/* Active Alerts List */}
          <section className="bg-[#0a0a0c] border border-white/5 p-5 lg:p-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-6 pb-4 border-b border-white/5 flex items-center gap-2">
              <Zap size={13} strokeWidth={1.5} className="text-[#98465f]" />
              Active Alerts
            </h3>

            <div className="space-y-3">
              {[
                {
                  title: 'Revenue Changes',
                  desc: 'Notify me when revenue changes by more than 5%.',
                  icon: AlertCircle,
                  color: 'text-rose-500',
                  severity: 'Critical'
                },
                {
                  title: 'Database Updates',
                  desc: 'Notify me when data sources finish updating.',
                  icon: ShieldCheck,
                  color: 'text-emerald-500',
                  severity: 'Low'
                },
              ].map((trigger, i) => (
                <div
                  key={i}
                  className="p-4 bg-black/40 border border-white/5 hover:border-[#98465f]/40 transition-all group"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-start gap-4 min-w-0">
                      <div className={`p-2 border border-white/5 bg-black/50 ${trigger.color} mt-0.5 shrink-0`}>
                        <trigger.icon size={14} strokeWidth={1.5} />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap mb-1.5">
                          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-200 group-hover:text-white transition-colors">
                            {trigger.title}
                          </p>
                          <span className={`text-[8px] font-mono px-1.5 py-0.2 border tracking-wider uppercase ${
                            trigger.severity === 'Critical' ? 'border-rose-900/50 bg-rose-950/20 text-rose-400' : 'border-slate-800 bg-slate-900/40 text-slate-400'
                          }`}>
                            {trigger.severity}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 leading-normal font-sans">
                          {trigger.desc}
                        </p>
                      </div>
                    </div>
                    
                    {/* Active Controls & Toggle Setup */}
                    <div className="flex items-center justify-between sm:justify-end gap-4 border-t sm:border-t-0 pt-3 sm:pt-0 border-white/5 shrink-0">
                      <div className="flex items-center gap-1.5">
                        <button className="px-2.5 py-1 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white text-[9px] font-mono uppercase tracking-wider border border-white/5 transition-colors">
                          Edit
                        </button>
                        <button className="px-2.5 py-1 bg-white/5 hover:bg-[#98465f]/20 text-slate-400 hover:text-[#98465f] text-[9px] font-mono uppercase tracking-wider border border-white/5 transition-colors flex items-center gap-1">
                          <Play size={8} /> Test
                        </button>
                      </div>
                      <div className="w-8 h-3.5 bg-[#98465f]/10 border border-[#98465f]/40 relative cursor-pointer">
                        <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#98465f]" />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 border border-dashed border-white/10 text-[9px] font-bold text-slate-400 hover:text-white hover:border-[#98465f]/40 transition-all uppercase tracking-[0.2em] bg-transparent">
              + Create New Alert
            </button>
          </section>

          {/* --- SMART RECOMMENDATIONS BOX --- */}
          <div className="bg-[#0a0a0c] border border-[#98465f]/20 p-5 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-start gap-3 min-w-0">
              <div className="p-2 bg-[#98465f]/10 text-[#98465f] mt-0.5 shrink-0">
                <Bell size={14} className="animate-pulse" />
              </div>
              <div className="min-w-0">
                <span className="text-[8px] font-mono text-[#98465f] uppercase tracking-widest block font-bold">ADIA Insight Suggestion</span>
                <p className="text-xs text-slate-300 mt-1 font-sans leading-normal">
                  Revenue dropped 12% last month. Create an alert for automated tracking?
                </p>
              </div>
            </div>
            <button className="px-4 py-2 bg-white text-black text-[9px] font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors shrink-0 w-full sm:w-auto text-center">
              Create Alert
            </button>
          </div>

          {/* --- RECENT ALERTS PANEL --- */}
          <section className="bg-[#0a0a0c] border border-white/5 overflow-hidden">
            <div className="px-5 py-4 border-b border-white/5 flex flex-row justify-between items-center bg-black/50 gap-2">
              <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-400">
                Recent Alerts
              </h3>
              <div className="flex items-center gap-3 shrink-0">
                <span className="text-[9px] font-mono text-slate-500">
                  PAGE {page} OF 12
                </span>
                <div className="flex gap-1">
                  <button
                    onClick={() => setPage((p) => Math.max(1, p - 1))}
                    className="p-1 hover:bg-white/10 text-slate-500 transition-colors border border-transparent hover:border-white/10"
                  >
                    <ChevronLeft size={12} strokeWidth={2} />
                  </button>
                  <button
                    onClick={() => setPage((p) => p + 1)}
                    className="p-1 hover:bg-white/10 text-slate-500 transition-colors border border-transparent hover:border-white/10"
                  >
                    <ChevronRight size={12} strokeWidth={2} />
                  </button>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto w-full block scrollbar-thin">
              <table className="w-full text-left min-w-[600px] border-collapse">
                <tbody className="divide-y divide-white/5 font-mono text-xs">
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      className="hover:bg-white/[0.01] transition-colors group"
                    >
                      <td className="px-5 py-3.5 max-w-[280px] min-w-[180px]">
                        <div className="flex items-center gap-2">
                          <span className={`h-1.5 w-1.5 shrink-0 ${
                            log.severity === 'Critical' ? 'bg-rose-500' : log.severity === 'High' ? 'bg-amber-500' : 'bg-slate-600'
                          }`} />
                          <p className="text-[11px] font-sans font-medium text-slate-300 group-hover:text-white transition-colors truncate">
                            {log.event}
                          </p>
                        </div>
                        <p className="text-[9px] text-slate-600 mt-0.5">
                          {log.id}
                        </p>
                      </td>
                      <td className="px-5 py-3.5 vertical-middle">
                        <span className="text-[9px] font-bold border border-white/5 bg-black/60 px-2 py-0.5 text-slate-400 tracking-wider">
                          {log.target}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-[10px] text-slate-500 vertical-middle">
                        {log.time}
                      </td>
                      <td className="px-5 py-3.5 text-right vertical-middle">
                        <span
                          className={`text-[10px] font-bold tracking-wide uppercase ${
                            log.status === 'Failed' 
                              ? 'text-rose-500' 
                              : log.status === 'Viewed' 
                              ? 'text-sky-400' 
                              : 'text-emerald-500'
                          }`}
                        >
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>

        {/* --- RIGHT PANEL: METHODS & PREFERENCES (Stays 1 Column wide) --- */}
        <div className="space-y-6 w-full">
          
          {/* Notification Methods */}
          <section className="bg-[#0a0a0c] border border-white/5 p-5 lg:p-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-6 pb-4 border-b border-white/5">
              Notification Methods
            </h3>
            <div className="space-y-2">
              {[
                {
                  name: 'Email',
                  icon: Mail,
                  status: 'Connected',
                  sub: 'finance@company.com',
                },
                {
                  name: 'Slack',
                  icon: MessageSquare,
                  status: 'Connected',
                  sub: '#data-alerts',
                },
                {
                  name: 'Mobile App',
                  icon: Bell,
                  status: 'Not Connected',
                  sub: 'No devices linked',
                },
              ].map((channel, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 group p-3 border border-transparent hover:border-white/5 hover:bg-white/[0.01] transition-colors min-w-0"
                >
                  <div className="h-8 w-8 shrink-0 bg-black border border-white/10 flex items-center justify-center text-slate-500 group-hover:text-white transition-colors">
                    <channel.icon size={13} strokeWidth={1.5} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-slate-300 group-hover:text-white transition-colors truncate">
                      {channel.name}
                    </p>
                    <p className="text-[9px] font-mono text-slate-500 uppercase mt-0.5 truncate">
                      {channel.sub}
                    </p>
                  </div>
                  <div className="shrink-0 text-right">
                    <span className={`text-[9px] font-mono block mb-1 ${
                      channel.status === 'Not Connected' ? 'text-slate-600' : 'text-emerald-500'
                    }`}>
                      {channel.status}
                    </span>
                    <div
                      className={`h-1.5 w-1.5 ml-auto rounded-none ${
                        channel.status === 'Not Connected' ? 'bg-slate-800' : 'bg-emerald-500'
                      }`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Do Not Disturb Card */}
          <section className="bg-black/20 border border-[#98465f]/20 p-5 lg:p-6 relative overflow-hidden">
            <div
              className="absolute inset-0 pointer-events-none opacity-5"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, transparent, transparent 10px, #98465f 10px, #98465f 20px)',
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={13} strokeWidth={2} className="text-[#98465f]" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                  Do Not Disturb
                </h3>
              </div>
              <p className="text-xs font-sans tracking-wide text-slate-500 leading-relaxed mb-5">
                Pause non-important alerts between{' '}
                <span className="text-white font-mono">10:00 PM and 6:00 AM</span>.
              </p>
              <button className="text-[9px] font-bold text-[#98465f] hover:text-white border border-[#98465f]/30 hover:border-white/30 bg-black/50 px-4 py-2 uppercase tracking-[0.2em] transition-colors rounded-none w-full sm:w-auto text-center">
                Edit Schedule
              </button>
            </div>
          </section>

          {/* NOTIFICATION VOLUMES SUMMARY CARD */}
          <section className="bg-[#0a0a0c] border border-white/5 p-4 space-y-3 font-mono text-[10px]">
            <span className="text-slate-500 uppercase tracking-widest block border-b border-white/5 pb-1">Volumes This Month</span>
            <div className="space-y-1.5 text-slate-400">
              <div className="flex justify-between"><span>Email Dispatches:</span> <span className="text-white">42</span></div>
              <div className="flex justify-between"><span>Slack Webhooks:</span> <span className="text-white">18</span></div>
              <div className="flex justify-between"><span>Mobile Deliveries:</span> <span className="text-white">7</span></div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;