import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();
  const isWishlisted = wishlist.includes(product.id);

  const getTagBadge = () => {
    if (product.discount > 0) return `${product.discount}% Off`;
    if (product.tags?.includes('GI Certified')) return 'GI Certified';
    if (product.tags?.includes('Atelier Cut')) return 'Atelier Cut';
    if (product.tags?.includes('Limited Release')) return 'Limited Release';
    return null;
  };

  const badgeText = getTagBadge();

  return (
    <div className="group flex flex-col bg-surface-container-lowest p-space-xs shadow-sm hover:shadow-xl transition-all border border-outline-variant/30">
      {/* Product Image Container (3:4 Editorial Ratio) */}
      <div className="aspect-[3/4] relative overflow-hidden bg-surface-container">
        <Link to={`/product/${product.slug}`}>
          <img
            src={product.thumbnail || product.images?.[0]}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </Link>

        {/* Badge Tag */}
        {badgeText && (
          <span className="absolute top-3 left-3 bg-secondary-container text-on-secondary-container px-space-xs py-space-2xs font-label-caps text-[10px] tracking-wider uppercase font-semibold">
            {badgeText}
          </span>
        )}

        {/* Wishlist Heart Button */}
        <button
          type="button"
          onClick={() => toggleWishlist(product.id)}
          className={`absolute top-3 right-3 w-8 h-8 bg-surface/80 backdrop-blur-sm flex items-center justify-center transition-colors ${
            isWishlisted ? 'text-error' : 'text-primary hover:text-error'
          }`}
          aria-label="Save to Wishlist"
        >
          <span className={`material-symbols-outlined text-[18px] ${isWishlisted ? 'filled' : ''}`}>
            favorite
          </span>
        </button>

        {/* Quick Add Slide-up Overlay */}
        <div className="absolute bottom-0 inset-x-0 p-space-sm translate-y-full group-hover:translate-y-0 transition-transform duration-300 bg-surface/95 backdrop-blur-sm">
          <button
            type="button"
            onClick={() => addToCart(product)}
            className="w-full bg-primary-container text-surface font-label-caps text-label-caps uppercase py-space-xs tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-space-xs"
          >
            <span className="material-symbols-outlined text-[16px]">shopping_bag</span> Quick Add
          </button>
        </div>
      </div>

      {/* Product Details */}
      <div className="p-space-sm flex flex-col flex-1">
        {/* Rating & Reviews */}
        <div className="flex items-center gap-space-xs mb-space-2xs">
          <div className="flex text-secondary text-[14px]">
            <span className="material-symbols-outlined text-[16px] filled">star</span>
          </div>
          <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
            {product.rating} ({product.reviewCount} reviews)
          </span>
        </div>

        {/* Title & Subtitle */}
        <Link to={`/product/${product.slug}`}>
          <h3 className="font-title-editorial text-title-editorial text-primary font-medium leading-snug hover:text-secondary transition-colors line-clamp-1">
            {product.name}
          </h3>
        </Link>
        <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
          {product.fabric}
        </p>

        {/* Color Swatches */}
        {product.colors && product.colors.length > 0 && (
          <div className="flex items-center gap-space-2xs my-space-xs">
            {product.colors.map((color, idx) => (
              <span
                key={idx}
                className="w-3.5 h-3.5 rounded-full shadow-inner ring-1 ring-secondary/40"
                style={{ backgroundColor: color.hex }}
                title={color.name}
              />
            ))}
          </div>
        )}

        {/* Price & MRP */}
        <div className="flex items-baseline gap-space-xs mt-auto pt-space-xs">
          <span className="font-headline-sm text-headline-sm text-primary font-semibold">
            ₹{product.price.toLocaleString('en-IN')}
          </span>
          {product.mrp && product.mrp > product.price && (
            <span className="font-body-sm text-body-sm text-outline line-through">
              ₹{product.mrp.toLocaleString('en-IN')}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
