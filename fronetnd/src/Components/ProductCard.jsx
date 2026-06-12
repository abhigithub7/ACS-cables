import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const id = product._id || product.id
  return (
    <Link to={`/product/${id}`}>
      <div className="h-[350px] bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[102%] transition-transform duration-200 flex flex-col p-2 cursor-pointer border border-[#80808049]">
        <img
          src={product.imageUrl || product.image || 'https://via.placeholder.com/500x350?text=No+Image'}
          alt={product.name}
          className="w-full h-[55%] rounded-sm object-cover"
        />
        <div className="p-3 sm:p-4">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {product.name}
          </h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-9 overflow-hidden text-ellipsis whitespace-nowrap">
            {product.description}
          </p>
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
            <span className="text-lg sm:text-lg font-bold text-gray-900">₹{product.price}</span>
            <div className="flex flex-col sm:flex-row gap-2">
              <button className="bg-purple-900 hover:bg-purple-800 text-sm text-white px-3 py-2 rounded-lg transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;