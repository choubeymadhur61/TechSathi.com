import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookingData, setBookingData] = useState({
    deviceType: 'Laptop',
    issueDescription: '',
    preferredDate: ''
  });

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post('http://localhost:5000/api/book-service', bookingData, {
        headers: { Authorization: token } // Sending JWT for security
      });
      alert(response.data.message);
      setIsModalOpen(false);
    } catch (error) {
      alert("Booking failed. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 p-10">
      {/* ... existing sidebar and header code ... */}

      {/* Booking Trigger Card */}
      <div 
        onClick={() => setIsModalOpen(true)}
        className="p-6 bg-orange-500 text-white rounded-2xl shadow-lg cursor-pointer hover:bg-orange-600 transition-all"
      >
        <h4 className="font-bold text-lg">New Booking</h4>
        <p className="text-sm opacity-90">Schedule a visit from a TechSathi expert.</p>
      </div>

      {/* --- BOOKING MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2rem] max-w-md w-full p-8 animate-in fade-in zoom-in duration-200">
            <h2 className="text-2xl font-black text-[#003366] mb-6">Book a Service</h2>
            
            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Device Type</label>
                <select 
                  className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setBookingData({...bookingData, deviceType: e.target.value})}
                >
                  <option value="Laptop">Laptop</option>
                  <option value="Desktop">Desktop</option>
                  <option value="Networking">Networking</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Issue Description</label>
                <textarea 
                  required
                  placeholder="E.g., Laptop motherboard not turning on, or SSD upgrade needed."
                  className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500 h-32"
                  onChange={(e) => setBookingData({...bookingData, issueDescription: e.target.value})}
                ></textarea>
              </div>

              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Visit Date</label>
                <input 
                  type="date" 
                  required
                  className="w-full p-4 bg-slate-50 rounded-xl border-none focus:ring-2 focus:ring-orange-500"
                  onChange={(e) => setBookingData({...bookingData, preferredDate: e.target.value})}
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button 
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-xl font-bold"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  className="flex-1 py-4 bg-[#003366] text-white rounded-xl font-bold shadow-lg"
                >
                  Confirm Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;








// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { FaUserCircle, FaTools, FaSignOutAlt } from 'react-icons/fa';

// const Dashboard = () => {
//   const [user, setUser] = useState(null);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Check if user is logged in
//     const token = localStorage.getItem('token');
//     if (!token) {
//       navigate('/'); // Send back to login if no token
//     } else {
//       // For now, let's pretend we decoded the token or use basic info
//       // Later we will fetch real profile data from the backend
//       setUser({ name: "Madhur", location: "Bhopal" }); 
//     }
//   }, [navigate]);

//   const handleLogout = () => {
//     localStorage.removeItem('token');
//     navigate('/');
//   };

//   return (
//     <div className="min-h-screen bg-slate-50 flex">
//       {/* Sidebar */}
//       <div className="w-64 bg-[#003366] text-white p-6 hidden md:block">
//         <h1 className="text-2xl font-bold mb-10 text-orange-500">TechSathi</h1>
//         <nav className="space-y-4">
//           <div className="flex items-center gap-3 p-3 bg-blue-900 rounded-lg cursor-pointer">
//             <FaUserCircle /> <span>Profile</span>
//           </div>
//           <div className="flex items-center gap-3 p-3 hover:bg-blue-800 rounded-lg cursor-pointer">
//             <FaTools /> <span>Book a Service</span>
//           </div>
//           <div onClick={handleLogout} className="flex items-center gap-3 p-3 hover:bg-red-600 rounded-lg cursor-pointer mt-20">
//             <FaSignOutAlt /> <span>Logout</span>
//           </div>
//         </nav>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 p-10">
//         <header className="flex justify-between items-center mb-10">
//           <h2 className="text-3xl font-black text-[#003366]">User Dashboard</h2>
//           <div className="md:hidden text-[#003366] text-2xl"><FaUserCircle /></div>
//         </header>

//         <div className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100">
//           <h3 className="text-xl font-bold mb-4">Welcome back, {user?.name}!</h3>
//           <p className="text-slate-500">Your current service location: <span className="text-orange-500 font-bold">{user?.location}</span></p>
          
//           <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
//             <div className="p-6 border-2 border-dashed border-slate-200 rounded-2xl hover:border-orange-500 transition-all cursor-pointer">
//               <h4 className="font-bold text-lg">Active Tickets</h4>
//               <p className="text-sm text-slate-400">You have no active repair tickets.</p>
//             </div>
//             <div className="p-6 bg-orange-500 text-white rounded-2xl shadow-lg cursor-pointer hover:bg-orange-600">
//               <h4 className="font-bold text-lg">New Booking</h4>
//               <p className="text-sm opacity-90">Schedule a visit from a TechSathi expert.</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;