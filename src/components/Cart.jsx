import React from 'react';
import { Trash2, Calendar, ShieldCheck, Plus, Minus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Cart = ({ cart, setCart }) => {
  const navigate = useNavigate();

  // Price aur Quantity ko multiply karke Total Bill nikalna
  const totalAmount = cart.reduce((sum, item) => sum + ((item.price || 0) * (item.quantity || 1)), 0);

  // Quantity control karne ke liye main function
  const updateQuantity = (id, change) => {
    const updatedCart = cart.map(item => {
      if (item._id === id) {
        const newQuantity = (item.quantity || 1) + change;
        return newQuantity > 0 ? { ...item, quantity: newQuantity } : item;
      }
      return item;
    });
    setCart(updatedCart);
    localStorage.setItem('techsathi_cart', JSON.stringify(updatedCart));
  };

  // Cart se item complete remove karne ke liye[cite: 2]
  const removeFromCart = (id) => {
    const updatedCart = cart.filter(item => item._id !== id);
    setCart(updatedCart);
    localStorage.setItem('techsathi_cart', JSON.stringify(updatedCart));
  };

  return (
    <div className="max-w-5xl mx-auto p-6 md:p-10">
      <h2 className="text-3xl font-black text-[#003366] mb-8">
        Your Service <span className="text-orange-500">Cart</span>
      </h2>

      {cart.length === 0 ? (
        <div className="text-center bg-white p-12 rounded-[2rem] shadow-sm border border-slate-100">
          <p className="text-slate-400 text-lg mb-6">No services selected yet.</p>
          <button 
            onClick={() => navigate('/dashboard')}
            className="bg-[#003366] text-white px-6 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all shadow-md"
          >
            Explore Services in Bhopal
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left: Items List */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <div 
                key={item._id} 
                className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4"
              >
                <div>
                  <h4 className="font-bold text-lg text-slate-800">{item.title}</h4>
                  <p className="text-slate-400 text-sm mt-1">{item.category || 'IT Support'}</p>
                  <p className="text-orange-500 font-extrabold mt-2">₹{item.price} <span className="text-xs text-slate-400 font-normal">per unit</span></p>
                </div>
                
                {/* 🔢 Dynamic + and - Controller */}
                <div className="flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                  <div className="flex items-center bg-slate-100 rounded-xl p-1 border border-slate-200">
                    <button 
                      onClick={() => updateQuantity(item._id, -1)}
                      className="p-2 hover:bg-white rounded-lg transition-all text-slate-600"
                      disabled={(item.quantity || 1) <= 1} // 1 se kam nahi hoga
                    >
                      <Minus size={16} />
                    </button>
                    <span className="px-4 font-bold text-slate-800 min-w-[24px] text-center">
                      {item.quantity || 1}
                    </span>
                    <button 
                      onClick={() => updateQuantity(item._id, 1)}
                      className="p-2 hover:bg-white rounded-lg transition-all text-slate-600"
                    >
                      <Plus size={16} />
                    </button>
                  </div>

                  <button 
                    onClick={() => removeFromCart(item._id)}
                    className="p-3 bg-red-50 text-red-500 rounded-xl hover:bg-red-100 transition-all"
                    title="Remove Service"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Right: Summary Box[cite: 2] */}
          <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 h-fit space-y-6">
            <h3 className="text-xl font-bold text-[#003366] border-b pb-3">Booking Summary</h3>
            
            <div className="flex justify-between text-slate-600 font-medium">
              <span>Total Items</span>
              <span>{cart.reduce((total, item) => total + (item.quantity || 1), 0)}</span>
            </div>
            
            <div className="flex justify-between text-lg font-black text-slate-800 border-t pt-4">
              <span>Total Amount</span>
              <span className="text-orange-500">₹{totalAmount}</span>
            </div>

            <div className="space-y-2 bg-slate-50 p-4 rounded-xl text-xs text-slate-500">
              <div className="flex items-center gap-2"><ShieldCheck size={14} className="text-green-500"/> Verified TechSathi Experts</div>
              <div className="flex items-center gap-2"><Calendar size={14} className="text-green-500"/> Flexible Scheduling</div>
            </div>

            <button 
              onClick={() => alert("Proceeding to final booking form...")}
              className="w-full py-4 bg-[#003366] text-white font-bold rounded-xl shadow-lg hover:bg-slate-800 transition-all text-center"
            >
              Proceed to Book
            </button>
          </div>

        </div>
      )}
    </div>
  );
};

export default Cart;