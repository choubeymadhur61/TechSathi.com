// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { 
  FaFacebook, 
  FaInstagram, 
  FaYoutube, 
  FaLinkedin,
  FaPhoneAlt,
  FaArrowRight
} from 'react-icons/fa';
import { MdEmail, MdLocationOn } from 'react-icons/md';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#003366] text-white pt-16 pb-8 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
        {/* Brand & Vision */}
        <div className="space-y-6">
          <div className="flex items-center gap-2">
            <div className="bg-white text-[#003366] p-2 rounded-lg font-bold">TSB</div>
            <span className="text-2xl font-bold tracking-tight">TechSathiBhopal</span>
          </div>
          <p className="text-slate-300 leading-relaxed">
            Revolutionizing doorstep IT support in Bhopal. We bring L2/L3 expert engineering to your home.
          </p>
          <div className="flex gap-4">
            {/* Social Icons using React Icons */}
            <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-orange-500 transition-all"><FaInstagram size={20} /></a>
            <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-orange-500 transition-all"><FaFacebook size={20} /></a>
            <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-orange-500 transition-all"><FaYoutube size={20} /></a>
            <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-orange-500 transition-all"><FaLinkedin size={20} /></a>
          </div>
        </div>

        {/* Navigation */}
        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Navigation</h4>
          <ul className="space-y-4 text-slate-300">
            <li><Link to="/" className="hover:text-orange-400 flex items-center gap-2"><FaArrowRight size={12}/> Home</Link></li>
            <li><Link to="/services" className="hover:text-orange-400 flex items-center gap-2"><FaArrowRight size={12}/> Services</Link></li>
            <li><Link to="/about" className="hover:text-orange-400 flex items-center gap-2"><FaArrowRight size={12}/> About</Link></li>
          </ul>
        </div>

        {/* Bhopal Zones */}
        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Service Zones</h4>
          <ul className="space-y-4 text-slate-300">
            <li className="flex items-center gap-2"><MdLocationOn className="text-orange-500" /> MP Nagar</li>
            <li className="flex items-center gap-2"><MdLocationOn className="text-orange-500" /> Arera Colony</li>
            <li className="flex items-center gap-2"><MdLocationOn className="text-orange-500" /> Kolar Road</li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Get in Touch</h4>
          <div className="space-y-4">
            <a href="tel:+910000000000" className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-orange-500 transition-all group">
              <FaPhoneAlt className="text-orange-500" />
              <div>
                <p className="text-xs text-slate-400">Call Support</p>
                <p className="font-bold">+91 826 900 9962</p>
              </div>
            </a>
            <a href="mailto:support@techsathi.in" className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-orange-500 transition-all group">
              <MdEmail className="text-orange-500" />
              <div>
                <p className="text-xs text-slate-400">Email Us</p>
                <p className="font-bold text-sm">techsathibhopal@gmail.com</p>
              </div>
            </a>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 text-center md:text-left">
        <p className="text-slate-400 text-sm">© {currentYear} TechSathi Solutions. Made with ❤️ in Bhopal.</p>
      </div>
    </footer>
  );
};

export default Footer;


// import React from 'react';
// import { Link } from 'react-router-dom';
// // import { 
// //   Facebook, Instagram, Youtube, Linkedin, 
// //   Mail, Phone, MapPin, ArrowUpRight 
// // } from 'lucide-react';

// import { 
//   Facebook, 
//   Instagram, 
//   Youtube, 
//   Linkedin, 
//   Mail, 
//   Phone, 
//   MapPin, 
//   ArrowUpRight 
// } from 'lucide-react';

// const Footer = () => {
//   const currentYear = new Date().getFullYear();

//   return (
//     <footer className="bg-[#003366] text-white pt-16 pb-8 px-6">
//       <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
        
//         {/* 1. Brand & Vision */}
//         <div className="space-y-6">
//           <div className="flex items-center gap-2">
//             <div className="bg-white text-[#003366] p-2 rounded-lg font-bold">TS</div>
//             <span className="text-2xl font-bold tracking-tight">TechSathi</span>
//           </div>
//           <p className="text-slate-300 leading-relaxed">
//             Revolutionizing doorstep IT support in Bhopal. We bring L2/L3 expert engineering to your home, so you never have to carry a heavy PC again.
//           </p>
//           <div className="flex gap-4">
//             <a href="https://instagram.com" className="bg-white/10 p-2 rounded-lg hover:bg-orange-500 transition-all"><Instagram size={20} /></a>
//             <a href="https://facebook.com" className="bg-white/10 p-2 rounded-lg hover:bg-orange-500 transition-all"><Facebook size={20} /></a>
//             <a href="https://youtube.com/@bewaqtbhoot" className="bg-white/10 p-2 rounded-lg hover:bg-orange-500 transition-all"><Youtube size={20} /></a>
//             <a href="https://linkedin.com" className="bg-white/10 p-2 rounded-lg hover:bg-orange-500 transition-all"><Linkedin size={20} /></a>
//           </div>
//         </div>

//         {/* 2. Quick Links */}
//         <div>
//           <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Navigation</h4>
//           <ul className="space-y-4 text-slate-300">
//             <li><Link to="/" className="hover:text-orange-400 flex items-center gap-2 transition-colors"><ArrowUpRight size={14}/> Home</Link></li>
//             <li><Link to="/services" className="hover:text-orange-400 flex items-center gap-2 transition-colors"><ArrowUpRight size={14}/> Our Services</Link></li>
//             <li><Link to="/about" className="hover:text-orange-400 flex items-center gap-2 transition-colors"><ArrowUpRight size={14}/> About Us</Link></li>
//             <li><Link to="/careers" className="hover:text-orange-400 flex items-center gap-2 transition-colors"><ArrowUpRight size={14}/> Join as Sathi</Link></li>
//           </ul>
//         </div>

//         {/* 3. Bhopal Service Zones */}
//         <div>
//           <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Service Zones</h4>
//           <ul className="space-y-4 text-slate-300">
//             <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
//               <MapPin size={16} className="text-orange-500" /> MP Nagar & Arera Colony
//             </li>
//             <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
//               <MapPin size={16} className="text-orange-500" /> Kolar & Hoshangabad Rd
//             </li>
//             <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
//               <MapPin size={16} className="text-orange-500" /> Indrapuri & BHEL
//             </li>
//             <li className="flex items-center gap-2 hover:text-white transition-colors cursor-default">
//               <MapPin size={16} className="text-orange-500" /> Bawadiya Kalan & Shahpura
//             </li>
//           </ul>
//         </div>

//         {/* 4. Contact Info */}
//         <div>
//           <h4 className="text-lg font-bold mb-6 border-b border-white/10 pb-2">Get in Touch</h4>
//           <div className="space-y-4">
//             <a href="tel:+910000000000" className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-orange-500 transition-all group">
//               <Phone className="text-orange-500 group-hover:scale-110 transition-transform" />
//               <div>
//                 <p className="text-xs text-slate-400">Call for Support</p>
//                 <p className="font-bold">+91 000 000 0000</p>
//               </div>
//             </a>
//             <a href="mailto:support@techsathi.in" className="flex items-center gap-3 bg-white/5 p-4 rounded-xl border border-white/10 hover:border-orange-500 transition-all group">
//               <Mail className="text-orange-500 group-hover:scale-110 transition-transform" />
//               <div>
//                 <p className="text-xs text-slate-400">Email Us</p>
//                 <p className="font-bold text-sm">support@techsathi.in</p>
//               </div>
//             </a>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="max-w-7xl mx-auto pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
//         <p className="text-slate-400 text-sm">
//           © {currentYear} **TechSathi Solutions**. Made with ❤️ in Bhopal.
//         </p>
//         <div className="flex gap-6 text-xs font-bold text-slate-500 uppercase tracking-widest">
//           <a href="/privacy" className="hover:text-white">Privacy Policy</a>
//           <a href="/terms" className="hover:text-white">Terms of Service</a>
//         </div>
//       </div>
//     </footer>
//   );
// };

// export default Footer;