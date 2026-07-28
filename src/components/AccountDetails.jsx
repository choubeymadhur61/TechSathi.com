import React, { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Loader2 } from 'lucide-react';

const AccountDetails = () => {
  const [userData, setUserData] = useState({
    name: '',
    email: '',
    mobile: '',
    location: '',
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. LocalStorage se registration data fetch karne ka try karein
    const savedName = localStorage.getItem('userName');
    const savedEmail = localStorage.getItem('email') ; 
    const savedPhone = localStorage.getItem('mobile') ; 
    const savedLocation = localStorage.getItem('userLocation') ; 

    if (savedName) {
      setUserData(prev => ({
        ...prev,
        name: savedName,
        email: savedEmail,
        mobile: savedPhone,
        location: savedLocation,
      }));
    }
    
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="animate-spin text-orange-500" size={32} />
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl border border-gray-100 mt-6 shadow-sm animate-in fade-in duration-300">
      <h2 className="text-2xl font-bold text-slate-800 mb-2 flex items-center gap-2">
        <User className="text-[#003366]" /> Account Details
      </h2>
      <p className="text-sm text-gray-400 mb-6">Your official profile metrics registered with TechSathiBhopal.</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 1. Full Name */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Registered Full Name</label>
          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-[#003366] font-bold text-sm">
            <User size={18} className="text-slate-400" />
            {userData.name || "Guest User"}
          </div>
        </div>

        {/* 2. Email */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Email Address</label>
          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-sm font-medium">
            <Mail size={18} className="text-slate-400" />
            {userData.email}
          </div>
        </div>

        {/* 3. Phone */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Contact Number</label>
          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-sm font-medium">
            <Phone size={18} className="text-slate-400" />
            {userData.phone}
          </div>
        </div>

        {/* 4. Location */}
        <div>
          <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">Base Location</label>
          <div className="flex items-center gap-3 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-slate-600 text-sm font-medium">
            <MapPin size={18} className="text-slate-400" />
            {userData.location}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountDetails;