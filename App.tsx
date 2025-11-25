
import React, { useState } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Landing } from './pages/Landing';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { UserDashboard } from './pages/UserDashboard';
import { Scanner } from './pages/Scanner';
import { Report } from './pages/Report';
import { AdminDashboard } from './pages/AdminDashboard';
import { Performance } from './pages/Performance';
import { ExtraSecurity } from './pages/ExtraSecurity';
import { User, UserRole, SecurityReport } from './types';

function App() {
  // Simple mock authentication state
  const [user, setUser] = useState<User | null>(null);
  const [lastReport, setLastReport] = useState<SecurityReport | null>(null);

  const handleLogin = (role: UserRole) => {
    // Mock login logic
    setUser({
      id: '1',
      name: role === UserRole.ADMIN ? 'Admin User' : 'Jane Doe',
      email: role === UserRole.ADMIN ? 'admin@mobsafe.com' : 'jane@example.com',
      role: role
    });
  };

  const handleLogout = () => {
    setUser(null);
    setLastReport(null);
  };

  const handleScanComplete = (report: SecurityReport) => {
    setLastReport(report);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Navbar user={user} onLogout={handleLogout} />
        
        <main className="flex-grow flex flex-col">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Landing />} />
            <Route 
              path="/login" 
              element={!user ? <Login onLogin={handleLogin} /> : <Navigate to={user.role === UserRole.ADMIN ? "/admin" : "/dashboard"} replace />} 
            />
            <Route 
              path="/signup" 
              element={!user ? <Signup onSignup={() => handleLogin(UserRole.USER)} /> : <Navigate to="/dashboard" replace />} 
            />

            {/* User Protected Routes */}
            <Route 
              path="/dashboard" 
              element={user && user.role === UserRole.USER ? <UserDashboard user={user} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/scan" 
              element={user ? <Scanner onScanComplete={handleScanComplete} /> : <Navigate to="/login" replace />} 
            />
            <Route 
              path="/report" 
              element={user ? <Report report={lastReport} /> : <Navigate to="/dashboard" replace />} 
            />
            <Route 
              path="/performance" 
              element={user ? <Performance /> : <Navigate to="/dashboard" replace />} 
            />
            <Route 
              path="/extra-security" 
              element={user ? <ExtraSecurity /> : <Navigate to="/dashboard" replace />} 
            />

            {/* Admin Protected Routes */}
            <Route 
              path="/admin" 
              element={user && user.role === UserRole.ADMIN ? <AdminDashboard /> : <Navigate to="/login" replace />} 
            />

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
        
        <footer className="bg-white border-t border-slate-200 py-8">
           <div className="max-w-7xl mx-auto px-4 text-center text-slate-500 text-sm">
             <p>&copy; {new Date().getFullYear()} MobSafe. All rights reserved.</p>
           </div>
        </footer>
      </div>
    </Router>
  );
}

export default App;
    