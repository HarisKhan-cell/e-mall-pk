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
  Plus,
  ShieldCheck,
  Award,
  FileText,
  Minus,
  Clock,
  Mail,
  Phone,
  Megaphone,
  UserPlus,
  CheckCircle2,
  Home,
  Layers,
  Settings,
  Baby,
  Smile
} from 'lucide-react';

function EMallLogoSymbol() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 32V8H22C25.3137 8 28 10.6863 28 14C28 17.3137 25.3137 20 22 20H14" stroke="#C8521B" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14 20V32M14 20H24C27.3137 20 30 22.6863 30 26C30 29.3137 27.3137 32 24 32H8" stroke="#1A1816" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="10" r="3" fill="#D49A37" />
    </svg>
  );
}

const INITIAL_PRODUCTS: any[] = [];


export default function HomePage() {
  const [products, setProducts] = useState<any[]>(INITIAL_PRODUCTS);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showSupport, setShowSupport] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [showPromoBanner, setShowPromoBanner] = useState(true);

  // Quick View Product Modal States
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0); // For multiple images
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedQty, setSelectedQty] = useState(1);
  const [isGiftWrap, setIsGiftWrap] = useState(false);

  // Customer Form & Payment Method Fields
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'PREPAID' | 'COD' | 'EXPRESS_COD'>('PREPAID');

  // Vendor Onboarding Form Fields
  const [vendorName, setVendorName] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorInsta, setVendorInsta] = useState('');
  const [vendorCity, setVendorCity] = useState('Lahore');
  const [vendorSuccess, setVendorSuccess] = useState(false);

  // UNIFIED MASTER STORE SYNC
  const syncMasterStore = () => {
    const c1 = localStorage.getItem('emall_custom_products');
    const c2 = localStorage.getItem('emall_active_products');
    const c3 = localStorage.getItem('emall_master_products');
    const activeStr = c1 || c2 || c3;

    if (activeStr) {
      try {
        const parsed = JSON.parse(activeStr);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setProducts(parsed);
          localStorage.setItem('emall_master_products', JSON.stringify(parsed));
          localStorage.setItem('emall_custom_products', JSON.stringify(parsed));
          return;
        }
      } catch (err) {}
    }
    localStorage.setItem('emall_master_products', JSON.stringify(INITIAL_PRODUCTS));
    setProducts(INITIAL_PRODUCTS);
  };

  useEffect(() => {
    // Force delete all old browser memory junk
    localStorage.removeItem('emall_custom_products');
    localStorage.removeItem('emall_active_products');
    localStorage.removeItem('emall_master_products');

    // Fetch live from Supabase Cloud Database
    fetch('/api/products', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setProducts(data);
        }
      })
      .catch(console.error);
  }, []);

  const handleOpenProduct = (product: any) => {
    setSelectedProduct(product);
    setActiveImageIndex(0); // Start at the first image
    setSelectedSize('M');
    setSelectedQty(1);
    setIsGiftWrap(false);
  };

  const handleAddToCartFromModal = () => {
    if (!selectedProduct) return;

    const cartItem = {
      ...selectedProduct,
      cartId: `${selectedProduct.id}-${selectedSize}-${Date.now()}`,
      selectedSize,
      quantity: selectedQty,
      isGiftWrap,
      price: selectedProduct.price,
      totalPrice: (selectedProduct.price * selectedQty) + (isGiftWrap ? 150 : 0)
    };

    setCart((prev) => [...prev, cartItem]);
    setSelectedProduct(null);
    setShowCart(true);
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const calculateSubtotal = () => {
    return cart.reduce((total, item) => total + item.totalPrice, 0);
  };

  const PLATFORM_FEE = 50;
  let deliveryFee = 0;
  if (paymentMethod === 'COD') deliveryFee = 195;
  if (paymentMethod === 'EXPRESS_COD') deliveryFee = 350;

  const handleFinalCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const shopBreakdown: any = {};
    let totalHardworkProfit = 0;

    cart.forEach((item) => {
      const shopName = item.shop?.name || 'Verified Brand Partner';
      const profitAmount = (item.price * item.quantity * 5.0) / 100;
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
      shopBreakdown[shopName].subtotal += item.totalPrice;
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
      status: 'Pending Dispatch'
    };

    // Await server POST and show alert if error occurs
    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderReceipt)
      });
      const resData = await res.json();
      if (!res.ok) {
        alert(`Supabase Order Error: ${resData.error || 'Failed to save order'}`);
      }
    } catch (err: any) {
      alert(`Network Error: ${err.message}`);
    }

    setLastOrder(orderReceipt);
    setCart([]);
    setShowCheckoutForm(false);
    setShowInvoice(true);
  };

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newApp = {
      vendorName,
      vendorPhone,
      vendorInsta,
      vendorCity,
      date: new Date().toLocaleDateString('en-PK')
    };

    try {
      const res = await fetch('/api/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newApp)
      });
      if (!res.ok) {
        const errData = await res.json();
        alert(`Vendor Error: ${errData.error || 'Failed to submit'}`);
      }
    } catch (err: any) {
      console.error('Vendor POST error:', err);
    }

    setVendorSuccess(true);
    setTimeout(() => {
      setVendorSuccess(false);
      setShowVendorModal(false);
      setVendorName('');
      setVendorPhone('');
      setVendorInsta('');
    }, 3000);
  };
  const categories = [
    'All',
    'Fashion & Apparel',
    'Beauty & Organic',
    'Baby & Kids',
    'Home & Lifestyle',
    'Perfumes & Accessories'
  ];

  const brands = [
    { name: 'ALL BRANDS', filter: 'All' },
    { name: 'KHAADI', filter: 'Khaadi Official' },
    { name: 'BREAKOUT', filter: 'Breakout Official' },
    { name: 'LAMA', filter: 'LAMA' },
    { name: 'AGHA NOOR', filter: 'Agha Noor Official' },
    { name: 'HEMANI', filter: 'Hemani Natural' },
    { name: 'ONE DOLLAR', filter: 'One Dollar Shop' },
    { name: 'BABY SECTION', filter: 'Baby Section' },
    { name: 'SAPPHIRE', filter: 'Sapphire Official' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category?.name === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || p.shop?.name === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1816] font-sans selection:bg-[#C8521B] selection:text-white relative overflow-x-hidden pb-20 md:pb-0">
      
      {/* PROMO BANNER FOR FREE PREPAID DELIVERY */}
      {showPromoBanner && (
        <div className="bg-[#C8521B] text-white text-[11px] font-bold py-2.5 px-4 text-center relative flex items-center justify-center gap-2 shadow-sm z-50">
          <Sparkles className="w-4 h-4 text-amber-200 animate-pulse" />
          <span>
            🎉 <strong>SPECIAL PROMO:</strong> Enjoy <strong>FREE DELIVERY</strong> on all <strong>Prepaid Orders!</strong> (Cash on Delivery: PKR 195 | Express 24H: PKR 350).
          </span>
          <button onClick={() => setShowPromoBanner(false)} className="absolute right-4 text-white/80 hover:text-white font-bold text-xs">
            ✕
          </button>
        </div>
      )}

      {/* Navbar */}
      <nav className="bg-[#FAF8F5]/90 backdrop-blur-2xl border-b border-[#E6E2D8] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-4 flex justify-between items-center gap-6">
          
          <div className="flex items-center gap-8">
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

            <div className="hidden lg:flex items-center gap-2 text-[11px] text-[#66615C] uppercase tracking-widest bg-white px-4 py-2 rounded-full border border-[#E6E2D8] shadow-sm">
              <MapPin className="w-3.5 h-3.5 text-[#C8521B]" />
              <span>Deliver to: <strong className="text-[#1A1816]">Lahore & All Pakistan</strong></span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md relative hidden md:block">
            <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search Khaadi, Breakout, Agha Noor, Hemani, LAMA..."
              className="w-full pl-11 pr-4 py-2.5 bg-white border border-[#E6E2D8] rounded-full text-xs text-[#1A1816] placeholder-gray-400 focus:outline-none focus:border-[#C8521B] transition-all shadow-sm"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 text-xs font-bold tracking-wider uppercase">
            <button
              onClick={() => setShowVendorModal(true)}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-emerald-50 hover:bg-emerald-100 text-emerald-900 rounded-full border border-emerald-200 transition-all text-[11px]"
            >
              <UserPlus className="w-3.5 h-3.5 text-emerald-700" />
              <span>Become a Seller</span>
            </button>

            <Link
              href="/admin/add-product"
              className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-white hover:bg-gray-50 text-[#1A1816] rounded-full border border-[#E6E2D8] transition-all text-[11px] shadow-sm"
            >
              <Plus className="w-3.5 h-3.5 text-[#C8521B]" />
              <span>Admin Portal</span>
            </Link>

            <button
              onClick={() => setShowCart(true)}
              className="relative p-2.5 bg-[#C8521B] hover:bg-[#a83e10] text-white rounded-full shadow-md shadow-[#C8521B]/20 transition-all"
            >
              <ShoppingBag className="w-4 h-4" />
              {cart.length > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#1A1816] text-white text-[10px] font-black w-5 h-5 rounded-full flex items-center justify-center shadow-md">
                  {cart.length}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative py-20 px-8 text-center border-b border-[#E6E2D8] overflow-hidden bg-[#F5F2EB]">
        <div className="relative z-10 max-w-4xl mx-auto space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#C8521B] block">
            Official Multi-Brand Destination
          </span>

          <h1 className="text-5xl sm:text-7xl font-serif font-normal text-[#1A1816] tracking-tight leading-[1.05]">
            Endless Brands. <br />
            <span className="italic text-[#66615C] font-light">One Easy Checkout.</span>
          </h1>

          <p className="text-[#66615C] text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed">
            Shop directly from Khaadi, Breakout, Agha Noor, Hemani, One Dollar Shop, and Baby Section in one single cart!
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-[#1A1816] font-medium pt-4">
            <div className="flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-900 px-5 py-3 rounded-full shadow-sm">
              <Gift className="w-4 h-4 text-emerald-700" />
              <span>FREE Delivery on All Prepaid Orders</span>
            </div>
            <div className="flex items-center gap-2 bg-white px-5 py-3 rounded-full border border-[#E6E2D8] shadow-sm">
              <Clock className="w-4 h-4 text-amber-600" />
              <span>VIP 24H Lahore Express Delivery (PKR 350)</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED VENDOR SPOTLIGHT */}
      <div className="max-w-7xl mx-auto px-8 my-10">
        <div className="bg-white border border-[#E6E2D8] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 border border-amber-200 flex items-center justify-center text-amber-700 font-bold">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <span className="bg-amber-100 text-amber-900 font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-widest block w-fit mb-1 border border-amber-200">
                Featured Vendor Spotlight
              </span>
              <h3 className="text-xl font-serif text-[#1A1816]">Agha Noor & Hemani Natural Collections</h3>
              <p className="text-[#66615C] text-xs mt-0.5">Explore luxury pret embroidery and 100% organic skincare serums.</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedBrand('Agha Noor Official')}
            className="px-6 py-3 bg-[#1A1816] hover:bg-black text-white font-extrabold text-xs rounded-full shadow-md uppercase tracking-wider transition-all whitespace-nowrap"
          >
            Explore Agha Noor ➔
          </button>
        </div>
      </div>

      {/* Brand Filter Bar */}
      <div className="border-b border-[#E6E2D8] bg-[#F5F2EB] py-4 overflow-hidden">
        <div className="flex items-center justify-center gap-3 flex-wrap px-4">
          {brands.map((b, idx) => (
            <button
              key={idx}
              onClick={() => setSelectedBrand(b.filter)}
              className={`flex items-center gap-2 px-5 py-2 rounded-full text-xs transition-all border ${
                selectedBrand === b.filter
                  ? 'bg-[#C8521B] text-white border-[#C8521B] shadow-md font-bold'
                  : 'bg-white text-[#66615C] border-[#E6E2D8] hover:text-[#1A1816] hover:border-[#1A1816]'
              }`}
            >
              <span className="tracking-widest font-sans">{b.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Catalog */}
      <div className="max-w-7xl mx-auto px-8 py-16">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 border-b border-[#E6E2D8] pb-8">
          <div>
            <span className="text-[10px] font-bold tracking-[0.25em] text-[#C8521B] uppercase block mb-1">
              {selectedBrand === 'All' ? 'Curated Inventory' : `${selectedBrand}`}
            </span>
            <h2 className="text-3xl sm:text-4xl font-serif font-normal text-[#1A1816]">
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
                    ? 'bg-[#1A1816] text-white border-[#1A1816]'
                    : 'bg-white text-[#66615C] border-[#E6E2D8] hover:text-[#1A1816]'
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
            <div className="bg-white border border-[#E6E2D8] rounded-3xl p-20 text-center text-[#66615C] font-serif text-lg">
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
                    onClick={() => handleOpenProduct(product)}
                    className="bg-white border border-[#E6E2D8] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:border-[#C8521B] transition-all duration-500 group flex flex-col justify-between cursor-pointer"
                  >
                    <div>
                      <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                        <img
                          src={displayImg}
                          alt={product.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-95 group-hover:opacity-100"
                        />
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E6E2D8] text-[10px] font-bold text-[#1A1816] uppercase tracking-widest flex items-center gap-1.5 shadow-sm">
                          <Store className="w-3 h-3 text-[#C8521B]" />
                          {product.shop?.name || 'Verified Partner'}
                        </div>

                        {/* NEW: IMAGE COUNT BADGE */}
                        {images.length > 1 && (
                          <div className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 rounded-lg text-[9px] font-bold tracking-widest uppercase">
                            +{images.length - 1} More Views
                          </div>
                        )}

                        <div className="absolute top-3 right-3 bg-emerald-50 text-emerald-900 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-200 text-[9px] font-bold">
                          100% Original
                        </div>
                      </div>

                      <div className="p-6">
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="text-base font-bold text-[#1A1816] group-hover:text-[#C8521B] transition-colors line-clamp-1 font-sans">
                            {product.title}
                          </h3>
                        </div>

                        <p className="text-[#66615C] text-xs line-clamp-2 leading-relaxed font-light">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="pt-4 border-t border-[#E6E2D8] flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-[#66615C] block tracking-widest">Original Retail</span>
                          <span className="text-xl font-extrabold text-[#1A1816]">PKR {product.price?.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenProduct(product);
                          }}
                          className="px-5 py-2.5 bg-[#C8521B] hover:bg-[#a83e10] text-white font-bold text-xs rounded-full shadow-md transition-all"
                        >
                          Select Size & Add
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

      {/* QUICK VIEW PRODUCT MODAL (RESTORED WITH MULTI-IMAGE GALLERY) */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#E6E2D8] rounded-3xl p-8 max-w-4xl w-full shadow-2xl text-xs space-y-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 p-2 text-gray-500 hover:text-black bg-gray-100 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* IMAGE GALLERY SECTION */}
              <div className="space-y-4">
                <div className="relative h-96 rounded-2xl overflow-hidden bg-gray-100 border border-[#E6E2D8]">
                  <img
                    src={
                      (() => {
                        let imgs = [];
                        try { imgs = JSON.parse(selectedProduct.images); } catch (e) { imgs = [selectedProduct.images]; }
                        return imgs[activeImageIndex] || imgs[0];
                      })()
                    }
                    alt={selectedProduct.title}
                    className="w-full h-full object-contain"
                  />
                  <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E6E2D8] text-[9px] font-bold text-[#1A1816] uppercase tracking-widest flex items-center gap-1.5">
                    <Store className="w-3 h-3 text-[#C8521B]" />
                    {selectedProduct.shop?.name}
                  </div>
                </div>

                {/* THUMBNAILS LIST */}
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {(() => {
                    let imgs = [];
                    try { imgs = JSON.parse(selectedProduct.images); } catch (e) { imgs = [selectedProduct.images]; }
                    return imgs.map((img: string, idx: number) => (
                      <img 
                        key={idx} 
                        src={img} 
                        onClick={() => setActiveImageIndex(idx)}
                        className={`w-16 h-16 rounded-xl object-cover cursor-pointer border-2 transition-all ${activeImageIndex === idx ? 'border-[#C8521B] scale-105' : 'border-transparent opacity-60 hover:opacity-100'}`} 
                      />
                    ));
                  })()}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-bold text-[#C8521B] uppercase tracking-widest">
                    {selectedProduct.category?.name || 'Verified Article'}
                  </span>
                  <h3 className="text-2xl font-serif text-[#1A1816] mt-1">{selectedProduct.title}</h3>
                  <p className="text-[#66615C] text-xs mt-2 leading-relaxed font-light">{selectedProduct.description}</p>
                </div>

                <div className="border-t border-b border-[#E6E2D8] py-3 flex justify-between items-center">
                  <span className="text-xs text-[#66615C]">Original Price:</span>
                  <span className="text-2xl font-black text-[#1A1816]">PKR {selectedProduct.price?.toLocaleString()}</span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1816] mb-2">
                    Select Option / Size:
                  </label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-11 h-11 rounded-xl text-xs font-bold transition-all border flex items-center justify-center ${
                          selectedSize === sz
                            ? 'bg-[#C8521B] text-white border-[#C8521B] shadow-md scale-105'
                            : 'bg-white text-[#66615C] border-[#E6E2D8] hover:text-[#1A1816]'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-[#1A1816] mb-2">
                    Quantity:
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                      className="w-10 h-10 rounded-xl bg-gray-100 border border-[#E6E2D8] flex items-center justify-center text-[#1A1816] hover:bg-gray-200 font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-base font-black text-[#1A1816] px-3">{selectedQty}</span>
                    <button
                      onClick={() => setSelectedQty(selectedQty + 1)}
                      className="w-10 h-10 rounded-xl bg-gray-100 border border-[#E6E2D8] flex items-center justify-center text-[#1A1816] hover:bg-gray-200 font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-3 p-3 bg-amber-50 border border-amber-200 rounded-xl cursor-pointer hover:bg-amber-100 transition-all">
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={(e) => setIsGiftWrap(e.target.checked)}
                    className="w-4 h-4 accent-[#C8521B] rounded"
                  />
                  <div>
                    <p className="font-bold text-amber-900 text-xs">Add Luxury Gift Box & Handwritten Card</p>
                    <p className="text-[10px] text-amber-700">+ PKR 150 (Festive Gift Wrap)</p>
                  </div>
                </label>

                <button
                  onClick={handleAddToCartFromModal}
                  className="w-full py-4 bg-[#C8521B] hover:bg-[#a83e10] text-white font-extrabold text-xs rounded-full shadow-lg transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add to Cart (PKR {((selectedProduct.price * selectedQty) + (isGiftWrap ? 150 : 0)).toLocaleString()})
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOCAL BOUTIQUE / SELLER ONBOARDING MODAL */}
      {showVendorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#E6E2D8] rounded-3xl p-8 max-w-md w-full shadow-2xl text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#E6E2D8] pb-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-widest">Vendor Registration</span>
                <h3 className="text-xl font-serif text-[#1A1816] mt-1">Partner with E-Mall Pakistan</h3>
              </div>
              <button onClick={() => setShowVendorModal(false)} className="text-gray-400 hover:text-black font-bold">✕</button>
            </div>

            {vendorSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-600 mx-auto" />
                <h4 className="text-sm font-bold text-emerald-900">Application Submitted!</h4>
                <p className="text-emerald-700 text-xs">Our Merchant Onboarding Team will WhatsApp you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleVendorSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Store / Brand Name</label>
                  <input
                    type="text"
                    required
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    placeholder="e.g. Amber's Pret Studio"
                    className="w-full px-4 py-3 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816] focus:outline-none focus:border-[#C8521B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">WhatsApp Contact Number</label>
                  <input
                    type="tel"
                    required
                    value={vendorPhone}
                    onChange={(e) => setVendorPhone(e.target.value)}
                    placeholder="e.g. 0300 1234567"
                    className="w-full px-4 py-3 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816] focus:outline-none focus:border-[#C8521B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Instagram Page / Website Link</label>
                  <input
                    type="text"
                    value={vendorInsta}
                    onChange={(e) => setVendorInsta(e.target.value)}
                    placeholder="e.g. instagram.com/brandname"
                    className="w-full px-4 py-3 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816] focus:outline-none focus:border-[#C8521B]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">City</label>
                  <select
                    value={vendorCity}
                    onChange={(e) => setVendorCity(e.target.value)}
                    className="w-full px-4 py-3 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816] focus:outline-none focus:border-[#C8521B]"
                  >
                    <option value="Lahore">Lahore (Single-Box Center)</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-xl text-[10px] text-emerald-800">
                  💡 <strong>Commission Rate:</strong> 10% Sourcing & Marketing Commission on items sold.
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-700 hover:bg-emerald-800 text-white font-extrabold text-xs rounded-full shadow-md transition-all uppercase tracking-wider"
                >
                  Submit Seller Application
                </button>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Floating Support Button */}
      <button
        onClick={() => setShowSupport(!showSupport)}
        className="fixed bottom-20 md:bottom-8 right-8 z-40 bg-[#1A1816] hover:bg-black text-white px-5 py-3.5 rounded-full shadow-2xl font-bold text-xs flex items-center gap-2 border border-white/20 transition-all"
      >
        <MessageCircle className="w-4 h-4 text-[#C8521B]" />
        <span>24/7 Support</span>
      </button>

      {/* Cart Drawer */}
      {showCart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-end z-50">
          <div className="bg-white border-l border-[#E6E2D8] w-full max-w-md h-full p-8 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-5 border-b border-[#E6E2D8]">
                <div className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[#C8521B]" />
                  <h3 className="text-lg font-bold text-[#1A1816] font-serif">Your Multi-Brand Cart</h3>
                </div>
                <button onClick={() => setShowCart(false)} className="p-1 text-gray-400 hover:text-black">
                  <X className="w-5 h-5" />
                </button>
              </div>

              {cart.length === 0 ? (
                <div className="text-center py-20 text-[#66615C] text-sm font-serif">Your cart is currently empty.</div>
              ) : (
                <div className="mt-6 space-y-3">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-4 rounded-2xl border border-[#E6E2D8]">
                      <div>
                        <h4 className="text-sm font-bold text-[#1A1816] line-clamp-1">{item.title}</h4>
                        <div className="flex items-center gap-2 text-[10px] mt-1">
                          <span className="bg-[#C8521B] text-white font-bold px-2 py-0.5 rounded">
                            Option: {item.selectedSize}
                          </span>
                          <span className="text-[#66615C]">Qty: {item.quantity}</span>
                          {item.isGiftWrap && <span className="text-amber-700 font-bold">🎁 Gift Wrapped</span>}
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 block mt-1">
                          Brand: {item.shop?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold text-[#1A1816]">PKR {item.totalPrice.toLocaleString()}</span>
                        <button onClick={() => removeFromCart(idx)} className="text-xs text-red-500">✕</button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {cart.length > 0 && (
              <div className="border-t border-[#E6E2D8] pt-6 mt-6 space-y-3 text-xs text-[#66615C]">
                <div className="flex justify-between">
                  <span>Subtotal:</span>
                  <span className="font-bold text-[#1A1816]">PKR {calculateSubtotal().toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-[#C8521B]">
                  <span>Buyer Protection Fee:</span>
                  <span className="font-bold">PKR {PLATFORM_FEE}</span>
                </div>

                <button
                  onClick={() => {
                    setShowCart(false);
                    setShowCheckoutForm(true);
                  }}
                  className="w-full py-4 bg-[#C8521B] hover:bg-[#a83e10] text-white font-extrabold text-sm rounded-full shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* CHECKOUT FORM MODAL WITH 3 DELIVERY OPTIONS */}
      {showCheckoutForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#E6E2D8] rounded-3xl p-8 max-w-md w-full shadow-2xl text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-[#E6E2D8] pb-4">
              <div>
                <span className="text-[10px] font-bold text-[#C8521B] uppercase tracking-widest">Single-Box Consolidated Delivery</span>
                <h3 className="text-xl font-serif text-[#1A1816] mt-1">Delivery & Payment Details</h3>
              </div>
              <button onClick={() => setShowCheckoutForm(false)} className="text-gray-400 hover:text-black font-bold">✕</button>
            </div>

            <form onSubmit={handleFinalCheckout} className="space-y-3.5">
              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Full Name</label>
                <input
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Muhammad Ali"
                  className="w-full px-4 py-3 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816] focus:outline-none focus:border-[#C8521B]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">WhatsApp Phone Number</label>
                <input
                  type="tel"
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  placeholder="e.g. 0300 1234567"
                  className="w-full px-4 py-3 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816] focus:outline-none focus:border-[#C8521B]"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-2">
                  Select Delivery & Payment Speed:
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('PREPAID')}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'PREPAID'
                        ? 'bg-emerald-50 border-emerald-500 text-emerald-900 shadow-sm'
                        : 'bg-gray-50 border-[#E6E2D8] text-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-emerald-600" />
                      <div>
                        <p className="font-bold text-xs text-emerald-900">Prepaid Order (JazzCash / Bank)</p>
                        <p className="text-[9px] text-emerald-700">Free Delivery across Pakistan</p>
                      </div>
                    </div>
                    <span className="text-[9px] bg-emerald-600 text-white font-black px-2 py-0.5 rounded">FREE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'COD'
                        ? 'bg-amber-50 border-[#C8521B] text-[#1A1816] shadow-sm'
                        : 'bg-gray-50 border-[#E6E2D8] text-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4 text-[#C8521B]" />
                      <div>
                        <p className="font-bold text-xs text-[#1A1816]">Standard Cash on Delivery</p>
                        <p className="text-[9px] text-[#66615C]">2-3 Business Days Delivery</p>
                      </div>
                    </div>
                    <span className="text-xs text-[#1A1816] font-bold">PKR 195</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('EXPRESS_COD')}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'EXPRESS_COD'
                        ? 'bg-amber-100 border-amber-500 text-amber-950 shadow-sm'
                        : 'bg-gray-50 border-[#E6E2D8] text-gray-600'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-amber-600" />
                      <div>
                        <p className="font-bold text-xs text-amber-950">VIP 24-Hour Express COD (Lahore Only)</p>
                        <p className="text-[9px] text-amber-800">Guaranteed Same-Day Rider Dispatch</p>
                      </div>
                    </div>
                    <span className="text-xs text-amber-900 font-bold">PKR 350</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-500 mb-1">Full Street Address & City</label>
                <textarea
                  rows={2}
                  required
                  value={customerAddress}
                  onChange={(e) => setCustomerAddress(e.target.value)}
                  placeholder="House #, Street Name, Sector, City..."
                  className="w-full px-4 py-3 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816] focus:outline-none focus:border-[#C8521B]"
                />
              </div>

              <div className="pt-2 border-t border-[#E6E2D8] space-y-1 text-xs">
                <div className="flex justify-between text-[#66615C]">
                  <span>Delivery Charge:</span>
                  <span className="text-[#1A1816] font-bold">
                    {deliveryFee === 0 ? 'FREE (Prepaid Offer)' : `PKR ${deliveryFee}`}
                  </span>
                </div>
                <div className="flex justify-between items-center text-[#1A1816] font-extrabold text-sm pt-1">
                  <span>Total Payable:</span>
                  <span className="text-emerald-700">
                    PKR {(calculateSubtotal() + PLATFORM_FEE + deliveryFee).toLocaleString()}
                  </span>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#C8521B] hover:bg-[#a83e10] text-white font-extrabold text-sm rounded-full shadow-lg transition-all mt-2"
              >
                Confirm & Submit Order
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Invoice Receipt Modal */}
      {showInvoice && lastOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white border border-[#E6E2D8] rounded-3xl p-8 max-w-lg w-full shadow-2xl text-xs space-y-6">
            <div className="flex justify-between items-start border-b border-[#E6E2D8] pb-4">
              <div>
                <span className="bg-emerald-100 text-emerald-800 border border-emerald-300 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                  Order Submitted ✓
                </span>
                <h3 className="text-2xl font-serif text-[#1A1816] mt-2">Order Invoice Receipt</h3>
                <p className="text-[#66615C] text-[11px] mt-0.5">Order ID: {lastOrder.orderId} • {lastOrder.date}</p>
              </div>
              <button onClick={() => setShowInvoice(false)} className="text-gray-400 hover:text-black font-bold text-base">✕</button>
            </div>

            <div className="bg-gray-50 border border-[#E6E2D8] p-4 rounded-2xl space-y-1">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8521B]">Customer Details:</span>
                <span className="text-[10px] font-bold bg-white px-2 py-0.5 rounded text-emerald-800 border border-emerald-200">
                  {lastOrder.paymentMethod}
                </span>
              </div>
              <p className="text-[#1A1816] font-bold text-xs mt-1">{lastOrder.customerName} ({lastOrder.customerPhone})</p>
              <p className="text-[#66615C] text-[11px]">{lastOrder.customerAddress}</p>
            </div>

            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-[#C8521B]">
                Ordered Brand Items:
              </span>

              {Object.values(lastOrder.shopBreakdown).map((sub: any, idx: number) => (
                <div key={idx} className="bg-gray-50 border border-[#E6E2D8] p-4 rounded-2xl space-y-2">
                  <div className="flex justify-between font-bold text-[#1A1816] text-xs border-b border-[#E6E2D8] pb-2">
                    <span className="text-[#C8521B]">{sub.shopName}</span>
                    <span>Subtotal: PKR {sub.subtotal.toLocaleString()}</span>
                  </div>
                  <div className="space-y-1 text-[11px] text-[#66615C]">
                    {sub.items.map((item: any, i: number) => (
                      <div key={i} className="flex justify-between items-center">
                        <span>• {item.title} (Option: {item.selectedSize}, Qty: {item.quantity})</span>
                        <span className="text-[#1A1816] font-bold">PKR {item.totalPrice.toLocaleString()}</span>
                      </div>
                    ))}
                  </div>
                  <div className="text-[10px] text-amber-800 pt-1 border-t border-gray-200 flex justify-between font-bold">
                    <span>5% Service & Sourcing Margin:</span>
                    <span>PKR {sub.profitMargin.toFixed(2)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E6E2D8] pt-4 space-y-2 text-[#66615C]">
              <div className="flex justify-between">
                <span>Items Subtotal:</span>
                <span className="font-bold text-[#1A1816]">PKR {lastOrder.itemsSubtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-[#C8521B]">
                <span>Buyer Protection Fee:</span>
                <span className="font-bold">PKR {lastOrder.buyerFee}</span>
              </div>
              <div className="flex justify-between text-indigo-700">
                <span>Delivery Charge:</span>
                <span className="font-bold">
                  {lastOrder.buyerDeliveryFee === 0 ? 'FREE (Prepaid Offer)' : `PKR ${lastOrder.buyerDeliveryFee}`}
                </span>
              </div>
              <div className="flex justify-between text-emerald-700 text-sm font-extrabold pt-2 border-t border-[#E6E2D8]">
                <span>Total Amount:</span>
                <span>PKR {lastOrder.totalAmount.toLocaleString()}</span>
              </div>
            </div>

            <button
              onClick={() => setShowInvoice(false)}
              className="w-full py-3.5 bg-[#1A1816] hover:bg-black text-white font-bold rounded-full shadow-md text-xs"
            >
              Done & Return to Mall
            </button>
          </div>
        </div>
      )}

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-2xl border-t border-[#E6E2D8] px-6 py-3 flex justify-between items-center text-[10px] font-bold uppercase text-[#66615C]">
        <button onClick={() => { setSelectedBrand('All'); setSelectedCategory('All'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col items-center gap-1 hover:text-[#C8521B]">
          <Home className="w-4 h-4 text-[#C8521B]" />
          <span>Home</span>
        </button>

        <button onClick={() => { setSelectedBrand('All'); window.scrollTo({ top: 600, behavior: 'smooth' }); }} className="flex flex-col items-center gap-1 hover:text-[#1A1816]">
          <Layers className="w-4 h-4" />
          <span>Brands</span>
        </button>

        <button onClick={() => setShowCart(true)} className="flex flex-col items-center gap-1 relative hover:text-[#1A1816]">
          <ShoppingBag className="w-4 h-4 text-[#C8521B]" />
          <span>Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#1A1816] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>

        <Link href="/admin/add-product" className="flex flex-col items-center gap-1 hover:text-amber-800">
          <Settings className="w-4 h-4 text-amber-700" />
          <span>Admin</span>
        </Link>

        <button onClick={() => setShowSupport(!showSupport)} className="flex flex-col items-center gap-1 hover:text-[#1A1816]">
          <MessageCircle className="w-4 h-4 text-emerald-700" />
          <span>Support</span>
        </button>
      </div>

      {/* LUXURY 5-COLUMN CORPORATE TRUST & LICENSING FOOTER */}
      <footer className="bg-[#1A1816] border-t border-black text-xs text-[#D8D3CC] font-sans mt-28 pt-16 pb-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: About E-Mall PK */}
          <div className="space-y-3">
            <div className="flex items-center gap-3 text-white font-serif font-bold text-sm">
              <EMallLogoSymbol />
              <span>E-MALL PAKISTAN</span>
            </div>
            <p className="text-gray-400 text-[11px] leading-relaxed font-light">
              Pakistan's 1st consolidated digital mall platform. Skip the mall rush—your favorite brand stores live here now. Sourced 100% original from official brand hubs.
            </p>
            <div className="pt-2">
              <span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                ✓ 100% Original Brand Guarantee
              </span>
            </div>
          </div>

          {/* Col 2: Customer Care & Services */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] font-serif">Customer Care</h4>
            <ul className="space-y-2 text-gray-400 text-[11px]">
              <li><Link href="/" className="hover:text-[#C8521B] transition-colors">Single-Box Delivery Guarantee</Link></li>
              <li><Link href="/" className="hover:text-[#C8521B] transition-colors">7-Day Hassle-Free Exchange Policy</Link></li>
              <li><Link href="/track-order" className="hover:text-[#C8521B] transition-colors">Order Tracking & Status Lookup</Link></li>
              <li><button onClick={() => setShowVendorModal(true)} className="text-emerald-400 font-bold hover:underline">Apply to Sell on E-Mall (10% Fee)</button></li>
            </ul>
          </div>

          {/* Col 3: Corporate Trust & Licenses */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] font-serif">Trust & Verification</h4>
            <div className="space-y-2 text-gray-400 text-[11px]">
              <div className="flex items-center gap-2 text-gray-300">
                <FileText className="w-3.5 h-3.5 text-[#C8521B]" />
                <span>FBR NTN Tax Registered Enterprise</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <Award className="w-3.5 h-3.5 text-amber-400" />
                <span>Punjab E-Commerce Certified</span>
              </div>
              <div className="flex items-center gap-2 text-gray-300">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>256-Bit SSL Encrypted Platform</span>
              </div>
              <p className="text-[10px] text-gray-500 pt-1">Lahore Consolidated Fulfillment Center, Punjab, Pakistan</p>
            </div>
          </div>

          {/* Col 4: Authorized Logistics Partners */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] font-serif">Logistics Networks</h4>
            <p className="text-gray-400 text-[11px]">Authorized Delivery Networks across Pakistan:</p>
            <div className="flex flex-col gap-2 pt-1">
              <span className="bg-red-600/20 text-red-400 border border-red-500/30 px-3 py-1.5 rounded-xl font-black text-xs text-center">
                SKYNET Express Delivery
              </span>
              <span className="bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 px-3 py-1.5 rounded-xl font-black text-xs text-center">
                TCS Logistics
              </span>
            </div>
          </div>

          {/* Col 5: Contact & Payment Methods */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] font-serif">Contact Hub</h4>
            <div className="space-y-2 text-gray-400 text-[11px]">
              <p className="flex items-center gap-2 text-white">
                <Mail className="w-3.5 h-3.5 text-[#C8521B]" />
                <span>support@emall.pk</span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-3.5 h-3.5 text-gray-400" />
                <span>+92 (0)42 111-362-557</span>
              </p>
            </div>

            <div className="pt-3 border-t border-white/10 space-y-1">
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block">Accepted Payments:</span>
              <div className="flex gap-1.5 text-[9px] font-bold text-gray-300 flex-wrap">
                <span className="bg-white/10 px-2 py-0.5 rounded">Cash on Delivery</span>
                <span className="bg-white/10 px-2 py-0.5 rounded">JazzCash</span>
                <span className="bg-white/10 px-2 py-0.5 rounded">EasyPaisa</span>
              </div>
            </div>
          </div>

        </div>

        {/* Official Corporate Copyright Footer */}
        <div className="max-w-7xl mx-auto pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-[11px] text-gray-500">
          <p>© COPYRIGHT 2026 E-MALL PAKISTAN (PVT) LTD. ALL RIGHTS RESERVED.</p>
          <div className="flex gap-3 text-gray-400 font-bold">
            <Link href="/admin/add-product" className="hover:text-[#C8521B] transition-colors">Admin Management Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}