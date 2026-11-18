import React, { useState } from 'react';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaArrowRight } from 'react-icons/fa';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [otpValue, setOtpValue] = useState('');
  const [formData, setFormData] = useState({
    name: '', userName: '', location: '', mobile: '', email: ''
  });
  const navigate = useNavigate();

  const handleChange = (e) => setFormData((current) => ({
    ...current, [e.target.name]: e.target.value
  }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = isLogin
        ? await axios.post('/api/login-otp', { email: formData.email })
        : await axios.post('/api/signup', formData);

      alert(response.data.message);
      setOtpValue('');
      setShowOtp(true);
    } catch (error) {
      alert(error.response?.data?.error || 'Unable to contact TechSathiBhopal. Please try again later.');
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/verify-otp', {
        email: formData.email,
        otp: otpValue
      });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('userName', response.data.user.name);
      localStorage.setItem('userLocation', response.data.user.location);
      localStorage.setItem('email', response.data.user.email);
      if (response.data.user.mobile) {
        localStorage.setItem('userMobile', response.data.user.mobile);
      }
      navigate('/dashboard');
    } catch (error) {
      alert(error.response?.data?.error || 'Invalid or expired verification code.');
    }
  };

  const bhopalAreas = ['MP Nagar', 'Arera Colony', 'Gulmohar', 'Kolar Road', 'Indrapuri', 'BHEL'];

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
        {showOtp ? (
          <div className="p-8">
            <h2 className="text-2xl font-black text-[#003366] mb-2 text-center">Verify Account</h2>
            <p className="text-slate-500 mb-8 text-sm text-center">
              Enter the 6-digit code sent to <span className="font-bold text-orange-500">{formData.email}</span>
            </p>
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <input
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                pattern="[0-9]{6}"
                maxLength={6}
                value={otpValue}
                placeholder="000000"
                aria-label="6-digit verification code"
                className="w-full text-center text-3xl tracking-[0.6rem] font-bold py-4 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 focus:border-orange-500 outline-none"
                onChange={(e) => setOtpValue(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
              />
              <button type="submit" disabled={otpValue.length !== 6} className="w-full py-4 bg-[#003366] text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all disabled:opacity-50">
                Verify & Continue
              </button>
              <button type="button" onClick={() => setShowOtp(false)} className="w-full text-sm text-slate-400 hover:text-orange-500">
                Change details / Go back
              </button>
            </form>
          </div>
        ) : (
          <>
            <div className="flex bg-slate-100 p-2 m-6 rounded-2xl">
              <button type="button" onClick={() => setIsLogin(true)} className={`flex-1 py-3 rounded-xl font-bold transition-all ${isLogin ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-500'}`}>Login</button>
              <button type="button" onClick={() => setIsLogin(false)} className={`flex-1 py-3 rounded-xl font-bold transition-all ${!isLogin ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-500'}`}>Signup</button>
            </div>
            <div className="px-8 pb-10">
              <h2 className="text-2xl font-black text-[#003366] mb-2">{isLogin ? 'Welcome Back!' : 'Join TechSathiBhopal'}</h2>
              <p className="text-slate-500 mb-8 text-sm">{isLogin ? 'Login to track your support requests.' : 'Create an account to request and track IT support.'}</p>
              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="space-y-4">
                    <div className="relative"><FaUser className="absolute left-4 top-4 text-slate-300" /><input name="name" type="text" placeholder="Full Name" value={formData.name} required maxLength={100} className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-500" onChange={handleChange} /></div>
                    <div className="relative"><FaUser className="absolute left-4 top-4 text-slate-300" /><input name="userName" type="text" placeholder="Desired Username" value={formData.userName} required maxLength={40} className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-500" onChange={handleChange} /></div>
                    <div className="relative"><FaMapMarkerAlt className="absolute left-4 top-4 text-slate-300" /><select name="location" value={formData.location} required className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-500" onChange={handleChange}><option value="">Select Your Area</option>{bhopalAreas.map((area) => <option key={area} value={area}>{area}</option>)}</select></div>
                    <div className="relative"><FaPhone className="absolute left-4 top-4 text-slate-300" /><input name="mobile" type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} placeholder="10-digit Mobile Number" value={formData.mobile} required className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-500" onChange={handleChange} /></div>
                  </div>
                )}
                <div className="relative"><FaEnvelope className="absolute left-4 top-4 text-slate-300" /><input name="email" type="email" placeholder="Email Address" value={formData.email} required maxLength={254} className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 focus:ring-2 focus:ring-orange-500" onChange={handleChange} /></div>
                <button type="submit" className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 mt-4">
                  {isLogin ? 'Get Login OTP' : 'Create Account'} <FaArrowRight />
                </button>
              </form>
              <p className="mt-8 text-center text-xs text-slate-400">By continuing, you agree to TechSathiBhopal's Terms and Privacy Policy.</p>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
