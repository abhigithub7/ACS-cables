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
      <div className="max-w-7xl mx-auto px-4 py-6">

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">

          {features.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={index}
                className="group flex items-center gap-4 rounded-xl p-3 transition-all duration-300 hover:bg-slate-50 hover:shadow-md cursor-pointer"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-blue-700 transition-all duration-300 group-hover:bg-blue-700 group-hover:text-white">
                  <Icon size={24} />
                </div>

                <div>
                  <h3 className="text-sm font-semibold text-gray-900">
                    {item.title}
                  </h3>

                  <p className="mt-1 text-xs text-gray-500">
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