import React, { createContext, useContext, useEffect, useState, useCallback } from "react";

const CartContext = createContext(null);

const STORAGE_KEY = "av_cart_v1";

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  const addItem = useCallback((item) => {
    setItems((prev) => {
      const key = `${item.productId}|${item.purchaseType || "one_time"}|${item.size || ""}|${item.color || ""}`;
      const existing = prev.find((p) => `${p.productId}|${p.purchaseType || "one_time"}|${p.size || ""}|${p.color || ""}` === key);
      if (existing) {
        return prev.map((p) =>
          p === existing ? { ...p, quantity: p.quantity + (item.quantity || 1) } : p
        );
      }
      return [...prev, { ...item, quantity: item.quantity || 1, cartId: key }];
    });
  }, []);

  const removeItem = useCallback((cartId) => {
    setItems((prev) => prev.filter((p) => p.cartId !== cartId));
  }, []);

  const updateQty = useCallback((cartId, quantity) => {
    setItems((prev) =>
      prev.map((p) => (p.cartId === cartId ? { ...p, quantity: Math.max(1, quantity) } : p))
    );
  }, []);

  const clear = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQty, clear, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
