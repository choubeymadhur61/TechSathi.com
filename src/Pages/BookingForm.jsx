import React, { useState } from 'react';
import { Monitor, HardDrive, ShieldAlert, Wifi, ArrowLeft, User, MapPin, Phone, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';

const services = [
  { label: 'OS Repair / Slow PC', icon: <Monitor /> },
  { label: 'Hardware Upgrade', icon: <HardDrive /> },
  { label: 'Virus / Security Support', icon: <ShieldAlert /> },
  { label: 'Wi-Fi / Networking', icon: <Wifi /> }
];

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({ requirement: '', name: '', location: '', mobile: '' });
  const [status, setStatus] = useState({ loading: false, success: '', error: '' });

  const update = (field, value) => setBooking((current) => ({ ...current, [field]: value }));

  const handleFinalSubmit = async (e) => {
    e.preventDefault();
    setStatus({ loading: true, success: '', error: '' });
    try {
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking)
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(data.error || 'Unable to submit your request.');
      setStatus({ loading: false, success: data.message || 'Request received. Our team will contact you.', error: '' });
      setBooking({ requirement: '', name: '', location: '', mobile: '' });
      setStep(1);
    } catch (error) {
      setStatus({ loading: false, success: '', error: error.message || 'Could not submit your request. Please try again.' });
    }
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-50 min-h-[400px] flex flex-col justify-center">
      {status.success && <div role="status" className="mb-5 p-4 rounded-xl bg-green-50 text-green-700 text-sm font-semibold flex items-center gap-2"><CheckCircle2 size={18} />{status.success}</div>}
      {status.error && <div role="alert" className="mb-5 p-4 rounded-xl bg-red-50 text-red-700 text-sm font-semibold flex items-center gap-2"><AlertCircle size={18} />{status.error}</div>}
      {step === 1 && (
        <div>
          <h3 className="text-xl font-bold text-[#003366] mb-6">How can we help your business?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {services.map((service) => (
              <button key={service.label} type="button" onClick={() => { update('requirement', service.label); setStep(2); setStatus({ loading: false, success: '', error: '' }); }} className="group flex flex-col items-start p-6 rounded-2xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all text-left">
                <div className="text-slate-400 group-hover:text-orange-500 mb-3">{service.icon}</div>
                <span className="font-bold text-slate-700 group-hover:text-[#003366]">{service.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}
      {step === 2 && (
        <div>
          <button type="button" onClick={() => setStep(1)} className="flex items-center gap-2 text-slate-400 hover:text-orange-500 mb-6"><ArrowLeft size={18} /> Change requirement</button>
          <h3 className="text-xl font-bold text-[#003366] mb-2">Request a callback</h3>
          <p className="text-slate-500 mb-6">Requirement: <span className="text-orange-500 font-semibold">{booking.requirement}</span></p>
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div className="relative"><User className="absolute left-4 top-4 text-slate-300" size={20} /><input type="text" placeholder="Full Name" maxLength={100} value={booking.name} onChange={(e) => update('name', e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-orange-500" required /></div>
            <div className="relative"><Phone className="absolute left-4 top-4 text-slate-300" size={20} /><input type="tel" inputMode="numeric" pattern="[0-9]{10}" maxLength={10} placeholder="10-digit Mobile Number" value={booking.mobile} onChange={(e) => update('mobile', e.target.value.replace(/\D/g, '').slice(0, 10))} className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-orange-500" required /></div>
            <div className="relative"><MapPin className="absolute left-4 top-4 text-slate-300" size={20} /><input type="text" placeholder="Area / Location in Bhopal" maxLength={200} value={booking.location} onChange={(e) => update('location', e.target.value)} className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border border-slate-100 focus:ring-2 focus:ring-orange-500" required /></div>
            <button type="submit" disabled={status.loading} className="w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-60 text-white font-bold py-4 rounded-xl shadow-lg transition-all mt-4 flex items-center justify-center gap-2">
              {status.loading ? <><Loader2 size={18} className="animate-spin" /> Sending...</> : 'Request a Callback'}
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingForm;
