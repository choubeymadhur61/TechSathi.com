import React from 'react';
import { Monitor, Shield, Cpu, Wifi, Video, Globe } from 'lucide-react'; // Icons ke liye

const ServiceCard = ({ service, onBook }) => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      
      <div className="bg-orange-50 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
        {/* Yahan hum category ke hisab se icon change kar sakte hain */}
        <Monitor className="text-orange-500" /> 
      </div>
      <p className="text-xs font-bold text-gray-400 uppercase tracking-wider">{service.category}</p>
      <h3 className="text-xl font-bold text-slate-800 mt-1">{service.title}</h3>
      <p className="text-gray-500 text-sm mt-2 leading-relaxed">
        {service.description}
      </p>
      <div className="mt-6 flex justify-between items-center">
        <span className="text-orange-600 font-bold">Starts at ₹{service.price}</span>
        <button 
    onClick={onBook} // 👈 Jo prop humne Dashboard se bheja
    className="text-blue-900 font-semibold text-sm hover:underline"
>
    Book Now →
</button>
      </div>
    </div>
  );
};

export default ServiceCard;