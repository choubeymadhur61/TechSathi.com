import React, { useState, useEffect, useRef } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, ChevronDown, Calendar, CreditCard, Settings, LogOut, LifeBuoy } from 'lucide-react';
import TSBLogo from '../assets/TechsathiBhopal.png';

const Navbar = ({ cartCount }) => {
  const [user, setUser] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const activeStyle = "text-orange-500 font-bold border-b-2 border-orange-500 pb-1";
  const idleStyle = "hover:text-orange-500 transition-colors";

  useEffect(() => {
    const savedUser = localStorage.getItem('userName');
    if (savedUser) {
      setUser(savedUser);
    }

    // Dropdown ke bahar click karne par menu close karne ke liye handler
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setIsDropdownOpen(false);
    navigate('/');
    window.location.reload();
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* 1. LEFT: Logo */}
        <Link to={user ? "/dashboard" : "/"} className="flex items-center gap-2 group">
          <img src={TSBLogo} alt="TSB Logo" className="h-12 w-auto hover:scale-105 transition-transform" />
          <h1 className="text-xl font-black text-[#003366] tracking-tight">
            TechSathi<span className="text-orange-500">Bhopal</span>
          </h1>
        </Link>

        {/* 2. MIDDLE: Nav Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          {user ? (
            <NavLink to="/dashboard" className={({ isActive }) => isActive ? activeStyle : idleStyle}>Dashboard</NavLink>
          ) : (
            <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : idleStyle}>Home</NavLink>
          )}
          <NavLink to="/services" className={({ isActive }) => isActive ? activeStyle : idleStyle}>Services</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? activeStyle : idleStyle}>About</NavLink>
        </div>

        {/* 3. RIGHT: Cart & Profile Menu */}
        <div className="flex items-center gap-4">

          {/* Cart Icon */}
          <Link to="/cart" className="relative p-2 hover:bg-slate-50 rounded-full transition-all flex items-center justify-center">
            <ShoppingCart size={22} className="text-slate-600 hover:scale-110 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white animate-pulse">
                {cartCount}
              </span>
            )}
          </Link>

          {/* Auth/Profile Section */}
          <div className="border-l pl-4 relative" ref={dropdownRef}>
            {user ? (
              /* --- LOGGED IN: Professional Dropdown Trigger --- */
              <div>
                <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="flex items-center gap-2 bg-slate-50 px-4 py-2 rounded-full border border-slate-200 hover:bg-slate-100 transition-all select-none"
                >
                  <User size={18} className="text-[#003366]" />
                  <span className="font-bold text-sm text-[#003366] max-w-[120px] truncate">{user}</span>
                  <ChevronDown size={14} className={`text-slate-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`} />
                </button>

                {/* --- DROPDOWN MENU PANEL --- */}
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white rounded-2xl shadow-xl border border-slate-100 py-2 z-50 animate-in fade-in slide-in-from-top-3 duration-200">
                    <div className="px-4 py-2 border-b border-slate-50 mb-1">
                      <p className="text-xs text-slate-400 font-medium">Logged in as</p>
                      <p className="text-sm font-black text-[#003366] truncate">{user}</p>
                    </div>

                    <button onClick={() => { navigate('/profile'); setIsDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 font-medium transition-all">
                      <Settings size={16} className="text-slate-400" /> Account Details
                    </button>

                    <button onClick={() => { navigate('/bookings'); setIsDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 font-medium transition-all">
                      <Calendar size={16} className="text-slate-400" /> My Bookings
                    </button>

                    <button onClick={() => { navigate('/payments'); setIsDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 font-medium transition-all">
                      <CreditCard size={16} className="text-slate-400" /> Payment History
                    </button>

                    <button onClick={() => { navigate('/support'); setIsDropdownOpen(false); }} className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-slate-600 hover:bg-slate-50 font-medium transition-all">
                      <LifeBuoy size={16} className="text-slate-400" /> Support Tickets
                    </button>

                    <div className="border-t border-slate-100 mt-2 pt-1">
                      <button 
                        onClick={handleLogout}
                        className="w-full flex items-center gap-3 px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 font-bold transition-all"
                      >
                        <LogOut size={16} /> Logout
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* --- LOGGED OUT: Show Login Button --- */
              <Link 
                to="/login" 
                className="flex items-center gap-2 bg-[#003366] text-white px-6 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-md font-bold text-sm"
              >
                Login
              </Link>
            )}
          </div>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;


