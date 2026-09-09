import React, { createContext, useContext, useState, useEffect } from 'react';

const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
  const [orders, setOrders] = useState(() => {
    const saved = localStorage.getItem('vanya_orders');
    return saved ? JSON.parse(saved) : [
      {
        id: "ORD-2026-9812",
        date: "2026-09-08T14:30:00Z",
        status: "Hand-Drawn Loom Weave",
        timeline: [
          { label: "Order Placed & Confirmed", date: "Sep 8, 2026", completed: true },
          { label: "Hand-Drawn Loom Weave", date: "In Progress (Varanasi Atelier)", completed: true, current: true },
          { label: "Quality Inspected & Packed", date: "Expected Sep 11", completed: false },
          { label: "Shipped via Pan-India Express", date: "Expected Sep 12", completed: false },
          { label: "Out for Delivery", date: "Expected Sep 14", completed: false }
        ],
        items: [
          {
            id: "vanya-001",
            name: "Maharani Crimson Banarasi Silk Saree",
            price: 18500,
            quantity: 1,
            selectedColor: "Crimson Red",
            blouseOption: "Custom Tailored Blouse (+₹2,500)",
            thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuAkddJZ7JFkFbsOmMExe0HHBcwdQHjhvvYaCb1wnguG8UK1nS9j6Z4A_l7fH_I_f1-GQZjqTaRIpZYzBTQG_IqagxBWhR8u3VleoDiF5NuBx6Oh3y_Jv26Z7SNLwap45nB6xncA2dlZpP0XYHcas8q1Ihs--lB0EEfOvggkewJoRWakieKqqLqxZU46FG3D-QWRO8wVfeNjPvaIRlZWHli18P1Y_FY6PaS-lktMkcg7q25NLNasR_5PNw"
          }
        ],
        total: 21000,
        shippingAddress: {
          fullName: "Priya Sharma",
          email: "priya.sharma@example.com",
          phone: "+91 98765 43210",
          address: "Flat 402, Royal Residency, Jubilee Hills",
          city: "Hyderabad",
          state: "Telangana",
          pincode: "500033"
        },
        paymentMethod: "UPI (Google Pay)",
        paymentStatus: "Paid"
      }
    ];
  });

  useEffect(() => {
    localStorage.setItem('vanya_orders', JSON.stringify(orders));
  }, [orders]);

  const placeOrder = (cartItems, totalAmount, shippingDetails, paymentMethod) => {
    const newOrderId = `ORD-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newOrder = {
      id: newOrderId,
      date: new Date().toISOString(),
      status: "Order Confirmed",
      timeline: [
        { label: "Order Placed & Confirmed", date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }), completed: true, current: true },
        { label: "Artisan Weave Inspection", date: "In Progress", completed: false },
        { label: "Quality Inspected & Packed", date: "Pending", completed: false },
        { label: "Shipped via Pan-India Express", date: "Pending", completed: false },
        { label: "Out for Delivery", date: "Pending", completed: false }
      ],
      items: cartItems,
      total: totalAmount,
      shippingAddress: shippingDetails,
      paymentMethod,
      paymentStatus: paymentMethod === "Cash on Delivery" ? "Pending (COD)" : "Paid"
    };

    setOrders((prev) => [newOrder, ...prev]);
    return newOrderId;
  };

  const getOrderById = (id) => orders.find((o) => o.id === id);

  return (
    <OrderContext.Provider value={{
      orders,
      placeOrder,
      getOrderById
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrders = () => useContext(OrderContext);
