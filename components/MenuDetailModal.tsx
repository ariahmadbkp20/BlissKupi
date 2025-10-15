import React from 'react';
import type { MenuItem } from '../types';
import { CloseIcon, ShoppingCartIcon } from './IconComponents';

interface MenuDetailModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItem) => void;
}

export const MenuDetailModal: React.FC<MenuDetailModalProps> = ({ item, isOpen, onClose, onAddToCart }) => {
  if (!isOpen || !item) {
    return null;
  }

  const handleAddToCart = () => {
    onAddToCart(item);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-[60] flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-up">
        <div className="relative">
          <button onClick={onClose} className="absolute top-4 right-4 text-white bg-black/30 rounded-full p-1.5 hover:bg-black/50 z-10">
            <CloseIcon className="w-6 h-6" />
          </button>
          
          <div className="grid md:grid-cols-2">
            <img src={item.imageUrl} alt={item.name} className="w-full h-64 md:h-full object-cover md:rounded-l-2xl" loading="lazy" decoding="async"/>
            <div className="p-8 flex flex-col">
              <div>
                {item.isPopular && (
                  <span className="bg-pink-100 text-pink-600 text-xs font-bold px-2 py-1 rounded-full mb-2 self-start">
                    POPULER
                  </span>
                )}
                <h2 className="text-4xl font-black text-stone-800">{item.name}</h2>
                <p className="text-3xl font-bold text-teal-600 mt-2">{item.price}</p>
                <p className="text-gray-600 mt-4 text-base">{item.description}</p>
                
                {item.ingredients && item.ingredients.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-bold text-stone-800 mb-2">Bahan Utama:</h3>
                    <div className="flex flex-wrap gap-2">
                      {item.ingredients.map(ingredient => (
                        <span key={ingredient} className="bg-teal-50 text-teal-700 text-sm font-semibold px-3 py-1 rounded-full">
                          {ingredient}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
              
              <div className="mt-8 pt-6 border-t border-gray-200">
                <button 
                  onClick={handleAddToCart}
                  className="w-full bg-teal-500 text-white px-6 py-3 rounded-full font-bold text-lg transition-all duration-300 hover:scale-105 hover:bg-teal-600 shadow-md hover:shadow-lg flex items-center justify-center gap-2"
                >
                  <ShoppingCartIcon className="w-6 h-6"/>
                  <span>Tambah ke Keranjang</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};