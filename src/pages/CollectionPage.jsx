import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import ProductCard from '../components/common/ProductCard';
import FilterSidebar from '../components/catalog/FilterSidebar';
import SortDropdown from '../components/catalog/SortDropdown';

export default function CollectionPage() {
  const {
    products,
    selectedCategory,
    selectedFabric,
    selectedOccasion,
    resetFilters
  } = useProducts();

  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);

  const getPageTitle = () => {
    if (selectedCategory === 'Sarees') return 'Heritage Sarees Collection';
    if (selectedCategory === 'Dresses') return 'Artisanal Women\'s Dresses';
    if (selectedCategory === 'silk-sarees') return 'Pure Silk & Kanjivaram Sarees';
    if (selectedCategory === 'banarasi-weaves') return 'Royal Banarasi Kadwa Weaves';
    if (selectedCategory === 'cotton-sarees') return 'Breathable Chanderi & Cotton Sarees';
    if (selectedCategory === 'party-wear-dresses') return 'Indo-Western Party Wear Gowns';
    if (selectedCategory === 'ethnic-anarkalis') return 'Royal Gota Patti Anarkalis';
    if (selectedCategory === 'casual-kaftans') return 'Modal Silk Casual Kaftans';
    if (selectedCategory === 'new-arrivals') return 'New Festive Arrivals 2026';
    return 'Full Atelier Collection';
  };

  const hasActiveFilters = selectedCategory !== 'All' || selectedFabric !== 'All' || selectedOccasion !== 'All';

  return (
    <div className="w-full bg-background min-h-screen pb-space-4xl pt-space-xl">
      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        {/* Page Header & Breadcrumb */}
        <div className="mb-space-xl border-b border-outline-variant pb-space-lg">
          <div className="flex items-center gap-space-2xs font-label-sm text-[12px] text-on-surface-variant mb-space-xs">
            <span>Home</span>
            <span>/</span>
            <span className="text-primary font-semibold uppercase">{getPageTitle()}</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary">
            {getPageTitle()}
          </h1>
          <p className="font-body-md text-body-md text-on-surface-variant max-w-2xl mt-space-xs">
            Handcrafted with certified pure silks, authentic zari brocades, and tailored precision.
          </p>
        </div>

        {/* Catalog Layout Grid (Sidebar + Main Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl">
          {/* Desktop Filter Sidebar */}
          <aside className="hidden lg:block lg:col-span-3 bg-surface-container-low p-space-md border border-outline-variant h-fit sticky top-28">
            <FilterSidebar />
          </aside>

          {/* Main Product Grid Column */}
          <main className="lg:col-span-9 space-y-space-lg">
            {/* Action Bar (Mobile Filter Toggle + Sort Dropdown) */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md bg-surface-container-low p-space-sm border border-outline-variant">
              {/* Mobile Filter Drawer Button */}
              <button
                onClick={() => setIsMobileFilterOpen(true)}
                className="lg:hidden flex items-center gap-space-xs px-space-md py-space-xs bg-surface border border-outline-variant font-label-caps text-label-caps text-primary uppercase"
              >
                <span className="material-symbols-outlined text-[18px]">tune</span>
                Filter Catalogue ({products.length})
              </button>

              <div className="font-label-sm text-label-sm text-on-surface-variant hidden sm:block">
                Showing <strong className="text-primary">{products.length}</strong> masterwork items
              </div>

              <SortDropdown />
            </div>

            {/* Active Filter Badges */}
            {hasActiveFilters && (
              <div className="flex flex-wrap items-center gap-space-xs font-label-sm text-[12px]">
                <span className="text-on-surface-variant font-semibold">Active Filters:</span>
                {selectedCategory !== 'All' && (
                  <span className="bg-secondary-container text-on-secondary-container px-space-xs py-space-2xs uppercase tracking-wider font-semibold">
                    Category: {selectedCategory}
                  </span>
                )}
                {selectedFabric !== 'All' && (
                  <span className="bg-secondary-container text-on-secondary-container px-space-xs py-space-2xs uppercase tracking-wider font-semibold">
                    Fabric: {selectedFabric}
                  </span>
                )}
                {selectedOccasion !== 'All' && (
                  <span className="bg-secondary-container text-on-secondary-container px-space-xs py-space-2xs uppercase tracking-wider font-semibold">
                    Occasion: {selectedOccasion}
                  </span>
                )}
                <button
                  onClick={resetFilters}
                  className="text-error underline hover:text-primary transition-colors ml-space-xs"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Product Grid */}
            {products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-space-md lg:gap-space-lg">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-space-4xl text-center bg-surface-container-low border border-outline-variant p-space-2xl">
                <span className="material-symbols-outlined text-[56px] text-outline mb-space-2xs">
                  filter_alt_off
                </span>
                <h3 className="font-headline-sm text-headline-sm text-primary">No drapes match your criteria</h3>
                <p className="font-body-sm text-body-sm text-on-surface-variant mt-space-2xs">
                  Try adjusting your price range or clearing fabric filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-space-lg bg-primary text-surface font-label-caps text-label-caps uppercase px-space-xl py-space-md hover:bg-primary-container transition-colors"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filter Drawer Modal */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-[100] bg-primary/60 backdrop-blur-sm flex justify-end">
          <div className="bg-surface w-full max-w-xs h-full overflow-y-auto border-l border-outline-variant shadow-2xl">
            <div className="p-space-md bg-surface-container-low border-b border-outline-variant flex justify-between items-center">
              <span className="font-headline-sm text-headline-sm text-primary">Refine Selection</span>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-space-2xs text-on-surface-variant hover:text-primary"
              >
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>
            <FilterSidebar isMobile onClose={() => setIsMobileFilterOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
}
