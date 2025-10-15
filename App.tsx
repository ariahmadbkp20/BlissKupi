import React, { useState, useEffect } from 'react';
import CustomerView from './pages/CustomerView';
import AdminDashboard from './pages/AdminDashboard';
import { LoginModal } from './components/LoginModal';
import { AdminBar } from './components/AdminBar';
import type { MenuItem } from './types';
import { menuData } from './data/menu';

const ADMIN_PASSWORD = "admin123"; // Simple hardcoded password

const App: React.FC = () => {
  // State for data
  const [menuItems, setMenuItems] = useState<MenuItem[]>(() => {
    try {
      const savedMenu = localStorage.getItem('bliss-kupi-menu');
      return savedMenu ? JSON.parse(savedMenu) : menuData;
    } catch (error) {
      console.error("Could not parse menu from localStorage", error);
      return menuData;
    }
  });

  // State for UI and Auth
  const [isAdminView, setIsAdminView] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  // Single source of truth for syncing URL and session storage to component state.
  const syncStateWithUrl = () => {
    const params = new URLSearchParams(window.location.search);
    const isAuthed = sessionStorage.getItem('bliss-kupi-auth') === 'true';
    const isAdminRequested = params.get('admin') === 'true';

    setIsAdminView(isAdminRequested);
    setIsAuthenticated(isAuthed);

    if (isAdminRequested && !isAuthed) {
      setIsLoginModalOpen(true);
    } else {
      setIsLoginModalOpen(false);
    }
  };

  useEffect(() => {
    // Listen for back/forward navigation
    window.addEventListener('popstate', syncStateWithUrl);
    // Sync state on initial load
    syncStateWithUrl();

    // Cleanup listener
    return () => {
      window.removeEventListener('popstate', syncStateWithUrl);
    };
  }, []); // This effect runs only once to set up the listener.

  useEffect(() => {
    // Persist menu changes to localStorage
    localStorage.setItem('bliss-kupi-menu', JSON.stringify(menuItems));
  }, [menuItems]);

  // Single source of truth for programmatic navigation.
  const handleNavigate = (view: 'admin' | 'customer') => {
    const url = view === 'admin' ? '/?admin=true' : '/';
    const currentSearch = window.location.search;
    const newSearch = view === 'admin' ? '?admin=true' : '';

    if (currentSearch !== newSearch) {
      window.history.pushState({}, '', url);
    }
    
    // After changing the URL, immediately sync the state to reflect the change.
    // This is crucial because pushState does not trigger a popstate event.
    syncStateWithUrl();
  };

  const handleLogin = (password: string): boolean => {
    if (password === ADMIN_PASSWORD) {
      sessionStorage.setItem('bliss-kupi-auth', 'true');
      // After login, re-sync state. It will see the user is now authenticated
      // and on the admin page, which closes the modal and shows the dashboard.
      syncStateWithUrl();
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    sessionStorage.removeItem('bliss-kupi-auth');
    // Navigate away, which will also trigger a state sync.
    handleNavigate('customer');
  };

  const handleAddItem = (newItem: MenuItem) => {
    if (menuItems.some(item => item.name.toLowerCase() === newItem.name.toLowerCase())) {
        alert('Menu dengan nama ini sudah ada!');
        return;
    }
    setMenuItems(prev => [newItem, ...prev]);
  };
  
  const handleUpdateItem = (updatedItem: MenuItem, originalName: string) => {
     if (menuItems.some(item => item.name.toLowerCase() === updatedItem.name.toLowerCase() && item.name !== originalName)) {
        alert('Menu dengan nama ini sudah ada!');
        return;
    }
    setMenuItems(prev => prev.map(item => (item.name === originalName ? updatedItem : item)));
  };
  
  const handleDeleteItem = (itemName: string) => {
    setMenuItems(prev => prev.filter(item => item.name !== itemName));
  };

  return (
    <>
      {isAuthenticated && <AdminBar onLogout={handleLogout} onNavigate={handleNavigate} isAdminView={isAdminView} />}
      
      {isAdminView && isAuthenticated ? (
        <AdminDashboard 
          menuItems={menuItems}
          onAddItem={handleAddItem}
          onUpdateItem={handleUpdateItem}
          onDeleteItem={handleDeleteItem}
        />
      ) : (
        <CustomerView menuItems={menuItems} onAdminLoginClick={() => handleNavigate('admin')} />
      )}
      <LoginModal 
        isOpen={isLoginModalOpen} 
        onLogin={handleLogin} 
        onClose={() => handleNavigate('customer')}
      />
    </>
  );
};

export default App;