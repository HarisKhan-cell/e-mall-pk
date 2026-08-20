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
  Settings
} from 'lucide-react';

function EMallLogoSymbol() {
  return (
    <svg className="w-6 h-6" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M8 32V8H22C25.3137 8 28 10.6863 28 14C28 17.3137 25.3137 20 22 20H14M14 20V32M14 20H24C27.3137 20 30 22.6863 30 26C30 29.3137 27.3137 32 24 32H8" stroke="url(#emall_grad)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
      <circle cx="32" cy="10" r="3" fill="#D95D27" />
      <defs>
        <linearGradient id="emall_grad" x1="8" y1="8" x2="32" y2="32" gradientUnits="userSpaceOnUse">
          <stop stopColor="#D95D27" />
          <stop offset="0.5" stopColor="#F59E0B" />
          <stop offset="1" stopColor="#D95D27" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const INITIAL_PRODUCTS = [
  // Outfitters (10)
  {
    id: 'outfitters-1',
    title: 'Super Cropped Embroidered Denim Shirt',
    description: 'Trendy embroidered cropped denim shirt.',
    price: 4190,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters' },
    images: JSON.stringify(['https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?q=80&w=800'])
  },
  {
    id: 'outfitters-2',
    title: 'Gathered Blouse',
    description: 'Elegant gathered neckline blouse for daily wear.',
    price: 3790,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters' },
    images: JSON.stringify(['https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?q=80&w=800'])
  },
  {
    id: 'outfitters-3',
    title: 'Textured Blouse',
    description: 'Soft lightweight textured casual top.',
    price: 2190,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters' },
    images: JSON.stringify(['https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=800'])
  },
  {
    id: 'outfitters-4',
    title: 'All-Over Print Shirt',
    description: 'Vibrant modern digital print casual shirt.',
    price: 2790,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters' },
    images: JSON.stringify(['https://images.unsplash.com/photo-1509631179647-0177331693ae?q=80&w=800'])
  },
  {
    id: 'outfitters-5',
    title: 'Striped T-Shirt',
    description: 'Classic striped crew neck cotton tee.',
    price: 1690,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Outfitters' },
    images: JSON.stringify(['https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=800'])
  },

  // Khaadi (5)
  {
    id: 'khaadi-1',
    title: 'Khaadi Floral V-Neck Kurta',
    description: 'Embroidered Cambric Cotton floral V-neck kurta (2-26-203-A-G1).',
    price: 4490,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official' },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw6bc045c4/images/hi-res/1-26-111-a-f_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-2',
    title: 'Khaadi Beige V-Neck Kurta',
    description: 'Embroidered Cotton Viscose kurta with subtle beige tones (1-26-118-A-F).',
    price: 4290,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official' },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dwf6e45b4b/images/hi-res/1-26-128-a-e_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-3',
    title: 'Khaadi Dyed Raw Silk Kurta',
    description: '100% Cotton Raw Silk finish dyed kurta (8-26-301-A-D1).',
    price: 4000,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official' },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw18260a92/images/hi-res/8-26-301-a-d1_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-4',
    title: 'Khaadi Raw Silk Black Co-Ord 3-Piece Set',
    description: 'Luxury Raw Silk kurta, pants, and sequin embroidered dupatta (5-26-201-F-H).',
    price: 25000,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official' },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw15321f8a/images/hi-res/5-26-201-f-h_multi_1.jpg?sw=800'])
  },
  {
    id: 'khaadi-5',
    title: 'Khaadi Floral Tailored Set',
    description: 'Tailored Cotton Satin / Viscose 2-Piece Set (T-A33-26-202FC1).',
    price: 6990,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Khaadi Official' },
    images: JSON.stringify(['https://us.khaadi.com/dw/image/v2/BJTG_PRD/on/demandware.static/-/Sites-khaadi-master-catalog/default/dw83741829/images/hi-res/t-a33-26-202fc1_multi_1.jpg?sw=800'])
  },

  // Breakout (6)
  {
    id: 'breakout-1',
    title: 'Breakout Printed Button Down Shirt',
    description: '100% Cotton printed button down shirt with modern classic silhouette (6DSWT912-MTO).',
    price: 2249,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official' },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/6DSWT912-MTO_6.jpg?v=1782899185&width=1920'])
  },
  {
    id: 'breakout-2',
    title: 'Breakout Boys Striped Tee',
    description: '100% Cotton knit everyday boys striped tee (K6DST673-MLT).',
    price: 699,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official' },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6DST673-MLT_1.jpg?v=1779280870&width=1920'])
  },
  {
    id: 'breakout-3',
    title: "Breakout Men's Textured Tee (Brown)",
    description: '50% Cotton, 45% Polyester, 5% Spandex textured finish tee (6ESHT844-BRN).',
    price: 3899,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official' },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/6ESHT844-BRN_1.jpg?v=1782899185&width=1920'])
  },
  {
    id: 'breakout-4',
    title: 'Breakout Boys Contrast Rib Tee (Ecru)',
    description: '100% Cotton knit sporty contrast rib tee for boys (K6DST639-ECR).',
    price: 699,
    category: { name: 'Fashion & Apparel' },
    shop: { name: 'Breakout Official' },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6DST639-ECR_1.jpg?v=1778504092&width=1920'])
  },
  {
    id: 'breakout-5',
    title: 'Breakout Boys Smurf Perfume (50ml / Blue)',
    description: 'Refreshing, long-lasting 50ml fragrance for boys (K6ASBF03-BLU).',
    price: 1849,
    category: { name: 'Perfumes & Accessories' },
    shop: { name: 'Breakout Official' },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6ASBF03-BLU_2_dba2b513-f441-47a0-9e44-5f4e277dd32e.jpg?v=1777985061&width=1920'])
  },
  {
    id: 'breakout-6',
    title: 'Breakout Boys Hero Perfume (50ml / Black)',
    description: 'Refreshing signature 50ml fragrance for boys (K6ASBF01-BLK).',
    price: 1849,
    category: { name: 'Perfumes & Accessories' },
    shop: { name: 'Breakout Official' },
    images: JSON.stringify(['https://www.breakout.com.pk/cdn/shop/files/K6ASBF01-BLK_1.jpg?v=1777985061&width=1920'])
  }
];

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

 const syncMasterStore = () => {
  const master = localStorage.getItem('emall_master_products');
  const custom = localStorage.getItem('emall_custom_products');
  const activeStr = master || custom;

  if (activeStr) {
    try {
      const parsed = JSON.parse(activeStr);
      if (Array.isArray(parsed) && parsed.length > 0) {
        setProducts(parsed);
        localStorage.setItem('emall_master_products', JSON.stringify(parsed));
        return;
      }
    } catch (err) {}
  }
};

  useEffect(() => {
    syncMasterStore();
    window.addEventListener('storage', syncMasterStore);
    window.addEventListener('emall_products_updated', syncMasterStore);
    return () => {
      window.removeEventListener('storage', syncMasterStore);
      window.removeEventListener('emall_products_updated', syncMasterStore);
    };
  }, []);

  const handleOpenProduct = (product: any) => {
    setSelectedProduct(product);
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

  const handleFinalCheckout = (e: React.FormEvent) => {
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

    const existingOrders = JSON.parse(localStorage.getItem('emall_orders') || '[]');
    const updatedOrders = [orderReceipt, ...existingOrders];
    localStorage.setItem('emall_orders', JSON.stringify(updatedOrders));
    window.dispatchEvent(new Event('emall_orders_updated'));

    setLastOrder(orderReceipt);
    setCart([]);
    setShowCheckoutForm(false);
    setShowInvoice(true);
  };

  const handleVendorSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newApp = {
      vendorName,
      vendorPhone,
      vendorInsta,
      vendorCity,
      date: new Date().toLocaleDateString('en-PK')
    };

    const existingVendors = JSON.parse(localStorage.getItem('emall_vendor_apps') || '[]');
    const updatedVendors = [newApp, ...existingVendors];
    localStorage.setItem('emall_vendor_apps', JSON.stringify(updatedVendors));
    window.dispatchEvent(new Event('emall_vendors_updated'));

    setVendorSuccess(true);
    setTimeout(() => {
      setVendorSuccess(false);
      setShowVendorModal(false);
      setVendorName('');
      setVendorPhone('');
      setVendorInsta('');
    }, 3000);
  };

  const categories = ['All', 'Fashion & Apparel', 'Perfumes & Accessories', 'Shoes & Footwear', 'Bags & Accessories'];

  const brands = [
    { name: 'ALL BRANDS', filter: 'All' },
    { name: 'KHAADI', filter: 'Khaadi Official' },
    { name: 'BREAKOUT', filter: 'Breakout Official' },
    { name: 'OUTFITTERS', filter: 'Outfitters' },
  ];

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) ||
                          p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || p.category?.name === selectedCategory;
    const matchesBrand = selectedBrand === 'All' || p.shop?.name === selectedBrand;
    return matchesSearch && matchesCategory && matchesBrand;
  });

  return (
    <div className="min-h-screen bg-[#090807] text-[#E6DFD5] bg-grid font-sans selection:bg-[#D95D27] selection:text-white relative overflow-x-hidden pb-20 md:pb-0">
      
      {/* PROMO BANNER FOR FREE PREPAID DELIVERY */}
      {showPromoBanner && (
        <div className="bg-gradient-to-r from-amber-600 via-[#D95D27] to-amber-700 text-white text-[11px] font-bold py-2.5 px-4 text-center relative flex items-center justify-center gap-2 shadow-lg z-50">
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
      <nav className="bg-[#090807]/90 backdrop-blur-2xl border-b border-white/10 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-8 py-5 flex justify-between items-center gap-6">
          
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#121110] to-[#1a1816] border border-amber-500/30 flex items-center justify-center shadow-lg shadow-[#D95D27]/20 group-hover:scale-105 transition-all">
                <EMallLogoSymbol />
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
              placeholder="Search Khaadi, Breakout, Outfitters..."
              className="w-full pl-11 pr-4 py-2.5 bg-white/5 border border-white/10 rounded-full text-xs text-white placeholder-gray-500 focus:outline-none focus:border-[#D95D27] transition-all"
            />
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4 text-xs font-bold tracking-wider uppercase">
            <button
              onClick={() => setShowVendorModal(true)}
              className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-emerald-950/60 hover:bg-emerald-900/60 text-emerald-300 rounded-full border border-emerald-500/30 transition-all text-[11px]"
            >
              <UserPlus className="w-3.5 h-3.5 text-emerald-400" />
              <span>Become a Seller</span>
            </button>

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
      <div className="relative py-24 px-8 text-center border-b border-white/10 overflow-hidden bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1441986300917-64674bd600d8?q=80&w=1920')" }}>
        <div className="absolute inset-0 bg-gradient-to-t from-[#090807] via-[#090807]/85 to-[#090807]/75 backdrop-blur-sm" />

        <div className="relative z-10 max-w-4xl mx-auto">
          <span className="text-[11px] font-bold uppercase tracking-[0.3em] text-[#D95D27] block mb-4">
            Official Multi-Brand Destination
          </span>

          <h1 className="text-5xl sm:text-7xl font-serif font-normal text-white tracking-tight leading-[1.05] mb-6">
            Endless Brands. <br />
            <span className="italic text-[#E6DFD5] font-light">One Easy Checkout.</span>
          </h1>

          <p className="text-gray-300 text-sm sm:text-base max-w-xl mx-auto font-light leading-relaxed mb-8">
            Shop directly from verified brand stores in one single cart with 100% original brand guarantee.
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-xs text-gray-300 font-medium">
            <div className="flex items-center gap-2 bg-emerald-950/70 border border-emerald-500/40 text-emerald-300 px-5 py-3 rounded-full backdrop-blur-xl">
              <Gift className="w-4 h-4 text-emerald-400" />
              <span>FREE Delivery on All Prepaid Orders</span>
            </div>
            <div className="flex items-center gap-2 bg-black/60 px-5 py-3 rounded-full border border-white/15 backdrop-blur-xl">
              <Clock className="w-4 h-4 text-amber-400" />
              <span>VIP 24H Lahore Express Delivery (PKR 350)</span>
            </div>
          </div>
        </div>
      </div>

      {/* FEATURED VENDOR SPOTLIGHT */}
      <div className="max-w-7xl mx-auto px-8 my-10">
        <div className="bg-gradient-to-r from-amber-950/60 via-black to-amber-950/60 border border-amber-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 flex items-center justify-center text-amber-400 font-bold">
              <Megaphone className="w-6 h-6" />
            </div>
            <div>
              <span className="bg-amber-500 text-black font-black text-[9px] px-2.5 py-0.5 rounded-full uppercase tracking-widest block w-fit mb-1">
                Featured Vendor Spotlight
              </span>
              <h3 className="text-xl font-serif text-white">Breakout & Khaadi Collection 2026</h3>
              <p className="text-gray-400 text-xs mt-0.5">Explore official articles with 100% original store guarantee.</p>
            </div>
          </div>

          <button
            onClick={() => setSelectedBrand('Breakout Official')}
            className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-black font-extrabold text-xs rounded-full shadow-lg uppercase tracking-wider transition-all whitespace-nowrap"
          >
            Explore Breakout Store ➔
          </button>
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
                    onClick={() => handleOpenProduct(product)}
                    className="bg-white/5 border border-white/10 rounded-3xl overflow-hidden shadow-2xl hover:border-[#D95D27]/50 hover:bg-white/10 transition-all duration-500 group flex flex-col justify-between cursor-pointer"
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
                        <div className="flex items-center justify-between gap-2 mb-2">
                          <h3 className="text-base font-bold text-white group-hover:text-[#D95D27] transition-colors line-clamp-1 font-sans">
                            {product.title}
                          </h3>
                          <div className="flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-amber-500 inline-block" />
                            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
                            <span className="w-2 h-2 rounded-full bg-zinc-400 inline-block" />
                          </div>
                        </div>

                        <p className="text-gray-400 text-xs line-clamp-2 leading-relaxed font-light">
                          {product.description}
                        </p>
                      </div>
                    </div>

                    <div className="p-6 pt-0">
                      <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-bold text-gray-500 block tracking-widest">Original Retail</span>
                          <span className="text-xl font-extrabold text-white">PKR {product.price?.toLocaleString()}</span>
                        </div>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleOpenProduct(product);
                          }}
                          className="px-5 py-2.5 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-bold text-xs rounded-full shadow-lg shadow-[#D95D27]/20 transition-all"
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

      {/* QUICK VIEW PRODUCT MODAL WITH SIZES & QUANTITY */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#090807] border border-white/10 rounded-3xl p-8 max-w-2xl w-full shadow-2xl text-xs space-y-6 relative overflow-y-auto max-h-[90vh]">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-6 right-6 p-2 text-gray-400 hover:text-white bg-white/5 rounded-full border border-white/10"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="relative h-80 rounded-2xl overflow-hidden bg-black/60 border border-white/10">
                <img
                  src={
                    (() => {
                      try { return JSON.parse(selectedProduct.images)[0]; } catch (e) { return selectedProduct.images; }
                    })()
                  }
                  alt={selectedProduct.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-3 left-3 bg-[#090807]/90 backdrop-blur-md px-3 py-1 rounded-full border border-white/10 text-[9px] font-bold text-white uppercase tracking-widest flex items-center gap-1.5">
                  <Store className="w-3 h-3 text-[#D95D27]" />
                  {selectedProduct.shop?.name}
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <span className="text-[10px] font-bold text-[#D95D27] uppercase tracking-widest">
                    {selectedProduct.category?.name || 'Verified Article'}
                  </span>
                  <h3 className="text-2xl font-serif text-white mt-1">{selectedProduct.title}</h3>
                  <p className="text-gray-400 text-xs mt-2 leading-relaxed font-light">{selectedProduct.description}</p>
                </div>

                <div className="border-t border-b border-white/10 py-3 flex justify-between items-center">
                  <span className="text-xs text-gray-400">Original Price:</span>
                  <span className="text-2xl font-black text-white">PKR {selectedProduct.price?.toLocaleString()}</span>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Select Size:
                  </label>
                  <div className="flex gap-2">
                    {['S', 'M', 'L', 'XL'].map((sz) => (
                      <button
                        key={sz}
                        onClick={() => setSelectedSize(sz)}
                        className={`w-11 h-11 rounded-xl text-xs font-bold transition-all border flex items-center justify-center ${
                          selectedSize === sz
                            ? 'bg-[#D95D27] text-white border-[#D95D27] shadow-lg shadow-[#D95D27]/30 scale-105'
                            : 'bg-white/5 text-gray-400 border-white/10 hover:text-white'
                        }`}
                      >
                        {sz}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-300 mb-2">
                    Quantity:
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setSelectedQty(Math.max(1, selectedQty - 1))}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 font-bold"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="text-base font-black text-white px-3">{selectedQty}</span>
                    <button
                      onClick={() => setSelectedQty(selectedQty + 1)}
                      className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 font-bold"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <label className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-xl cursor-pointer hover:bg-white/10 transition-all">
                  <input
                    type="checkbox"
                    checked={isGiftWrap}
                    onChange={(e) => setIsGiftWrap(e.target.checked)}
                    className="w-4 h-4 accent-[#D95D27] rounded"
                  />
                  <div>
                    <p className="font-bold text-white text-xs">Add Luxury Gift Box & Handwritten Card</p>
                    <p className="text-[10px] text-amber-400">+ PKR 150 (Festive Gift Wrap)</p>
                  </div>
                </label>

                <button
                  onClick={handleAddToCartFromModal}
                  className="w-full py-4 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-extrabold text-xs rounded-full shadow-2xl shadow-[#D95D27]/30 transition-all uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>
                    Add Size {selectedSize} to Cart (PKR {((selectedProduct.price * selectedQty) + (isGiftWrap ? 150 : 0)).toLocaleString()})
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* LOCAL BOUTIQUE / SELLER ONBOARDING MODAL */}
      {showVendorModal && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-[#090807] border border-white/10 rounded-3xl p-8 max-w-md w-full shadow-2xl text-xs space-y-4">
            <div className="flex justify-between items-center border-b border-white/10 pb-4">
              <div>
                <span className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">Vendor Registration</span>
                <h3 className="text-xl font-serif text-white mt-1">Partner with E-Mall Pakistan</h3>
              </div>
              <button onClick={() => setShowVendorModal(false)} className="text-gray-500 hover:text-white font-bold">✕</button>
            </div>

            {vendorSuccess ? (
              <div className="bg-emerald-950/80 border border-emerald-500/50 p-6 rounded-2xl text-center space-y-2">
                <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
                <h4 className="text-sm font-bold text-white">Application Submitted!</h4>
                <p className="text-gray-300 text-xs">Our Merchant Onboarding Team will WhatsApp you within 2 hours.</p>
              </div>
            ) : (
              <form onSubmit={handleVendorSubmit} className="space-y-3.5">
                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Store / Brand Name</label>
                  <input
                    type="text"
                    required
                    value={vendorName}
                    onChange={(e) => setVendorName(e.target.value)}
                    placeholder="e.g. Amber's Pret Studio"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">WhatsApp Contact Number</label>
                  <input
                    type="tel"
                    required
                    value={vendorPhone}
                    onChange={(e) => setVendorPhone(e.target.value)}
                    placeholder="e.g. 0300 1234567"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">Instagram Page / Website Link</label>
                  <input
                    type="text"
                    value={vendorInsta}
                    onChange={(e) => setVendorInsta(e.target.value)}
                    placeholder="e.g. instagram.com/brandname"
                    className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                  />
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-1">City</label>
                  <select
                    value={vendorCity}
                    onChange={(e) => setVendorCity(e.target.value)}
                    className="w-full px-4 py-3 bg-[#090807] border border-white/10 rounded-2xl text-xs text-white focus:outline-none focus:border-[#D95D27]"
                  >
                    <option value="Lahore">Lahore (Single-Box Center)</option>
                    <option value="Karachi">Karachi</option>
                    <option value="Islamabad">Islamabad</option>
                    <option value="Faisalabad">Faisalabad</option>
                    <option value="Other">Other City</option>
                  </select>
                </div>

                <div className="p-3 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-[10px] text-emerald-300">
                  💡 <strong>Commission Rate:</strong> 10% Sourcing & Marketing Commission on items sold.
                </div>

                <button
                  type="submit"
                  className="w-full py-4 bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs rounded-full shadow-2xl transition-all uppercase tracking-wider"
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
        className="fixed bottom-20 md:bottom-8 right-8 z-40 bg-[#D95D27] hover:bg-[#c44e1d] text-white px-5 py-3.5 rounded-full shadow-2xl font-bold text-xs flex items-center gap-2 border border-white/20 transition-all"
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
                        <div className="flex items-center gap-2 text-[10px] mt-1">
                          <span className="bg-[#D95D27] text-white font-bold px-2 py-0.5 rounded">
                            Size: {item.selectedSize}
                          </span>
                          <span className="text-gray-400">Qty: {item.quantity}</span>
                          {item.isGiftWrap && <span className="text-amber-400 font-bold">🎁 Gift Wrapped</span>}
                        </div>
                        <span className="text-[10px] font-bold text-gray-500 block mt-1">
                          Brand: {item.shop?.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-extrabold text-white">PKR {item.totalPrice.toLocaleString()}</span>
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

      {/* CHECKOUT FORM MODAL WITH 3 DELIVERY OPTIONS */}
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
                <label className="block text-[10px] font-bold uppercase tracking-wider text-gray-400 mb-2">
                  Select Delivery & Payment Speed:
                </label>
                <div className="space-y-2">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('PREPAID')}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'PREPAID'
                        ? 'bg-emerald-950/80 border-emerald-500 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-4 h-4 text-emerald-400" />
                      <div>
                        <p className="font-bold text-xs text-white">Prepaid Order (JazzCash / Bank)</p>
                        <p className="text-[9px] text-emerald-300">Free Delivery across Pakistan</p>
                      </div>
                    </div>
                    <span className="text-[9px] bg-emerald-500 text-black font-black px-2 py-0.5 rounded">FREE</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('COD')}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'COD'
                        ? 'bg-[#D95D27]/20 border-[#D95D27] text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Truck className="w-4 h-4 text-[#D95D27]" />
                      <div>
                        <p className="font-bold text-xs text-white">Standard Cash on Delivery</p>
                        <p className="text-[9px] text-gray-400">2-3 Business Days Delivery</p>
                      </div>
                    </div>
                    <span className="text-xs text-white font-bold">PKR 195</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('EXPRESS_COD')}
                    className={`w-full p-3 rounded-2xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'EXPRESS_COD'
                        ? 'bg-amber-950/80 border-amber-500 text-white shadow-lg'
                        : 'bg-white/5 border-white/10 text-gray-400'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Clock className="w-4 h-4 text-amber-400" />
                      <div>
                        <p className="font-bold text-xs text-white">VIP 24-Hour Express COD (Lahore Only)</p>
                        <p className="text-[9px] text-amber-300">Guaranteed Same-Day Rider Dispatch</p>
                      </div>
                    </div>
                    <span className="text-xs text-amber-300 font-bold">PKR 350</span>
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
                  <span>Delivery Charge:</span>
                  <span className="text-white font-bold">
                    {deliveryFee === 0 ? 'FREE (Prepaid Offer)' : `PKR ${deliveryFee}`}
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
                  {lastOrder.paymentMethod}
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
                      <div key={i} className="flex justify-between items-center">
                        <span>• {item.title} (Size: {item.selectedSize}, Qty: {item.quantity})</span>
                        <span className="text-gray-200">PKR {item.totalPrice.toLocaleString()}</span>
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

      {/* MOBILE BOTTOM NAVIGATION BAR */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#090807]/95 backdrop-blur-2xl border-t border-white/10 px-6 py-3 flex justify-between items-center text-[10px] font-bold uppercase text-gray-400">
        <button onClick={() => { setSelectedBrand('All'); setSelectedCategory('All'); window.scrollTo({ top: 0, behavior: 'smooth' }); }} className="flex flex-col items-center gap-1 hover:text-[#D95D27]">
          <Home className="w-4 h-4 text-[#D95D27]" />
          <span>Home</span>
        </button>

        <button onClick={() => { setSelectedBrand('All'); window.scrollTo({ top: 600, behavior: 'smooth' }); }} className="flex flex-col items-center gap-1 hover:text-white">
          <Layers className="w-4 h-4" />
          <span>Brands</span>
        </button>

        <button onClick={() => setShowCart(true)} className="flex flex-col items-center gap-1 relative hover:text-white">
          <ShoppingBag className="w-4 h-4 text-amber-400" />
          <span>Cart</span>
          {cart.length > 0 && (
            <span className="absolute -top-1 -right-2 bg-[#D95D27] text-white text-[9px] font-black w-4 h-4 rounded-full flex items-center justify-center">
              {cart.length}
            </span>
          )}
        </button>

        <Link href="/admin/add-product" className="flex flex-col items-center gap-1 hover:text-amber-300">
          <Settings className="w-4 h-4 text-amber-400" />
          <span>Admin</span>
        </Link>

        <button onClick={() => setShowSupport(!showSupport)} className="flex flex-col items-center gap-1 hover:text-white">
          <MessageCircle className="w-4 h-4 text-emerald-400" />
          <span>Support</span>
        </button>
      </div>

      {/* LUXURY 5-COLUMN CORPORATE TRUST & LICENSING FOOTER */}
      <footer className="bg-black/90 border-t border-white/10 mt-28 pt-16 pb-12 px-8 text-xs text-gray-400 font-sans">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-white/10">
          
          {/* Col 1: About E-Mall PK & Point of View */}
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
              <li><Link href="/" className="hover:text-[#D95D27] transition-colors">Single-Box Delivery Guarantee</Link></li>
              <li><Link href="/" className="hover:text-[#D95D27] transition-colors">7-Day Hassle-Free Exchange Policy</Link></li>
              <li><Link href="/" className="hover:text-[#D95D27] transition-colors">Order Tracking & Status Lookup</Link></li>
              <li><button onClick={() => setShowVendorModal(true)} className="text-emerald-400 font-bold hover:underline">Apply to Sell on E-Mall (10% Fee)</button></li>
            </ul>
          </div>

          {/* Col 3: Corporate Trust & Licenses */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-widest text-[11px] font-serif">Trust & Verification</h4>
            <div className="space-y-2 text-gray-400 text-[11px]">
              <div className="flex items-center gap-2 text-gray-300">
                <FileText className="w-3.5 h-3.5 text-[#D95D27]" />
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
                <Mail className="w-3.5 h-3.5 text-[#D95D27]" />
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
            <Link href="/admin/add-product" className="hover:text-[#D95D27] transition-colors">Admin Management Portal</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}