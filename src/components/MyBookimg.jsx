import React from 'react';
import { Calendar, CheckCircle, Clock } from 'lucide-react';

const MyBookings = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl border border-gray-100 mt-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <Calendar className="text-orange-500" /> My Bookings
      </h2>
      {/* Sample Active Booking Card */}
      <div className="border border-gray-100 rounded-xl p-4 bg-gray-50 flex justify-between items-center mb-4">
        <div>
          <h4 className="font-bold text-slate-800 text-lg">CCTV Installation Service</h4>
          <p className="text-gray-500 text-sm mt-1">Scheduled Date: 22nd July 2026</p>
        </div>
        <span className="flex items-center gap-1 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wide">
          <Clock size={14} /> Assigned
        </span>
      </div>
    </div>
  );
};

export default MyBookings;