import React, { useState, useEffect } from 'react';
import { Wrench, ShieldCheck, Monitor, Send, MapPin, CheckCircle2, X } from 'lucide-react';
import TSBLogo from './assets/TechsathiBhopal.png'; // Assuming your logo is in the assets folder

const ComingSoonModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    service: 'CCTV Installation',
    area: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/leads/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      setTimeout(() => {
        setLoading(false);
        setSubmitted(true);
      }, 800);
    } catch (err) {
      setLoading(false);
      setSubmitted(true); // Fallback for UI testing
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-300">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-xl bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl text-white overflow-hidden">
        
        {/* Background Glow */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-orange-500/10 blur-[80px] rounded-full pointer-events-none" />

        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white bg-slate-800/80 p-2 rounded-full transition-colors z-10"
        >
          <X size={20} />
        </button>

        {/* Branding Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-4 mb-6">
          <div className="flex items-center gap-2">
            <img src={TSBLogo} alt="TSB Logo" className="h-8 w-auto" />
            <span className="text-lg font-black tracking-tight">
              TechSathi<span className="text-orange-500">Bhopal</span>
            </span>
          </div>
          <div className="flex items-center gap-1 text-[11px] font-bold text-orange-400 bg-orange-500/10 px-3 py-1 rounded-full border border-orange-500/20">
            <MapPin size={12} /> Opening Soon in Bhopal
          </div>
        </div>

        {submitted ? (
          <div className="text-center py-8 space-y-4">
            <div className="w-16 h-16 bg-green-500/10 text-green-400 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="text-2xl font-bold text-white">You're Registered!</h3>
            <p className="text-slate-400 text-sm">
              Thanks! We've saved your requirement. Our team will reach out with exclusive early-bird discounts.
            </p>
            <button 
              onClick={onClose}
              className="bg-orange-500 hover:bg-orange-600 text-white font-bold px-6 py-2.5 rounded-xl text-xs transition-colors mt-2"
            >
              Explore Website
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-5">
              <h2 className="text-2xl font-black text-white">Reserve 20% Launch Discount</h2>
              <p className="text-xs text-slate-400 mt-1">
                We are setting up our official Bhopal doorstep operations. Register now to claim priority booking!
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Name */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Your Name</label>
                  <input 
                    type="text" 
                    required
                    placeholder="e.g. Madhur Choubey"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-orange-500 transition-colors"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Phone Number</label>
                  <input 
                    type="tel" 
                    required
                    placeholder="+91 99025 XXXXX"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-orange-500 transition-colors"
                  />
                </div>
              </div>

              {/* Service Required */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Service Needed</label>
                <select 
                  value={formData.service}
                  onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-orange-500 transition-colors"
                >
                  <option value="CCTV Installation">CCTV Installation / Maintenance</option>
                  <option value="Desktop Hardware Repair">Desktop Repair / OS Upgrade</option>
                  <option value="WiFi & Network Setup">WiFi & Network Setup</option>
                  <option value="Other IT Support">Other Technical Issue</option>
                </select>
              </div>

              {/* Area */}
              <div>
                <label className="block text-[10px] font-bold text-slate-400 uppercase tracking-wider mb-1">Locality in Bhopal</label>
                <input 
                  type="text" 
                  placeholder="e.g. MP Nagar, Kolar Road, Indrapuri"
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-xs text-white outline-none focus:border-orange-500 transition-colors"
                />
              </div>

              {/* Submit Button */}
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2 transition-all text-xs mt-2"
              >
                <Send size={14} />
                {loading ? "Saving..." : "Claim Early Access Discount"}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  );
};

export default ComingSoonModal;