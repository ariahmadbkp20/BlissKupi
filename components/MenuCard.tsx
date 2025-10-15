import React from 'react';
import type { MenuItem } from '../types';
import { ShoppingCartIcon } from './IconComponents';

interface MenuCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem) => void;
  onViewDetail: (item: MenuItem) => void;
}

export const MenuCard: React.FC<MenuCardProps> = ({ item, onAddToCart, onViewDetail }) => {
  const handleAddToCartClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent the card's onClick from firing
    onAddToCart(item);
  };

  return (
    <div 
      className="bg-white rounded-2xl shadow-lg overflow-hidden group flex flex-col cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
      onClick={() => onViewDetail(item)}
    >
      <div className="relative">
        <img 
            src={item.imageUrl} 
            alt={item.name} 
            className="w-full h-48 object-cover"
            loading="lazy"
            decoding="async"
        />
        {item.isPopular && (
          <span className="absolute top-3 right-3 bg-pink-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            POPULER
          </span>
        )}
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <h3 
            className="text-lg font-bold text-stone-800 truncate group-hover:text-teal-600"
        >
            {item.name}
        </h3>
        <p className="text-sm text-gray-600 mt-1 flex-grow line-clamp-2">{item.description}</p>
        <div className="mt-4 flex justify-between items-center">
          <p className="text-xl font-black text-teal-600">{item.price}</p>
          <button 
            onClick={handleAddToCartClick}
            className="bg-stone-800 text-white rounded-full p-2 transform transition-all duration-300 hover:bg-teal-500 hover:scale-110"
            aria-label={`Tambah ${item.name} ke keranjang`}
          >
            <ShoppingCartIcon className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};