import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const { cart, subtotal, couponDiscount, shippingFee, total, clearCart } = useCart();
  const { placeOrder } = useOrders();

  const [formData, setFormData] = useState({
    fullName: "Priya Sharma",
    email: "priya.sharma@example.com",
    phone: "9876543210",
    address: "Flat 402, Royal Residency, Jubilee Hills",
    city: "Hyderabad",
    state: "Telangana",
    pincode: "500033"
  });

  const [paymentMethod, setPaymentMethod] = useState("UPI");
  const [upiId, setUpiId] = useState("priya@okicici");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "4111 2222 3333 4444",
    expiry: "09/28",
    cvv: "888",
    nameOnCard: "PRIYA SHARMA"
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = placeOrder(cart, total, formData, paymentMethod);
      clearCart();
      setIsSubmitting(false);
      navigate(`/orders/${orderId}`);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="w-full bg-background min-h-screen pt-space-3xl pb-space-4xl flex items-center justify-center">
        <div className="text-center bg-surface-container-low p-space-2xl border border-outline-variant max-w-md">
          <span className="material-symbols-outlined text-[56px] text-outline mb-space-xs block">
            shopping_bag
          </span>
          <h2 className="font-headline-sm text-headline-sm text-primary">Your bag is empty</h2>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
            Please add items to your shopping bag before proceeding to checkout.
          </p>
          <Link
            to="/sarees"
            className="mt-space-lg inline-block bg-primary text-surface font-label-caps text-label-caps uppercase px-space-xl py-space-md hover:bg-primary-container"
          >
            Explore Catalogue
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen pb-space-4xl pt-space-xl">
      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        {/* Checkout Header */}
        <div className="mb-space-2xl border-b border-outline-variant pb-space-md flex justify-between items-end">
          <div>
            <div className="flex items-center gap-space-2xs font-label-sm text-[12px] text-on-surface-variant mb-space-2xs">
              <Link to="/cart" className="hover:text-primary">Cart</Link>
              <span>/</span>
              <span className="text-primary font-semibold">Luxury Checkout & Payment</span>
            </div>
            <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary">
              Luxury Checkout
            </h1>
          </div>
          <div className="flex items-center gap-space-xs text-secondary font-label-caps text-label-caps uppercase font-bold">
            <span className="material-symbols-outlined text-[18px]">lock</span> 100% Encrypted & Secure
          </div>
        </div>

        {/* Two-Column Form & Summary */}
        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
          {/* Left Column: Customer Details, Address, Shipping & Payment */}
          <div className="lg:col-span-7 space-y-space-xl">
            {/* Step 1: Shipping Address */}
            <div className="bg-surface-container-low p-space-xl border border-outline-variant space-y-space-md">
              <div className="flex items-center gap-space-xs text-primary font-headline-sm text-headline-sm">
                <span className="w-7 h-7 bg-primary text-surface font-label-caps text-[12px] rounded-full flex items-center justify-center font-bold">1</span>
                <h3>Shipping & Delivery Address</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                <div>
                  <label className="font-label-sm text-label-sm text-primary uppercase font-semibold block mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleInputChange}
                    className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-primary uppercase font-semibold block mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-primary uppercase font-semibold block mb-1">
                    Phone Number (for Courier SMS) *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-primary uppercase font-semibold block mb-1">
                    PIN Code *
                  </label>
                  <input
                    type="text"
                    name="pincode"
                    required
                    maxLength={6}
                    value={formData.pincode}
                    onChange={handleInputChange}
                    className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="font-label-sm text-label-sm text-primary uppercase font-semibold block mb-1">
                    Street Address & House/Flat No. *
                  </label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-primary uppercase font-semibold block mb-1">
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    required
                    value={formData.city}
                    onChange={handleInputChange}
                    className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-primary uppercase font-semibold block mb-1">
                    State *
                  </label>
                  <input
                    type="text"
                    name="state"
                    required
                    value={formData.state}
                    onChange={handleInputChange}
                    className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant font-body-sm focus:outline-none focus:border-primary"
                  />
                </div>
              </div>
            </div>

            {/* Step 2: Payment Selection */}
            <div className="bg-surface-container-low p-space-xl border border-outline-variant space-y-space-md">
              <div className="flex items-center gap-space-xs text-primary font-headline-sm text-headline-sm">
                <span className="w-7 h-7 bg-primary text-surface font-label-caps text-[12px] rounded-full flex items-center justify-center font-bold">2</span>
                <h3>Select Payment Method</h3>
              </div>

              <div className="space-y-space-xs">
                {/* UPI Payment */}
                <label className={`block p-space-md border cursor-pointer transition-all ${paymentMethod === 'UPI' ? 'border-primary bg-surface shadow-sm' : 'border-outline-variant/60 bg-surface/50'}`}>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-space-xs">
                      <input
                        type="radio"
                        name="payment"
                        checked={paymentMethod === 'UPI'}
                        onChange={() => setPaymentMethod('UPI')}
                        className="accent-primary"
                      />
                      <span className="font-title-editorial text-body-lg text-primary font-bold">
                        UPI (Google Pay / PhonePe / Paytm / BHIM)
                      </span>
                    </div>
                    <span className="font-label-caps text-[10px] text-secondary font-bold bg-secondary-container px-2 py-0.5">INSTANT DISCOUNT</span>
                  </div>

                  {paymentMethod === 'UPI' && (
                    <div className="mt-space-md pt-space-sm border-t border-outline-variant/40 space-y-space-xs">
                      <label className="font-label-sm text-[11px] text-on-surface-variant block">Enter UPI ID (VPA)</label>
                      <input
                        type="text"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="e.g. yourname@upi"
                        className="w-full max-w-sm px-space-sm py-space-xs bg-surface border border-outline-variant font-label-sm text-label-sm"
                      />
                    </div>
                  )}
                </label>

                {/* Cards Payment */}
                <label className={`block p-space-md border cursor-pointer transition-all ${paymentMethod === 'Card' ? 'border-primary bg-surface shadow-sm' : 'border-outline-variant/60 bg-surface/50'}`}>
                  <div className="flex items-center gap-space-xs">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Card'}
                      onChange={() => setPaymentMethod('Card')}
                      className="accent-primary"
                    />
                    <span className="font-title-editorial text-body-lg text-primary font-bold">
                      Credit / Debit Card (Visa, MasterCard, Amex)
                    </span>
                  </div>

                  {paymentMethod === 'Card' && (
                    <div className="mt-space-md pt-space-sm border-t border-outline-variant/40 grid grid-cols-2 gap-space-sm">
                      <div className="col-span-2">
                        <label className="font-label-sm text-[11px] text-on-surface-variant block">Card Number</label>
                        <input
                          type="text"
                          value={cardDetails.cardNumber}
                          onChange={(e) => setCardDetails({ ...cardDetails, cardNumber: e.target.value })}
                          className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant font-label-sm"
                        />
                      </div>
                      <div>
                        <label className="font-label-sm text-[11px] text-on-surface-variant block">Expiry Date</label>
                        <input
                          type="text"
                          value={cardDetails.expiry}
                          onChange={(e) => setCardDetails({ ...cardDetails, expiry: e.target.value })}
                          className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant font-label-sm"
                        />
                      </div>
                      <div>
                        <label className="font-label-sm text-[11px] text-on-surface-variant block">CVV Security Code</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={cardDetails.cvv}
                          onChange={(e) => setCardDetails({ ...cardDetails, cvv: e.target.value })}
                          className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant font-label-sm"
                        />
                      </div>
                    </div>
                  )}
                </label>

                {/* Net Banking */}
                <label className={`block p-space-md border cursor-pointer transition-all ${paymentMethod === 'NetBanking' ? 'border-primary bg-surface shadow-sm' : 'border-outline-variant/60 bg-surface/50'}`}>
                  <div className="flex items-center gap-space-xs">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'NetBanking'}
                      onChange={() => setPaymentMethod('NetBanking')}
                      className="accent-primary"
                    />
                    <span className="font-title-editorial text-body-lg text-primary font-bold">
                      Net Banking (HDFC, ICICI, SBI, Axis, Kotak)
                    </span>
                  </div>
                </label>

                {/* Cash on Delivery */}
                <label className={`block p-space-md border cursor-pointer transition-all ${paymentMethod === 'Cash on Delivery' ? 'border-primary bg-surface shadow-sm' : 'border-outline-variant/60 bg-surface/50'}`}>
                  <div className="flex items-center gap-space-xs">
                    <input
                      type="radio"
                      name="payment"
                      checked={paymentMethod === 'Cash on Delivery'}
                      onChange={() => setPaymentMethod('Cash on Delivery')}
                      className="accent-primary"
                    />
                    <span className="font-title-editorial text-body-lg text-primary font-bold">
                      Cash on Delivery (COD)
                    </span>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column: Order Summary & Place Order Button */}
          <div className="lg:col-span-5 space-y-space-md">
            <div className="bg-surface-container-low p-space-xl border border-outline-variant space-y-space-md sticky top-28">
              <h3 className="font-headline-sm text-headline-sm text-primary font-normal pb-space-xs border-b border-outline-variant">
                Order Review ({cart.length} items)
              </h3>

              {/* Items List Brief */}
              <div className="space-y-space-sm max-h-64 overflow-y-auto pr-1">
                {cart.map((item, idx) => (
                  <div key={idx} className="flex gap-space-sm items-center border-b border-outline-variant/40 pb-space-xs">
                    <img src={item.thumbnail} alt={item.name} className="w-12 h-16 object-cover bg-surface-container shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-title-editorial text-body-sm text-primary font-bold line-clamp-1">{item.name}</h4>
                      <p className="font-label-sm text-[11px] text-on-surface-variant">
                        Qty: {item.quantity} | {item.selectedColor}
                      </p>
                    </div>
                    <span className="font-headline-sm text-body-md text-primary font-bold">
                      ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                    </span>
                  </div>
                ))}
              </div>

              {/* Cost Calculations */}
              <div className="space-y-space-xs pt-space-xs font-body-sm text-body-sm">
                <div className="flex justify-between text-on-surface-variant">
                  <span>Subtotal</span>
                  <span>₹{subtotal.toLocaleString('en-IN')}</span>
                </div>

                {couponDiscount > 0 && (
                  <div className="flex justify-between text-secondary font-semibold">
                    <span>Coupon Discount</span>
                    <span>-₹{couponDiscount.toLocaleString('en-IN')}</span>
                  </div>
                )}

                <div className="flex justify-between text-on-surface-variant">
                  <span>Express Delivery</span>
                  <span>{shippingFee === 0 ? <strong className="text-secondary">FREE</strong> : `₹${shippingFee}`}</span>
                </div>

                <div className="flex justify-between text-primary font-bold text-headline-sm border-t border-outline-variant pt-space-sm mt-space-sm">
                  <span>Total Payable</span>
                  <span>₹{total.toLocaleString('en-IN')}</span>
                </div>
              </div>

              {/* Place Order CTA Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-primary-container text-surface font-label-caps text-label-caps uppercase py-space-md tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-space-xs shadow-xl disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Securing Order...</span>
                ) : (
                  <>
                    <span>Place Order & Pay ₹{total.toLocaleString('en-IN')}</span>
                    <span className="material-symbols-outlined text-[18px]">verified_user</span>
                  </>
                )}
              </button>

              <div className="pt-space-xs border-t border-outline-variant/40 text-center font-label-sm text-[11px] text-on-surface-variant">
                🔒 Protected by 256-bit SSL Banking Encryption
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
