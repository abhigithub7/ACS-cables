import { useMemo, useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import { products as staticProducts } from '../data/products';
import { fetchProducts } from '../api';

const ProductList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(0);
  const [products, setProducts] = useState(staticProducts);

  const categories = useMemo(() => {
    const availableCategories = Array.from(new Set(products.map((product) => product.category || 'General')))
    return ['All', ...availableCategories]
  }, [products])

  const highestPrice = useMemo(() => {
    const maxPriceValue = products.length ? Math.ceil(Math.max(...products.map((product) => product.price || 0))) : 0
    return maxPriceValue
  }, [products])

  useEffect(() => {
    setMaxPrice(highestPrice)
  }, [highestPrice])

  useEffect(() => {
    let mounted = true
    fetchProducts().then((res) => {
      if (mounted && res && res.success && Array.isArray(res.products)) {
        setProducts(res.products)
      }
    }).catch(() => {
      setProducts(staticProducts)
    })
    return () => { mounted = false }
  }, [])

  const filteredProducts = useMemo(() => {
    return products.filter((product) => {
      const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
      const search = searchTerm.toLowerCase();
      const matchesSearch = (product.name?.toLowerCase().includes(search) || product.description?.toLowerCase().includes(search));
      const matchesPrice = product.price <= maxPrice;
      return matchesCategory && matchesSearch && matchesPrice;
    });
  }, [searchTerm, selectedCategory, maxPrice, products]);

  return (
    <div className="container mx-auto px-4 py-10">

      <div className="grid gap-4 lg:grid-cols-[1fr_auto_auto] items-end mb-8">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Search products</label>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name or description"
            className="w-full rounded-xl border border-gray-300 px-4 py-3 focus:border-purple-900 focus:ring-purple-200 focus:outline-none focus:ring-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="w-full rounded-xl border border-gray-300 bg-white px-4 py-3 text-gray-900 focus:border-purple-900 focus:ring-purple-200 focus:outline-none focus:ring-2"
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Max price</label>
          <div className="rounded-xl border border-gray-300 bg-white px-4 py-3">
            <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
              <span>{selectedCategory === 'All' ? 'Any category' : selectedCategory}</span>
              <span className="font-semibold">₹{maxPrice}</span>
            </div>
            <input
              type="range"
              min="0"
              max={highestPrice}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-purple-900"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-6">
        <p className="text-sm text-gray-600">
          Showing <span className="font-semibold text-gray-900">{filteredProducts.length}</span> of{' '}
          <span className="font-semibold text-gray-900">{products.length}</span> products
        </p>
        <button
          type="button"
          onClick={() => {
            setSearchTerm('');
            setSelectedCategory('All');
            setMaxPrice(highestPrice);
          }}
          className="inline-flex items-center justify-center rounded-xl bg-purple-900 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-800"
        >
          Reset filters
        </button>
      </div>

      {filteredProducts.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products found</h3>
          <p className="text-gray-600">Try adjusting your search term, category, or price range.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
          {filteredProducts.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList;
