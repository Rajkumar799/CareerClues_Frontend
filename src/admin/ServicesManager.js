import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './ServicesManager.css'; // Assuming you have some CSS for styling

const ServicesManager = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingService, setEditingService] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await api.get('/services');
      setServices(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching services:', error);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    setFormData(prev => ({
      ...prev,
      image: e.target.files[0]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append('title', formData.title);
    formDataToSend.append('description', formData.description);
    if (formData.image) {
      formDataToSend.append('image', formData.image);
    }

    try {
      if (editingService) {
        const response = await axios.put(`${process.env.REACT_APP_API_URL}/api/services/${editingService._id}`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setServices(services.map(s => s._id === editingService._id ? response.data : s));
        toast.success('Service updated successfully!');
      } else {
        const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/services`, formDataToSend, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
        setServices([...services, response.data]);
        toast.success('New service added successfully!');
      }
      resetForm();
    } catch (error) {
      console.error('Error saving service:', error);
      toast.error('Error saving service. Please try again.');
    }
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      image: null
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this service?')) {
      try {
        await api.delete(`/services/${id}`);
        fetchServices();
      } catch (error) {
        console.error('Error deleting service:', error);
        toast.error('Error deleting service. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setEditingService(null);
    setFormData({
      title: '',
      description: '',
      image: null
    });
  };

  if (loading) {
    return (
      <div className="services-loading">
        <div className="loading-spinner" />
      </div>
    );
  }

  return (
    <motion.div
      className="services-manager"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
      <motion.div
        className="services-header"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2>{editingService ? 'Edit Service' : 'Add New Service'}</h2>
        <button className="reset-btn" onClick={resetForm}>
          Cancel
        </button>
      </motion.div>

      <motion.form
        onSubmit={handleSubmit}
        className="service-form"
        encType="multipart/form-data"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="form-group">
          <label htmlFor="title">Service Title</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            accept="image/*"
            onChange={handleImageChange}
            required={!editingService}
          />
        </div>

        <button type="submit" className="submit-btn">
          {editingService ? 'Update Service' : 'Add Service'}
        </button>
      </motion.form>

      <motion.div
        className="services-list"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <h2>Existing Services</h2>
        <div className="services-grid">
          {services.map((service) => (
            <motion.div
              key={service._id}
              className="service-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <div className="service-card-header">
                <img src={`${process.env.REACT_APP_API_URL}${service.imageUrl}`} alt={service.title} style={{ width: '50px', height: '50px', objectFit: 'cover' }} />
                <h3>{service.title}</h3>
              </div>
              <p>{service.description}</p>
              <div className="service-actions">
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(service)}
                >
                  Edit
                </button>
                <button
                  className="delete-btn"
                  onClick={() => handleDelete(service._id)}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default ServicesManager;