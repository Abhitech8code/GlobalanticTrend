
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { allProducts } from '@/data/products';

const FeaturedProducts = () => {
  // Get featured products (first 12 items with sales or new items)
  const featuredProducts = allProducts
    .filter(product => product.isSale || product.isNew)
    .slice(0, 12);

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 dark:text-gray-100 mb-4">
            Deals of the Week
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Don't miss out on these limited-time offers
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
          {featuredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center">
          <Button 
            size="lg"
            className="bg-gradient-brand text-white font-semibold px-8 py-3 hover:shadow-lg transition-all duration-200"
            onClick={() => window.location.href = '/shop'}
          >
            View All Deals
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
