'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingBag, Store, MapPin, X, ArrowRight, Truck, MessageCircle, Building2, Sparkles, Gift, CreditCard, Plus, ShieldCheck, Award, FileText, Minus, Clock, Mail, Phone, Megaphone, UserPlus, CheckCircle2, Home, Layers, Settings, Baby, Smile, ChevronLeft, ChevronRight, PackageCheck, BadgeCheck, Percent, ListChecks
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

export default function HomePage() {
  const [products, setProducts] = useState<any[]>([]);
  const [cart, setCart] = useState<any[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [showInvoice, setShowInvoice] = useState(false);
  const [showVendorModal, setShowVendorModal] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  
  // THE VIRTUAL MALL FLOOR SYSTEM
  const [currentFloor, setCurrentFloor] = useState(0); // 0: G, 1: 1st, 2: 2nd, etc.
  
  // UI & Interaction States
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0); 
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedQty, setSelectedQty] = useState(1);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Customer Data
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'PREPAID' | 'COD' | 'EXPRESS_COD'>('PREPAID');

  // Vendor Data
  const [vendorName, setVendorName] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorInsta, setVendorInsta] = useState('');
  const [vendorCity, setVendorCity] = useState('Lahore');
  const [vendorSuccess, setVendorSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setProducts(data); })
      .catch(console.error);
  }, []);

  // --- HARIS CEO BUSINESS LOGIC ---
  const PLATFORM_FEE = 50;
  const RESALE_BRANDS = ['Khaadi Official', 'Outfitters Official', 'Ethnic Official', 'Breakout Official', 'LAMA', 'Agha Noor Official', 'Sapphire Official'];

  const floors = [
    { name: "Ground Floor", desc: "Luxury Brands & Resale Hub", icon: Store, categories: ["Fashion & Apparel"] },
    { name: "First Floor", desc: "Footwear & Shoes Gallery", icon: Layers, categories: ["Shoes & Footwear"] },
    { name: "Second Floor", desc: "Beauty, Perfumes & Organic", icon: Sparkles, categories: ["Beauty & Organic", "Perfumes & Accessories"] },
    { name: "Third Floor", desc: "Home, Lifestyle & Kids", icon: Baby, categories: ["Home & Lifestyle", "Baby & Kids"] }
  ];

  const handleOpenProduct = (product: any) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
    setSelectedSize(product.category?.name === 'Shoes & Footwear' ? '39' : 'M');
    setSelectedQty(1);
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

  const handleFinalCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const shopBreakdown: any = {};
    let totalHardworkProfit = 0; 
    let totalCustomerMarkup = 0; 

    cart.forEach((item) => {
      const shopName = item.shop?.name || 'Verified Brand Partner';
      const isResale = RESALE_BRANDS.includes(shopName);
      let itemProfit = 0;
      let itemMarkup = 0;

      if (isResale) {
        itemMarkup = (item.price * item.quantity * 5) / 100;
        itemProfit = itemMarkup;
      } else {
        itemMarkup = 0;
        itemProfit = (item.price * item.quantity * 10) / 100;
      }

      totalHardworkProfit += itemProfit;
      totalCustomerMarkup += itemMarkup;

      if (!shopBreakdown[shopName]) {
        shopBreakdown[shopName] = { shopName, items: [item], subtotal: item.totalPrice, profitMargin: itemProfit, customerMarkup: itemMarkup, isResale };
      } else {
        shopBreakdown[shopName].items.push(item);
        shopBreakdown[shopName].subtotal += item.totalPrice;
        shopBreakdown[shopName].profitMargin += itemProfit;
        shopBreakdown[shopName].customerMarkup += itemMarkup;
      }
    });

    const subtotal = cart.reduce((t, i) => t + i.totalPrice, 0);
    const discountAmount = (subtotal * appliedDiscount) / 100;
    let deliveryFee = paymentMethod === 'COD' ? 195 : paymentMethod === 'EXPRESS_COD' ? 350 : 0;
    const finalTotal = (subtotal + totalCustomerMarkup + PLATFORM_FEE + deliveryFee) - discountAmount;

    // HARIS 20/80 COD SPLIT
    const advanceAmount = paymentMethod !== 'PREPAID' ? (finalTotal * 20) / 100 : finalTotal;
    const remainingAmount = paymentMethod !== 'PREPAID' ? finalTotal - advanceAmount : 0;

    const orderReceipt = {
      orderId: `EMALL-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-PK'),
      customerName, customerPhone, customerAddress, paymentMethod,
      cartItems: [...cart], shopBreakdown, 
      itemsSubtotal: subtotal, discountAmount,
      buyerFee: PLATFORM_FEE, buyerDeliveryFee: deliveryFee,
      totalHardworkProfit, totalCustomerMarkup,
      totalAmount: finalTotal, advanceAmount, remainingAmount,
      status: 'Stock Verification'
    };

    try { await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderReceipt) }); } catch (err) {}
    setLastOrder(orderReceipt); setCart([]); setShowCheckoutForm(false); setShowInvoice(true);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase());
    const matchesFloor = floors[currentFloor].categories.includes(p.category?.name);
    return matchesSearch && matchesFloor;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1816] font-sans relative overflow-x-hidden selection:bg-[#C8521B] selection:text-white">
      
      {showPromoBanner && (
        <div className="bg-[#C8521B] text-white text-[11px] font-bold py-2.5 px-4 text-center relative z-50 shadow-lg">
          <Sparkles className="w-4 h-4 inline mr-2 animate-pulse" />
          <span>USE CODE <strong>EMALL20</strong> FOR 20% OFF YOUR FIRST ORDER</span>
          <button onClick={() => setShowPromoBanner(false)} className="absolute right-4 font-serif">✕</button>
        </div>
      )}

      {/* NAVBAR */}
      <nav className="bg-[#FAF8F5]/90 backdrop-blur-2xl border-b border-[#E6E2D8] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-white border border-[#E6E2D8] flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform"><EMallLogoSymbol /></div>
              <div><span className="text-xl font-bold tracking-widest text-[#1A1816] uppercase font-serif">E-MALL <span className="text-[10px] text-[#C8521B]">PK</span></span><span className="text-[10px] text-[#66615C] block -mt-1 font-medium">Digital Mall Platform</span></div>
            </Link>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold tracking-wider uppercase">
            <Link href="/track-order" className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-white text-[#1A1816] rounded-full border border-[#E6E2D8] text-[10px] shadow-sm hover:bg-gray-50 transition-all"><PackageCheck className="w-3.5 h-3.5 text-[#C8521B]" /><span>Track Order</span></Link>
            <button onClick={() => setShowVendorModal(true)} className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-900 rounded-full border border-emerald-200 text-[10px] hover:bg-emerald-100"><UserPlus className="w-3.5 h-3.5" /><span>Become a Seller</span></button>
            <button onClick={() => setShowCart(true)} className="relative p-2.5 bg-[#C8521B] text-white rounded-full shadow-lg shadow-[#C8521B]/20"><ShoppingBag className="w-4 h-4" />{cart.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-[#1A1816] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">{cart.length}</span>}</button>
          </div>
        </div>
      </nav>

      {/* ATRIUM HERO BACKGROUND */}
      <div className="relative py-20 px-8 text-center border-b border-[#E6E2D8] overflow-hidden bg-gray-950">
        <div className="absolute inset-0 z-0 opacity-40 scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=2070')", backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/20 to-[#FAF8F5]/10" />
        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-2"><Sparkles className="w-3.5 h-3.5 text-amber-400" /><span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Official Brand Destination</span></div>
          <h1 className="text-5xl sm:text-7xl font-serif font-normal text-white tracking-tighter leading-[1.1] drop-shadow-2xl">Endless Brands. <br /><span className="italic text-gray-300 font-light underline decoration-[#C8521B]/40 underline-offset-8">One Easy Checkout.</span></h1>
          <p className="text-gray-200 text-sm sm:text-lg max-w-xl mx-auto font-light leading-relaxed">Gathering all your favorite labels in a single package. One Box, One Mall.</p>
        </div>
      </div>

      {/* --- THE VIRTUAL MALL FLOOR DIRECTORY --- */}
      <div className="bg-[#1A1816] py-6 sticky top-20 z-30 shadow-2xl border-b border-white/5 overflow-x-auto">
         <div className="max-w-7xl mx-auto px-6 flex justify-center gap-4 min-w-max">
            {floors.map((floor, idx) => {
               const Icon = floor.icon;
               const isActive = currentFloor === idx;
               return (
                 <button 
                  key={idx} 
                  onClick={() => setCurrentFloor(idx)} 
                  className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 border ${isActive ? 'bg-[#C8521B] border-[#C8521B] shadow-lg scale-105' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white hover:bg-white/10'}`}
                 >
                   <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#C8521B]'}`} />
                   <div className="text-left">
                      <p className={`text-[10px] font-black uppercase tracking-widest leading-none ${isActive ? 'text-white' : 'text-gray-500'}`}>{floor.name}</p>
                      <p className={`text-[9px] font-medium leading-tight mt-0.5 ${isActive ? 'text-white/80' : 'text-gray-600'}`}>{floor.desc}</p>
                   </div>
                 </button>
               )
            })}
         </div>
      </div>

      {/* FLOOR CONTENT WITH ANIMATION */}
      <AnimatePresence mode="wait">
        <motion.div 
          key={currentFloor}
          initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: -50, filter: "blur(10px)" }}
          transition={{ duration: 0.5, ease: "anticipate" }}
          className="max-w-7xl mx-auto px-8 py-16"
        >
          <div className="border-b border-[#E6E2D8] pb-8 mb-12 flex flex-col md:flex-row justify-between items-end gap-6">
             <div>
                <span className="text-[10px] font-black text-[#C8521B] uppercase tracking-[0.3em] block mb-2">{floors[currentFloor].name} Directory</span>
                <h2 className="text-4xl font-serif text-[#1A1816] tracking-tight">{floors[currentFloor].desc}</h2>
             </div>
             <div className="relative w-full md:w-72">
                <Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search this floor..." className="w-full pl-11 pr-4 py-3 bg-white border border-[#E6E2D8] rounded-2xl text-xs shadow-sm" />
             </div>
          </div>

          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center text-gray-400 font-serif text-xl border-2 border-dashed border-[#E6E2D8] rounded-[3rem]">This floor is being restocked. Visit another floor!</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
              {filteredProducts.map((product) => {
                let images = []; try { images = JSON.parse(product.images || '[]'); } catch (e) { images = [product.images]; }
                const displayImg = (hoveredProductId === product.id && images.length > 1) ? images[1] : images[0];
                return (
                  <div key={product.id} onClick={() => handleOpenProduct(product)} onMouseEnter={() => setHoveredProductId(product.id)} onMouseLeave={() => setHoveredProductId(null)} className="bg-white border border-[#E6E2D8] rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:border-[#C8521B] transition-all duration-300 group cursor-pointer flex flex-col justify-between h-full">
                    <div className="relative h-[22rem] w-full overflow-hidden bg-gray-100">
                      <img src={displayImg} className="w-full h-full object-cover object-top transition-all duration-700" />
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#E6E2D8] text-[9px] font-black tracking-widest uppercase flex items-center gap-1.5"><Store className="w-3 h-3 text-[#C8521B]" /> {product.shop?.name}</div>
                      <div className="absolute top-4 right-4"><div className="bg-emerald-50 text-emerald-700 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-200 text-[9px] font-bold flex items-center gap-1.5 shadow-sm"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> In Stock</div></div>
                      {images.length > 1 && <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2.5 py-1 rounded-lg text-[9px] font-bold tracking-widest uppercase">+{images.length - 1} More Views</div>}
                    </div>
                    <div className="p-7">
                      <h3 className="text-base font-bold text-[#1A1816] group-hover:text-[#C8521B] line-clamp-1 font-sans">{product.title}</h3>
                      <p className="text-[#66615C] text-xs line-clamp-2 mt-2 leading-relaxed font-light">{product.description}</p>
                      <div className="pt-5 border-t border-[#E6E2D8] mt-5 flex items-center justify-between">
                        <div><span className="text-[9px] uppercase font-bold text-[#66615C] block tracking-widest mb-0.5">Original Retail</span><span className="text-xl font-black text-[#1A1816]">PKR {product.price?.toLocaleString()}</span></div>
                        <button className="px-5 py-2.5 bg-[#C8521B] hover:bg-[#a83e10] text-white font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg transition-all">Select Size</button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* --- QUICK VIEW MODAL (WITH TRUST SHIELD) --- */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50 font-sans">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="bg-white rounded-[2.5rem] p-10 max-w-4xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 p-2 text-gray-400 hover:text-black bg-gray-100 rounded-full transition-all">✕</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="relative h-[28rem] rounded-[2rem] overflow-hidden bg-gray-100 border border-[#E6E2D8] shadow-inner">
                  <img src={(() => { let imgs = []; try { imgs = JSON.parse(selectedProduct.images); } catch(e) { imgs = [selectedProduct.images]; } return imgs[activeImageIndex]; })()} className="w-full h-full object-contain" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {(() => {
                    let imgs = []; try { imgs = JSON.parse(selectedProduct.images); } catch(e) { imgs = [selectedProduct.images]; }
                    return imgs.map((img:string, idx:number) => (
                      <img key={idx} src={img} onClick={() => setActiveImageIndex(idx)} className={`w-20 h-20 rounded-2xl object-cover cursor-pointer border-2 transition-all ${activeImageIndex === idx ? 'border-[#C8521B] scale-105 shadow-xl' : 'border-transparent opacity-50 hover:opacity-100'}`} />
                    ));
                  })()}
                </div>
              </div>
              <div className="space-y-6">
                <div><span className="text-[10px] font-black text-[#C8521B] uppercase tracking-[0.3em] block mb-2">{selectedProduct.category?.name}</span><h3 className="text-3xl font-serif text-[#1A1816] tracking-tight">{selectedProduct.title}</h3><p className="text-[#66615C] text-sm mt-3 leading-relaxed font-light">{selectedProduct.description}</p></div>
                
                <div className="flex flex-wrap gap-3 py-4 border-y border-[#E6E2D8]">
                   <div className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-500 bg-gray-50 px-3 py-2 rounded-full border border-gray-100"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> 100% Brand Original</div>
                   <div className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-500 bg-gray-50 px-3 py-2 rounded-full border border-gray-100"><Award className="w-3.5 h-3.5 text-[#C8521B]" /> Verified Hub Inspection</div>
                   <div className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-500 bg-gray-50 px-3 py-2 rounded-full border border-gray-100"><Truck className="w-3.5 h-3.5 text-blue-500" /> Single-Box Guarantee</div>
                </div>

                <div className="flex justify-between items-center"><span className="text-sm font-bold text-gray-400">Official Retail Price:</span><span className="text-3xl font-black text-[#1A1816]">PKR {selectedProduct.price?.toLocaleString()}</span></div>
                
                <div>
                   <label className="block text-[10px] font-black uppercase mb-3 text-gray-400 tracking-widest">Select {selectedProduct.category?.name === 'Shoes & Footwear' ? 'Shoe Size' : 'Option'}:</label>
                   <div className="flex flex-wrap gap-2">
                     {(selectedProduct.category?.name === 'Shoes & Footwear' ? ['37','38','39','40','41','42'] : ['S','M','L','XL']).map((sz) => (
                       <button key={sz} onClick={() => setSelectedSize(sz)} className={`w-12 h-12 rounded-2xl font-black text-xs border transition-all ${selectedSize === sz ? 'bg-[#C8521B] text-white border-[#C8521B] scale-110 shadow-lg' : 'bg-white text-gray-400 hover:text-black hover:border-black'}`}>{sz}</button>
                     ))}
                   </div>
                </div>

                <label className="flex items-center gap-3 p-4 bg-amber-50 border border-amber-200 rounded-2xl cursor-pointer hover:bg-amber-100 transition-all shadow-sm group">
                  <input type="checkbox" checked={isGiftWrap} onChange={(e) => setIsGiftWrap(e.target.checked)} className="w-5 h-5 accent-[#C8521B] rounded-lg" />
                  <div><p className="font-black text-amber-900 text-xs">Add Luxury Gift Box & Card</p><p className="text-[10px] text-amber-700 mt-0.5">+ PKR 150 (Premium Festive Packing)</p></div>
                  <Gift className="w-5 h-5 text-amber-600 ml-auto group-hover:rotate-12 transition-transform" />
                </label>
                
                <button onClick={handleAddToCartFromModal} className="w-full py-5 bg-[#C8521B] hover:bg-[#a83e10] text-white font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-2xl shadow-[#C8521B]/30 transition-all hover:scale-[1.02] flex items-center justify-center gap-3"><ShoppingBag className="w-4 h-4" /> <span>Add to Cart (PKR {((selectedProduct.price * selectedQty) + (isGiftWrap ? 150 : 0)).toLocaleString()})</span></button>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* --- CART DRAWER (WITH DISCOUNT LOGIC) --- */}
      {showCart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-end z-50">
          <motion.div initial={{ x: 400 }} animate={{ x: 0 }} className="bg-white border-l border-[#E6E2D8] w-full max-w-md h-full p-8 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-[#E6E2D8]"><div className="flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-[#C8521B]" /><h3 className="text-xl font-bold text-[#1A1816] font-serif tracking-tight">Your Mall Cart</h3></div><button onClick={() => setShowCart(false)} className="p-1 text-gray-400 hover:text-black">✕</button></div>
              {cart.length === 0 ? <div className="text-center py-32 text-gray-400 font-serif italic text-lg">Your cart is waiting for some labels...</div> : (
                <div className="mt-8 space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50/50 p-5 rounded-3xl border border-[#E6E2D8] transition-all hover:bg-white hover:shadow-lg">
                      <div><h4 className="text-sm font-bold text-[#1A1816] line-clamp-1">{item.title}</h4><div className="flex items-center gap-2 mt-1.5"><span className="bg-[#C8521B] text-white text-[9px] font-black px-2 py-0.5 rounded uppercase">{item.selectedSize}</span><span className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">Qty: {item.quantity}</span></div></div>
                      <div className="flex items-center gap-4"><span className="text-sm font-black text-[#1A1816]">PKR {item.totalPrice.toLocaleString()}</span><button onClick={() => removeFromCart(idx)} className="p-2 text-red-400 hover:bg-red-50 rounded-xl transition-all">✕</button></div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            {cart.length > 0 && (
              <div className="border-t border-[#E6E2D8] pt-8 mt-8 space-y-4 text-xs font-bold text-gray-500">
                <div className="p-4 bg-[#FAF8F5] border border-[#E6E2D8] rounded-[1.5rem] flex items-center gap-3">
                   <Percent className="w-4 h-4 text-[#C8521B]" />
                   <input type="text" value={discountCode} onChange={(e) => setDiscountCode(e.target.value)} placeholder="DISCOUNT CODE (EMALL20)" className="flex-1 bg-transparent border-none text-[10px] focus:ring-0 uppercase tracking-widest" />
                   <button onClick={handleApplyDiscount} className="text-[#C8521B] text-[10px] font-black uppercase tracking-widest px-3 py-1 hover:bg-white rounded-lg transition-all">Apply</button>
                </div>
                <div className="space-y-2.5 px-2">
                   <div className="flex justify-between"><span>Products Subtotal:</span><span className="text-[#1A1816]">PKR {calculateSubtotal().toLocaleString()}</span></div>
                   {appliedDiscount > 0 && <div className="flex justify-between text-emerald-600"><span>Special Discount:</span><span>- PKR {(calculateSubtotal() * appliedDiscount / 100).toLocaleString()}</span></div>}
                   <div className="flex justify-between text-[#C8521B] font-black uppercase tracking-widest text-[10px]"><span>Mall Protection Fee:</span><span>PKR {PLATFORM_FEE}</span></div>
                </div>
                <button onClick={() => { setShowCart(false); setShowCheckoutForm(true); }} className="w-full py-5 bg-[#1A1816] hover:bg-black text-white font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-2xl transition-all flex items-center justify-center gap-3 mt-4"><span>Proceed to Checkout</span><ArrowRight className="w-4 h-4" /></button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* --- CHECKOUT FORM --- */}
      {showCheckoutForm && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-md flex items-center justify-center p-4 z-50 font-sans">
          <motion.div initial={{ y: 100, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl space-y-5 relative max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center border-b pb-5">
              <div><span className="text-[10px] font-black text-[#C8521B] uppercase tracking-widest">Verification Engine</span><h3 className="text-xl font-serif text-[#1A1816] mt-1 tracking-tight">Delivery & Logistics</h3></div>
              <button onClick={() => setShowCheckoutForm(false)} className="text-gray-400 font-bold">✕</button>
            </div>
            <form onSubmit={handleFinalCheckout} className="space-y-4">
              <div className="space-y-1"><label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Full Customer Name</label><input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="e.g. Haris Khan" className="w-full px-5 py-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816] focus:border-[#C8521B] focus:outline-none" /></div>
              <div className="space-y-1"><label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">WhatsApp Number (03xx)</label><input type="tel" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="03xx xxxxxxx" className="w-full px-5 py-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816] focus:border-[#C8521B] focus:outline-none" /></div>
              
              <div className="space-y-2.5">
                <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Payment Method & Speed</label>
                <button type="button" onClick={() => setPaymentMethod('PREPAID')} className={`w-full p-4 rounded-2xl border text-left flex justify-between items-center transition-all ${paymentMethod === 'PREPAID' ? 'bg-emerald-50 border-emerald-500 shadow-sm' : 'bg-white border-[#E6E2D8]'}`}><div className="flex items-center gap-3"><CreditCard className="w-4 h-4 text-emerald-600" /><div><p className="font-bold text-[11px] text-emerald-900 uppercase tracking-tight">Prepaid (Fastest Delivery)</p><p className="text-[9px] text-emerald-700">JazzCash / EasyPaisa / Bank</p></div></div><span className="text-[9px] bg-emerald-600 text-white font-black px-2.5 py-1 rounded-lg">FREE</span></button>
                <button type="button" onClick={() => setPaymentMethod('COD')} className={`w-full p-4 rounded-2xl border text-left flex justify-between items-center transition-all ${paymentMethod === 'COD' ? 'bg-amber-50 border-[#C8521B] shadow-sm' : 'bg-white border-[#E6E2D8]'}`}><div className="flex items-center gap-3"><Truck className="w-4 h-4 text-[#C8521B]" /><div><p className="font-bold text-[11px] text-[#1A1816] uppercase tracking-tight">Standard COD (2-3 Days)</p><p className="text-[9px] text-[#66615C]">Lahore Consolidation Hub</p></div></div><span className="text-[10px] font-black text-[#1A1816]">PKR 195</span></button>
                <button type="button" onClick={() => setPaymentMethod('EXPRESS_COD')} className={`w-full p-4 rounded-2xl border text-left flex justify-between items-center transition-all ${paymentMethod === 'EXPRESS_COD' ? 'bg-amber-100 border-amber-500 shadow-sm' : 'bg-white border-[#E6E2D8]'}`}><div className="flex items-center gap-3"><Clock className="w-4 h-4 text-amber-600" /><div><p className="font-bold text-[11px] text-amber-950 uppercase tracking-tight">VIP 24H COD (Lahore Only)</p><p className="text-[9px] text-amber-800">Guaranteed Same-Day Runner</p></div></div><span className="text-[10px] font-black text-amber-950">PKR 350</span></button>
              </div>

              <div className="space-y-1"><label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Street Address & City</label><textarea rows={2} required value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="Full House # and Area" className="w-full px-5 py-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816] focus:border-[#C8521B] focus:outline-none" /></div>
              
              <div className="p-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl space-y-1 text-[9px] text-gray-500 italic leading-relaxed uppercase tracking-tighter">
                 ⚠️ HARIS'S POLICY: Our team will WhatsApp you for the 20% advance security deposit receipt to secure your mall articles and verify the Hub Pickup.
              </div>

              <button type="submit" className="w-full py-5 bg-[#C8521B] hover:bg-[#a83e10] text-white font-black text-xs uppercase tracking-[0.2em] rounded-full shadow-2xl transition-all shadow-[#C8521B]/30 active:scale-95">Confirm & Secure Order</button>
            </form>
          </motion.div>
        </div>
      )}

      {/* --- INVOICE RECEIPT MODAL --- */}
      {showInvoice && lastOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl text-xs space-y-8 relative overflow-y-auto max-h-[90vh] border border-[#E6E2D8]">
            <div className="flex justify-between items-start border-b pb-5">
              <div><span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest shadow-sm">Payment Verified Pending ✓</span><h3 className="text-2xl font-serif text-[#1A1816] mt-3 tracking-tight">Order Invoice Receipt</h3><p className="text-[#66615C] text-[10px] mt-1 uppercase font-bold tracking-widest">ID: {lastOrder.orderId} • {lastOrder.date}</p></div>
              <button onClick={() => setShowInvoice(false)} className="text-gray-400 font-bold hover:text-black">✕</button>
            </div>
            
            <div className="bg-gray-50/80 border border-[#E6E2D8] p-5 rounded-3xl space-y-1.5"><p className="text-[#1A1816] font-black text-sm uppercase tracking-tighter">{lastOrder.customerName} ({lastOrder.customerPhone})</p><p className="text-[#66615C] font-medium leading-relaxed italic">{lastOrder.customerAddress}</p></div>
            
            <div className="space-y-4">
              {Object.values(lastOrder.shopBreakdown).map((sub: any, idx: number) => (
                <div key={idx} className="bg-gray-50 border border-[#E6E2D8] p-5 rounded-3xl space-y-3 shadow-inner">
                  <div className="flex justify-between font-black text-[#1A1816] border-b border-[#E6E2D8] pb-3 uppercase text-[10px] tracking-[0.1em]"><span className="text-[#C8521B]">{sub.shopName}</span><span>PKR {sub.subtotal.toLocaleString()}</span></div>
                  {sub.items.map((item: any, i: number) => (<div key={i} className="flex justify-between text-[11px] font-medium"><span className="text-gray-500">• {item.title} (x{item.quantity})</span><span className="font-black text-[#1A1816]">PKR {item.totalPrice.toLocaleString()}</span></div>))}
                  {sub.isResale && (<div className="pt-2 flex justify-between text-[10px] text-amber-800 font-black uppercase tracking-widest animate-pulse"><span>5% Hardwork & Sourcing Fee:</span><span>PKR {sub.customerMarkup.toLocaleString()}</span></div>)}
                </div>
              ))}
            </div>

            <div className="border-t pt-5 space-y-2.5 font-bold uppercase tracking-widest text-[9px] text-gray-500 border-dashed border-[#E6E2D8]">
              <div className="flex justify-between"><span>Labels Original Subtotal:</span><span className="text-[#1A1816]">PKR {lastOrder.itemsSubtotal.toLocaleString()}</span></div>
              {lastOrder.discountAmount > 0 && <div className="flex justify-between text-emerald-600 font-black"><span>Discount (EMALL20):</span><span>- PKR {lastOrder.discountAmount.toLocaleString()}</span></div>}
              {lastOrder.totalCustomerMarkup > 0 && <div className="flex justify-between text-amber-700"><span>Consolidated Sourcing Margin (5%):</span><span>PKR {lastOrder.totalCustomerMarkup.toLocaleString()}</span></div>}
              <div className="flex justify-between text-[#C8521B]"><span>Platform Protection Fee:</span><span>PKR {lastOrder.buyerFee}</span></div>
              <div className="flex justify-between text-indigo-700"><span>Consolidated Logistics:</span><span>{lastOrder.buyerDeliveryFee === 0 ? 'FREE' : `PKR ${lastOrder.buyerDeliveryFee}`}</span></div>
              
              <div className="bg-[#1A1816] p-6 rounded-[2rem] mt-6 space-y-3 shadow-2xl">
                 <div className="flex justify-between text-[11px] text-gray-500 tracking-[0.2em]"><span>Total Order Net Value:</span><span className="text-white font-black">PKR {lastOrder.totalAmount.toLocaleString()}</span></div>
                 <div className="flex justify-between text-emerald-400 font-black text-base uppercase tracking-tighter border-y border-white/10 py-3"><span>Advance Secure (20%):</span><span>PKR {lastOrder.advanceAmount.toLocaleString()}</span></div>
                 <div className="flex justify-between text-amber-400 font-black text-xs uppercase pt-1 tracking-widest"><span>Balance on COD (80%):</span><span>PKR {lastOrder.remainingAmount.toLocaleString()}</span></div>
              </div>
            </div>
            
            <button onClick={() => setShowInvoice(false)} className="w-full py-5 bg-[#C8521B] hover:bg-black text-white font-black text-[10px] uppercase tracking-[0.3em] rounded-full shadow-2xl transition-all">Done & Return to Grand Atrium</button>
          </motion.div>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-[#090807] border-t border-white/5 text-[#D8D3CC] pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 pb-16 border-b border-white/5">
          <div className="space-y-5">
            <div className="flex items-center gap-3 text-white font-serif font-bold text-lg"><EMallLogoSymbol /><span>E-MALL PAKISTAN</span></div>
            <p className="text-gray-500 text-[11px] leading-relaxed tracking-tight">Pakistan's 1st digital mall at scale. Sourced 100% original brand products. Single-Box Consolidation Hub.</p>
            <div className="pt-2"><span className="bg-emerald-950/80 text-emerald-300 border border-emerald-500/30 text-[9px] font-bold px-4 py-2 rounded-full uppercase tracking-widest">✓ Certified Brand Original</span></div>
          </div>
          <div className="space-y-4"><h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">E-Mall Care</h4><ul className="space-y-2.5 text-gray-500 text-[11px] font-bold uppercase tracking-widest">
            <li><Link href="/" className="hover:text-[#C8521B] transition-colors">7-Day Guarantee</Link></li>
            <li><Link href="/" className="hover:text-[#C8521B] transition-colors">Return Policy</Link></li>
            <li><Link href="/track-order" className="hover:text-[#C8521B] transition-colors">Track Order</Link></li>
            <li><button onClick={() => setShowVendorModal(true)} className="text-emerald-400 font-black hover:underline">Seller Hub (10%)</button></li>
          </ul></div>
          <div className="space-y-4"><h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Support</h4><div className="space-y-3">
            <p className="flex items-center gap-3 text-white font-black text-[11px]"><Mail className="w-4 h-4 text-[#C8521B]" /> emallofficials869@gmail.com</p>
            <p className="flex items-center gap-3 font-bold text-[11px]"><Phone className="w-4 h-4" /> +92 (0)42 111-362-557</p>
          </div></div>
          <div className="space-y-4"><h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Trust Hub</h4><div className="space-y-3"><div className="flex items-center gap-3 text-gray-300"><FileText className="w-4 h-4 text-[#C8521B]" /> <span>FBR Tax Registered</span></div><div className="flex items-center gap-3 text-gray-300"><ShieldCheck className="w-4 h-4 text-emerald-500" /> <span>SSL Protected Hub</span></div></div></div>
          <div className="space-y-4"><h4 className="text-white font-black uppercase tracking-[0.2em] text-[10px]">Logistics</h4><p className="text-gray-500 text-[11px] font-medium leading-relaxed uppercase tracking-tighter italic">Consolidated Hub Shipping via TCS / SKYNET.</p></div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-gray-600 uppercase font-black tracking-widest"><p>© 2026 E-MALL PAKISTAN (PVT) LTD. ALL RIGHTS RESERVED.</p><Link href="/admin/add-product" className="hover:text-[#C8521B] transition-all">CEO Master Portal</Link></div>
      </footer>
      
      {/* MOBILE BOTTOM NAV */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E6E2D8] px-8 py-4 flex justify-between items-center text-[9px] font-black uppercase text-gray-400">
        <button onClick={() => setCurrentFloor(0)} className="flex flex-col items-center gap-1.5"><Home className={`w-5 h-5 ${currentFloor === 0 ? 'text-[#C8521B]' : ''}`} /><span>G Floor</span></button>
        <button onClick={() => setCurrentFloor(1)} className="flex flex-col items-center gap-1.5"><Layers className={`w-5 h-5 ${currentFloor === 1 ? 'text-[#C8521B]' : ''}`} /><span>Shoes</span></button>
        <button onClick={() => setShowCart(true)} className="flex flex-col items-center gap-1.5 relative"><ShoppingBag className="w-5 h-5 text-[#C8521B]" /><span>Cart</span>{cart.length > 0 && <span className="absolute -top-1 -right-2 bg-[#1A1816] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>}</button>
        <button onClick={() => setShowSupport(!showSupport)} className="flex flex-col items-center gap-1.5"><MessageCircle className="w-5 h-5 text-emerald-700" /><span>Support</span></button>
      </div>

      <button onClick={() => setShowSupport(!showSupport)} className="fixed bottom-24 md:bottom-8 right-8 z-40 bg-[#1A1816] text-white px-6 py-4 rounded-full shadow-2xl font-black text-[10px] uppercase tracking-widest flex items-center gap-2 border border-white/10 transition-all hover:bg-black active:scale-95"><MessageCircle className="w-4 h-4 text-[#C8521B]" /><span>24/7 Live Support</span></button>
      
      {/* VENDOR MODAL */}
      {showVendorModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center p-4 z-50">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2rem] p-10 max-w-md w-full shadow-2xl space-y-6 relative border border-[#E6E2D8]">
            <div className="flex justify-between items-center border-b pb-5"><div><span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Brand Onboarding</span><h3 className="text-2xl font-serif text-[#1A1816] mt-2">Partner with E-Mall</h3></div><button onClick={() => setShowVendorModal(false)} className="text-gray-400 font-bold">✕</button></div>
            {vendorSuccess ? (
              <div className="bg-emerald-50 p-8 rounded-[1.5rem] text-center space-y-3"><CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" /><h4 className="text-lg font-black text-emerald-900 uppercase tracking-tighter">Application Sent!</h4><p className="text-emerald-700 text-xs font-medium">CEO Haris will WhatsApp you shortly.</p></div>
            ) : (
              <form onSubmit={handleVendorSubmit} className="space-y-4">
                <input type="text" required value={vendorName} onChange={(e) => setVendorName(e.target.value)} placeholder="Store Name" className="w-full px-6 py-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs" />
                <input type="tel" required value={vendorPhone} onChange={(e) => setVendorPhone(e.target.value)} placeholder="WhatsApp Number" className="w-full px-6 py-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs" />
                <input type="text" value={vendorInsta} onChange={(e) => setVendorInsta(e.target.value)} placeholder="Instagram/Website URL" className="w-full px-6 py-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs" />
                <div className="p-4 bg-emerald-50 border border-emerald-100 rounded-2xl text-[10px] text-emerald-800 leading-relaxed italic">💡 COMMISSION: 10% Sourcing fee per order. Payouts are every Monday via CEO Hub.</div>
                <button type="submit" className="w-full py-5 bg-[#1A1816] text-white font-black text-[11px] uppercase tracking-widest rounded-full shadow-lg transition-all hover:bg-black">Submit Application</button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}