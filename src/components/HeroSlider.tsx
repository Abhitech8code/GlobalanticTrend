
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&h=600&fit=crop",
      title: "Fashion Forward",
      subtitle: "Discover the latest trends in women's and men's fashion",
      cta: "Shop Fashion",
      ctaLink: "/shop?category=Women",
      bgGradient: "from-purple-600/80 to-pink-600/80"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1468495244123-6c6c332eeece?w=1200&h=600&fit=crop",
      title: "Tech Innovation",
      subtitle: "Cutting-edge electronics and gadgets for modern living",
      cta: "Explore Tech",
      ctaLink: "/shop?category=Electronics",
      bgGradient: "from-blue-600/80 to-cyan-600/80"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=1200&h=600&fit=crop",
      title: "Home & Living",
      subtitle: "Transform your space with our curated home décor collection",
      cta: "Shop Home",
      ctaLink: "/shop?category=Home & Décor",
      bgGradient: "from-green-600/80 to-teal-600/80"
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[600px] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="relative h-full">
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${slide.bgGradient}`} />
            
            <div className="absolute inset-0 flex items-center justify-center text-white text-center">
              <div className="max-w-4xl px-4">
                <h1 className="text-5xl md:text-7xl font-bold font-poppins mb-6 animate-fade-in">
                  {slide.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto animate-slide-up">
                  {slide.subtitle}
                </p>
                <Link to={slide.ctaLink}>
                  <Button 
                    size="lg" 
                    className="bg-white text-gray-900 hover:bg-gray-100 font-semibold px-8 py-4 text-lg animate-scale-in"
                  >
                    {slide.cta}
                  </Button>
                </Link>
                
                {/* Sale Countdown for first slide */}
                {index === 0 && (
                  <div className="mt-8 animate-fade-in">
                    <div className="inline-block bg-coral text-white px-6 py-3 rounded-lg">
                      <div className="text-sm font-medium mb-1">MEGA SALE ENDS IN:</div>
                      <div className="flex space-x-2 justify-center font-bold font-roboto-mono">
                        <span className="bg-white/20 px-3 py-1 rounded">2d</span>
                        <span className="bg-white/20 px-3 py-1 rounded">14h</span>
                        <span className="bg-white/20 px-3 py-1 rounded">32m</span>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <Button
        variant="ghost"
        size="lg"
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0"
        onClick={prevSlide}
      >
        <ChevronLeft className="h-6 w-6" />
      </Button>
      
      <Button
        variant="ghost"
        size="lg"
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white border-0"
        onClick={nextSlide}
      >
        <ChevronRight className="h-6 w-6" />
      </Button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            className={`w-3 h-3 rounded-full transition-all duration-200 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
