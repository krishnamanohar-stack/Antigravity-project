import React, { useState } from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="w-full bg-primary text-on-primary pt-space-3xl pb-space-xl border-t border-secondary/30">
      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        {/* Newsletter Section */}
        <div className="bg-primary-container p-space-xl md:p-space-2xl border border-secondary/30 mb-space-3xl flex flex-col lg:flex-row items-center justify-between gap-space-xl">
          <div className="max-w-xl text-center lg:text-left">
            <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary-fixed block mb-space-2xs">
              Exclusive Access
            </span>
            <h3 className="font-headline-md text-headline-md text-surface font-normal">
              Subscribe for Private Atelier Previews
            </h3>
            <p className="font-body-sm text-body-sm text-surface-variant mt-space-2xs">
              Receive bespoke invitations to limited loom drops, bridal trousseau consultations, and heritage weave stories.
            </p>
          </div>

          <form onSubmit={handleSubscribe} className="w-full lg:w-auto flex flex-col sm:flex-row gap-space-xs">
            {subscribed ? (
              <div className="bg-secondary-container text-on-secondary-container px-space-xl py-space-md font-label-caps text-label-caps uppercase tracking-wider text-center">
                ✨ Welcome to the VANYA Private Circle!
              </div>
            ) : (
              <>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  className="px-space-md py-space-md bg-surface text-primary font-body-sm placeholder:text-outline focus:outline-none min-w-[280px]"
                />
                <button
                  type="submit"
                  className="bg-secondary text-on-secondary font-label-caps text-label-caps uppercase tracking-widest px-space-xl py-space-md hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors shadow-md"
                >
                  Join Circle
                </button>
              </>
            )}
          </form>
        </div>

        {/* Navigation & Brand Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-2xl pb-space-2xl border-b border-surface-variant/20">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-space-md">
            <div className="flex flex-col">
              <span className="font-headline-md text-headline-md tracking-wider text-surface uppercase leading-none">
                VANYA
              </span>
              <span className="font-label-caps text-label-caps tracking-[0.3em] text-secondary-fixed uppercase mt-1">
                Haute Couture
              </span>
            </div>
            <p className="font-body-sm text-body-sm text-surface-variant max-w-sm leading-relaxed">
              Steeped in the timeless majesty of Indian royal ateliers, translated into contemporary global luxury. Handwoven sarees and bespoke ethnic ensembles crafted by master Indian artisans.
            </p>
            <div className="flex items-center gap-space-sm pt-space-xs text-secondary-fixed">
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span className="font-label-caps text-[11px] uppercase tracking-wider">
                100% Certified Pure Silk & Real Zari
              </span>
            </div>
          </div>

          {/* Quick Links Column 1 */}
          <div>
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed mb-space-md">
              Collections
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-surface-variant">
              <li><Link to="/sarees" className="hover:text-surface transition-colors">Pure Banarasi Silk</Link></li>
              <li><Link to="/sarees" className="hover:text-surface transition-colors">Kanchipuram Heritage</Link></li>
              <li><Link to="/sarees" className="hover:text-surface transition-colors">Chanderi & Organza</Link></li>
              <li><Link to="/dresses" className="hover:text-surface transition-colors">Indo-Western Gowns</Link></li>
              <li><Link to="/dresses" className="hover:text-surface transition-colors">Royal Anarkali Suits</Link></li>
              <li><Link to="/dresses" className="hover:text-surface transition-colors">Casual Silk Kaftans</Link></li>
            </ul>
          </div>

          {/* Quick Links Column 2 */}
          <div>
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed mb-space-md">
              Atelier Service
            </h4>
            <ul className="space-y-space-xs font-body-sm text-body-sm text-surface-variant">
              <li><Link to="/account" className="hover:text-surface transition-colors">Track Order</Link></li>
              <li><a href="#blouse-guide" className="hover:text-surface transition-colors">Blouse Stitching Guide</a></li>
              <li><a href="#authenticity" className="hover:text-surface transition-colors">GI Authenticity Tag</a></li>
              <li><a href="#shipping" className="hover:text-surface transition-colors">Pan-India Express Shipping</a></li>
              <li><a href="#returns" className="hover:text-surface transition-colors">7-Day Royal Exchange</a></li>
              <li><a href="#care" className="hover:text-surface transition-colors">Silk Care Instructions</a></li>
            </ul>
          </div>

          {/* Concierge & Contact */}
          <div>
            <h4 className="font-label-caps text-label-caps uppercase tracking-widest text-secondary-fixed mb-space-md">
              Client Concierge
            </h4>
            <div className="space-y-space-sm font-body-sm text-body-sm text-surface-variant">
              <p>📍 Palace Road, Jubilee Hills, Hyderabad, Telangana 500033</p>
              <p>📞 Concierge: +91 40 8923 7700</p>
              <p>✉️ Support: concierge@vanyacouture.in</p>
              
              {/* WhatsApp Concierge Button */}
              <a
                href="https://wa.me/919876543210?text=Hello%20VANYA%20Concierge,%20I%20would%20like%20assistance%20with%20a%20couture%20order."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-space-xs px-space-md py-space-xs bg-[#25D366] text-white font-label-caps text-[11px] uppercase tracking-wider hover:opacity-90 transition-opacity mt-space-xs"
              >
                <span className="material-symbols-outlined text-[16px]">chat</span>
                WhatsApp Concierge
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright & Payment Badges */}
        <div className="pt-space-xl flex flex-col md:flex-row items-center justify-between gap-space-md font-label-sm text-label-sm text-surface-variant">
          <p>© 2026 VANYA Haute Couture. All rights reserved. Masterpieces woven in India.</p>

          {/* Supported Indian Payment Icons */}
          <div className="flex items-center gap-space-xs">
            <span className="bg-surface/10 px-space-xs py-space-2xs text-[10px] font-bold text-surface tracking-wider">UPI</span>
            <span className="bg-surface/10 px-space-xs py-space-2xs text-[10px] font-bold text-surface tracking-wider">GPAY</span>
            <span className="bg-surface/10 px-space-xs py-space-2xs text-[10px] font-bold text-surface tracking-wider">PHONEPE</span>
            <span className="bg-surface/10 px-space-xs py-space-2xs text-[10px] font-bold text-surface tracking-wider">CARDS</span>
            <span className="bg-surface/10 px-space-xs py-space-2xs text-[10px] font-bold text-surface tracking-wider">NETBANKING</span>
            <span className="bg-surface/10 px-space-xs py-space-2xs text-[10px] font-bold text-surface tracking-wider">COD</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
