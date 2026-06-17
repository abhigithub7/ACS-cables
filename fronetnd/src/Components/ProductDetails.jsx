import { useParams, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { products as staticProducts } from '../data/products';
import { fetchProductById } from '../api';
import { useEffect, useState } from 'react';

const ProductDetails = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(() => staticProducts.find((p) => String(p.id) === String(id) || String(p._id) === String(id)));
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    // try fetch from API
    fetchProductById(id).then((res) => {
      if (res && res.success && res.product) {
        setProduct(res.product);
        setSelectedImage(0);
      }
    }).catch(() => {})
  }, [id])

  const handleAddToCart = () => {
    addToCart(product);
    alert(`${product.name} added to cart!`);
  };

  if (!product) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-16">
        <div className="max-w-md text-center bg-white rounded-xl shadow-md p-8">
          <h2 className="text-2xl font-bold mb-4">Product not found</h2>
          <p className="text-gray-600 mb-6">The product you are looking for does not exist or has been removed.</p>
          <Link to="/" className="inline-block bg-purple-900 hover:bg-purple-800 text-white px-6 py-2 rounded-lg transition-colors">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const productId = product.id || product._id || ''
  const allImages = product.images && product.images.length > 0
    ? product.images
    : product.image
      ? [product.image]
      : ['https://via.placeholder.com/500x500?text=No+Image']

  return (
    <main className="container mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[450px]">
          <div className="h-[300px] md:h-[380px] border border-gray-300 rounded-md overflow-hidden mb-3">
            <img
              src={allImages[selectedImage]}
              alt={product.name}
              className="w-full h-full object-fill"
            />
          </div>
          {allImages.length > 1 && (
            <div className="flex gap-2 overflow-x-auto pb-2">
              {allImages.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded-md overflow-hidden transition-all ${
                    index === selectedImage
                      ? 'border-purple-900 opacity-100'
                      : 'border-gray-300 opacity-80 hover:opacity-80'
                  }`}
                >
                  <img
                    src={img}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="lg:w-1/2 bg-white rounded-xl  p-8">
          <div className="flex flex-col gap-4">
            <div>
              <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
              <p className="text-gray-600 text-lg">{product.description}</p>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-4xl font-bold text-purple-900">₹{product.price}</span>

              <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm">In Stock</span>
             
            </div>
             <div className='text-2xl'>★★★⯪☆</div>

            <p className="text-gray-700 leading-relaxed">{product.fullDescription}</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <button
                onClick={handleAddToCart}
                className="bg-purple-600 hover:bg-green-700 text-white rounded-lg px-6 py-3 font-medium transition-colors"
              >
                Add to Cart
              </button>
              <Link
                to="/products"
                className="text-center bg-gray-200 hover:bg-gray-300 text-gray-900 rounded-lg px-6 py-3 font-medium transition-colors"
              >
                Back to Products
              </Link>
            </div>

            <div className="border-t border-gray-200 pt-6">
              <h2 className="text-lg font-semibold mb-3">Product Details</h2>
              <ul className="space-y-2 text-gray-600">
                <li><span className="font-semibold text-gray-800">Category:</span> {product.category || 'Computer Accessories'}</li>
                <li><span className="font-semibold text-gray-800">Availability:</span> In Stock</li>
                <li><span className="font-semibold text-gray-800">Warranty:</span> 1 Year Manufacturer Warranty</li>
                <li><span className="font-semibold text-gray-800">SKU:</span> PROD-{String(productId).slice(-4).toUpperCase()}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};

export default ProductDetails;