
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const CategoryGrid = () => {
  const categories = [
    {
      id: 1,
      name: "Women's Fashion",
      path: "/shop?category=Women",
      image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=400&fit=crop",
      itemCount: "2.5k+ items"
    },
    {
      id: 2,
      name: "Men's Collection",
      path: "/shop?category=Men",
      image: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=400&fit=crop",
      itemCount: "1.8k+ items"
    },
    {
      id: 3,
      name: "Electronics",
      path: "/shop?category=Electronics",
      image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=400&fit=crop",
      itemCount: "850+ items"
    },
    {
      id: 4,
      name: "Mobile & Tablets",
      path: "/shop?category=Mobiles",
      image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=400&fit=crop",
      itemCount: "420+ items"
    },
    {
      id: 5,
      name: "Home & Décor",
      path: "/shop?category=Home & Décor",
      image: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=400&h=400&fit=crop",
      itemCount: "1.2k+ items"
    },
    {
      id: 6,
      name: "Kids Collection",
      path: "/shop?category=Kids",
      image: "https://images.unsplash.com/photo-1582562124811-c09040d0a901?w=400&h=400&fit=crop",
      itemCount: "650+ items"
    },
    {
      id: 7,
      name: "Accessories",
      path: "/shop?category=Accessories",
      image: "https://images.unsplash.com/photo-1500673922987-e212871fec22?w=400&h=400&fit=crop",
      itemCount: "950+ items"
    },
    {
      id: 8,
      name: "Outdoor & Sports",
      path: "/shop?category=Sports",
      image: "https://images.unsplash.com/photo-1615729947596-a598e5de0ab3?w=400&h=400&fit=crop",
      itemCount: "380+ items"
    }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gray-900 dark:text-gray-100 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our curated collections across fashion, tech, and lifestyle
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} to={category.path}>
              <Card className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                  
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  {/* Quick Shop Button */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300">
                    <Button 
                      size="sm" 
                      className="bg-white text-gray-900 hover:bg-gray-100 font-semibold transform scale-90 group-hover:scale-100 transition-transform duration-200"
                    >
                      Quick Shop
                    </Button>
                  </div>
                </div>
                
                <div className="p-6 text-center">
                  <h3 className="text-lg font-poppins font-semibold text-gray-900 dark:text-gray-100 mb-2 group-hover:text-primary transition-colors duration-200">
                    {category.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 font-roboto-mono">
                    {category.itemCount}
                  </p>
                </div>
              </Card>
            </Link>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Link to="/shop">
            <Button 
              variant="outline" 
              size="lg"
              className="font-semibold px-8 py-3 hover:bg-primary hover:text-white transition-all duration-200"
            >
              View All Categories
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CategoryGrid;
