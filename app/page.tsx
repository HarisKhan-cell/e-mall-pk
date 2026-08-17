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
  User,
  Star,
  ShieldCheck,
  Tag,
  Sparkles,
  X,
  ArrowRight,
  Truck
} from 'lucide-react';

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [orderSuccess, setOrderSuccess] = useState('');
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    fetchProducts();
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
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

  const handleCheckout = () => {
    if (cart.length === 0) return;
    setOrderSuccess('Order Placed Successfully via Cash on Delivery! 🎉 Sub-orders generated for each vendor.');
    setCart([]);
    setTimeout(() => {
      setOrderSuccess('');
      setShowCart(false);
    }, 4000);
  };

  const categories = ['All', 'Toys & Games', 'Fashion & Apparel', 'Electronics & Gadgets', 'Groceries & Food'];

  const brands = [
    { name: 'Khaadi', logo: '👗', badge: 'Official Brand' },
    { name: 'Sapphire', logo: '✨', badge: 'Official Brand' },
    { name: 'J.', logo: '👔', badge: 'Official Brand' },
    { name: 'Nestle', logo: '🥛', badge: 'Global Brand' },
    { name: 'Toys Galaxy', logo: '🧸', badge: 'Verified Partner' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category?.name === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-indigo-500 selection:text-white">
      
      {/* Top Banner Notice */}
      <div className="bg-gradient-to-r from-indigo-700 via-purple-700 to-pink-700 text-white text-xs py-2 px-4 text-center font-bold tracking-wide flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 animate-pulse text-amber-300" />
        <span>E-MALL PAKISTAN LAUNCH SPECIAL: Flat PKR 50 Buyer Protection Fee across all multi-vendor orders!</span>
      </div>

      {/* Navbar */}
      <nav className="bg-slate-900/80 backdrop-blur-xl border-b border-slate-800 sticky top-0 z-40 shadow-2xl">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-4">
          
          {/* Logo & City Location */}
          <div className="flex items-center gap-6">
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-2xl bg-indigo-600 flex items-center justify-center font-black text-xl text-white shadow-lg shadow-indigo-500/30 group-hover:scale-105 transition-all">
                E
              </div>
              <div>
                <span className="text-xl font-black text-white tracking-wider flex items-center gap-1">
                  E-MALL <span className="text-xs bg-indigo-500/20 text-indigo-400 px-2 py-0.5 rounded-full border border-indigo-500/30">PK</span>
                </span>
                <span className="text-[10px] text-slate-400 block -mt-1 font-medium">Digital Shopping Mall</span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1.5 text-xs text-slate-400 bg-slate-800/60 px-3 py-1.5 rounded-full border border-slate-700/60">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              <span>Deliver to: <strong className="text-slate-200">Lahore, PK</strong></span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-lg relative hidden sm:block">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search products, brands (Khaadi, Toys Galaxy, J.)..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-800 rounded-2xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all shadow-inner"
            />
          </div>

          {/* Action Navigation */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="flex items-center gap-3 bg-slate-800/80 px-3.5 py-1.5 rounded-2xl border border-slate-700/80">
                <div className="w-7 h-7 rounded-full bg-indigo-600 flex items-center justify-center font-bold text-xs">
                  {user.name?.charAt(0) || 'U'}
                </div>
                <div className="text-left hidden lg:block">
                  <span className="text-xs font-bold text-slate-200 block line-clamp-1">{user.name}</span>
                  <span className="text-[10px] text-indigo-400 font-semibold block uppercase">{user.role}</span>
                </div>
                {user.role === 'SELLER' && (
                  <Link
                    href="/seller/dashboard"
                    className="ml-1 px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition-all shadow-md flex items-center gap-1"
                  >
                    <Store className="w-3.5 h-3.5" />
                    <span>Hub</span>
                  </Link>
                )}
                <button
                  onClick={() => {
                    localStorage.removeItem('user');
                    setUser(null);
                  }}
                  className="text-xs text-slate-400 hover:text-red-400 transition-colors ml-1"
                >
                  Exit
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  href="/login"
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold rounded-xl border border-slate-700 transition-all"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition-all"
                >
                  Join Mall
                </Link>
              </div>
            )}

            {/* Cart Button */}
            <button
              onClick={() => setShowCart(true)}
              className="relative p-2.5 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl transition-all shadow-md group"
            >
              <ShoppingBag className="w-5 h-5 text-indigo-400 group-hover:scale-110 transition-transform" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-indigo-500 text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center border-2 border-slate-900 shadow-md">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Banner Section */}
      <div className="relative overflow-hidden bg-gradient-to-b from-indigo-950/50 via-slate-950 to-slate-950 border-b border-slate-800/80 py-16 px-6">
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-bold px-4 py-1.5 rounded-full mb-6 shadow-inner">
            <ShieldCheck className="w-4 h-4 text-indigo-400" />
            <span>Unified Checkout Engine • Multi-Vendor Cart</span>
          </div>

          <h1 className="text-4xl sm:text-6xl font-black text-white tracking-tight leading-tight mb-4">
            Order From Multiple Brands <br className="hidden sm:block" />
            In <span className="bg-clip-text text-transparent bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400">One Single Checkout</span>
          </h1>

          <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto mb-8 font-normal leading-relaxed">
            Experience Pakistan's first complete digital mall. Buy authentic products from verified flagship brands and top sellers with 1-click Cash on Delivery.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs font-semibold text-slate-300">
            <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              <Truck className="w-4 h-4 text-indigo-400" />
              <span>Nationwide Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              <Tag className="w-4 h-4 text-emerald-400" />
              <span>PKR 50 Buyer Protection Fee</span>
            </div>
            <div className="flex items-center gap-2 bg-slate-900/80 px-4 py-2 rounded-xl border border-slate-800">
              <CheckCircle2 className="w-4 h-4 text-indigo-400" />
              <span>100% Authentic Sellers</span>
            </div>
          </div>
        </div>
      </div>

      {/* Brand Directory Showcase Strip */}
      <div className="max-w-7xl mx-auto px-6 -mt-6 relative z-20">
        <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-2xl backdrop-blur-xl flex items-center justify-between overflow-x-auto gap-4 scrollbar-none">
          <span className="text-xs font-extrabold text-slate-400 uppercase tracking-wider px-2 shrink-0">Official Mall Partners:</span>
          {brands.map((b, idx) => (
            <div key={idx} className="flex items-center gap-2 bg-slate-950 px-4 py-2 rounded-xl border border-slate-800 shrink-0 hover:border-indigo-500/50 transition-all cursor-pointer">
              <span className="text-lg">{b.logo}</span>
              <div>
                <span className="text-xs font-bold text-white block">{b.name}</span>
                <span className="text-[9px] text-indigo-400 font-semibold block uppercase">{b.badge}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Category Pills & Filters */}
      <div className="max-w-7xl mx-auto px-6 mt-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-slate-800 pb-6">
          <div>
            <h2 className="text-2xl font-black text-white tracking-tight">Marketplace Catalog</h2>
            <p className="text-slate-400 text-xs mt-0.5">Explore real-time products uploaded by verified mall vendors</p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                  selectedCategory === cat
                    ? 'bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/25'
                    : 'bg-slate-900 text-slate-400 border-slate-800 hover:text-white hover:border-slate-700'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="mt-8">
          {filteredProducts.length === 0 ? (
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-16 text-center">
              <Store className="w-12 h-12 text-slate-600 mx-auto mb-3" />
              <h3 className="text-lg font-bold text-slate-300 mb-1">No products found</h3>
              <p className="text-slate-500 text-xs max-w-sm mx-auto">
                No items match your search filter. Try selecting 'All' categories or searching another product.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => {
                let images = [];
                try {
                  images = JSON.parse(product.images || '[]');
                } catch (e) {
                  images = [product.images];
                }
                const displayImg = images[0] || 'https://images.unsplash.com/photo-1566576912321-d58ddd7a6088?q=80&w=500';

                return (
                  <div
                    key={product.id}
                    className="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-xl hover:border-indigo-500/50 hover:shadow-2xl hover:shadow-indigo-500/10 transition-all duration-300 group flex flex-col justify-between"
                  >
                    <div>
                      <div className="relative h-52 overflow-hidden bg-slate-950">
                        <img
                          src={displayImg}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                        <div className="absolute top-3 left-3 bg-slate-950/80 backdrop-blur-md px-3 py-1 rounded-full border border-slate-800 flex items-center gap-1.5 shadow-lg">
                          <Store className="w-3 h-3 text-indigo-400" />
                          <span className="text-[10px] font-bold text-indigo-300 tracking-wide uppercase">
                            {product.shop?.name || 'Toys Galaxy'}
                          </span>
                        </div>
                        <div className="absolute top-3 right-3 bg-slate-950/80 backdrop-blur-md px-2 py-1 rounded-full border border-slate-800 flex items-center gap-1">
                          <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                          <span className="text-[10px] font-bold text-amber-300">5.0</span>
                        </div>
                      </div>

                      <div className="p-5">
                        <h3 className="text-base font-bold text-white group-hover:text-indigo-300 transition-colors line-clamp-1">
                          {product.title}
                        </h3>
                        <p className="text-slate-400 text-xs mt-1.5 line-clamp-2 leading-relaxed">
                          {product.description || 'Authentic vendor item live on E-Mall Pakistan storefront.'}
                        </p>
                      </div>
                    </div>

                    <div className="p-5 pt-0">
                      <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between">
                        <div>
                          <span className="text-[10px] uppercase font-bold text-slate-500 block">Price</span>
                          <span className="text-xl font-black text-emerald-400">
                            PKR {product.price.toLocaleString()}
                          </span>
                        </div>
                        <button
                          onClick={() => addToCart(product)}
                          className="px-4 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs rounded-xl shadow-lg shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-1.5"
                        >
                          <ShoppingBag className="w-3.5 h-3.5" />
                          <span>+ Add</span>
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

      {/* Slide-Over Multi-Vendor Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex justify-end z-50 transition-opacity">
          <div className="bg-slate-900 border-l border-slate-800 w-full max-w-md h-full p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            
            <div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-800">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-indigo-400" />
                  <h3 className="text-lg font-extrabold text-white">Unified Multi-Vendor Cart</h3>
                </div>
                <button
                  onClick={() => setShowCart(false)}
                  className="p-1 rounded-xl bg-slate-800 text-slate-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {orderSuccess && (
                <div className="mt-4 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 rounded-2xl text-xs font-bold leading-relaxed flex items-start gap-2">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{orderSuccess}</span>
                </div>
              )}

              {cart.length === 0 ? (
                <div className="text-center py-16">
                  <ShoppingBag className="w-12 h-12 text-slate-700 mx-auto mb-3" />
                  <p className="text-slate-400 text-sm font-semibold">Your E-Mall cart is currently empty</p>
                  <p className="text-slate-500 text-xs mt-1">Explore vendors and add items to your cart.</p>
                </div>
              ) : (
                <div className="mt-4 space-y-3">
                  <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider block mb-2">
                    Cart Items ({cart.length})
                  </span>
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-slate-950 p-3.5 rounded-2xl border border-slate-800">
                      <div>
                        <h4 className="text-sm font-bold text-white line-clamp-1">{item.title}</h4>
                        <span className="text-[10px] font-bold text-indigo-400 flex items-center gap-1 mt-0.5">
                          <Store className="w-3 h-3" />
                          Shop: {item.shop?.name || 'Toys Galaxy'}
                        </span>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <span className="text-sm font-black text-emerald-400">PKR {item.price.toLocaleString()}</span>
                        <button
                          onClick={() => removeFromCart(idx)}
                          className="p-1 text-slate-500 hover:text-red-400 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-slate-800 pt-4 mt-6 space-y-3">
                <div className="space-y-1.5 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Items Subtotal:</span>
                    <span className="font-bold text-slate-200">PKR {calculateSubtotal().toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-indigo-400">
                    <span>Buyer Protection Platform Fee:</span>
                    <span className="font-bold">PKR {PLATFORM_FEE}</span>
                  </div>
                  <div className="flex justify-between text-base font-black text-white pt-2 border-t border-slate-800">
                    <span>Total Order Amount:</span>
                    <span className="text-emerald-400">PKR {(calculateSubtotal() + PLATFORM_FEE).toLocaleString()}</span>
                  </div>
                </div>

                <button
                  onClick={handleCheckout}
                  className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-500 text-white font-extrabold text-sm rounded-2xl shadow-xl shadow-indigo-600/30 transition-all flex items-center justify-center gap-2"
                >
                  <span>Place Order (Cash on Delivery)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-900 mt-20 py-12 px-6 text-slate-500 text-xs">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-xl bg-indigo-600 flex items-center justify-center font-bold text-white text-xs">E</div>
            <span className="font-bold text-slate-300">E-MALL PAKISTAN PLATFORM</span>
          </div>
          <p>© {new Date().getFullYear()} E-Mall PK. Multi-Vendor Shopping Marketplace Engine. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
