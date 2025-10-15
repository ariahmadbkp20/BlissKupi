import React, { useState, useEffect } from 'react';
import { CloseIcon } from './IconComponents';
import { formatPrice } from '../utils/currency';

interface PaymentModalProps {
    isOpen: boolean;
    onClose: () => void;
    totalAmount: number;
    onPaymentSuccess: () => void;
}

type PaymentStatus = 'generating' | 'ready' | 'success';

export const PaymentModal: React.FC<PaymentModalProps> = ({ isOpen, onClose, totalAmount, onPaymentSuccess }) => {
    const [status, setStatus] = useState<PaymentStatus>('generating');
    // Generate a dynamic, realistic QR code for the payment simulation
    const qrCodeUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=blisskupi-pay-${totalAmount}&qzone=1&bgcolor=F3F4F6`;

    useEffect(() => {
        if (isOpen) {
            setStatus('generating');
            // Simulate generating QR code
            const timer1 = setTimeout(() => {
                setStatus('ready');
            }, 1500);

            // Simulate successful payment after 'scanning'
            const timer2 = setTimeout(() => {
                setStatus('success');
            }, 6500); // 1.5s (generating) + 5s (scanning time)

            // Auto-close after success
            const timer3 = setTimeout(() => {
                onPaymentSuccess();
            }, 8500); // 6.5s + 2s (success message display time)

            return () => {
                clearTimeout(timer1);
                clearTimeout(timer2);
                clearTimeout(timer3);
            };
        }
    }, [isOpen, onPaymentSuccess]);
    
    if (!isOpen) {
        return null;
    }

    return (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-up" style={{ animationName: 'fade-in-up', animationFillMode: 'forwards' }}>
                <div className="p-6 relative">
                    <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-700">
                        <CloseIcon className="w-6 h-6" />
                    </button>

                    <div className="text-center">
                        {status === 'generating' && (
                            <div className="py-8">
                                <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
                                <h2 className="text-xl font-bold mt-4">Membuat kode QR...</h2>
                                <p className="text-gray-500">Mohon tunggu sebentar.</p>
                            </div>
                        )}

                        {status === 'ready' && (
                            <div>
                                <h2 className="text-2xl font-bold">Bayar dengan QRIS</h2>
                                <p className="text-gray-500 mt-1">Scan kode di bawah ini menggunakan e-wallet kamu.</p>
                                <div className="my-6 p-4 bg-gray-100 rounded-lg inline-block">
                                    <img src={qrCodeUrl} alt="QRIS Code" width="200" height="200" />
                                </div>
                                <div className="text-lg">
                                    <span className="font-semibold">Total Pembayaran:</span>
                                    <p className="text-3xl font-black text-teal-600">{formatPrice(totalAmount)}</p>
                                </div>
                                <p className="text-sm text-gray-400 mt-4 animate-pulse">Menunggu pembayaran...</p>
                            </div>
                        )}

                        {status === 'success' && (
                             <div className="py-8">
                                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                                    <svg className="w-12 h-12 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                    </svg>
                                </div>
                                <h2 className="text-2xl font-bold mt-4 text-green-600">Pembayaran Berhasil!</h2>
                                <p className="text-gray-500">Terima kasih! Pesananmu sedang disiapkan.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};