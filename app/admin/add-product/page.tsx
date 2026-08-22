'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Plus,
  Trash2,
  Store,
  Sparkles,
  ArrowLeft,
  CheckCircle2,
  Image as ImageIcon,
  ShoppingBag,
  DollarSign,
  TrendingUp,
  Clock,
  Truck,
  MessageCircle,
  UserPlus,
  Phone,
  ExternalLink,
  Copy,
  Lock,
  KeyRound,
  ShieldCheck,
  LogOut,
  AlertCircle,
  RefreshCw,
  X
} from 'lucide-react';

export default function AdminMasterPortal() {
  // Security States
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);

  // Tab State
  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'vendors'>('products');
  
  // Data States
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [vendorApps, setVendorApps] = useState<any[]>([]);
  
  // UI Notification States
  const [successMessage, setSuccessMessage] = useState(false);
  const [formError, setFormError] = useState('');
  const [copied, setCopied] = useState(false);

  // Form State Declarations
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('Khaadi Official');
  const [customBrand, setCustomBrand] = useState('');
  const [category, setCategory] = useState('Fashion & Apparel');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  
  // UPDATED: Now handles multiple image URLs
  const [imageUrls, setImageUrls] = useState<string[]>(['']);

  const syncAdminData = async () => {
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) setProducts(data);
      }
    } catch (e) { console.error(e); }

    try {
      const resOrders = await fetch('/api/orders', { cache: 'no-store' });
      if (resOrders.ok) {
        const dataOrders = await resOrders.json();
        if (Array.isArray(dataOrders)) setOrders(dataOrders);
      }
    } catch (err) { console.error(err); }

    try {
      const resVendors = await fetch('/api/vendors', { cache: 'no-store' });
      if (resVendors.ok) {
        const dataVendors = await resVendors.json();
        if (Array.isArray(dataVendors)) setVendorApps(dataVendors);
      }
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
      setIsAuthenticated(true);
      localStorage.setItem('emall_admin_auth', 'true');
      setLoginError(false);
      setPasscode('');
    } else { setLoginError(true); }
  };

  const handleAdminLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('emall_admin_auth');
  };

  const handleClearBrowserCache = () => {
    localStorage.clear();
    localStorage.setItem('emall_admin_auth', 'true');
    window.location.reload();
  };

  // Multiple Image Helpers
  const handleAddImageUrlField = () => {
    if (imageUrls.length < 6) setImageUrls([...imageUrls, '']);
  };

  const handleImageUrlChange = (index: number, value: string) => {
    const newUrls = [...imageUrls];
    newUrls[index] = value;
    setImageUrls(newUrls);
  };

  const handleRemoveImageField = (index: number) => {
    const newUrls = imageUrls.filter((_, i) => i !== index);
    setImageUrls(newUrls.length ? newUrls : ['']);
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) return setFormError('Please enter a Product Title');
    if (!price) return setFormError('Please enter a Product Price');
    
    // Filter out empty URL fields
    const validUrls = imageUrls
      .map(url => url.trim())
      .filter(url => url !== '')
      .map(url => (url.startsWith('http') ? url : `https://${url}`));

    if (validUrls.length === 0) return setFormError('Please enter at least one Image URL');

    const cleanPrice = parseFloat(price.toString().replace(/[^0-9.]/g, '')) || 0;
    const finalBrand = brand === 'Custom' ? (customBrand.trim() || 'Custom Brand') : brand;

    const newProduct = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || '100% Original Brand Guaranteed article.',
      price: cleanPrice,
      category: { name: category },
      shop: { name: finalBrand, commissionRate: 5.0 },
      images: JSON.stringify(validUrls), // Now saving the full array!
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct)
      });
      const data = await res.json();

      if (res.ok && data.success) {
        await syncAdminData();
        setTitle('');
        setPrice('');
        setDescription('');
        setImageUrls(['']); // Reset to one field
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 4000);
      } else {
        setFormError(`Server error: ${data.error || 'Failed to save product'}`);
      }
    } catch (err: any) { setFormError(`Network error: ${err.message}`); }
  };

  const handleDeleteProduct = async (id: string) => {
    if(!confirm("Are you sure you want to delete this product?")) return;
    try {
      const res = await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
      if (res.ok) await syncAdminData();
    } catch (err) { console.error('Delete failed:', err); }
  };

  const handleUpdateOrderStatus = async (orderId: string, status: string) => {
    try {
      await fetch('/api/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status })
      });
      await syncAdminData();
    } catch (err) {}
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await fetch(`/api/orders?orderId=${orderId}`, { method: 'DELETE' });
      await syncAdminData();
    } catch (err) {}
  };

  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || 0), 0);
  const totalProfit = orders.reduce((sum, o) => sum + (o.total_hardwork_profit || 0) + 50, 0);

  const brandOptions = ['Khaadi Official','Breakout Official','LAMA','Agha Noor Official','Hemani Natural','One Dollar Shop','Baby Section','Sapphire Official','SAYA Official','ETHNIC Official','Custom'];
  const categories = ['Fashion & Apparel','Beauty & Organic','Baby & Kids','Home & Lifestyle','Perfumes & Accessories','Shoes & Footwear','Bags & Accessories','Watches'];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090807] text-[#E6DFD5] flex items-center justify-center p-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#D95D27] flex items-center justify-center text-white mx-auto"><Lock className="w-8 h-8" /></div>
          <h1 className="text-2xl font-serif text-white mt-1">CEO Master Portal</h1>
          {loginError && <div className="p-3 bg-red-950/80 border border-red-500/40 rounded-2xl text-red-300 text-xs font-bold">Invalid Passcode.</div>}
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <input type="password" required value={passcode} onChange={(e) => setPasscode(e.target.value)} placeholder="Enter Passcode" className="w-full px-4 py-3.5 bg-black/50 border border-white/10 rounded-2xl text-xs text-white focus:border-[#D95D27]" />
            <button type="submit" className="w-full py-4 bg-[#D95D27] text-white font-black text-xs uppercase rounded-full">Authenticate Access</button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090807] text-[#E6DFD5] p-6 sm:p-12 pb-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <Link href="/" className="p-3 bg-white/5 border border-white/10 text-white rounded-2xl text-xs font-bold flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" /> Back
            </Link>
            <div>
              <span className="text-[10px] font-bold text-[#D95D27] uppercase tracking-widest block">CEO Master Portal</span>
              <h1 className="text-3xl font-serif text-white mt-0.5">E-Mall Control Hub</h1>
            </div>
          </div>
          <div className="flex items-center gap-3 bg-white/5 p-1.5 rounded-2xl border border-white/10">
            <button onClick={() => setActiveTab('orders')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'orders' ? 'bg-[#D95D27] text-white' : 'text-gray-400'}`}>Orders ({orders.length})</button>
            <button onClick={() => setActiveTab('products')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'products' ? 'bg-[#D95D27] text-white' : 'text-gray-400'}`}>Products ({products.length})</button>
            <button onClick={() => setActiveTab('vendors')} className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${activeTab === 'vendors' ? 'bg-[#D95D27] text-white' : 'text-gray-400'}`}>Sellers ({vendorApps.length})</button>
            <button onClick={handleAdminLogout} className="p-3 bg-red-950/60 text-red-300 rounded-2xl"><LogOut className="w-4 h-4" /></button>
          </div>
        </div>

        {/* TAB 1: ORDERS */}
        {activeTab === 'orders' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
             <h2 className="text-xl font-serif text-white">Live Orders Management</h2>
             {orders.length === 0 ? <p className="text-gray-500 py-10 text-center">No orders yet.</p> : (
               <div className="space-y-4">
                 {orders.map((o) => (
                    <div key={o.order_id} className="bg-black/50 border border-white/10 rounded-3xl p-6 flex flex-col sm:flex-row justify-between gap-4">
                        <div>
                           <p className="font-bold text-white text-sm">{o.customer_name || 'Guest User'}</p>
                           <p className="text-gray-400 text-xs">{o.customer_address}</p>
                           <p className="text-emerald-400 font-bold text-xs mt-2">PKR {o.total_amount?.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-4">
                           <select value={o.status || 'Pending'} onChange={(e) => handleUpdateOrderStatus(o.order_id, e.target.value)} className="bg-black border border-white/10 text-xs text-white p-2 rounded-xl">
                              <option value="Pending Dispatch">Pending Dispatch</option>
                              <option value="In Transit">In Transit</option>
                              <option value="Delivered">Delivered</option>
                           </select>
                           <button onClick={() => handleDeleteOrder(o.order_id)} className="text-red-400"><Trash2 className="w-4 h-4" /></button>
                        </div>
                    </div>
                 ))}
               </div>
             )}
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
              <h2 className="text-xl font-serif text-white">Add New Article</h2>
              {formError && <div className="bg-red-950/80 p-4 rounded-2xl text-red-300 text-xs font-bold">{formError}</div>}
              {successMessage && <div className="bg-emerald-950/80 p-4 rounded-2xl text-emerald-300 text-xs font-bold">Product Added Successfully!</div>}
              
              <form onSubmit={handleAddProduct} className="space-y-5 text-xs">
                <input type="text" required value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Product Title" className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white focus:border-[#D95D27]" />
                
                <div className="grid grid-cols-2 gap-4">
                  <select value={brand} onChange={(e) => setBrand(e.target.value)} className="bg-black border border-white/10 rounded-2xl p-3.5 text-white">
                    {brandOptions.map(b => <option key={b} value={b}>{b}</option>)}
                  </select>
                  <select value={category} onChange={(e) => setCategory(e.target.value)} className="bg-black border border-white/10 rounded-2xl p-3.5 text-white">
                    {categories.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>

                <input type="text" required value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Price (PKR)" className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white focus:border-[#D95D27]" />
                
                {/* NEW: Multiple Image URLs section */}
                <div className="space-y-3">
                  <label className="text-[10px] uppercase font-bold text-gray-500">Product Image URLs (Max 5)</label>
                  {imageUrls.map((url, index) => (
                    <div key={index} className="flex gap-2">
                      <input 
                        type="text" 
                        value={url} 
                        onChange={(e) => handleImageUrlChange(index, e.target.value)} 
                        placeholder={`Image Link #${index + 1}`} 
                        className="flex-1 px-4 py-3 bg-black/40 border border-white/10 rounded-2xl text-white" 
                      />
                      {imageUrls.length > 1 && (
                        <button type="button" onClick={() => handleRemoveImageField(index)} className="p-2 text-red-400 hover:bg-red-400/10 rounded-xl"><X className="w-4 h-4" /></button>
                      )}
                    </div>
                  ))}
                  {imageUrls.length < 5 && (
                    <button type="button" onClick={handleAddImageUrlField} className="flex items-center gap-2 text-[#D95D27] font-bold text-[10px] uppercase p-2 hover:bg-white/5 rounded-xl transition-all">
                      <Plus className="w-3 h-3" /> Add Another Image Link
                    </button>
                  )}
                </div>

                <textarea rows={2} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Short Description" className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-white focus:border-[#D95D27]" />
                <button type="submit" className="w-full py-4 bg-[#D95D27] text-white font-black uppercase rounded-full">Publish Article</button>
              </form>
            </div>

            {/* Preview */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase text-[#D95D27]">Preview</span>
              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden">
                <div className="h-64 bg-black flex items-center justify-center">
                  {imageUrls[0] ? <img src={imageUrls[0]} className="h-full w-full object-cover" /> : <ImageIcon className="text-gray-700 w-10 h-10" />}
                </div>
                <div className="p-6">
                   <p className="text-xs text-[#D95D27] font-bold">{brand === 'Custom' ? customBrand : brand}</p>
                   <h3 className="text-white font-bold">{title || "Product Name"}</h3>
                   <p className="text-xl font-black text-white mt-4">PKR {price || 0}</p>
                   {imageUrls.filter(u => u).length > 1 && (
                     <p className="text-[10px] text-gray-500 mt-2">+{imageUrls.filter(u => u).length - 1} more images</p>
                   )}
                </div>
              </div>
            </div>

            {/* List */}
            <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 space-y-6">
               <h2 className="text-xl font-serif text-white">Active Products ({products.length})</h2>
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                 {products.map(p => {
                    let imgs = []; try { imgs = JSON.parse(p.images); } catch(e) { imgs = [p.images]; }
                    return (
                      <div key={p.id} className="bg-black/40 border border-white/10 p-4 rounded-2xl flex items-center justify-between">
                         <div className="flex items-center gap-3">
                           <img src={imgs[0]} className="w-10 h-10 rounded-lg object-cover" />
                           <div>
                             <p className="text-xs font-bold text-white line-clamp-1">{p.title}</p>
                             <p className="text-[10px] text-gray-400">PKR {p.price}</p>
                           </div>
                         </div>
                         <button onClick={() => handleDeleteProduct(p.id)} className="text-red-400 p-2"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    )
                 })}
               </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
