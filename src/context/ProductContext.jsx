import React, { createContext, useContext, useState, useMemo } from 'react';
import { PRODUCTS, CATEGORIES, FABRICS, OCCASIONS } from '../data/products';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(PRODUCTS);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedFabric, setSelectedFabric] = useState('All');
  const [selectedOccasion, setSelectedOccasion] = useState('All');
  const [priceRange, setPriceRange] = useState(30000);
  const [sortBy, setSortBy] = useState('recommended');

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      // Search match
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesName = product.name.toLowerCase().includes(query);
        const matchesCategory = product.category.toLowerCase().includes(query);
        const matchesFabric = product.fabric.toLowerCase().includes(query);
        const matchesTags = product.tags?.some((t) => t.toLowerCase().includes(query));
        if (!matchesName && !matchesCategory && !matchesFabric && !matchesTags) {
          return false;
        }
      }

      // Category match
      if (selectedCategory !== 'All') {
        const catSlug = selectedCategory.toLowerCase();
        if (catSlug === 'sarees' && product.category !== 'Sarees') return false;
        if (catSlug === 'dresses' && product.category !== 'Dresses') return false;
        if (catSlug === 'silk-sarees' && product.subcategory !== 'Silk Sarees') return false;
        if (catSlug === 'cotton-sarees' && product.subcategory !== 'Cotton Sarees') return false;
        if (catSlug === 'banarasi-weaves' && product.subcategory !== 'Banarasi Sarees') return false;
        if (catSlug === 'party-wear-dresses' && product.subcategory !== 'Party Wear') return false;
        if (catSlug === 'designer-sarees' && product.subcategory !== 'Designer Sarees') return false;
        if (catSlug === 'ethnic-anarkalis' && product.subcategory !== 'Ethnic Dresses') return false;
        if (catSlug === 'casual-kaftans' && product.subcategory !== 'Casual Wear') return false;
        if (catSlug === 'new-arrivals' && !product.isNew) return false;
      }

      // Fabric match
      if (selectedFabric !== 'All' && product.fabric !== selectedFabric) {
        return false;
      }

      // Occasion match
      if (selectedOccasion !== 'All' && !product.occasion.toLowerCase().includes(selectedOccasion.toLowerCase())) {
        return false;
      }

      // Price match
      if (product.price > priceRange) {
        return false;
      }

      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-low') return a.price - b.price;
      if (sortBy === 'price-high') return b.price - a.price;
      if (sortBy === 'newest') return b.isNew ? 1 : -1;
      if (sortBy === 'rating') return b.rating - a.rating;
      if (sortBy === 'discount') return b.discount - a.discount;
      return 0; // recommended default
    });
  }, [products, searchQuery, selectedCategory, selectedFabric, selectedOccasion, priceRange, sortBy]);

  const resetFilters = () => {
    setSelectedCategory('All');
    setSelectedFabric('All');
    setSelectedOccasion('All');
    setPriceRange(30000);
    setSortBy('recommended');
    setSearchQuery('');
  };

  const getProductBySlug = (slug) => products.find((p) => p.slug === slug || p.id === slug);

  const addAdminProduct = (newProduct) => {
    setProducts((prev) => [newProduct, ...prev]);
  };

  const deleteAdminProduct = (id) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
  };

  return (
    <ProductContext.Provider value={{
      products: filteredProducts,
      allProducts: products,
      categories: CATEGORIES,
      fabrics: FABRICS,
      occasions: OCCASIONS,
      searchQuery,
      setSearchQuery,
      selectedCategory,
      setSelectedCategory,
      selectedFabric,
      setSelectedFabric,
      selectedOccasion,
      setSelectedOccasion,
      priceRange,
      setPriceRange,
      sortBy,
      setSortBy,
      resetFilters,
      getProductBySlug,
      addAdminProduct,
      deleteAdminProduct
    }}>
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
