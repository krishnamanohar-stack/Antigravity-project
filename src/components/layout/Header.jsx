import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';
import { useProducts } from '../../context/ProductContext';
import SearchModal from '../common/SearchModal';

export default function Header() {
  const location = useLocation();
  const { totalItems, subtotal, setIsCartOpen } = useCart();
  const { wishlistCount } = useWishlist();
  const { setSelectedCategory } = useProducts();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Sarees", path: "/sarees", category: "Sarees" },
    { label: "Dresses", path: "/dresses", category: "Dresses" },
    { label: "Ethnic Wear", path: "/collections/ethnic-wear", category: "Ethnic Anarkalis" },
    { label: "New Arrivals", path: "/collections/new-arrivals", category: "New Arrivals" },
    { label: "Collections", path: "/collections/all", category: "All" },
    { label: "Admin", path: "/admin" }
  ];

  const handleNavClick = (link) => {
    if (link.category) {
      setSelectedCategory(link.category);
    }
    setIsMobileMenuOpen(false);
  };

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <header className="fixed top-0 w-full z-50 bg-surface/90 backdrop-blur-md shadow-[0_1px_8px_rgba(74,14,23,0.04)]">
        {/* Top Announcement Bar */}
        <div className="w-full bg-surface-container-high px-gutter-mobile lg:px-gutter-desktop py-space-2xs text-center flex items-center justify-between">
          <div className="hidden md:flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-[15px] text-secondary">workspace_premium</span>
            <span className="font-label-caps text-label-caps uppercase tracking-widest text-primary-container">Royal Artisan Atelier</span>
          </div>
          <div className="flex-1 text-center font-label-sm text-label-sm text-primary-container tracking-wider font-medium">
            Complimentary Pan-India Express Shipping on Orders Above ₹5,000 <span className="text-secondary mx-space-2xs">|</span> Worldwide Bespoke Delivery
          </div>
          <div className="flex items-center gap-space-xs font-label-caps text-label-caps text-on-surface-variant">
            <span className="text-primary font-semibold">INR ₹</span>
            <span className="text-outline-variant">/</span>
            <span className="hover:text-primary transition-colors cursor-pointer opacity-60">USD $</span>
          </div>
        </div>

        {/* Main Navbar */}
        <div className="h-20 w-full px-gutter-mobile lg:px-gutter-desktop max-w-[1440px] mx-auto flex items-center justify-between gap-space-md">
          {/* Logo & Mobile Menu Toggle */}
          <div className="flex items-center gap-space-sm">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="xl:hidden p-space-2xs text-primary focus:outline-none"
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined text-[26px]">
                {isMobileMenuOpen ? 'close' : 'menu'}
              </span>
            </button>
            <Link to="/" className="flex items-center gap-space-xs">
              <div className="flex flex-col">
                <span className="font-headline-md text-headline-sm lg:text-headline-md tracking-wider text-primary uppercase leading-none">VANYA</span>
                <span className="font-label-caps text-label-caps tracking-[0.25em] text-secondary uppercase -mt-0.5">Haute Couture</span>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-space-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleNavClick(link)}
                className={`font-label-md text-label-md uppercase tracking-wider transition-colors ${
                  isActive(link.path)
                    ? 'text-primary font-semibold border-b-2 border-secondary pb-1'
                    : 'text-on-surface-variant hover:text-primary'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="flex items-center gap-space-md">
            {/* Search Trigger */}
            <button
              onClick={() => setIsSearchOpen(true)}
              className="p-space-2xs text-on-surface-variant hover:text-primary transition-colors flex items-center"
              aria-label="Search catalogue"
            >
              <span className="material-symbols-outlined text-[22px]">search</span>
            </button>

            {/* Wishlist Link */}
            <Link
              to="/wishlist"
              className="relative p-space-2xs text-on-surface-variant hover:text-primary transition-colors flex items-center"
              aria-label="Wishlist"
            >
              <span className="material-symbols-outlined text-[22px]">favorite</span>
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 h-4 w-4 bg-primary text-on-primary font-label-caps text-[9px] rounded-full flex items-center justify-center leading-none">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* User Account Link */}
            <Link to="/account" className="flex items-center gap-space-xs pl-space-2xs" aria-label="Account">
              <div className="w-8 h-8 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-label-caps text-[12px] font-bold border border-secondary/40 shadow-sm">
                VS
              </div>
            </Link>

            {/* Shopping Cart Trigger */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="flex items-center gap-space-xs bg-surface-container py-space-xs px-space-sm rounded-none text-primary hover:bg-surface-container-high transition-colors"
              aria-label="Shopping Bag"
            >
              <span className="material-symbols-outlined text-[20px]">shopping_bag</span>
              <span className="hidden sm:inline font-label-caps text-label-caps uppercase tracking-wider">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} • ₹{subtotal.toLocaleString('en-IN')}
              </span>
              <span className="sm:hidden font-label-caps text-label-caps font-semibold">
                {totalItems}
              </span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="xl:hidden bg-surface border-t border-outline-variant px-gutter-mobile py-space-md flex flex-col gap-space-md shadow-lg">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => handleNavClick(link)}
                className={`font-label-md text-label-md uppercase tracking-wider py-space-2xs ${
                  isActive(link.path) ? 'text-primary font-bold' : 'text-on-surface-variant'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
