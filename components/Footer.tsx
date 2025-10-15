import React from 'react';
import { InstagramIcon, TiktokIcon, XIcon } from './IconComponents';

interface FooterProps {
  onAdminLoginClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onAdminLoginClick }) => {
  return (
    <footer id="contact" className="bg-stone-800 text-orange-50 scroll-mt-24">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-2xl font-black">Bliss Kupi<span className="text-teal-400">.</span></h3>
            <p className="mt-4 text-stone-300">
              Tempat nongkrong Gen Z paling asik se-kota Wisata dan Daerah Ciangsana. Kopi, non-kopi, makanan, semua ada!
            </p>
            <div className="flex space-x-4 mt-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-teal-400 transition-colors">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-teal-400 transition-colors">
                <TiktokIcon className="w-6 h-6" />
              </a>
              <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="text-stone-300 hover:text-teal-400 transition-colors">
                <XIcon className="w-6 h-6" />
              </a>
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold text-white tracking-wider">Kontak & Akses</h4>
            <ul className="mt-4 space-y-2 text-stone-300">
              <li>📍 Jl. Ciangsana no 17</li>
              <li>📞 (021) 123-4567</li>
              <li>📧 hai@blisskupi.com</li>
              <li className="pt-2">
                <button onClick={onAdminLoginClick} className="hover:text-teal-400 transition-colors underline text-left w-full">
                  Admin Login
                </button>
              </li>
            </ul>
          </div>

          {/* Opening Hours */}
          <div>
            <h4 className="text-lg font-bold text-white tracking-wider">Jam Buka</h4>
            <ul className="mt-4 space-y-2 text-stone-300">
              <li>Senin - Jumat: 08:00 - 22:00</li>
              <li>Sabtu - Minggu: 09:00 - 23:00</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-stone-700 pt-8 text-center text-stone-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Bliss Kupi. All rights reserved. Dibuat dengan ❤️ dan kafein.</p>
        </div>
      </div>
    </footer>
  );
};