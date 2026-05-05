import React, { Suspense, lazy } from 'react';
import {
 BrowserRouter,
 Routes,
 Route,
 useLocation,
 Navigate,
} from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import GlobalLoader from './components/GlobalLoader';

const Landing = lazy(() => import('./pages/landing/landing'));
const LoginSignup = lazy(() => import('./pages/login_signup'));
const Dashboard = lazy(() => import('./pages/dashboard'));
const ProjectLayout = lazy(() => import('./pages/projects/sidebar'));
const QueryPage = lazy(() => import('./pages/projects/querry'));
const HistoryPage = lazy(() => import('./pages/projects/history'));
const AnalyticsPage = lazy(() => import('./pages/projects/analytics'));
const NotificationsPage = lazy(() => import('./pages/projects/notifications'));

const Architecture = lazy(() => import('./pages/architecture'));
const Protocol = lazy(() => import('./pages/protocol'));
const Docs = lazy(() => import('./pages/docs'));

function AppShell() {
  const { pathname } = useLocation();

  const isLanding = pathname === '/';
  const isAuth = pathname.startsWith('/auth');
  const isDoc = ['/architecture', '/protocol', '/docs'].includes(pathname);

  return (
    <Suspense fallback={<GlobalLoader />}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/architecture" element={<Architecture />} />
        <Route path="/protocol" element={<Protocol />} />
        <Route path="/docs" element={<Docs />} />
        
        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/projects" element={<ProjectLayout />}>
          <Route index element={<Navigate to="query" replace />} />
          <Route path="query" element={<QueryPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

function App() {
 return (
 <BrowserRouter>
 <ScrollToTop />
 <AppShell />
 </BrowserRouter>
 );
}

export default App;
