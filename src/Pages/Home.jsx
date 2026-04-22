import React from 'react';
import BookingForm from './BookingForm';
// Assuming your brand image is in the assets folder
import HeroImage from '../Image/TechSathi.png'; 
import { ShieldCheck, Zap, MapPin } from 'lucide-react';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-80px)] bg-slate-50">
      {/* Main Hero Section */}
      <div className="max-w-7xl mx-auto px-6 py-12 lg:py-20 grid lg:grid-cols-2 gap-16 items-center">
        
        {/* Left Column: Brand Story & Image */}
        <div className="space-y-8 animate-in fade-in slide-in-from-left duration-700">
          <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 px-4 py-2 rounded-full text-sm font-bold">
            <MapPin size={16} />
            Now Serving All of Bhopal
          </div>
          
          <h1 className="text-5xl md:text-6xl font-black text-[#003366] leading-tight">
            Tech Support that <br />
            <span className="text-orange-500">Comes to You.</span>
          </h1>
          
          <p className="text-xl text-slate-600 max-w-lg leading-relaxed">
            Don't struggle with heavy PCs or slow service centers in MP Nagar. 
            **TechSathi** brings L2/L3 expert engineers directly to your doorstep.
          </p>

          {/* Quick Trust Features */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4">
            <div className="flex items-center gap-3">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-orange-500">
                <ShieldCheck size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#003366]">Verified Sathis</h4>
                <p className="text-sm text-slate-500">Background checked experts</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="bg-white p-3 rounded-2xl shadow-sm text-orange-500">
                <Zap size={24} />
              </div>
              <div>
                <h4 className="font-bold text-[#003366]">60-Min Arrival</h4>
                <p className="text-sm text-slate-500">Fastest response in Bhopal</p>
              </div>
            </div>
          </div>

          {/* Your Brand Image */}
          <div className="hidden lg:block relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-orange-500 to-[#003366] rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
            <img 
              src={HeroImage} 
              alt="TechSathi Engineer" 
              className="relative rounded-[2rem] shadow-2xl border-4 border-white transition-transform duration-500 group-hover:scale-[1.02]"
            />
          </div>
        </div>

        {/* Right Column: Interactive Booking Form */}
        <div className="relative animate-in fade-in slide-in-from-right duration-700">
          {/* Decorative background element */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-orange-200 rounded-full blur-[120px] opacity-30"></div>
          
          <div className="relative">
            <BookingForm />
          </div>
          
          {/* Mobile-only brand image (smaller) */}
          <div className="lg:hidden mt-12">
            <img 
              src={HeroImage} 
              alt="TechSathi" 
              className="rounded-3xl shadow-xl border-2 border-white"
            />
          </div>
        </div>

      </div>

      {/* Local Social Proof Section */}
      <div className="bg-white py-12 border-y border-slate-100">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-8">
            Trusted by residents across
          </p>
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 opacity-50 font-black text-2xl text-slate-400">
            <span>ARERA COLONY</span>
            <span>MP NAGAR</span>
            <span>KOLAR ROAD</span>
            <span>INDRA PURI</span>
            <span>BAWADIYA KALAN</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;