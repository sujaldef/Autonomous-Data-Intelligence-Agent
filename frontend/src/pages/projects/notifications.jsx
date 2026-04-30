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
  ShieldCheck
} from 'lucide-react';

const NotificationsPage = () => {
  const [page, setPage] = useState(1);

  const logs = [
    { id: 'LOG-902', event: 'Revenue Threshold Met', target: 'Email', time: '2 mins ago', status: 'Delivered' },
    { id: 'LOG-901', event: 'New SQL Source Sync', target: 'System', time: '1 hour ago', status: 'Seen' },
    { id: 'LOG-899', event: 'Anomaly Detected: Q4 Data', target: 'Slack', time: '3 hours ago', status: 'Failed' },
    { id: 'LOG-898', event: 'Weekly Summary Ready', target: 'Email', time: 'Yesterday', status: 'Delivered' },
    { id: 'LOG-897', event: 'Security Login: Alex R.', target: 'System', time: 'Oct 24', status: 'Delivered' },
  ];

  return (
    <div className="max-w-6xl mx-auto px-8 py-10 space-y-8">
      {/* --- HEADER --- */}
      <header className="flex justify-between items-end">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <div className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-pulse" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">Alert Configuration</span>
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">Notification Center</h1>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-xs font-bold text-slate-400 hover:text-white transition-all">
          <Settings2 size={14} />
          GLOBAL SETTINGS
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* --- LEFT: TRIGGER SETUP --- */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-[#050912] border border-white/5 rounded-[2rem] p-6 shadow-2xl">
            <h3 className="text-sm font-black uppercase tracking-widest text-white mb-6 flex items-center gap-2">
              <Zap size={16} className="text-amber-400" />
              Active Automations
            </h3>
            
            <div className="space-y-4">
              {[
                { title: 'Revenue Anomaly', desc: 'Notify if Q4 projections deviate > 5%', icon: AlertCircle, color: 'text-rose-400' },
                { title: 'Source Synchronization', desc: 'Alert when SQL/MongoDB sync completes', icon: ShieldCheck, color: 'text-emerald-400' },
              ].map((trigger, i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-all">
                  <div className="flex items-center gap-4">
                    <div className={`p-3 rounded-xl bg-white/5 ${trigger.color}`}>
                      <trigger.icon size={18} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-slate-200">{trigger.title}</p>
                      <p className="text-xs text-slate-500">{trigger.desc}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="h-5 w-10 bg-cyan-500/20 rounded-full relative border border-cyan-500/30 cursor-pointer">
                      <div className="absolute right-1 top-1 h-3 w-3 bg-cyan-400 rounded-full shadow-[0_0_8px_rgba(34,211,238,0.5)]" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            <button className="w-full mt-6 py-3 rounded-2xl border border-dashed border-white/10 text-xs font-black text-slate-500 hover:text-cyan-400 hover:border-cyan-400/50 transition-all uppercase tracking-widest">
              + Add New Threshold Alert
            </button>
          </section>

          {/* --- AUDIT LOG WITH PAGING --- */}
          <section className="bg-[#050912] border border-white/5 rounded-[2rem] overflow-hidden">
            <div className="px-6 py-4 border-b border-white/5 flex justify-between items-center bg-white/[0.01]">
              <h3 className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">Dispatch Logs</h3>
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-mono text-slate-600 mr-2">PAGE {page} OF 12</span>
                <button onClick={() => setPage(p => Math.max(1, p-1))} className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                  <ChevronLeft size={14} />
                </button>
                <button onClick={() => setPage(p => p+1)} className="p-1.5 hover:bg-white/5 rounded-lg text-slate-400 transition-colors">
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
            <table className="w-full text-left">
              <tbody className="divide-y divide-white/5">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-white/[0.01] transition-all group">
                    <td className="px-6 py-4">
                      <p className="text-xs font-bold text-slate-300">{log.event}</p>
                      <p className="text-[10px] font-mono text-slate-600">{log.id}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-[10px] font-black bg-white/5 px-2 py-1 rounded text-slate-500 uppercase tracking-tighter">{log.target}</span>
                    </td>
                    <td className="px-6 py-4 text-[10px] text-slate-500 font-bold uppercase">{log.time}</td>
                    <td className="px-6 py-4 text-right">
                      <span className={`text-[10px] font-black uppercase ${log.status === 'Failed' ? 'text-rose-500' : 'text-emerald-500'}`}>
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
          <section className="bg-[#050912] border border-white/5 rounded-[2rem] p-6">
            <h3 className="text-xs font-black uppercase tracking-widest text-white mb-6">Delivery Channels</h3>
            <div className="space-y-4">
              {[
                { name: 'Email Dispatch', icon: Mail, status: 'Connected', sub: 'alex@adia.ai' },
                { name: 'Slack Integration', icon: MessageSquare, status: 'Active', sub: '#data-alerts' },
                { name: 'Push (Mobile)', icon: Bell, status: 'Disabled', sub: 'No devices linked' },
              ].map((channel, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="h-10 w-10 shrink-0 rounded-xl bg-slate-900 border border-white/5 flex items-center justify-center text-slate-400 group-hover:text-cyan-400 transition-colors">
                    <channel.icon size={18} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-slate-200">{channel.name}</p>
                    <p className="text-[9px] font-black uppercase text-slate-600 tracking-tighter">{channel.sub}</p>
                  </div>
                  <div className="ml-auto">
                    <div className={`h-1.5 w-1.5 rounded-full ${channel.status === 'Disabled' ? 'bg-slate-700' : 'bg-emerald-500 shadow-[0_0_8px_#10b981]'}`} />
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="bg-gradient-to-br from-cyan-500/10 to-indigo-500/10 border border-cyan-500/20 rounded-[2rem] p-6">
            <div className="flex items-center gap-2 mb-4">
              <Clock size={16} className="text-cyan-400" />
              <h3 className="text-xs font-black uppercase tracking-widest text-white">Quiet Hours</h3>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed mb-4">
              Suppress non-critical alerts between <span className="text-white font-bold">22:00 — 06:00</span> to maintain operational focus.
            </p>
            <button className="text-[10px] font-black text-cyan-500 hover:text-cyan-300 uppercase tracking-[0.2em] transition-all">
              Edit Schedule →
            </button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;