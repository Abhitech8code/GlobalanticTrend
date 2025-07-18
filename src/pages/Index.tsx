
import Header from '@/components/Header';
import HeroSlider from '@/components/HeroSlider';
import CategoryGrid from '@/components/CategoryGrid';
import FeaturedProducts from '@/components/FeaturedProducts';

import ValueProps from '@/components/ValueProps';
import BrandMarqueeSection from '@/components/BrandMarqueeSection';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { Button } from '@/components/ui/button';
import { allProducts } from '@/data/products';
import { Link } from 'react-router-dom';

const Index = () => {
  // Get latest products (first 16 items)
  const latestProducts = allProducts.slice(0, 16);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <HeroSlider />
        <CategoryGrid />
        <FeaturedProducts />
        
        {/* Latest Products Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 dark:text-gray-100 mb-4">
                Latest Products
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                Discover our newest arrivals across all categories
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
              {latestProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            <div className="text-center">
              <Link to="/shop">
                <Button 
                  size="lg"
                  className="bg-primary text-white font-semibold px-8 py-3 hover:shadow-lg transition-all duration-200"
                >
                  View All Products
                </Button>
              </Link>
            </div>
          </div>
        </section>
        

        <ValueProps />
      </main>
      <BrandMarqueeSection />
      <Footer />
    </div>
  );
};

export default Index;
