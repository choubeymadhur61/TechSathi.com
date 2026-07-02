import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from "./Pages/Home"
import Services from './components/Services';
import About from './components/About';
import Footer from './Pages/Footer';
import LoginSignup from './components/Loginsignup';
import Dashboard from './components/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Cart from './components/Cart';
import { useState, useEffect } from 'react';

// import Footer from "./Pages/Footer"

function App() {

  const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('techsathi_cart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  return (
    <Router>
      <div className="min-h-screen bg-slate-50">
        <Navbar cartCount={cart.length} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<Services/>} />
          <Route path="/dashboard" element={<ProtectedRoute> <Dashboard cart={cart} setCart={setCart} /> </ProtectedRoute>  } />
          <Route path="/about" element={<About />} />
          <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} /> 
          {/* <Route path="/cart" element={<div className="p-10 text-center text-2xl">Your Service Cart</div>} /> */}
          <Route path="/login" element={<LoginSignup />} />
        </Routes>
      </div>
      <div className="mt-12 px-6 pb-10 text-center"> <Footer /> </div>
    </Router>
  );
}

export default App;






// import React, { useState } from 'react';
// import { Phone, CheckCircle, Clock } from 'lucide-react';

// import BookingForm from './Pages/BookingForm';

// const App = () => {
//   return (
//     <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
//       {/* Header / Brand */}
//       <header className="bg-white px-6 py-4 shadow-sm flex justify-between items-center sticky top-0 z-50">
//         <div className="flex items-center gap-2">
//           <div className="bg-[#003366] p-2 rounded-lg text-white">
//             <span className="font-bold text-xl">TS</span>
//           </div>
//           <h1 className="text-2xl font-bold text-[#003366]">TechSathi</h1>
//         </div>
//         <button className="bg-orange-500 text-white p-2 rounded-full shadow-lg">
//           <Phone size={20} />
//         </button>
//       </header>

//       {/* Hero Section */}
//       <section className="px-6 py-10 bg-gradient-to-b from-white to-slate-50 text-center">
//         <h2 className="text-3xl font-extrabold text-[#003366] leading-tight">
//           Bhopal’s Most Trusted <br/><span className="text-orange-500">Doorstep IT Support</span>
//         </h2>
//         <p className="mt-4 text-slate-600">Expert engineers at your home within 60 minutes.</p>
        
//         <div className="mt-8 grid grid-cols-2 gap-4 text-sm font-medium">
//           <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
//             <Clock className="text-orange-500" size={18} /> No Waiting Time
//           </div>
//           <div className="flex items-center gap-2 bg-white p-3 rounded-xl shadow-sm border border-slate-100">
//             <CheckCircle className="text-orange-500" size={18} /> Verified Sathis
//           </div>
//         </div>
//       </section>

//       {/* Booking Component */}
//       <main className="px-6 -mt-6">
//         <BookingForm />
//       </main>

//       {/* Trust Badges */}
//       <footer className="mt-12 px-6 pb-10 text-center">
//         <p className="text-xs text-slate-400 uppercase tracking-widest">Proudly Serving Bhopal</p>
//         <div className="mt-4 flex justify-center gap-6 grayscale opacity-60">
//           <span className="font-bold">MP Nagar</span>
//           <span className="font-bold">Arera Colony</span>
//           <span className="font-bold">Kolar</span>
//         </div>
//       </footer>
//     </div>
//   );
// };

// export default App;











// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from './assets/vite.svg'
// import heroImg from './assets/hero.png'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <section id="center">
//         <div className="hero">
//           <img src={heroImg} className="base" width="170" height="179" alt="" />
//           <img src={reactLogo} className="framework" alt="React logo" />
//           <img src={viteLogo} className="vite" alt="Vite logo" />
//         </div>
//         <div>
//           <h1>Get started</h1>
//           <p>
//             Edit <code>src/App.jsx</code> and save to test <code>HMR</code>
//           </p>
//         </div>
//         <button
//           className="counter"
//           onClick={() => setCount((count) => count + 1)}
//         >
//           Count is {count}
//         </button>
//       </section>

//       <div className="ticks"></div>

//       <section id="next-steps">
//         <div id="docs">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#documentation-icon"></use>
//           </svg>
//           <h2>Documentation</h2>
//           <p>Your questions, answered</p>
//           <ul>
//             <li>
//               <a href="https://vite.dev/" target="_blank">
//                 <img className="logo" src={viteLogo} alt="" />
//                 Explore Vite
//               </a>
//             </li>
//             <li>
//               <a href="https://react.dev/" target="_blank">
//                 <img className="button-icon" src={reactLogo} alt="" />
//                 Learn more
//               </a>
//             </li>
//           </ul>
//         </div>
//         <div id="social">
//           <svg className="icon" role="presentation" aria-hidden="true">
//             <use href="/icons.svg#social-icon"></use>
//           </svg>
//           <h2>Connect with us</h2>
//           <p>Join the Vite community</p>
//           <ul>
//             <li>
//               <a href="https://github.com/vitejs/vite" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#github-icon"></use>
//                 </svg>
//                 GitHub
//               </a>
//             </li>
//             <li>
//               <a href="https://chat.vite.dev/" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#discord-icon"></use>
//                 </svg>
//                 Discord
//               </a>
//             </li>
//             <li>
//               <a href="https://x.com/vite_js" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#x-icon"></use>
//                 </svg>
//                 X.com
//               </a>
//             </li>
//             <li>
//               <a href="https://bsky.app/profile/vite.dev" target="_blank">
//                 <svg
//                   className="button-icon"
//                   role="presentation"
//                   aria-hidden="true"
//                 >
//                   <use href="/icons.svg#bluesky-icon"></use>
//                 </svg>
//                 Bluesky
//               </a>
//             </li>
//           </ul>
//         </div>
//       </section>

//       <div className="ticks"></div>
//       <section id="spacer"></section>
//     </>
//   )
// }

// export default App
