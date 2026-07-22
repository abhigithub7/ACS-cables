const CategoryCard = ({ item }) => {
  return (
    <div className="group cursor-pointer">

      <div className="flex flex-col items-center">

        <div className="md:w-32 md:h-32 w-10 h-10 rounded-full bg-white shadow-sm border border-gray-100 flex items-center justify-center transition duration-300  group-hover:scale-105">

          <img
            src={item.image}
            alt={item.name}
            className="md:w-20  md:h-20 w-12 h-12 object-contain"
          />

        </div>

        <p className=" text-center text-[7px] md:text-sm font-semibold text-gray-700 group-hover:text-blue-700">
          {item.name}
        </p>

      </div>

    </div>
  );
};

export default CategoryCard;