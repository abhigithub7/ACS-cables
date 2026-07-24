import {
  RotateCcw,
  ShieldCheck,
  Headset,
  Star,
  Lock,
} from "lucide-react";

const features = [
  {
    icon: RotateCcw,
    title: "Easy Returns",
    subtitle: "Hassle Free Shopping",
  },
  {
    icon: Lock,
    title: "Secure Payments",
    subtitle: "100% Safe & Encrypted",
  },
  {
    icon: Headset,
    title: "24/7 Customer Support",
    subtitle: "We're Here To Help",
  },
  {
    icon: Star,
    title: "Trusted by 10,000+ Customers",
    subtitle: "Growing Together",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    subtitle: "Original Products",
  },
];

const BottomFeatures = () => {
  return (
    <section className="border-t md:mt-5 mt-0 border-gray-200 bg-white">
      <div className="max-w-7xl mx-auto px-3 sm:px-4 py-4 sm:py-6">

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4 md:gap-6">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group flex items-center gap-2 sm:gap-3 md:gap-4 rounded-xl p-2 sm:p-3 transition-all duration-300 hover:bg-slate-50 hover:shadow-md cursor-pointer"
              >
                <div className="flex h-9 w-9 sm:h-10 sm:w-10 md:h-12 md:w-12 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition-all duration-300 group-hover:bg-blue-700 group-hover:text-white shrink-0">
                  <Icon size={18} className="sm:size-[20] md:size-6" />
                </div>

                <div className="min-w-0">
                  <h3 className="text-[11px] sm:text-xs md:text-sm font-semibold text-gray-900 leading-tight">
                    {item.title}
                  </h3>

                  <p className="mt-0.5 sm:mt-1 text-[10px] sm:text-xs text-gray-500">
                    {item.subtitle}
                  </p>
                </div>
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
};

export default BottomFeatures;