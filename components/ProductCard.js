'use client';
import { motion } from "framer-motion";

export default function ProductCard({ product }) {
  // Logic WA Link
  const waMessage = `Halo bang mau beli ${product.title}`;
  const waLink = `https://wa.me/62895406178006?text=${encodeURIComponent(waMessage)}`;
  const saweriaLink = "https://saweria.co/bayuoffc";

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="group bg-white border border-gray-100 p-4 hover:border-gray-300 transition-all duration-300"
    >
      <div className="aspect-[4/3] bg-gray-50 mb-4 overflow-hidden relative">
        <img 
          src={product.image} 
          alt={product.title} 
          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
        />
      </div>
      
      <h3 className="font-bold text-lg mb-1 truncate">{product.title}</h3>
      <p className="text-gray-500 text-sm mb-3 line-clamp-2">{product.caption}</p>
      <p className="font-semibold text-xl mb-4">{product.price}</p>

      <div className="space-y-2">
        <a 
          href={waLink} 
          target="_blank"
          className="block w-full text-center bg-black text-white py-2.5 text-sm font-medium hover:bg-gray-800 active:scale-[0.98] transition-all"
        >
          Beli via WhatsApp
        </a>
        <a 
          href={saweriaLink} 
          target="_blank"
          className="block w-full text-center border border-gray-200 text-black py-2.5 text-sm font-medium hover:bg-gray-50 active:scale-[0.98] transition-all"
        >
          Dukung via Saweria
        </a>
      </div>
    </motion.div>
  );
}
