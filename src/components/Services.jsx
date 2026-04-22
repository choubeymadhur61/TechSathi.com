import React from 'react';
import { 
  Monitor, HardDrive, ShieldAlert, Wifi, 
  Video, Code, Cpu,
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Services = () => {
  const serviceList = [
    {
      title: "CCTV Installation",
      desc: "Complete security setup for homes & shops. Remote viewing on mobile included.",
      icon: <Video className="text-orange-500" size={32}  />,
      price: "Starts at ₹999",
      category: "Hardware"
    },
    {
      title: "Software Installation",
      desc: "Genuine OS, Office, Creative Suite & Antivirus setup with driver updates.",
      icon: <Monitor className="text-orange-500" size={32} />,
      price: "Starts at ₹499",
      category: "Software"
    },
    {
      title: "Website Development",
      desc: "Custom React/MERN websites for your business. Fast, SEO-friendly & modern.",
      icon: <Code className="text-orange-500" size={32} />,
      price: "Get a Quote",
      category: "Development"
    },
    {
      title: "Hardware Upgrade",
      desc: "SSD & RAM installation to make your old laptop/PC 10x faster.",
      icon: <Cpu className="text-orange-500" size={32} />,
      price: "Starts at ₹1499",
      category: "Hardware"
    },
    {
      title: "Virus & Security",
      desc: "Deep cleaning of malware and setting up firewalls for your data safety.",
      icon: <ShieldAlert className="text-orange-500" size={32} />,
      price: "Starts at ₹399",
      category: "Security"
    },
    {
      title: "Wi-Fi & Networking",
      desc: "Fixing dead zones and setting up high-speed mesh networks in large homes.",
      icon: <Wifi className="text-orange-500" size={32} />,
      price: "Starts at ₹599",
      category: "Networking"
    }
  ];

  return (
    <div className="min-h-screen bg-slate-50 py-16 px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl font-black text-[#003366]">What can we do for you?</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            From fixing a slow PC to building your company's digital presence, 
            **TechSathi** is your one-stop IT partner in Bhopal.
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {serviceList.map((service, index) => (
            <div 
              key={index}
              className="bg-white p-8 rounded-[2rem] shadow-sm border border-slate-100 hover:shadow-xl hover:-translate-y-2 transition-all duration-300 group"
            >
              <div className="bg-orange-50 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-[#003366] group-hover:text-white transition-colors duration-300">
                {service.icon}
              </div>
              
              <div className="space-y-3">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                  {service.category}
                </span>
                <h3 className="text-2xl font-bold text-[#003366]">{service.title}</h3>
                <p className="text-slate-500 leading-relaxed">
                  {service.desc}
                </p>
                <div className="pt-4 flex justify-between items-center">
                  <span className="font-black text-orange-500">{service.price}</span>
                  <Link 
                    to="/" 
                    className="text-sm font-bold text-[#003366] hover:underline"
                  >
                    Book Now →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Custom Query Banner */}
        <div className="mt-20 bg-[#003366] rounded-[3rem] p-12 text-center text-white relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-3xl font-bold">Have a special technical requirement?</h3>
            <p className="opacity-80 max-w-xl mx-auto">
              Our L2/L3 engineers can handle complex server setups, corporate networking, and custom software needs.
            </p>
            <button className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold transition-all shadow-lg shadow-orange-900/20">
              Contact for Custom Project
            </button>
          </div>
          {/* Decorative Circle */}
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-white/5 rounded-full"></div>
        </div>

      </div>
    </div>
  );
};

export default Services;