import React, { useState, useEffect } from 'react';
import api from '../services/api';
import { motion } from 'framer-motion';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './TestimonialsManager.css';

const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    company: '',
    content: '',
    rating: 5,
    imageUrl: ''
  });

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const response = await api.get('/testimonials');
      setTestimonials(response.data);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching testimonials:', error);
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTestimonial) {
        await api.put(`/testimonials/${editingTestimonial._id}`, formData);
        toast.success('Testimonial updated successfully!');
      } else {
        await api.post('/testimonials', formData);
        toast.success('New testimonial added successfully!');
      }
      fetchTestimonials();
      resetForm();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast.error('Error saving testimonial. Please try again.');
    }
  };

  const handleEdit = (testimonial) => {
    setEditingTestimonial(testimonial);
    setFormData({
      name: testimonial.name,
      role: testimonial.role,
      company: testimonial.company,
      content: testimonial.content,
      rating: testimonial.rating,
      imageUrl: testimonial.imageUrl
    });
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      try {
        await api.delete(`/testimonials/${id}`);
        fetchTestimonials();
      } catch (error) {
        console.error('Error deleting testimonial:', error);
        toast.error('Error deleting testimonial. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setEditingTestimonial(null);
    setFormData({
      name: '',
      role: '',
      company: '',
      content: '',
      rating: 5,
      imageUrl: ''
    });
  };

  if (loading) {
    return <div className="loading">Loading testimonials...</div>;
  }

  return (
    <motion.div
      className="testimonials-manager"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar theme="colored" />
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        {editingTestimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
      </motion.h2>
      <motion.form
        onSubmit={handleSubmit}
        className="testimonial-form"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.5 }}
      >
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Role:</label>
          <input
            type="text"
            id="role"
            name="role"
            value={formData.role}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="company">Company:</label>
          <input
            type="text"
            id="company"
            name="company"
            value={formData.company}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={formData.content}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="rating">Rating:</label>
          <input
            type="number"
            id="rating"
            name="rating"
            min="1"
            max="5"
            value={formData.rating}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="imageUrl">Image URL:</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleInputChange}
          />
        </div>
        <div className="form-actions">
          <button type="submit">
            {editingTestimonial ? 'Update Testimonial' : 'Add Testimonial'}
          </button>
          {editingTestimonial && (
            <button type="button" onClick={resetForm} className="cancel-button">
              Cancel
            </button>
          )}
        </div>
      </motion.form>

      <motion.div
        className="testimonials-grid"
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        {testimonials.map((testimonial) => (
          <motion.div
            key={testimonial._id}
            className="testimonial-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="testimonial-header">
              {testimonial.imageUrl && (
                <img
                  src={testimonial.imageUrl}
                  alt={testimonial.name}
                  className="testimonial-image"
                />
              )}
              <div className="testimonial-info">
                <h3>{testimonial.name}</h3>
                <p>{testimonial.role}</p>
                <p>{testimonial.company}</p>
              </div>
            </div>
            <div className="testimonial-content">
              <p>{testimonial.content}</p>
              <div className="rating">
                {'★'.repeat(testimonial.rating)}
                {'☆'.repeat(5 - testimonial.rating)}
              </div>
            </div>
            <div className="testimonial-actions">
              <button
                onClick={() => handleEdit(testimonial)}
                className="edit-button"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(testimonial._id)}
                className="delete-button"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default TestimonialsManager;