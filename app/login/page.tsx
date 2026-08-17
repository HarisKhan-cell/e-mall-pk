'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Login failed');
      }

      // Save user session in browser
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'SELLER') {
        router.push('/seller/dashboard');
      } else {
        router.push('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white p-6">
      <div className="w-full max-w-md bg-gray-800 rounded-2xl p-8 shadow-2xl border border-gray-700">
        <h2 className="text-3xl font-bold text-center mb-2 text-indigo-400">Welcome Back</h2>
        <p className="text-gray-400 text-center mb-6 text-sm">Login to your E-Mall Account</p>

        {error && <div className="mb-4 p-3 bg-red-500/20 border border-red-500 text-red-300 rounded-lg text-sm text-center">{error}</div>}

        <form onSubmit={handleLogin} className="space-y-4">
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

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-indigo-500/25 disabled:opacity-50"
          >
            {loading ? 'Logging in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-400">
          Don't have an account?{' '}
          <Link href="/register" className="text-indigo-400 hover:underline font-semibold">
            Register here
          </Link>
        </p>
      </div>
    </div>
  );
}
