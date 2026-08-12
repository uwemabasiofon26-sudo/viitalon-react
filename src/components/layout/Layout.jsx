import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import PulseCursor from '../PulseCursor';
import CartDrawer from '../CartDrawer';
import ShippingBanner from './ShippingBanner';

export default function Layout() {
  return (
    <div className="min-h-screen bg-ink flex flex-col">
      <PulseCursor />
      <ShippingBanner />
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <CartDrawer />
    </div>
  );
}
