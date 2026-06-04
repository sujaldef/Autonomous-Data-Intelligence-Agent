// import React, { useState, memo, useMemo } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import {
//   ArrowUpRight,
//   Database,
//   Plus,
//   Search,
//   Filter,
//   MessageSquare,
//   AlertTriangle,
//   CheckCircle2,
//   TrendingUp,
//   Sparkles,
//   Layers,
//   X,
//   FileText,
//   Check,
//   RefreshCw,
//   Link2
// } from 'lucide-react';
// import { Link } from 'react-router-dom';

// // UPGRADED PROJECT CARD DATA WITH DATA TELETRAMY & REAL INSIGHTS
// const PROJECTS = [
//   {
//     id: 'PRJ-1024',
//     name: 'Q4 Revenue Analysis',
//     sources: ['SQL', 'RAG'],
//     status: 'ACTIVE',
//     health: 'CONNECTED',
//     lastActivity: '2 min ago',
//     metrics: { queries: 18, insights: 4, sources: 2 },
//     latestInsight: 'Revenue increased 12% via Electronics demand surge'
//   },
//   {
//     id: 'PRJ-1187',
//     name: 'Customer Feedback Engine',
//     sources: ['MongoDB', 'RAG'],
//     status: 'PROCESSING',
//     health: 'SYNCING',
//     lastActivity: '1 hour ago',
//     metrics: { queries: 142, insights: 29, sources: 3 },
//     latestInsight: 'Enterprise account churn risk dropped sharply by 8%'
//   },
//   {
//     id: 'PRJ-1402',
//     name: 'Inventory Audit 2026',
//     sources: ['SQL'],
//     status: 'COMPLETED',
//     health: 'CONNECTED',
//     lastActivity: 'Yesterday',
//     metrics: { queries: 8, insights: 2, sources: 1 },
//     latestInsight: 'Hardware safety stocks fell below pipeline threshold'
//   },
//   {
//     id: 'PRJ-1520',
//     name: 'Churn Prediction Model',
//     sources: ['SQL', 'CSV'],
//     status: 'IDLE',
//     health: 'FAILED',
//     lastActivity: '3 days ago',
//     metrics: { queries: 64, insights: 11, sources: 2 },
//     latestInsight: 'Data sync failure over localized CSV format mismatch'
//   },
// ];

// const STATS_CONFIG = [
//   { label: 'Questions Asked', value: '1,248', icon: MessageSquare },
//   { label: 'Issues Found', value: '47', icon: AlertTriangle },
//   { label: 'Actions Taken', value: '89', icon: CheckCircle2 },
//   { label: 'Success Rate', value: '95%', icon: TrendingUp },
// ];

// const BG_GRID_STYLE = {
//   backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
//   backgroundSize: '40px 40px',
// };

// const StatItem = memo(({ stat }) => (
//   <div className="bg-[#0a0a0c] border border-white/5 p-6 flex flex-col min-w-[160px] hover:bg-white/[0.02] transition-colors">
//     <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2">
//       {stat.label}
//     </span>
//     <div className="flex items-center justify-between mt-auto">
//       <span className="text-2xl font-mono text-white font-light tracking-tight">{stat.value}</span>
//       <stat.icon size={14} className="text-[#98465f] opacity-60" />
//     </div>
//   </div>
// ));

// // UPGRADED DATACARD WITH SYSTEM TELEMETRY AND TELEMETRY STATS
// const ProjectCard = memo(({ project, idx }) => {
//   const healthColors = {
//     CONNECTED: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20',
//     SYNCING: 'text-amber-400 bg-amber-400/10 border-amber-500/20',
//     FAILED: 'text-rose-400 bg-rose-400/10 border-rose-500/20'
//   };

//   return (
//     <div className="bg-[#0a0a0c] border border-white/5 rounded-none p-5 hover:border-[#98465f]/40 transition-all group relative flex flex-col h-full justify-between font-sans">
//       <div className={`absolute top-0 left-0 w-full h-px transition-colors ${project.status === 'ACTIVE' ? 'bg-[#98465f]' : 'bg-transparent group-hover:bg-white/10'}`} />
      
//       <div>
//         {/* Top telemetry state section */}
//         <div className="flex justify-between items-center mb-4">
//           <span className="text-[9px] font-mono tracking-widest text-slate-600">{project.id}</span>
//           <div className="flex items-center gap-2">
//             <span className={`text-[8px] font-mono px-2 py-0.5 border uppercase tracking-wider ${healthColors[project.health]}`}>
//               ● {project.health}
//             </span>
//             <Link to={`/workspaces/${project.id.toLowerCase()}`} className="text-slate-600 group-hover:text-white transition-colors">
//               <ArrowUpRight size={13} />
//             </Link>
//           </div>
//         </div>

//         {/* Title mapping out clear workspace intent */}
//         <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 group-hover:text-[#98465f] transition-colors">
//           {project.name}
//         </h3>

//         {/* TINY NESTED STATS CAPTURING TRUE ANALYST USAGE */}
//         <div className="grid grid-cols-3 gap-1 py-3 border-y border-white/5 my-4 bg-white/[0.01] px-2">
//           <div>
//             <p className="text-[8px] uppercase tracking-wider text-slate-500 font-mono">Queries</p>
//             <p className="text-white font-mono text-xs mt-0.5">{project.metrics.queries}</p>
//           </div>
//           <div>
//             <p className="text-[8px] uppercase tracking-wider text-slate-500 font-mono">Insights</p>
//             <p className="text-white font-mono text-xs mt-0.5">{project.metrics.insights}</p>
//           </div>
//           <div>
//             <p className="text-[8px] uppercase tracking-wider text-slate-500 font-mono">Sources</p>
//             <p className="text-white font-mono text-xs mt-0.5">{project.metrics.sources}</p>
//           </div>
//         </div>

//         {/* Core connected system primitives */}
//         <div className="flex flex-wrap gap-1.5 mb-4">
//           {project.sources.map((s) => (
//             <span key={s} className="text-[8px] font-mono uppercase px-1.5 py-0.5 border border-white/5 bg-black text-slate-400">
//               {s}
//             </span>
//           ))}
//         </div>
//       </div>

//       {/* LATEST GENERATED ANALYST PREVIEW INSIGHT FRAME */}
//       <div className="mt-2 pt-3 border-t border-white/5 space-y-1 bg-gradient-to-b from-white/[0.02] to-transparent p-2 border border-white/5">
//         <span className="text-[8px] font-bold tracking-widest uppercase text-[#98465f] flex items-center gap-1">
//           <Sparkles size={8} /> Latest Insight Preview
//         </span>
//         <p className="text-[10px] text-slate-400 italic line-clamp-1 leading-normal">
//           "{project.latestInsight}"
//         </p>
//       </div>

//       {/* Card Base Tracker */}
//       <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest pt-3 mt-4 border-t border-white/5 text-slate-500 font-mono">
//         <span className={project.status === 'ACTIVE' ? 'text-[#98465f]' : 'text-slate-600'}>
//           {project.status}
//         </span>
//         <span>{project.lastActivity}</span>
//       </div>
//     </div>
//   );
// });

// function Dashboard() {
//   const [searchTerm, setSearchTerm] = useState('');
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   // New Workspace state matrices
//   const [step, setStep] = useState(1);
//   const [wsName, setWsName] = useState('');
//   const [wsType, setWsType] = useState('Business Analytics');
//   const [selectedSource, setSelectedSource] = useState('');

//   const filteredProjects = useMemo(() => {
//     if (!searchTerm) return PROJECTS;
//     return PROJECTS.filter(
//       (p) =>
//         p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         p.id.toLowerCase().includes(searchTerm.toLowerCase()),
//     );
//   }, [searchTerm]);

//   return (
//     <div className="min-h-screen bg-[#0a0a0c] text-slate-400 selection:bg-[#98465f]/30">
      
//       <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={BG_GRID_STYLE} />

//       <div className="relative z-10 max-w-[1500px] mx-auto px-8 py-10 space-y-10">
        
//         {/* UPPER HUD PROFILE & AGGREGATE SYSTEM METRICS */}
//         <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border-b border-white/5 pb-8">
//           <div className="flex items-center gap-5">
//             <div className="h-16 w-16 bg-white/5 border border-white/10 flex items-center justify-center relative p-1">
//               <img
//                 src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=0a0a0c"
//                 alt="user"
//                 className="w-full h-full object-cover contrast-125 grayscale"
//               />
//               <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 border-2 border-[#0a0a0c]" />
//             </div>
//             <div>
//               <p className="text-[9px] uppercase tracking-[0.25em] text-[#98465f] font-bold">Systems Interface Operational</p>
//               <h1 className="text-xl text-white tracking-widest font-light uppercase">Alex Rivera</h1>
//               <span className="text-[11px] text-slate-500 font-sans">Strategic Business Workspace Repository</span>
//             </div>
//           </div>

//           <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 w-full xl:w-auto">
//             {STATS_CONFIG.map((stat, i) => (
//               <StatItem key={i} stat={stat} />
//             ))}
//           </div>
//         </header>

//         {/* HUMAN INTELLIGENT ACTION CONTROLS BAR */}
//         <section className="flex flex-col sm:flex-row items-center gap-4 bg-white/[0.01] p-3 border border-white/5">
//           <div className="relative flex-grow w-full sm:max-w-md">
//             <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={13} />
//             <input
//               type="text"
//               placeholder="Search workspaces..."
//               className="w-full bg-[#0a0a0c] border border-white/10 py-2 pl-9 pr-3 text-xs text-white tracking-wide font-sans focus:outline-none focus:border-[#98465f]/50 placeholder:text-slate-700"
//               value={searchTerm}
//               onChange={(e) => setSearchTerm(e.target.value)}
//             />
//           </div>

//           <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
//             <button 
//               onClick={() => { setStep(1); setIsModalOpen(true); }}
//               className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-white text-black hover:bg-slate-200 text-[10px] font-bold tracking-widest uppercase transition-colors"
//             >
//               <Plus size={13} strokeWidth={2} /> Create Workspace
//             </button>
//           </div>
//         </section>

//         {/* WORKSPACE MATRIX AREA HEADER */}
//         <div className="flex justify-between items-center border-b border-white/5 pb-3">
//           <div className="flex items-center gap-2">
//             <Layers size={13} className="text-[#98465f]" />
//             <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white">Active Operational Workspaces</h2>
//           </div>
//           <button className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-mono text-slate-500 hover:text-white transition-colors">
//             <Filter size={11} /> Filter [{filteredProjects.length}]
//           </button>
//         </div>

//         {/* INTEGRATED ARCHITECTURE PROJECTS GRID WITH EMBEDDED INLINE ACTION INSERTS */}
//         <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
//           {filteredProjects.map((project, idx) => (
//             <ProjectCard key={project.id} project={project} idx={idx} />
//           ))}

//           {/* DYNAMIC INTEGRATION ACTION SLOT - PERSISTENT INTERNAL INITIATOR */}
//           <div 
//             onClick={() => { setStep(1); setIsModalOpen(true); }}
//             className="border-2 border-dashed border-white/5 bg-white/[0.01] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/[0.02] hover:border-[#98465f]/30 transition-all min-h-[260px] group"
//           >
//             <div className="h-10 w-10 border border-white/10 flex items-center justify-center mb-4 bg-[#0a0a0c] group-hover:border-[#98465f]/40 text-slate-500 group-hover:text-white transition-colors">
//               <Plus size={16} />
//             </div>
//             <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">New Workspace</h4>
//             <p className="text-[10px] text-slate-500 max-w-[180px] font-sans leading-normal">
//               Connect external analytical engines, append custom documents, configure dynamic pipelines.
//             </p>
//           </div>
//         </section>
//       </div>

//       {/* COMPACT INTERACTIVE INITIALIZATION PROCESS ENGINE MODAL */}
//       <AnimatePresence>
//         {isModalOpen && (
//           <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
//             <motion.div 
//               initial={{ scale: 0.96, opacity: 0 }}
//               animate={{ scale: 1, opacity: 1 }}
//               exit={{ scale: 0.96, opacity: 0 }}
//               className="bg-[#0a0a0c] border border-white/10 w-full max-w-4xl min-h-[520px] flex flex-col lg:flex-row relative"
//             >
//               {/* Close Button Anchor */}
//               <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-10">
//                 <X size={15} />
//               </button>

//               {/* LEFT WORKING COLUMN - STEP ARCHITECTURE */}
//               <div className="flex-1 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
//                 <div>
//                   <div className="flex items-center gap-2 mb-6">
//                     <span className="text-[8px] font-mono px-2 py-0.5 bg-[#98465f]/10 border border-[#98465f]/30 text-[#98465f] font-bold tracking-widest uppercase">
//                       Step {step} of 2
//                     </span>
//                     <h2 className="text-xs font-bold uppercase tracking-widest text-white">Create Analytical Workspace</h2>
//                   </div>

//                   {step === 1 ? (
//                     <div className="space-y-5 animate-fadeIn">
//                       <div className="space-y-1.5">
//                         <label className="text-[9px] uppercase font-mono font-bold text-slate-500 tracking-wider block">Workspace Identity Name</label>
//                         <input 
//                           type="text"
//                           value={wsName}
//                           onChange={(e) => setWsName(e.target.value)}
//                           placeholder="e.g., Enterprise Margin Optimization Pipeline"
//                           className="w-full bg-white/[0.02] border border-white/10 p-2.5 text-xs text-white outline-none focus:border-[#98465f]/50 font-sans"
//                         />
//                       </div>

//                       <div className="space-y-2">
//                         <label className="text-[9px] uppercase font-mono font-bold text-slate-500 tracking-wider block">Target Operations Framework</label>
//                         <div className="grid grid-cols-2 gap-2 text-[10px] uppercase font-bold tracking-wider">
//                           {['Business Analytics', 'Customer Feedback', 'Inventory Analysis', 'Custom Architecture'].map((t) => (
//                             <div 
//                               key={t}
//                               onClick={() => setWsType(t)}
//                               className={`p-3 border border-white/5 bg-white/[0.01] cursor-pointer transition-colors flex items-center justify-between ${wsType === t ? 'border-[#98465f] text-white bg-[#98465f]/5' : 'hover:border-white/10 text-slate-400'}`}
//                             >
//                               <span>{t}</span>
//                               <div className={`h-2 w-2 rounded-full border ${wsType === t ? 'bg-[#98465f] border-transparent' : 'border-slate-700'}`} />
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="space-y-5 animate-fadeIn">
//                       <label className="text-[9px] uppercase font-mono font-bold text-slate-500 tracking-wider block">Select Ingestion Driver</label>
//                       <div className="grid grid-cols-3 gap-2 text-[9px] font-mono uppercase font-bold">
//                         {[
//                           { id: 'mongo', label: 'MongoDB Cluster' },
//                           { id: 'postgres', label: 'PostgreSQL DB' },
//                           { id: 'mysql', label: 'MySQL Server' },
//                           { id: 'csv', label: 'CSV / Excel Engine' },
//                           { id: 'pdf', label: 'PDF Documents Collection' },
//                           { id: 'api', label: 'Live REST API Interface' }
//                         ].map((src) => (
//                           <div
//                             key={src.id}
//                             onClick={() => setSelectedSource(src.id)}
//                             className={`p-3 border text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-2 ${selectedSource === src.id ? 'border-[#98465f] text-white bg-[#98465f]/5' : 'border-white/5 bg-white/[0.01] text-slate-400 hover:border-white/10'}`}
//                           >
//                             <span>{src.label}</span>
//                           </div>
//                         ))}
//                       </div>

//                       {/* DYNAMIC CONFIGURATION FOR SELECTED DRIVERS */}
//                       {selectedSource === 'mongo' && (
//                         <div className="p-3 border border-white/5 bg-black/40 space-y-3 font-sans text-[11px] animate-fadeIn">
//                           <div className="space-y-1">
//                             <span className="text-[8px] font-mono uppercase text-slate-500 block">Connection URI string</span>
//                             <input type="text" placeholder="mongodb+srv://admin:cluster0.x7y.mongodb.net/prod" className="w-full bg-[#0a0a0c] border border-white/5 p-2 text-white font-mono text-[10px] outline-none" />
//                           </div>
//                           <div className="grid grid-cols-2 gap-2">
//                             <div className="space-y-1">
//                               <span className="text-[8px] font-mono uppercase text-slate-500 block">Target Database</span>
//                               <input type="text" placeholder="analytics_db" className="w-full bg-[#0a0a0c] border border-white/5 p-2 text-white outline-none" />
//                             </div>
//                             <div className="space-y-1">
//                               <span className="text-[8px] font-mono uppercase text-slate-500 block">Collection</span>
//                               <input type="text" placeholder="sales_ledger" className="w-full bg-[#0a0a0c] border border-white/5 p-2 text-white outline-none" />
//                             </div>
//                           </div>
//                         </div>
//                       )}

//                       {selectedSource === 'pdf' && (
//                         <div className="p-5 border border-dashed border-white/10 bg-black/40 text-center space-y-2 cursor-pointer hover:bg-white/[0.01] transition-colors animate-fadeIn flex flex-col items-center justify-center">
//                           <FileText size={18} className="text-slate-500" />
//                           <p className="text-[11px] text-slate-300 font-sans">Drag knowledge base documents here or <span className="text-[#98465f] underline">browse local storage</span></p>
//                           <span className="text-[9px] text-slate-600 font-mono block">Accepts raw PDF, JSON, DOCX up to 64MB vector limits</span>
//                         </div>
//                       )}
//                     </div>
//                   )}
//                 </div>

//                 {/* Footer Command Buttons */}
//                 <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-8">
//                   <button 
//                     onClick={() => step === 2 ? setStep(1) : setIsModalOpen(false)}
//                     className="px-4 py-2 border border-white/10 text-[9px] uppercase font-bold tracking-widest text-slate-400 hover:text-white transition-colors"
//                   >
//                     {step === 2 ? 'Back' : 'Cancel'}
//                   </button>
                  
//                   {step === 1 ? (
//                     <button 
//                       disabled={!wsName}
//                       onClick={() => setStep(2)}
//                       className="px-5 py-2 bg-white text-black disabled:bg-slate-800 disabled:text-slate-500 text-[9px] uppercase font-bold tracking-widest transition-colors"
//                     >
//                       Continue
//                     </button>
//                   ) : (
//                     <div className="flex items-center gap-2">
//                       <button className="px-4 py-2 border border-[#98465f]/30 bg-[#98465f]/5 text-[#98465f] text-[9px] uppercase font-bold tracking-widest flex items-center gap-1.5 hover:bg-[#98465f]/10 transition-colors">
//                         <RefreshCw size={10} /> Test Pipeline
//                       </button>
//                       <button 
//                         onClick={() => setIsModalOpen(false)}
//                         className="px-5 py-2 bg-[#98465f] text-white text-[9px] uppercase font-bold tracking-widest hover:bg-[#98465f]/80 transition-colors"
//                       >
//                         Create Workspace
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               </div>

//               {/* RIGHT SIDEBAR COLUMN - CONTINUOUS REAL-TIME COMPILATION PREVIEW */}
//               <div className="w-full lg:w-[280px] bg-black/40 p-8 flex flex-col justify-start text-[11px] font-sans">
//                 <h3 className="text-[9px] uppercase font-mono font-bold tracking-[0.2em] text-slate-500 mb-6 pb-2 border-b border-white/5">
//                   Compilation Matrix
//                 </h3>

//                 <div className="space-y-4 flex-grow">
//                   <div className="space-y-1">
//                     <span className="text-[8px] font-mono uppercase text-slate-600 block">Workspace Class</span>
//                     <p className="text-white font-medium uppercase tracking-wide text-[10px]">
//                       {wsName || 'Unassigned Identifier'}
//                     </p>
//                   </div>

//                   <div className="space-y-1">
//                     <span className="text-[8px] font-mono uppercase text-slate-600 block">System Archetype</span>
//                     <p className="text-slate-300 font-medium">{wsType}</p>
//                   </div>

//                   <div className="space-y-1">
//                     <span className="text-[8px] font-mono uppercase text-slate-600 block">Ingestion Vectors</span>
//                     <p className="text-slate-300 font-mono text-[10px]">
//                       {selectedSource ? selectedSource.toUpperCase() : 'NO DRIVER INITIALIZED'}
//                     </p>
//                   </div>

//                   <div className="pt-4 border-t border-white/5 space-y-2">
//                     <span className="text-[8px] font-mono uppercase text-slate-600 block">Engine Initialization Profile</span>
//                     <div className="flex items-center gap-2 text-slate-400 font-mono text-[9px]">
//                       <div className={`h-1.5 w-1.5 rounded-full ${wsName ? 'bg-emerald-400' : 'bg-slate-700'}`} />
//                       <span>Schema Defined</span>
//                     </div>
//                     <div className="flex items-center gap-2 text-slate-400 font-mono text-[9px]">
//                       <div className={`h-1.5 w-1.5 rounded-full ${selectedSource ? 'bg-emerald-400' : 'bg-slate-700'}`} />
//                       <span>Driver Mounted</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="mt-auto pt-6 border-t border-white/5 text-[9px] font-mono text-slate-600 flex items-center gap-1.5">
//                   <Link2 size={11} /> Ready to compile.
//                 </div>
//               </div>

//             </motion.div>
//           </div>
//         )}
//       </AnimatePresence>

//     </div>
//   );
// }

// export default Dashboard;




import React, { useState, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight,
  Database,
  Plus,
  Search,
  Filter,
  MessageSquare,
  Layers,
  X,
  FileText,
  Link2,
  Briefcase
} from 'lucide-react';
import { Link } from 'react-router-dom';

// CLEANED PROJECT DATA PRESERVING THE SAME ARCHITECTURE
const PROJECTS = [
  {
    id: 'PRJ-1024',
    name: 'Q4 Revenue Analysis',
    sources: ['SQL DATABASE', 'INTERNAL DOCS'],
    status: 'ACTIVE',
    health: 'CONNECTED',
    lastActivity: '2 min ago',
    questionsAsked: 18
  },
  {
    id: 'PRJ-1187',
    name: 'Customer Feedback Engine',
    sources: ['MONGODB', 'SUPPORT TICKETS'],
    status: 'PROCESSING',
    health: 'SYNCING',
    lastActivity: '1 hour ago',
    questionsAsked: 142
  },
  {
    id: 'PRJ-1402',
    name: 'Inventory Audit 2026',
    sources: ['SQL DATABASE'],
    status: 'COMPLETED',
    health: 'CONNECTED',
    lastActivity: 'Yesterday',
    questionsAsked: 8
  },
  {
    id: 'PRJ-1520',
    name: 'Churn Prediction Model',
    sources: ['CSV UPLOAD'],
    status: 'IDLE',
    health: 'FAILED',
    lastActivity: '3 days ago',
    questionsAsked: 64
  },
];

const STATS_CONFIG = [
  { label: 'Active Workspaces', value: '4', icon: Layers },
  { label: 'Questions Asked', value: '1,248', icon: MessageSquare },
];

const BG_GRID_STYLE = {
  backgroundImage: `linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)`,
  backgroundSize: '40px 40px',
};

const StatItem = memo(({ stat }) => (
  <div className="bg-[#0a0a0c] border border-white/5 p-6 flex flex-col min-w-[160px] hover:bg-white/[0.02] transition-colors">
    <span className="text-[10px] uppercase font-bold tracking-widest text-slate-500 mb-2">
      {stat.label}
    </span>
    <div className="flex items-center justify-between mt-auto">
      <span className="text-2xl font-mono text-white font-light tracking-tight">{stat.value}</span>
      <stat.icon size={14} className="text-[#98465f] opacity-60" />
    </div>
  </div>
));

const ProjectCard = memo(({ project, idx }) => {
  const healthColors = {
    CONNECTED: 'text-emerald-400 bg-emerald-400/10 border-emerald-500/20',
    SYNCING: 'text-amber-400 bg-amber-400/10 border-amber-500/20',
    FAILED: 'text-rose-400 bg-rose-400/10 border-rose-500/20'
  };

  const healthLabels = {
    CONNECTED: '🟢 CONNECTED',
    SYNCING: '🟡 SYNCING',
    FAILED: '🔴 ATTENTION NEEDED'
  };

  return (
    <div className="bg-[#0a0a0c] border border-white/5 rounded-none p-5 hover:border-[#98465f]/40 transition-all group relative flex flex-col h-full justify-between font-sans">
      <div className={`absolute top-0 left-0 w-full h-px transition-colors ${project.status === 'ACTIVE' ? 'bg-[#98465f]' : 'bg-transparent group-hover:bg-white/10'}`} />
      
      <div>
        <div className="flex justify-between items-center mb-4">
          <span className="text-[9px] font-mono tracking-widest text-slate-600">{project.id}</span>
          <div className="flex items-center gap-2">
            <span className={`text-[8px] font-mono px-2 py-0.5 border uppercase tracking-wider ${healthColors[project.health]}`}>
              {healthLabels[project.health]}
            </span>
            <Link to={`/projects`} className="text-slate-600 group-hover:text-white transition-colors">
              <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>

        <h3 className="text-xs font-bold text-white uppercase tracking-wider mb-4 group-hover:text-[#98465f] transition-colors">
          {project.name}
        </h3>

        <div className="py-3 border-y border-white/5 my-4 bg-white/[0.01] px-2">
          <p className="text-[8px] uppercase tracking-wider text-slate-500 font-mono">Connected Data</p>
          <p className="text-white font-sans text-xs mt-0.5 font-medium">{project.sources.join(' + ')}</p>
        </div>
      </div>

      <div className="flex justify-between items-center text-[8px] font-bold uppercase tracking-widest pt-3 mt-4 border-t border-white/5 text-slate-500 font-mono">
        <span>
          QUESTIONS: <span className="text-white">{project.questionsAsked}</span>
        </span>
        <span>LAST USED: {project.lastActivity}</span>
      </div>
    </div>
  );
});

function Dashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [step, setStep] = useState(1);
  const [wsName, setWsName] = useState('');
  const [connectionType, setConnectionType] = useState(''); // 'database', 'documents', 'both'
  const [dbConnectionString, setDbConnectionString] = useState('');

  const filteredProjects = useMemo(() => {
    if (!searchTerm) return PROJECTS;
    return PROJECTS.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.id.toLowerCase().includes(searchTerm.toLowerCase()),
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-slate-400 selection:bg-[#98465f]/30">
      
      <div className="fixed inset-0 pointer-events-none opacity-[0.03]" style={BG_GRID_STYLE} />

      <div className="relative z-10 max-w-[1500px] mx-auto px-8 py-10 space-y-10">
        
        <header className="flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border-b border-white/5 pb-8">
          <div className="flex items-center gap-5">
            <div className="h-16 w-16 bg-white/5 border border-white/10 flex items-center justify-center relative p-1">
              <img
                src="https://api.dicebear.com/7.x/avataaars/svg?seed=Alex&backgroundColor=0a0a0c"
                alt="user"
                className="w-full h-full object-cover contrast-125 grayscale"
              />
              <div className="absolute bottom-0 right-0 h-2.5 w-2.5 bg-emerald-500 border-2 border-[#0a0a0c]" />
            </div>
            <div>
              <p className="text-[9px] uppercase tracking-[0.25em] text-[#98465f] font-bold">Systems Interface Operational</p>
              <h1 className="text-xl text-white tracking-widest font-light uppercase">Koshta</h1>
              <span className="text-[11px] text-slate-500 font-sans">Strategic Business Workspace Repository</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 w-full xl:w-auto">
            {STATS_CONFIG.map((stat, i) => (
              <StatItem key={i} stat={stat} />
            ))}
          </div>
        </header>

        <section className="flex flex-col sm:flex-row items-center gap-4 bg-white/[0.01] p-3 border border-white/5">
          <div className="relative flex-grow w-full sm:max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-600" size={13} />
            <input
              type="text"
              placeholder="Search workspaces..."
              className="w-full bg-[#0a0a0c] border border-white/10 py-2 pl-9 pr-3 text-xs text-white tracking-wide font-sans focus:outline-none focus:border-[#98465f]/50 placeholder:text-slate-700"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto sm:ml-auto">
            <button 
              onClick={() => { setStep(1); setIsModalOpen(true); }}
              className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2 bg-white text-black hover:bg-slate-200 text-[10px] font-bold tracking-widest uppercase transition-colors"
            >
              <Plus size={13} strokeWidth={2} /> Create Workspace
            </button>
          </div>
        </section>

        <div className="flex justify-between items-center border-b border-white/5 pb-3">
          <div className="flex items-center gap-2">
            <Layers size={13} className="text-[#98465f]" />
            <h2 className="text-[10px] uppercase tracking-[0.25em] font-bold text-white">Active Operational Workspaces</h2>
          </div>
          <button className="flex items-center gap-1.5 text-[9px] uppercase tracking-wider font-mono text-slate-500 hover:text-white transition-colors">
            <Filter size={11} /> Filter [{filteredProjects.length}]
          </button>
        </div>

        <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {filteredProjects.map((project, idx) => (
            <ProjectCard key={project.id} project={project} idx={idx} />
          ))}

          <div 
            onClick={() => { setStep(1); setIsModalOpen(true); }}
            className="border-2 border-dashed border-white/5 bg-white/[0.01] p-6 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-white/[0.02] hover:border-[#98465f]/30 transition-all min-h-[190px] group"
          >
            <div className="h-10 w-10 border border-white/10 flex items-center justify-center mb-4 bg-[#0a0a0c] group-hover:border-[#98465f]/40 text-slate-500 group-hover:text-white transition-colors">
              <Plus size={16} />
            </div>
            <h4 className="text-[11px] font-bold text-white uppercase tracking-wider mb-1">New Workspace</h4>
            <p className="text-[10px] text-slate-500 max-w-[180px] font-sans leading-normal">
              Connect corporate databases, drop structural knowledge documents, or aggregate both assets seamlessly.
            </p>
          </div>
        </section>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
            <motion.div 
              initial={{ scale: 0.96, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.96, opacity: 0 }}
              className="bg-[#0a0a0c] border border-white/10 w-full max-w-4xl min-h-[520px] flex flex-col lg:flex-row relative"
            >
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-500 hover:text-white transition-colors z-10">
                <X size={15} />
              </button>

              {/* LEFT COLUMN - USER INPUT CHANNELS */}
              <div className="flex-1 p-8 flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5">
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <span className="text-[8px] font-mono px-2 py-0.5 bg-[#98465f]/10 border border-[#98465f]/30 text-[#98465f] font-bold tracking-widest uppercase">
                      Step {step} of 2
                    </span>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-white">Create Analytical Workspace</h2>
                  </div>

                  {step === 1 ? (
                    <div className="space-y-5 animate-fadeIn">
                      <div className="space-y-1.5">
                        <label className="text-[9px] uppercase font-mono font-bold text-slate-500 tracking-wider block">Workspace Identity Name</label>
                        <input 
                          type="text"
                          value={wsName}
                          onChange={(e) => setWsName(e.target.value)}
                          placeholder="e.g., Customer Analytics, Sales Dashboard"
                          className="w-full bg-white/[0.02] border border-white/10 p-2.5 text-xs text-white outline-none focus:border-[#98465f]/50 font-sans"
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-5 animate-fadeIn">
                      <label className="text-[9px] uppercase font-mono font-bold text-slate-500 tracking-wider block">Select Ingestion Layer Target</label>
                      <div className="grid grid-cols-3 gap-2 text-[10px] font-sans uppercase font-bold tracking-wider">
                        {[
                          { id: 'database', label: 'Database String' },
                          { id: 'documents', label: 'Documents / Files' },
                          { id: 'both', label: 'Both Frameworks' }
                        ].map((src) => (
                          <div
                            key={src.id}
                            onClick={() => setConnectionType(src.id)}
                            className={`p-4 border text-center cursor-pointer transition-colors flex flex-col items-center justify-center gap-1 text-[9px] font-mono uppercase ${connectionType === src.id ? 'border-[#98465f] text-white bg-[#98465f]/5' : 'border-white/5 bg-white/[0.01] text-slate-400 hover:border-white/10'}`}
                          >
                            <span>{src.label}</span>
                          </div>
                        ))}
                      </div>

                      {(connectionType === 'database' || connectionType === 'both') && (
                        <div className="p-3 border border-white/5 bg-black/40 space-y-3 font-sans text-[11px] animate-fadeIn">
                          <div className="space-y-1">
                            <span className="text-[8px] font-mono uppercase text-slate-500 block">Database Connection String</span>
                            <input 
                              type="password" 
                              placeholder="postgresql://user:password@host:port/database" 
                              value={dbConnectionString}
                              onChange={(e) => setDbConnectionString(e.target.value)}
                              className="w-full bg-[#0a0a0c] border border-white/5 p-2 text-white font-mono text-[10px] outline-none" 
                            />
                          </div>
                          <div className="flex items-center justify-end">
                            <button className="px-3 py-1 border border-white/10 bg-white/5 hover:bg-white/10 text-white font-mono text-[9px] uppercase transition-colors">
                              Test Connection
                            </button>
                          </div>
                        </div>
                      )}

                      {(connectionType === 'documents' || connectionType === 'both') && (
                        <div className="p-5 border border-dashed border-white/10 bg-black/40 text-center space-y-2 cursor-pointer hover:bg-white/[0.01] transition-colors animate-fadeIn flex flex-col items-center justify-center">
                          <FileText size={18} className="text-slate-500" />
                          <p className="text-[11px] text-slate-300 font-sans">Drag knowledge base documents here or <span className="text-[#98465f] underline">browse local storage</span></p>
                          <span className="text-[9px] text-slate-600 font-mono block">Accepts raw PDF, JSON, DOCX, CSV structures</span>
                        </div>
                      )}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-white/5 mt-8">
                  <button 
                    onClick={() => step === 2 ? setStep(1) : setIsModalOpen(false)}
                    className="px-4 py-2 border border-white/10 text-[9px] uppercase font-bold tracking-widest text-slate-400 hover:text-white transition-colors"
                  >
                    {step === 2 ? 'Back' : 'Cancel'}
                  </button>
                  
                  {step === 1 ? (
                    <button 
                      disabled={!wsName}
                      onClick={() => setStep(2)}
                      className="px-5 py-2 bg-white text-black disabled:bg-slate-800 disabled:text-slate-500 text-[9px] uppercase font-bold tracking-widest transition-colors"
                    >
                      Continue
                    </button>
                  ) : (
                    <button 
                      disabled={!connectionType}
                      onClick={() => setIsModalOpen(false)}
                      className="px-5 py-2 bg-[#98465f] text-white text-[9px] uppercase font-bold tracking-widest hover:bg-[#98465f]/80 transition-colors"
                    >
                      Create Workspace
                    </button>
                  )}
                </div>
              </div>

              {/* RIGHT SIDEBAR COLUMN - COMPILATION MATRIX BAR */}
              <div className="w-full lg:w-[280px] bg-black/40 p-8 flex flex-col justify-start text-[11px] font-sans">
                <h3 className="text-[9px] uppercase font-mono font-bold tracking-[0.2em] text-slate-500 mb-6 pb-2 border-b border-white/5">
                  Compilation Matrix
                </h3>

                <div className="space-y-4 flex-grow">
                  <div className="space-y-1">
                    <span className="text-[8px] font-mono uppercase text-slate-600 block">Workspace Class</span>
                    <p className="text-white font-medium uppercase tracking-wide text-[10px]">
                      {wsName || 'Unassigned Identifier'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[8px] font-mono uppercase text-slate-600 block">Ingestion Targets</span>
                    <p className="text-slate-300 font-mono text-[10px] uppercase">
                      {connectionType ? connectionType : 'NO DRIVER INITIALIZED'}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 space-y-2">
                    <span className="text-[8px] font-mono uppercase text-slate-600 block">Engine Initialization Profile</span>
                    <div className="flex items-center gap-2 text-slate-400 font-mono text-[9px]">
                      <div className={`h-1.5 w-1.5 rounded-full ${wsName ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                      <span>Schema Defined</span>
                    </div>
                    <div className="flex items-center gap-2 text-slate-400 font-mono text-[9px]">
                      <div className={`h-1.5 w-1.5 rounded-full ${connectionType ? 'bg-emerald-400' : 'bg-slate-700'}`} />
                      <span>Driver Mounted</span>
                    </div>
                  </div>
                </div>

                <div className="mt-auto pt-6 border-t border-white/5 text-[9px] font-mono text-slate-600 flex items-center gap-1.5">
                  <Briefcase size={11} /> Ready to compile.
                </div>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}

export default Dashboard;