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
  RotateCcw,
  AlertCircle,
  RefreshCw
} from 'lucide-react';

export default function AdminMasterPortal() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState(false);

  const [activeTab, setActiveTab] = useState<'orders' | 'products' | 'vendors'>('products');
  
  const [products, setProducts] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [vendorApps, setVendorApps] = useState<any[]>([]);
  
  const [successMessage, setSuccessMessage] = useState(false);
  const [formError, setFormError] = useState('');

  // Form State
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('Khaadi Official');
  const [customBrand, setCustomBrand] = useState('');
  const [category, setCategory] = useState('Fashion & Apparel');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const syncAdminData = async () => {
    try {
      const res = await fetch('/api/products', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data)) {
          setProducts(data);
          localStorage.setItem('emall_master_products', JSON.stringify(data));
        }
      }
    } catch (e) {
      console.error(e);
    }

    // Orders
    try {
      const resOrders = await fetch('/api/orders', { cache: 'no-store' });
      if (resOrders.ok) {
        const dataOrders = await resOrders.json();
        if (Array.isArray(dataOrders)) setOrders(dataOrders);
      }
    } catch (err) {}

    // Vendor Applications
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
    if (authSession === 'true') {
      setIsAuthenticated(true);
    }
    syncAdminData();
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passcode === 'EmallPK2026!' || passcode === 'admin123') {
      setIsAuthenticated(true);
      localStorage.setItem('emall_admin_auth', 'true');
      setLoginError(false);
      setPasscode('');
    } else {
      setLoginError(true);
    }
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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (!title.trim()) {
      setFormError('Please enter a Product Title');
      return;
    }
    if (!price) {
      setFormError('Please enter a Product Price');
      return;
    }
    if (!imageUrl.trim()) {
      setFormError('Please enter a Direct Image URL');
      return;
    }

    let cleanUrl = imageUrl.trim();
    if (!cleanUrl.startsWith('http://') && !cleanUrl.startsWith('https://')) {
      cleanUrl = 'https://' + cleanUrl;
    }

    const cleanPrice = parseFloat(price.toString().replace(/[^0-9.]/g, '')) || 0;
    const finalBrand = brand === 'Custom' ? (customBrand.trim() || 'Custom Brand') : brand;

    const newProduct = {
      id: `custom-${Date.now()}`,
      title: title.trim(),
      description: description.trim() || '100% Original Brand Guaranteed article.',
      price: cleanPrice,
      category: { name: category },
      shop: { name: finalBrand, commissionRate: 5.0 },
      images: JSON.stringify([cleanUrl]),
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
        setImageUrl('');
        setFormError('');
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 4000);
      } else {
        setFormError(`Supabase Error: ${data.error || 'Failed to save product'}`);
      }
    } catch (err: any) {
      setFormError(`Network error: ${err.message}`);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE'
      });
      if (res.ok) {
        await syncAdminData();
      }
    } catch (err) {
      console.error('Delete failed:', err);
    }
  };

  // Order Status Update
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

  // Metrics Calculations
  const totalRevenue = orders.reduce((sum, o) => sum + (o.total_amount || o.totalAmount || 0), 0);
  const totalProfit = orders.reduce((sum, o) => sum + (o.total_hardwork_profit || o.totalHardworkProfit || 0) + 50, 0);

  const brandOptions = [
    'Khaadi Official',
    'Breakout Official',
    'LAMA',
    'Agha Noor Official',
    'Hemani Natural',
    'One Dollar Shop',
    'Baby Section',
    'Sapphire Official',
    'SAYA Official',
    'ETHNIC Official',
    'Custom'
  ];

  const categories = [
    'Fashion & Apparel',
    'Beauty & Organic',
    'Baby & Kids',
    'Home & Lifestyle',
    'Perfumes & Accessories',
    'Shoes & Footwear',
    'Bags & Accessories',
    'Watches'
  ];

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[#090807] text-[#E6DFD5] bg-grid font-sans flex items-center justify-center p-6">
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl space-y-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#D95D27] to-amber-600 flex items-center justify-center text-white mx-auto shadow-xl shadow-[#D95D27]/30">
            <Lock className="w-8 h-8" />
          </div>

          <div>
            <span className="text-[10px] font-bold text-[#D95D27] uppercase tracking-widest block">Security Authentication</span>
            <h1 className="text-2xl font-serif text-white mt-1">E-Mall CEO Master Portal</h1>
            <p className="text-gray-400 text-xs mt-1">Enter your private CEO passcode to access live orders, sales revenue & store controls.</p>
          </div>

          {loginError && (
            <div className="p-3 bg-red-950/80 border border-red-500/40 rounded-2xl text-red-300 text-xs font-bold">
              ✕ Invalid Passcode. Please try again.
            </div>
          )}

          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="relative">
              <KeyRound className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
              <input
                type="password"
                required
                value={passcode}
                onChange={(e) => setPasscode(e.target.value)}
                placeholder="Enter CEO Passcode (EmallPK2026!)"
                className="w-full pl-11 pr-4 py-3.5 bg-black/50 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
              />
            </div>

            <button
              type="submit"
              className="w-full py-4 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl shadow-[#D95D27]/30 transition-all flex items-center justify-center gap-2"
            >
              <ShieldCheck className="w-4 h-4" />
              <span>Authenticate CEO Access</span>
            </button>
          </form>

          <Link href="/" className="inline-block text-xs text-gray-500 hover:text-white transition-colors pt-2">
            ← Return to Live Website
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#090807] text-[#E6DFD5] bg-grid font-sans p-6 sm:p-12 pb-24">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-white/10 pb-6">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="p-3 bg-white/5 hover:bg-white/10 text-white rounded-2xl border border-white/10 transition-all flex items-center gap-2 text-xs font-bold"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back to Live Mall</span>
            </Link>
            <div>
              <span className="text-[10px] font-bold text-[#D95D27] uppercase tracking-widest block">CEO Master Portal (Authenticated)</span>
              <h1 className="text-3xl font-serif text-white mt-0.5">E-Mall PK Sales & Control Hub</h1>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleClearBrowserCache}
              className="px-4 py-2 bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/30 rounded-2xl transition-all text-xs font-bold flex items-center gap-1.5"
            >
              <RefreshCw className="w-3.5 h-3.5 text-amber-400" />
              <span>Clear Local Cache</span>
            </button>

            <div className="flex gap-2 bg-white/5 p-1.5 rounded-2xl border border-white/10">
              <button
                onClick={() => setActiveTab('orders')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'orders'
                    ? 'bg-[#D95D27] text-white shadow-lg shadow-[#D95D27]/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Orders ({orders.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('products')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'products'
                    ? 'bg-[#D95D27] text-white shadow-lg shadow-[#D95D27]/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Plus className="w-4 h-4" />
                <span>Products ({products.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('vendors')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
                  activeTab === 'vendors'
                    ? 'bg-[#D95D27] text-white shadow-lg shadow-[#D95D27]/30'
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <UserPlus className="w-4 h-4" />
                <span>Sellers ({vendorApps.length})</span>
              </button>
            </div>

            <button
              onClick={handleAdminLogout}
              className="p-3 bg-red-950/60 hover:bg-red-900/60 text-red-300 rounded-2xl border border-red-500/30 transition-all text-xs font-bold flex items-center gap-1.5"
              title="Logout CEO Session"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* METRICS SUMMARY BAR */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-1">
            <div className="flex justify-between items-center text-gray-400 text-xs">
              <span>Total Sales Volume</span>
              <DollarSign className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-white">PKR {totalRevenue.toLocaleString()}</p>
          </div>

          <div className="bg-emerald-950/40 border border-emerald-500/30 p-6 rounded-3xl space-y-1">
            <div className="flex justify-between items-center text-emerald-300 text-xs font-bold">
              <span>Net E-Mall Profit Earned</span>
              <TrendingUp className="w-4 h-4 text-emerald-400" />
            </div>
            <p className="text-2xl font-black text-emerald-400">PKR {totalProfit.toLocaleString()}</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-1">
            <div className="flex justify-between items-center text-gray-400 text-xs">
              <span>Total Orders Placed</span>
              <ShoppingBag className="w-4 h-4 text-[#D95D27]" />
            </div>
            <p className="text-2xl font-black text-white">{orders.length} Orders</p>
          </div>

          <div className="bg-white/5 border border-white/10 p-6 rounded-3xl space-y-1">
            <div className="flex justify-between items-center text-gray-400 text-xs">
              <span>Merchant Applications</span>
              <UserPlus className="w-4 h-4 text-amber-400" />
            </div>
            <p className="text-2xl font-black text-amber-300">{vendorApps.length} Applicants</p>
          </div>
        </div>

        {/* TAB 1: LIVE ORDERS MANAGEMENT */}
        {activeTab === 'orders' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="border-b border-white/10 pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-serif text-white flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#D95D27]" />
                  <span>Customer Orders ({orders.length})</span>
                </h2>
                <p className="text-gray-400 text-xs mt-1">Manage delivery address, contact customers via WhatsApp, and update status.</p>
              </div>
            </div>

            {orders.length === 0 ? (
              <div className="text-center py-20 text-gray-500 text-sm font-serif">
                No customer orders received yet. Place a test order on the homepage to see it appear live here!
              </div>
            ) : (
              <div className="space-y-4">
                {orders.map((o) => {
                  const customerName = o.customer_name || o.customerName;
                  const customerPhone = o.customer_phone || o.customerPhone;
                  const customerAddress = o.customer_address || o.customerAddress;
                  const totalAmount = o.total_amount || o.totalAmount;
                  const profit = o.total_hardwork_profit || o.totalHardworkProfit;
                  const orderId = o.order_id || o.orderId;
                  const items = o.cart_items || o.cartItems || [];

                  const whatsappMsg = encodeURIComponent(
                    `Assalam-o-Alaikum ${customerName}! Thank you for your order (${orderId}) on E-Mall Pakistan. We are preparing your consolidated delivery to: ${customerAddress}. Total Payable: PKR ${totalAmount?.toLocaleString()}.`
                  );

                  return (
                    <div key={orderId} className="bg-black/50 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl">
                      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 border-b border-white/10 pb-3 text-xs">
                        <div>
                          <span className="font-bold text-white text-sm">Order ID: {orderId}</span>
                          <span className="text-gray-500 block text-[11px]">{o.date}</span>
                        </div>

                        <div className="flex items-center gap-3">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                            o.status === 'Delivered' ? 'bg-emerald-950 text-emerald-400 border border-emerald-500/30' : 'bg-amber-950 text-amber-300 border border-amber-500/30'
                          }`}>
                            {o.status || 'Pending Dispatch'}
                          </span>

                          <select
                            value={o.status || 'Pending Dispatch'}
                            onChange={(e) => handleUpdateOrderStatus(orderId, e.target.value)}
                            className="bg-[#090807] border border-white/10 text-xs text-white px-3 py-1.5 rounded-xl"
                          >
                            <option value="Pending Dispatch">Pending Dispatch</option>
                            <option value="In Transit / Dispatched">In Transit / Dispatched</option>
                            <option value="Delivered">Delivered</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button onClick={() => handleDeleteOrder(orderId)} className="text-red-400 hover:text-red-300 p-1">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95D27]">Customer Details:</span>
                          <p className="font-bold text-white text-xs mt-1">{customerName}</p>
                          <p className="text-gray-400 text-[11px]">{customerPhone}</p>
                          <p className="text-gray-400 text-[11px]">{customerAddress}</p>
                          <p className="text-emerald-400 text-[10px] font-bold pt-1">Payment: {o.payment_method || o.paymentMethod}</p>

                          <a
                            href={`https://wa.me/92${customerPhone?.replace(/^0/, '')}?text=${whatsappMsg}`}
                            target="_blank"
                            rel="noreferrer"
                            className="mt-3 w-full py-2 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[10px] rounded-xl flex items-center justify-center gap-2 transition-all"
                          >
                            <MessageCircle className="w-3.5 h-3.5" />
                            <span>WhatsApp Customer</span>
                          </a>
                        </div>

                        <div className="bg-white/5 p-4 rounded-2xl border border-white/10 space-y-2 md:col-span-2">
                          <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95D27]">Ordered Items:</span>
                          <div className="space-y-1.5 max-h-32 overflow-y-auto">
                            {items.map((item: any, idx: number) => (
                              <div key={idx} className="flex justify-between items-center text-[11px] text-gray-300 border-b border-white/5 pb-1">
                                <div>
                                  <span className="font-bold text-white">{item.title}</span>
                                  <span className="text-gray-500 block text-[10px]">
                                    Brand: {item.shop?.name} | Size: {item.selectedSize} | Qty: {item.quantity} {item.isGiftWrap && '🎁 Gift'}
                                  </span>
                                </div>
                                <span className="font-bold text-white">PKR {item.totalPrice?.toLocaleString()}</span>
                              </div>
                            ))}
                          </div>

                          <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-xs">
                            <span className="text-amber-400">Our 5% Profit Margin: PKR {profit?.toFixed(2)}</span>
                            <span className="text-emerald-400 text-sm font-extrabold">Total Payable: PKR {totalAmount?.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Add Product Form */}
            <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="border-b border-white/10 pb-4">
                <h2 className="text-xl font-serif text-white flex items-center gap-2">
                  <Plus className="w-5 h-5 text-[#D95D27]" />
                  <span>Add New Article</span>
                </h2>
                <p className="text-gray-400 text-xs mt-1">Fill out the fields below to publish a product live to Supabase Cloud Database.</p>
              </div>

              {formError && (
                <div className="bg-red-950/80 border border-red-500/40 p-4 rounded-2xl text-red-300 text-xs font-bold flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 text-red-400" />
                  <span>{formError}</span>
                </div>
              )}

              {successMessage && (
                <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-emerald-300 text-xs flex items-center gap-3 font-bold">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                  <span>Product published live to Supabase Cloud Database!</span>
                </div>
              )}

              <form onSubmit={handleAddProduct} className="space-y-5 text-xs">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Product Title</label>
                  <input
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="e.g. Breakout Leather Wallet"
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Select Brand Store</label>
                    <select
                      value={brand}
                      onChange={(e) => setBrand(e.target.value)}
                      className="w-full px-4 py-3.5 bg-[#090807] border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                    >
                      {brandOptions.map((b) => (
                        <option key={b} value={b}>{b}</option>
                      ))}
                    </select>
                  </div>

                  {brand === 'Custom' ? (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Custom Brand Name</label>
                      <input
                        type="text"
                        required
                        value={customBrand}
                        onChange={(e) => setCustomBrand(e.target.value)}
                        placeholder="e.g. Generation / Sana Safinaz"
                        className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                      />
                    </div>
                  ) : (
                    <div>
                      <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Category</label>
                      <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="w-full px-4 py-3.5 bg-[#090807] border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                      >
                        {categories.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Original Price (PKR)</label>
                  <input
                    type="text"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="e.g. 1349"
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Direct Image URL</label>
                  <input
                    type="text"
                    required
                    value={imageUrl}
                    onChange={(e) => setImageUrl(e.target.value)}
                    placeholder="e.g. https://www.breakout.com.pk/cdn/shop/files/image.jpg"
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Description</label>
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="e.g. Genuine leather compact bi-fold wallet."
                    className="w-full px-4 py-3.5 bg-black/40 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl shadow-[#D95D27]/30 transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Publish Article Live</span>
                </button>
              </form>
            </div>

            {/* Live Preview Card */}
            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95D27] block">Live Product Card Preview</span>
              
              <div className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl flex flex-col justify-between">
                <div>
                  <div className="relative h-72 w-full overflow-hidden bg-black/60 flex items-center justify-center text-gray-600">
                    {imageUrl ? (
                      <img src={imageUrl.startsWith('http') ? imageUrl : `https://${imageUrl}`} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <div className="text-center p-6 space-y-2">
                        <ImageIcon className="w-8 h-8 mx-auto text-gray-500" />
                        <p className="text-[10px] uppercase font-bold text-gray-500">Image Preview</p>
                      </div>
                    )}
                    <div className="absolute top-3 left-3 bg-[#090807]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                      <Store className="w-3 h-3 text-[#D95D27]" />
                      {brand === 'Custom' ? (customBrand || 'Brand Name') : brand}
                    </div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-base font-bold text-white font-sans line-clamp-1">
                      {title || 'Sample Article Name'}
                    </h3>
                    <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed font-light">
                      {description || 'Short product fabric description details.'}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] uppercase font-bold text-gray-500 block tracking-widest">Original Retail</span>
                      <span className="text-xl font-extrabold text-white">
                        PKR {price ? parseFloat(price.replace(/[^0-9.]/g, '')).toLocaleString() : '0'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Active Products List */}
            <div className="lg:col-span-3 bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
              <div className="border-b border-white/10 pb-4 flex justify-between items-center">
                <h2 className="text-xl font-serif text-white">Manage Active Products ({products.length})</h2>
                <span className="text-[10px] text-gray-400">Click Trash icon to remove any product</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {products.map((p) => {
                  let images = [];
                  try { images = JSON.parse(p.images || '[]'); } catch (e) { images = [p.images]; }
                  const displayImg = images[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800';

                  return (
                    <div key={p.id} className="bg-black/40 border border-white/10 rounded-2xl p-4 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <img src={displayImg} alt={p.title} className="w-12 h-12 rounded-xl object-cover" />
                        <div>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{p.title}</h4>
                          <p className="text-[10px] text-[#D95D27] font-bold">{p.shop?.name}</p>
                          <p className="text-[10px] text-gray-400 font-extrabold">PKR {p.price?.toLocaleString()}</p>
                        </div>
                      </div>
                      <button
                        onClick={() => handleDeleteProduct(p.id)}
                        className="p-2 bg-red-500/10 hover:bg-red-500/20 text-red-400 rounded-xl transition-all"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: MERCHANT APPLICATIONS TRACKER */}
        {activeTab === 'vendors' && (
          <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="border-b border-white/10 pb-4 flex justify-between items-center">
              <div>
                <h2 className="text-xl font-serif text-white flex items-center gap-2">
                  <UserPlus className="w-5 h-5 text-emerald-400" />
                  <span>Merchant Applications ({vendorApps.length})</span>
                </h2>
                <p className="text-gray-400 text-xs mt-1">Boutiques and Instagram sellers applying to sell on E-Mall PK under 10% commission.</p>
              </div>
            </div>

            {vendorApps.length === 0 ? (
              <div className="text-center py-20 text-gray-500 text-sm font-serif">
                No seller applications received yet. Click "Become a Seller" on the website navbar to test submitting an application!
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vendorApps.map((v, idx) => {
                  const vendorName = v.vendor_name || v.vendorName;
                  const vendorPhone = v.vendor_phone || v.vendorPhone;
                  const vendorCity = v.vendor_city || v.vendorCity;
                  const vendorInsta = v.vendor_insta || v.vendorInsta;

                  const whatsappMsg = encodeURIComponent(
                    `Assalam-o-Alaikum ${vendorName}! This is Haris Khan from E-Mall Pakistan. We received your seller application for ${vendorCity}. We would love to list your items under our 10% boutique program!`
                  );

                  return (
                    <div key={idx} className="bg-black/50 border border-white/10 rounded-3xl p-6 space-y-4 shadow-xl flex flex-col justify-between">
                      <div className="space-y-2">
                        <div className="flex justify-between items-start">
                          <span className="bg-emerald-950 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold px-3 py-1 rounded-full uppercase">
                            10% Boutique Partner
                          </span>
                          <span className="text-[10px] text-gray-500">{vendorCity}</span>
                        </div>
                        <h3 className="text-lg font-bold text-white font-serif">{vendorName}</h3>
                        <p className="text-gray-400 text-xs flex items-center gap-1.5">
                          <Phone className="w-3.5 h-3.5 text-[#D95D27]" />
                          <span>{vendorPhone}</span>
                        </p>
                        {vendorInsta && (
                          <p className="text-gray-400 text-xs flex items-center gap-1.5 line-clamp-1">
                            <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
                            <span>{vendorInsta}</span>
                          </p>
                        )}
                      </div>

                      <a
                        href={`https://wa.me/92${vendorPhone?.replace(/^0/, '')}?text=${whatsappMsg}`}
                        target="_blank"
                        rel="noreferrer"
                        className="w-full py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-2xl flex items-center justify-center gap-2 transition-all"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>Chat on WhatsApp with Seller</span>
                      </a>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

      </div>
    </div>
  );
}