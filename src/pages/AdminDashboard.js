import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../services/api';
import ServicesManager from '../admin/ServicesManager';
import TestimonialsManager from '../admin/TestimonialsManager';
import GalleryManager from '../admin/GalleryManager';
import ContactManager from '../admin/ContactManager';
import './AdminDashboard.css';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('services');
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const token = localStorage.getItem('token');
      console.log('Token from localStorage:', token); // Debug token
      if (!token) {
        toast.error('No token found. Please log in.');
        navigate('/admin/login');
        return;
      }

      try {
        const response = await api.get('/auth/me', {
          headers: { Authorization: `Bearer ${token}` }, // Ensure token is sent
        });
        console.log('Auth Response:', response.data); // Debug user data
        setUser(response.data);
        toast.success(`Welcome ${response.data.name}!`);
      } catch (error) {
        console.error('Auth Error:', error.response?.data || error.message);
        localStorage.removeItem('token');
        toast.error('Session expired or invalid. Please log in again.');
        navigate('/admin/login');
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null); // Clear user state
    toast.info('Logged out successfully!');
    navigate('/admin/login');
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'services':
        return <ServicesManager />;
      case 'testimonials':
        return <TestimonialsManager />;
      case 'gallery':
        return <GalleryManager />;
      case 'contact':
        return <ContactManager />;
      default:
        return <ServicesManager />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  console.log('Menu Open:', menuOpen); // Debug log
  console.log('User:', user); // Debug user state

  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />

      {/* Responsive Admin Header */}
      <header className="admin-header">
        <div
          className="admin-logo"
          onClick={() => navigate('/admin')}
          style={{ cursor: 'pointer' }}
        >
          Admin Dashboard
        </div>
        <button
          className={`admin-mobile-menu-toggle ${menuOpen ? 'admin-open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className="admin-hamburger"></span>
        </button>
        <nav className={`admin-nav-menu ${menuOpen ? 'admin-open' : ''}`}>
          <button
            onClick={() => { setActiveTab('services'); setMenuOpen(false); }}
            className={`admin-nav-link ${activeTab === 'services' ? 'admin-active' : ''}`}
          >
            Services
          </button>
          <button
            onClick={() => { setActiveTab('testimonials'); setMenuOpen(false); }}
            className={`admin-nav-link ${activeTab === 'testimonials' ? 'admin-active' : ''}`}
          >
            Testimonials
          </button>
          <button
            onClick={() => { setActiveTab('contact'); setMenuOpen(false); }}
            className={`admin-nav-link ${activeTab === 'contact' ? 'admin-active' : ''}`}
          >
            Contact
          </button>
          <button
            onClick={() => { setActiveTab('gallery'); setMenuOpen(false); }}
            className={`admin-nav-link ${activeTab === 'gallery' ? 'admin-active' : ''}`}
          >
            Gallery
          </button>
          <button
            onClick={() => { handleLogout(); setMenuOpen(false); }}
            className="admin-nav-link admin-logout"
          >
            Logout
          </button>
          <span className="admin-nav-user">Welcome, {user?.name || 'Admin'}</span>
        </nav>
      </header>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mt-6 bg-white rounded-md shadow p-4 sm:p-6">
          {renderContent()}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;