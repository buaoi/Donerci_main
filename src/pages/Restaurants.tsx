
import { useState } from 'react';
import { Navbar, RestaurantCard, Footer, Cart } from '@/components';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search, Filter, ShoppingCart } from 'lucide-react';

// Mock data for restaurants
const allRestaurants = [
  {
    id: '1',
    name: 'Italiano Delight',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1470',
    cuisine: 'Italian',
    rating: 4.8,
    deliveryTime: '25-35 min',
    priceRange: '$$',
    isAIRecommended: true,
  },
  {
    id: '2',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?auto=format&fit=crop&q=80&w=1470',
    cuisine: 'Japanese',
    rating: 4.9,
    deliveryTime: '30-40 min',
    priceRange: '$$$',
    isAIRecommended: false,
  },
  {
    id: '3',
    name: 'Spice Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&q=80&w=1470',
    cuisine: 'Indian',
    rating: 4.7,
    deliveryTime: '35-45 min',
    priceRange: '$$',
    isAIRecommended: true,
  },
  {
    id: '4',
    name: 'Burger Joint',
    image: 'https://images.unsplash.com/photo-1467003909585-2f8a72700288?auto=format&fit=crop&q=80&w=1374',
    cuisine: 'American',
    rating: 4.6,
    deliveryTime: '15-25 min',
    priceRange: '$',
    isAIRecommended: false,
  },
  {
    id: '5',
    name: 'Thai Flavors',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?auto=format&fit=crop&q=80&w=1470',
    cuisine: 'Thai',
    rating: 4.5,
    deliveryTime: '30-40 min',
    priceRange: '$$',
    isAIRecommended: true,
  },
  {
    id: '6',
    name: 'Mediterranean Feast',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?auto=format&fit=crop&q=80&w=1469',
    cuisine: 'Mediterranean',
    rating: 4.7,
    deliveryTime: '25-35 min',
    priceRange: '$$',
    isAIRecommended: false,
  },
  {
    id: '7',
    name: 'Taco Heaven',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?auto=format&fit=crop&q=80&w=2080',
    cuisine: 'Mexican',
    rating: 4.4,
    deliveryTime: '20-30 min',
    priceRange: '$',
    isAIRecommended: true,
  },
  {
    id: '8',
    name: 'Noodle House',
    image: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?auto=format&fit=crop&q=80&w=1470',
    cuisine: 'Asian',
    rating: 4.3,
    deliveryTime: '25-35 min',
    priceRange: '$$',
    isAIRecommended: false,
  },
  {
    id: '9',
    name: 'French Bistro',
    image: 'https://images.unsplash.com/photo-1550966871-3ed3cdb5ed0c?auto=format&fit=crop&q=80&w=1470',
    cuisine: 'French',
    rating: 4.6,
    deliveryTime: '35-45 min',
    priceRange: '$$$',
    isAIRecommended: true,
  },
];

// Cuisine filters
const cuisineFilters = [
  'All',
  'Italian',
  'Japanese',
  'Indian',
  'American',
  'Thai',
  'Mediterranean',
  'Mexican',
  'Asian',
  'French',
];

const Restaurants = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('All');
  const [currentTab, setCurrentTab] = useState('all');

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  // Filter restaurants based on search query and cuisine
  const filteredRestaurants = allRestaurants.filter((restaurant) => {
    const matchesSearch = restaurant.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         restaurant.cuisine.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCuisine = selectedCuisine === 'All' || restaurant.cuisine === selectedCuisine;
    
    // Filter by tab
    if (currentTab === 'recommended') {
      return matchesSearch && matchesCuisine && restaurant.isAIRecommended;
    }
    
    return matchesSearch && matchesCuisine;
  });

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Main content */}
      <main className="flex-grow pt-20">
        {/* Hero banner */}
        <div className="bg-primary text-white py-16">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <h1 className="text-4xl font-bold mb-4">Discover Restaurants</h1>
            <p className="text-white/80 max-w-2xl">
              Explore a variety of restaurants and cuisines. 
              Use our AI-powered recommendations to find your perfect meal.
            </p>
          </div>
        </div>

        {/* Search and filters */}
        <div className="bg-white border-b border-border py-4 sticky top-16 z-40">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-grow">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <Search className="h-5 w-5 text-muted-foreground" />
                </div>
                <Input
                  type="search"
                  placeholder="Search restaurants or cuisines"
                  className="pl-10"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <div className="flex gap-2 overflow-x-auto hide-scrollbar py-1">
                {cuisineFilters.map((cuisine) => (
                  <Button
                    key={cuisine}
                    variant={selectedCuisine === cuisine ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCuisine(cuisine)}
                    className="whitespace-nowrap"
                  >
                    {cuisine}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Restaurant listings */}
        <div className="py-8">
          <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
            <Tabs defaultValue="all" className="mb-8" onValueChange={setCurrentTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="all">All Restaurants</TabsTrigger>
                <TabsTrigger value="recommended">AI Recommended</TabsTrigger>
              </TabsList>
              <TabsContent value="all" className="mt-0">
                {filteredRestaurants.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">No restaurants found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                      <div 
                        key={restaurant.id}
                        className="animate-fade-up"
                        style={{ animationDelay: `${parseInt(restaurant.id) % 6 * 100}ms` }}
                      >
                        <RestaurantCard {...restaurant} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
              <TabsContent value="recommended" className="mt-0">
                {filteredRestaurants.length === 0 ? (
                  <div className="text-center py-12">
                    <p className="text-lg text-muted-foreground">No recommended restaurants found matching your criteria.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredRestaurants.map((restaurant) => (
                      <div 
                        key={restaurant.id}
                        className="animate-fade-up"
                        style={{ animationDelay: `${parseInt(restaurant.id) % 6 * 100}ms` }}
                      >
                        <RestaurantCard {...restaurant} />
                      </div>
                    ))}
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
      <Cart isOpen={isCartOpen} onClose={closeCart} />

      {/* Floating cart button (mobile only) */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <Button 
          onClick={openCart}
          className="h-14 w-14 rounded-full bg-accent hover:bg-accent/90 shadow-lg"
        >
          <ShoppingCart className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default Restaurants;
