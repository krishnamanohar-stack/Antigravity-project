import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useOrders } from '../context/OrderContext';

export default function AccountPage() {
  const { orders } = useOrders();
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <div className="w-full bg-background min-h-screen pb-space-4xl pt-space-xl">
      <div className="max-w-[1280px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        {/* User Profile Header Card */}
        <div className="bg-surface-container-low p-space-2xl border border-outline-variant mb-space-2xl flex flex-col md:flex-row items-center justify-between gap-space-xl">
          <div className="flex items-center gap-space-md">
            <div className="w-20 h-20 rounded-full bg-secondary-container text-on-secondary-container flex items-center justify-center font-headline-md text-headline-md font-bold border-2 border-secondary shadow-md">
              VS
            </div>
            <div>
              <span className="font-label-caps text-[10px] uppercase text-secondary tracking-widest font-bold block">
                Atelier Privilege Member
              </span>
              <h1 className="font-headline-md text-headline-md text-primary font-normal">
                Priya Sharma
              </h1>
              <p className="font-body-sm text-body-sm text-on-surface-variant">
                priya.sharma@example.com • +91 98765 43210
              </p>
            </div>
          </div>

          <div className="bg-surface p-space-md border border-outline-variant text-center min-w-[200px]">
            <span className="font-label-caps text-[10px] text-on-surface-variant uppercase tracking-wider block">
              Patron Status
            </span>
            <span className="font-title-editorial text-headline-sm text-secondary font-bold">
              Royal Diamond
            </span>
            <span className="font-label-sm text-[11px] text-outline block mt-0.5">
              10% Private Circle Voucher Active
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-outline-variant gap-space-xl mb-space-xl">
          <button
            onClick={() => setActiveTab('orders')}
            className={`font-label-caps text-label-caps uppercase tracking-wider pb-space-xs transition-colors ${
              activeTab === 'orders' ? 'border-b-2 border-primary text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            Order History & Tracking ({orders.length})
          </button>
          <button
            onClick={() => setActiveTab('addresses')}
            className={`font-label-caps text-label-caps uppercase tracking-wider pb-space-xs transition-colors ${
              activeTab === 'addresses' ? 'border-b-2 border-primary text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            Saved Addresses
          </button>
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-space-lg">
            {orders.length === 0 ? (
              <div className="py-space-3xl text-center bg-surface-container-low p-space-xl border border-outline-variant">
                <p className="font-headline-sm text-headline-sm text-primary">No previous orders found</p>
                <Link to="/sarees" className="mt-space-md inline-block bg-primary text-surface px-space-xl py-space-md font-label-caps uppercase">
                  Discover Collection
                </Link>
              </div>
            ) : (
              orders.map((ord) => (
                <div key={ord.id} className="bg-surface p-space-xl border border-outline-variant space-y-space-md shadow-sm">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-space-sm border-b border-outline-variant/60 gap-space-xs">
                    <div>
                      <span className="font-label-caps text-label-caps uppercase text-secondary font-bold">Order ID: {ord.id}</span>
                      <p className="font-body-sm text-body-sm text-on-surface-variant">Placed on {new Date(ord.date).toLocaleDateString('en-IN')}</p>
                    </div>
                    <div className="flex items-center gap-space-md">
                      <span className="bg-secondary-container text-on-secondary-container px-space-xs py-space-2xs font-label-caps text-[11px] uppercase font-bold">
                        {ord.status}
                      </span>
                      <Link to={`/orders/${ord.id}`} className="font-label-caps text-label-caps uppercase text-primary underline hover:text-secondary">
                        Track Details
                      </Link>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-space-md">
                    {ord.items.map((it, idx) => (
                      <div key={idx} className="flex gap-space-xs items-center bg-surface-container-low p-space-xs border border-outline-variant/40">
                        <img src={it.thumbnail} alt={it.name} className="w-12 h-16 object-cover bg-surface-container shrink-0" />
                        <div>
                          <h4 className="font-title-editorial text-body-sm text-primary font-bold line-clamp-1">{it.name}</h4>
                          <p className="font-label-sm text-[11px] text-on-surface-variant">Qty: {it.quantity} | ₹{it.price.toLocaleString('en-IN')}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="pt-space-xs flex justify-between items-center font-headline-sm text-body-lg text-primary font-bold">
                    <span>Total Amount Paid ({ord.paymentMethod})</span>
                    <span>₹{ord.total.toLocaleString('en-IN')}</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {/* Addresses Tab */}
        {activeTab === 'addresses' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg">
            <div className="bg-surface p-space-xl border border-primary space-y-space-xs shadow-sm">
              <span className="bg-primary text-surface px-space-xs py-space-2xs font-label-caps text-[10px] uppercase font-bold">Primary Delivery</span>
              <h3 className="font-title-editorial text-headline-sm text-primary font-bold mt-space-xs">Priya Sharma</h3>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Flat 402, Royal Residency, Jubilee Hills</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Hyderabad, Telangana - 500033</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant">Phone: +91 98765 43210</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
