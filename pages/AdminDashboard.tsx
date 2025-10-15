import React, { useState } from 'react';
import type { MenuItem } from '../types';
import { AddMenuForm } from '../components/AddMenuForm';
import { EditMenuModal } from '../components/EditMenuModal';

interface AdminDashboardProps {
  menuItems: MenuItem[];
  onAddItem: (item: MenuItem) => void;
  onUpdateItem: (updatedItem: MenuItem, originalName: string) => void;
  onDeleteItem: (itemName: string) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ menuItems, onAddItem, onUpdateItem, onDeleteItem }) => {
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const handleDeleteItem = (itemName: string) => {
    if (window.confirm(`Yakin ingin menghapus ${itemName}?`)) {
      onDeleteItem(itemName);
    }
  };

  const handleOpenEditModal = (item: MenuItem) => {
    setEditingItem(item);
    setIsEditModalOpen(true);
  };
  
  const handleCloseEditModal = () => {
    setEditingItem(null);
    setIsEditModalOpen(false);
  };

  const handleUpdateItem = (updatedItem: MenuItem) => {
    if(editingItem){
        onUpdateItem(updatedItem, editingItem.name);
    }
    handleCloseEditModal();
  };

  return (
    <div className="bg-orange-50 min-h-screen pb-20"> {/* Added padding-bottom for AdminBar */}
      <div className="container mx-auto px-6 py-12">
        <header className="mb-12 text-center">
          <h1 className="text-5xl font-black text-stone-800">Admin Dashboard</h1>
          <p className="text-lg text-gray-600 mt-2">Kelola menu Bliss Kupi di sini.</p>
        </header>

        <section id="add-menu" className="mb-12">
          <h2 className="text-3xl font-bold text-stone-800 mb-6">Tambah Menu Baru</h2>
          <AddMenuForm onAddItem={onAddItem} />
        </section>

        <section id="manage-menu">
          <h2 className="text-3xl font-bold text-stone-800 mb-6">Daftar Menu Saat Ini ({menuItems.length})</h2>
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm text-left text-gray-500">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">Nama Menu</th>
                    <th scope="col" className="px-6 py-3">Harga</th>
                    <th scope="col" className="px-6 py-3">Populer</th>
                    <th scope="col" className="px-6 py-3 text-right">Aksi</th>
                  </tr>
                </thead>
                <tbody>
                  {menuItems.map((item) => (
                    <tr key={item.name} className="bg-white border-b hover:bg-gray-50">
                      <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                        {item.name}
                      </th>
                      <td className="px-6 py-4">{item.price}</td>
                      <td className="px-6 py-4">{item.isPopular ? 'Ya' : 'Tidak'}</td>
                      <td className="px-6 py-4 text-right space-x-2">
                        <button onClick={() => handleOpenEditModal(item)} className="font-medium text-teal-600 hover:underline">Edit</button>
                        <button onClick={() => handleDeleteItem(item.name)} className="font-medium text-red-600 hover:underline">
                          Hapus
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              {menuItems.length === 0 && (
                <p className="text-center text-gray-500 py-8">Belum ada menu. Silakan tambahkan menu baru di atas.</p>
              )}
            </div>
          </div>
        </section>
      </div>
      <EditMenuModal 
        item={editingItem} 
        isOpen={isEditModalOpen} 
        onClose={handleCloseEditModal} 
        onUpdateItem={handleUpdateItem} 
      />
    </div>
  );
};

export default AdminDashboard;