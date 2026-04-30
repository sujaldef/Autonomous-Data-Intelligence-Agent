import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Landing from './pages/landing';
import LoginSignup from './pages/login_signup';
import Dashboard from './pages/dashboard';
import ProjectLayout from './pages/projects/sidebar';
import QueryPage from './pages/projects/querry';
import HistoryPage from './pages/projects/history';
import AnalyticsPage from './pages/projects/analytics';
import { Navigate } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<LoginSignup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/projects/:projectId" element={<ProjectLayout />}>
          <Route index element={<Navigate to="query" replace />} />
          <Route path="query" element={<QueryPage />} />
          <Route path="history" element={<HistoryPage />} />
          <Route path="analytics" element={<AnalyticsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
