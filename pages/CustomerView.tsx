import React, { useState } from 'react';
import type { MenuItem, CartItem } from '../types';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { MenuCard } from '../components/MenuCard';
import { TestimonialCard } from '../components/TestimonialCard';
import { SocialFeedCard } from '../components/SocialFeedCard';
import { AnimatedWrapper } from '../components/AnimatedWrapper';
import { MenuDetailModal } from '../components/MenuDetailModal';
import { ShoppingCart } from '../components/ShoppingCart';
import { PaymentModal } from '../components/PaymentModal';
import { Toast, ToastType } from '../components/Toast';
import { testimonialData } from '../data/testimonials';
import { socialPostsData } from '../data/socialPosts';
import { parsePrice } from '../utils/currency';

interface CustomerViewProps {
  menuItems: MenuItem[];
  onAdminLoginClick: () => void;
}

const CustomerView: React.FC<CustomerViewProps> = ({ menuItems, onAdminLoginClick }) => {
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [toastInfo, setToastInfo] = useState<{ message: string; type: ToastType }>({ message: '', type: 'success' });
  const [showToast, setShowToast] = useState(false);

  const popularItems = menuItems.filter(item => item.isPopular);
  const otherItems = menuItems.filter(item => !item.isPopular);

  const handleViewDetail = (item: MenuItem) => {
    setSelectedItem(item);
    setIsDetailModalOpen(true);
  };

  const handleCloseDetailModal = () => {
    setSelectedItem(null);
    setIsDetailModalOpen(false);
  };

  const triggerToast = (message: string, type: ToastType) => {
    setToastInfo({ message, type });
    setShowToast(true);
    setTimeout(() => setShowToast(false), 2000);
  };

  const handleAddToCart = (itemToAdd: MenuItem) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.name === itemToAdd.name);
      if (existingItem) {
        return prevItems.map(item =>
          item.name === itemToAdd.name ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevItems, { ...itemToAdd, quantity: 1 }];
    });
    triggerToast(`${itemToAdd.name} ditambahkan!`, 'success');
  };

  const handleUpdateQuantity = (itemName: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      setCartItems(prev => prev.filter(item => item.name !== itemName));
      triggerToast(`${itemName} dihapus.`, 'cart-remove');
    } else {
      setCartItems(prev => prev.map(item => item.name === itemName ? { ...item, quantity: newQuantity } : item));
    }
  };

  const handleCheckout = () => {
    setIsPaymentModalOpen(true);
  };

  const handlePaymentSuccess = () => {
    setIsPaymentModalOpen(false);
    setCartItems([]);
    triggerToast("Pesanan berhasil dibuat!", 'success');
  };

  const totalAmount = cartItems.reduce((sum, item) => {
    return sum + parsePrice(item.price) * item.quantity;
  }, 0);

  const handleScrollTo = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const element = document.getElementById(targetId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="bg-orange-50 font-sans text-stone-800">
      <Header onNavLinkClick={handleScrollTo} />
      
      <main>
        {/* Hero Section */}
        <section className="container mx-auto px-6 py-20 text-center">
          <AnimatedWrapper>
            <h1 className="text-5xl md:text-7xl font-black leading-tight">
              Nongkrong Asik, Kopi <span className="text-teal-500">Bliss</span>.
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
              Temukan spot favorit barumu untuk santai, nugas, atau sekadar menikmati kopi dan croffle terbaik di kota.
            </p>
            <a 
                href="#menu" 
                onClick={(e) => handleScrollTo(e, 'menu')}
                className="mt-8 inline-block bg-teal-500 text-white px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-teal-600 shadow-xl hover:shadow-2xl hover:shadow-teal-500/30">
              Lihat Menu
            </a>
          </AnimatedWrapper>
        </section>

        {/* Menu Section */}
        <section id="menu" className="py-20 bg-white scroll-mt-24">
          <div className="container mx-auto px-6">
            <AnimatedWrapper>
              <h2 className="text-4xl font-black text-center mb-4">Menu Paling <span className="text-pink-500">Populer</span></h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-xl mx-auto">Pilihan favorit Bliss Troopers yang wajib kamu coba!</p>
            </AnimatedWrapper>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {popularItems.map((item, index) => (
                <AnimatedWrapper key={item.name} delay={index * 100}>
                  <MenuCard item={item} onAddToCart={handleAddToCart} onViewDetail={handleViewDetail} />
                </AnimatedWrapper>
              ))}
            </div>
            
            {otherItems.length > 0 && (
              <>
                <AnimatedWrapper>
                  <h3 className="text-3xl font-bold text-center mt-20 mb-12">Pilihan Lainnya</h3>
                </AnimatedWrapper>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                  {otherItems.map((item, index) => (
                    <AnimatedWrapper key={item.name} delay={index * 100}>
                      <MenuCard item={item} onAddToCart={handleAddToCart} onViewDetail={handleViewDetail} />
                    </AnimatedWrapper>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>

        {/* Testimonials Section */}
        <section id="testimonials" className="py-20">
          <div className="container mx-auto px-6">
            <AnimatedWrapper>
              <h2 className="text-4xl font-black text-center mb-12">Kata Mereka Tentang <span className="text-teal-500">Bliss Kupi</span></h2>
            </AnimatedWrapper>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {testimonialData.map((testimonial, index) => (
                <AnimatedWrapper key={testimonial.name} delay={index * 100}>
                  <TestimonialCard testimonial={testimonial} />
                </AnimatedWrapper>
              ))}
            </div>
          </div>
        </section>
        
        {/* About Us Section */}
        <section id="about" className="py-20 bg-white scroll-mt-24">
            <div className="container mx-auto px-6">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <AnimatedWrapper>
                        <img src="https://picsum.photos/seed/about/600/600" alt="Suasana Bliss Kupi" className="rounded-2xl shadow-xl w-full" />
                    </AnimatedWrapper>
                    <AnimatedWrapper delay={200}>
                        <h2 className="text-4xl font-black">Tentang <span className="text-teal-500">Bliss Kupi</span>.</h2>
                        <p className="mt-4 text-lg text-gray-600">
                            Bliss Kupi lahir dari mimpi untuk menciptakan ruang ketiga bagi Gen Z—tempat di antara rumah dan kampus/kantor yang terasa 'punya sendiri'. Kami bukan cuma soal kopi; kami adalah tentang komunitas, kreativitas, dan koneksi.
                        </p>
                        <p className="mt-4 text-gray-600">
                            Setiap sudut kafe kami dirancang untuk jadi spot foto-able, setiap playlist disusun untuk menemani kamu fokus atau santai, dan tentu saja, setiap menu dibuat dengan cinta dan bahan baku terbaik.
                        </p>
                    </AnimatedWrapper>
                </div>
            </div>
        </section>


        {/* Social Feed Section */}
        <section id="social-feed" className="py-20">
          <div className="container mx-auto px-6">
            <AnimatedWrapper>
              <h2 className="text-4xl font-black text-center mb-4">#BlissKupiMoments</h2>
              <p className="text-lg text-gray-600 text-center mb-12 max-w-xl mx-auto">Ikuti keseruan kami dan jangan lupa tag @blisskupi di postinganmu!</p>
            </AnimatedWrapper>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {socialPostsData.map((post, index) => (
                <AnimatedWrapper key={index} delay={index * 100}>
                  <SocialFeedCard post={post} />
                </AnimatedWrapper>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer onAdminLoginClick={onAdminLoginClick} />

      <MenuDetailModal
        item={selectedItem}
        isOpen={isDetailModalOpen}
        onClose={handleCloseDetailModal}
        onAddToCart={handleAddToCart}
      />
      
      <ShoppingCart 
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onCheckout={handleCheckout}
        totalAmount={totalAmount}
      />

      <PaymentModal 
        isOpen={isPaymentModalOpen}
        onClose={() => setIsPaymentModalOpen(false)}
        totalAmount={totalAmount}
        onPaymentSuccess={handlePaymentSuccess}
      />

      <Toast message={toastInfo.message} type={toastInfo.type} show={showToast} />
    </div>
  );
};

export default CustomerView;