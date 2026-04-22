import { Link, NavLink } from 'react-router-dom';
import { ShoppingCart, User } from 'lucide-react';

const Navbar = () => {
  const activeStyle = "text-orange-500 font-bold border-b-2 border-orange-500 pb-1";
  const idleStyle = "hover:text-orange-500 transition-colors";

  return (
    <nav className="bg-white border-b sticky top-0 z-50 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Brand Logo - Links to Home */}
        <Link to="/" className="flex items-center gap-2 group">
          <div className="bg-[#003366] text-white p-2 rounded-lg font-bold group-hover:scale-110 transition-transform">TS</div>
          <span className="text-2xl font-bold text-[#003366]">TechSathi</span>
        </Link>

        {/* Menu Links */}
        <div className="hidden md:flex items-center gap-8 font-medium text-slate-600">
          <NavLink to="/" className={({ isActive }) => isActive ? activeStyle : idleStyle}>Home</NavLink>
          <NavLink to="/services" className={({ isActive }) => isActive ? activeStyle : idleStyle}>Services</NavLink>
          <NavLink to="/about" className={({ isActive }) => isActive ? activeStyle : idleStyle}>About</NavLink>
          
          <div className="flex items-center gap-4 border-l pl-8">
            <Link to="/cart" className="relative p-2 hover:bg-slate-50 rounded-full transition-all">
              <ShoppingCart size={22} className="text-slate-600" />
              <span className="absolute top-0 right-0 bg-orange-500 text-white text-[10px] px-1.5 rounded-full border-2 border-white">0</span>
            </Link>
            <Link to="/login" className="flex items-center gap-2 bg-[#003366] text-white px-5 py-2 rounded-xl hover:bg-slate-800 transition-all shadow-md">
              <User size={18} />
              <span>Login</span>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;