'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Login() {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/auth', {
      method: 'POST',
      body: JSON.stringify(form),
    });

    if (res.ok) {
      router.push('/admin');
      router.refresh();
    } else {
      setError('Login gagal. Cek username/password.');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center bg-white px-6">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Access</h1>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Username</label>
            <input 
              type="text" 
              className="w-full border border-gray-300 p-3 mt-1 focus:outline-none focus:border-black transition"
              value={form.username}
              onChange={e => setForm({...form, username: e.target.value})}
            />
          </div>
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Password</label>
            <input 
              type="password" 
              className="w-full border border-gray-300 p-3 mt-1 focus:outline-none focus:border-black transition"
              value={form.password}
              onChange={e => setForm({...form, password: e.target.value})}
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button className="w-full bg-black text-white p-3 font-medium hover:bg-gray-800 transition">
            LOGIN
          </button>
        </form>
      </div>
    </div>
  );
}
