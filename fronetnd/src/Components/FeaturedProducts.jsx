import { useEffect, useState } from 'react';
import ProductCard from './ProductCard';
import { fetchProducts } from '../api';
import CategorySection from './Categorysilder';

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
    <section className="container mx-auto px-4 py-1">
    
        <CategorySection/>
    
      <div className="flex flex-col md:gap-3 gap-1  mb-2 text-center">
        <div className="flex items-center justify-center ">
  <span className="w-10 sm:w-16 h-[2px] bg-yellow-300"></span>

  <h2 className="mx-1 lg:mx-4 text-sm md:text-xl font-bold text-slate-800">
    Featured Products
  </h2>

  <span className="w-10 sm:w-16 h-[2px] bg-yellow-300"></span>
</div>
      </div>

      <div className="grid grid-cols-2 mt-8 md:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-6">
        {products.map((product) => (
          <ProductCard key={product._id || product.id} product={product} />
        ))}
      </div>
    </section>
  );
};

export default FeaturedProducts;
