import React, { useState } from 'react';
import {
  BarChart3,
  TrendingUp,
  AlertTriangle,
  Lightbulb,
  CheckSquare,
  Calendar,
  ChevronDown,
  ChevronUp,
  ArrowUpRight,
  Sparkles,
  Bell,
  UserPlus,
  FileDown,
  TrendingDown,
  HelpCircle,
  CornerDownRight,
  ShieldAlert,
  Send
} from 'lucide-react';

const AnalyticsPage = () => {
  const bars = [40, 55, 45, 60, 80, 70, 90, 85, 100, 95, 110, 115];
  
  // Interactive drilldown states
  const [expandedKpi, setExpandedKpi] = useState(null);
  const [expandedInsight, setExpandedInsight] = useState(null);

  return (
    <div className="p-8 space-y-8 overflow-y-auto max-h-screen">
      
      {/* HEADER & QUICK ACTIONS BAR */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 border-b border-white/5 pb-6">
        <div>
          <span className="text-[10px] font-bold text-[#98465f] uppercase tracking-[0.3em] block mb-2">
            AI Strategy Center
          </span>
          <h1 className="text-2xl font-light text-white uppercase tracking-widest">
            Business Insights & Actions
          </h1>
        </div>
        
        {/* Quick Actions Bar */}
        <div className="flex flex-wrap items-center gap-2">
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-[9px] uppercase font-bold tracking-widest text-slate-300 hover:text-white transition-colors">
            <FileDown size={11} /> Export PDF
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-white/5 border border-white/10 text-[9px] uppercase font-bold tracking-widest text-slate-300 hover:text-white transition-colors">
            <Bell size={11} /> Create Alert
          </button>
          <button className="flex items-center gap-1.5 px-3 py-1.5 bg-[#0a0a0c] border border-white/10 text-[9px] uppercase font-bold tracking-widest text-slate-400 hover:text-white transition-colors">
            <Calendar size={11} /> Current Month
          </button>
        </div>
      </div>

      {/* MISSING #3: EXECUTIVE SUMMARY BOX */}
      <div className="p-5 bg-gradient-to-r from-[#98465f]/10 to-transparent border border-[#98465f]/20 relative">
        <div className="absolute top-4 right-4 flex items-center gap-1 text-[9px] font-bold text-[#98465f] uppercase tracking-wider bg-[#98465f]/10 px-2 py-0.5">
          <Sparkles size={10} /> Live AI Briefing
        </div>
        <h2 className="text-xs font-bold uppercase tracking-widest text-white mb-2 flex items-center gap-1.5">
          Executive Summary
        </h2>
        <div className="text-[11px] text-slate-300 space-y-2 font-sans max-w-4xl leading-relaxed">
          <p>
            Gross revenue accelerated by <strong className="text-white">+12%</strong> this month, fueled almost entirely by a <strong className="text-emerald-400">24% spike in Electronics demand</strong>. 
          </p>
          <p>
            However, two critical frictions require swift intervention: regional deceleration in the <strong className="text-rose-400">West Pipeline</strong> and micro <strong className="text-amber-400">hardware component shortages</strong>. 
          </p>
          <p className="text-white font-medium flex items-center gap-1.5 pt-1">
            <CornerDownRight size={12} className="text-[#98465f]" /> Recommended Next Step: Reallocate 15% safety stock variants to high-velocity central warehouses immediately.
          </p>
        </div>
      </div>

      {/* STRATEGIC METRIC CARDS (With Trend Forecasts & Drilldowns) */}
      <section className="flex flex-col bg-white/5 border border-white/10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px">
          {[
            {
              id: 'revenue',
              label: 'Total Revenue',
              val: '$4.2M',
              delta: '+12%',
              icon: TrendingUp,
              color: 'text-emerald-500',
              trend: 'Improving',
              forecast: '$4.6M next month'
            },
            {
              id: 'growth',
              label: 'Growth Rate',
              val: '+14.2%',
              delta: 'vs Q1',
              icon: BarChart3,
              color: 'text-[#98465f]',
              trend: 'Stable',
              forecast: '+15.1% target'
            },
            {
              id: 'issues',
              label: 'Detected Issues',
              val: '14 Flagged',
              delta: '3 Critical',
              icon: AlertTriangle,
              color: 'text-rose-500',
              trend: 'Worsening',
              forecast: 'Requires Action'
            },
            {
              id: 'actions',
              label: 'Actions Taken',
              val: '8 Executed',
              delta: '98% Success',
              icon: CheckSquare,
              color: 'text-amber-500',
              trend: 'Active',
              forecast: '2 Pending Approval'
            },
          ].map((m) => {
            const isOpen = expandedKpi === m.id;
            return (
              <div
                key={m.id}
                onClick={() => setExpandedKpi(isOpen ? null : m.id)}
                className="p-6 bg-app relative group hover-bg-app-strong transition-colors flex flex-col cursor-pointer select-none"
              >
                <m.icon size={20} className={`absolute top-6 right-6 opacity-20 ${m.color}`} />
                <p className="text-[9px] font-bold text-muted uppercase tracking-[0.2em] mb-4 flex items-center gap-1.5">
                  {m.label} {isOpen ? <ChevronUp size={10} /> : <ChevronDown size={10} />}
                </p>
                <div className="flex items-baseline justify-between mt-auto">
                  <h3 className="text-2xl font-mono text-strong tracking-tight">{m.val}</h3>
                  <span className={`text-[9px] font-bold tracking-widest ${m.delta.includes('Critical') ? 'text-rose-500' : 'text-emerald-500'}`}>
                    {m.delta}
                  </span>
                </div>
                {/* MISSING #5: TREND CHANGE & FORECAST DISPLAY */}
                <div className="mt-2 pt-2 border-t border-white/5 flex justify-between text-[8px] font-mono text-slate-400">
                  <span>Trend: <strong className="text-white">{m.trend}</strong></span>
                  <span>Forecast: <strong className="text-slate-300">{m.forecast}</strong></span>
                </div>
              </div>
            );
          })}
        </div>

        {/* INTERACTIVE KPI DRILLDOWN CONTAINER */}
        {expandedKpi === 'revenue' && (
          <div className="p-6 border-t border-white/5 bg-black/40 grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] transition-all animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[9px] text-muted uppercase tracking-wider block">Current vs Previous</span>
              <p className="text-white font-medium">Current: $4.2M <span className="text-slate-500 font-normal">| Previous: $3.8M</span></p>
              <span className="text-slate-500 text-[10px]">Net volumetric absolute delta growth of +$400,000.</span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-muted uppercase tracking-wider block">Top Macro Driver</span>
              <p className="text-white font-medium">Electronics Category Segment <span className="text-emerald-500 font-mono text-[10px] ml-1">+24%</span></p>
              <span className="text-slate-500 text-[10px]">Driven primarily by key promotional campaign structures.</span>
            </div>
            <div className="space-y-1">
              <span className="text-[9px] text-muted uppercase tracking-wider block">Underperforming Segment</span>
              <p className="text-white font-medium">Home & Appliances <span className="text-rose-500 font-mono text-[10px] ml-1">-8%</span></p>
              <span className="text-slate-500 text-[10px]">Impacted by extended supply lines and port delays.</span>
            </div>
          </div>
        )}
      </section>

      {/* CORE PERFORMANCE CHART & DRILLDOWN INSIGHTS */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* LINEAR BAR REVENUE TREND CHART */}
        <div className="lg:col-span-2 p-6 bg-app-strong border border-white/10 rounded-none flex flex-col">
          <div className="flex justify-between items-center mb-8 pb-4 border-b border-white/5">
            <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted">
              Gross Revenue Velocity
            </h3>
            <span className="text-[9px] font-bold text-emerald-500 bg-emerald-500/10 px-2 py-1 tracking-widest border border-emerald-500/20">
              Target Pace Maintained
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
          <div className="flex justify-between mt-4 text-[8px] font-mono text-muted border-t border-white/5 pt-2">
            <span>JAN_FY26</span>
            <span>DEC_FY26</span>
          </div>
        </div>

        {/* MISSING #2 & #10: INSIGHT DRILLDOWNS WITH CONFIDENCE SCORES */}
        <div className="p-6 bg-app-strong border border-white/10 rounded-none flex flex-col">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-4 pb-4 border-b border-white/5 flex items-center justify-between">
            <span>Top Strategic Insights</span>
            <span className="text-[8px] font-normal text-slate-400 capitalize normal-case flex items-center gap-0.5"><HelpCircle size={10}/> Click row to expand</span>
          </h3>

          <div className="space-y-2 flex-grow flex flex-col justify-start text-[11px]">
            {[
              {
                id: 'ins-1',
                title: 'Customer Retention',
                metric: '+8%',
                summary: 'Customer churn probabilities dropped sharply.',
                current: '82%',
                prev: '74%',
                driver: 'Faster tier-1 support response metrics',
                segment: 'Enterprise Accounts',
                confidence: '94%',
                sources: 'CRM logs, Helpdesk'
              },
              {
                id: 'ins-2',
                title: 'Electronics Surge',
                metric: '+24%',
                summary: 'Outperformed baseline quarterly macro models.',
                current: '$1.8M',
                prev: '$1.45M',
                driver: 'Localized conversion optimization updates',
                segment: 'Mid-Market Base',
                confidence: '89%',
                sources: 'Sales DB, Checkout Logs'
              }
            ].map((ins) => {
              const isInsOpen = expandedInsight === ins.id;
              return (
                <div 
                  key={ins.id}
                  onClick={() => setExpandedInsight(isInsOpen ? null : ins.id)}
                  className="border border-white/5 bg-white/5 p-3 space-y-1 cursor-pointer hover:border-white/10 transition-colors select-none"
                >
                  <div className="flex justify-between items-center font-bold text-[9px] uppercase tracking-widest text-[#98465f]">
                    <span>{ins.title}</span>
                    <div className="flex items-center gap-2 font-mono">
                      <span className="text-slate-400 text-[8px] font-normal tracking-normal lowercase normal-case">Conf: {ins.confidence}</span>
                      <span className="text-emerald-500">{ins.metric}</span>
                    </div>
                  </div>
                  <p className="text-slate-400 text-[10px] leading-relaxed">{ins.summary}</p>
                  
                  {isInsOpen && (
                    <div className="mt-3 pt-3 border-t border-white/5 space-y-2 text-slate-300 font-sans text-[10px] animate-fadeIn">
                      <div className="grid grid-cols-2 gap-2 border-b border-white/5 pb-2 font-mono text-[9px]">
                        <div>Current: <span className="text-white">{ins.current}</span></div>
                        <div>Previous: <span className="text-white">{ins.prev}</span></div>
                      </div>
                      <div>
                        <span className="text-muted text-[8px] block uppercase font-mono tracking-wider">Primary Catalyst</span>
                        <p className="text-white">{ins.driver}</p>
                      </div>
                      <div>
                        <span className="text-muted text-[8px] block uppercase font-mono tracking-wider">Impacted Cohort</span>
                        <p className="text-white">{ins.segment}</p>
                      </div>
                      <div className="text-[8px] font-mono text-slate-500 pt-1">
                        Verified via: {ins.sources}
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* RISKS VS OPPORTUNITIES BLOCK */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* MISSING #4: DETECTED RISKS (With Priority Rankings) */}
        <div className="p-6 bg-app-strong border border-white/10 rounded-none flex flex-col">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-4 pb-4 border-b border-white/5 flex items-center gap-2">
            <ShieldAlert size={12} className="text-rose-500" /> Prioritized Operational Risks
          </h3>
          <div className="space-y-3 text-[11px] font-sans">
            <div className="flex items-start gap-3 p-3 border border-rose-500/10 bg-rose-500/5 text-slate-300">
              <span className="text-rose-500 font-bold text-[8px] tracking-widest font-mono border border-rose-500/30 px-1 py-0.5 bg-rose-500/10 uppercase">CRITICAL</span>
              <div className="flex-1">
                <span className="font-bold text-white text-[10px] uppercase tracking-wider block mb-0.5">Hardware Component Shortages</span>
                Core components fell below safe pipeline thresholds. High risk of fulfillment pauses.
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-amber-500/10 bg-amber-500/5 text-slate-300">
              <span className="text-amber-500 font-bold text-[8px] tracking-widest font-mono border border-amber-500/30 px-1 py-0.5 bg-amber-500/10 uppercase">HIGH RISK</span>
              <div className="flex-1">
                <span className="font-bold text-white text-[10px] uppercase tracking-wider block mb-0.5">West Region Pipeline Decline</span>
                Fulfillment drop metrics detected; revenue velocity tracking down 14% month-over-month.
              </div>
            </div>
          </div>
        </div>

        {/* MISSING #8: TOP OPPORTUNITIES PANEL */}
        <div className="p-6 bg-app-strong border border-white/10 rounded-none flex flex-col">
          <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-4 pb-4 border-b border-white/5 flex items-center gap-2">
            <TrendingUp size={12} className="text-emerald-500" /> Discovered Opportunities
          </h3>
          <div className="space-y-3 text-[11px] font-sans">
            <div className="flex items-start gap-3 p-3 border border-emerald-500/10 bg-emerald-500/5 text-slate-300">
              <span className="text-emerald-500 font-bold font-mono text-[9px]">91% Conf</span>
              <div className="flex-1">
                <span className="font-bold text-white text-[10px] uppercase tracking-wider block mb-0.5">Uncapped Electronics Velocity</span>
                Surge demand trends indicate expansion potential. 
                <span className="block mt-1 font-mono text-[9px] text-emerald-400">Est Impact: +$320,000 ARR</span>
              </div>
            </div>
            <div className="flex items-start gap-3 p-3 border border-white/5 bg-white/5 text-slate-300">
              <span className="text-slate-400 font-bold font-mono text-[9px]">84% Conf</span>
              <div className="flex-1">
                <span className="font-bold text-white text-[10px] uppercase tracking-wider block mb-0.5">Enterprise Plan Migrations</span>
                Data footprints show 18 accounts crossing historical limits; primed for immediate upsell.
                <span className="block mt-1 font-mono text-[9px] text-slate-400">Est Impact: +$85,000 ARR</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* MISSING #1 & #6: ACTION CENTER ("Why This Matters" + Direct Execution Controls) */}
      <section className="p-6 bg-app-strong border border-white/10 rounded-none">
        <h3 className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted mb-6 pb-4 border-b border-white/5 flex items-center gap-2">
          <CheckSquare size={12} className="text-[#98465f]" /> Prescriptive Action Desk
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-[11px]">
          {/* Action Card 1 */}
          <div className="p-4 border border-white/5 bg-black/20 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-[11px] uppercase tracking-wider">1. Reallocate Safety Component Reserves</span>
                <span className="text-[9px] font-mono font-bold text-emerald-500">Impact: +6% Rev</span>
              </div>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                <strong className="text-slate-300">Why This Matters:</strong> Local electronics product demand completely exhausts historical inventory curves. Reallocating offsets immediate stockout liabilities.
              </p>
              <div className="text-[8px] font-mono text-slate-500">Confidence Metric: 87% | Cause Analysis: Component Stock Depletion</div>
            </div>
            {/* Context Execution Controls */}
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <button className="text-white bg-[#98465f] hover:bg-[#98465f]/80 transition-colors text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5">
                Trigger Allocation
              </button>
              <button className="text-slate-400 hover:text-white border border-white/10 bg-[#0a0a0c] transition-colors text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 flex items-center gap-1">
                <Bell size={9} /> Create Alert
              </button>
              <button className="text-slate-400 hover:text-white border border-white/10 bg-[#0a0a0c] transition-colors text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 flex items-center gap-1">
                <UserPlus size={9} /> Assign Owner
              </button>
            </div>
          </div>

          {/* Action Card 2 */}
          <div className="p-4 border border-white/5 bg-black/20 flex flex-col justify-between space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="font-bold text-white text-[11px] uppercase tracking-wider">2. Deploy West Territory Promotion Patch</span>
                <span className="text-[9px] font-mono font-bold text-emerald-500">Impact: +4% Rev</span>
              </div>
              <p className="text-slate-400 text-[10px] leading-relaxed">
                <strong className="text-slate-300">Why This Matters:</strong> Mirrors pricing logic adjustments verified inside central territories to counteract declining pipeline traffic conversions.
              </p>
              <div className="text-[8px] font-mono text-slate-500">Confidence Metric: 91% | Cause Analysis: Regional Margin Compression</div>
            </div>
            {/* Context Execution Controls */}
            <div className="flex items-center gap-2 pt-2 flex-wrap">
              <button className="text-white bg-[#98465f] hover:bg-[#98465f]/80 transition-colors text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5">
                Deploy Patch
              </button>
              <button className="text-slate-400 hover:text-white border border-white/10 bg-[#0a0a0c] transition-colors text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 flex items-center gap-1">
                <CheckSquare size={9} /> Create Task
              </button>
              <button className="text-slate-400 hover:text-white border border-white/10 bg-[#0a0a0c] transition-colors text-[9px] font-bold uppercase tracking-widest px-2.5 py-1.5 flex items-center gap-1">
                <ArrowUpRight size={9} /> View Impact
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* MISSING #9: AI CHAT INTERACTION BRIDGE FOLLOW-UP */}
      <section className="p-6 bg-black/40 border border-white/5 rounded-none space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles size={13} className="text-[#98465f]" />
            <h4 className="text-[10px] font-bold text-white uppercase tracking-widest">
              Deep-Dive Analysis Routing
            </h4>
          </div>
          <span className="text-[8px] font-mono text-slate-500">Routing token: ANL-DEEP-FY26</span>
        </div>

        {/* Dynamic prompt suggestion bubbles */}
        <div className="flex flex-wrap items-center gap-2 text-[9px] font-mono">
          <span className="text-slate-500">Suggested investigations:</span>
          <button className="border border-[#98465f]/30 bg-[#98465f]/5 text-[#98465f] hover:bg-[#98465f]/10 transition-colors px-2.5 py-1">
            "Why is Electronics volume growing?"
          </button>
          <button className="border border-white/10 bg-white/5 text-slate-300 hover:text-white transition-colors px-2.5 py-1">
            "Break down West region pipeline bottlenecks"
          </button>
          <button className="border border-white/10 bg-white/5 text-slate-300 hover:text-white transition-colors px-2.5 py-1">
            "Show raw inventory projections"
          </button>
        </div>

        {/* Input Bridge layout container mimicking main app interaction loop */}
        <div className="relative flex items-center">
          <input 
            type="text" 
            placeholder="Ask a follow-up question regarding this trend dataset..."
            className="w-full bg-[#0a0a0c] border border-white/10 py-3 pl-4 pr-12 text-[11px] text-white font-sans outline-none focus:border-[#98465f]/50 placeholder:text-slate-600 transition-colors"
          />
          <button className="absolute right-3 text-slate-500 hover:text-[#98465f] transition-colors">
            <Send size={13} />
          </button>
        </div>
      </section>

    </div>
  );
};

export default AnalyticsPage;