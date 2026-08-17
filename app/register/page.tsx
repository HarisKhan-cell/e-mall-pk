'use client';

import { useState } from 'react';
import Link from 'next/link';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'BUYER' | 'SELLER'>('BUYER');
  const [shopName, setShopName] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password, role, shopName }),
      });

      const responseText = await res.text();
      let data;
      try {
        data = JSON.parse(responseText);
      } catch (e) {
        throw new Error('Server response error');
      }

      if (!res.ok) {
        throw new Error(data.error || 'Registration failed');
      }

      setSuccess(`Account created successfully as ${data.role}! 🎉`);
      setName('');
      setEmail('');
      setPassword('');
      setShopName('');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-2 text-indigo-400">Join E-Mall</h2>
        <p className="text-gray-400 text-center mb-6 text-sm">Create an account as a Buyer or Seller</p>

        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 rounded-lg text-sm text-center">{error}</div>}
        {success && <div className="mb-4 p-3 bg-green-500/20 border border-green-500 text-green-300 rounded-lg text-sm text-center">{success}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex bg-gray-900 p-1 rounded-xl border border-gray-700">
            <button
              type="button"
              onClick={() => setRole('BUYER')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                role === 'BUYER' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Buyer Account
            </button>
            <button
              type="button"
              onClick={() => setRole('SELLER')}
              className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${
                role === 'SELLER' ? 'bg-indigo-600 text-white shadow-md' : 'text-gray-400 hover:text-white'
              }`}
            >
              Seller Account
            </button>
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Full Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Haris Khan"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="haris@example.com"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-white"
            />
          </div>

          {role === 'SELLER' && (
            <div>
              <label className="block text-xs font-semibold uppercase text-gray-400 mb-1">Shop / Brand Name</label>
              <input
                type="text"
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
                placeholder="e.g. Khaadi Official or Haris Electronics"
                className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-xl focus:outline-none focus:border-indigo-500 text-sm text-white"
              />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50"
          >
            {loading ? 'Creating Account...' : `Register as ${role}`}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-indigo-400 hover:underline font-semibold">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
