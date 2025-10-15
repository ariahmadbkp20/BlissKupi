import React from 'react';

interface HeaderProps {
  onNavLinkClick: (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ onNavLinkClick }) => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const navLinks = [
    { name: 'Menu', href: '#menu', id: 'menu' },
    { name: 'Tentang Kami', href: '#about', id: 'about' },
    { name: 'Kontak', href: '#contact', id: 'contact' },
  ];

  const handleGoHome = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-orange-50/80 backdrop-blur-lg sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <a href="/" onClick={handleGoHome} className="text-3xl font-black text-stone-800">
          Bliss Kupi<span className="text-teal-500">.</span>
        </a>

        <nav className="hidden md:flex items-center space-x-8">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => onNavLinkClick(e, link.id)}
              className="text-stone-800 hover:text-teal-500 font-semibold transition-colors duration-300"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <a 
          href="#menu" 
          onClick={(e) => onNavLinkClick(e, 'menu')}
          className="hidden md:block bg-teal-500 text-white px-6 py-2 rounded-full font-bold hover:bg-teal-600 transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-teal-500/20">
          Order Sekarang
        </a>

        <div className="md:hidden">
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-stone-800 focus:outline-none">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}></path>
            </svg>
          </button>
        </div>
      </div>
      
      {isMenuOpen && (
        <div className="md:hidden bg-orange-50 py-4 px-6">
          <nav className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => { onNavLinkClick(e, link.id); setIsMenuOpen(false); }}
                className="text-stone-800 hover:text-teal-500 font-semibold"
              >
                {link.name}
              </a>
            ))}
            <a 
              href="#menu" 
              onClick={(e) => { onNavLinkClick(e, 'menu'); setIsMenuOpen(false); }} 
              className="bg-teal-500 text-white text-center px-6 py-2 rounded-full font-bold hover:bg-teal-600">
              Order Sekarang
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};