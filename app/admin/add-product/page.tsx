'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus, Trash2, Store, Sparkles, ArrowLeft, CheckCircle2, Image as ImageIcon, ShoppingBag, DollarSign, TrendingUp, Clock, Truck, MessageCircle, UserPlus, Phone, ExternalLink, Copy, Lock, KeyRound, ShieldCheck, LogOut, AlertCircle, RefreshCw, X, ListChecks, CheckCircle
} from 'lucide-react';

export default function AdminMasterPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'shopping'>('orders');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [vendorApps, setVendorApps] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [formError, setFormError] = useState('');
  
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('Khaadi Official');
  const [customBrand, setCustomBrand] = useState('');
  const [category, setCategory] = useState('Fashion & Apparel');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>(['']);

  const syncAdminData = async () => {
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (res.ok) { const data = await res.json(); if (Array.isArray(data)) setProducts(data); }
    } catch (e) {}
    try {
      const resOrders = await fetch('/api/orders', { cache: 'no-store' });
      if (resOrders.ok) { const dataOrders = await resOrders.json(); if (Array.isArray(dataOrders)) setOrders(dataOrders); }
    } catch (err) {}
    try {
      const resVendors = await fetch('/api/vendors', { cache: 'no-store' });
      if (resVendors.ok) { const dataVendors = await resVendors.json(); if (Array.isArray(dataVendors)) setVendorApps(dataVendors); }
    } catch (err) {}
  };

  useEffect(() => {
    const authSession = localStorage.getItem('emall_admin_auth');
    if (authSession === 'true') setIsAuthenticated(true);
    syncAdminData();
    const interval = setInterval(syncAdminData, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'EmallPK2026!' || passcode === 'admin123') {
      setIsAuthenticated(true); localStorage.setItem('emall_admin_auth', 'true'); setLoginError(false); setPasscode('');
    } else { setLoginError(true); }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch('/api/orders', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId, status }) });
      await syncAdminData();
    } catch (err) {}
  };

  const handleDeleteOrder = async (orderId: string) => {
    if(confirm("Confirm deletion of this order record?")) {
      try { await fetch(`/api/orders?orderId=${orderId}`, { method: 'DELETE' }); await syncAdminData(); } catch (err) {}
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    const validUrls = imageUrls.map(url => url.trim()).filter(url => url !== '').map(url => (url.startsWith('http') ? url : `https://${url}`));
    if (validUrls.length === 0) return setFormError('Enter at least one image link');

    const newProduct = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || 'Official Brand Article',
      price: parseFloat(price.replace(/[^0-9.]/g, '')),
      category: { name: category },
      shop: { name: brand === 'Custom' ? customBrand : brand, commissionRate: 5.0 },
      images: JSON.stringify(validUrls),
    };

    try {
      const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProduct) });
      if (res.ok) {
        await syncAdminData(); setTitle(''); setPrice(''); setImageUrls(['']);
        setSuccessMessage(true); setTimeout(() => setSuccessMessage(false), 4000);
      }
    } catch (err) {}
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const totalProfit = orders.reduce((sum, o) => sum + (o.total_hardwork_profit || 0) + 50, 0);

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090807] text-[#E6DFD5] flex items-center justify-center p-6">
        <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-12 max-w-md w-full shadow-2xl text-center space-y-6">
          <div className="w-20 h-20 rounded-[1.5rem] bg-[#D95D27] flex items-center justify-center text-white mx-auto shadow-2xl shadow-[#D95D27]/30 animate-pulse"><Lock className="w-10 h-10" /></div>
          <div><span className="text-[10px] font-black text-[#D95D27] uppercase tracking-[0.4em] block">Admin Verification</span><h1 className="text-3xl font-serif text-white mt-2 tracking-tight">E-Mall CEO Portal</h1></div>
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input type="password" required value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="Enter Secret Passcode" className="w-full px-6 py-4 bg-black border border-white/10 rounded-2xl text-white text-center focus:border-[#D95D27] outline-none" />
            <button type="submit" className="w-full py-5 bg-[#D95D27] text-white font-black uppercase tracking-widest rounded-full shadow-lg active:scale-95 transition-all">Unlock Dashboard</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090807] text-[#E6DFD5] font-sans p-6 sm:p-12 pb-24">
      <div className="max-w-7xl mx-auto space-y-10">
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/10 pb-8 gap-6">
          <div className="flex items-center gap-4"><Link href="/" className="px-5 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black tracking-widest uppercase hover:bg-white/10 transition-all">← Back to Atrium</Link><h1 className="text-3xl font-serif text-white tracking-tight">CEO Control Hub</h1></div>
          <div className="flex items-center gap-3">
             <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                <button onClick={() => setActiveTab('orders')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'orders' ? 'bg-[#D95D27] text-white' : 'text-gray-500'}`}>Live Orders</button>
                <button onClick={() => setActiveTab('products')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'products' ? 'bg-[#D95D27] text-white' : 'text-gray-500'}`}>Inventory</button>
                <button onClick={() => setActiveTab('shopping')} className={`px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'shopping' ? 'bg-[#D95D27] text-white' : 'text-gray-500'}`}>Mall Pickups</button>
             </div>
             <button onClick={() => { setIsAuthenticated(false); localStorage.removeItem('emall_admin_auth'); }} className="p-3.5 bg-red-950/60 rounded-2xl border border-red-500/30 text-red-300 hover:bg-red-900 transition-all"><LogOut className="w-5 h-5" /></button>
          </div>
        </div>

        {/* METRICS - HARIS CEO VIEW */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-2 shadow-xl"><span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Total Sourcing Volume</span><p className="text-3xl font-black text-white leading-none">PKR {totalRevenue.toLocaleString()}</p></div>
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-8 rounded-[2rem] space-y-2 shadow-xl"><span className="text-emerald-400 text-[10px] uppercase font-black tracking-widest">Net Hardwork Profit</span><p className="text-3xl font-black text-emerald-400 leading-none">PKR {totalProfit.toLocaleString()}</p></div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-2 shadow-xl"><span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Active Orders</span><p className="text-3xl font-black text-white leading-none">{orders.length}</p></div>
          <div className="bg-white/5 border border-white/10 p-8 rounded-[2rem] space-y-2 shadow-xl"><span className="text-gray-500 text-[10px] uppercase font-black tracking-widest">Seller Applicants</span><p className="text-3xl font-black text-amber-300 leading-none">{vendorApps.length}</p></div>
        </div>

        {/* SHOPPING LIST TAB (For Haris at the Mall) */}
        {activeTab === 'shopping' && (
           <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-8 animate-in fade-in duration-500 shadow-2xl">
              <div className="flex justify-between items-center border-b border-white/10 pb-6"><h2 className="text-2xl font-serif text-white">Mall Pick-up List (Runner View)</h2><ListChecks className="w-6 h-6 text-[#D95D27]" /></div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                 {orders.filter(o => o.status === 'Stock Verification' || o.status === 'Gathering from Hub').map((o) => (
                    <div key={o.order_id} className="bg-black/50 border border-white/10 p-6 rounded-3xl space-y-4">
                       <p className="text-[10px] font-black text-[#D95D27] uppercase tracking-widest">Order ID: {o.order_id}</p>
                       <div className="space-y-2">
                          {(o.cart_items || []).map((item:any, i:number) => (
                             <div key={i} className="flex justify-between text-xs font-bold p-3 bg-white/5 rounded-xl border border-white/5">
                                <span>{item.shop?.name} - {item.title} ({item.selectedSize})</span>
                                <span className="text-[#D95D27]">x{item.quantity}</span>
                             </div>
                          ))}
                       </div>
                       <button onClick={() => handleUpdateOrderStatus(o.order_id, 'Gathering from Hub')} className="w-full py-3 bg-blue-600 rounded-xl text-[10px] font-black uppercase tracking-widest text-white shadow-lg">Mark as Picked up</button>
                    </div>
                 ))}
              </div>
           </div>
        )}

        {/* LIVE ORDERS TAB */}
        {activeTab === 'orders' && (
          <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-8 shadow-2xl">
            <h2 className="text-2xl font-serif text-white flex items-center gap-3"><ShoppingBag className="w-6 h-6 text-[#D95D27]" /> Live Orders Tracking</h2>
            <div className="space-y-5">
              {orders.map((o) => (
                <div key={o.order_id} className="bg-black/50 border border-white/10 rounded-[2rem] p-8 space-y-6 shadow-xl transition-all hover:border-white/20">
                  <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center border-b border-white/5 pb-5 gap-4">
                    <div className="space-y-1">
                       <span className="text-[10px] font-black text-[#D95D27] uppercase tracking-widest">Verified ID: {o.order_id}</span>
                       <p className="text-lg font-serif text-white">{o.customer_name} • {o.date}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {/* HARIS POWER BUTTONS */}
                      <button onClick={() => handleUpdateOrderStatus(o.order_id, 'Awaiting 20% Advance')} className="px-4 py-2 bg-amber-500/20 text-amber-300 border border-amber-500/30 rounded-xl text-[9px] font-black uppercase tracking-widest">Verify Stock</button>
                      <button onClick={() => handleUpdateOrderStatus(o.order_id, 'Gathering from Hub')} className="px-4 py-2 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 rounded-xl text-[9px] font-black uppercase tracking-widest">Trust Approval (COD)</button>
                      
                      <select value={o.status || 'Stock Verification'} onChange={(e) => handleUpdateOrderStatus(o.order_id, e.target.value)} className="bg-[#090807] border border-white/10 text-[10px] font-bold text-white px-4 py-2 rounded-xl focus:border-[#D95D27] outline-none">
                        <option value="Stock Verification">Stock Verification</option>
                        <option value="Awaiting 20% Advance">Awaiting 20% Advance</option>
                        <option value="Gathering from Hub">Gathering from Hub</option>
                        <option value="In Transit">In Transit</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                      <button onClick={() => handleDeleteOrder(o.order_id)} className="p-2 text-red-400 bg-red-500/10 rounded-xl transition-all hover:bg-red-500/20"><Trash2 className="w-5 h-5" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-10 text-xs">
                    <div className="space-y-3 bg-white/5 p-6 rounded-3xl border border-white/5 shadow-inner">
                       <div className="space-y-1"><p className="text-[10px] font-black text-gray-500 uppercase tracking-widest leading-none mb-1">Customer & Address</p><p className="font-bold text-white leading-tight">{o.customer_name} ({o.customer_phone})</p><p className="text-gray-400 italic leading-relaxed">{o.customer_address}</p></div>
                       <div className="flex gap-2 pt-2"><span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest ${o.payment_method === 'PREPAID' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-400 border border-amber-500/30'}`}>{o.payment_method}</span></div>
                    </div>
                    <div className="md:col-span-2 space-y-4 bg-white/5 p-6 rounded-3xl border border-white/5">
                       <div className="space-y-2 max-h-40 overflow-y-auto pr-2">
                          {(o.cart_items || []).map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-[11px] text-gray-300 border-b border-white/5 pb-2 hover:text-white transition-colors">
                              <div className="flex items-center gap-3">
                                 <div className="w-8 h-8 rounded-lg bg-black flex items-center justify-center"><ShoppingBag className="w-3.5 h-3.5 text-[#D95D27]" /></div>
                                 <span>{item.shop?.name} • {item.title} (x{item.quantity}) - {item.selectedSize}</span>
                              </div>
                              <span className="font-black text-white">PKR {item.totalPrice?.toLocaleString()}</span>
                            </div>
                          ))}
                       </div>
                       <div className="pt-3 border-t border-white/10 grid grid-cols-2 lg:grid-cols-3 gap-4">
                          <div className="space-y-0.5"><p className="text-[9px] font-black text-amber-500 uppercase tracking-widest">CEO Net Margin</p><p className="text-sm font-black text-white leading-none">PKR {o.total_hardwork_profit?.toFixed(2)}</p></div>
                          <div className="space-y-0.5"><p className="text-[9px] font-black text-emerald-500 uppercase tracking-widest leading-none mb-0.5">20% Advance Goal</p><p className="text-sm font-black text-white leading-none">PKR {o.advanceAmount?.toLocaleString()}</p></div>
                          <div className="space-y-0.5"><p className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Final Bill (80%)</p><p className="text-lg font-black text-emerald-500 leading-none">PKR {o.totalAmount?.toLocaleString()}</p></div>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* INVENTORY TAB */}
        {activeTab === 'products' && (
           <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-10 space-y-10 animate-in fade-in duration-500 shadow-2xl">
              <h2 className="text-2xl font-serif">Mall Product Management</h2>
              <form onSubmit={handleAddProduct} className="grid grid-cols-1 md:grid-cols-2 gap-6 font-sans">
                 <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Article Title" className="w-full px-6 py-4 bg-black border border-white/10 rounded-2xl text-white outline-none focus:border-[#D95D27]" />
                 <input type="text" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Retail Price (PKR)" className="w-full px-6 py-4 bg-black border border-white/10 rounded-2xl text-white outline-none focus:border-[#D95D27]" />
                 <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-6 py-4 bg-black border border-white/10 rounded-2xl text-white outline-none focus:border-[#D95D27]">
                    <option value="Fashion & Apparel">Fashion Floor (G)</option>
                    <option value="Shoes & Footwear">Footwear Floor (1st)</option>
                    <option value="Beauty & Organic">Beauty Floor (2nd)</option>
                    <option value="Perfumes & Accessories">Perfumes Floor (2nd)</option>
                    <option value="Home & Lifestyle">Lifestyle Floor (3rd)</option>
                    <option value="Baby & Kids">Kids Floor (3rd)</option>
                 </select>
                 <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-6 py-4 bg-black border border-white/10 rounded-2xl text-white outline-none focus:border-[#D95D27]">
                    <option value="Khaadi Official">Khaadi Official</option>
                    <option value="Outfitters Official">Outfitters Official</option>
                    <option value="Ethnic Official">Ethnic Official</option>
                    <option value="Breakout Official">Breakout Official</option>
                    <option value="SAYA Official">SAYA Official</option>
                    <option value="Custom">Custom Brand Seller</option>
                 </select>
                 <div className="md:col-span-2 space-y-3 pt-4 border-t border-white/5">
                    <p className="text-[10px] font-black text-gray-500 uppercase tracking-widest px-2">Gallery Image Links (Max 5)</p>
                    {imageUrls.map((url, idx) => (
                      <div key={idx} className="flex gap-2"><input type="text" value={url} onChange={(e) => handleImageUrlChange(idx, e.target.value)} placeholder={`Direct Image URL #${idx+1}`} className="flex-1 px-6 py-4 bg-black border border-white/10 rounded-2xl text-xs text-white" />{imageUrls.length > 1 && <button type="button" onClick={() => handleRemoveImageUrlField(idx)} className="p-3 bg-red-950/60 rounded-xl text-red-300 transition-all hover:bg-red-800"><Trash2 className="w-4 h-4" /></button>}</div>
                    ))}
                    {imageUrls.length < 5 && <button type="button" onClick={handleAddImageUrlField} className="text-[#D95D27] font-black text-[10px] uppercase tracking-widest flex items-center gap-2 hover:opacity-70 p-2">+ Add Another Perspective View</button>}
                 </div>
                 <button type="submit" className="md:col-span-2 py-5 bg-[#D95D27] text-white font-black uppercase tracking-[0.2em] rounded-full shadow-2xl transition-all active:scale-95 shadow-[#D95D27]/30">Publish live to Hub</button>
              </form>
           </div>
        )}
      </div>
    </div>
  );
}