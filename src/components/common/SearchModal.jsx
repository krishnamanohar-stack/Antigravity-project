import React from 'react';
import { Link } from 'react-router-dom';
import { useProducts } from '../../context/ProductContext';

export default function SearchModal({ isOpen, onClose }) {
  const { searchQuery, setSearchQuery, products } = useProducts();

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] bg-primary/60 backdrop-blur-sm flex items-start justify-center pt-16 sm:pt-24 px-4">
      <div className="bg-surface w-full max-w-2xl shadow-2xl overflow-hidden border border-outline-variant">
        {/* Search Header Input */}
        <div className="p-space-md border-b border-outline-variant flex items-center gap-space-sm bg-surface-container-low">
          <span className="material-symbols-outlined text-primary text-[24px]">search</span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search Banarasi, Silk Sarees, Chanderi, Anarkalis..."
            className="w-full bg-transparent font-title-editorial text-headline-sm text-primary placeholder:text-outline focus:outline-none"
            autoFocus
          />
          <button
            onClick={onClose}
            className="p-space-2xs text-on-surface-variant hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Quick Search Results */}
        <div className="max-h-[60vh] overflow-y-auto p-space-md">
          {searchQuery.trim() === '' ? (
            <div className="py-space-md">
              <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest block mb-space-xs">
                Popular Searches
              </span>
              <div className="flex flex-wrap gap-space-xs">
                {['Banarasi Silk', 'Kanjivaram', 'Chanderi Dress', 'Gota Patti', 'Organza Saree', 'Kaftan'].map((term) => (
                  <button
                    key={term}
                    onClick={() => setSearchQuery(term)}
                    className="px-space-sm py-space-2xs bg-surface-container text-primary font-label-sm text-label-sm hover:bg-secondary-container transition-colors"
                  >
                    {term}
                  </button>
                ))}
              </div>
            </div>
          ) : products.length > 0 ? (
            <div className="space-y-space-sm">
              <span className="font-label-caps text-label-caps uppercase text-secondary tracking-widest block">
                Found {products.length} Results
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-sm">
                {products.slice(0, 6).map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    onClick={onClose}
                    className="flex gap-space-sm p-space-2xs bg-surface-container-lowest hover:bg-surface-container transition-colors border border-outline-variant/40"
                  >
                    <img
                      src={product.thumbnail}
                      alt={product.name}
                      className="w-16 h-20 object-cover shrink-0"
                    />
                    <div className="flex flex-col justify-center">
                      <span className="font-title-editorial text-body-sm text-primary font-medium line-clamp-1">
                        {product.name}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface-variant">
                        {product.fabric}
                      </span>
                      <span className="font-label-sm text-label-sm text-primary font-bold mt-1">
                        ₹{product.price.toLocaleString('en-IN')}
                      </span>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="py-space-2xl text-center">
              <span className="material-symbols-outlined text-[48px] text-outline mb-space-2xs block">
                search_off
              </span>
              <p className="font-headline-sm text-headline-sm text-primary">No couture drapes found</p>
              <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                Try searching for 'Banarasi', 'Silk', or 'Chanderi'
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
