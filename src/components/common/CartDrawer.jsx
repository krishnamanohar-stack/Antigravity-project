import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';

export default function CartDrawer() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    isCartOpen,
    setIsCartOpen,
    subtotal,
    couponCode,
    applyCoupon,
    couponDiscount,
    shippingFee,
    total,
    totalItems
  } = useCart();

  const [inputCoupon, setInputCoupon] = useState('');
  const [couponMsg, setCouponMsg] = useState(null);

  if (!isCartOpen) return null;

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg(res);
  };

  const freeShippingThreshold = 5000;
  const freeShippingProgress = Math.min(100, Math.round((subtotal / freeShippingThreshold) * 100));
  const remainingForFreeShipping = Math.max(0, freeShippingThreshold - subtotal);

  return (
    <div className="fixed inset-0 z-[100] flex justify-end bg-primary/60 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-md h-full flex flex-col shadow-2xl border-l border-outline-variant">
        {/* Drawer Header */}
        <div className="p-space-md bg-surface-container-low border-b border-outline-variant flex items-center justify-between">
          <div className="flex items-center gap-space-xs">
            <span className="material-symbols-outlined text-primary text-[22px]">shopping_bag</span>
            <h2 className="font-headline-sm text-headline-sm text-primary">Your Shopping Bag</h2>
            <span className="font-label-caps text-label-caps text-secondary bg-secondary-container px-space-xs py-space-2xs rounded-full">
              {totalItems}
            </span>
          </div>
          <button
            onClick={() => setIsCartOpen(false)}
            className="p-space-2xs text-on-surface-variant hover:text-primary transition-colors"
            aria-label="Close cart"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Free Shipping Progress Indicator */}
        <div className="px-space-md py-space-sm bg-surface-container-high border-b border-outline-variant/60">
          <div className="flex justify-between font-label-sm text-label-sm mb-space-2xs">
            <span className="text-primary-container font-medium">
              {remainingForFreeShipping === 0
                ? '🎉 You have unlocked Free Pan-India Express Shipping!'
                : `Add ₹${remainingForFreeShipping.toLocaleString('en-IN')} more for FREE Pan-India Shipping`}
            </span>
            <span className="text-secondary font-bold">{freeShippingProgress}%</span>
          </div>
          <div className="w-full bg-surface-container-highest h-1.5 overflow-hidden">
            <div
              className="bg-secondary h-full transition-all duration-500"
              style={{ width: `${freeShippingProgress}%` }}
            />
          </div>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-space-md space-y-space-md">
          {cart.length === 0 ? (
            <div className="py-space-3xl text-center flex flex-col items-center">
              <span className="material-symbols-outlined text-[56px] text-outline mb-space-xs">
                shopping_bag
              </span>
              <p className="font-headline-sm text-headline-sm text-primary">Your bag is empty</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-xs">
                Discover masterwork sarees and bespoke drapes to elevate your wardrobe.
              </p>
              <button
                onClick={() => setIsCartOpen(false)}
                className="mt-space-lg bg-primary-container text-surface font-label-caps text-label-caps uppercase px-space-xl py-space-md hover:bg-primary transition-colors"
              >
                Discover Catalogue
              </button>
            </div>
          ) : (
            cart.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="flex gap-space-sm pb-space-sm border-b border-outline-variant/50">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="w-20 h-24 object-cover shrink-0 bg-surface-container"
                />
                <div className="flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex justify-between items-start gap-space-xs">
                      <h4 className="font-title-editorial text-body-md text-primary font-medium line-clamp-1">
                        {item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize, item.blouseOption)}
                        className="text-outline hover:text-error transition-colors"
                        aria-label="Remove item"
                      >
                        <span className="material-symbols-outlined text-[18px]">delete</span>
                      </button>
                    </div>
                    <p className="font-label-sm text-label-sm text-on-surface-variant mt-0.5">
                      Color: <span className="text-primary font-medium">{item.selectedColor}</span>
                      {item.selectedSize && ` | Size: ${item.selectedSize}`}
                    </p>
                    {item.blouseOption && (
                      <p className="font-label-sm text-[11px] text-secondary font-medium mt-0.5">
                        {item.blouseOption}
                      </p>
                    )}
                  </div>

                  <div className="flex items-center justify-between mt-space-xs">
                    {/* Quantity Controls */}
                    <div className="flex items-center border border-outline-variant bg-surface-container-lowest">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.blouseOption, -1)}
                        className="w-7 h-7 flex items-center justify-center text-primary hover:bg-surface-container"
                      >
                        -
                      </button>
                      <span className="w-8 text-center font-label-sm text-label-sm text-primary font-semibold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.blouseOption, 1)}
                        className="w-7 h-7 flex items-center justify-center text-primary hover:bg-surface-container"
                      >
                        +
                      </button>
                    </div>

                    <span className="font-headline-sm text-body-lg text-primary font-semibold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-space-md bg-surface-container-low border-t border-outline-variant space-y-space-sm">
            {/* Coupon Code Box */}
            <form onSubmit={handleApplyCoupon} className="flex gap-space-xs">
              <input
                type="text"
                value={inputCoupon}
                onChange={(e) => setInputCoupon(e.target.value)}
                placeholder="Promo Code (e.g. ROYAL10)"
                className="flex-1 px-space-sm py-space-2xs bg-surface border border-outline-variant font-label-sm text-label-sm uppercase focus:outline-none focus:border-primary"
              />
              <button
                type="submit"
                className="px-space-md py-space-2xs bg-surface-container-high text-primary font-label-caps text-label-caps uppercase hover:bg-secondary-container transition-colors"
              >
                Apply
              </button>
            </form>
            {couponMsg && (
              <p className={`font-label-sm text-[11px] ${couponMsg.success ? 'text-secondary font-bold' : 'text-error'}`}>
                {couponMsg.message}
              </p>
            )}

            {/* Price Calculations */}
            <div className="space-y-space-2xs pt-space-xs font-label-sm text-label-sm">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>₹{subtotal.toLocaleString('en-IN')}</span>
              </div>
              {couponDiscount > 0 && (
                <div className="flex justify-between text-secondary font-medium">
                  <span>Coupon Discount ({couponCode})</span>
                  <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                </div>
              )}
              <div className="flex justify-between text-on-surface-variant">
                <span>Pan-India Express Shipping</span>
                <span>{shippingFee === 0 ? <span className="text-secondary font-semibold">FREE</span> : `₹${shippingFee}`}</span>
              </div>
              <div className="flex justify-between text-primary font-bold text-body-lg border-t border-outline-variant/60 pt-space-xs mt-space-xs">
                <span>Estimated Total</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
            </div>

            {/* Checkout CTA Button */}
            <Link
              to="/checkout"
              onClick={() => setIsCartOpen(false)}
              className="w-full bg-primary-container text-surface font-label-caps text-label-caps uppercase py-space-md tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-space-xs shadow-md"
            >
              Proceed to Checkout
              <span className="material-symbols-outlined text-[18px]">east</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
