// src/components/Navbar.jsx
import { useState } from 'react';
import { Link } from 'react-router-dom';

import {
  ListChecks,
} from 'lucide-react';



export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

     const navItems = [
        { label: 'Survey', icon: <ListChecks size={20} />, path: '/' },
      ];
    

    return (
        <nav className="bg-[#140932] shadow-md px-3 py-2 fixed top-0 left-0 w-full z-30 p-10">
            <div className="max-w-7xl mx-auto flex justify-between items-center ">

                {/* Logo */}
                <div className="flex items-center space-x-3">
                    {navItems.map((item) => {
                              const isActive = location.pathname === item.path;
                              return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`flex items-center space-x-2 text-white font-semibold ${
                                        isActive ? 'text-blue-600' : 'text-gray-300'
                                    } hover:text-blue-800 transition duration-200`}
                                >
                                  {item.icon}
                                  <span>Survico</span>
                                </Link>
                              );
                            })}
                </div>

                {/* Desktop Nav Links */}
                <div className="hidden md:flex items-center space-x-8 text-white font-medium">
                    <Link to="/" className="hover:text-blue-800">Home</Link>
                    <Link to="/about" className="hover:text-blue-800">About</Link>
                    <Link to="/opportunities" className="hover:text-blue-800">Opportunities</Link>
                    <Link to="/referral" className="hover:text-blue-800">Referral</Link>
                </div>

                <div className='hidden md:flex items-center space-x-4 text-white font-medium'>
                    <Link to="/signup" className="hover:text-blue-800">Sign Up</Link>
                    <Link to="/login" className="hover:text-blue-800">Login</Link>
                </div>

                {/* Hamburger button */}
                <button
                    className="md:hidden text-white focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        {menuOpen ? (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        ) : (
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        )}
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {menuOpen && (
                <div className="md:hidden mt-3 flex flex-col space-y-2 text-white font-medium px-4">
                    <Link to="/" onClick={() => setMenuOpen(false)}>Home</Link>
                    <Link to="/about" onClick={() => setMenuOpen(false)}>About</Link>
                    <Link to="/opportunities" onClick={() => setMenuOpen(false)}>Opportunities</Link>
                    <Link to="/referral" onClick={() => setMenuOpen(false)}>Referral</Link>
                    <Link to="/signup" onClick={() => setMenuOpen(false)}>Sign Up</Link>
                    <Link to="/login" onClick={() => setMenuOpen(false)}>Login</Link>
                </div>
            )}
        </nav>
    );
}
