import React, { Suspense } from 'react';
import Hero from './components/Hero';
import NavForLanding from '../../components/navforlanding';

// Lazy load below-the-fold components
const Modular = React.lazy(() => import('./components/Modular'));
const Execution = React.lazy(() => import('./components/Execution'));
const End = React.lazy(() => import('./components/End'));

const AdiaManifesto = () => {
  return (
    <div className="min-h-screen bg-app text-ui selection-accent overflow-x-hidden font-satoshi">
      <NavForLanding />

      {/* Hero section loads immediately, but its heavy Vanta/p5 scripts are deferred */}
      <Hero />

      {/* Below-the-fold content is lazy-loaded */}
      <Suspense
        fallback={
          <div className="min-h-[900px] flex items-center justify-center text-slate-500 font-mono text-xs uppercase tracking-widest">
            Loading Architecture...
          </div>
        }
      >
        <Modular />
        <Execution />
        <End />
      </Suspense>
    </div>
  );
};

export default AdiaManifesto;
