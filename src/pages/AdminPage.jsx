import React, { useState } from 'react';
import { useProducts } from '../context/ProductContext';
import { useOrders } from '../context/OrderContext';

export default function AdminPage() {
  const { allProducts, addAdminProduct, deleteAdminProduct } = useProducts();
  const { orders } = useOrders();

  const [adminTab, setAdminTab] = useState('products');
  const [showAddModal, setShowAddModal] = useState(false);

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: 'Sarees',
    subcategory: 'Silk Sarees',
    price: 12000,
    mrp: 15000,
    fabric: '100% Pure Mulberry Silk',
    stock: 10,
    thumbnail: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAN6nAbczKpcLGF87Z6zw5aDQdGeGndCCYcs8JPABq3H4DtWKqbfGJ8QDTnw8m3m4HyjejZ_nuY8KYixl_lxMPTpSPCQ9hn3MmgfqxAD4Ku-sTIz1UPY1ZKM388hDOdll6DZvcMsJzgW5g1NDZ9bAemhu__5oMm7crJTpR5i5fDYwSW186pY3A1EXaSOQAklUN4mNz2OvEy4oFtTDmpClyv7enKLazqL4B44Mbd0XcGrg_GNG9PJVzGNA',
    description: 'Bespoke handloom creation.'
  });

  const handleAddSubmit = (e) => {
    e.preventDefault();
    const id = `vanya-adm-${Date.now()}`;
    const slug = newProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    addAdminProduct({
      ...newProduct,
      id,
      slug,
      discount: Math.round(((newProduct.mrp - newProduct.price) / newProduct.mrp) * 100),
      images: [newProduct.thumbnail],
      rating: 5.0,
      reviewCount: 1,
      sku: `VANYA-ADM-${Math.floor(100 + Math.random() * 900)}`
    });
    setShowAddModal(false);
  };

  return (
    <div className="w-full bg-background min-h-screen pb-space-4xl pt-space-xl">
      <div className="max-w-[1440px] mx-auto px-gutter-mobile lg:px-gutter-desktop space-y-space-2xl">
        {/* Admin Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-space-md border-b border-outline-variant pb-space-md">
          <div>
            <span className="font-label-caps text-label-caps text-secondary uppercase font-bold tracking-widest">
              Atelier Control Center
            </span>
            <h1 className="font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-primary">
              VANYA Administration Dashboard
            </h1>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-primary text-surface font-label-caps text-label-caps uppercase px-space-xl py-space-md hover:bg-primary-container transition-colors shadow-md"
          >
            + Add New Couture Product
          </button>
        </div>

        {/* Tabs Header */}
        <div className="flex border-b border-outline-variant gap-space-xl">
          <button
            onClick={() => setAdminTab('products')}
            className={`font-label-caps text-label-caps uppercase tracking-wider pb-space-xs transition-colors ${
              adminTab === 'products' ? 'border-b-2 border-primary text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            Catalogue Inventory ({allProducts.length})
          </button>
          <button
            onClick={() => setAdminTab('orders')}
            className={`font-label-caps text-label-caps uppercase tracking-wider pb-space-xs transition-colors ${
              adminTab === 'orders' ? 'border-b-2 border-primary text-primary font-bold' : 'text-on-surface-variant'
            }`}
          >
            Customer Orders ({orders.length})
          </button>
        </div>

        {/* Products Tab */}
        {adminTab === 'products' && (
          <div className="bg-surface p-space-md border border-outline-variant overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant font-label-caps text-label-caps text-primary uppercase">
                  <th className="p-space-sm">Product</th>
                  <th className="p-space-sm">Category</th>
                  <th className="p-space-sm">Price</th>
                  <th className="p-space-sm">Stock</th>
                  <th className="p-space-sm">SKU</th>
                  <th className="p-space-sm text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40 font-body-sm text-body-sm">
                {allProducts.map((prod) => (
                  <tr key={prod.id} className="hover:bg-surface-container-low">
                    <td className="p-space-sm flex items-center gap-space-sm">
                      <img src={prod.thumbnail} alt={prod.name} className="w-10 h-12 object-cover bg-surface-container shrink-0" />
                      <div>
                        <p className="font-title-editorial text-primary font-bold line-clamp-1">{prod.name}</p>
                        <p className="font-label-sm text-[11px] text-outline">{prod.fabric}</p>
                      </div>
                    </td>
                    <td className="p-space-sm">{prod.category}</td>
                    <td className="p-space-sm font-bold text-primary">₹{prod.price.toLocaleString('en-IN')}</td>
                    <td className="p-space-sm">
                      <span className={`px-2 py-0.5 font-label-sm text-[11px] font-bold ${prod.stock < 10 ? 'bg-secondary-container text-on-secondary-container' : 'bg-surface-container text-primary'}`}>
                        {prod.stock} units
                      </span>
                    </td>
                    <td className="p-space-sm font-label-sm text-[11px] text-outline">{prod.sku}</td>
                    <td className="p-space-sm text-right">
                      <button
                        onClick={() => deleteAdminProduct(prod.id)}
                        className="text-error hover:underline font-label-sm text-[11px] uppercase font-bold"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Orders Tab */}
        {adminTab === 'orders' && (
          <div className="bg-surface p-space-md border border-outline-variant overflow-x-auto shadow-sm">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-outline-variant font-label-caps text-label-caps text-primary uppercase">
                  <th className="p-space-sm">Order ID</th>
                  <th className="p-space-sm">Customer</th>
                  <th className="p-space-sm">Date</th>
                  <th className="p-space-sm">Total</th>
                  <th className="p-space-sm">Payment</th>
                  <th className="p-space-sm">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/40 font-body-sm text-body-sm">
                {orders.map((ord) => (
                  <tr key={ord.id} className="hover:bg-surface-container-low">
                    <td className="p-space-sm font-bold text-primary">{ord.id}</td>
                    <td className="p-space-sm">
                      <p className="font-bold text-primary">{ord.shippingAddress.fullName}</p>
                      <p className="text-[11px] text-outline">{ord.shippingAddress.city}, {ord.shippingAddress.state}</p>
                    </td>
                    <td className="p-space-sm">{new Date(ord.date).toLocaleDateString('en-IN')}</td>
                    <td className="p-space-sm font-bold text-primary">₹{ord.total.toLocaleString('en-IN')}</td>
                    <td className="p-space-sm">{ord.paymentMethod}</td>
                    <td className="p-space-sm">
                      <span className="bg-secondary-container text-on-secondary-container px-space-xs py-space-2xs font-label-caps text-[11px] uppercase font-bold">
                        {ord.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add Product Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-[100] bg-primary/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-surface w-full max-w-xl p-space-xl border border-outline-variant shadow-2xl space-y-space-md max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center pb-space-xs border-b border-outline-variant">
              <h3 className="font-headline-sm text-headline-sm text-primary">Add New Couture Ensemble</h3>
              <button onClick={() => setShowAddModal(false)} className="text-on-surface-variant hover:text-primary">
                <span className="material-symbols-outlined text-[24px]">close</span>
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="space-y-space-sm font-body-sm">
              <div>
                <label className="font-label-sm text-label-sm text-primary font-bold block mb-1">Product Name *</label>
                <input
                  type="text"
                  required
                  value={newProduct.name}
                  onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
                  placeholder="e.g. Royal Purple Kanjivaram Brocade Saree"
                  className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant"
                />
              </div>

              <div className="grid grid-cols-2 gap-space-sm">
                <div>
                  <label className="font-label-sm text-label-sm text-primary font-bold block mb-1">Category</label>
                  <select
                    value={newProduct.category}
                    onChange={(e) => setNewProduct({ ...newProduct, category: e.target.value })}
                    className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant"
                  >
                    <option value="Sarees">Sarees</option>
                    <option value="Dresses">Dresses</option>
                  </select>
                </div>

                <div>
                  <label className="font-label-sm text-label-sm text-primary font-bold block mb-1">Price (₹ INR) *</label>
                  <input
                    type="number"
                    required
                    value={newProduct.price}
                    onChange={(e) => setNewProduct({ ...newProduct, price: Number(e.target.value) })}
                    className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-space-sm">
                <div>
                  <label className="font-label-sm text-label-sm text-primary font-bold block mb-1">MRP Price (₹ INR)</label>
                  <input
                    type="number"
                    value={newProduct.mrp}
                    onChange={(e) => setNewProduct({ ...newProduct, mrp: Number(e.target.value) })}
                    className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant"
                  />
                </div>
                <div>
                  <label className="font-label-sm text-label-sm text-primary font-bold block mb-1">Stock Units</label>
                  <input
                    type="number"
                    value={newProduct.stock}
                    onChange={(e) => setNewProduct({ ...newProduct, stock: Number(e.target.value) })}
                    className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant"
                  />
                </div>
              </div>

              <div>
                <label className="font-label-sm text-label-sm text-primary font-bold block mb-1">Fabric Details</label>
                <input
                  type="text"
                  value={newProduct.fabric}
                  onChange={(e) => setNewProduct({ ...newProduct, fabric: e.target.value })}
                  className="w-full px-space-sm py-space-xs bg-surface border border-outline-variant"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary-container text-surface font-label-caps text-label-caps uppercase py-space-md tracking-widest hover:bg-primary transition-colors mt-space-md"
              >
                Publish to Storefront
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
