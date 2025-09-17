import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import SchedulesPage from './pages/SchedulesPage';

// This component checks if the user is authenticated
const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('access_token');
  return token ? <Layout><Outlet /></Layout> : <Navigate to="/login" />;
};

// This component handles routes that should not be accessible when logged in
const PublicRoute: React.FC = () => {
  const token = localStorage.getItem('access_token');
  return token ? <Navigate to="/" /> : <Outlet />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/schedules" element={<SchedulesPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
