import React, { useState } from 'react';
import { MapPin, Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const SupportTickets = () => {
  const [subject, setSubject] = useState('');
  const [address, setAddress] = useState('');
  const [coords, setCoords] = useState({ lat: null, lng: null });
  const [gettingLocation, setGettingLocation] = useState(false);
  const [status, setStatus] = useState({ loading: false, success: false, error: '' });

  const fetchReadableAddress = async (lat, lng) => {
    try {
      const response = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`);
      if (!response.ok) throw new Error('Address lookup failed');
      const data = await response.json();
      if (data?.display_name) setAddress(data.display_name);
      else setAddress(`GPS Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    } catch {
      setAddress(`GPS Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`);
    }
  };

  const handleDetectGPS = () => {
    if (!navigator.geolocation) {
      setStatus({ loading: false, success: false, error: 'Geolocation is not supported by this browser. Please enter your address.' });
      return;
    }
    setGettingLocation(true);
    navigator.geolocation.getCurrentPosition(
      async ({ coords: position }) => {
        setCoords({ lat: position.latitude, lng: position.longitude });
        await fetchReadableAddress(position.latitude, position.longitude);
        setGettingLocation(false);
      },
      () => {
        setGettingLocation(false);
        setStatus({ loading: false, success: false, error: 'Unable to detect GPS. Please enter your address manually.' });
      },
      { enableHighAccuracy: false, timeout: 10000, maximumAge: 60000 }
    );
  };

  const handleSubmitTicket = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: false, error: '' });
    const payload = {
      subject: subject.trim(),
      address: address.trim(),
      lat: coords.lat,
      lng: coords.lng,
      userName: localStorage.getItem('userName') || '',
      userPhone: localStorage.getItem('userMobile') || localStorage.getItem('userPhone') || ''
    };

    try {
      const response = await fetch('/api/tickets/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to submit support request.');
      setStatus({ loading: false, success: true, error: '' });
      setSubject('');
      setAddress('');
      setCoords({ lat: null, lng: null });
    } catch (err) {
      setStatus({ loading: false, success: false, error: err.message || 'Could not submit support request.' });
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl border border-gray-100 shadow-sm mt-6">
      <h3 className="text-xl font-bold text-[#003366] mb-1">Raise a Support Request</h3>
      <p className="text-xs text-slate-400 mb-6">Share the issue and service location. Our team will contact you to coordinate support.</p>
      {status.success && <div className="mb-4 p-4 bg-green-50 border border-green-100 text-green-700 rounded-xl flex items-center gap-2 text-sm font-semibold"><CheckCircle2 size={18} /> Request received. Our team will contact you shortly.</div>}
      {status.error && <div role="alert" className="mb-4 p-4 bg-red-50 border border-red-100 text-red-600 rounded-xl flex items-center gap-2 text-sm font-semibold"><AlertCircle size={18} /> {status.error}</div>}
      <form onSubmit={handleSubmitTicket} className="space-y-4">
        <div>
          <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Issue Overview</label>
          <input type="text" maxLength={300} placeholder="e.g. Printer offline / Desktop not turning on" value={subject} onChange={(e) => setSubject(e.target.value)} className="w-full p-3.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#003366]" required />
        </div>
        <div>
          <div className="flex justify-between items-center mb-1">
            <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider">Service Address / Location</label>
            <button type="button" onClick={handleDetectGPS} disabled={gettingLocation} className="flex items-center gap-1 text-xs font-bold text-orange-500 hover:text-orange-600">
              {gettingLocation ? <><Loader2 size={14} className="animate-spin" /> Detecting...</> : <><MapPin size={14} /> Detect GPS</>}
            </button>
          </div>
          <textarea rows="3" maxLength={500} placeholder="Enter your address or detect GPS location..." value={address} onChange={(e) => setAddress(e.target.value)} className="w-full p-3.5 border border-slate-200 rounded-xl text-sm outline-none focus:border-[#003366] resize-none" required />
        </div>
        <p className="text-xs text-slate-500">A verified account with a registered mobile number is required to submit a support request.</p>
        <button type="submit" disabled={status.loading} className="w-full bg-[#003366] hover:bg-slate-800 text-white py-3.5 rounded-xl font-bold flex items-center justify-center gap-2 disabled:opacity-60">
          <Send size={16} /> {status.loading ? 'Submitting...' : 'Submit Request'}
        </button>
      </form>
    </div>
  );
};

export default SupportTickets;
