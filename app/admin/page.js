'use client';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [products, setProducts] = useState([]);
  const [newProduct, setNewProduct] = useState({ title: '', caption: '', price: '', image: '' });
  const [loading, setLoading] = useState(false);

  // Load data
  const fetchProducts = async () => {
    const res = await fetch('/api/products');
    const data = await res.json();
    setProducts(data);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Handle Image to Base64 (Agar bisa disimpan di JSON lokal)
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewProduct({ ...newProduct, image: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/products', {
      method: 'POST',
      body: JSON.stringify(newProduct),
    });
    setNewProduct({ title: '', caption: '', price: '', image: '' });
    await fetchProducts();
    setLoading(false);
  };

  const handleDelete = async (id) => {
    if(!confirm("Yakin hapus?")) return;
    await fetch(`/api/products?id=${id}`, { method: 'DELETE' });
    fetchProducts();
  };

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      <div className="grid md:grid-cols-3 gap-10">
        {/* Form Input */}
        <div className="md:col-span-1 bg-gray-50 p-6 border border-gray-100 h-fit">
          <h2 className="font-bold mb-4">Tambah Produk</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            <input 
              type="text" placeholder="Nama Produk" required
              className="w-full p-2 border text-sm"
              value={newProduct.title}
              onChange={e => setNewProduct({...newProduct, title: e.target.value})}
            />
            <textarea 
              placeholder="Caption Singkat" required
              className="w-full p-2 border text-sm"
              value={newProduct.caption}
              onChange={e => setNewProduct({...newProduct, caption: e.target.value})}
            />
            <input 
              type="text" placeholder="Harga (Rp ...)" required
              className="w-full p-2 border text-sm"
              value={newProduct.price}
              onChange={e => setNewProduct({...newProduct, price: e.target.value})}
            />
            <input 
              type="file" accept="image/*" required
              className="w-full text-sm"
              onChange={handleImageUpload}
            />
            <button disabled={loading} className="w-full bg-black text-white p-2 text-sm">
              {loading ? 'Menyimpan...' : 'Tambah Produk'}
            </button>
          </form>
        </div>

        {/* List Produk */}
        <div className="md:col-span-2">
          <h2 className="font-bold mb-4">List Produk ({products.length})</h2>
          <div className="space-y-4">
            {products.map(p => (
              <div key={p.id} className="flex gap-4 border p-4 items-center bg-white">
                <img src={p.image} className="w-16 h-16 object-cover bg-gray-200" />
                <div className="flex-1">
                  <h4 className="font-bold text-sm">{p.title}</h4>
                  <p className="text-xs text-gray-500">{p.price}</p>
                </div>
                <button 
                  onClick={() => handleDelete(p.id)}
                  className="text-red-500 text-xs font-bold hover:underline"
                >
                  HAPUS
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
