'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus, Trash2, Store, Sparkles, ArrowLeft, CheckCircle2, Image as ImageIcon, ShoppingBag, DollarSign, TrendingUp, Clock, Truck, MessageCircle, UserPlus, Phone, ExternalLink, Copy, Lock, KeyRound, ShieldCheck, LogOut, AlertCircle, RefreshCw, X
} from 'lucide-react';

export default function AdminMasterPortal() {
  // Security States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'vendors'>('products');
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [vendorApps, setVendorApps] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [formError, setFormError] = useState('');
  
  // Product Form States
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

  const handleAdminLogout = () => { setIsAuthenticated(false); localStorage.removeItem('emall_admin_auth'); };
  const handleAddImageUrlField = () => { if (imageUrls.length < 5) setImageUrls([...imageUrls, '']); };
  const handleImageUrlChange = (index: number, value: string) => { const newUrls = [...imageUrls]; newUrls[index] = value; setImageUrls(newUrls); };
  const handleRemoveImageUrlField = (index: number) => { const newUrls = imageUrls.filter((_, i) => i !== index); setImageUrls(newUrls.length > 0 ? newUrls : ['']); };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');
    if (!title.trim() || !price) return setFormError('Title and Price are required');
    const validUrls = imageUrls.map(url => url.trim()).filter(url => url !== '').map(url => (url.startsWith('http') ? url : `https://${url}`));
    if (validUrls.length === 0) return setFormError('Enter at least one image link');

    const cleanPrice = parseFloat(price.toString().replace(/[^0-9.]/g, '')) || 0;
    const finalBrand = brand === 'Custom' ? (customBrand.trim() || 'Custom Brand') : brand;

    const newProduct = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || '100% Original Brand Guaranteed article.',
      price: cleanPrice,
      category: { name: category },
      shop: { name: finalBrand, commissionRate: 5.0 },
      images: JSON.stringify(validUrls),
    };

    try {
      const res = await fetch('/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newProduct) });
      if (res.ok) {
        await syncAdminData(); setTitle(''); setPrice(''); setDescription(''); setImageUrls(['']);
        setSuccessMessage(true); setTimeout(() => setSuccessMessage(false), 4000);
      }
    } catch (err: any) { setFormError(`Network Error: ${err.message}`); }
  };

  const handleDeleteProduct = async (id: string) => { try { const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' }); if (res.ok) await syncAdminData(); } catch (err) {} };
  const handleUpdateOrderStatus = async (orderId: string, status: string) => { try { await fetch('/api/orders', { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ orderId, status }) }); await syncAdminData(); } catch (err) {} };
  const handleDeleteOrder = async (orderId: string) => { try { await fetch(`/api/orders?orderId=${orderId}`, { method: 'DELETE' }); await syncAdminData(); } catch (err) {} };

  // FULL METRICS - CEO DASHBOARD
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || o.totalAmount || 0), 0);
  const totalProfit = orders.reduce((sum, o) => sum + (o.total_hardwork_profit || o.totalHardworkProfit || 0) + 50, 0);

  // UPDATED OPTIONS
  const brandOptions = ['Khaadi Official', 'Outfitters Official', 'Ethnic Official', 'Breakout Official', 'LAMA', 'Agha Noor Official', 'Hemani Natural', 'One Dollar Shop', 'Baby Section', 'Sapphire Official', 'Custom'];
  const categoriesList = ['Fashion & Apparel', 'Beauty & Organic', 'Baby & Kids', 'Home & Lifestyle', 'Shoes & Footwear', 'Perfumes & Accessories'];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090807] text-[#E6DFD5] flex items-center justify-center p-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-2xl bg-[#D95D27] flex items-center justify-center text-white mx-auto shadow-xl"><Lock className="w-8 h-8" /></div>
          <div><span className="text-[10px] font-bold text-[#D95D27] uppercase tracking-widest block font-sans">Security Authentication</span><h1 className="text-2xl font-serif text-white mt-1">E-Mall CEO Master Portal</h1></div>
          {loginError && <div className="p-3 bg-red-950/80 border border-red-500/40 rounded-2xl text-red-300 text-xs font-bold font-sans">✕ Invalid Passcode.</div>}
          <form onSubmit={handleAdminLogin} className="space-y-4 font-sans">
            <div className="relative"><KeyRound className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" /><input type="password" required value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="Enter CEO Passcode" className="w-full pl-11 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-2xl text-xs text-white focus:border-[#D95D27]" /></div>
            <button type="submit" className="w-full py-4 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl transition-all flex items-center justify-center gap-2"><ShieldCheck className="w-4 h-4" /> Authenticate Access</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090807] text-[#E6DFD5] font-sans p-6 sm:p-12 pb-24">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex flex-col sm:flex-row justify-between items-center border-b border-white/10 pb-6 gap-4">
          <div className="flex items-center gap-4"><Link href="/" className="px-4 py-2 bg-white/5 border border-white/10 rounded-2xl text-xs font-bold transition-all hover:bg-white/10">← Back</Link><h1 className="text-3xl font-serif text-white">CEO Control Hub</h1></div>
          <div className="flex items-center gap-3">
             <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
                <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'orders' ? 'bg-[#D95D27] text-white' : 'text-gray-400 hover:text-white'}`}>Orders ({orders.length})</button>
                <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'products' ? 'bg-[#D95D27] text-white' : 'text-gray-400 hover:text-white'}`}>Products ({products.length})</button>
                <button onClick={() => setActiveTab('vendors')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'vendors' ? 'bg-[#D95D27] text-white' : 'text-gray-400 hover:text-white'}`}>Sellers ({vendorApps.length})</button>
             </div>
             <button onClick={handleAdminLogout} className="p-3 bg-red-950/60 rounded-2xl border border-red-500/30 text-red-300 transition-all hover:bg-red-900/60"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 font-sans">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-1"><span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest block">Total Sales Volume</span><p className="text-2xl font-black text-white">PKR {totalRevenue.toLocaleString()}</p></div>
          <div className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-3xl space-y-1"><span className="text-emerald-300 text-[10px] uppercase font-bold tracking-widest block">Net E-Mall Profit</span><p className="text-2xl font-black text-emerald-400">PKR {totalProfit.toLocaleString()}</p></div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-1"><span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest block">Total Orders</span><p className="text-2xl font-black text-white">{orders.length}</p></div>
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-1"><span className="text-gray-400 text-[10px] uppercase font-bold tracking-widest block">Seller Apps</span><p className="text-2xl font-black text-amber-300">{vendorApps.length}</p></div>
        </div>

        {activeTab === 'orders' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl">
            <h2 className="text-xl font-serif text-white flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-[#D95D27]" /> Live Orders Management</h2>
            <div className="space-y-4">
              {orders.map((o) => (
                <div key={o.order_id} className="bg-black/50 border border-white/10 rounded-3xl p-6 space-y-4">
                  <div className="flex justify-between items-center border-b border-white/10 pb-3 font-sans">
                    <div><span className="font-bold text-white">Order ID: {o.order_id}</span><span className="text-gray-500 block text-[11px]">{o.date}</span></div>
                    <div className="flex items-center gap-3">
                      <select value={o.status || 'Pending Dispatch'} onChange={(e) => handleUpdateOrderStatus(o.order_id, e.target.value)} className="bg-[#090807] border border-white/10 text-xs text-white px-3 py-1.5 rounded-xl"><option value="Pending Dispatch">Pending Dispatch</option><option value="In Transit">In Transit</option><option value="Delivered">Delivered</option><option value="Cancelled">Cancelled</option></select>
                      <button onClick={() => handleDeleteOrder(o.order_id)} className="text-red-400 p-1 transition-all hover:bg-red-500/10 rounded-lg"><Trash2 className="w-4 h-4" /></button>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs font-sans">
                    <div className="space-y-1 bg-white/5 p-4 rounded-2xl border border-white/10"><p className="font-bold text-white text-sm">{o.customer_name}</p><p className="text-gray-400">{o.customer_phone}</p><p className="text-gray-400">{o.customer_address}</p><p className="text-emerald-400 font-bold pt-1">Payment: {o.payment_method}</p></div>
                    <div className="md:col-span-2 space-y-2 bg-white/5 p-4 rounded-2xl border border-white/10">
                       <div className="space-y-1.5 max-h-32 overflow-y-auto">
                          {(o.cart_items || []).map((item: any, idx: number) => (
                            <div key={idx} className="flex justify-between text-[11px] text-gray-300 border-b border-white/5 pb-1">
                              <span>{item.title} (x{item.quantity}) - {item.selectedSize}</span>
                              <span className="font-bold">PKR {item.totalPrice?.toLocaleString()}</span>
                            </div>
                          ))}
                       </div>
                       <div className="pt-2 border-t border-white/10 flex justify-between font-bold">
                          <span className="text-amber-400 text-[9px] uppercase tracking-widest">E-Mall Profit: PKR {o.total_hardwork_profit?.toFixed(2)}</span>
                          <span className="text-emerald-400 text-sm">TOTAL PAYABLE: PKR {o.total_amount?.toLocaleString()}</span>
                       </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
              <h2 className="text-xl font-serif text-white flex items-center gap-2"><Plus className="w-5 h-5 text-[#D95D27]" /> Add New Article</h2>
              {formError && <div className="p-3 bg-red-950/80 rounded-2xl text-red-300 text-xs font-sans font-bold">✕ {formError}</div>}
              {successMessage && <div className="p-3 bg-emerald-950/80 rounded-2xl text-emerald-300 text-xs font-sans font-bold">✓ Published live to Digital Mall!</div>}
              
              <form onSubmit={handleAddProduct} className="space-y-5 text-xs font-sans">
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Title" className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white focus:border-[#D95D27]" />
                <div className="grid grid-cols-2 gap-4">
                  <select value={brand} onChange={(e) => setBrand(e.target.value)} className="w-full px-4 py-3.5 bg-[#090807] border border-white/10 rounded-2xl text-white">{brandOptions.map(b => <option key={b} value={b}>{b}</option>)}</select>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full px-4 py-3.5 bg-[#090807] border border-white/10 rounded-2xl text-white">{categoriesList.map(c => <option key={c} value={c}>{c}</option>)}</select>
                </div>
                <input type="text" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Original Price (PKR)" className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white" />
                
                <div className="space-y-3">
                   <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 block px-1">Gallery Links (Max 5)</label>
                   {imageUrls.map((url, idx) => (
                     <div key={idx} className="flex gap-2"><input type="text" value={url} onChange={(e) => handleImageUrlChange(idx, e.target.value)} placeholder={`Direct Link #${idx+1}`} className="flex-1 px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white focus:border-[#D95D27]" />{imageUrls.length > 1 && <button type="button" onClick={() => handleRemoveImageUrlField(idx)} className="p-3 bg-red-950/40 border border-red-500/20 text-red-400 rounded-2xl hover:bg-red-900/40"><Trash2 className="w-4 h-4" /></button>}</div>
                   ))}
                   {imageUrls.length < 5 && <button type="button" onClick={handleAddImageUrlField} className="text-[10px] font-bold uppercase tracking-widest text-[#D95D27] flex items-center gap-1.5 p-2 transition-all hover:opacity-80"><Plus className="w-3.5 h-3.5" /> Add Another Link</button>}
                </div>

                <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Product Description" className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white focus:border-[#D95D27]" />
                <button type="submit" className="w-full py-4 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-black uppercase rounded-full shadow-2xl transition-all">Publish Article Live</button>
              </form>
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase text-[#D95D27] tracking-widest block font-sans">Live Preview</span>
              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between h-fit font-sans">
                <div className="h-64 bg-black/60 flex items-center justify-center overflow-hidden">{imageUrls[0] ? <img src={imageUrls[0]} className="w-full h-full object-cover" /> : <ImageIcon className="w-10 h-10 text-gray-700" />}</div>
                <div className="p-6 space-y-2"><h3 className="text-white font-bold text-lg">{title || 'Preview'}</h3><p className="text-gray-400 text-xs line-clamp-2">{description || 'Article info...'}</p><p className="text-2xl font-black text-[#D95D27] pt-2">PKR {price || 0}</p></div>
              </div>
            </div>

            <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl font-sans">
              <h2 className="text-xl font-serif text-white">Active Products ({products.length})</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((p) => {
                   let imgs = []; try { imgs = JSON.parse(p.images || '[]'); } catch (e) { imgs = [p.images]; }
                   return (
                    <div key={p.id} className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-3 group transition-all hover:border-[#D95D27]/40">
                      <div className="flex items-center gap-3 overflow-hidden"><img src={imgs[0]} className="w-12 h-12 rounded-xl object-cover shrink-0" /><div className="overflow-hidden"><h4 className="text-xs font-bold text-white truncate">{p.title}</h4><p className="text-[10px] text-gray-500 font-extrabold tracking-tighter uppercase">{p.shop?.name}</p><p className="text-[10px] text-gray-400">PKR {p.price?.toLocaleString()}</p></div></div>
                      <button onClick={() => handleDeleteProduct(p.id)} className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"><Trash2 className="w-4 h-4" /></button>
                    </div>
                   );
                })}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'vendors' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6 shadow-2xl font-sans">
            <h2 className="text-xl font-serif text-white flex items-center gap-2"><UserPlus className="w-5 h-5 text-emerald-400" /> Merchant Applications</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {vendorApps.map((v, idx) => (
                <div key={idx} className="bg-black/50 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between transition-all hover:border-emerald-500/30">
                  <div className="space-y-2"><div className="flex justify-between items-start"><span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Seller Partner</span><span className="text-[10px] text-gray-500">{v.vendor_city}</span></div><h3 className="text-lg font-bold text-white font-serif">{v.vendor_name}</h3><p className="text-gray-400 text-xs flex items-center gap-1.5"><Phone className="w-3.5 h-3.5 text-[#D95D27]" /> {v.vendor_phone}</p></div>
                  <a href={`https://wa.me/92${v.vendor_phone?.replace(/^0/, '')}`} target="_blank" rel="noreferrer" className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all uppercase tracking-widest"><MessageCircle className="w-4 h-4" /> <span>WhatsApp Seller</span></a>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}