
import React from 'react';

const BrandMarquee = () => {
  const brands = [
    { name: 'ZARA', logo: 'Z' },
    { name: 'H&M', logo: 'H&M' },
    { name: 'UNIQLO', logo: 'U' },
    { name: 'NIKE', logo: 'N' },
    { name: 'ADIDAS', logo: 'A' },
    { name: 'GUCCI', logo: 'G' },
    { name: 'PRADA', logo: 'P' },
    { name: 'CHANEL', logo: 'C' },
    { name: 'VERSACE', logo: 'V' },
    { name: 'ARMANI', logo: 'A' },
    { name: 'CALVIN KLEIN', logo: 'CK' },
    { name: 'TOMMY HILFIGER', logo: 'TH' },
    { name: 'RALPH LAUREN', logo: 'RL' },
    { name: 'HUGO BOSS', logo: 'HB' },
    { name: 'LACOSTE', logo: 'L' },
    { name: 'BURBERRY', logo: 'B' }
  ];

  return (
    <section className="py-12 bg-gray-50 dark:bg-gray-800 overflow-hidden">
      <div className="container mx-auto px-4 mb-8">
        <h2 className="text-2xl md:text-3xl font-bold text-center text-gray-900 dark:text-white mb-2">
          Featured Brands
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-center">
          Discover top brands from around the world
        </p>
      </div>
      
      <div className="grid grid-cols-4 md:grid-cols-8 gap-6">
        {brands.map((brand, index) => (
          <div
            key={`${brand.name}-${index}`}
            className="flex items-center justify-center w-24 h-24 md:w-32 md:h-32 bg-white dark:bg-gray-700 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 group cursor-pointer"
          >
            <div className="text-center">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-primary rounded-full flex items-center justify-center mb-2 mx-auto group-hover:scale-110 transition-transform duration-300">
                <span className="text-white font-bold text-sm md:text-base">
                  {brand.logo}
                </span>
              </div>
              <span className="text-xs md:text-sm font-medium text-gray-700 dark:text-gray-300">
                {brand.name}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BrandMarquee;
