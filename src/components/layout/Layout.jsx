import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PulseCursor from '../PulseCursor';
import CartDrawer from '../CartDrawer';
import FloatingShopCTA from '../FloatingShopCTA';

export default function Layout() {
  return (
    <div className="min-h-screen bg-ink flex flex-col">
      <PulseCursor />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
      <FloatingShopCTA />
    </div>
  );
}
