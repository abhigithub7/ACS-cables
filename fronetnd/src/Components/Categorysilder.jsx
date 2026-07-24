import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

import { categories } from "../categoryData";
import CategoryCard from "./CategoryCard.jsx";

const CategorySection = () => {
  return (
    <section className="py-5">

      <div className="md:max-w-7xl max-w-3xl mx-auto">

        <Swiper
          spaceBetween={20}
          slidesPerView={5}
          breakpoints={{
            640: {
              slidesPerView: 8,
            },
            768: {
              slidesPerView: 8,
            },
            1024: {
              slidesPerView: 8,
            },
          }}
        >
          {categories.map((item) => (
            <SwiperSlide key={item.name}>
              <CategoryCard item={item} />
            </SwiperSlide>
          ))}
        </Swiper>

      </div>
    </section>
  );
};

export default CategorySection;