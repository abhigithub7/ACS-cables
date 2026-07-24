import { useState, useEffect, useCallback } from 'react';

const Slider = () => {
  const slides = [
    {
      id: 1,
      image: "https://res.cloudinary.com/dcupo5fge/image/upload/v1784308657/ChatGPT_Image_Jul_17_2026_10_44_09_PM_epsl2a.png",
      alt: "ACS Cables - Premium Quality Cables and Wires for All Your Electrical Needs"
    },
    {
      id: 2,
      image: "https://res.cloudinary.com/dcupo5fge/image/upload/v1781889975/ChatGPT_Image_Jun_19_2026_10_55_21_PM_ie1mp0.png",
      alt: "Shop LAN Cables, CCTV Cables, and Power Cables at Best Prices - ACS Cables"
    },
    {
      id: 3,
      image: "https://res.cloudinary.com/dcupo5fge/image/upload/v1781890314/ChatGPT_Image_Jun_19_2026_11_01_32_PM_ny6xqj.png",
      alt: "Computer Accessories and Printer Cables - ACS Cables India"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  const nextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  }, [slides.length]);

  const prevSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  }, [slides.length]);

  const goToSlide = useCallback((index) => {
    setCurrentSlide(index);
  }, []);

  useEffect(() => {
    if (isHovered) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [nextSlide, isHovered]);

  return (
    <div
      className="relative   mt-2.5 rounded-lg  w-full overflow-hidden "
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        height: 'clamp(120px, 22vw, 500px)',
      }}
    >
      {/* Slides Container */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full w-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="relative w-[100%] h-full object-cover shrink-0 snap-center overflow-hidden"
          >
            <div className='h-full w-full '>
            <img
              src={slide.image}
              alt={slide.alt}
              className="w-full h-auto object-cover  "
              loading={slide.id === 1 ? 'eager' : 'lazy'}
            />
            </div>
           
            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 
                   bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full 
                   transition-all duration-300 z-10 backdrop-blur-md
                   shadow-lg hover:shadow-xl hover:scale-110
                   opacity-80 hover:opacity-100"
        aria-label="Previous slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 
                   bg-white/20 hover:bg-white/40 text-white p-2 sm:p-3 rounded-full 
                   transition-all duration-300 z-10 backdrop-blur-md
                   shadow-lg hover:shadow-xl hover:scale-110
                   opacity-80 hover:opacity-100"
        aria-label="Next slide"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 sm:h-6 sm:w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Dots */}
      <div className="absolute bottom-2 sm:bottom-5 left-1/2 transform -translate-x-1/2 flex items-center gap-1.5 sm:gap-3 z-10 max-w-full px-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 rounded-full shrink-0 ${
              index === currentSlide
                ? 'w-6 sm:w-10 h-2 sm:h-3 bg-blue-500 shadow-lg shadow-blue-500/50'
                : 'w-2 h-2 sm:w-3 sm:h-3 bg-white/50 hover:bg-white/80'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          ></button>
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10 
                      bg-black/40 backdrop-blur-sm text-white text-xs sm:text-sm 
                      px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full font-medium">
        {currentSlide + 1} / {slides.length}
      </div>
    </div>
  );
};

export default Slider;