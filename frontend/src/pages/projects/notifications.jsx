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
} from 'lucide-react';

const NotificationsPage = () => {
  const [page, setPage] = useState(1);

  const logs = [
    {
      id: 'LOG-902',
      event: 'REVENUE THRESHOLD MET',
      target: 'EMAIL',
      time: '14:32:00',
      status: 'DELIVERED',
    },
    {
      id: 'LOG-901',
      event: 'NEW SQL SOURCE SYNC',
      target: 'SYSTEM',
      time: '13:00:15',
      status: 'SEEN',
    },
    {
      id: 'LOG-899',
      event: 'ANOMALY DETECTED: Q4 DATA',
      target: 'SLACK',
      time: '10:45:00',
      status: 'FAILED',
    },
    {
      id: 'LOG-898',
      event: 'WEEKLY SUMMARY READY',
      target: 'EMAIL',
      time: 'YESTERDAY',
      status: 'DELIVERED',
    },
    {
      id: 'LOG-897',
      event: 'SECURITY LOGIN: ALEX R.',
      target: 'SYSTEM',
      time: '2024-10-24',
      status: 'DELIVERED',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-8 py-10 space-y-8">
      {/* --- HEADER --- */}
      <header className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="h-1.5 w-1.5 bg-[#98465f] rounded-none animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-[#98465f]">
              Alert Configuration
            </span>
          </div>
          <h1 className="text-2xl font-light text-white tracking-widest uppercase">
            Notification Center
          </h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-[#0a0a0c] border border-white/10 rounded-none text-[10px] font-bold tracking-[0.2em] text-slate-400 hover:text-white transition-colors uppercase">
          <Settings2 size={12} strokeWidth={1.5} />
          Global Settings
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* --- LEFT: TRIGGER SETUP --- */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-app-strong border border-white/10 rounded-none p-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-6 pb-4 border-b border-white/5 flex items-center gap-2">
              <Zap size={12} strokeWidth={1.5} className="text-amber-500" />
              Active Automations
            </h3>

            <div className="space-y-3">
              {[
                {
                  title: 'Revenue Anomaly',
                  desc: 'Notify if Q4 projections deviate > 5%',
                  icon: AlertCircle,
                  color: 'text-rose-500',
                },
                {
                  title: 'Source Synchronization',
                  desc: 'Alert when SQL/MongoDB sync completes',
                  icon: ShieldCheck,
                  color: 'text-emerald-500',
                },
              ].map((trigger, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between p-4 bg-app border border-white/5 hover:border-white/20 transition-colors group"
                >
                  <div className="flex items-center gap-4">
                    <div
                      className={`p-2 border border-white/5 bg-black/50 ${trigger.color}`}
                    >
                      <trigger.icon size={16} strokeWidth={1.5} />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ui mb-1 group-hover:text-white transition-colors">
                        {trigger.title}
                      </p>
                      <p className="text-[10px] tracking-wide text-muted">
                        {trigger.desc}
                      </p>
                    </div>
                  </div>
                  {/* Strict CAD Toggle */}
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-3 bg-[#98465f]/20 border border-[#98465f] relative cursor-pointer">
                      <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#98465f]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <button className="w-full mt-4 py-3 border border-dashed border-white/10 text-[9px] font-bold text-muted hover:text-white hover:border-white/30 transition-colors uppercase tracking-[0.2em] bg-transparent">
              + Add Threshold Alert
            </button>
          </section>

          {/* --- AUDIT LOG WITH PAGING --- */}
          <section className="bg-app-strong border border-white/10 rounded-none overflow-hidden">
            <div className="px-6 py-4 border-b border-white/10 flex justify-between items-center bg-black/50">
              <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-slate-500">
                Dispatch Logs
              </h3>
              <div className="flex items-center gap-3">
                <span className="text-[9px] font-mono text-muted">
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
            <table className="w-full text-left">
              <tbody className="divide-y divide-white/5">
                {logs.map((log) => (
                  <tr
                    key={log.id}
                    className="hover-bg-app transition-colors group"
                  >
                    <td className="px-6 py-4">
                      <p className="text-[10px] font-bold uppercase tracking-widest text-ui group-hover:text-white transition-colors">
                        {log.event}
                      </p>
                      <p className="text-[9px] font-mono text-muted mt-1">
                        {log.id}
                      </p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[9px] font-bold border border-white/5 bg-black px-2 py-1 text-slate-500 uppercase tracking-widest">
                        {log.target}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-[9px] font-mono text-muted uppercase">
                      {log.time}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <span
                        className={`text-[9px] font-bold uppercase tracking-widest ${log.status === 'FAILED' ? 'text-rose-500' : 'text-emerald-500'}`}
                      >
                        {log.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>
        </div>

        {/* --- RIGHT: CHANNELS & SCHEDULE --- */}
        <div className="space-y-6">
          <section className="bg-app-strong border border-white/10 rounded-none p-6">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-6 pb-4 border-b border-white/5">
              Channels
            </h3>
            <div className="space-y-3">
              {[
                {
                  name: 'Email Dispatch',
                  icon: Mail,
                  status: 'CONNECTED',
                  sub: 'alex@adia.ai',
                },
                {
                  name: 'Slack Hook',
                  icon: MessageSquare,
                  status: 'ACTIVE',
                  sub: '#data-alerts',
                },
                {
                  name: 'Mobile Push',
                  icon: Bell,
                  status: 'DISABLED',
                  sub: 'No devices linked',
                },
              ].map((channel, i) => (
                <div
                  key={i}
                  className="flex items-center gap-4 group cursor-pointer p-3 border border-transparent hover:border-white/5 hover-bg-app transition-colors"
                >
                  <div className="h-8 w-8 shrink-0 bg-black border border-white/10 flex items-center justify-center text-muted group-hover:text-white transition-colors">
                    <channel.icon size={12} strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-ui group-hover:text-white transition-colors">
                      {channel.name}
                    </p>
                    <p className="text-[9px] font-mono text-muted uppercase mt-0.5">
                      {channel.sub}
                    </p>
                  </div>
                  <div className="ml-auto">
                    <div
                      className={`h-1.5 w-1.5 rounded-none ${channel.status === 'DISABLED' ? 'bg-slate-700' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`}
                    />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-app border border-[#98465f]/30 rounded-none p-6 relative overflow-hidden">
            {/* Warning hatch pattern */}
            <div
              className="absolute inset-0 pointer-events-none opacity-10"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(45deg, transparent, transparent 10px, #98465f 10px, #98465f 20px)',
              }}
            />

            <div className="relative z-10">
              <div className="flex items-center gap-2 mb-4">
                <Clock size={12} strokeWidth={2} className="text-[#98465f]" />
                <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-white">
                  Quiet Hours
                </h3>
              </div>
              <p className="text-[10px] tracking-wide text-muted leading-relaxed mb-5">
                Suppress non-critical alerts between{' '}
                <span className="text-white font-mono">22:00 — 06:00</span> to
                maintain operational focus.
              </p>
              <button className="text-[9px] font-bold text-[#98465f] hover:text-white border border-[#98465f]/30 hover:border-white/30 bg-black/50 px-3 py-1.5 uppercase tracking-[0.2em] transition-colors">
                Configure
              </button>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
