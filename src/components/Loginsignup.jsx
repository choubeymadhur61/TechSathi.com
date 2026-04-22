import React, { useState } from 'react';
// import { User, Mail, MapPin, Phone, Lock, ArrowRight } from 'react-icons/fa';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaLock, FaArrowRight } from 'react-icons/fa';


const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true); // Toggle State
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    location: '',
    mobile: '',
    email: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!isLogin) {
      console.log("Signup Data for TechSathi:", formData);
      alert(`OTP sent to ${formData.mobile}. A confirmation mail will be sent to ${formData.email} after verification.`);
    } else {
      console.log("Login attempt for:", formData.mobile);
      alert("Requesting OTP for Login...");
    }
  };

  const bhopalAreas = ["MP Nagar", "Arera Colony", "Gulmohar", "Kolar Road", "Indrapuri", "BHEL"];

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
        
        {/* Toggle Header */}
        <div className="flex bg-slate-100 p-2 m-6 rounded-2xl">
          <button 
            onClick={() => setIsLogin(true)}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${isLogin ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-500'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setIsLogin(false)}
            className={`flex-1 py-3 rounded-xl font-bold transition-all ${!isLogin ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-500'}`}
          >
            Signup
          </button>
        </div>

        <div className="px-8 pb-10">
          <h2 className="text-2xl font-black text-[#003366] mb-2">
            {isLogin ? 'Welcome Back!' : 'Join TechSathi'}
          </h2>
          <p className="text-slate-500 mb-8 text-sm">
            {isLogin ? 'Login to track your active IT tickets.' : 'Register to get expert doorstep support in Bhopal.'}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Signup Only Fields */}
            {!isLogin && (
              <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-4">
                <div className="relative">
                  <FaUser className="absolute left-4 top-4 text-slate-300" />
                  <input 
                    name="name" type="text" placeholder="Full Name" required
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <FaPhone className="absolute left-4 top-4 text-slate-300" />
                  <input 
                    name="userName" type="text" placeholder="Desired Username" required
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                  />
                </div>
                <div className="relative">
                  <FaMapMarkerAlt className="absolute left-4 top-4 text-slate-300" />
                  <select 
                    name="location" required
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 appearance-none"
                    onChange={handleChange}
                  >
                    <option value="">Select Your Area</option>
                    {bhopalAreas.map(area => <option key={area} value={area}>{area}</option>)}
                  </select>
                </div>
                <div className="relative">
                  <FaEnvelope className="absolute left-4 top-4 text-slate-300" />
                  <input 
                    name="email" type="email" placeholder="Email Address" required
                    className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
                    onChange={handleChange}
                  />
                </div>
              </div>
            )}

            {/* Mobile Number - Used in both Login & Signup */}
            <div className="relative">
              <FaLock className="absolute left-4 top-4 text-slate-300" />
              <input 
                name="mobile" type="tel" placeholder="Mobile Number" required
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
                onChange={handleChange}
              />
            </div>

            <button 
              type="submit" 
              className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all flex items-center justify-center gap-2 mt-6 ${isLogin ? 'bg-[#003366] hover:bg-slate-800' : 'bg-orange-500 hover:bg-orange-600'}`}
            >
              {isLogin ? 'Get Login OTP' : 'Create Account'} <FaArrowRight size={18} />
            </button>
          </form>

          <p className="mt-8 text-center text-xs text-slate-400">
            By continuing, you agree to TechSathi's <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;