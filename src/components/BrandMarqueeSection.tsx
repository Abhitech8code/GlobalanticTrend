import React from 'react';

const BrandMarqueeSection = () => {
  const brands = [
    {
      name: 'Nike',
      logo: (
        <svg className="w-12 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.525-.616-3.668-1.848L24 7.8z"/>
        </svg>
      )
    },
    {
      name: 'Adidas',
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.043 23.838l4.317-7.484 7.39 7.484H8.043zm8.6-12.674l4.357 7.54-7.39-7.54h3.033zM.25 16.838L4.607 9.164l4.357 7.674H.25z"/>
        </svg>
      )
    },
    {
      name: 'Puma',
      logo: (
        <div className="w-12 h-8 bg-black rounded-sm flex items-center justify-center">
          <span className="text-white font-bold text-xs">PUMA</span>
        </div>
      )
    },
    {
      name: 'Apple',
      logo: (
        <svg className="w-10 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      )
    },
    {
      name: 'Samsung',
      logo: (
        <div className="text-lg font-bold text-blue-600">SAMSUNG</div>
      )
    },
    {
      name: 'Sony',
      logo: (
        <div className="text-lg font-bold">SONY</div>
      )
    },
    {
      name: 'H&M',
      logo: (
        <div className="text-xl font-bold text-red-600">H&M</div>
      )
    },
    {
      name: 'Zara',
      logo: (
        <div className="text-xl font-bold tracking-wider">ZARA</div>
      )
    },
    {
      name: 'Uniqlo',
      logo: (
        <div className="text-lg font-bold text-red-500">UNIQLO</div>
      )
    },
    {
      name: 'Gucci',
      logo: (
        <div className="text-lg font-bold text-green-700 italic">GUCCI</div>
      )
    }
  ];

  return (
    <section className="py-8 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="relative">
        {/* Gradient overlays for smooth fade effect */}
        <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-800 z-10"></div>
        <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-800 z-10"></div>
        
        {/* Marquee container */}
        <div className="marquee-container group">
          <div className="marquee-content">
            {/* First set of brands */}
            {brands.map((brand, index) => (
              <div
                key={`first-${index}`}
                className="flex-shrink-0 flex flex-col items-center justify-center w-32 h-24 mx-6 group-hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-2 text-gray-700 dark:text-gray-300">
                  {brand.logo}
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {brand.name}
                </span>
              </div>
            ))}
            
            {/* Duplicate set for seamless loop */}
            {brands.map((brand, index) => (
              <div
                key={`second-${index}`}
                className="flex-shrink-0 flex flex-col items-center justify-center w-32 h-24 mx-6 group-hover:scale-105 transition-transform duration-300"
              >
                <div className="mb-2 text-gray-700 dark:text-gray-300">
                  {brand.logo}
                </div>
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {brand.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .marquee-container {
          width: 100%;
          overflow: hidden;
        }
        
        .marquee-content {
          display: flex;
          animation: marquee 30s linear infinite;
        }
        
        .marquee-container:hover .marquee-content {
          animation-play-state: paused;
        }
        
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .marquee-content {
            animation-duration: 20s;
          }
        }
        
        @media (max-width: 480px) {
          .marquee-content {
            animation-duration: 15s;
          }
        }
      `}</style>
    </section>
  );
};

export default BrandMarqueeSection;