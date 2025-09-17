import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Outlet, Link } from 'react-router-dom';

// Simple placeholder components for testing
const SimpleDashboard = () => <div style={{ padding: '2rem' }}><h1>Dashboard Page</h1><Link to="/login">Go to Login</Link></div>;
const SimpleLogin = () => <div style={{ padding: '2rem' }}><h1>Login Page</h1><Link to="/">Go to Dashboard</Link></div>;
const SimpleRegister = () => <div style={{ padding: '2rem' }}><h1>Register Page</h1><Link to="/login">Go to Login</Link></div>;

// Using a simplified Layout for now
const SimpleLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div>
      <header style={{ padding: '1rem', backgroundColor: '#eee' }}>My App</header>
      <main>{children}</main>
    </div>
  );
};

// This component checks if the user is authenticated
const ProtectedRoute: React.FC = () => {
  const token = localStorage.getItem('access_token');
  // For this test, we pass the Outlet directly to the Layout
  return token ? <SimpleLayout><Outlet /></SimpleLayout> : <Navigate to="/login" />;
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
          <Route path="/login" element={<SimpleLogin />} />
          <Route path="/register" element={<SimpleRegister />} />
        </Route>
        
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<SimpleDashboard />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;