import React from 'react';
import { CreditCard, Download } from 'lucide-react';

const PaymentHistory = () => {
  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-2xl border border-gray-100 mt-6 shadow-sm">
      <h2 className="text-2xl font-bold text-slate-800 mb-6 flex items-center gap-2">
        <CreditCard className="text-orange-500" /> Payment History
      </h2>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-gray-200 text-xs font-bold text-gray-400 uppercase tracking-wider">
            <th className="pb-3">Invoice ID</th>
            <th className="pb-3">Service</th>
            <th className="pb-3">Amount</th>
            <th className="pb-3">Status</th>
          </tr>
        </thead>
        <tbody className="text-slate-700 text-sm font-medium">
          <tr className="border-b border-gray-100">
            <td className="py-4 text-blue-900 font-semibold">#TSB-98745</td>
            <td className="py-4">OS Repair Optimization</td>
            <td className="py-4 font-bold text-slate-800">₹499</td>
            <td className="py-4 text-green-600 font-bold">Paid</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;