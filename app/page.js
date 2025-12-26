import ProductCard from '@/components/ProductCard';
import { headers } from 'next/headers';

// Helper fetch data di Server Component
async function getProducts() {
  // Dalam production Vercel, kita perlu absolute URL jika fetch ke API sendiri
  // Tapi karena ini Server Component membaca JSON lokal, kita bisa import logic langsung 
  // atau fetch ke API absolute URL. Untuk kestabilan di Vercel:
  
  try {
     const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/products`, {
       cache: 'no-store' 
     });
     if(!res.ok) return [];
     return res.json();
  } catch (e) {
     return [];
  }
}

export default async function Home() {
  const products = await getProducts();

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <header className="mb-12 text-center md:text-left">
        <h1 className="text-4xl font-bold tracking-tighter mb-2">Featured Products</h1>
        <p className="text-gray-500">Koleksi eksklusif kualitas terbaik.</p>
      </header>
      
      {products.length === 0 ? (
        <p className="text-center text-gray-400 py-20">Belum ada produk.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
