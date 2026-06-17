import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const id = product._id || product.id
  return (
    <>
    <Link to={`/product/${id}`}>
      <div className=" md:h-[350px] h-[245px] bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[102%] transition-transform duration-200 flex flex-col p-[3px] md:p-2 cursor-pointer border border-[#80808049]">
        <img
          src={product.images?.[0] || product.image || 'https://via.placeholder.com/500x350?text=No+Image'}
          alt={product.name}
          className="w-full md:h-[55%] h-[39%] rounded-sm object-cover"
        />
        <div className="p-2 md:p-3">
          <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {product.name}
          </h3>
          <p className="text-gray-600 text-xs sm:text-lg mb-2 overflow-hidden text-ellipsis whitespace-nowrap">
            {product.description}
            <div className='md:text-xl text-md'>
            ★★★⯪☆
            </div>
          </p>
          
          <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1">
            <span className="text-lg sm:text-md font-bold text-green-900">₹{product.price}</span>
            <div className="flex flex-col sm:flex-row ">
              <button className="bg-purple-900 hover:bg-purple-800 text-xs text-white md:px-3 px-[2px] md:py-2 py-[3px] rounded-md transition-colors">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
    </>
  );
};

export default ProductCard;