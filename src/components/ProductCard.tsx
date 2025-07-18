
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useToast } from '@/hooks/use-toast';
import { Product } from '@/data/products';

interface ProductCardProps {
  product: Product;
  viewMode?: 'grid' | 'list';
}

const ProductCard = ({ product, viewMode = 'grid' }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { addItem } = useCart();
  const { addItem: addToWishlist, removeItem: removeFromWishlist, isInWishlist } = useWishlist();
  const { toast } = useToast();

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : product.discount;

  const isNewProduct = product.createdDate ? 
    (new Date().getTime() - new Date(product.createdDate).getTime()) / (1000 * 60 * 60 * 24) <= 30 : 
    false;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image
    });
    
    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleWishlistToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from Wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        category: product.category
      });
      toast({
        title: "Added to Wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const currentImage = (isHovered && product.hoverImage && !imageError) ? product.hoverImage : product.image;

  if (viewMode === 'list') {
    return (
      <Link to={`/product/${product.id}`}>
        <Card className="p-4 md:p-6 hover:shadow-lg transition-shadow">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative w-full md:w-32 h-48 md:h-32 overflow-hidden rounded-lg">
              <img
                src={currentImage}
                alt={product.name}
                className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                onError={() => setImageError(true)}
              />
            </div>
            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div className="mb-4 md:mb-0">
                  <div className="flex items-center gap-2 mb-2 flex-wrap">
                    {(product.isNew || isNewProduct) && (
                      <Badge className="bg-success text-white text-xs">NEW</Badge>
                    )}
                    {discountPercent && discountPercent > 0 && (
                      <Badge className="bg-coral text-white text-xs">-{discountPercent}%</Badge>
                    )}
                    {product.isSale && (
                      <Badge className="bg-red-600 text-white animate-pulse text-xs">SALE</Badge>
                    )}
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                  
                  <div className="flex items-center mb-4">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <span key={i} className={i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}>
                          ★
                        </span>
                      ))}
                    </div>
                    <span className="text-sm text-gray-500 ml-2">({product.reviews})</span>
                  </div>
                </div>
                
                <div className="text-left md:text-right">
                  <div className="flex items-center space-x-2 mb-4">
                    <span className="text-xl md:text-2xl font-bold">${product.price}</span>
                    {product.originalPrice && (
                      <span className="text-sm md:text-lg text-gray-500 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  
                  <Button onClick={handleAddToCart} disabled={!product.inStock} size="sm" className="w-full md:w-auto">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </Link>
    );
  }

  return (
    <Link to={`/product/${product.id}`}>
      <Card 
        className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="relative overflow-hidden">
          <img 
            src={currentImage}
            alt={product.name}
            className="w-full h-48 md:h-64 object-cover transition-all duration-500 group-hover:scale-105"
            onError={() => setImageError(true)}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1">
            {(product.isNew || isNewProduct) && (
              <Badge className="bg-success text-white font-semibold text-xs">
                NEW
              </Badge>
            )}
            {discountPercent && discountPercent > 0 && (
              <Badge className="bg-coral text-white font-semibold text-xs">
                -{discountPercent}%
              </Badge>
            )}
            {product.isSale && (
              <Badge className="bg-red-600 text-white font-semibold animate-pulse text-xs">
                SALE
              </Badge>
            )}
          </div>

          {/* Stock indicator */}
          {product.stockCount > 75 && (
            <div className="absolute top-3 right-3">
              <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                99+ in stock
              </Badge>
            </div>
          )}

          {/* Wishlist & Quick View - Hidden on mobile */}
          <div className="absolute top-3 right-3 hidden md:flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button 
              size="sm" 
              variant="secondary"
              className={`w-9 h-9 p-0 shadow-md transition-colors ${
                isInWishlist(product.id) 
                  ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                  : 'bg-white hover:bg-gray-100'
              }`}
              onClick={handleWishlistToggle}
            >
              <Heart className={`h-4 w-4 ${isInWishlist(product.id) ? 'fill-current' : ''}`} />
            </Button>
            <Button 
              size="sm" 
              variant="secondary"
              className="w-9 h-9 p-0 bg-white hover:bg-gray-100 shadow-md"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
              }}
            >
              <Eye className="h-4 w-4" />
            </Button>
          </div>

          {/* Quick Add to Cart - Desktop only */}
          <div className={`absolute bottom-0 left-0 right-0 transform transition-all duration-300 hidden md:block ${
            isHovered ? 'translate-y-0' : 'translate-y-full'
          }`}>
            <Button 
              className="w-full bg-primary hover:bg-primary/90 text-white font-semibold py-3 rounded-none"
              onClick={handleAddToCart}
              disabled={!product.inStock}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              {product.inStock ? 'Add to Cart' : 'Out of Stock'}
            </Button>
          </div>
        </div>
        
        <div className="p-3 md:p-4">
          {/* Rating */}
          <div className="flex items-center mb-2">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-sm ${i < Math.floor(product.rating) ? 'text-yellow-400' : 'text-gray-300'}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="text-xs text-gray-500 ml-2 font-roboto-mono">
              ({product.reviews})
            </span>
          </div>
          
          {/* Product Name */}
          <h3 className="text-sm md:text-lg font-medium text-gray-900 dark:text-gray-100 mb-2 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product.name}
          </h3>

          {/* Stock count for high inventory */}
          {product.stockCount > 75 && (
            <p className="text-xs text-green-600 mb-2 font-medium">
              Items in Stock: {product.stockCount}+
            </p>
          )}
          
          {/* Price */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 font-roboto-mono">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-xs md:text-sm text-gray-500 line-through font-roboto-mono">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            
            {/* Mobile Add to Cart */}
            <Button 
              size="sm"
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="md:hidden"
            >
              <ShoppingCart className="w-4 h-4" />
            </Button>
          </div>

          {/* Sale Countdown Timer (for sale items) */}
          {product.isSale && (
            <div className="mt-3 p-2 bg-red-50 dark:bg-red-900/20 rounded-lg">
              <div className="text-xs text-red-700 dark:text-red-400 font-medium mb-1">Sale ends in:</div>
              <div className="flex space-x-1 text-red-700 dark:text-red-400 font-bold font-roboto-mono text-xs">
                <span className="bg-red-100 dark:bg-red-800 px-2 py-1 rounded">2d</span>
                <span className="bg-red-100 dark:bg-red-800 px-2 py-1 rounded">14h</span>
                <span className="bg-red-100 dark:bg-red-800 px-2 py-1 rounded">32m</span>
              </div>
            </div>
          )}
        </div>
      </Card>
    </Link>
  );
};

export default ProductCard;
