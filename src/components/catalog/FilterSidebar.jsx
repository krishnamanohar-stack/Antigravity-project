import React from 'react';
import { useProducts } from '../../context/ProductContext';

export default function FilterSidebar({ isMobile = false, onClose }) {
  const {
    categories,
    fabrics,
    occasions,
    selectedCategory,
    setSelectedCategory,
    selectedFabric,
    setSelectedFabric,
    selectedOccasion,
    setSelectedOccasion,
    priceRange,
    setPriceRange,
    resetFilters,
    products
  } = useProducts();

  return (
    <div className={`space-y-space-xl ${isMobile ? 'p-space-md' : ''}`}>
      {/* Sidebar Title */}
      <div className="flex items-center justify-between pb-space-xs border-b border-outline-variant">
        <div className="flex items-center gap-space-xs">
          <span className="material-symbols-outlined text-secondary text-[20px]">tune</span>
          <h3 className="font-label-caps text-label-caps uppercase tracking-widest text-primary font-bold">
            Refine Selection
          </h3>
        </div>
        <button
          onClick={resetFilters}
          className="font-label-sm text-label-sm text-secondary hover:text-primary transition-colors underline"
        >
          Reset All
        </button>
      </div>

      {/* Category Filter */}
      <div className="space-y-space-xs">
        <h4 className="font-label-caps text-label-caps uppercase tracking-wider text-primary font-semibold">
          Category
        </h4>
        <div className="space-y-space-2xs">
          <button
            onClick={() => setSelectedCategory('All')}
            className={`w-full text-left font-body-sm text-body-sm py-1 px-space-xs flex justify-between items-center transition-colors ${
              selectedCategory === 'All'
                ? 'bg-secondary-container/50 text-primary font-semibold'
                : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            <span>All Masterworks</span>
          </button>
          {categories.map((cat) => (
            <button
              key={cat.slug}
              onClick={() => setSelectedCategory(cat.slug)}
              className={`w-full text-left font-body-sm text-body-sm py-1 px-space-xs flex justify-between items-center transition-colors ${
                selectedCategory === cat.slug
                  ? 'bg-secondary-container/50 text-primary font-semibold'
                  : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              <span>{cat.name}</span>
              <span className="font-label-sm text-[11px] text-outline">({cat.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Price Range Slider */}
      <div className="space-y-space-xs pt-space-xs border-t border-outline-variant/40">
        <div className="flex justify-between items-center font-label-caps text-label-caps uppercase text-primary font-semibold">
          <span>Max Price</span>
          <span className="text-secondary font-bold">₹{priceRange.toLocaleString('en-IN')}</span>
        </div>
        <input
          type="range"
          min="3000"
          max="30000"
          step="1000"
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-secondary cursor-pointer"
        />
        <div className="flex justify-between font-label-sm text-[11px] text-outline">
          <span>₹3,000</span>
          <span>₹30,000</span>
        </div>
      </div>

      {/* Fabric Selection */}
      <div className="space-y-space-xs pt-space-xs border-t border-outline-variant/40">
        <h4 className="font-label-caps text-label-caps uppercase tracking-wider text-primary font-semibold">
          Pure Fabric
        </h4>
        <div className="space-y-space-2xs">
          <button
            onClick={() => setSelectedFabric('All')}
            className={`w-full text-left font-body-sm text-body-sm py-1 px-space-xs transition-colors ${
              selectedFabric === 'All' ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            All Fabrics
          </button>
          {fabrics.map((fabric) => (
            <button
              key={fabric}
              onClick={() => setSelectedFabric(fabric)}
              className={`w-full text-left font-body-sm text-body-sm py-1 px-space-xs transition-colors ${
                selectedFabric === fabric ? 'bg-secondary-container/50 text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {fabric}
            </button>
          ))}
        </div>
      </div>

      {/* Occasion Selection */}
      <div className="space-y-space-xs pt-space-xs border-t border-outline-variant/40">
        <h4 className="font-label-caps text-label-caps uppercase tracking-wider text-primary font-semibold">
          Occasion
        </h4>
        <div className="space-y-space-2xs">
          <button
            onClick={() => setSelectedOccasion('All')}
            className={`w-full text-left font-body-sm text-body-sm py-1 px-space-xs transition-colors ${
              selectedOccasion === 'All' ? 'text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
            }`}
          >
            All Occasions
          </button>
          {occasions.map((occ) => (
            <button
              key={occ}
              onClick={() => setSelectedOccasion(occ)}
              className={`w-full text-left font-body-sm text-body-sm py-1 px-space-xs transition-colors ${
                selectedOccasion === occ ? 'bg-secondary-container/50 text-primary font-semibold' : 'text-on-surface-variant hover:text-primary'
              }`}
            >
              {occ}
            </button>
          ))}
        </div>
      </div>

      {isMobile && (
        <button
          onClick={onClose}
          className="w-full bg-primary-container text-surface font-label-caps text-label-caps uppercase py-space-md tracking-widest mt-space-md"
        >
          View {products.length} Results
        </button>
      )}
    </div>
  );
}
