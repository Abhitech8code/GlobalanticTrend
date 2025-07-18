
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, User, ShoppingCart, ArrowRight, Moon, Sun, LogOut, Package, Heart, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useCart } from '@/context/CartContext';
import { useWishlist } from '@/context/WishlistContext';
import { useTheme } from '@/context/ThemeContext';
import LiveTimer from './LiveTimer';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { state } = useCart();
  const { state: wishlistState } = useWishlist();
  const { theme, toggleTheme } = useTheme();
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  const user = isAuthenticated ? JSON.parse(localStorage.getItem('user') || '{}') : null;

  const navigationItems = [
    { name: 'Women', path: '/shop?category=Women' },
    { name: 'Men', path: '/shop?category=Men' },
    { name: 'Kids', path: '/shop?category=Kids' },
    { name: 'Electronics', path: '/shop?category=Electronics' },
    { name: 'Mobiles', path: '/shop?category=Mobiles' },
    { name: 'Accessories', path: '/shop?category=Accessories' },
    { name: 'Home & Decoration', path: '/home-decor' }
  ];

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('user');
    window.location.reload();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/shop?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm('');
    }
  };

  return (
    <>
      {/* Top Promo Bar */}
      <div className="bg-gradient-brand text-white py-2 px-4">
        <div className="container mx-auto flex items-center justify-between text-sm">
          <div className="flex items-center space-x-4">
            <span className="font-medium">🔥 MEGA SALE - UP TO 70% OFF</span>
            <div className="hidden md:flex items-center space-x-2 font-roboto-mono">
              <span>Ends in:</span>
              <span className="bg-white/20 px-2 py-1 rounded">2d</span>
              <span className="bg-white/20 px-2 py-1 rounded">14h</span>
              <span className="bg-white/20 px-2 py-1 rounded">32m</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <LiveTimer className="text-white text-xs" />
            <Link to="/shop">
              <Button variant="outline" size="sm" className="text-white border-white hover:bg-white hover:text-blue-600">
                Shop Now
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="bg-white dark:bg-gray-900 shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <div className="w-10 h-10 md:w-12 md:h-12 bg-white rounded-xl shadow-lg flex items-center justify-center transform group-hover:scale-105 transition-all duration-300 border border-gray-200">
                    <img 
                      src="/Global.png" 
                      alt="Globalantic Trends" 
                      className="w-8 h-8 md:w-10 md:h-10 object-contain"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        target.nextElementSibling?.classList.remove('hidden');
                      }}
                    />
                    <span className="hidden text-white font-bold text-lg md:text-xl font-poppins">G</span>
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-success rounded-full border-2 border-white shadow-sm"></div>
                </div>
                <div className="hidden md:block">
                  <div className="text-xl font-bold text-gray-900 dark:text-white font-poppins tracking-tight">
                    Globalantic
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400 font-medium tracking-wider uppercase">
                    Trends
                  </div>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-6">
              {navigationItems.map((item, index) => (
                <Link 
                  key={index}
                  to={item.path}
                  className="text-gray-700 dark:text-gray-300 hover:text-primary font-medium transition-colors duration-200 relative group text-sm"
                >
                  {item.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                </Link>
              ))}
              <Link 
                to="/shop?sale=true"
                className="text-coral font-bold hover:text-coral/80 transition-colors duration-200 relative group"
              >
                SALE
                <Badge className="absolute -top-2 -right-2 bg-coral text-white text-xs animate-pulse">
                  HOT
                </Badge>
              </Link>
            </nav>

            {/* Right Actions */}
            <div className="flex items-center space-x-2 md:space-x-4">
              {/* Search - Desktop */}
              <form onSubmit={handleSearch} className="hidden md:flex relative">
                <Input 
                  type="search" 
                  placeholder="Search products..." 
                  className="w-48 lg:w-64 pr-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                  <Search className="text-gray-400 h-4 w-4 hover:text-gray-600" />
                </button>
              </form>

              {/* Theme Toggle */}
              <Button variant="ghost" size="sm" onClick={toggleTheme}>
                {theme === 'light' ? <Moon className="h-4 w-4 md:h-5 md:w-5" /> : <Sun className="h-4 w-4 md:h-5 md:w-5" />}
              </Button>

              {/* User Account */}
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                      <Avatar className="h-6 w-6 md:h-8 md:w-8">
                        <AvatarImage src={user?.avatar} />
                        <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                      </Avatar>
                      <span className="hidden md:inline text-sm">{user?.name}</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <Link to="/account">
                      <DropdownMenuItem>
                        <User className="h-4 w-4 mr-2" />
                        My Account
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/account?tab=orders">
                      <DropdownMenuItem>
                        <Package className="h-4 w-4 mr-2" />
                        Orders
                      </DropdownMenuItem>
                    </Link>
                    <Link to="/account?tab=wishlist">
                      <DropdownMenuItem>
                        <Heart className="h-4 w-4 mr-2" />
                        Wishlist ({wishlistState.itemCount})
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link to="/auth">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="h-4 w-4 md:h-5 md:w-5" />
                    <span className="hidden md:inline text-sm">Sign In</span>
                  </Button>
                </Link>
              )}

              {/* Cart */}
              <Link to="/cart">
                <Button variant="ghost" size="sm" className="relative">
                  <ShoppingCart className="h-4 w-4 md:h-5 md:w-5" />
                  {state.itemCount > 0 && (
                    <Badge className="absolute -top-2 -right-2 bg-coral text-white text-xs min-w-[20px] h-5 flex items-center justify-center">
                      {state.itemCount}
                    </Badge>
                  )}
                </Button>
              </Link>

              {/* Mobile Menu Toggle */}
              <Button 
                variant="ghost" 
                size="sm" 
                className="lg:hidden"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Search */}
          <div className="md:hidden py-3 border-t">
            <form onSubmit={handleSearch} className="relative">
              <Input 
                type="search" 
                placeholder="Search products..." 
                className="w-full pr-10"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <button type="submit" className="absolute right-3 top-1/2 transform -translate-y-1/2">
                <Search className="text-gray-400 h-4 w-4 hover:text-gray-600" />
              </button>
            </form>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="lg:hidden py-4 border-t animate-fade-in">
              <div className="flex flex-col space-y-2">
                <nav className="flex flex-col space-y-1">
                  {navigationItems.map((item, index) => (
                    <Link 
                      key={index}
                      to={item.path}
                      className="text-gray-700 dark:text-gray-300 hover:text-primary font-medium py-3 px-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors duration-200 flex items-center justify-between"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  ))}
                  <Link 
                    to="/shop?sale=true"
                    className="text-coral font-bold py-3 px-4 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors duration-200 flex items-center justify-between"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    SALE
                    <Badge className="bg-coral text-white text-xs">HOT</Badge>
                  </Link>
                </nav>
              </div>
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;
