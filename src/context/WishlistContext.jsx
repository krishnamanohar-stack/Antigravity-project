import React, { createContext, useContext, useState, useEffect } from 'react';

const WishlistContext = createContext();

export const WishlistProvider = ({ children }) => {
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('vanya_wishlist');
    return saved ? JSON.parse(saved) : [
      "vanya-001",
      "vanya-003",
      "vanya-004"
    ];
  });

  useEffect(() => {
    localStorage.setItem('vanya_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  const toggleWishlist = (productId) => {
    setWishlist((prev) => 
      prev.includes(productId) 
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const isInWishlist = (productId) => wishlist.includes(productId);

  return (
    <WishlistContext.Provider value={{
      wishlist,
      toggleWishlist,
      isInWishlist,
      wishlistCount: wishlist.length
    }}>
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => useContext(WishlistContext);
