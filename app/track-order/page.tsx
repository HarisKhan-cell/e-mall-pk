'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Search,
  Truck,
  Building2,
  CheckCircle2,
  Clock,
  ArrowLeft,
  Package,
  MapPin,
  MessageCircle,
  ShieldCheck,
  FileText,
  Phone,
  Mail,
  Award,
  Sparkles
} from 'lucide-react';

function EMallLogoSymbol() {
  return (
    <svg className="w-7 h-7" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 32V8H22C25.3137 8 28 10.6863 28 14C28 17.3137 25.3137 20 22 20H14" stroke="#C8521B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 20V32M14 20H24C27.3137 20 30 22.6863 30 26C30 29.3137 27.3137 32 24 32H8" stroke="#1A1816" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="10" r="3" fill="#D49A37" />
    </svg>
  );
}

export default function TrackOrderPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [foundOrder, setFoundOrder] = useState<any>(null);
  const [searched, setSearched] = useState(false);
  const [allOrders, setAllOrders] = useState<any[]>([]);

  useEffect(() => {
    // 1. Fetch live orders from Supabase / API
    fetch('/api/orders')
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setAllOrders(data);
        }
      })
      .catch(console.error);

    // 2. Local backup
    const stored = localStorage.getItem('emall_orders');
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setAllOrders((prev) => [...parsed, ...prev]);
        }
      } catch (e) {}
    }
  }, []);

  const handleSearchOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearched(true);
    const cleanQuery = searchQuery.trim().toLowerCase();

    const match = allOrders.find(
      (o) =>
        (o.orderId && o.orderId.toLowerCase().includes(cleanQuery)) ||
        (o.order_id && o.order_id.toLowerCase().includes(cleanQuery)) ||
        (o.customerPhone && o.customerPhone.includes(cleanQuery)) ||
        (o.customer_phone && o.customer_phone.includes(cleanQuery))
    );

    if (match) {
      setFoundOrder(match);
    } else {
      setFoundOrder(null);
    }
  };

  const getStepStatus = (currentStatus: string, stepNumber: number) => {
    const statusLower = (currentStatus || '').toLowerCase();
    if (statusLower.includes('delivered')) return true; // All steps done
    if (statusLower.includes('transit') || statusLower.includes('dispatched')) return stepNumber <= 3;
    return stepNumber <= 2; // Default pending dispatch
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1816] font-sans selection:bg-[#C8521B] selection:text-white relative overflow-x-hidden">
      
      {/* Navbar */}
      <nav className="bg-[#FAF8F5]/90 backdrop-blur-2xl border-b border-[#E6E2D8] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center gap-6">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-2xl bg-white border border-[#E6E2D8] flex items-center justify-center shadow-sm group-hover:scale-105 transition-all">
              <EMallLogoSymbol />
            </div>
            <div>
              <span className="text-xl font-bold tracking-widest text-[#1A1816] uppercase font-serif flex items-center gap-1.5">
                E-MALL <span className="text-[10px] text-[#C8521B] tracking-normal font-mono font-normal">PK</span>
              </span>
              <span className="text-[10px] text-[#66615C] block -mt-1 font-medium">Digital Mall Platform</span>
            </div>
          </Link>

          <Link
            href="/"
            className="px-5 py-2.5 bg-white hover:bg-gray-50 text-[#1A1816] rounded-full border border-[#E6E2D8] transition-all text-xs font-bold flex items-center gap-2 shadow-sm"
          >
            <ArrowLeft className="w-4 h-4 text-[#C8521B]" />
            <span>Return to Live Store</span>
          </Link>
        </div>
      </nav>

      {/* Hero Header */}
      <div className="bg-[#F5F2EB] border-b border-[#E6E2D8] py-16 px-8 text-center">
        <div className="max-w-3xl mx-auto space-y-4">
          <span className="text-[10px] font-bold text-[#C8521B] uppercase tracking-[0.25em] block">
            Consolidated Logistics Tracking
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif text-[#1A1816]">Track Your Single-Box Shipment</h1>
          <p className="text-[#66615C] text-xs sm:text-sm font-light max-w-xl mx-auto leading-relaxed">
            Enter your Order ID (e.g. EMALL-892410) or WhatsApp Phone Number to view real-time delivery status from our Lahore Fulfillment Hub.
          </p>

          {/* Search Bar Form */}
          <form onSubmit={handleSearchOrder} className="max-w-lg mx-auto flex gap-2 pt-4">
            <div className="relative flex-1">
              <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                required
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Enter Order ID (EMALL-123456) or Phone Number..."
                className="w-full pl-11 pr-4 py-3.5 bg-white border border-[#E6E2D8] rounded-full text-xs text-[#1A1816] focus:outline-none focus:border-[#C8521B] shadow-sm"
              />
            </div>
            <button
              type="submit"
              className="px-7 py-3.5 bg-[#C8521B] hover:bg-[#a83e10] text-white font-extrabold text-xs rounded-full uppercase tracking-wider shadow-md transition-all whitespace-nowrap"
            >
              Track Order
            </button>
          </form>
        </div>
      </div>

      {/* Main Tracking Results Section */}
      <div className="max-w-4xl mx-auto px-8 py-16">
        
        {!searched && (
          <div className="bg-white border border-[#E6E2D8] rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <Package className="w-12 h-12 text-[#C8521B] mx-auto opacity-80" />
            <h3 className="text-lg font-serif text-[#1A1816]">Ready to Track Your Order</h3>
            <p className="text-[#66615C] text-xs max-w-md mx-auto leading-relaxed">
              Enter your Order ID above to see real-time updates as your items are consolidated from official brand stores into 1 delivery box.
            </p>
          </div>
        )}

        {searched && !foundOrder && (
          <div className="bg-white border border-[#E6E2D8] rounded-3xl p-12 text-center space-y-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-red-50 border border-red-200 text-red-600 flex items-center justify-center mx-auto">
              ✕
            </div>
            <h3 className="text-lg font-serif text-[#1A1816]">No Order Found</h3>
            <p className="text-[#66615C] text-xs max-w-md mx-auto leading-relaxed">
              We couldn't find an order matching "<strong>{searchQuery}</strong>". Please check your Order ID or phone number and try again.
            </p>
          </div>
        )}

        {foundOrder && (
          <div className="space-y-8">
            
            {/* Order Status Banner */}
            <div className="bg-white border border-[#E6E2D8] rounded-3xl p-8 shadow-sm space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-[#E6E2D8] pb-6">
                <div>
                  <span className="text-[10px] font-bold text-[#C8521B] uppercase tracking-widest block">Single-Box Order Record</span>
                  <h2 className="text-2xl font-serif text-[#1A1816] mt-0.5">Order #{foundOrder.orderId || foundOrder.order_id}</h2>
                  <p className="text-[#66615C] text-xs mt-1">Placed on {foundOrder.date}</p>
                </div>

                <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-900 px-4 py-2 rounded-full text-xs font-bold">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Status: {foundOrder.status || 'Pending Dispatch'}</span>
                </div>
              </div>

              {/* 4-STEP LOGISTICS TIMELINE */}
              <div>
                <h4 className="text-xs font-bold uppercase tracking-widest text-[#1A1816] mb-6">Consolidated Delivery Timeline</h4>
                
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 relative">
                  
                  {/* Step 1 */}
                  <div className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                    getStepStatus(foundOrder.status, 1)
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                      : 'bg-gray-50 border-[#E6E2D8] text-gray-400'
                  }`}>
                    <CheckCircle2 className="w-6 h-6 mx-auto text-emerald-600" />
                    <div>
                      <p className="font-bold text-xs">1. Confirmed</p>
                      <p className="text-[9px] text-gray-500">Order Registered</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                    getStepStatus(foundOrder.status, 2)
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                      : 'bg-gray-50 border-[#E6E2D8] text-gray-400'
                  }`}>
                    <Package className="w-6 h-6 mx-auto text-amber-600" />
                    <div>
                      <p className="font-bold text-xs">2. Sourced</p>
                      <p className="text-[9px] text-gray-500">From Brand Stores</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                    getStepStatus(foundOrder.status, 3)
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                      : 'bg-gray-50 border-[#E6E2D8] text-gray-400'
                  }`}>
                    <Building2 className="w-6 h-6 mx-auto text-[#C8521B]" />
                    <div>
                      <p className="font-bold text-xs">3. Consolidated</p>
                      <p className="text-[9px] text-gray-500">Lahore Center Box</p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className={`p-4 rounded-2xl border text-center space-y-2 transition-all ${
                    getStepStatus(foundOrder.status, 4)
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 shadow-sm'
                      : 'bg-gray-50 border-[#E6E2D8] text-gray-400'
                  }`}>
                    <Truck className="w-6 h-6 mx-auto text-indigo-600" />
                    <div>
                      <p className="font-bold text-xs">4. Dispatched</p>
                      <p className="text-[9px] text-gray-500">SKYNET / TCS Rider</p>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* Order Details & Customer Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
              
              {/* Customer Info Card */}
              <div className="bg-white border border-[#E6E2D8] p-6 rounded-3xl space-y-3 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8521B] block">Delivery Address</span>
                <div>
                  <p className="font-bold text-[#1A1816] text-sm">{foundOrder.customerName || foundOrder.customer_name}</p>
                  <p className="text-[#66615C] mt-1">{foundOrder.customerPhone || foundOrder.customer_phone}</p>
                  <p className="text-[#66615C] mt-1 leading-relaxed">{foundOrder.customerAddress || foundOrder.customer_address}</p>
                </div>

                <div className="pt-2 border-t border-[#E6E2D8]">
                  <span className="text-[10px] font-bold text-emerald-800 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">
                    Payment: {foundOrder.paymentMethod || foundOrder.payment_method}
                  </span>
                </div>

                {/* WhatsApp Direct Courier Query Button */}
                <a
                  href={`https://wa.me/923000000000?text=${encodeURIComponent(
                    `Assalam-o-Alaikum E-Mall Support! I am checking on my delivery status for Order #${foundOrder.orderId || foundOrder.order_id}.`
                  )}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 w-full py-3 bg-emerald-700 hover:bg-emerald-800 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all text-xs shadow-sm"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WhatsApp Logistics Support</span>
                </a>
              </div>

              {/* Items List Card */}
              <div className="md:col-span-2 bg-white border border-[#E6E2D8] p-6 rounded-3xl space-y-4 shadow-sm">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8521B] block">Consolidated Brand Articles</span>
                
                <div className="space-y-3">
                  {(foundOrder.cartItems || foundOrder.cart_items || []).map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-3.5 rounded-2xl border border-[#E6E2D8]">
                      <div>
                        <p className="font-bold text-[#1A1816]">{item.title}</p>
                        <p className="text-[10px] text-[#66615C] mt-0.5">
                          Brand: <strong className="text-[#C8521B]">{item.shop?.name}</strong> | Size: {item.selectedSize} | Qty: {item.quantity}
                        </p>
                      </div>
                      <span className="font-extrabold text-[#1A1816]">PKR {item.totalPrice?.toLocaleString()}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 border-t border-[#E6E2D8] flex justify-between items-center font-extrabold text-sm text-[#1A1816]">
                  <span>Total Amount Payable:</span>
                  <span className="text-emerald-700 text-base">PKR {(foundOrder.totalAmount || foundOrder.total_amount)?.toLocaleString()}</span>
                </div>
              </div>

            </div>

          </div>
        )}

      </div>

      {/* Footer */}
      <footer className="bg-[#1A1816] border-t border-black text-xs text-[#D8D3CC] font-sans mt-28 pt-16 pb-12 px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
          <p>© COPYRIGHT 2026 E-MALL PAKISTAN (PVT) LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-3 text-gray-400 font-bold">
            <Link href="/" className="hover:text-[#C8521B] transition-colors">Home Store</Link>
            <Link href="/admin/add-product" className="hover:text-[#C8521B] transition-colors">Admin Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
