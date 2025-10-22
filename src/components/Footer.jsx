import React from 'react'

// src/components/Footer.jsx
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-[#3f2c74] text-white py-8 px-6">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center space-y-6 sm:space-y-0">
        
        {/* Logo / Brand Name */}
        <div className="flex items-center space-x-2">
          <img src="/logo.png" alt="Survico Logo" className="h-10 w-auto object-contain" />
          <span className="text-xl font-bold">Survico</span>
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-6 text-sm">
          <Link to="/privacy-policy" className="hover:underline">Privacy Policy</Link>
          <Link to="/terms-of-use" className="hover:underline">Terms Of Use</Link>
        </div>

        {/* Contact / Support */}
        <div className="text-sm text-center sm:text-right">
          <p>Need help? <a href="mailto:support@survico.com" className="underline">support@survico.com</a></p>
          <p className="mt-1">© {new Date().getFullYear()} Survico. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
// This Footer component provides a clean and simple footer with navigation links, contact information, and a brand logo.
