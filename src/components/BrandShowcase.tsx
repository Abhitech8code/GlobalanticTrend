import React from 'react';
import { Card } from '@/components/ui/card';

const BrandShowcase = () => {
  const brands = [
    {
      id: 1,
      name: 'Nike',
      logo: (
        <svg className="w-12 h-8" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 7.8L6.442 15.276c-1.456.616-2.679.925-3.668.925-1.456 0-2.525-.616-3.668-1.848L24 7.8z"/>
        </svg>
      ),
      description: 'Just Do It',
      category: 'Sports & Fashion'
    },
    {
      id: 2,
      name: 'H&M',
      logo: (
        <div className="text-2xl font-bold text-red-600">H&M</div>
      ),
      description: 'Fashion and Quality',
      category: 'Fast Fashion'
    },
    {
      id: 3,
      name: 'Adidas',
      logo: (
        <svg className="w-12 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M8.043 23.838l4.317-7.484 7.39 7.484H8.043zm8.6-12.674l4.357 7.54-7.39-7.54h3.033zM.25 16.838L4.607 9.164l4.357 7.674H.25z"/>
        </svg>
      ),
      description: 'Impossible is Nothing',
      category: 'Sports & Lifestyle'
    },
    {
      id: 4,
      name: 'Zara',
      logo: (
        <div className="text-2xl font-bold tracking-wider">ZARA</div>
      ),
      description: 'Fashion Forward',
      category: 'Premium Fashion'
    },
    {
      id: 5,
      name: 'Apple',
      logo: (
        <svg className="w-10 h-12" viewBox="0 0 24 24" fill="currentColor">
          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
        </svg>
      ),
      description: 'Think Different',
      category: 'Technology'
    },
    {
      id: 6,
      name: 'Samsung',
      logo: (
        <div className="text-xl font-bold text-blue-600">SAMSUNG</div>
      ),
      description: 'Inspire the World',
      category: 'Electronics'
    },
    {
      id: 7,
      name: 'Uniqlo',
      logo: (
        <div className="text-xl font-bold text-red-500">UNIQLO</div>
      ),
      description: 'LifeWear',
      category: 'Casual Fashion'
    },
    {
      id: 8,
      name: 'Gucci',
      logo: (
        <div className="text-xl font-bold text-green-700 italic">GUCCI</div>
      ),
      description: 'Luxury Fashion',
      category: 'Premium Luxury'
    },
    {
      id: 9,
      name: 'Puma',
      logo: (
        <svg className="w-12 h-10" viewBox="0 0 24 24" fill="currentColor">
          <path d="M24 12c0 6.627-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0s12 5.373 12 12zM12 2C6.486 2 2 6.486 2 12s4.486 10 10 10 10-4.486 10-10S17.514 2 12 2z"/>
        </svg>
      ),
      description: 'Forever Faster',
      category: 'Sports'
    },
    {
      id: 10,
      name: 'IKEA',
      logo: (
        <div className="text-xl font-bold text-blue-600 bg-yellow-400 px-2 py-1 rounded">IKEA</div>
      ),
      description: 'Home Furnishing',
      category: 'Home & Décor'
    },
    {
      id: 11,
      name: 'Sony',
      logo: (
        <div className="text-xl font-bold">SONY</div>
      ),
      description: 'Be Moved',
      category: 'Electronics'
    },
    {
      id: 12,
      name: 'Calvin Klein',
      logo: (
        <div className="text-lg font-bold tracking-wide">CALVIN KLEIN</div>
      ),
      description: 'Modern Luxury',
      category: 'Fashion'
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">


        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6">
          {brands.map((brand) => (
            <Card 
              key={brand.id} 
              className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 bg-white dark:bg-gray-700"
            >
              <div className="p-6 text-center h-32 flex flex-col justify-center items-center">
                <div className="mb-3 text-gray-800 dark:text-gray-200 group-hover:scale-110 transition-transform duration-300">
                  {brand.logo}
                </div>
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <p className="text-xs text-gray-600 dark:text-gray-400 font-medium">
                    {brand.description}
                  </p>
                </div>
              </div>
              
              {/* Category Badge */}
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
                  {brand.category}
                </span>
              </div>
            </Card>
          ))}
        </div>

        {/* Brand Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">500+</div>
            <div className="text-gray-600 dark:text-gray-400">Global Brands</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">50M+</div>
            <div className="text-gray-600 dark:text-gray-400">Products</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">180+</div>
            <div className="text-gray-600 dark:text-gray-400">Countries</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-primary mb-2">99%</div>
            <div className="text-gray-600 dark:text-gray-400">Authentic</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandShowcase;