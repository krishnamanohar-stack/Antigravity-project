import React from 'react';
import { Link } from 'react-router-dom';
import { useWishlist } from '../context/WishlistContext';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/common/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { allProducts } = useProducts();

  const wishlistedProducts = allProducts.filter((p) => wishlist.includes(p.id));

  return (
    <div className="w-full bg-background min-h-screen pb-space-4xl pt-space-xl">
      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary mb-space-2xl">
          Saved Wishlist ({wishlistedProducts.length})
        </h1>

        {wishlistedProducts.length === 0 ? (
          <div className="py-space-4xl text-center bg-surface-container-low p-space-2xl border border-outline-variant">
            <span className="material-symbols-outlined text-[64px] text-outline mb-space-xs block">
              favorite
            </span>
            <h2 className="font-headline-sm text-headline-sm text-primary">Your wishlist is empty</h2>
            <p className="font-body-md text-body-md text-on-surface-variant mt-2 max-w-md mx-auto">
              Save your favorite Banarasi sarees, Kanjivarams, and Anarkalis to revisit later.
            </p>
            <Link
              to="/sarees"
              className="mt-space-lg inline-block bg-primary text-surface font-label-caps text-label-caps uppercase px-space-2xl py-space-md hover:bg-primary-container"
            >
              Explore Catalogue
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
            {wishlistedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
