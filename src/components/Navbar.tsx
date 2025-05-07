
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, User, LogIn, Settings } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UserData {
  name: string;
  email: string;
  isAdmin?: boolean;
}

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);
  const [cartItemCount, setCartItemCount] = useState(0);
  const location = useLocation();

  useEffect(() => {
    // Check if user is logged in
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        const userData = JSON.parse(currentUser);
        setUser({
          name: userData.name,
          email: userData.email,
          isAdmin: userData.isAdmin || false
        });
      } catch (error) {
        console.error('Failed to parse user data');
        setUser(null);
      }
    } else {
      setUser(null);
    }

    // Mock cart count - in a real app this would come from a context/state
    setCartItemCount(2);
  }, [location]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  const isActive = (path: string) => location.pathname === path;

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 transition-all duration-300 ease-in-out',
        isScrolled ? 'bg-white/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
        <div className="flex items-center justify-between h-16 md:h-20">
          <div className="flex items-center">
            <Link 
              to="/" 
              className="flex items-center space-x-2 text-xl font-semibold"
            >
              <span className="text-accent font-bold">Donerci</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                isActive('/') && "text-accent"
              )}
            >
              Home
            </Link>
            <Link 
              to="/restaurants" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                isActive('/restaurants') && "text-accent"
              )}
            >
              Restaurants
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "text-sm font-medium transition-colors hover:text-accent",
                isActive('/about') && "text-accent"
              )}
            >
              About
            </Link>
            {user?.isAdmin && (
              <Link 
                to="/admin" 
                className={cn(
                  "text-sm font-medium transition-colors hover:text-accent",
                  isActive('/admin') && "text-accent"
                )}
              >
                Admin
              </Link>
            )}
          </nav>

          {/* User Controls */}
          <div className="flex items-center space-x-4">
            <Link to="/cart">
              <Button variant="ghost" size="icon" className="relative animate-hover">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 bg-accent text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartItemCount}
                </span>
              </Button>
            </Link>
            {user ? (
              <Link to="/profile">
                <Button variant="ghost" size="icon" className="animate-hover">
                  <User className="h-5 w-5" />
                </Button>
              </Link>
            ) : (
              <Link to="/auth">
                <Button variant="ghost" size="icon" className="animate-hover">
                  <LogIn className="h-5 w-5" />
                </Button>
              </Link>
            )}
            {user?.isAdmin && (
              <Link to="/admin">
                <Button variant="ghost" size="icon" className="animate-hover">
                  <Settings className="h-5 w-5" />
                </Button>
              </Link>
            )}
            <Button 
              variant="ghost"
              size="icon"
              className="md:hidden animate-hover"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-effect animate-fade-in border-t border-border">
          <div className="container px-4 py-4 space-y-3">
            <Link 
              to="/" 
              className={cn(
                "block py-2 text-sm font-medium transition-colors hover:text-accent",
                isActive('/') && "text-accent"
              )}
            >
              Home
            </Link>
            <Link 
              to="/restaurants" 
              className={cn(
                "block py-2 text-sm font-medium transition-colors hover:text-accent",
                isActive('/restaurants') && "text-accent"
              )}
            >
              Restaurants
            </Link>
            <Link 
              to="/about" 
              className={cn(
                "block py-2 text-sm font-medium transition-colors hover:text-accent",
                isActive('/about') && "text-accent"
              )}
            >
              About
            </Link>
            {user?.isAdmin && (
              <Link 
                to="/admin" 
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-accent",
                  isActive('/admin') && "text-accent"
                )}
              >
                Admin Panel
              </Link>
            )}
            {user ? (
              <Link 
                to="/profile" 
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-accent",
                  isActive('/profile') && "text-accent"
                )}
              >
                My Profile
              </Link>
            ) : (
              <Link 
                to="/auth" 
                className={cn(
                  "block py-2 text-sm font-medium transition-colors hover:text-accent",
                  isActive('/auth') && "text-accent"
                )}
              >
                Login / Register
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
