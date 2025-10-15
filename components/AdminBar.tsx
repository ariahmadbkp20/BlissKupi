import React from 'react';

interface AdminBarProps {
  onLogout: () => void;
  onNavigate: (view: 'admin' | 'customer') => void;
  isAdminView: boolean;
}

export const AdminBar: React.FC<AdminBarProps> = ({ onLogout, onNavigate, isAdminView }) => {
  return (
    <div className="fixed bottom-0 left-0 right-0 bg-yellow-400 text-stone-900 z-[100] shadow-lg">
      <div className="container mx-auto px-6 py-2 h-14 flex justify-between items-center">
        <p className="font-bold text-sm">
          <span className="font-extrabold bg-stone-900 text-yellow-400 px-2 py-1 rounded-md mr-2">ADMIN MODE</span> Anda telah login.
        </p>
        <div className="flex items-center space-x-4">
          {isAdminView ? (
             <button 
                onClick={() => onNavigate('customer')} 
                className="text-sm font-semibold bg-white/50 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-white hover:shadow-md hover:-translate-y-0.5"
              >
              Lihat Halaman Pelanggan
            </button>
          ) : (
            <button 
              onClick={() => onNavigate('admin')} 
              className="text-sm font-semibold bg-white/50 px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-white hover:shadow-md hover:-translate-y-0.5"
            >
              Buka Dashboard
            </button>
          )}
          <button 
            onClick={onLogout} 
            className="text-sm font-semibold bg-red-500 text-white px-3 py-2 rounded-md transition-all duration-200 ease-in-out hover:bg-red-600 hover:shadow-md hover:-translate-y-0.5"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};