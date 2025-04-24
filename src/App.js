import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';


function App() {
  const [token, setToken] = useState(localStorage.getItem('token') || '');

  // PrivateRoute logic moved to a render function
  const PrivateRoute = ({ element: Component }) => {
    return token ? <Component /> : <Navigate to="/admin/login" />;
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/login" element={<AdminLogin setToken={setToken} />} />
        <Route path="/admin" element={<PrivateRoute element={AdminDashboard} />} />
      </Routes>
    </Router>
  );
}

export default App;