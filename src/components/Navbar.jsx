import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { FaUserCircle, FaSignOutAlt } from 'react-icons/fa';
import TSBLogo from '../assets/TechsathiBhopal.png';

const Navbar = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const activeStyle = "text-orange-500 font-bold border-b-2 border-orange-500 pb-1";
  const idleStyle = "hover:text-orange-500 transition-colors";

  useEffect(() => {
    // LocalStorage se user ka naam check karein
    const savedUser = localStorage.getItem('userName');
    if (savedUser) {
      setUser(savedUser);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear(); // Token aur Name delete karein
    setUser(null);
    navigate('/'); // Logout ke baad home par le jayein
    window.location.reload(); // State reset karne ke liye
  };

  return (
    <nav className="bg-white border-b sticky top-0 z-50 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* 1. LEFT: Logo aur Brand Name */}
        <Link to="/" className="flex items-center gap-2 group">
          <img src={TSBLogo} alt="TSB Logo" className="h-12 w-auto hover:scale-105 transition-transform" />
          <h1 className="text-xl font-black text-[#003366] tracking-tight">
            TechSathi<span className="text-orange-500">Bhopal</span>
          </h1>
        </Link>

        {/* 2. MIDDLE: Navigation Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : idleStyle}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? activeStyle : idleStyle}>Services</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? activeStyle : idleStyle}>About</NavLink>
        </div>

        {/* 3. RIGHT: Cart aur User Auth Section */}
        <div className="flex items-center gap-4">
          <Link to="/cart" className="relative p-2 hover:bg-slate-50 rounded-full transition-all">
            <ShoppingCart size={22} className="text-slate-600" />
            <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] px-1.5 rounded-full border-2 border-white">0</span>
          </Link>

          <div className="border-l pl-4">
            {user ? (
              /* --- LOGIN HONE KE BAAD: User Icon aur Logout Button --- */
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2 bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
                  <FaUserCircle className="text-2xl text-[#003366]" />
                  <span className="font-bold text-[#003366]">{user}</span>
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-2 bg-red-50 text-red-600 px-4 py-2 rounded-xl hover:bg-red-100 transition-all font-bold text-sm"
                >
                  <FaSignOutAlt />
                  Logout
                </button>
              </div>
            ) : (
              /* --- LOGIN NAHI HAI TO: Login Button --- */
              <Link 
                to="/login" 
                className="flex items-center gap-2 bg-[#003366] text-white px-6 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-md font-bold"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;





// import { Link, NavLink } from 'react-router-dom';
// import { ShoppingCart, User } from 'lucide-react';
// import TSBLogo from '../assets/TechsathiBhopal.png';

// import React, { useState, useEffect } from 'react';
// // import { useNavigate } from 'react-router-dom';
// import { FaUserCircle, FaCaretDown } from 'react-icons/fa';

// const Navbar = () => {
//   const activeStyle = "text-orange-500 font-bold border-b-2 border-orange-500 pb-1";
//   const idleStyle = "hover:text-orange-500 transition-colors";

//   const [user, setUser] = useState(null);
//   // const navigate = useNavigate();

//   useEffect(() => {
//     // Check karein ki user pehle se login hai ya nahi
//     const savedUser = localStorage.getItem('userName');
//     if (savedUser) setUser(savedUser);
//   }, []);

//   const handleLogout = () => {
//     localStorage.clear(); // Token aur Name delete karein
//     window.location.reload(); // Wapas Login dikhane ke liye refresh
//   };

//   // const handleLogout = () => {
//   //   localStorage.clear(); // Remove token and name
//   //   setUser(null);
//   //   navigate('/');
//   //   window.location.reload(); // Refresh to show Login button again
//   // };

//   return (
//     <nav className="bg-white border-b sticky top-0 z-50 px-6 py-4 shadow-sm">
//       <div className="max-w-7xl mx-auto flex justify-between items-center">
        
//         {/* Brand Logo - Links to Home */}
//         <Link to="/" className="flex items-center gap-2 group">
//           <div onClick={() => navigate('/')} className="cursor-pointer">
//              <img src={TSBLogo} alt="TSB Logo" className="h-12 w-auto hover:scale-105 transition-transform" />
//          </div>
//           <h1 className="text-xl font-black text-[#003366] tracking-tight">
//            TechSathi<span className="text-orange-500">Bhopal</span>
//          </h1>
//         </Link>

//         {/* Menu Links */}
//         <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
//           <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : idleStyle}>Home</NavLink>
//           <NavLink to="/services" className={({ isActive }) => isActive ? activeStyle : idleStyle}>Services</NavLink>
//           <NavLink to="/about" className={({ isActive }) => isActive ? activeStyle : idleStyle}>About</NavLink>
          
//           <div className="flex items-center gap-4 border-l pl-8">
//             <Link to="/cart" className="relative p-2 hover:bg-slate-50 rounded-full transition-all">
//               <ShoppingCart size={22} className="text-slate-600" />
//               <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] px-1.5 rounded-full border-2 border-white">0</span>
//             </Link>
//             <Link to="/login" className="flex items-center gap-2 bg-[#003366] text-white px-5 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-md">
//               <User size={18} />
//               {/* <span>Login</span> */}
//                <div className="flex items-center gap-6">
//         {user ? (
//           /* --- SHOW THIS WHEN LOGGED IN --- */
//           <div className="relative group flex items-center gap-2 cursor-pointer bg-slate-50 px-3 py-1.5 rounded-full border border-slate-200">
//             <FaUserCircle className="text-2xl text-[#003366]" />
//             <span className="font-bold text-[#003366]">{user}</span>
//             <FaCaretDown className="text-slate-400" />

//             {/* Simple Dropdown for Logout */}
//             <div className="absolute right-0 top-full mt-2 w-40 bg-white shadow-xl rounded-lg hidden group-hover:block border border-slate-100 overflow-hidden z-50">
//               <button 
//                 onClick={handleLogout}
//                 className="w-full text-left px-4 py-3 text-sm text-red-600 hover:bg-red-50 font-bold"
//               >
//                 Logout
//               </button>
//             </div>
//           </div>
//         ) : (
//           /* --- SHOW THIS WHEN LOGGED OUT --- */
//           <button 
//             onClick={() => navigate('/')}
//             className="px-6 py-2 bg-orange-500 text-white rounded-lg font-bold hover:bg-orange-600 transition-all"
//           >
//             Login
//           </button>
//         )}
//       </div>

//             </Link>
//           </div>
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;