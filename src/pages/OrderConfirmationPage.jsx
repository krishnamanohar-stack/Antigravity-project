import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

export default function OrderConfirmationPage() {
  const { orderId } = useParams();
  const { getOrderById } = useOrders();
  const order = getOrderById(orderId);

  if (!order) {
    return (
      <div className="w-full bg-background min-h-screen pt-space-3xl pb-space-4xl text-center">
        <h2 className="font-headline-sm text-headline-sm text-primary">Order Not Found</h2>
        <Link to="/" className="mt-space-md inline-block bg-primary text-surface px-space-md py-space-xs font-label-caps uppercase">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div className="w-full bg-background min-h-screen pb-space-4xl pt-space-xl">
      <div className="max-w-[1024px] mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-space-2xl">
        {/* Success Banner */}
        <div className="bg-surface-container-low p-space-2xl border border-secondary/40 text-center space-y-space-xs">
          <div className="w-16 h-16 bg-secondary-container text-on-secondary-container rounded-full flex items-center justify-center mx-auto mb-space-xs">
            <span className="material-symbols-outlined text-[36px]">check_circle</span>
          </div>
          <span className="font-label-caps text-label-caps uppercase tracking-[0.25em] text-secondary font-bold">
            Order Successfully Placed
          </span>
          <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary">
            Thank You, {order.shippingAddress.fullName}!
          </h1>
          <p className="font-body-lg text-body-lg text-on-surface-variant max-w-lg mx-auto">
            Your couture order <strong className="text-primary font-bold">{order.id}</strong> has been received by our master looms.
          </p>
        </div>

        {/* Live Order Timeline Tracking */}
        <div className="bg-surface p-space-xl border border-outline-variant space-y-space-md">
          <h3 className="font-label-caps text-label-caps uppercase tracking-wider text-primary font-bold">
            Live Order Status & Artisan Timeline
          </h3>

          <div className="relative border-l-2 border-secondary/40 ml-4 space-y-space-lg pl-space-md py-space-xs">
            {order.timeline?.map((step, idx) => (
              <div key={idx} className="relative flex items-start justify-between">
                {/* Timeline Dot Pip */}
                <span className={`absolute -left-[23px] top-1 w-4 h-4 rounded-full border-2 ${
                  step.completed ? 'bg-secondary border-secondary' : 'bg-surface border-outline'
                }`} />

                <div>
                  <h4 className={`font-title-editorial text-body-lg ${step.completed ? 'text-primary font-bold' : 'text-outline'}`}>
                    {step.label}
                  </h4>
                  <p className="font-label-sm text-[12px] text-on-surface-variant">{step.date}</p>
                </div>

                {step.current && (
                  <span className="bg-secondary-container text-on-secondary-container px-space-xs py-space-2xs font-label-caps text-[10px] uppercase font-bold animate-pulse">
                    Current Stage
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Itemized Order Details & Shipping */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-space-xl">
          {/* Purchased Items */}
          <div className="bg-surface p-space-xl border border-outline-variant space-y-space-md">
            <h3 className="font-label-caps text-label-caps uppercase tracking-wider text-primary font-bold pb-space-xs border-b border-outline-variant">
              Itemized Ensembles ({order.items.length})
            </h3>
            <div className="space-y-space-sm">
              {order.items.map((item, idx) => (
                <div key={idx} className="flex gap-space-sm items-center">
                  <img src={item.thumbnail} alt={item.name} className="w-14 h-18 object-cover bg-surface-container shrink-0" />
                  <div className="flex-1">
                    <h4 className="font-title-editorial text-body-md text-primary font-bold line-clamp-1">{item.name}</h4>
                    <p className="font-label-sm text-[11px] text-on-surface-variant">
                      Qty: {item.quantity} | {item.selectedColor}
                    </p>
                    {item.blouseOption && (
                      <p className="font-label-sm text-[11px] text-secondary">{item.blouseOption}</p>
                    )}
                  </div>
                  <span className="font-headline-sm text-body-lg text-primary font-bold">
                    ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                  </span>
                </div>
              ))}
            </div>
            <div className="pt-space-xs border-t border-outline-variant flex justify-between font-headline-sm text-headline-sm text-primary font-bold">
              <span>Total Paid ({order.paymentMethod})</span>
              <span>₹{order.total.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Delivery Address */}
          <div className="bg-surface p-space-xl border border-outline-variant space-y-space-md">
            <h3 className="font-label-caps text-label-caps uppercase tracking-wider text-primary font-bold pb-space-xs border-b border-outline-variant">
              Delivery Address & Contact
            </h3>
            <div className="font-body-sm text-body-sm text-on-surface-variant space-y-1">
              <p className="font-bold text-primary text-body-md">{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.address}</p>
              <p>{order.shippingAddress.city}, {order.shippingAddress.state} - {order.shippingAddress.pincode}</p>
              <p>📞 Phone: {order.shippingAddress.phone}</p>
              <p>✉️ Email: {order.shippingAddress.email}</p>
            </div>

            <div className="pt-space-md">
              <Link
                to="/sarees"
                className="w-full bg-primary-container text-surface font-label-caps text-label-caps uppercase py-space-md tracking-widest hover:bg-primary transition-colors block text-center shadow-md"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
