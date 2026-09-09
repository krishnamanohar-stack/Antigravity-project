import React from 'react';
import { useProducts } from '../../context/ProductContext';

export default function SortDropdown() {
  const { sortBy, setSortBy } = useProducts();

  return (
    <div className="flex items-center gap-space-xs font-label-sm text-label-sm">
      <span className="text-on-surface-variant uppercase tracking-wider font-semibold">Sort By:</span>
      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
        className="px-space-sm py-space-xs bg-surface border border-outline-variant text-primary font-body-sm font-medium focus:outline-none focus:border-primary cursor-pointer"
      >
        <option value="recommended">Curated / Recommended</option>
        <option value="newest">Newest Arrivals</option>
        <option value="price-low">Price: Low to High</option>
        <option value="price-high">Price: High to Low</option>
        <option value="rating">Highest Rated (★)</option>
        <option value="discount">Biggest Discount (%)</option>
      </select>
    </div>
  );
}
