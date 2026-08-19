'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  Search,
  ShoppingBag,
  Store,
  MapPin,
  X,
  ArrowRight,
  Truck,
  MessageCircle,
  Building2,
  Sparkles,
  Gift,
  CreditCard,
  Plus
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
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  // Customer Form & Payment Method Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'COD' | 'PREPAID'>('PREPAID');

  const fetchProducts = async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error('Failed to load live products:', err);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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
  const COD_DELIVERY_FEE = 195;
  const deliveryFee = paymentMethod === 'PREPAID' ? 0 : COD_DELIVERY_FEE;

  const handleFinalCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const shopBreakdown: any = {};
    let totalHardworkProfit = 0; // 5% profit

    cart.forEach((item) => {
      const shopName = item.shop?.name || 'Verified Brand Partner';
      const profitAmount = (item.price * 5.0) / 100;
      totalHardworkProfit += profitAmount;

      if (!shopBreakdown[shopName]) {
        shopBreakdown[shopName] = {
          shopName,
          items: [],
          subtotal: 0,
          profitMargin: 0,
        };
      }
      shopBreakdown[shopName].items.push(item);
      shopBreakdown[shopName].subtotal += item.price;
      shopBreakdown[shopName].profitMargin += profitAmount;
    });

    const itemsSubtotal = calculateSubtotal();
    const totalAmount = itemsSubtotal + PLATFORM_FEE + deliveryFee;

    const orderReceipt = {
      orderId: `EMALL-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-PK', { day: 'numeric', month: 'short', year: 'numeric' }),
      customerName,
      customerPhone,
      customerAddress,
      paymentMethod,
      cartItems: [...cart],
      shopBreakdown,
      itemsSubtotal,
      buyerFee: PLATFORM_FEE,
      buyerDeliveryFee: deliveryFee,
      totalHardworkProfit,
      totalAmount,
    };

    setLastOrder(orderReceipt);
    setCart([]);
    setShowCheckoutForm(false);
    setShowInvoice(true);
  };

  const categories = ['All', 'Fashion & Apparel', 'Perfumes & Accessories', 'Shoes & Footwear'];

  const brands = [
    { name: 'ALL BRANDS', filter: 'All', badge: 'Catalog' },
    { name: 'KHAADI', filter: 'Khaadi Official', badge: 'Official' },
    { name: 'BREAKOUT', filter: 'Breakout Official', badge: 'Official' },
    { name: 'SAPPHIRE', filter: 'Sapphire Official', badge: 'Partner' },
    { name: 'SAYA', filter: 'SAYA Official', badge: 'Partner' },
    { name: 'ETHNIC', filter: 'ETHNIC Official', badge: 'Partner' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category?.name === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || p.shop?.name === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <div className="min-h-screen bg-[#090807] text-[#E6DFD5] bg-grid font-sans selection:bg-[#D95D27] selection:text-white relative overflow-x-hidden">
      
      {/* PROMO BANNER FOR FREE PREPAID DELIVERY */}
      {showPromoBanner && (
        <div className="bg-gradient-to-r from-amber-600 via-[#D95D27] to-amber-700 text-white text-[11px] font-bold py-2.5 px-4 text-center relative flex items-center justify-center gap-2 shadow-lg z-50">
          <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
          <span>
            🎉 <strong>SPECIAL PROMO:</strong> Enjoy <strong>FREE DELIVERY</strong> on all <strong>Prepaid Orders!</strong> (Cash on Delivery: PKR 195).
          </span>
          <button onClick={() => setShowPromoBanner(false)} className="absolute right-4 text-white/80 hover:text-white font-bold text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Navbar */}
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
              <span>Deliver to: <strong className="text-white">Lahore & All Pakistan</strong></span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Khaadi, Breakout, Sapphire, Saya, Ethnic..."
              className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D95D27] transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 text-xs font-bold tracking-wider uppercase">
            <Link
              href="/admin/add-product"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-white/10 hover:bg-white/20 text-amber-300 rounded-full border border-amber-500/30 transition-all text-[11px]"
            >
              <Plus className="w-3.5 h-3.5 text-amber-400" />
              <span>Admin Portal</span>
            </Link>

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
      <div className="relative py-20 px-8 text-center border-b border-white/10">
        <div className="max-w-4xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D95D27] block mb-4">
            Official Multi-Brand Destination
          </span>

          <h1 className="text-5xl sm:text-7xl font-serif font-normal text-white tracking-tight leading-[1.05] mb-6">
            Endless Brands. <br />
            <span className="italic text-[#E6DFD5] font-light">One Easy Checkout.</span>
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed mb-8">
            Shop directly from verified brand stores in one single cart with 100% original brand guarantee.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-300 font-medium">
            <div className="flex items-center gap-2 bg-emerald-950/50 border border-emerald-500/30 text-emerald-300 px-5 py-3 rounded-full backdrop-blur-xl">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>FREE Delivery on All Prepaid Orders</span>
            </div>
            <div className="flex items-center gap-2 bg-white/5 px-5 py-3 rounded-full border border-white/10 backdrop-blur-xl">
              <Truck className="w-4 h-4 text-[#D95D27]" />
              <span>Cash on Delivery: PKR 195</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Filter Bar */}
      <div className="border-b border-white/10 bg-black/40 py-5 overflow-hidden">
        <div className="flex items-center justify-center gap-4 flex-wrap px-4">
          {brands.map((b, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedBrand(b.filter)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs transition-all border ${
                selectedBrand === b.filter
                  ? 'bg-[#D95D27] text-white border-[#D95D27] shadow-lg shadow-[#D95D27]/30 font-bold'
                  : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
              }`}
            >
              <span className="tracking-widest font-sans">{b.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Catalog */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-white/10 pb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#D95D27] uppercase block mb-1">
              {selectedBrand === 'All' ? 'Curated Inventory' : `${selectedBrand}`}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-white">
              {selectedBrand === 'All' ? `All Active Items (${filteredProducts.length})` : `${selectedBrand} Collection`}
            </h2>
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
              No products found for this filter.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
              {filteredProducts.map((product) => {
                let images = [];
                try { images = JSON.parse(product.images || '[]'); } catch (e) { images = [product.images]; }
                const displayImg = images[0] || 'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800';

                return (
                  <div
                    key={product.id}
                    className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-[#D95D27]/50 hover:bg-white/10 transition-all duration-500 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-80 w-full overflow-hidden bg-black/60">
                        <img
                          src={displayImg}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90 group-hover:opacity-100"
                        />
                        <div className="absolute top-3 left-3 bg-[#090807]/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-[10px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5 shadow-lg">
                          <Store className="w-3 h-3 text-[#D95D27]" />
                          {product.shop?.name || 'Verified Partner'}
                        </div>

                        <div className="absolute top-3 right-3 bg-emerald-950/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-500/40 text-[9px] font-bold text-emerald-300">
                          100% Original
                        </div>
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
                          <span className="text-[9px] uppercase font-bold text-gray-500 block tracking-widest">Original Retail</span>
                          <span className="text-xl font-extrabold text-white">PKR {product.price.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="px-5 py-2.5 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-bold text-xs rounded-full shadow-lg shadow-[#D95D27]/20 transition-all"
                        >
                          + Add to Cart
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

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-end z-50">
          <div className="bg-[#090807] border-l border-white/10 w-full max-w-md h-full p-8 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-5 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#D95D27]" />
                  <h3 className="text-lg font-bold text-white font-serif">Your Multi-Brand Cart</h3>
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
                          Brand: {item.shop?.name}
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

                <button
                  onClick={() => {
                    setShowCart(false);
                    setShowCheckoutForm(true);
                  }}
                  className="w-full py-4 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-extrabold text-sm rounded-full shadow-2xl shadow-[#D95D27]/30 transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT FORM MODAL WITH PREPAID vs COD SWITCH */}
      {showCheckoutForm && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#090807] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#D95D27] uppercase tracking-widest">Single-Box Consolidated Delivery</span>
                <h3 className="text-xl font-serif text-white mt-1">Delivery & Payment Details</h3>
              </div>
              <button onClick={() => setShowCheckoutForm(false)} className="text-gray-500 hover:text-white font-bold">✕</button>
            </div>

            <form onSubmit={handleFinalCheckout} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Full Name</label>
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
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">WhatsApp Phone Number</label>
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
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Select Payment Option</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('PREPAID')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'PREPAID'
                        ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                      <span className="text-[9px] bg-emerald-500 text-black font-black px-1.5 py-0.5 rounded">FREE SHIPPING</span>
                    </div>
                    <div className="mt-2">
                      <p className="font-bold text-xs text-white">Prepaid Order</p>
                      <p className="text-[9px] text-emerald-300">JazzCash / EasyPaisa / Bank</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all ${
                      paymentMethod === 'COD'
                        ? 'bg-[#D95D27]/20 border-[#D95D27] text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <Truck className="w-4 h-4 text-[#D95D27]" />
                      <span className="text-[9px] bg-white/10 text-gray-300 px-1.5 py-0.5 rounded">+ PKR 195</span>
                    </div>
                    <div className="mt-2">
                      <p className="font-bold text-xs text-white">Cash on Delivery</p>
                      <p className="text-[9px] text-gray-400">Pay upon rider arrival</p>
                    </div>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Full Street Address & City</label>
                <textarea
                  rows={2}
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="House #, Street Name, Sector, City..."
                  className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                />
              </div>

              <div className="pt-2 border-t border-white/10 space-y-1 text-xs">
                <div className="flex justify-between text-gray-400">
                  <span>Delivery Fee:</span>
                  <span className={paymentMethod === 'PREPAID' ? 'text-emerald-400 font-bold' : 'text-white font-bold'}>
                    {paymentMethod === 'PREPAID' ? 'FREE (PKR 0)' : 'PKR 195'}
                  </span>
                </div>
                <div className="flex justify-between items-center text-white font-extrabold text-sm pt-1">
                  <span>Total Payable:</span>
                  <span className="text-emerald-400">
                    PKR {(calculateSubtotal() + PLATFORM_FEE + deliveryFee).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-extrabold text-sm rounded-full shadow-2xl shadow-[#D95D27]/30 transition-all mt-2"
              >
                Confirm & Submit Order
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
                  Order Submitted ✓
                </span>
                <h3 className="text-2xl font-serif text-white mt-2">Order Invoice Receipt</h3>
                <p className="text-gray-500 text-[11px] mt-0.5">Order ID: {lastOrder.orderId} • {lastOrder.date}</p>
              </div>
              <button onClick={() => setShowInvoice(false)} className="text-gray-500 hover:text-white font-bold text-base">✕</button>
            </div>

            <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95D27]">Customer Details:</span>
                <span className="text-[10px] font-bold bg-white/10 px-2 py-0.5 rounded text-emerald-300">
                  {lastOrder.paymentMethod === 'PREPAID' ? 'Prepaid (Free Delivery)' : 'Cash on Delivery'}
                </span>
              </div>
              <p className="text-white font-bold text-xs mt-1">{lastOrder.customerName} ({lastOrder.customerPhone})</p>
              <p className="text-gray-400 text-[11px]">{lastOrder.customerAddress}</p>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#D95D27]">
                Ordered Brand Items:
              </span>

              {Object.values(lastOrder.shopBreakdown).map((sub: any, idx: number) => (
                <div key={idx} className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between font-bold text-white text-xs border-b border-white/10 pb-2">
                    <span className="text-[#D95D27]">{sub.shopName}</span>
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
                  <div className="text-[10px] text-amber-400 pt-1 border-t border-white/5 flex justify-between font-bold">
                    <span>5% Service & Sourcing Margin:</span>
                    <span>PKR {sub.profitMargin.toFixed(2)}</span>
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
                <span>Delivery Charge:</span>
                <span className="font-bold">
                  {lastOrder.buyerDeliveryFee === 0 ? 'FREE (Prepaid Offer)' : `PKR ${lastOrder.buyerDeliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-emerald-400 text-sm font-extrabold pt-2 border-t border-white/10">
                <span>Total Amount:</span>
                <span>PKR {lastOrder.totalAmount.toLocaleString()}</span>
              </div>
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

      {/* Footer */}
      <footer className="bg-black/90 border-t border-white/10 mt-28 pt-16 pb-12 px-8 text-xs text-gray-400 font-sans">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
          <p>© COPYRIGHT 2026 E-MALL PAKISTAN. CREATED BY HARIS KHAN. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-3 text-gray-400 font-bold">
            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">Cash on Delivery</span>
            <span className="bg-white/5 border border-white/10 px-2.5 py-1 rounded-lg">JazzCash / EasyPaisa</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
