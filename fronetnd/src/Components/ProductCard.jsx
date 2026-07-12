import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
  const id = product._id || product.id
  const { addToCart } = useCart();
  const navigate = useNavigate();

  const handleBuyNow = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <>
    <Link to={`/product/${id}`}>
      <div className="bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[102%] transition-transform duration-200 flex flex-col p-[3px] md:p-2 cursor-pointer border border-[#80808049] h-full">
        <div className="w-full aspect-[4/3] overflow-hidden rounded-sm">
          <img
            src={product.images?.[0] || product.image || 'https://via.placeholder.com/500x350?text=No+Image'}
            alt={product.name}
      className="w-full h-full object-cover"
          />
        </div>
        <div className="p-1 md:p-3 flex-1 flex flex-col">
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-0.5 sm:mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {product.name}
          </h3>
          <p className="text-gray-600 text-[10px] sm:text-xs lg:text-sm mb-1 sm:mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {product.description}
          </p>
          <div className='text-xs sm:text-sm md:text-base lg:text-lg mt-auto'>
            ★★★⯪☆
          </div>
          
          <div className="flex items-center justify-between gap-0.5 sm:gap-1 mt-1 sm:mt-1.5">
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-green-900">₹{product.price}</span>
            <button className="bg-purple-900 hover:bg-purple-800 text-[9px] sm:text-xs text-white px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-2 rounded-md transition-colors whitespace-nowrap">
              View Details
            </button>
          </div>
        </div>
      </div>
    </Link>
    </>
  );
};

export default ProductCard;