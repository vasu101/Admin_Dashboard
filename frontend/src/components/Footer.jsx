import React from 'react';
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="text-center py-3">
      <p>&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
