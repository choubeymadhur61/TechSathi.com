import React, { useState } from 'react';
// import { User, Mail, MapPin, Phone, Lock, ArrowRight } from 'react-icons/fa';
import { FaUser, FaEnvelope, FaMapMarkerAlt, FaPhone, FaLock, FaArrowRight } from 'react-icons/fa';

import axios from 'axios'; // Add this at the top of your file
import { useNavigate } from 'react-router-dom';


const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [showOtp, setShowOtp] = useState(false);
  const [otpValue, setOtpValue] = useState(''); // To store user input
  const [formData, setFormData] = useState({
    name: '',
    userName: '',
    location: '',
    mobile: '',
    email: ''
  });
  const navigate = useNavigate();

 const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ONLY ONE handleSubmit function
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isLogin) {
        console.log("Attempting Login for:", formData.email);
        // Correct port (5000) and correct path
        const response = await axios.post('http://localhost:5000/api/login-otp', {
          email: formData.email
        });
        alert("Signup Successful! Please check your email for the 4-digit OTP.");
        setShowOtp(true); // Show OTP input after requesting OTP
      } else {
        console.log("Sending Signup Data to Backend...");
        // Correct port (5000) and correct path
        const response = await axios.post('http://localhost:5000/api/signup', formData);

        alert(`Success! ${response.data.message}`);
        setIsLogin(true); 
        setShowOtp(true);
      }
    } catch (error) {
      console.error("Connection Error:", error);
      alert(error.response?.data?.error || "Check if your Node.js server is running on port 5000!");
    }
  };


const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/verify-otp', {
        email: formData.email,
        otp: otpValue
      });

      // 1. Save Token for security
      localStorage.setItem('token', response.data.token);
      
      // 2. IMPORTANT: Save the name specifically so Navbar can read it
      // Hamara Navbar "userName" key ko dhoond raha hai
      localStorage.setItem('userName', response.data.user.name); 

      alert("Welcome to TechSathiBhopal!");
      
      // 3. Navigate to Dashboard
      navigate('/dashboard');
      
      // 4. Force refresh taaki Navbar "userName" ko read kar le
      window.location.reload(); 
      
    } catch (error) {
      console.error("Verification Error:", error);
      alert(error.response?.data?.error || "Invalid OTP. Please try again.");
    }
  };


  const bhopalAreas = ["MP Nagar", "Arera Colony", "Gulmohar", "Kolar Road", "Indrapuri", "BHEL"];

  return (
    <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 px-6 py-12">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
        
        {/* We wrap everything in showOtp condition */}
        {showOtp ? (
          /* --- CONDITION 1: OTP VIEW (Shows when showOtp is TRUE) --- */
          <div className="p-8 animate-in fade-in zoom-in duration-300">
            <h2 className="text-2xl font-black text-[#003366] mb-2 text-center">Verify Account</h2>
            <p className="text-slate-500 mb-8 text-sm text-center">
              Enter the 4-digit code sent to <br/>
              <span className="font-bold text-orange-500">{formData.email}</span>
            </p>
            
            <form onSubmit={handleVerifyOtp} className="space-y-6">
              <input 
                type="text" 
                maxLength="4"
                placeholder="0 0 0 0"
                className="w-full text-center text-3xl tracking-[1rem] font-bold py-4 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 focus:border-orange-500 outline-none"
                onChange={(e) => setOtpValue(e.target.value)}
                required
              />
              
              <button type="submit" className="w-full py-4 bg-[#003366] text-white rounded-xl font-bold shadow-lg hover:bg-slate-800 transition-all">
                Verify & Continue
              </button>
              
              <button 
                type="button" 
                onClick={() => setShowOtp(false)}
                className="w-full text-sm text-slate-400 hover:text-orange-500 transition-colors"
              >
                Change details / Go back
              </button>
            </form>
          </div>
        ) : (
          /* --- CONDITION 2: SIGNUP/LOGIN VIEW (Shows when showOtp is FALSE) --- */
          <>
            {/* Toggle Header */}
            <div className="flex bg-slate-100 p-2 m-6 rounded-2xl">
              <button 
                onClick={() => setIsLogin(true)}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${isLogin ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-500'}`}
              >
                Login
              </button>
              <button 
                onClick={() => setIsLogin(false)}
                className={`flex-1 py-3 rounded-xl font-bold transition-all ${!isLogin ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-500'}`}
              >
                Signup
              </button>
            </div>

            <div className="px-8 pb-10">
              <h2 className="text-2xl font-black text-[#003366] mb-2">
                {isLogin ? 'Welcome Back!' : 'Join TechSathi'}
              </h2>
              <p className="text-slate-500 mb-8 text-sm">
                {isLogin ? 'Login to track your active IT tickets.' : 'Register to get expert doorstep support in Bhopal.'}
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                {!isLogin && (
                  <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-4">
                    <div className="relative">
                      <FaUser className="absolute left-4 top-4 text-slate-300" />
                      <input name="name" type="text" placeholder="Full Name" required className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} />
                    </div>
                    <div className="relative">
                      <FaPhone className="absolute left-4 top-4 text-slate-300" />
                      <input name="userName" type="text" placeholder="Desired Username" required className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} />
                    </div>
                    <div className="relative">
                      <FaMapMarkerAlt className="absolute left-4 top-4 text-slate-300" />
                      <select name="location" required className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 appearance-none" onChange={handleChange} >
                        <option value="">Select Your Area</option>
                        {bhopalAreas.map(area => <option key={area} value={area}>{area}</option>)}
                      </select>
                    </div>
                    
                    <div className="relative">
                  <FaPhone className="absolute left-4 top-4 text-slate-300" />
                  <input name="mobile" type="tel" placeholder="Mobile Number" required className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} />
                </div>
                  </div>
                )}

                <div className="relative">
                      <FaEnvelope className="absolute left-4 top-4 text-slate-300" />
                      <input name="email" type="email" placeholder="Email Address" required className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500" onChange={handleChange} />
                    </div>

                <button type="submit" className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold shadow-lg hover:bg-orange-600 transition-all flex items-center justify-center gap-2 mt-4">
                  {isLogin ? 'Get Login OTP' : 'Create Account'} <FaArrowRight />
                </button>
              </form>

              <p className="mt-8 text-center text-xs text-slate-400">
                By continuing, you agree to TechSathi's <span className="underline cursor-pointer">Terms</span> and <span className="underline cursor-pointer">Privacy Policy</span>.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );

};

export default LoginSignup;












  // return (
  //   <div className="min-h-[calc(100vh-80px)] flex items-center justify-center bg-slate-50 px-6 py-12">
  //     <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100">
        
  //       {/* Toggle Header */}
  //       <div className="flex bg-slate-100 p-2 m-6 rounded-2xl">
  //         <button 
  //           onClick={() => setIsLogin(true)}
  //           className={`flex-1 py-3 rounded-xl font-bold transition-all ${isLogin ? 'bg-[#003366] text-white shadow-lg' : 'text-slate-500'}`}
  //         >
  //           Login
  //         </button>
  //         <button 
  //           onClick={() => setIsLogin(false)}
  //           className={`flex-1 py-3 rounded-xl font-bold transition-all ${!isLogin ? 'bg-orange-500 text-white shadow-lg' : 'text-slate-500'}`}
  //         >
  //           Signup
  //         </button>
  //       </div>

  //       <div className="px-8 pb-10">
  //         <h2 className="text-2xl font-black text-[#003366] mb-2">
  //           {isLogin ? 'Welcome Back!' : 'Join TechSathi'}
  //         </h2>
  //         <p className="text-slate-500 mb-8 text-sm">
  //           {isLogin ? 'Login to track your active IT tickets.' : 'Register to get expert doorstep support in Bhopal.'}
  //         </p>

  //         <form onSubmit={handleSubmit} className="space-y-4">
            
  //           {/* Signup Only Fields */}
  //           {!isLogin && (
  //             <div className="animate-in fade-in slide-in-from-top-4 duration-300 space-y-4">
  //               <div className="relative">
  //                 <FaUser className="absolute left-4 top-4 text-slate-300" />
  //                 <input 
  //                   name="name" type="text" placeholder="Full Name" required
  //                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
  //                   onChange={handleChange}
  //                 />
  //               </div>
  //               <div className="relative">
  //                 <FaPhone className="absolute left-4 top-4 text-slate-300" />
  //                 <input 
  //                   name="userName" type="text" placeholder="Desired Username" required
  //                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
  //                   onChange={handleChange}
  //                 />
  //               </div>
  //               <div className="relative">
  //                 <FaMapMarkerAlt className="absolute left-4 top-4 text-slate-300" />
  //                 <select 
  //                   name="location" required
  //                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500 appearance-none"
  //                   onChange={handleChange}
  //                 >
  //                   <option value="">Select Your Area</option>
  //                   {bhopalAreas.map(area => <option key={area} value={area}>{area}</option>)}
  //                 </select>
  //               </div>
  //               <div className="relative">
  //                 <FaEnvelope className="absolute left-4 top-4 text-slate-300" />
  //                 <input 
  //                   name="email" type="email" placeholder="Email Address" required
  //                   className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
  //                   onChange={handleChange}
  //                 />
  //               </div>
  //             </div>
  //           )}

  //           {/* Mobile Number - Used in both Login & Signup */}
  //           <div className="relative">
  //             <FaLock className="absolute left-4 top-4 text-slate-300" />
  //             <input 
  //               name="mobile" type="tel" placeholder="Mobile Number" required
  //               className="w-full pl-12 pr-4 py-4 rounded-xl bg-slate-50 border-none focus:ring-2 focus:ring-orange-500"
  //               onChange={handleChange}
  //             />
  //           </div>
  //           <div className="animate-in fade-in zoom-in duration-300">
  //           <h2 className="text-2xl font-black text-[#003366] mb-2">Verify Mobile</h2>
  //           <p className="text-slate-500 mb-8 text-sm">
  //             Enter the 4-digit code sent to **{formData.mobile}**
  //           </p>
            
  //           <form onSubmit={handleVerifyOtp} className="space-y-6">
  //             <input 
  //               type="text" 
  //               maxLength="4"
  //               placeholder="0 0 0 0"
  //               className="w-full text-center text-3xl tracking-[1rem] font-bold py-4 rounded-xl bg-slate-50 border-2 border-dashed border-slate-200 focus:border-orange-500 outline-none"
  //               onChange={(e) => setOtpValue(e.target.value)}
  //               required
  //             />
              
  //             <button type="submit" className="w-full py-4 bg-[#003366] text-white rounded-xl font-bold shadow-lg">
  //               Verify & Continue
  //             </button>
              
  //             <button 
  //               type="button" 
  //               onClick={() => setShowOtp(false)}
  //               className="w-full text-sm text-slate-400 hover:text-orange-500 transition-colors"
  //             >
  //               Go back to edit details
  //             </button>
  //           </form>
  //         </div>

  //               <button type="submit" className="w-full py-4 bg-orange-500 text-white rounded-xl font-bold">
  //                {isLogin ? 'Get Login OTP' : 'Create Account'}
  //              </button>
  //           {/* <button 
  //             type="submit" 
  //             className={`w-full py-4 rounded-xl font-black text-white shadow-lg transition-all flex items-center justify-center gap-2 mt-6 ${isLogin ? 'bg-[#003366] hover:bg-slate-800' : 'bg-orange-500 hover:bg-orange-600'}`}
  //           >
  //             {isLogin ? 'Get Login OTP' : 'Create Account'} <FaArrowRight size={18} />
  //           </button> */}
  //         </form>

  //         <p className="mt-8 text-center text-xs text-slate-400">
  //           By continuing, you agree to TechSathi's <span className="underline">Terms</span> and <span className="underline">Privacy Policy</span>.
  //         </p>
  //       </div>
  //     </div>
  //   </div>
  // );


  //  const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://localhost:5000/api/verify-otp', {
//         email: formData.email, // Use email here to match the backend change
//         otp: otpValue
//       });
//       alert(response.data.message);
//       setShowOtp(false);
//       setIsLogin(true); // Redirect to Login after verification
//     } catch (error) {
//       alert(error.response?.data?.error || "Invalid OTP");
//     }
//   };










//   const handleVerifyOtp = async (e) => {
//     e.preventDefault();
//     try {



//       // Inside handleVerifyOtp in Loginsignup.jsx
// const response = await axios.post('http://localhost:5000/api/verify-otp', {
//   email: formData.email,
//   otp: otpValue
// });

// localStorage.setItem('token', response.data.token);
// // Save user info for the Navbar to read
// localStorage.setItem('userData', JSON.stringify(response.data.user)); 

// navigate('/dashboard');
// window.location.reload(); // Quick way to refresh Navbar state
//     //   const response = await axios.post('http://localhost:5000/api/verify-otp', {
//     //     email: formData.email,
//     //     otp: otpValue
//     //   });

//     //   // 💾 SAVE TOKEN LOCALLY
//     //   localStorage.setItem('token', response.data.token);
      

//     //   alert("Welcome to TechSathi!");
//     //   navigate('/dashboard');
//     //   setShowOtp(false);
//     //   // Now redirect them to the Dashboard!
//     // } catch (error) {
//     //   alert(error.response?.data?.error || "Invalid OTP");
//     } catch (error) {
//       alert(error.response?.data?.error || "Invalid OTP");
//     }
//   };
