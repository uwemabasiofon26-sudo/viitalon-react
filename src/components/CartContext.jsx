import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('viitalon_cart');
      if (saved) setItems(JSON.parse(saved));
    } catch (e) { /* ignore */ }
  }, []);

  useEffect(() => {
    localStorage.setItem('viitalon_cart', JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((product, qty = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.id === product.slug);
      if (existing) {
        return prev.map(i => i.id === product.slug ? { ...i, qty: i.qty + qty } : i);
      }
      return [...prev, {
        id: product.slug,
        name: product.name,
        slug: product.slug,
        price: product.price,
        image_url: product.image_url,
        qty
      }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((id) => {
    setItems(prev => prev.filter(i => i.id !== id));
  }, []);

  const updateQty = useCallback((id, qty) => {
    if (qty <= 0) {
      setItems(prev => prev.filter(i => i.id !== id));
      return;
    }
    setItems(prev => prev.map(i => i.id === id ? { ...i, qty } : i));
  }, []);

  const clearCart = useCallback(() => {
    setItems([]);
  }, []);

  const count = items.reduce((sum, i) => sum + i.qty, 0);
  const subtotal = items.reduce((sum, i) => sum + i.qty * i.price, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clearCart, count, subtotal, isOpen, setIsOpen }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}
