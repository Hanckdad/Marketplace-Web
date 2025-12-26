import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold tracking-tight">
          STORE<span className="text-gray-400">.</span>
        </Link>
        <div className="flex gap-4">
            <a href="https://saweria.co/bayuoffc" target="_blank" className="text-sm font-medium hover:opacity-70 transition">Dukung</a>
        </div>
      </div>
    </nav>
  );
}
