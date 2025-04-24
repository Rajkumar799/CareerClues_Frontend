import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import './ContactManager.css'; // Assuming you have a CSS file for styling

const ContactManager = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/contact/admin/contacts`);
      setContacts(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch contacts');
      setLoading(false);
    }
  };

  // const handleDelete = async (id) => {
  //   try {
  //     await axios.delete(`/api/contact/${id}`);
  //     setContacts(contacts.filter(contact => contact._id !== id));
  //   } catch (err) {
  //     setError('Failed to delete contact');
  //   }
  // };

  if (loading) return <div className="text-center py-8">Loading...</div>;
  if (error) return <div className="text-red-500 text-center py-8">{error}</div>;

  return (
    <motion.div
      className="contact-manager"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <motion.div
        className="contact-header"
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        <h2>Contact Submissions</h2>
        <motion.button
          onClick={() => window.location.href = `${process.env.REACT_APP_API_URL}/api/contact/admin/contacts/export`}
          whileHover={{ scale: 1.05, boxShadow: "0 0 15px #00ffcc" }}
          whileTap={{ scale: 0.95 }}
          className="export-btn"
        >
          Export to Excel
        </motion.button>
      </motion.div>
      <div className="contact-content">
        <table className="contact-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Message</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {contacts.map(contact => (
              <motion.tr
                key={contact._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * contacts.indexOf(contact), duration: 0.5 }}
              >
                <td>{contact.name}</td>
                <td>{contact.email}</td>
                <td>{contact.phone || 'N/A'}</td>
                <td>{contact.message}</td>
                <td>{new Date(contact.createdAt).toLocaleDateString()}</td>
              </motion.tr>
            ))}
          </tbody>
        </table>
        {contacts.length === 0 && (
          <motion.div
            className="no-contacts"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            No contact form submissions yet
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default ContactManager;