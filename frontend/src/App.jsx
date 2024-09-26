import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Welcome from './pages/Welcome';
import Header from './components/Header';
import Footer from './components/Footer';
import Dashboard from './pages/Dashboard';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("User");

  const handleLogin = (user) => {
    setUsername(user);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsername("User");
  };

  return (
    <Router>
      <Header isLoggedIn={isLoggedIn} username={username} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Welcome onLogin={handleLogin} />} />
        {isLoggedIn && <Route path="/dashboard" element={<Dashboard username={username} />} />}
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;
