import React, { useState, useEffect } from 'react';
import type { MenuItem } from '../types';
import { CloseIcon } from './IconComponents';

interface EditMenuModalProps {
  item: MenuItem | null;
  isOpen: boolean;
  onClose: () => void;
  onUpdateItem: (updatedItem: MenuItem) => void;
}

interface FormState {
  name: string;
  description: string;
  price: string;
  imageUrl: string;
  isPopular: boolean;
}

interface FormErrors {
  name?: string;
  description?: string;
  price?: string;
  imageUrl?: string;
}

export const EditMenuModal: React.FC<EditMenuModalProps> = ({ item, isOpen, onClose, onUpdateItem }) => {
  const [formState, setFormState] = useState<FormState>({
    name: '',
    description: '',
    price: '',
    imageUrl: '',
    isPopular: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (item) {
      setFormState({
        name: item.name,
        description: item.description,
        price: item.price,
        imageUrl: item.imageUrl,
        isPopular: item.isPopular,
      });
      setErrors({}); // Reset errors when a new item is loaded
    }
  }, [item]);

  if (!isOpen || !item) {
    return null;
  }

  const validateField = (name: keyof FormState, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : 'Nama menu tidak boleh kosong.';
      case 'description':
        return value.trim() ? '' : 'Deskripsi tidak boleh kosong.';
      case 'price':
        const priceRegex = /^Rp\s\d{1,3}(\.\d{3})*$/;
        return priceRegex.test(value) ? '' : 'Format harga: Rp X.XXX (contoh: Rp 18.000)';
      case 'imageUrl':
        try {
          new URL(value);
          return '';
        } catch (_) {
          return 'URL gambar tidak valid.';
        }
      default:
        return '';
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
        const { checked } = e.target as HTMLInputElement;
        setFormState(prev => ({ ...prev, [name]: checked }));
    } else {
        setFormState(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target as { name: keyof FormState; value: string };
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: FormErrors = {
      name: validateField('name', formState.name),
      description: validateField('description', formState.description),
      price: validateField('price', formState.price),
      imageUrl: validateField('imageUrl', formState.imageUrl),
    };
    
    const hasErrors = Object.values(newErrors).some(error => error);
    setErrors(newErrors);
    
    if (hasErrors) {
      return;
    }
    
    onUpdateItem({ ...item, ...formState });
  };

  return (
    <div className="fixed inset-0 bg-black/60 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl transform transition-all duration-300 scale-95 opacity-0 animate-fade-in-up">
        <div className="p-6 relative">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-stone-800">Edit Menu Item</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-700">
              <CloseIcon className="w-6 h-6" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label htmlFor="edit-name" className="block text-sm font-semibold text-gray-700 mb-1">Nama Menu</label>
                <input type="text" id="edit-name" name="name" value={formState.name} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`} required />
                {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
              </div>
              <div>
                <label htmlFor="edit-price" className="block text-sm font-semibold text-gray-700 mb-1">Harga</label>
                <input type="text" id="edit-price" name="price" value={formState.price} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 ${errors.price ? 'border-red-500' : 'border-gray-300'}`} required />
                {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
              </div>
            </div>
            <div>
              <label htmlFor="edit-description" className="block text-sm font-semibold text-gray-700 mb-1">Deskripsi</label>
              <textarea id="edit-description" name="description" value={formState.description} onChange={handleChange} onBlur={handleBlur} rows={3} className={`w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 ${errors.description ? 'border-red-500' : 'border-gray-300'}`} required></textarea>
              {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
            </div>
            <div>
              <label htmlFor="edit-imageUrl" className="block text-sm font-semibold text-gray-700 mb-1">URL Gambar</label>
              <input type="text" id="edit-imageUrl" name="imageUrl" value={formState.imageUrl} onChange={handleChange} onBlur={handleBlur} className={`w-full px-4 py-2 border rounded-lg focus:ring-teal-500 focus:border-teal-500 ${errors.imageUrl ? 'border-red-500' : 'border-gray-300'}`} required />
              {errors.imageUrl && <p className="text-red-500 text-xs mt-1">{errors.imageUrl}</p>}
            </div>
            <div className="flex items-center">
              <input type="checkbox" id="edit-isPopular" name="isPopular" checked={formState.isPopular} onChange={handleChange} className="h-4 w-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500" />
              <label htmlFor="edit-isPopular" className="ml-2 block text-sm text-gray-900">Tandai sebagai menu populer</label>
            </div>
            <div>
              <button type="submit" className="w-full bg-teal-500 text-white px-6 py-3 rounded-full font-bold transition-all duration-300 hover:scale-105 hover:bg-teal-600 shadow-md hover:shadow-lg hover:shadow-teal-500/30">
                Simpan Perubahan
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
