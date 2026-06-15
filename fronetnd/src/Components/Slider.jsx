import { useState, useEffect, useCallback } from 'react';

const Slider = () => {
  const slides = [
    {
      id: 1,
      title: "Latest Gaming Keyboards",
      description: "Discover mechanical keyboards with RGB lighting and fast switches.",
      image: "https://via.placeholder.com/1200x400/4F46E5/FFFFFF?text=Gaming+Keyboards",
      buttonText: "Shop Now",
      buttonLink: "/products"
    },
    {
      id: 2,
      title: "Wireless Mice Collection",
      description: "Ergonomic wireless mice for productivity and gaming.",
      image: "https://via.placeholder.com/1200x400/059669/FFFFFF?text=Wireless+Mice",
      buttonText: "Explore",
      buttonLink: "/products"
    },
    {
      id: 3,
      title: "High-Resolution Monitors",
      description: "4K monitors for crystal-clear visuals and immersive gaming.",
      image: "https://via.placeholder.com/1200x400/DC2626/FFFFFF?text=4K+Monitors",
      buttonText: "View Deals",
      buttonLink: "/products"
    }
  ];

  const [currentSlide, setCurrentSlide] = useState(0);

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
    const timer = setInterval(nextSlide, 5000); // Auto-slide every 5 seconds
    return () => clearInterval(timer);
  }, [nextSlide]);

  return (
    <div className="relative w-full h-96 overflow-hidden">
      {/* Slides */}
      <div
        className="flex transition-transform duration-500 ease-in-out h-full"
        style={{ transform: `translateX(-${currentSlide * 100}%)` }}
      >
        {slides.map((slide) => (
          <div
            key={slide.id}
            className="w-full h-full flex-shrink-0 relative"
            style={{ backgroundImage: `url(${slide.image})`, backgroundSize: 'cover', backgroundPosition: 'center' }}
          >
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>
            {/* Content */}
            <div className="absolute inset-0 flex items-center justify-center text-center text-white px-4">
              <div>
                <h2 className="text-4xl font-bold mb-4">{slide.title}</h2>
                <p className="text-xl mb-6 max-w-2xl">{slide.description}</p>
                <a
                  href={slide.buttonLink}
                  className="bg-purple-900 hover:bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  {slide.buttonText}
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute  left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
      >
        &#10094;
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-20 hover:bg-opacity-30 text-white p-2 rounded-full transition-all"
      >
        &#10095;
      </button>

      {/* Dots */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? 'bg-white' : 'bg-white bg-opacity-50'
            }`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default Slider;