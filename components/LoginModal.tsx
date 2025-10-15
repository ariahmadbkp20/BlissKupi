import React, { useState } from 'react';

interface LoginModalProps {
  isOpen: boolean;
  onLogin: (password: string) => boolean; // Returns true on success, false on failure
  onClose: () => void;
}

export const LoginModal: React.FC<LoginModalProps> = ({ isOpen, onLogin, onClose }) => {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    const success = onLogin(password);
    if (!success) {
      setError('Password salah. Coba lagi.');
      setPassword('');
    }
  };

  if (!isOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-up" style={{ animationName: 'fade-in-up', animationFillMode: 'forwards' }}>
        <div className="p-8">
          <h2 className="text-2xl font-bold text-stone-800 text-center mb-4">Akses Admin</h2>
          <p className="text-gray-600 text-center mb-6">Masukkan password untuk melanjutkan.</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="password-admin" className="sr-only">Password</label>
              <input 
                id="password-admin"
                type="password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-teal-500 focus:border-teal-500 text-center"
                placeholder="••••••••"
                required 
                autoFocus
              />
            </div>
            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            <div>
              <button type="submit" className="w-full bg-teal-500 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:bg-teal-600 shadow-md hover:shadow-lg">
                Login
              </button>
            </div>
             <div className="text-center mt-4">
                <button 
                  type="button"
                  onClick={onClose} 
                  className="text-sm text-gray-500 hover:text-teal-600 hover:underline"
                >
                  Kembali ke halaman utama
                </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};