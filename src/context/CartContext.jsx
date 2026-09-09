import React, { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('vanya_cart');
    return saved ? JSON.parse(saved) : [
      // Default sample item matching Stitch design "2 items • ₹7,998"
      {
        id: "vanya-005",
        name: "Chanderi Minimalist Handspun Cotton Saree",
        slug: "chanderi-minimalist-handspun-cotton-saree",
        price: 4950,
        mrp: 6500,
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuCC3H8IeOEOcSZN3oN2D0DeywT0Dp_WD5agiMt0ULqy4A4lM0OxgbBY8qjLJXqEfDn-DBrfyEqvS5i4iNnePPaKIq2_qUfHwQRrxb8XULW6BStFrblvvN5NM8z2R3SopAUm6YQuJo5N-fF2M3M9fq69jCZVFRPWmMYbwLr3J5IsNFtfDTCHmxWN73FrIwFEmB2KLyMKZsJmvIQT8NQg7wFiORUoHcMK2KqwGn8YhqvE8TcA7dBDJ47wcw",
        selectedColor: "Ecru Raw",
        blouseOption: "Unstitched (Included)",
        quantity: 1
      },
      {
        id: "vanya-008",
        name: "Modal Silk Block Printed Botanical Kaftan",
        slug: "modal-silk-block-printed-botanical-kaftan",
        price: 5200,
        mrp: 6800,
        thumbnail: "https://lh3.googleusercontent.com/aida-public/AB6AXuARxfkfrR7awTASVlpXjhQQfZyWsBx2Lhd6scb3wDAehSFA4t_cveSSrsDv1o4hdrfPL_C7h_rIT_ZiCYejtiRLvkuUHbmkZTGVsc5rF_19Iv8ZY18jWeSBIt2F9CK1bnWfKpAP5zcOmKaFqy80en_piedLmhNLM7c5Wc9YsSTgjtcSCVBmfaymYWLOHSzy7H7TfC4X3Mz3id_1t9mWfe5MHUluz-2jVB8e1r7eWoHEL6hltFQ_C3NpNw",
        selectedColor: "Indigo Rust",
        selectedSize: "Free Size (S-XL)",
        quantity: 1
      }
    ];
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [couponCode, setCouponCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);

  useEffect(() => {
    localStorage.setItem('vanya_cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product, options = {}) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.id === product.id && 
                  item.selectedColor === (options.color || product.colors?.[0]?.name) &&
                  item.selectedSize === options.size &&
                  item.blouseOption === options.blouseOption
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += options.quantity || 1;
        return updated;
      } else {
        return [
          ...prev,
          {
            id: product.id,
            name: product.name,
            slug: product.slug,
            price: product.price,
            mrp: product.mrp,
            thumbnail: product.thumbnail || product.images?.[0],
            selectedColor: options.color || product.colors?.[0]?.name || 'Default',
            selectedSize: options.size || (product.sizes ? product.sizes[0] : null),
            blouseOption: options.blouseOption || (product.category === 'Sarees' ? 'Unstitched (Included)' : null),
            quantity: options.quantity || 1
          }
        ];
      }
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id, selectedColor, selectedSize, blouseOption) => {
    setCart((prev) => prev.filter(
      (item) => !(item.id === id && 
                 item.selectedColor === selectedColor && 
                 item.selectedSize === selectedSize && 
                 item.blouseOption === blouseOption)
    ));
  };

  const updateQuantity = (id, selectedColor, selectedSize, blouseOption, delta) => {
    setCart((prev) => prev.map((item) => {
      if (item.id === id && item.selectedColor === selectedColor && item.selectedSize === selectedSize && item.blouseOption === blouseOption) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const applyCoupon = (code) => {
    if (code.toUpperCase() === 'VANYA10' || code.toUpperCase() === 'ROYAL10') {
      setCouponCode(code.toUpperCase());
      setDiscountPercent(10);
      return { success: true, message: '10% Royal Atelier Coupon Applied!' };
    } else if (code.toUpperCase() === 'FESTIVE15') {
      setCouponCode(code.toUpperCase());
      setDiscountPercent(15);
      return { success: true, message: '15% Festive Celebration Coupon Applied!' };
    }
    return { success: false, message: 'Invalid coupon code. Try ROYAL10 or FESTIVE15' };
  };

  const clearCart = () => {
    setCart([]);
  };

  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const couponDiscount = Math.round((subtotal * discountPercent) / 100);
  const shippingFee = subtotal >= 5000 || subtotal === 0 ? 0 : 350;
  const total = subtotal - couponDiscount + shippingFee;
  const totalItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      isCartOpen,
      setIsCartOpen,
      subtotal,
      couponCode,
      discountPercent,
      applyCoupon,
      couponDiscount,
      shippingFee,
      total,
      totalItems
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
