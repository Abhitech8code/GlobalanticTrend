import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { allProducts } from '@/data/products';

const HomeDecor = () => {
  const homeDecorProducts = allProducts.filter(product => product.category === 'Home & Décor');

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Home & Decoration
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Transform your space with our curated collection of home décor items
          </p>
          <p className="text-gray-600 dark:text-gray-400 mt-2">{homeDecorProducts.length} products available</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {homeDecorProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        {homeDecorProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No home décor products available at the moment.</p>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default HomeDecor;