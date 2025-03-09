import React from "react";

const Footer = () => {
  return (
    <footer className="bg-sky-500 text-gray-900 p-6">
      <div className="flex flex-col items-center justify-center gap-4 md:flex-row md:justify-between">
        <div className="flex space-x-4">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <i className="fab fa-github"></i>
          </a>
          <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
            <i className="fab fa-youtube"></i>
          </a>
        </div>
        <p className="text-sm text-center md:text-right">
          © 2024 SmartData AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
