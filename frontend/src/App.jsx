import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
  Navigate,
} from 'react-router-dom';
import Landing from './pages/landing';
import LoginSignup from './pages/login_signup';
import Dashboard from './pages/dashboard';
import ProjectLayout from './pages/projects/sidebar';
import QueryPage from './pages/projects/querry';
import HistoryPage from './pages/projects/history';
import AnalyticsPage from './pages/projects/analytics';
import NotificationsPage from './pages/projects/notifications';
import Navbar from './components/navbar';

function AppShell() {
  const { pathname } = useLocation();
  const showNavbar = pathname !== '/' && !pathname.startsWith('/auth');

  return (
    <>
      {showNavbar ? <Navbar /> : null}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/:projectId" element={<ProjectLayout />}>
          <Route index element={<Navigate to="query" replace />} />
          <Route path="query" element={<QueryPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
          <Route path="notifications" element={<NotificationsPage />} />
        </Route>
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}

export default App;
