import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext';
import { OrderProvider } from './context/OrderContext';
import { ProductProvider } from './context/ProductContext';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import CartDrawer from './components/common/CartDrawer';

import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import OrderConfirmationPage from './pages/OrderConfirmationPage';
import WishlistPage from './pages/WishlistPage';
import AccountPage from './pages/AccountPage';
import AdminPage from './pages/AdminPage';

export default function App() {
  return (
    <ProductProvider>
      <CartProvider>
        <WishlistProvider>
          <OrderProvider>
            <Router>
              <div className="min-h-screen flex flex-col bg-background font-body-md text-body-md text-on-surface">
                {/* Header Navbar */}
                <Header />

                {/* Main Content Viewport */}
                <main className="flex-1 w-full pt-20">
                  <Routes>
                    <Route path="/" element={<HomePage />} />
                    <Route path="/sarees" element={<CollectionPage />} />
                    <Route path="/dresses" element={<CollectionPage />} />
                    <Route path="/collections/:slug" element={<CollectionPage />} />
                    <Route path="/product/:slug" element={<ProductDetailPage />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/checkout" element={<CheckoutPage />} />
                    <Route path="/orders/:orderId" element={<OrderConfirmationPage />} />
                    <Route path="/wishlist" element={<WishlistPage />} />
                    <Route path="/account" element={<AccountPage />} />
                    <Route path="/admin" element={<AdminPage />} />
                  </Routes>
                </main>

                {/* Global Slide-Over Cart Drawer */}
                <CartDrawer />

                {/* Footer */}
                <Footer />
              </div>
            </Router>
          </OrderProvider>
        </WishlistProvider>
      </CartProvider>
    </ProductProvider>
  );
}
