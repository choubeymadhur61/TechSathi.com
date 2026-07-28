import React, { useState } from 'react';
import { MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const SupportTickets = () => {
  const [subject, setSubject] = useState('');
  const [address, setAddress] = useState(''); // Editable Address Box
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [gettingLocation, setGettingLocation] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  // 🌍 Reverse Geocoding Function (Coordinates to Text Address)
  const fetchReadableAddress = async (lat, lng) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );
      const data = await response.json();
      if (data && data.display_name) {
        // Human readable address set kar rahe hain jisse user edit kar sake
        setAddress(data.display_name);
      }
    } catch (err) {
      console.error("Reverse geocoding error:", err);
      // Fallback agar API slow ho
      setAddress(`GPS Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    }
  };

  // 📍 GPS Detect Handler
  const handleDetectGPS = () => {
    if (navigator.geolocation) {
      setGettingLocation(true);
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          setCoords({ lat: latitude, lng: longitude });

          // Convert coordinates to editable address text
          await fetchReadableAddress(latitude, longitude);
          setGettingLocation(false);
        },
        () => {
          alert("Unable to detect GPS. Please type your address manually.");
          setGettingLocation(false);
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });

    const payload = {
      subject,
      address, // Yeh user dwara edited / auto-filled address text hai
      lat: coords.lat,
      lng: coords.lng,
      userName: localStorage.getItem('userName'),
      userPhone: localStorage.getItem('userPhone')
    };

    try {
      const response = await fetch('/api/tickets/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        setStatus({ loading: false, success: true, error: '' });
        setSubject('');
        setAddress('');
      } else {
        throw new Error('Failed to create ticket');
      }
    } catch (err) {
      setStatus({ loading: false, success: false, error: 'Could not submit ticket.' });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl border border-gray-100 shadow-sm mt-6">
      <h3 className="text-xl font-bold text-[#003366] mb-1">Raise a Support Ticket</h3>
      <p className="text-xs text-slate-400 mb-6">Our technician will receive WhatsApp notification with your location.</p>

      {status.success && (
        <div className="mb-4 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl flex items-center gap-2 text-sm font-semibold">
          <CheckCircle2 size={18} /> Ticket submitted! Notification sent via WhatsApp.
        </div>
      )}

      {status.error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2 text-sm font-semibold">
          <AlertCircle size={18} /> {status.error}
        </div>
      )}

      <form onSubmit={handleSubmitTicket} className="space-y-4">
        {/* Issue Subject */}
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Issue Overview</label>
          <input 
            type="text" 
            placeholder="e.g. Printer Offline / Desktop Not Turning On" 
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            className="w-full p-3.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#003366]"
            required 
          />
        </div>

        {/* Address Field (Editable) + GPS Trigger */}
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Service Address / Location</label>
            <button 
              type="button" 
              onClick={handleDetectGPS}
              disabled={gettingLocation}
              className="flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600 transition-colors"
            >
              {gettingLocation ? (
                <>
                  <Loader2 size={14} className="animate-spin" /> Detecting Location...
                </>
              ) : (
                <>
                  <MapPin size={14} /> Detect My GPS
                </>
              )}
            </button>
          </div>

          <textarea 
            rows="3"
            placeholder="Type your address or click 'Detect My GPS' above..." 
            value={address}
            onChange={(e) => setAddress(e.target.value)} // Fully editable input
            className="w-full p-3.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#003366] transition-all resize-none"
            required
          />
          <p className="text-[11px] text-slate-400 mt-1">
            Tip: You can edit the auto-detected location to add house number or landmark.
          </p>
        </div>

        <button 
          type="submit" 
          disabled={status.loading}
          className="w-full bg-[#003366] hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 transition-colors shadow-md text-sm"
        >
          <Send size={16} /> {status.loading ? "Submitting..." : "Submit Ticket"}
        </button>
      </form>
    </div>
  );
};

export default SupportTickets;

// import React from 'react';
// import { LifeBuoy, Plus } from 'lucide-react';

// const SupportTickets = () => {
//   return (
//     <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl border border-gray-100 mt-6 shadow-sm">
//       <div className="flex justify-between items-center mb-6">
//         <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
//           <LifeBuoy className="text-orange-500" /> Support Tickets
//         </h2>
//         <button className="flex items-center gap-1 bg-blue-900 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-blue-950 transition-colors">
//           <Plus size={16} /> Raise Ticket
//         </button>
//       </div>
//       <p className="text-gray-400 text-sm text-center py-8">No active technical queries or support tickets found.</p>
//     </div>
//   );
// };

// export default SupportTickets;