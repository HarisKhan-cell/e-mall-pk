'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, ShoppingBag, Store, MapPin, X, ArrowRight, Truck, MessageCircle, Building2, Sparkles, Gift, CreditCard, Plus, ShieldCheck, Award, FileText, Minus, Clock, Mail, Phone, Megaphone, UserPlus, CheckCircle2, Home, Layers, Settings, Baby, Smile, ChevronLeft, ChevronRight, PackageCheck, BadgeCheck, Percent
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
  const [showSupport, setShowSupport] = useState(false);
  const [lastOrder, setLastOrder] = useState<any>(null);
  const [search, setSearch] = useState('');
  const [showPromoBanner, setShowPromoBanner] = useState(true);
  
  // Floor States
  const [currentFloor, setCurrentFloor] = useState(0); 
  const [hoveredProductId, setHoveredProductId] = useState<string | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const [activeImageIndex, setActiveImageIndex] = useState(0); 
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedQty, setSelectedQty] = useState(1);
  const [isGiftWrap, setIsGiftWrap] = useState(false);
  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  // Form Data
  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');
  const [paymentMethod, setPaymentMethod] = useState<'PREPAID' | 'COD' | 'EXPRESS_COD'>('PREPAID');
  const [vendorName, setVendorName] = useState('');
  const [vendorPhone, setVendorPhone] = useState('');
  const [vendorInsta, setVendorInsta] = useState('');
  const [vendorSuccess, setVendorSuccess] = useState(false);

  useEffect(() => {
    fetch('/api/products', { cache: 'no-store' })
      .then((res) => res.json())
      .then((data) => { if (Array.isArray(data)) setProducts(data); })
      .catch(console.error);
  }, []);

  const PLATFORM_FEE = 50;
  const RESALE_BRANDS = ['Khaadi Official', 'Outfitters Official', 'Ethnic Official', 'Breakout Official', 'LAMA', 'Agha Noor Official', 'Sapphire Official'];

  const floors = [
    { name: "Ground Floor", desc: "Fashion & Official Brand Outlets", icon: Store, categories: ["Fashion & Apparel"] },
    { name: "First Floor", desc: "Footwear & Shoes Gallery", icon: Layers, categories: ["Shoes & Footwear"] },
    { name: "Second Floor", desc: "Beauty, Perfumes & Organic", icon: Sparkles, categories: ["Beauty & Organic", "Perfumes & Accessories"] },
    { name: "Third Floor", desc: "Home, Lifestyle & Baby Shop", icon: Baby, categories: ["Home & Lifestyle", "Baby & Kids"] }
  ];

  const handleOpenProduct = (product: any) => {
    setSelectedProduct(product);
    setActiveImageIndex(0);
    setSelectedSize(product.category?.name === 'Shoes & Footwear' ? '39' : 'M');
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

  const removeFromCart = (index: number) => { setCart((prev) => prev.filter((_, i) => i !== index)); };
  const calculateSubtotal = () => cart.reduce((total, item) => total + item.totalPrice, 0);

  const handleApplyDiscount = () => {
    if (discountCode.toUpperCase() === 'EMALL20') {
      setAppliedDiscount(20);
      alert("Discount Applied: 20% OFF");
    } else {
      alert("Invalid Code");
    }
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
        shopBreakdown[shopName] = { 
          shopName, items: [item], subtotal: item.totalPrice, profitMargin: itemProfit, customerMarkup: itemMarkup, isResale 
        };
      } else {
        shopBreakdown[shopName].items.push(item);
        shopBreakdown[shopName].subtotal += item.totalPrice;
        shopBreakdown[shopName].profitMargin += itemProfit;
        shopBreakdown[shopName].customerMarkup += itemMarkup;
      }
    });

    const subtotal = calculateSubtotal();
    const discountVal = (subtotal * appliedDiscount) / 100;
    let deliveryFee = paymentMethod === 'COD' ? 195 : paymentMethod === 'EXPRESS_COD' ? 350 : 0;
    const finalTotal = (subtotal + totalCustomerMarkup + PLATFORM_FEE + deliveryFee) - discountVal;

    const advanceAmount = paymentMethod !== 'PREPAID' ? (finalTotal * 20) / 100 : finalTotal;
    const remainingAmount = paymentMethod !== 'PREPAID' ? finalTotal - advanceAmount : 0;

    const orderReceipt = {
      orderId: `EMALL-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-PK'),
      customerName, customerPhone, customerAddress, paymentMethod,
      cartItems: [...cart], shopBreakdown, 
      itemsSubtotal: subtotal, discountAmount: discountVal,
      buyerFee: PLATFORM_FEE, buyerDeliveryFee: deliveryFee,
      totalHardworkProfit, totalCustomerMarkup,
      totalAmount: finalTotal, advanceAmount, remainingAmount,
      status: 'Stock Verification'
    };

    try { await fetch('/api/orders', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(orderReceipt) }); } catch (err) {}
    setLastOrder(orderReceipt); setCart([]); setShowCheckoutForm(false); setShowInvoice(true);
  };

  const handleVendorSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newApp = { vendorName, vendorPhone, vendorInsta, vendorCity: 'Lahore', date: new Date().toLocaleDateString('en-PK') };
    try { await fetch('/api/vendors', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(newApp) }); } catch (err) {}
    setVendorSuccess(true);
    setTimeout(() => { setVendorSuccess(false); setShowVendorModal(false); }, 3000);
  };

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.title.toLowerCase().includes(search.toLowerCase()) || p.description?.toLowerCase().includes(search.toLowerCase());
    const matchesFloor = floors[currentFloor].categories.includes(p.category?.name);
    return matchesSearch && matchesFloor;
  });

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-[#1A1816] font-sans relative overflow-x-hidden selection:bg-[#C8521B] selection:text-white">
      
      {showPromoBanner && (
        <div className="bg-[#C8521B] text-white text-[11px] font-bold py-2.5 px-4 text-center relative z-50 shadow-lg">
          <Sparkles className="w-4 h-4 inline mr-2 animate-pulse" />
          <span>🎉 USE CODE <strong>EMALL20</strong> FOR 20% OFF YOUR FIRST ORDER!</span>
          <button onClick={() => setShowPromoBanner(false)} className="absolute right-4 font-bold">✕</button>
        </div>
      )}

      {/* NAVBAR - RESTORED ADMIN PORTAL BUTTON */}
      <nav className="bg-[#FAF8F5]/90 backdrop-blur-2xl border-b border-[#E6E2D8] sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center gap-6">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 rounded-2xl bg-white border border-[#E6E2D8] flex items-center justify-center shadow-sm"><EMallLogoSymbol /></div>
              <div><span className="text-xl font-bold tracking-widest text-[#1A1816] uppercase font-serif">E-MALL <span className="text-[10px] text-[#C8521B]">PK</span></span><span className="text-[10px] text-[#66615C] block -mt-1 font-medium">Digital Mall Platform</span></div>
            </Link>
          </div>
          <div className="flex items-center gap-4 text-xs font-bold tracking-wider uppercase">
            <Link href="/track-order" className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-white text-[#1A1816] rounded-full border border-[#E6E2D8] text-[10px] shadow-sm"><PackageCheck className="w-3.5 h-3.5 text-[#C8521B]" /><span>Track Order</span></Link>
            <button onClick={() => setShowVendorModal(true)} className="hidden lg:flex items-center gap-1.5 px-4 py-2 bg-emerald-50 text-emerald-900 rounded-full border border-emerald-200 text-[11px]"><UserPlus className="w-3.5 h-3.5 text-emerald-700" /><span>Become a Seller</span></button>
            
            {/* RESTORED ADMIN BUTTON */}
            <Link href="/admin/add-product" className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-white text-[#1A1816] rounded-full border border-[#E6E2D8] text-[11px] shadow-sm hover:bg-gray-50 transition-all">
              <Plus className="w-3.5 h-3.5 text-[#C8521B]" /><span>Admin Portal</span>
            </Link>

            <button onClick={() => setShowCart(true)} className="relative p-2.5 bg-[#C8521B] text-white rounded-full shadow-lg shadow-[#C8521B]/20"><ShoppingBag className="w-4 h-4" />{cart.length > 0 && <span className="absolute -top-1.5 -right-1.5 bg-[#1A1816] text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-md">{cart.length}</span>}</button>
          </div>
        </div>
      </nav>

      {/* HERO - RESTORED GRAND ATRIUM & BRAND NAMES */}
      <div className="relative py-20 px-8 text-center border-b border-[#E6E2D8] overflow-hidden bg-gray-950">
        <div className="absolute inset-0 z-0 opacity-40 scale-105" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1519567241046-7f570eee3ce6?q=80&w=2070')", backgroundSize: 'cover', backgroundPosition: 'center 40%' }} />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/70 via-black/20 to-[#FAF8F5]/10" />
        <div className="relative z-10 max-w-5xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20 mb-2"><Sparkles className="w-3.5 h-3.5 text-amber-400" /><span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white">Official Brand Destination</span></div>
          <h1 className="text-5xl sm:text-7xl font-serif font-normal text-white tracking-tighter leading-[1.1] drop-shadow-2xl">Endless Brands. <br /><span className="italic text-gray-300 font-light underline decoration-[#C8521B]/40 underline-offset-8">One Easy Checkout.</span></h1>
          
          {/* RESTORED BRAND MENTIONS */}
          <p className="text-gray-200 text-sm sm:text-lg max-w-2xl mx-auto font-light leading-relaxed">Shop official inventory from <strong className="text-white">Khaadi, Outfitters, Ethnic, Breakout, Agha Noor, and LAMA</strong> directly in one single cart.</p>
        </div>
      </div>

      {/* FLOOR DIRECTORY */}
      <div className="bg-[#1A1816] py-6 sticky top-20 z-30 shadow-2xl border-b border-white/5 overflow-x-auto font-sans">
         <div className="max-w-7xl mx-auto px-6 flex justify-center gap-4 min-w-max">
            {floors.map((floor, idx) => {
               const Icon = floor.icon;
               const isActive = currentFloor === idx;
               return (
                 <button key={idx} onClick={() => setCurrentFloor(idx)} className={`flex items-center gap-3 px-6 py-3 rounded-2xl transition-all duration-500 border ${isActive ? 'bg-[#C8521B] border-[#C8521B] shadow-lg scale-105' : 'bg-white/5 border-white/10 text-gray-400 hover:text-white'}`}>
                   <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#C8521B]'}`} />
                   <div className="text-left"><p className="text-[10px] font-black uppercase tracking-widest leading-none">{floor.name}</p><p className="text-[9px] font-medium leading-tight mt-0.5">{floor.desc}</p></div>
                 </button>
               )
            })}
         </div>
      </div>

      {/* GRID */}
      <AnimatePresence mode="wait">
        <motion.div key={currentFloor} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }} transition={{ duration: 0.4 }} className="max-w-7xl mx-auto px-8 py-16">
          <div className="border-b border-[#E6E2D8] pb-8 mb-12 flex justify-between items-end gap-6">
             <div><span className="text-[10px] font-black text-[#C8521B] uppercase tracking-[0.3em] block mb-2">{floors[currentFloor].name} Directory</span><h2 className="text-4xl font-serif text-[#1A1816] tracking-tight">{floors[currentFloor].desc}</h2></div>
             <div className="relative w-72 md:block hidden"><Search className="w-4 h-4 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" /><input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search floor items..." className="w-full pl-11 pr-4 py-3 bg-white border border-[#E6E2D8] rounded-2xl text-xs" /></div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
            {filteredProducts.map((product) => {
              let images = []; try { images = JSON.parse(product.images || '[]'); } catch (e) { images = [product.images]; }
              const displayImg = (hoveredProductId === product.id && images.length > 1) ? images[1] : images[0];
              return (
                <div key={product.id} onClick={() => handleOpenProduct(product)} onMouseEnter={() => setHoveredProductId(product.id)} onMouseLeave={() => setHoveredProductId(null)} className="bg-white border border-[#E6E2D8] rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer flex flex-col justify-between">
                  <div className="relative h-80 w-full overflow-hidden bg-gray-100">
                    <img src={displayImg} className="w-full h-full object-cover object-top transition-all" />
                    <div className="absolute top-4 left-4 bg-white/90 px-3 py-1.5 rounded-full border text-[9px] font-black uppercase"><Store className="w-3 h-3 inline mr-1 text-[#C8521B]" /> {product.shop?.name}</div>
                    <div className="absolute top-4 right-4"><div className="bg-emerald-50 text-emerald-700 backdrop-blur-md px-2.5 py-1 rounded-full border border-emerald-200 text-[9px] font-bold"><span className="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block mr-1 animate-pulse" /> In Stock</div></div>
                    {images.length > 1 && <div className="absolute bottom-4 right-4 bg-black/70 text-white px-2 py-1 rounded-lg text-[9px] font-bold tracking-widest uppercase">+{images.length - 1} Photos</div>}
                  </div>
                  <div className="p-6">
                    <h3 className="text-base font-bold text-[#1A1816] group-hover:text-[#C8521B] line-clamp-1">{product.title}</h3>
                    <p className="text-[#66615C] text-xs line-clamp-2 mt-2 leading-relaxed">{product.description}</p>
                    <div className="pt-4 border-t border-[#E6E2D8] mt-4 flex items-center justify-between">
                      <div><span className="text-[9px] uppercase font-bold text-[#66615C] block">Retail Price</span><span className="text-xl font-extrabold text-[#1A1816]">PKR {product.price?.toLocaleString()}</span></div>
                      <button className="px-5 py-2.5 bg-[#C8521B] text-white font-black text-[10px] uppercase rounded-full shadow-md">Select Size</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>

      {/* QUICK VIEW */}
      {selectedProduct && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-4xl w-full shadow-2xl relative overflow-y-auto max-h-[90vh]">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 p-2 text-gray-400 hover:text-black bg-gray-100 rounded-full font-bold">✕</button>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="space-y-4">
                <div className="relative h-96 rounded-[2rem] overflow-hidden bg-gray-100 border border-[#E6E2D8]">
                  <img src={(() => { let imgs = []; try { imgs = JSON.parse(selectedProduct.images); } catch(e) { imgs = [selectedProduct.images]; } return imgs[activeImageIndex]; })()} className="w-full h-full object-contain" />
                </div>
                <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
                  {(() => {
                    let imgs = []; try { imgs = JSON.parse(selectedProduct.images); } catch(e) { imgs = [selectedProduct.images]; }
                    return imgs.map((img:string, idx:number) => (
                      <img key={idx} src={img} onClick={() => setActiveImageIndex(idx)} className={`w-16 h-16 rounded-2xl object-cover cursor-pointer border-2 transition-all ${activeImageIndex === idx ? 'border-[#C8521B] scale-105 shadow-lg' : 'border-transparent opacity-60'}`} />
                    ));
                  })()}
                </div>
              </div>
              <div className="space-y-6">
                <div><h3 className="text-3xl font-serif text-[#1A1816] tracking-tight">{selectedProduct.title}</h3><p className="text-[#66615C] text-sm mt-3 font-light leading-relaxed">{selectedProduct.description}</p></div>
                <div className="flex gap-2 py-4 border-y border-[#E6E2D8]">
                   <div className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-500"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> Brand Verified</div>
                   <div className="flex items-center gap-2 text-[9px] font-black uppercase text-gray-500"><Award className="w-3.5 h-3.5 text-[#C8521B]" /> 7-Day Guarantee</div>
                </div>
                <div className="flex justify-between items-center"><span className="text-sm font-bold text-gray-400">Retail Price:</span><span className="text-3xl font-black text-[#1A1816]">PKR {selectedProduct.price?.toLocaleString()}</span></div>
                
                {/* SMART SIZING */}
                <div>
                   <label className="block text-[10px] font-bold uppercase mb-2">Select {selectedProduct.category?.name === 'Shoes & Footwear' ? 'Shoe Size' : 'Option'}:</label>
                   <div className="flex flex-wrap gap-2">
                     {(selectedProduct.category?.name === 'Shoes & Footwear' ? ['37','38','39','40','41','42'] : ['S','M','L','XL']).map((sz) => (
                       <button key={sz} onClick={() => setSelectedSize(sz)} className={`w-11 h-11 rounded-xl font-bold border transition-all ${selectedSize === sz ? 'bg-[#C8521B] text-white border-[#C8521B] scale-110 shadow-lg' : 'bg-white text-gray-500 hover:text-black'}`}>{sz}</button>
                     ))}
                   </div>
                </div>
                <button onClick={handleAddToCartFromModal} className="w-full py-4 bg-[#C8521B] text-white font-black uppercase text-xs rounded-full shadow-lg flex items-center justify-center gap-2 transition-all hover:bg-[#a83e10]"><ShoppingBag className="w-4 h-4" /> <span>Add to Cart (PKR {((selectedProduct.price * selectedQty) + (isGiftWrap ? 150 : 0)).toLocaleString()})</span></button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* --- CART DRAWER --- */}
      {showCart && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-end z-50">
          <motion.div initial={{ x: 400 }} animate={{ x: 0 }} className="bg-white border-l border-[#E6E2D8] w-full max-w-md h-full p-8 shadow-2xl flex flex-col justify-between overflow-y-auto font-sans">
            <div>
              <div className="flex justify-between items-center pb-6 border-b border-[#E6E2D8]"><div className="flex items-center gap-2"><ShoppingBag className="w-5 h-5 text-[#C8521B]" /><h3 className="text-xl font-bold text-[#1A1816] font-serif">Your Mall Cart</h3></div><button onClick={() => setShowCart(false)} className="p-1 text-gray-400 hover:text-black font-bold">✕</button></div>
              {cart.length === 0 ? <div className="text-center py-32 text-gray-400 font-serif italic text-lg">Your cart is empty.</div> : (
                <div className="mt-8 space-y-4">
                  {cart.map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center bg-gray-50 p-5 rounded-3xl border border-[#E6E2D8]">
                      <div><h4 className="text-sm font-bold text-[#1A1816] line-clamp-1">{item.title}</h4><p className="text-[10px] text-[#66615C] mt-1 font-black uppercase tracking-widest">{item.selectedSize} | Qty: {item.quantity}</p></div>
                      <div className="flex items-center gap-4"><span className="text-sm font-black text-[#1A1816]">PKR {item.totalPrice.toLocaleString()}</span><button onClick={() => removeFromCart(idx)} className="p-2 text-red-500 font-bold">✕</button></div>
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
                   <button onClick={handleApplyDiscount} className="text-[#C8521B] text-[10px] font-black uppercase tracking-widest px-3 py-1 hover:bg-white rounded-lg">Apply</button>
                </div>
                <div className="flex justify-between"><span>Subtotal:</span><span className="text-[#1A1816] font-black">PKR {calculateSubtotal().toLocaleString()}</span></div>
                <div className="flex justify-between text-[#C8521B] font-black uppercase tracking-widest text-[10px]"><span>Mall Protection Fee:</span><span>PKR {PLATFORM_FEE}</span></div>
                <button onClick={() => { setShowCart(false); setShowCheckoutForm(true); }} className="w-full py-5 bg-[#1A1816] hover:bg-black text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg flex items-center justify-center gap-3 mt-4"><span>Proceed to Checkout</span><ArrowRight className="w-4 h-4" /></button>
              </div>
            )}
          </motion.div>
        </div>
      )}

      {/* --- CHECKOUT FORM --- */}
      {showCheckoutForm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-md w-full shadow-2xl text-xs space-y-4 relative max-h-[90vh] overflow-y-auto border border-[#E6E2D8] font-sans">
            <div className="flex justify-between items-center border-b pb-4"><div><span className="text-[10px] font-black text-[#C8521B] uppercase tracking-widest">Verification Hub</span><h3 className="text-xl font-serif text-[#1A1816] mt-1">Delivery Details</h3></div><button onClick={() => setShowCheckoutForm(false)} className="text-gray-400 font-bold">✕</button></div>
            <form onSubmit={handleFinalCheckout} className="space-y-3.5">
              <input type="text" required value={customerName} onChange={(e) => setCustomerName(e.target.value)} placeholder="Full Customer Name" className="w-full px-5 py-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816]" />
              <input type="tel" required value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} placeholder="WhatsApp Number" className="w-full px-5 py-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816]" />
              <div className="space-y-2">
                <button type="button" onClick={() => setPaymentMethod('PREPAID')} className={`w-full p-4 rounded-2xl border text-left flex justify-between items-center ${paymentMethod === 'PREPAID' ? 'bg-emerald-50 border-emerald-500' : 'bg-gray-50 border-[#E6E2D8]'}`}><div className="flex items-center gap-3"><CreditCard className="w-4 h-4 text-emerald-600" /><div><p className="font-bold text-xs uppercase tracking-tight">Full Prepaid</p><p className="text-[9px]">Fast Verification & Free Delivery</p></div></div><span className="text-[9px] bg-emerald-600 text-white font-black px-2 py-0.5 rounded">FREE</span></button>
                <button type="button" onClick={() => setPaymentMethod('COD')} className={`w-full p-4 rounded-2xl border text-left flex justify-between items-center ${paymentMethod === 'COD' ? 'bg-amber-50 border-[#C8521B]' : 'bg-gray-50 border-[#E6E2D8]'}`}><div className="flex items-center gap-3"><Truck className="w-4 h-4 text-[#C8521B]" /><div><p className="font-bold text-xs uppercase tracking-tight">Standard COD (20% Advance)</p><p className="text-[9px]">Standard 2-3 Days Delivery</p></div></div><span className="text-xs font-bold text-[#1A1816]">PKR 195</span></button>
              </div>
              <textarea rows={2} required value={customerAddress} onChange={(e) => setCustomerAddress(e.target.value)} placeholder="Full House #, Street Name, City" className="w-full px-5 py-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs" />
              <div className="p-3 bg-gray-100 border border-[#E6E2D8] rounded-2xl text-[9px] text-gray-500 italic uppercase tracking-tighter leading-relaxed">⚠️ POLICY: COD orders require a 20% security deposit. Receipt must be sent via WhatsApp.</div>
              <button type="submit" className="w-full py-4 bg-[#C8521B] hover:bg-[#a83e10] text-white font-black text-xs uppercase rounded-full shadow-lg">Confirm & Submit Order</button>
            </form>
          </div>
        </div>
      )}

      {/* --- INVOICE RECEIPT --- */}
      {showInvoice && lastOrder && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-[2.5rem] p-10 max-w-lg w-full shadow-2xl text-xs space-y-6 relative overflow-y-auto max-h-[90vh] border border-[#E6E2D8] font-sans">
            <div className="flex justify-between items-start border-b pb-5">
              <div><span className="bg-emerald-100 text-emerald-800 text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">Order Submitted ✓</span><h3 className="text-2xl font-serif text-[#1A1816] mt-2 tracking-tight">Order Invoice Receipt</h3><p className="text-[#66615C]">ID: {lastOrder.orderId} • {lastOrder.date}</p></div>
              <button onClick={() => setShowInvoice(false)} className="text-gray-400 font-bold font-serif text-base">✕</button>
            </div>
            <div className="bg-gray-50 border p-5 rounded-3xl space-y-1"><p className="text-[#1A1816] font-black text-sm uppercase">{lastOrder.customerName} ({lastOrder.customerPhone})</p><p className="text-[#66615C] italic">{lastOrder.customerAddress}</p></div>
            <div className="space-y-3">
              {Object.values(lastOrder.shopBreakdown).map((sub: any, idx: number) => (
                <div key={idx} className="bg-gray-50 border p-5 rounded-3xl space-y-3">
                  <div className="flex justify-between font-black text-[#1A1816] border-b pb-2 uppercase text-[10px] tracking-widest"><span className="text-[#C8521B]">{sub.shopName}</span><span>PKR {sub.subtotal.toLocaleString()}</span></div>
                  {sub.items.map((item: any, i: number) => (<div key={i} className="flex justify-between text-[11px]"><span className="text-gray-500">• {item.title} (x{item.quantity})</span><span className="font-black text-[#1A1816]">PKR {item.totalPrice.toLocaleString()}</span></div>))}
                  {sub.isResale && (<div className="pt-1 flex justify-between text-[10px] text-amber-800 font-black uppercase tracking-widest"><span>5% Sourcing Fee:</span><span>PKR {sub.customerMarkup.toLocaleString()}</span></div>)}
                </div>
              ))}
            </div>
            <div className="border-t pt-5 space-y-2.5 font-bold uppercase tracking-widest text-[9px] text-gray-500 border-dashed border-[#E6E2D8]">
              <div className="flex justify-between text-[#C8521B]"><span>Platform Protection Fee:</span><span className="font-black">PKR {lastOrder.buyerFee}</span></div>
              <div className="flex justify-between text-indigo-700"><span>Hub Consolidated Logistics:</span><span className="font-black">{lastOrder.buyerDeliveryFee === 0 ? 'FREE' : `PKR ${lastOrder.buyerDeliveryFee}`}</span></div>
              <div className="bg-[#1A1816] p-6 rounded-[2rem] mt-6 space-y-3 shadow-2xl text-white">
                 <div className="flex justify-between text-[10px] opacity-70 tracking-widest"><span>Order Total Value:</span><span className="font-black text-lg">PKR {lastOrder.totalAmount.toLocaleString()}</span></div>
                 <div className="flex justify-between text-emerald-400 font-black text-sm uppercase tracking-tighter border-t border-white/10 pt-3"><span>Advance Required (20%):</span><span>PKR {lastOrder.advanceAmount.toLocaleString()}</span></div>
                 <div className="flex justify-between text-amber-400 font-black text-xs uppercase tracking-widest"><span>Remaining Balance:</span><span>PKR {lastOrder.remainingAmount.toLocaleString()}</span></div>
              </div>
            </div>
            <button onClick={() => setShowInvoice(false)} className="w-full py-4 bg-[#1A1816] text-white font-black text-[10px] uppercase tracking-widest rounded-full shadow-lg">Done & Return to Mall</button>
          </div>
        </div>
      )}

      {/* LUXURY 5-COLUMN FOOTER - RESTORED FULL VERSION */}
      <footer className="bg-[#090807] border-t border-white/5 text-[#D8D3CC] pt-24 pb-12 px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-16 pb-16 border-b border-white/5 font-sans">
          <div className="space-y-4"><div className="flex items-center gap-3 text-white font-serif font-bold text-lg"><EMallLogoSymbol /><span>E-MALL PAKISTAN</span></div><p className="text-gray-500 text-[11px] leading-relaxed">Pakistan's 1st digital mall platform sourcing 100% original labels. One Cart, One Box.</p></div>
          <div className="space-y-3"><h4 className="text-white font-black uppercase text-[10px] tracking-widest">Care Hub</h4><ul className="space-y-2 text-gray-500 text-[11px] uppercase font-bold tracking-widest"><li>7-Day exchange</li><li>Return policy</li><li><Link href="/track-order" className="hover:text-[#C8521B]">Track order</Link></li><li><button onClick={() => setShowVendorModal(true)} className="text-emerald-400 font-black">Become seller</button></li></ul></div>
          <div className="space-y-3"><h4 className="text-white font-black uppercase text-[10px] tracking-widest">Trust Hub</h4><div className="space-y-2 text-gray-500 text-[11px] font-bold tracking-widest"><div className="flex items-center gap-2"><FileText className="w-3.5 h-3.5 text-[#C8521B]" /> <span>FBR Registered</span></div><div className="flex items-center gap-2"><ShieldCheck className="w-3.5 h-3.5 text-emerald-500" /> <span>SSL Protected Hub</span></div></div></div>
          <div className="space-y-3">
             <h4 className="text-white font-black uppercase text-[10px] tracking-widest">Support Hub</h4>
             <div className="space-y-2 text-gray-500 text-[11px] font-black tracking-widest uppercase"><p>emallofficials869@gmail.com</p><p>+92 (0)42 111-362-557</p></div>
          </div>
          <div className="space-y-3"><h4 className="text-white font-black uppercase text-[10px] tracking-widest">Logistics</h4><p className="text-gray-500 text-[11px] font-bold uppercase tracking-tighter italic">Consolidated Hub via TCS / SKYNET.</p></div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 flex justify-between items-center text-[10px] text-gray-600 font-black uppercase tracking-widest font-sans"><p>© 2026 E-MALL PAKISTAN (PVT) LTD.</p><Link href="/admin/add-product" className="hover:text-[#C8521B] font-black uppercase tracking-widest">CEO Admin Hub</Link></div>
      </footer>
      
      {/* RESTORED 24/7 SUPPORT & MOBILE NAV */}
      <button onClick={() => setShowSupport(!showSupport)} className="fixed bottom-20 md:bottom-8 right-8 z-40 bg-[#1A1816] text-white px-5 py-3.5 rounded-full shadow-2xl font-black text-[11px] uppercase tracking-widest flex items-center gap-2 border border-white/20 transition-all hover:bg-black"><MessageCircle className="w-4 h-4 text-[#C8521B]" /><span>24/7 Support</span></button>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-[#E6E2D8] px-8 py-4 flex justify-between items-center text-[9px] font-black uppercase text-gray-400">
        <button onClick={() => setCurrentFloor(0)} className="flex flex-col items-center gap-1.5 transition-all"><Home className={`w-5 h-5 ${currentFloor === 0 ? 'text-[#C8521B]' : ''}`} /><span>Home</span></button>
        <button onClick={() => setCurrentFloor(1)} className="flex flex-col items-center gap-1.5 transition-all"><Layers className={`w-5 h-5 ${currentFloor === 1 ? 'text-[#C8521B]' : ''}`} /><span>Shoes</span></button>
        <button onClick={() => setShowCart(true)} className="flex flex-col items-center gap-1.5 relative"><ShoppingBag className="w-5 h-5 text-[#C8521B]" /><span>Cart</span>{cart.length > 0 && <span className="absolute -top-1 -right-2 bg-[#1A1816] text-white text-[8px] w-4 h-4 rounded-full flex items-center justify-center shadow-md">{cart.length}</span>}</button>
        <Link href="/admin/add-product" className="flex flex-col items-center gap-1.5"><Settings className="w-5 h-5 text-gray-400" /><span>Hub</span></Link>
      </div>

      {/* VENDOR MODAL RESTORED FULL VERSION */}
      {showVendorModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex items-center justify-center p-4 z-50">
          <motion.div initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="bg-white rounded-[2rem] p-10 max-w-md w-full shadow-2xl text-xs space-y-4 relative border border-[#E6E2D8]">
            <div className="flex justify-between items-center border-b pb-4"><div><span className="text-[10px] font-black text-emerald-700 uppercase tracking-widest">Brand Onboarding</span><h3 className="text-xl font-serif text-[#1A1816] mt-1 font-black tracking-tight">Partner with E-Mall</h3></div><button onClick={() => setShowVendorModal(false)} className="text-gray-400 font-bold">✕</button></div>
            {vendorSuccess ? (
              <div className="bg-emerald-50 border border-emerald-200 p-8 rounded-[1.5rem] text-center space-y-2"><CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto" /><h4 className="text-sm font-black text-emerald-900 uppercase">Application Submitted!</h4><p className="text-emerald-700 text-xs">Our team will WhatsApp you within 2 hours.</p></div>
            ) : (
              <form onSubmit={handleVendorSubmit} className="space-y-3.5">
                <input type="text" required value={vendorName} onChange={(e) => setVendorName(e.target.value)} placeholder="Store Name" className="w-full px-5 py-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816]" />
                <input type="tel" required value={vendorPhone} onChange={(e) => setVendorPhone(e.target.value)} placeholder="WhatsApp Contact Number" className="w-full px-5 py-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs text-[#1A1816]" />
                <input type="text" value={vendorInsta} onChange={(e) => setVendorInsta(e.target.value)} placeholder="Instagram/Website URL" className="w-full px-5 py-4 bg-gray-50 border border-[#E6E2D8] rounded-2xl text-xs" />
                <div className="p-3 bg-emerald-50 border border-emerald-100 rounded-xl text-[10px] text-emerald-800 leading-relaxed italic">💡 COMMISSION: 10% Sourcing fee per order. Payouts every Monday.</div>
                <button type="submit" className="w-full py-4 bg-emerald-700 text-white font-black text-xs uppercase tracking-widest rounded-full shadow-lg transition-all hover:bg-emerald-800">Submit Application</button>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </div>
  );
}