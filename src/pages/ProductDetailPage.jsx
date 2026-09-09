import React, { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useProducts } from '../context/ProductContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import PinCodeChecker from '../components/common/PinCodeChecker';
import ProductCard from '../components/common/ProductCard';

export default function ProductDetailPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { getProductBySlug, allProducts } = useProducts();
  const { addToCart } = useCart();
  const { wishlist, toggleWishlist } = useWishlist();

  const product = getProductBySlug(slug) || allProducts[0];
  const isWishlisted = wishlist.includes(product.id);

  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || 'Default');
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0] || null);
  const [blouseOption, setBlouseOption] = useState('Unstitched (Included)');
  const [customBust, setCustomBust] = useState('36');
  const [customWaist, setCustomWaist] = useState('30');
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('specs');

  const handleAddToCart = () => {
    const finalBlouse = product.category === 'Sarees' ? blouseOption : null;
    addToCart(product, {
      color: selectedColor,
      size: selectedSize,
      blouseOption: finalBlouse,
      quantity
    });
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && p.category === product.category)
    .slice(0, 4);

  return (
    <div className="w-full bg-background min-h-screen pb-space-4xl pt-space-xl">
      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center gap-space-2xs font-label-sm text-[12px] text-on-surface-variant mb-space-lg">
          <Link to="/" className="hover:text-primary">Home</Link>
          <span>/</span>
          <Link to={`/collections/${product.category.toLowerCase()}`} className="hover:text-primary">{product.category}</Link>
          <span>/</span>
          <span className="text-primary font-semibold truncate max-w-xs">{product.name}</span>
        </div>

        {/* Top Product Detail Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-2xl">
          {/* Left Column: Image Gallery Viewport (3:4 ratio) */}
          <div className="lg:col-span-7 flex flex-col sm:flex-row gap-space-md">
            {/* Thumbnail Selection List */}
            <div className="flex sm:flex-col gap-space-xs overflow-x-auto sm:overflow-y-auto shrink-0 order-2 sm:order-1">
              {product.images?.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  className={`w-16 h-20 border-2 overflow-hidden bg-surface-container transition-all ${
                    selectedImage === idx ? 'border-primary shadow-md' : 'border-transparent opacity-70 hover:opacity-100'
                  }`}
                >
                  <img src={img} alt={`${product.name} preview ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>

            {/* Main Stage Viewport */}
            <div className="flex-1 aspect-[3/4] bg-surface-container relative overflow-hidden shadow-lg border border-outline-variant/40 order-1 sm:order-2">
              <img
                src={product.images?.[selectedImage] || product.thumbnail}
                alt={product.name}
                className="w-full h-full object-cover"
              />
              <span className="absolute top-4 left-4 bg-secondary-container text-on-secondary-container px-space-xs py-space-2xs font-label-caps text-[10px] uppercase font-semibold">
                {product.tags?.[0] || 'Royal Atelier'}
              </span>
            </div>
          </div>

          {/* Right Column: Product Meta & Transaction Panel */}
          <div className="lg:col-span-5 flex flex-col space-y-space-md">
            {/* Title & Ratings */}
            <div>
              <div className="flex items-center gap-space-xs mb-space-2xs">
                <div className="flex text-secondary text-[16px]">
                  <span className="material-symbols-outlined filled text-[18px]">star</span>
                </div>
                <span className="font-label-sm text-label-sm text-primary font-semibold">
                  {product.rating} ★ ({product.reviewCount} Patron Reviews)
                </span>
              </div>
              <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-md text-primary font-normal leading-tight">
                {product.name}
              </h1>
              <p className="font-body-md text-body-md text-on-surface-variant mt-1">
                {product.fabric} • SKU: {product.sku}
              </p>
            </div>

            {/* Price Box */}
            <div className="p-space-md bg-surface-container-low border border-outline-variant flex items-baseline gap-space-md">
              <span className="font-headline-lg text-display-hero-mobile text-primary font-bold">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.mrp && product.mrp > product.price && (
                <>
                  <span className="font-body-lg text-body-lg text-outline line-through">
                    ₹{product.mrp.toLocaleString('en-IN')}
                  </span>
                  <span className="bg-secondary-container text-on-secondary-container px-space-xs py-space-2xs font-label-caps text-[11px] uppercase font-bold">
                    Save {product.discount}%
                  </span>
                </>
              )}
            </div>

            {/* Color Swatch Selection */}
            {product.colors && product.colors.length > 0 && (
              <div className="space-y-space-xs">
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary font-semibold block">
                  Select Shade: <strong className="text-secondary">{selectedColor}</strong>
                </span>
                <div className="flex items-center gap-space-sm">
                  {product.colors.map((col) => (
                    <button
                      key={col.name}
                      onClick={() => setSelectedColor(col.name)}
                      className={`flex items-center gap-space-2xs px-space-xs py-space-2xs border transition-all ${
                        selectedColor === col.name
                          ? 'border-primary bg-secondary-container/40 font-bold'
                          : 'border-outline-variant bg-surface hover:border-primary'
                      }`}
                    >
                      <span className="w-4 h-4 rounded-full shadow-inner" style={{ backgroundColor: col.hex }} />
                      <span className="font-label-sm text-[12px] text-primary">{col.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Size Selector for Dresses */}
            {product.sizes && product.sizes.length > 0 && (
              <div className="space-y-space-xs">
                <div className="flex justify-between items-center font-label-caps text-label-caps uppercase text-primary font-semibold">
                  <span>Select Dress Size: <strong>{selectedSize}</strong></span>
                  <a href="#size-chart" className="text-secondary underline text-[11px]">Size Chart</a>
                </div>
                <div className="flex flex-wrap gap-space-xs">
                  {product.sizes.map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setSelectedSize(sz)}
                      className={`min-w-[48px] h-10 px-space-xs border font-label-sm text-label-sm uppercase transition-all ${
                        selectedSize === sz
                          ? 'border-primary bg-primary text-surface font-bold'
                          : 'border-outline-variant bg-surface hover:border-primary text-primary'
                      }`}
                    >
                      {sz}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Saree Blouse Customization Option */}
            {product.category === 'Sarees' && (
              <div className="space-y-space-xs bg-surface-container-low p-space-md border border-outline-variant">
                <span className="font-label-caps text-label-caps uppercase tracking-wider text-primary font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[18px] text-secondary">design_services</span>
                  Blouse Customization Atelier
                </span>
                <div className="space-y-space-xs">
                  <label className="flex items-center gap-space-xs cursor-pointer p-space-xs bg-surface border border-outline-variant/60">
                    <input
                      type="radio"
                      name="blouse"
                      checked={blouseOption === 'Unstitched (Included)'}
                      onChange={() => setBlouseOption('Unstitched (Included)')}
                      className="accent-primary"
                    />
                    <span className="font-body-sm text-body-sm text-primary font-medium">
                      Unstitched Blouse Piece (Included in price)
                    </span>
                  </label>

                  <label className="flex items-center gap-space-xs cursor-pointer p-space-xs bg-surface border border-outline-variant/60">
                    <input
                      type="radio"
                      name="blouse"
                      checked={blouseOption === 'Custom Tailored Blouse (+₹2,500)'}
                      onChange={() => setBlouseOption('Custom Tailored Blouse (+₹2,500)')}
                      className="accent-primary"
                    />
                    <span className="font-body-sm text-body-sm text-primary font-medium">
                      Custom Tailored Blouse (+₹2,500 by Master Tailors)
                    </span>
                  </label>
                </div>

                {blouseOption.includes('Custom Tailored') && (
                  <div className="grid grid-cols-2 gap-space-xs pt-space-2xs">
                    <div>
                      <label className="font-label-sm text-[11px] text-on-surface-variant block">Bust Size (Inches)</label>
                      <input
                        type="number"
                        value={customBust}
                        onChange={(e) => setCustomBust(e.target.value)}
                        className="w-full px-space-xs py-space-2xs bg-surface border border-outline-variant font-label-sm text-label-sm"
                      />
                    </div>
                    <div>
                      <label className="font-label-sm text-[11px] text-on-surface-variant block">Waist Size (Inches)</label>
                      <input
                        type="number"
                        value={customWaist}
                        onChange={(e) => setCustomWaist(e.target.value)}
                        className="w-full px-space-xs py-space-2xs bg-surface border border-outline-variant font-label-sm text-label-sm"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity Selector & Action Buttons */}
            <div className="space-y-space-sm pt-space-xs">
              <div className="flex items-center gap-space-md">
                <span className="font-label-caps text-label-caps uppercase text-primary font-semibold">Quantity:</span>
                <div className="flex items-center border border-outline-variant bg-surface">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-9 h-9 flex items-center justify-center text-primary font-bold hover:bg-surface-container"
                  >
                    -
                  </button>
                  <span className="w-10 text-center font-label-sm text-label-sm text-primary font-bold">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-9 h-9 flex items-center justify-center text-primary font-bold hover:bg-surface-container"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart & Buy Now Buttons */}
              <div className="flex flex-col sm:flex-row gap-space-sm">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-primary-container text-surface font-label-caps text-label-caps uppercase py-space-md tracking-widest hover:bg-primary transition-colors flex items-center justify-center gap-space-xs shadow-md"
                >
                  <span className="material-symbols-outlined text-[18px]">shopping_bag</span> Add to Shopping Bag
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-secondary text-on-secondary font-label-caps text-label-caps uppercase py-space-md tracking-widest hover:bg-secondary-fixed hover:text-on-secondary-fixed transition-colors flex items-center justify-center gap-space-xs shadow-md"
                >
                  Buy Now
                </button>
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`w-12 h-12 border flex items-center justify-center transition-colors ${
                    isWishlisted ? 'border-error text-error bg-error-container/20' : 'border-outline-variant text-primary hover:border-primary'
                  }`}
                  aria-label="Wishlist"
                >
                  <span className={`material-symbols-outlined text-[22px] ${isWishlisted ? 'filled' : ''}`}>
                    favorite
                  </span>
                </button>
              </div>
            </div>

            {/* PIN Code Delivery Checker */}
            <PinCodeChecker />
          </div>
        </div>

        {/* Detailed Product Specs & Accordion Tabs */}
        <div className="mt-space-4xl border-t border-outline-variant pt-space-2xl">
          <div className="flex border-b border-outline-variant gap-space-lg mb-space-lg">
            <button
              onClick={() => setActiveTab('specs')}
              className={`font-label-caps text-label-caps uppercase tracking-wider pb-space-xs transition-colors ${
                activeTab === 'specs' ? 'border-b-2 border-primary text-primary font-bold' : 'text-on-surface-variant'
              }`}
            >
              Weave & Specifications
            </button>
            <button
              onClick={() => setActiveTab('care')}
              className={`font-label-caps text-label-caps uppercase tracking-wider pb-space-xs transition-colors ${
                activeTab === 'care' ? 'border-b-2 border-primary text-primary font-bold' : 'text-on-surface-variant'
              }`}
            >
              Care & Authenticity Guarantee
            </button>
            <button
              onClick={() => setActiveTab('reviews')}
              className={`font-label-caps text-label-caps uppercase tracking-wider pb-space-xs transition-colors ${
                activeTab === 'reviews' ? 'border-b-2 border-primary text-primary font-bold' : 'text-on-surface-variant'
              }`}
            >
              Patron Reviews ({product.reviewCount})
            </button>
          </div>

          <div className="bg-surface-container-low p-space-xl border border-outline-variant max-w-4xl">
            {activeTab === 'specs' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-space-lg font-body-sm text-body-sm text-on-surface-variant">
                <div>
                  <h4 className="font-label-caps text-label-caps text-primary uppercase font-bold mb-space-xs">
                    Product Description
                  </h4>
                  <p className="leading-relaxed mb-space-md">{product.description}</p>
                  <p><strong>Fabric:</strong> {product.fabric}</p>
                  <p><strong>Occasion:</strong> {product.occasion}</p>
                </div>
                <div>
                  <h4 className="font-label-caps text-label-caps text-primary uppercase font-bold mb-space-xs">
                    Dimension Details
                  </h4>
                  {product.category === 'Sarees' ? (
                    <>
                      <p><strong>Saree Length:</strong> {product.sareeLength}</p>
                      <p><strong>Blouse Piece:</strong> {product.blouseLength}</p>
                      <p><strong>Handloom Weave:</strong> {product.weave}</p>
                      <p><strong>Embellishment Work:</strong> {product.work}</p>
                    </>
                  ) : (
                    <>
                      <p><strong>Silhouette Fit:</strong> {product.fit}</p>
                      <p><strong>Dress Length:</strong> {product.dressLength}</p>
                      <p><strong>Sleeve Style:</strong> {product.sleeve}</p>
                      <p><strong>Neckline:</strong> {product.neck}</p>
                    </>
                  )}
                </div>
              </div>
            )}

            {activeTab === 'care' && (
              <div className="space-y-space-md font-body-sm text-body-sm text-on-surface-variant">
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[24px]">dry_cleaning</span>
                  <div>
                    <h5 className="font-label-caps text-label-caps text-primary uppercase font-bold">Dry Clean Only</h5>
                    <p>To preserve natural silk luster and gold zari brocade, store in soft breathable unbleached muslin bags.</p>
                  </div>
                </div>
                <div className="flex items-start gap-space-sm">
                  <span className="material-symbols-outlined text-secondary text-[24px]">workspace_premium</span>
                  <div>
                    <h5 className="font-label-caps text-label-caps text-primary uppercase font-bold">Silk Mark Certification</h5>
                    <p>Includes physical Silk Mark barcode tag issued by the Ministry of Textiles, Govt. of India.</p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <div className="space-y-space-md">
                <div className="p-space-md bg-surface border border-outline-variant/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-title-editorial text-body-md text-primary font-bold">Ananya R., Bengaluru</span>
                    <span className="text-secondary font-bold text-sm">★★★★★</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    "The Kadwa weave on this saree is breathtaking! Draped it for my sister's wedding reception in Mysore. Received endless compliments!"
                  </p>
                </div>
                <div className="p-space-md bg-surface border border-outline-variant/60">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-title-editorial text-body-md text-primary font-bold">Meera K., New Delhi</span>
                    <span className="text-secondary font-bold text-sm">★★★★★</span>
                  </div>
                  <p className="font-body-sm text-body-sm text-on-surface-variant">
                    "Exceptional packaging, authentic zari sheen, and delivered via express within 2 days!"
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Product Recommendations */}
        {relatedProducts.length > 0 && (
          <div className="mt-space-4xl">
            <h2 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary mb-space-2xl">
              Pairs Well With
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
              {relatedProducts.map((rel) => (
                <ProductCard key={rel.id} product={rel} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
