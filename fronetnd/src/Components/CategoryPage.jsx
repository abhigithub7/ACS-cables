import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { fetchProducts } from '../api';

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        if (response.success && Array.isArray(response.products)) {
          setProducts(response.products);
        } else {
          setError('Failed to load products');
        }
      } catch (err) {
        setError(err.message || 'Error fetching products');
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, []);

  const categories = useMemo(() => {
    const grouped = products.reduce((result, product) => {
      const category = product.category || 'Other';
      if (!result[category]) {
        result[category] = [];
      }
      result[category].push(product);
      return result;
    }, {});

    return Object.entries(grouped).map(([name, items]) => ({
      name,
      count: items.length,
      products: items,
    }));
  }, [products]);

  const selectedCategory =
    activeCategory === 'All'
      ? products
      : categories.find((category) => category.name === activeCategory)?.products || [];

  if (loading) return <main className="container mx-auto px-4 py-10 text-center">Loading categories...</main>;
  if (error) return <main className="container mx-auto px-4 py-10 text-center text-red-600">Error: {error}</main>;

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="mb-10 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-900 font-bold mb-2">Category Center</p>
        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">Browse by category</h1>
        <p className="max-w-2xl mx-auto text-gray-600 mt-3">
          Explore our catalog by category and find the products that fit your setup.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 mb-10">
        <button
          type="button"
          onClick={() => setActiveCategory('All')}
          className={`rounded-3xl border px-5 py-4 text-left transition ${
            activeCategory === 'All'
              ? 'border-purple-900 bg-purple-900 text-white'
              : 'border-gray-200 bg-white text-gray-900 hover:border-purple-900 hover:bg-purple-50'
          }`}
        >
          <p className="text-lg font-semibold">All Categories</p>
          <p className="text-sm text-gray-500">{products.length} products</p>
        </button>

        {categories.map((category) => (
          <button
            key={category.name}
            type="button"
            onClick={() => setActiveCategory(category.name)}
            className={`rounded-3xl border px-5 py-4 text-left transition ${
              activeCategory === category.name
                ? 'border-purple-900 bg-purple-900 text-white'
                : 'border-gray-200 bg-white text-gray-900 hover:border-purple-900 hover:bg-purple-50'
            }`}
          >
            <p className="text-lg font-semibold">{category.name}</p>
            <p className="text-sm text-gray-500">{category.count} products</p>
          </button>
        ))}
      </div>

      <div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-end gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {activeCategory === 'All' ? 'All products' : `${activeCategory} products`}
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Showing {selectedCategory.length} product{selectedCategory.length !== 1 ? 's' : ''}.
          </p>
        </div>
        <Link
          to="/products"
          className="inline-flex items-center justify-center rounded-xl bg-purple-900 px-5 py-3 text-sm font-medium text-white transition hover:bg-purple-800"
        >
          View full store
        </Link>
      </div>

      {selectedCategory.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-gray-300 bg-gray-50 p-10 text-center">
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No products in this category</h3>
          <p className="text-gray-600">Select a different category or view the full product list.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {selectedCategory.map((product) => (
            <ProductCard key={product._id || product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
};

export default CategoryPage;
