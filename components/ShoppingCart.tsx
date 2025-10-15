import React, { useState } from 'react';
import type { CartItem } from '../types';
import { ShoppingCartIcon, CloseIcon, PlusIcon, MinusIcon, TrashIcon } from './IconComponents';
import { formatPrice } from '../utils/currency';

interface ShoppingCartProps {
    cartItems: CartItem[];
    onUpdateQuantity: (itemName: string, newQuantity: number) => void;
    onCheckout: () => void;
    totalAmount: number;
}

export const ShoppingCart: React.FC<ShoppingCartProps> = ({ cartItems, onUpdateQuantity, onCheckout, totalAmount }) => {
    const [isOpen, setIsOpen] = useState(false);
    const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    const handleCheckout = () => {
        setIsOpen(false);
        onCheckout();
    }

    return (
        <>
            {/* Floating Cart Button */}
            <div className="fixed bottom-6 right-6 z-40">
                <button
                    onClick={() => setIsOpen(true)}
                    className="bg-teal-500 text-white rounded-full shadow-lg w-16 h-16 flex items-center justify-center transform hover:scale-110 transition-transform duration-300"
                    aria-label={`Buka keranjang (${totalItems} item)`}
                >
                    <ShoppingCartIcon className="w-8 h-8" />
                    {totalItems > 0 && (
                        <span className="absolute -top-1 -right-1 bg-pink-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center">
                            {totalItems}
                        </span>
                    )}
                </button>
            </div>

            {/* Cart Sidebar */}
            <div className={`fixed inset-0 bg-black/60 z-50 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} onClick={() => setIsOpen(false)}></div>
            <div className={`fixed top-0 right-0 h-full w-full max-w-md bg-orange-50 shadow-2xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex flex-col h-full">
                    {/* Header */}
                    <div className="flex justify-between items-center p-6 border-b border-gray-200">
                        <h2 className="text-2xl font-bold text-stone-800">Keranjangmu</h2>
                        <button onClick={() => setIsOpen(false)} className="text-gray-500 hover:text-gray-800">
                            <CloseIcon className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Cart Items */}
                    <div className="flex-grow overflow-y-auto p-6 space-y-4">
                        {cartItems.length === 0 ? (
                            <div className="text-center text-gray-500 py-10">
                                <ShoppingCartIcon className="w-16 h-16 mx-auto text-gray-300 mb-4" />
                                <p>Keranjangmu masih kosong, nih. Yuk, jajan!</p>
                            </div>
                        ) : (
                            cartItems.map(item => (
                                <div key={item.name} className="flex items-center gap-4 bg-white p-3 rounded-lg shadow-sm">
                                    <img src={item.imageUrl} alt={item.name} className="w-20 h-20 rounded-md object-cover" />
                                    <div className="flex-grow">
                                        <h3 className="font-bold text-stone-800">{item.name}</h3>
                                        <p className="text-sm text-teal-600 font-semibold">{item.price}</p>
                                        <div className="flex items-center gap-2 mt-2">
                                            <button onClick={() => onUpdateQuantity(item.name, item.quantity - 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><MinusIcon className="w-4 h-4" /></button>
                                            <span className="font-bold w-6 text-center">{item.quantity}</span>
                                            <button onClick={() => onUpdateQuantity(item.name, item.quantity + 1)} className="p-1 rounded-full bg-gray-200 hover:bg-gray-300"><PlusIcon className="w-4 h-4" /></button>
                                        </div>
                                    </div>
                                    <button onClick={() => onUpdateQuantity(item.name, 0)} className="text-gray-400 hover:text-red-500">
                                        <TrashIcon className="w-5 h-5" />
                                    </button>
                                </div>
                            ))
                        )}
                    </div>

                    {/* Footer */}
                    {cartItems.length > 0 && (
                        <div className="p-6 border-t border-gray-200 bg-white">
                            <div className="flex justify-between items-center mb-4 font-bold text-lg">
                                <span>Total Harga:</span>
                                <span>{formatPrice(totalAmount)}</span>
                            </div>
                            <button
                                onClick={handleCheckout}
                                className="w-full bg-teal-500 text-white py-3 rounded-full font-bold text-lg transition-all duration-300 hover:bg-teal-600 hover:scale-105 shadow-md hover:shadow-lg"
                            >
                                Bayar dengan QRIS
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
};