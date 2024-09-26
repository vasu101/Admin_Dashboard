import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ isLoggedIn, username, onLogout }) => {
  return (
    <header className="header">
      <div className="logo">Logo</div>
      <nav>
        <Link to="/" className="nav-item">Home</Link>
        <input type="text" placeholder="Search..." className="search" />
      </nav>
      {isLoggedIn && (
        <div className="user-info">
          <span>{username}</span>
          <button onClick={onLogout} className="logout-button">Logout</button>
        </div>
      )}
    </header>
  );
};

export default Header;
