import React, { useState } from 'react';
import { Monitor, HardDrive, ShieldAlert, Wifi, ArrowLeft, User, MapPin, Phone } from 'lucide-react';

const BookingForm = () => {
  const [step, setStep] = useState(1);
  const [booking, setBooking] = useState({
    issue: '',
    name: '',
    location: '',
    phone: ''
  });

  const selectIssue = (issueName) => {
    setBooking({ ...booking, issue: issueName });
    setStep(2); // Moves to the contact details form
  };

  const handleFinalSubmit = (e) => {
    e.preventDefault();
    console.log("Final Booking Data:", booking);
    alert(`TechSathi Alert: We received your request for ${booking.issue}. An engineer will contact you at ${booking.phone} shortly!`);
    // Here you would call your MERN backend API
  };

  return (
    <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-slate-50 min-h-[400px] flex flex-col justify-center">
      
      {step === 1 && (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
          <h3 className="text-xl font-bold text-[#003366] mb-6">What's the issue?</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[
              { label: 'OS Repair / Slow PC', icon: <Monitor /> },
              { label: 'Hardware Upgrade', icon: <HardDrive /> },
              { label: 'Virus Removal', icon: <ShieldAlert /> },
              { label: 'Wi-Fi / Networking', icon: <Wifi /> },
            ].map((service, index) => (
              <button 
                key={index}
                onClick={() => selectIssue(service.label)}
                className="group flex flex-col items-start p-6 rounded-2xl border-2 border-slate-100 hover:border-orange-500 hover:bg-orange-50 transition-all text-left"
              >
                <div className="text-slate-400 group-hover:text-orange-500 mb-3">
                  {service.icon}
                </div>
                <span className="font-bold text-slate-700 group-hover:text-[#003366]">
                  {service.label}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="animate-in fade-in slide-in-from-right-4 duration-400">
          <button 
            onClick={() => setStep(1)} 
            className="flex items-center gap-2 text-slate-400 hover:text-orange-500 mb-6 transition-colors"
          >
            <ArrowLeft size={18} /> <span>Change Issue</span>
          </button>

          <h3 className="text-xl font-bold text-[#003366] mb-2">Almost there!</h3>
          <p className="text-slate-500 mb-6">Selected: <span className="text-orange-500 font-semibold">{booking.issue}</span></p>
          
          <form onSubmit={handleFinalSubmit} className="space-y-4">
            <div className="relative">
              <User className="absolute left-4 top-4 text-slate-300" size={20} />
              <input 
                type="text" 
                placeholder="Full Name" 
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setBooking({...booking, name: e.target.value})}
                required 
              />
            </div>

            <div className="relative">
              <Phone className="absolute left-4 top-4 text-slate-300" size={20} />
              <input 
                type="tel" 
                placeholder="Mobile Number" 
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setBooking({...booking, phone: e.target.value})}
                required 
              />
            </div>

            <div className="relative">
              <MapPin className="absolute left-4 top-4 text-slate-300" size={20} />
              <input 
                type="text" 
                placeholder="Area in Bhopal (e.g. Arera Colony)" 
                className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
                onChange={(e) => setBooking({...booking, location: e.target.value})}
                required 
              />
            </div>

            <button 
              type="submit" 
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-4 rounded-xl shadow-lg shadow-orange-200 transition-all mt-4"
            >
              Confirm Sathi Visit
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default BookingForm;


// import React, { useState } from 'react';

// const BookingForm = () => {
//   const [step, setStep] = useState(1);
//   const [booking, setBooking] = useState({
//     name: '',
//     service: 'OS Repair',
//     location: '',
//     phone: ''
//   });

//   const bhopalAreas = ["MP Nagar", "Arera Colony", "Gulmohar", "Kolar Road", "Indrapuri", "Ayodhya Nagar"];

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     console.log("Booking Data:", booking);
//     alert(`Success! A Sathi will call you at ${booking.phone} shortly.`);
//   };

//   return (
//     <div className="bg-white rounded-3xl shadow-xl p-6 border border-slate-100">
//       <form onSubmit={handleSubmit}>
//         {step === 1 && (
//           <div className="space-y-4 animate-in fade-in duration-500">
//             <h3 className="text-lg font-bold text-[#003366]">What's the issue?</h3>
//             <div className="grid grid-cols-1 gap-3">
//               {['OS Repair / Slow PC', 'Hardware Upgrade', 'Virus Removal', 'Wi-Fi/Networking'].map((item) => (
//                 <button
//                   key={item}
//                   type="button"
//                   onClick={() => { setBooking({...booking, service: item}); setStep(2); }}
//                   className={`p-4 rounded-2xl text-left border-2 transition-all ${
//                     booking.service === item ? 'border-orange-500 bg-orange-50' : 'border-slate-100'
//                   }`}
//                 >
//                   {item}
//                 </button>
//               ))}
//             </div>
//           </div>
//         )}

//         {step === 2 && (
//           <div className="space-y-4 animate-in slide-in-from-right duration-300">
//             <h3 className="text-lg font-bold text-[#003366]">Where should we come?</h3>
//             <input 
//               type="text" 
//               placeholder="Your Full Name"
//               className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
//               onChange={(e) => setBooking({...booking, name: e.target.value})}
//               required
//             />
//             <input 
//               type="tel" 
//               placeholder="Phone Number"
//               className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
//               onChange={(e) => setBooking({...booking, phone: e.target.value})}
//               required
//             />
//             <select 
//               className="w-full p-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
//               onChange={(e) => setBooking({...booking, location: e.target.value})}
//             >
//               <option value="">Select Area in Bhopal</option>
//               {bhopalAreas.map(area => <option key={area} value={area}>{area}</option>)}
//             </select>
            
//             <div className="flex gap-2 pt-4">
//               <button onClick={() => setStep(1)} className="flex-1 p-4 rounded-xl bg-slate-100 font-bold">Back</button>
//               <button type="submit" className="flex-[2] p-4 rounded-xl bg-orange-500 text-white font-bold shadow-lg shadow-orange-200">
//                 Confirm Booking
//               </button>
//             </div>
//           </div>
//         )}
//       </form>
//     </div>
//   );
// };

// export default BookingForm;