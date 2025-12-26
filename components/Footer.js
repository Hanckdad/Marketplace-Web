export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 mt-20">
      <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-2 gap-8">
        <div>
          <h3 className="font-bold text-lg mb-4">Contact</h3>
          <ul className="space-y-2 text-sm text-gray-600">
            <li>WhatsApp: <a href="https://wa.me/62895406178006" className="hover:text-black">62895406178006</a></li>
            <li>GitHub: <span className="text-black">Hanckdad</span></li>
          </ul>
        </div>
        <div className="md:text-right">
          <h3 className="font-bold text-lg mb-4">Links</h3>
          <ul className="space-y-2 text-sm text-gray-600">
             <li><a href="https://whatsapp.com/channel/0029VbBUzaSDzgTKNFvrCn44" target="_blank" className="hover:text-black">WhatsApp Channel</a></li>
             <li><a href="https://youtube.com/@ryuichibayz" target="_blank" className="hover:text-black">YouTube: ryuichibayz</a></li>
             <li><a href="https://saweria.co/bayuoffc" target="_blank" className="hover:text-black">Saweria</a></li>
          </ul>
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-10">
        © {new Date().getFullYear()} Next.js Store. All rights reserved.
      </div>
    </footer>
  );
}
