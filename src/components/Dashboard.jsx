import React, { useState, useEffect } from 'react';
import { FaTools, FaLaptop, FaNetworkWired } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import ServiceCard from './ServiceCard';
import axios from 'axios';

const Dashboard = ({cart, setCart}) => {
  const [user, setUser] = useState("");
  const [services, setServices] = useState([]); // Database data ke liye
  const navigate = useNavigate();
  // const [cart, setCart] = useState([]);

  useEffect(() => {
    const savedUser = localStorage.getItem('userName');
    if (!savedUser) {
      navigate('/'); // Agar login nahi hai toh wapas bhej dein
    } else {
      setUser(savedUser);
    }
  }, [navigate]);

 useEffect(() => {
    const fetchServices = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/services');
            setServices(response.data); // Database se aaya data yahan save hoga
        } catch (err) {
            console.error("Error fetching services:", err);
        }
    };
    fetchServices();
}, []);

const addToCart = (service) => {
  setCart((prevCart) => {
    // Check karein ki kya item pehle se cart mein hai
    const isExisting = prevCart.find(item => item._id === service._id);
    
    let updatedCart;
    if (isExisting) {
      // Agar hai, toh sirf quantity +1 karein
      updatedCart = prevCart.map(item => 
        item._id === service._id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
      );
    } else {
      // Agar naya hai, toh quantity 1 ke sath add karein
      updatedCart = [...prevCart, { ...service, quantity: 1 }];
    }
    
    localStorage.setItem('techsathi_cart', JSON.stringify(updatedCart));
    return updatedCart;
  });
  alert(`${service.title} added to your booking list!`);
};

 
  return (
    <div className="flex min-h-screen bg-slate-50">

      
      
      {/* 1. LEFT SIDEBAR: User Profile */}
      <div className="w-1/4 bg-[#003366] text-white p-8 flex flex-col items-center border-r border-slate-200">
        <div className="mb-6">
          <FaTools size={80} className="text-orange-500 bg-white rounded-full p-1" />
        </div>
        <h2 className="text-xl font-bold mb-2">Welcome,</h2>
        <p className="text-2xl font-black text-orange-500 uppercase tracking-wide">{user}</p>
        
        <div className="mt-10 w-full">
          <button className="w-full text-left py-3 px-4 rounded-lg hover:bg-slate-700 transition-all mb-2 bg-slate-800">My Profile</button>
          <button className="w-full text-left py-3 px-4 rounded-lg hover:bg-slate-700 transition-all mb-2">Service History</button>
          <button className="w-full text-left py-3 px-4 rounded-lg hover:bg-slate-700 transition-all mb-2">Support Tickets</button>
        </div>
      </div>

      {/* 2. MIDDLE SECTION: Services Grid */}
      
      <div className="flex-1 p-10">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-slate-800">Available <span className="text-orange-500">Services</span></h1>
          <p className="text-slate-500">Select a service to book a TechSathi professional in Bhopal.</p>
        </div>

        
   <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {services.length > 0 ? (
        services.map((service) => (
           <ServiceCard 
    key={service._id} 
    service={service} 
    onBook={() => addToCart(service)} // 👈 Ye function pass ho raha hai
/>
        ))
    ) : (
        <p className="text-slate-400">Loading services from Bhopal database...</p>
    )}
</div>

      
      </div>

    </div>
  );
};

export default Dashboard;




