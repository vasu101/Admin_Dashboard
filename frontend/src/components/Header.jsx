import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.css';

const Header = ({ isLoggedIn, username, onLogout, handleSearch }) => {
  return (
    <header className="header">
      <div className="logo">Logo</div>
      <nav>
        <Link to="/" className="nav-item">Home</Link>
        
      </nav>
      {isLoggedIn && (
        <div className="user-info">
          <span>{username}</span>
          {showSearch && ( 
            <input 
              type="text" 
              placeholder="Search..." 
              className="search" 
              onChange={(e) => handleSearch(e.target.value)}
            />
          )}
          <button onClick={onLogout} className="logout-button"><Link to="/" className="nav-item">Log Out</Link></button>
        </div>
      )}
    </header>
  );
};

export default Header;
