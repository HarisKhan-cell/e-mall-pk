'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingBag,
  Store,
  MapPin,
  CheckCircle2,
  Trash2,
  Star,
  ShieldCheck,
  Tag,
  Sparkles,
  X,
  ArrowRight,
  Truck,
  MessageCircle,
  Phone,
  Mail,
  Camera,
  UserPlus,
  HelpCircle,
  Shirt,
  Crown,
  Coffee,
  Gamepad2,
  ArrowUpRight,
  Building2,
  Send,
  Heart
} from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [user, setUser] = useState<any>(null);
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [newsletterSuccess, setNewsletterSuccess] = useState(false);

  // Customer Form Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerCity, setCustomerCity] = useState('Lahore');
  const [customerAddress, setCustomerAddress] = useState('');
  const [orderNotes, setOrderNotes] = useState('');

  useEffect(() => {
    fetchProducts();
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsed = JSON.parse(storedUser);
      setUser(parsed);
      setCustomerName(parsed.name || '');
    }
  }, []);

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const addToCart = (product: any) => {
    setCart((prev) => [...prev, product]);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.price, 0);
  };

  const PLATFORM_FEE = 50;
  const DELIVERY_FEE = 195;

  const handleFinalCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const shopBreakdown: any = {};
    let totalSellerCommission = 0;
    let totalVendorDeliveryFees = 0;

    cart.forEach((item) => {
      const shopName = item.shop?.name || 'Verified Partner';
      const commissionRate = item.shop?.commissionRate || 5.0;
      const commissionAmount = (item.price * commissionRate) / 100;
      totalSellerCommission += commissionAmount;

      if (!shopBreakdown[shopName]) {
        shopBreakdown[shopName] = {
          shopName,
          items: [],
          subtotal: 0,
          commission: 0,
          vendorDeliveryCharge: DELIVERY_FEE,
        };
        totalVendorDeliveryFees += DELIVERY_FEE;
      }
      shopBreakdown[shopName].items.push(item);
      shopBreakdown[shopName].subtotal += item.price;
      shopBreakdown[shopName].commission += commissionAmount;
    });

    const orderReceipt = {
      orderId: `EMALL-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }),
      customerName,
      customerPhone,
      customerCity,
      customerAddress,
      orderNotes,
      cartItems: [...cart],
      shopBreakdown,
      itemsSubtotal: calculateSubtotal(),
      buyerFee: PLATFORM_FEE,
      buyerDeliveryFee: DELIVERY_FEE,
      totalVendorDeliveryFees,
      totalLogisticsPoolCollected: DELIVERY_FEE + totalVendorDeliveryFees,
      totalSellerCommission,
      totalOwnerProfit: PLATFORM_FEE + (DELIVERY_FEE + totalVendorDeliveryFees - 195) + totalSellerCommission,
      totalAmount: calculateSubtotal() + PLATFORM_FEE + DELIVERY_FEE,
    };

    setLastOrder(orderReceipt);
    setCart([]);
    setShowCheckoutForm(false);
    setShowInvoice(true);
  };

  const categories = ['All', 'Fashion & Apparel', 'Artificial Jewelry', 'Bags & Accessories', 'Home Decoration', 'Shoes & Footwear', 'Watches', 'Toys & Games', 'Groceries & Food'];

  const brands = [
    { name: 'KHAADI', slug: 'khaadi-official', badge: 'Official Partner' },
    { name: 'SAPPHIRE', slug: 'sapphire-official', badge: 'Official Partner' },
    { name: 'SANA SAFINAZ', slug: 'sana-safinaz', badge: 'Official Partner' },
    { name: 'J. JUNAID JAMSHED', slug: 'j-official', badge: 'Official Partner' },
    { name: 'LIMELIGHT', slug: 'limelight-official', badge: 'Official Partner' },
    { name: 'NESTLÉ', slug: 'nestle-store', badge: 'Global Partner' },
    { name: 'TOYS GALAXY', slug: 'toys-galaxy', badge: 'Verified Partner' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-[#090807] text-[#E6DFD5] bg-grid font-sans selection:bg-[#D95D27] selection:text-white relative overflow-x-hidden">
      
      {/* Minimalist Editorial Navbar */}
      <nav className="bg-[#090807]/90 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center gap-6">
          
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#D95D27] to-amber-600 flex items-center justify-center text-white shadow-lg shadow-[#D95D27]/30 group-hover:scale-105 transition-all">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className="text-xl font-bold tracking-widest text-white uppercase font-sans flex items-center gap-1.5">
                  E-MALL <span className="text-[10px] text-[#D95D27] tracking-normal font-mono font-normal">PK</span>
                </span>
                <span className="text-[10px] text-gray-400 block -mt-1 font-medium">Digital Mall Platform</span>
              </div>
            </Link>

            <div className="hidden lg:flex items-center gap-2 text-[11px] text-gray-400 uppercase tracking-widest bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <MapPin className="w-3.5 h-3.5 text-[#D95D27]" />
              <span>Deliver to: <strong className="text-white">Lahore, PK</strong></span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Khaadi, Sapphire, Sana Safinaz, J., Nestle..."
              className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D95D27] transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-5 text-xs font-bold tracking-wider uppercase">
            <Link href="/track-order" className="hidden sm:inline-block text-gray-400 hover:text-white transition-colors">
              Track Order
            </Link>
            <Link href="/register" className="hidden sm:inline-block text-gray-300 hover:text-[#D95D27] transition-colors">
              Become a Seller
            </Link>

            {user ? (
              <div className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                <span className="text-white text-xs">{user.name}</span>
                {user.role === 'SELLER' && (
                  <Link href="/seller/dashboard" className="px-3 py-1 bg-[#D95D27] text-white text-[10px] rounded-full">
                    Hub
                  </Link>
                )}
                <button onClick={() => { localStorage.removeItem('user'); setUser(null); }} className="text-gray-500 hover:text-red-400">
                  Exit
                </button>
              </div>
            ) : (
              <Link href="/login" className="px-5 py-2.5 bg-white/10 hover:bg-white/20 text-white rounded-full border border-white/10 transition-all">
                Sign In
              </Link>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2.5 bg-[#D95D27] hover:bg-[#c44e1d] text-white rounded-full shadow-lg shadow-[#D95D27]/20 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-white text-[#090807] text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-24 px-8 text-center border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D95D27] block mb-4">
            The Prestige Marketplace
          </span>

          <h1 className="text-5xl sm:text-7xl lg:text-8xl font-serif font-normal text-white tracking-tight leading-[1.05] mb-6">
            Endless Brands. <br />
            <span className="italic text-[#E6DFD5] font-light">One Easy Checkout.</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed mb-10">
            Why visit ten stores? Skip the mall rush—your favorite stores live here now. One order. Zero hassle. All the brands you love.
          </p>

          <div className="flex flex-wrap justify-center gap-6 text-xs text-gray-300 font-medium">
            <div className="flex items-center gap-2 bg-white/5 px-5 py-3 rounded-full border border-white/10 backdrop-blur-xl">
              <Truck className="w-4 h-4 text-[#D95D27]" />
              <span>Lahore Express Delivery (PKR 195)</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-5 py-3 rounded-full border border-white/10 backdrop-blur-xl">
              <Tag className="w-4 h-4 text-emerald-400" />
              <span>PKR 50 Buyer Protection Fee</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Ticker */}
      <div className="border-b border-white/10 bg-black/40 py-5 overflow-hidden">
        <div className="flex items-center gap-12 animate-marquee whitespace-nowrap">
          {[...brands, ...brands, ...brands].map((b, idx) => (
            <Link
              key={idx}
              href={`/shop/${b.slug}`}
              className="flex items-center gap-3 text-gray-400 hover:text-white transition-colors cursor-pointer group"
            >
              <span className="text-sm font-black tracking-[0.2em] font-sans group-hover:text-[#D95D27] transition-colors">{b.name}</span>
              <span className="text-[9px] bg-white/10 text-gray-300 px-2.5 py-0.5 rounded-full font-mono">{b.badge}</span>
              <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[#D95D27]" />
            </Link>
          ))}
        </div>
      </div>

      {/* Catalog */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#D95D27] uppercase block mb-1">Curated Inventory</span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white">Marketplace Catalog</h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-5 py-2 rounded-full text-xs font-bold tracking-wider transition-all border ${
                  selectedCategory === cat
                    ? 'bg-[#D95D27] text-white border-[#D95D27] shadow-lg shadow-[#D95D27]/30'
                    : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Grid */}
        <div className="mt-12 mb-28">
          {filteredProducts.length === 0 ? (
            <div className="bg-white/5 border border-white/10 rounded-3xl p-20 text-center text-gray-400 font-serif text-lg">
              No products found.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => {
                let images = [];
                try { images = JSON.parse(product.images || '[]'); } catch (e) { images = [product.images]; }
                const displayImg = images[0] || 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=600';
                const isOutOfStock = product.stock <= 0;

                return (
                  <div
                    key={product.id}
                    className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-[#D95D27]/50 hover:bg-white/10 transition-all duration-500 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-64 w-full overflow-hidden bg-black/60">
                        <img
                          src={displayImg}
                          alt={product.title}
                          className={`w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ${isOutOfStock ? 'opacity-40 grayscale' : 'opacity-90 group-hover:opacity-100'}`}
                        />
                        <div className="absolute top-3 left-3 bg-[#090807]/80 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[9px] font-bold text-gray-200 uppercase tracking-widest flex items-center gap-1.5">
                          <Store className="w-3 h-3 text-[#D95D27]" />
                          {product.shop?.name || 'Verified Partner'}
                        </div>

                        {isOutOfStock ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-black/60">
                            <span className="bg-red-600 text-white text-xs font-black px-4 py-1.5 rounded-full border border-red-400 shadow-xl uppercase tracking-widest">
                              Out of Stock
                            </span>
                          </div>
                        ) : (
                          <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-bold text-amber-300">
                            ★ 5.0
                          </div>
                        )}
                      </div>

                      <div className="p-6">
                        <h3 className="text-base font-bold text-white group-hover:text-[#D95D27] transition-colors line-clamp-1 font-sans">
                          {product.title}
                        </h3>
                        <p className="text-gray-400 text-xs mt-2 line-clamp-2 leading-relaxed font-light">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-gray-500 block tracking-widest">Price</span>
                          <span className="text-xl font-extrabold text-white">PKR {product.price.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          disabled={isOutOfStock}
                          className="px-5 py-2.5 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-bold text-xs rounded-full shadow-lg shadow-[#D95D27]/20 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
                        >
                          {isOutOfStock ? 'Sold Out' : '+ Add'}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Floating Support Button */}
      <button
        onClick={() => setShowSupport(!showSupport)}
        className="fixed bottom-8 right-8 z-50 bg-[#D95D27] hover:bg-[#c44e1d] text-white px-5 py-3.5 rounded-full shadow-2xl font-bold text-xs flex items-center gap-2 border border-white/20 transition-all"
      >
        <MessageCircle className="w-4 h-4 text-amber-200" />
        <span>24/7 Support</span>
      </button>

      {/* Support Pop-up */}
      {showSupport && (
        <div className="fixed bottom-24 right-8 z-50 bg-[#090807] border border-white/10 p-6 rounded-3xl shadow-2xl w-80 text-xs text-gray-300 space-y-4 backdrop-blur-2xl">
          <div className="flex justify-between items-center border-b border-white/10 pb-3">
            <h3 className="font-bold text-white text-sm font-serif">E-Mall Support Hub</h3>
            <button onClick={() => setShowSupport(false)} className="text-gray-500 hover:text-white font-bold">✕</button>
          </div>
          <p className="text-gray-400 text-[11px] leading-relaxed">
            Need help with your multi-brand order or seller onboarding? Contact E-Mall team:
          </p>
          <div className="space-y-2">
            <a href="https://wa.me/923000000000" target="_blank" rel="noreferrer" className="flex items-center gap-3 bg-emerald-950/60 border border-emerald-800/40 p-3 rounded-2xl text-emerald-300 font-bold">
              <MessageCircle className="w-4 h-4 text-emerald-400" />
              <span>WhatsApp Live Support</span>
            </a>
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-2xl border border-white/10 text-gray-300">
              <Mail className="w-4 h-4 text-[#D95D27]" />
              <span>support@emall.pk</span>
            </div>
          </div>
        </div>
      )}

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-end z-50">
          <div className="bg-[#090807] border-l border-white/10 w-full max-w-md h-full p-8 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#D95D27]" />
                  <h3 className="text-lg font-bold text-white font-serif">Unified Multi-Vendor Cart</h3>
                </div>
                <button onClick={() => setShowCart(false)} className="p-1 text-gray-400 hover:text-white">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20 text-gray-500 text-sm font-serif">Your cart is currently empty.</div>
              ) : (
                <div className="mt-6 space-y-3">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
                      <div>
                        <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                        <span className="text-[10px] font-bold text-[#D95D27] block mt-0.5">
                          Shop: {item.shop?.name || 'Verified Partner'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold text-white">PKR {item.price.toLocaleString()}</span>
                        <button onClick={() => removeFromCart(idx)} className="text-xs text-red-400">✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-white/10 pt-6 mt-6 space-y-3 text-xs text-gray-400">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-white">PKR {calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#D95D27]">
                  <span>Buyer Protection Fee:</span>
                  <span className="font-bold">PKR {PLATFORM_FEE}</span>
                </div>
                <div className="flex justify-between text-indigo-400 font-semibold">
                  <span>Lahore Express Delivery Fee:</span>
                  <span className="font-bold">PKR {DELIVERY_FEE}</span>
                </div>
                <div className="flex justify-between text-base font-black text-white pt-3 border-t border-white/10">
                  <span>Total Amount:</span>
                  <span className="text-emerald-400">PKR {(calculateSubtotal() + PLATFORM_FEE + DELIVERY_FEE).toLocaleString()}</span>
                </div>

                <button
                  onClick={() => {
                    setShowCart(false);
                    setShowCheckoutForm(true);
                  }}
                  className="w-full py-4 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-extrabold text-sm rounded-full shadow-2xl shadow-[#D95D27]/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Delivery Address</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CUSTOMER CHECKOUT ADDRESS & PHONE FORM MODAL */}
      {showCheckoutForm && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#090807] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#D95D27] uppercase tracking-widest">Single-Box Delivery</span>
                <h3 className="text-xl font-serif text-white mt-1">Delivery Address & Contact</h3>
              </div>
              <button onClick={() => setShowCheckoutForm(false)} className="text-gray-500 hover:text-white font-bold">✕</button>
            </div>

            <form onSubmit={handleFinalCheckout} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Full Customer Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Muhammad Ali"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">WhatsApp / Contact Phone Number</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 0300 1234567"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">City</label>
                <select
                  value={customerCity}
                  onChange={(e) => setCustomerCity(e.target.value)}
                  className="w-full px-4 py-3 bg-[#090807] border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                >
                  <option value="Lahore">Lahore (Express Single-Box Rider)</option>
                  <option value="Karachi">Karachi</option>
                  <option value="Islamabad">Islamabad</option>
                  <option value="Rawalpindi">Rawalpindi</option>
                  <option value="Faisalabad">Faisalabad</option>
                  <option value="Multan">Multan</option>
                  <option value="Other">Other City in Pakistan</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Full Delivery Street Address</label>
                <textarea
                  rows={2}
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="House #, Street #, Sector, Area Name..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Order Notes (Optional)</label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="e.g. Call before arrival / leave at security gate"
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                />
              </div>

              <div className="pt-2 border-t border-white/10 flex justify-between items-center text-xs text-gray-300">
                <span>Total Cash on Delivery:</span>
                <span className="text-emerald-400 font-extrabold text-sm">
                  PKR {(calculateSubtotal() + PLATFORM_FEE + DELIVERY_FEE).toLocaleString()}
                </span>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-extrabold text-sm rounded-full shadow-2xl shadow-[#D95D27]/30 transition-all"
              >
                Confirm & Place Cash on Delivery Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Receipt Modal */}
      {showInvoice && lastOrder && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#090807] border border-white/10 rounded-3xl p-8 max-w-lg w-full shadow-2xl text-xs space-y-6">
            <div className="flex justify-between items-start border-b border-white/10 pb-4">
              <div>
                <span className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  Order Confirmed ✓
                </span>
                <h3 className="text-2xl font-serif text-white mt-2">Digital Invoice Receipt</h3>
                <p className="text-gray-500 text-[11px] mt-0.5">Order ID: {lastOrder.orderId} • {lastOrder.date}</p>
              </div>
              <button onClick={() => setShowInvoice(false)} className="text-gray-500 hover:text-white font-bold text-base">✕</button>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95D27]">Customer Delivery Details:</span>
              <p className="text-white font-bold text-xs mt-1">{lastOrder.customerName} ({lastOrder.customerPhone})</p>
              <p className="text-gray-400 text-[11px]">{lastOrder.customerAddress}, {lastOrder.customerCity}</p>
              {lastOrder.orderNotes && <p className="text-amber-400/90 text-[10px] italic mt-1">Note: "{lastOrder.orderNotes}"</p>}
            </div>

            <div className="space-y-4">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95D27]">
                Multi-Vendor Sub-Orders Breakdown:
              </span>

              {Object.values(lastOrder.shopBreakdown).map((sub: any, idx: number) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between font-bold text-white text-xs border-b border-white/10 pb-2">
                    <span className="flex items-center gap-1.5 text-[#D95D27]">
                      <Store className="w-3.5 h-3.5" />
                      {sub.shopName}
                    </span>
                    <span>Subtotal: PKR {sub.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-gray-400">
                    {sub.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between">
                        <span>• {item.title}</span>
                        <span className="text-gray-200">PKR {item.price.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] text-amber-400/90 pt-1 border-t border-white/5 flex justify-between">
                    <span>5% Vendor Commission Kept by E-Mall:</span>
                    <span className="font-bold">PKR {sub.commission.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-white/10 pt-4 space-y-2 text-gray-300">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold text-white">PKR {lastOrder.itemsSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#D95D27]">
                <span>Buyer Protection Fee:</span>
                <span className="font-bold">PKR {lastOrder.buyerFee}</span>
              </div>
              <div className="flex justify-between text-indigo-400">
                <span>Lahore Express Delivery Fee:</span>
                <span className="font-bold">PKR {lastOrder.buyerDeliveryFee}</span>
              </div>
              <div className="flex justify-between text-emerald-400 text-sm font-extrabold pt-2 border-t border-white/10">
                <span>Total Cash on Delivery:</span>
                <span>PKR {lastOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <div className="bg-[#D95D27]/10 border border-[#D95D27]/30 p-3 rounded-2xl text-[10px] text-gray-300 text-center leading-relaxed">
              📦 <strong>Single-Box Delivery:</strong> Items from all vendors consolidated at Lahore Center & delivered in 1 shipment!
            </div>

            <button
              onClick={() => setShowInvoice(false)}
              className="w-full py-3.5 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-bold rounded-full shadow-xl text-xs"
            >
              Done & Return to Mall
            </button>
          </div>
        </div>
      )}

      {/* LUXURY SAPPHIRE / SANA SAFINAZ 5-COLUMN FOOTER */}
      <footer className="bg-black/90 border-t border-white/10 mt-28 pt-16 pb-12 px-8 text-xs text-gray-400 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: Contact Us (Matching Sapphire Reference!) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] font-serif">Contact Us</h4>
            <div className="space-y-2 text-gray-400 text-[11px]">
              <p className="flex items-center gap-2 text-white">
                <Mail className="w-3.5 h-3.5 text-[#D95D27]" />
                <span>support@emall.pk</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>+92(0)42 323-882-45</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>+92(0)42 111-738-245</span>
              </p>
              <p className="text-gray-500 pt-1">Lahore Fulfillment Hub, Punjab, Pakistan</p>
            </div>
          </div>

          {/* Col 2: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] font-serif">Customer Care</h4>
            <ul className="space-y-2 text-gray-400 text-[11px]">
              <li><Link href="/track-order" className="hover:text-[#D95D27] transition-colors">Track Your Order</Link></li>
              <li><Link href="/" className="hover:text-[#D95D27] transition-colors">Exchange & Return Policy</Link></li>
              <li><Link href="/" className="hover:text-[#D95D27] transition-colors">Single-Box Delivery Guarantee</Link></li>
              <li><Link href="/" className="hover:text-[#D95D27] transition-colors">FAQs & Support</Link></li>
            </ul>
          </div>

          {/* Col 3: Company / Information */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] font-serif">Information</h4>
            <ul className="space-y-2 text-gray-400 text-[11px]">
              <li><Link href="/register" className="hover:text-[#D95D27] transition-colors">Become a Seller (5% Fee)</Link></li>
              <li><Link href="/login" className="hover:text-[#D95D27] transition-colors">Partner Store Sign In</Link></li>
              <li><Link href="/admin/dashboard" className="hover:text-[#D95D27] transition-colors">Super Admin Master Hub</Link></li>
              <li><Link href="/" className="hover:text-[#D95D27] transition-colors">Privacy & Cookie Policy</Link></li>
            </ul>
          </div>

          {/* Col 4: Delivery Partners */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] font-serif">Logistics Partners</h4>
            <p className="text-gray-500 text-[11px]">Authorized Delivery Partners in Pakistan:</p>
            <div className="flex items-center gap-2 pt-1">
              <span className="bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1 rounded-lg font-black text-xs">
                SKYNET Express
              </span>
              <span className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-3 py-1 rounded-full font-black text-xs">
                TCS Logistics
              </span>
            </div>
          </div>

          {/* Col 5: Newsletter Signup (Matching Sana Safinaz Reference!) */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] font-serif">Newsletter Signup</h4>
            <p className="text-gray-400 text-[11px]">Subscribe to discover our latest multi-brand collections & sales</p>
            
            <form onSubmit={(e) => { e.preventDefault(); setNewsletterSuccess(true); }} className="space-y-2">
              <div className="flex bg-white/5 border border-white/10 rounded-full p-1 focus-within:border-[#D95D27]">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  className="w-full px-4 py-2 bg-transparent text-xs text-white placeholder-gray-500 focus:outline-none"
                />
                <button type="submit" className="px-5 py-2 bg-[#D95D27] text-white font-extrabold text-[10px] rounded-full uppercase tracking-wider">
                  Subscribe
                </button>
              </div>
              {newsletterSuccess && <p className="text-emerald-400 text-[10px] font-bold">Subscribed successfully! 🎉</p>}
            </form>
          </div>
        </div>

        {/* Footer Bottom Bar */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
          <p>© COPYRIGHT 2026 E-MALL PAKISTAN. CREATED BY HARIS KHAN. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-3 text-gray-400 font-bold">
            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">Cash on Delivery</span>
            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">UnionPay</span>
            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">MasterCard</span>
            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">VISA</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
