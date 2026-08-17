'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function SellerDashboard() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('10');
  const [categoryName, setCategoryName] = useState('Toys & Games');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState('');
  const [imagePreview, setImagePreview] = useState('');

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (!storedUser) {
      router.push('/login');
      return;
    }
    const parsedUser = JSON.parse(storedUser);
    if (parsedUser.role !== 'SELLER') {
      router.push('/');
      return;
    }
    setUser(parsedUser);

    if (parsedUser.shop?.id) {
      fetchProducts(parsedUser.shop.id);
    }
  }, [router]);

  const fetchProducts = async (shopId: string) => {
    try {
      const res = await fetch(`/api/products?shopId=${shopId}`);
      if (res.ok) {
        const data = await res.json();
        setProducts(data);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImage(base64String);
        setImagePreview(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          price,
          stock,
          description,
          categoryName,
          image,
          shopId: user.shop.id,
        }),
      });

      if (res.ok) {
        setShowModal(false);
        setTitle('');
        setPrice('');
        setDescription('');
        setImage('');
        setImagePreview('');
        fetchProducts(user.shop.id);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (productId: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    try {
      const res = await fetch(`/api/products?id=${productId}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchProducts(user.shop?.id || '');
      }
    } catch (err) {
      console.error(err);
    }
  };

  if (!user) return <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">Loading Dashboard...</div>;

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center bg-gray-800 p-6 rounded-2xl border border-gray-700 mb-8 shadow-xl">
          <div>
            <span className="bg-indigo-600/20 text-indigo-400 text-xs font-bold px-3 py-1 rounded-full border border-indigo-500/30">Official Seller Partner</span>
            <h1 className="text-3xl font-bold mt-2 text-indigo-300">{user.shop?.name || 'My Seller Store'}</h1>
            <p className="text-gray-400 text-sm">Managed by {user.name} ({user.email})</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowModal(true)}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl shadow-lg transition-all"
            >
              + Add Product
            </button>
            <button
              onClick={() => {
                localStorage.removeItem('user');
                router.push('/login');
              }}
              className="px-4 py-2.5 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 rounded-xl text-sm font-semibold transition-all"
            >
              Sign Out
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
            <p className="text-xs text-gray-400 font-semibold uppercase">Platform Fee</p>
            <h3 className="text-3xl font-bold text-indigo-400 mt-1">{user.shop?.commissionRate || 5.0}%</h3>
            <p className="text-xs text-gray-500 mt-2">Deducted per order sale</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
            <p className="text-xs text-gray-400 font-semibold uppercase">Total Products Listed</p>
            <h3 className="text-3xl font-bold text-emerald-400 mt-1">{products.length} Items</h3>
            <p className="text-xs text-gray-500 mt-2">Live on E-Mall Storefront</p>
          </div>

          <div className="bg-gray-800 p-6 rounded-2xl border border-gray-700 shadow-lg">
            <p className="text-xs text-gray-400 font-semibold uppercase">Shop Status</p>
            <h3 className="text-3xl font-bold text-amber-400 mt-1">Verified Partner ✓</h3>
            <p className="text-xs text-gray-500 mt-2">E-Mall Official Vendor</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-indigo-300 mb-4">Your Listed Products</h2>
        {products.length === 0 ? (
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-12 text-center">
            <p className="text-gray-400 mb-4">No products listed in your shop yet.</p>
            <button
              onClick={() => setShowModal(true)}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg"
            >
              List Your First Product
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {products.map((product) => {
              const images = JSON.parse(product.images || '[]');
              return (
                <div key={product.id} className="bg-gray-800 border border-gray-700 rounded-2xl overflow-hidden shadow-lg hover:border-indigo-500 transition-all flex flex-col justify-between">
                  <div>
                    <img src={images[0]} alt={product.title} className="w-full h-48 object-cover" />
                    <div className="p-5">
                      <span className="text-xs font-semibold text-indigo-400 uppercase tracking-wider">Product Item</span>
                      <h3 className="text-lg font-bold text-white mt-1">{product.title}</h3>
                      <p className="text-gray-400 text-xs mt-1 line-clamp-2">{product.description}</p>
                      <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                        <span className="text-xl font-extrabold text-emerald-400">PKR {product.price.toLocaleString()}</span>
                        <span className="text-xs font-bold text-gray-400 bg-gray-900 px-2.5 py-1 rounded-lg">Stock: {product.stock}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-2">
                    <button
                      onClick={() => handleDeleteProduct(product.id)}
                      className="w-full py-2 bg-red-600/20 hover:bg-red-600 text-red-300 hover:text-white border border-red-500/30 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-2"
                    >
                      🗑 Delete Product
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center p-4 z-50">
          <div className="bg-gray-800 border border-gray-700 rounded-2xl p-6 w-full max-w-lg shadow-2xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-indigo-400">Add New Product to Shop</h3>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-white font-bold">✕</button>
            </div>

            <form onSubmit={handleAddProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Product Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Remote Control Car / Action Figure"
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Price (PKR)</label>
                  <input
                    type="number"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="2500"
                    className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Stock Quantity</label>
                  <input
                    type="number"
                    required
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="10"
                    className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Upload Photo from Mac Gallery</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full px-4 py-2 bg-gray-900 border border-gray-700 rounded-xl text-xs text-gray-300 focus:outline-none focus:border-indigo-500 file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-indigo-600 file:text-white hover:file:bg-indigo-500 cursor-pointer"
                />
                {imagePreview && (
                  <div className="mt-2">
                    <img src={imagePreview} alt="Preview" className="h-24 w-auto rounded-lg object-cover border border-gray-700" />
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-400 uppercase mb-1">Description</label>
                <textarea
                  rows={3}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your product..."
                  className="w-full px-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-sm text-white focus:outline-none focus:border-indigo-500"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 py-2.5 bg-gray-700 hover:bg-gray-600 text-white font-bold rounded-xl text-sm"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl text-sm shadow-lg disabled:opacity-50"
                >
                  {loading ? 'Adding Product...' : 'Add to Shop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
