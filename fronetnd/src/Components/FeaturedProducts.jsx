import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../api';

const FeaturedProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetchProducts();
        if (response.success && Array.isArray(response.products)) {
          const featuredOnly = response.products.filter((product) => product.featured);
          setProducts(featuredOnly);
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

  if (loading) return <section className="container mx-auto px-4 py-10 text-center">Loading products...</section>;
  if (error) return <section className="container mx-auto px-4 py-10 text-center text-red-600">Error: {error}</section>;

  return (
    <section className="container mx-auto px-4 py-10">
      <div className="flex flex-col gap-3 mb-8 text-center">
        <p className="text-sm uppercase tracking-[0.3em] text-purple-900 font-bold">Featured Collection</p>
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Only the best products</h2>
        <p className="max-w-2xl mx-auto text-gray-600">Explore our handpicked featured items, selected for quality, value, and customer satisfaction.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
