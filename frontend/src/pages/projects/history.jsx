import React, { useState } from 'react';
import { Search, Filter, Database, ArrowUpRight, ChevronDown, ChevronUp, Star, RefreshCw, Share2, FileText, CheckCircle2 } from 'lucide-react';

const HistoryPage = () => {
  // Tracking expanded rows and starred items
  const [expandedId, setExpandedId] = useState('1'); // Default open first item for preview
  const [starredIds, setStarredIds] = useState(['1']);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleStar = (e, id) => {
    e.stopPropagation(); // Don't trigger the accordion fold
    setStarredIds(prev => 
      prev.includes(id) ? prev.filter(item => item !== id) : [...prev, id]
    );
  };

  // Upgraded rich business data structure
  const historyItems = [
    {
      id: '1',
      type: 'Analysis',
      question: 'Why did revenue drop last month?',
      summary: 'Revenue fell 6.2% primarily due to a 24% decline in electronics sales volume.',
      time: '2:20 PM',
      date: 'Today',
      findings: [
        'Revenue performance hit a low of -6.2% overall.',
        'Electronics category dropped 24% following supply delays.',
        'Total estimated revenue impact: -$8,500.'
      ],
      sources: ['Sales Database', 'Customer Feedback', 'Q1 Board Report'],
      recommendations: ['Review premium pricing structures', 'Launch localized promotion campaign'],
    },
    {
      id: '2',
      type: 'Report',
      question: 'Which customers are most likely to churn?',
      summary: 'Identified 42 high-risk accounts with declining API usage metrics over the last 30 days.',
      time: '9:15 AM',
      date: 'Today',
      findings: [
        '42 enterprise accounts dropped activity by 30% or more.',
        'Main concentration found in the mid-market SaaS tier.',
        'Average customer tenure of at-risk group is 14 months.'
      ],
      sources: ['App Usage Logs', 'CRM Platform'],
      recommendations: ['Assign customer success touchpoints immediately', 'Offer proactive renewal discounts'],
    },
    {
      id: '3',
      type: 'Alert',
      question: 'What are customers complaining about?',
      summary: 'Spike detected in support tickets regarding checkout errors and billing discrepancies.',
      time: '4:45 PM',
      date: 'Yesterday',
      findings: [
        'Checkout issues increased by 45% post-update.',
        'Payment gateway timeouts accounting for most errors.',
        'Customer sentiment score dipped to a temporary low.'
      ],
      sources: ['Support Helpdesk', 'Stripe Gateway Logs'],
      recommendations: ['Roll back checkout hotfix', 'Deploy high-priority payment engineering ticket'],
    }
  ];

  return (
    <div className="p-8">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10 pb-6 border-b border-white/5">
        <div>
          <span className="text-[10px] font-bold text-[#98465f] uppercase tracking-[0.3em] block mb-2">
            Saved Insights
          </span>
          <h1 className="text-2xl font-light text-white tracking-widest uppercase">
            Knowledge Archive
          </h1>
        </div>

        {/* ACTIONS */}
        <div className="flex items-center gap-3">
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-muted"
              size={12}
              strokeWidth={2}
            />
            <input
              placeholder="SEARCH INSIGHTS..."
              className="bg-app-strong border border-white/10 rounded-none py-2 pl-8 pr-4 text-[10px] tracking-widest text-white uppercase focus:border-[#98465f]/50 outline-none w-64 transition-colors placeholder:text-muted"
            />
          </div>
          <button className="p-2 border border-white/10 bg-[#0a0a0c] text-slate-500 hover:text-white transition-colors rounded-none">
            <Filter size={14} strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* TIMELINE FEED */}
      <div className="space-y-4">
        {historyItems.map((item) => {
          const isExpanded = expandedId === item.id;
          const isStarred = starredIds.includes(item.id);

          return (
            <div 
              key={item.id} 
              className="bg-app-strong border border-white/10 transition-colors group cursor-pointer"
              onClick={() => toggleExpand(item.id)}
            >
              {/* ACCORDION HEADER CONTAINER */}
              <div className="p-6 flex items-start justify-between gap-4">
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-3">
                    {/* Query Type Badge */}
                    <span className="text-[9px] font-bold border border-[#98465f]/30 text-[#98465f] bg-[#98465f]/5 px-2 py-0.5 uppercase tracking-widest">
                      {item.type}
                    </span>
                    <span className="text-[9px] font-mono text-muted tracking-wider">
                      {item.date} • {item.time}
                    </span>
                  </div>

                  {/* Main Question Title */}
                  <h3 className="text-sm font-medium tracking-wide text-white font-sans">
                    {item.question}
                  </h3>

                  {/* Immediate Baseline AI Summary */}
                  {!isExpanded && (
                    <p className="text-[11px] text-slate-400 font-sans line-clamp-1">
                      {item.summary}
                    </p>
                  )}
                </div>

                {/* Right Aligned Header Controls */}
                <div className="flex items-center gap-4 pt-1">
                  <button 
                    onClick={(e) => toggleStar(e, item.id)}
                    className={`transition-colors ${isStarred ? 'text-[#98465f]' : 'text-slate-500 hover:text-white'}`}
                  >
                    <Star size={14} fill={isStarred ? 'currentColor' : 'none'} strokeWidth={2} />
                  </button>
                  <div className="text-slate-500 group-hover:text-white transition-colors">
                    {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>
                </div>
              </div>

              {/* ACCORDION EXPANDABLE BODY */}
              {isExpanded && (
                <div className="px-6 pb-6 pt-2 border-t border-white/5 bg-black/20 space-y-6">
                  {/* Immediate dynamic summary phrase */}
                  <div className="p-3 bg-[#98465f]/5 border border-[#98465f]/10">
                    <p className="text-xs text-white leading-relaxed font-sans font-medium">
                      {item.summary}
                    </p>
                  </div>

                  {/* Grid layout for detailed insight delivery */}
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px]">
                    {/* Findings column */}
                    <div className="space-y-2">
                      <h4 className="text-[9px] font-bold text-muted uppercase tracking-widest border-b border-white/5 pb-1">
                        Key Findings
                      </h4>
                      <ul className="space-y-1.5 text-slate-300 font-sans">
                        {item.findings.map((finding, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-[#98465f] mt-0.5">•</span>
                            <span>{finding}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Recommendations column */}
                    <div className="space-y-2">
                      <h4 className="text-[9px] font-bold text-muted uppercase tracking-widest border-b border-white/5 pb-1">
                        Recommendations
                      </h4>
                      <ul className="space-y-1.5 text-slate-300 font-sans">
                        {item.recommendations.map((rec, idx) => (
                          <li key={idx} className="flex items-start gap-1.5">
                            <span className="text-emerald-500 mt-0.5">✓</span>
                            <span>{rec}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Data Used column */}
                    <div className="space-y-2">
                      <h4 className="text-[9px] font-bold text-muted uppercase tracking-widest border-b border-white/5 pb-1">
                        Data Used
                      </h4>
                      <div className="space-y-1.5">
                        {item.sources.map((source, idx) => (
                          <div key={idx} className="flex items-center gap-2 text-slate-400 font-mono text-[10px]">
                            <Database size={10} className="text-[#98465f]" />
                            <span>{source}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* BOTTOM ACTION BAR */}
                  <div className="pt-4 border-t border-white/5 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex items-center gap-4">
                      <button className="text-white bg-[#98465f] hover:bg-[#98465f]/80 transition-colors flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold px-3 py-1.5">
                        Open Full Report <ArrowUpRight size={11} strokeWidth={2.5} />
                      </button>
                      <button className="text-slate-400 hover:text-white transition-colors flex items-center gap-1.5 text-[9px] uppercase tracking-widest font-bold border border-white/10 px-3 py-1.5 bg-[#0a0a0c]">
                        <RefreshCw size={10} /> Run Again
                      </button>
                    </div>

                    <div className="flex items-center gap-3">
                      <button className="text-slate-500 hover:text-white transition-colors flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold">
                        <Share2 size={11} /> Share
                      </button>
                      <button className="text-slate-500 hover:text-white transition-colors flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold">
                        <FileText size={11} /> Export PDF
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default HistoryPage;