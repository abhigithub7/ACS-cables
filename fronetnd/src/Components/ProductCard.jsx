import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const id = product._id || product.id

  return (
    <Link to={`/product/${id}`} className="block min-w-0 h-full">
      <div className="bg-[#ffffff0a] backdrop-blur-lg rounded-lg hover:scale-[102%] transition-transform duration-200 flex flex-col p-[3px] md:p-2 cursor-pointer border border-[#80808049] h-full">
        {/* Fixed height image container for equal image sizes across all products */}
        <div className="w-full h-30 sm:h-44 md:h-48 overflow-hidden rounded-sm bg-gray-100 flex items-center justify-center">
          <img
            src={product.images?.[0] || product.image || 'https://via.placeholder.com/500x350?text=No+Image'}
            alt={product.name}
            className="w-full h-full object-contain p-1"
            loading="lazy"
          />
        </div>
        <div className="p-1 md:p-3 flex-1 flex flex-col min-w-0">
          <h3 className="text-xs sm:text-sm md:text-base lg:text-lg font-semibold text-gray-800 mb-0.5 sm:mb-1 overflow-hidden text-ellipsis whitespace-nowrap">
            {product.name}
          </h3>
          <div className='text-xs flex sm:text-sm md:text-base lg:text-lg mt-auto'>
         <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:size-4 size-3 text-yellow-300">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:size-4 size-3 text-yellow-300">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>

<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:size-4 size-3 text-yellow-300">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:size-4 size-3 text-yellow-300">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="md:size-4 size-3 text-yellow-300">
  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clipRule="evenodd" />
</svg>  <span className='pl-1'>(51)</span>
          </div>
          
          <div className="flex items-center justify-between gap-0.5 sm:gap-1 mt-1 sm:mt-1.5">
            <span className="text-xs sm:text-sm md:text-base lg:text-lg font-bold text-green-900 whitespace-nowrap">₹{product.price} </span>
            <button className="bg-blue-100 hover:bg-purple-800 text-[9px] sm:text-xs text-blue-950 px-1 sm:px-2 md:px-3 py-0.5 sm:py-1 md:py-2 rounded-md transition-colors whitespace-nowrap shrink-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="md:size-6 size-4">
  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
</svg>


            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;