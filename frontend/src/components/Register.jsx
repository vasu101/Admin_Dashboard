// src/components/Register.jsx
import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';
import axiosInstance from '../axiosInstance.js'; 

const Register = () => {
  const [email, setEmail] = useState(''); // Only email state
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setSuccess('');

    try {
      // Ensure the request matches your backend expectations
      const response = await axiosInstance.post('/api/auth/register', {
        email,    // Include email
        password,
      });

      setSuccess(response.data.message);

      // Clear fields after successful registration
      setEmail(''); // Clear email field
      setPassword('');

      // Clear success message after 3 seconds
      setTimeout(() => setSuccess(''), 3000);
    } catch (error) {
      // Ensure error handling is robust
      if (error.response && error.response.data) {
        setError(error.response.data.message);
      } else {
        setError('An unexpected error occurred. Please try again.');
      }

      // Clear error message after 3 seconds
      setTimeout(() => setError(''), 3000);
    }
  };

  return (
    <div className="registration-form-container">
      <h2>Register</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Group controlId="formPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Register
        </Button>
      </Form>
    </div>
  );
};

export default Register;
