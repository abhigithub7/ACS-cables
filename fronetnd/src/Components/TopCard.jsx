import deliveryBox from "../assets/delivery-box.png";
import shield from "../assets/products-quality.png";

const TopCards = () => {
  return (
    <section className="max-w-8xl mx-auto px-4 sm:px-6 py-2">

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">

        {/* Delivery Card */}

        <div className="rounded-lg border border-yellow-100 bg-gradient-to-r from-yellow-30 to-amber-10 shadow-md hover:shadow-xl transition-all duration-300">

          <div className="flex items-center justify-between p-4 sm:p-6">

            <div className="flex items-center gap-3 sm:gap-5 min-w-0">

              <img
                src={deliveryBox}
                alt="Delivery"
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain shrink-0"
              />

              <div className="min-w-0">

                <p className="text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-gray-500">
                  PAN INDIA
                </p>

                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 mt-1 leading-tight">
                  Fast & Safe Delivery
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Your Orders, Our Responsibility
                </p>

              </div>

            </div>

            <button className="flex h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 items-center justify-center rounded-full bg-yellow-400 text-white transition hover:scale-110 hover:bg-yellow-500 shrink-0">

              ➜

            </button>

          </div>

        </div>

        {/* Genuine Products Card */}

        <div className="rounded-lg border border-blue-100 bg-gradient-to-r from-blue-30 to-cyan-30 shadow-md hover:shadow-xl transition-all duration-300">

          <div className="flex items-center justify-between p-4 sm:p-6">

            <div className="flex items-center gap-3 sm:gap-5 min-w-0">

              <img
                src={shield}
                alt="Shield"
                className="w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 object-contain shrink-0"
              />

              <div className="min-w-0">

                <h2 className="text-lg sm:text-xl md:text-2xl font-bold text-gray-900 leading-tight">
                  100% Genuine Products
                </h2>

                <p className="text-xs sm:text-sm text-gray-600 mt-1">
                  Quality You Can Trust
                </p>

              </div>

            </div>

           
          </div>

        </div>

      </div>

    </section>
  );
};

export default TopCards;