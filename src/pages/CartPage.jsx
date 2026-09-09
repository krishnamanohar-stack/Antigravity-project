import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartPage() {
  const {
    cart,
    removeFromCart,
    updateQuantity,
    subtotal,
    couponCode,
    applyCoupon,
    couponDiscount,
    shippingFee,
    total,
    totalItems
  } = useCart();

  const [inputCoupon, setInputCoupon] = React.useState('');
  const [couponMsg, setCouponMsg] = React.useState(null);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!inputCoupon.trim()) return;
    const res = applyCoupon(inputCoupon);
    setCouponMsg(res);
  };

  return (
    <div className="w-full bg-background min-h-screen pb-space-4xl pt-space-xl">
      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary mb-space-2xl">
          Shopping Bag ({totalItems})
        </h1>

        {cart.length === 0 ? (
          <div className="py-space-4xl text-center bg-surface-container-low p-space-2xl border border-outline-variant">
            <span className="material-symbols-outlined text-[64px] text-outline mb-space-xs block">
              shopping_bag
            </span>
            <h2 className="font-headline-sm text-headline-sm text-primary">Your shopping bag is empty</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-md mx-auto">
              Explore our handwoven Banarasi sarees, Kanjivaram silks, and artisanal dresses.
            </p>
            <Link
              to="/sarees"
              className="mt-space-lg inline-block bg-primary-container text-surface font-label-caps text-label-caps uppercase px-space-2xl py-space-md hover:bg-primary transition-colors shadow-md"
            >
              Explore Sarees Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
            {/* Cart Items List Column */}
            <div className="lg:col-span-8 space-y-space-md">
              <div className="bg-surface-container-low p-space-md border border-outline-variant hidden sm:grid grid-cols-12 font-label-caps text-label-caps text-primary uppercase font-bold">
                <span className="col-span-6">Couture Ensemble</span>
                <span className="col-span-3 text-center">Quantity</span>
                <span className="col-span-3 text-right">Subtotal</span>
              </div>

              {cart.map((item, idx) => (
                <div
                  key={`${item.id}-${idx}`}
                  className="bg-surface p-space-md border border-outline-variant flex flex-col sm:grid sm:grid-cols-12 items-center gap-space-md"
                >
                  {/* Item Product details */}
                  <div className="col-span-6 flex gap-space-md w-full">
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      className="w-20 h-28 object-cover shrink-0 bg-surface-container"
                    />
                    <div className="flex flex-col justify-center">
                      <Link to={`/product/${item.slug}`} className="font-title-editorial text-body-lg text-primary font-medium hover:text-secondary">
                        {item.name}
                      </Link>
                      <p className="font-label-sm text-label-sm text-on-surface-variant mt-1">
                        Shade: <strong className="text-primary">{item.selectedColor}</strong>
                        {item.selectedSize && ` | Size: ${item.selectedSize}`}
                      </p>
                      {item.blouseOption && (
                        <p className="font-label-sm text-[11px] text-secondary font-medium mt-1">
                          {item.blouseOption}
                        </p>
                      )}
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedColor, item.selectedSize, item.blouseOption)}
                        className="text-error font-label-sm text-[11px] uppercase tracking-wider mt-space-xs text-left hover:underline"
                      >
                        Remove Item
                      </button>
                    </div>
                  </div>

                  {/* Quantity Controls */}
                  <div className="col-span-3 flex justify-center w-full">
                    <div className="flex items-center border border-outline-variant bg-surface-container-lowest">
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.blouseOption, -1)}
                        className="w-8 h-8 flex items-center justify-center text-primary font-bold hover:bg-surface-container"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-label-sm text-label-sm text-primary font-bold">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.selectedColor, item.selectedSize, item.blouseOption, 1)}
                        className="w-8 h-8 flex items-center justify-center text-primary font-bold hover:bg-surface-container"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  {/* Subtotal */}
                  <div className="col-span-3 text-right w-full font-headline-sm text-headline-sm text-primary font-bold">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>

            {/* Order Summary & Coupon Column */}
            <div className="lg:col-span-4 space-y-space-md">
              <div className="bg-surface-container-low p-space-xl border border-outline-variant space-y-space-md">
                <h3 className="font-headline-sm text-headline-sm text-primary font-normal pb-space-xs border-b border-outline-variant">
                  Order Summary
                </h3>

                {/* Coupon Code Input */}
                <form onSubmit={handleApplyCoupon} className="space-y-space-xs">
                  <span className="font-label-caps text-label-caps text-primary uppercase font-semibold block">
                    Have a Voucher or Promo Code?
                  </span>
                  <div className="flex gap-space-xs">
                    <input
                      type="text"
                      value={inputCoupon}
                      onChange={(e) => setInputCoupon(e.target.value)}
                      placeholder="e.g. ROYAL10"
                      className="flex-1 px-space-sm py-space-xs bg-surface border border-outline-variant font-label-sm text-label-sm uppercase focus:outline-none focus:border-primary"
                    />
                    <button
                      type="submit"
                      className="px-space-md py-space-xs bg-primary text-surface font-label-caps text-label-caps uppercase hover:bg-primary-container"
                    >
                      Apply
                    </button>
                  </div>
                  {couponMsg && (
                    <p className={`font-label-sm text-[12px] ${couponMsg.success ? 'text-secondary font-bold' : 'text-error'}`}>
                      {couponMsg.message}
                    </p>
                  )}
                </form>

                {/* Summary Lines */}
                <div className="space-y-space-xs pt-space-xs border-t border-outline-variant/60 font-body-sm text-body-sm">
                  <div className="flex justify-between text-on-surface-variant">
                    <span>Bag Subtotal</span>
                    <span className="font-semibold text-primary">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>

                  {couponDiscount > 0 && (
                    <div className="flex justify-between text-secondary font-semibold">
                      <span>Voucher Discount ({couponCode})</span>
                      <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                    </div>
                  )}

                  <div className="flex justify-between text-on-surface-variant">
                    <span>Pan-India Express Shipping</span>
                    <span>{shippingFee === 0 ? <strong className="text-secondary">FREE</strong> : `₹${shippingFee}`}</span>
                  </div>

                  <div className="flex justify-between text-primary font-bold text-headline-sm border-t border-outline-variant pt-space-sm mt-space-sm">
                    <span>Total Amount</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                </div>

                <Link
                  to="/checkout"
                  className="w-full bg-primary-container text-surface font-label-caps text-label-caps uppercase py-space-md tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-space-xs shadow-md"
                >
                  Proceed to Checkout
                  <span className="material-symbols-outlined text-[18px]">east</span>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
