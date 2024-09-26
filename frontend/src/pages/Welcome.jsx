import React, { useState } from 'react';
import { Form, Button, Alert, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom'; 
import '../styles/Welcome.css';
import axiosInstance from '../axiosInstance.js';
// import '../components/Register.jsx';

const Welcome = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState(''); // Added state for username
  const [error, setError] = useState('');
  const [showLogin, setShowLogin] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const navigate = useNavigate(); 

  const handleLoginSubmit = async (event) => {
    event.preventDefault();
    setError('');
  
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }
  
    try {
      const response = await axiosInstance.post('/api/auth/login', { email, password });
      console.log('Login successful', response.data);
      onLogin(response.data.username); // Adjust based on your response structure
      navigate('/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('Invalid email or password.');
    }
  };

  const handleRegisterSubmit = async (event) => {
  event.preventDefault();
  setError('');

  if (!username || !email || !password) {
    setError('Please enter username, email, and password.');
    return;
  }

  try {
    const response = await axiosInstance.post('/api/auth/register', { username, email, password });
    console.log('Registration successful', response.data);
    setShowRegister(false); // Hide registration form after successful registration
  } catch (error) {
    console.error('Registration error:', error);
    setError(error.response?.data?.message || 'Error registering user.');
  }
};

  return (
    <div className="welcome-container">
      <header>
        <div className="overlay">
          <h1>Welcome</h1>
          <h3>Please Log in or Register</h3>
          <div className="button-container">
          <Button className="action-button" onClick={() => setShowLogin(true)}>
            Login
          </Button>
          <Button className="action-button" onClick={() => setShowRegister(true)}>
            Register
          </Button>
          </div>
        </div>
      </header>

      {/* Login Modal */}
      <Modal show={showLogin} onHide={() => setShowLogin(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleLoginSubmit}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
        </Modal.Body>
      </Modal>

      {/* Registration Modal */}
      <Modal show={showRegister} onHide={() => setShowRegister(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Register</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleRegisterSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Register
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Welcome;
