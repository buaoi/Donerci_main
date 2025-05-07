
import { useState, useEffect } from 'react';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const heroImages = [
  'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=2080',
  'https://images.unsplash.com/photo-1590846406792-0adc7f938f1d?auto=format&fit=crop&q=80&w=2185',
  'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?auto=format&fit=crop&q=80&w=1980',
];

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setIsImageLoaded(false);
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % heroImages.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality here
    console.log('Search for:', searchQuery);
  };

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {/* Background image with blur effect */}
      <div className="absolute inset-0 z-0">
        {heroImages.map((image, index) => (
          <img
            key={index}
            src={image}
            alt="Food background"
            className={cn(
              "absolute inset-0 w-full h-full object-cover transition-opacity duration-1000",
              currentImageIndex === index ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => currentImageIndex === index && setIsImageLoaded(true)}
          />
        ))}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 h-full flex flex-col justify-center items-center text-center">
        <div 
          className={cn(
            "max-w-3xl transition-all duration-700",
            isImageLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
          )}
        >
          <span className="inline-block text-white/90 text-sm font-medium px-3 py-1 rounded-full bg-accent/90 mb-4">
            AI-Powered Food Delivery
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold text-white mb-6 leading-tight">
            Discover & Enjoy <br /> 
            <span className="text-accent">Delicious Food</span>
          </h1>
          <p className="text-white/80 text-lg md:text-xl mb-8 max-w-2xl mx-auto">
            Find the perfect meal with our AI-powered recommendations based on your preferences and taste profile.
          </p>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="flex w-full max-w-md mx-auto">
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="h-5 w-5 text-gray-400" />
              </div>
              <Input 
                type="search" 
                className="w-full pl-10 pr-4 py-3 bg-white/95 border-0 rounded-l-lg focus:ring-2 focus:ring-accent"
                placeholder="Search for restaurants or dishes"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button 
              type="submit" 
              className="bg-accent hover:bg-accent/90 text-white rounded-r-lg"
            >
              Search
            </Button>
          </form>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-10 h-10 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-1 h-3 bg-white rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
