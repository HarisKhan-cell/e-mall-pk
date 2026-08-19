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
  Image as ImageIcon
} from 'lucide-react';

export default function AdminAddProductPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [successMessage, setSuccessMessage] = useState(false);
  const [loading, setLoading] = useState(false);

  // Form State
  const [title, setTitle] = useState('');
  const [brand, setBrand] = useState('Khaadi Official');
  const [customBrand, setCustomBrand] = useState('');
  const [category, setCategory] = useState('Fashion & Apparel');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const loadProducts = () => {
    fetch('/api/products')
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch(console.error);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !price || !imageUrl) return;

    setLoading(true);
    const finalBrand = brand === 'Custom' ? customBrand : brand;

    const newProduct = {
      id: `custom-${Date.now()}`,
      title,
      description: description || '100% Original Brand Guaranteed article.',
      price: parseFloat(price),
      category: { name: category },
      shop: { name: finalBrand, commissionRate: 5.0 },
      images: JSON.stringify([imageUrl]),
    };

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newProduct),
      });

      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
        setTitle('');
        setPrice('');
        setDescription('');
        setImageUrl('');
        setSuccessMessage(true);
        setTimeout(() => setSuccessMessage(false), 4000);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    try {
      const res = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        const data = await res.json();
        setProducts(data.products);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const brandOptions = [
    'Khaadi Official',
    'Breakout Official',
    'Sapphire Official',
    'SAYA Official',
    'ETHNIC Official',
    'J. Junaid Jamshed',
    'Limelight Official',
    'Custom'
  ];

  const categories = [
    'Fashion & Apparel',
    'Perfumes & Accessories',
    'Shoes & Footwear',
    'Artificial Jewelry',
    'Bags & Accessories',
    'Home Decoration',
    'Watches'
  ];

  return (
    <div className="min-h-screen bg-[#090807] text-[#E6DFD5] bg-grid font-sans p-6 sm:p-12">
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
              <span className="text-[10px] font-bold text-[#D95D27] uppercase tracking-widest block">Admin Control Center</span>
              <h1 className="text-3xl font-serif text-white mt-0.5">Product Management Portal</h1>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 text-xs px-4 py-2 rounded-full font-bold">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span>{products.length} Products Active in Store</span>
          </div>
        </div>

        {/* Form + Live Card Preview Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Add Product Form */}
          <div className="lg:col-span-2 bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
            <div className="border-b border-white/10 pb-4">
              <h2 className="text-xl font-serif text-white flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#D95D27]" />
                <span>Add New Article</span>
              </h2>
              <p className="text-gray-400 text-xs mt-1">Fill out the fields below to publish a product live to the server API.</p>
            </div>

            {successMessage && (
              <div className="bg-emerald-950/80 border border-emerald-500/50 p-4 rounded-2xl text-emerald-300 text-xs flex items-center gap-3 font-bold">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Product published live to server! It is now visible to all customers.</span>
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
                  type="number"
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
                  type="url"
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
                disabled={loading}
                className="w-full py-4 bg-[#D95D27] hover:bg-[#c44e1d] text-white font-black text-xs uppercase tracking-widest rounded-full shadow-2xl shadow-[#D95D27]/30 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Plus className="w-4 h-4" />
                <span>{loading ? 'Publishing...' : 'Publish Article Live'}</span>
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
                    <img src={imageUrl} alt="Preview" className="w-full h-full object-cover" />
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
                      PKR {price ? parseFloat(price).toLocaleString() : '0'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Existing Products Management Table */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl space-y-6">
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
    </div>
  );
}