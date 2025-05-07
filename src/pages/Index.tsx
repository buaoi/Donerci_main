import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { ShoppingCart, Utensils, TrendingUp } from 'lucide-react';
import { 
  Hero, 
  Navbar, 
  RestaurantCard, 
  AIRecommendation,
  Cart, 
  Footer 
} from '@/components';

// Mock data for featured restaurants
const featuredRestaurants = [
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
];

const Index = () => {
  const [isCartOpen, setIsCartOpen] = useState(false);

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const handleAddToCart = (id: string) => {
    console.log(`Added item ${id} to cart`);
    // In a real app, this would add to cart state/context
    openCart();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <Hero />
      
      {/* Featured Restaurants Section */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex items-center mb-12">
            <Utensils className="h-6 w-6 text-accent mr-3" />
            <h2 className="text-3xl font-semibold">Featured Restaurants</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredRestaurants.map((restaurant) => (
              <div 
                key={restaurant.id} 
                className="animate-fade-up"
                style={{ animationDelay: `${parseInt(restaurant.id) * 100}ms` }}
              >
                <RestaurantCard {...restaurant} />
              </div>
            ))}
          </div>
          <div className="flex justify-center mt-10">
            <Button asChild className="bg-primary hover:bg-primary/90">
              <a href="/restaurants">View All Restaurants</a>
            </Button>
          </div>
        </div>
      </section>

      {/* AI Recommendation Section */}
      <AIRecommendation onAddToCart={handleAddToCart} className="bg-secondary" />

      {/* How It Works Section */}
      <section className="py-16">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex items-center mb-12">
            <TrendingUp className="h-6 w-6 text-accent mr-3" />
            <h2 className="text-3xl font-semibold">How It Works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center text-center p-6 rounded-xl glass-effect animate-fade-up" style={{ animationDelay: '100ms' }}>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 mb-4">
                <span className="text-accent font-bold text-xl">1</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Browse Restaurants</h3>
              <p className="text-muted-foreground">
                Explore a variety of restaurants and cuisines in your area. Filter by your preferences and dietary restrictions.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl glass-effect animate-fade-up" style={{ animationDelay: '200ms' }}>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 mb-4">
                <span className="text-accent font-bold text-xl">2</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Get AI Recommendations</h3>
              <p className="text-muted-foreground">
                Our AI analyzes your taste preferences to recommend dishes you'll love, helping you discover new favorites.
              </p>
            </div>
            <div className="flex flex-col items-center text-center p-6 rounded-xl glass-effect animate-fade-up" style={{ animationDelay: '300ms' }}>
              <div className="w-16 h-16 flex items-center justify-center rounded-full bg-accent/10 mb-4">
                <span className="text-accent font-bold text-xl">3</span>
              </div>
              <h3 className="text-xl font-medium mb-2">Order & Enjoy</h3>
              <p className="text-muted-foreground">
                Place your order with a few taps and enjoy fast delivery right to your door. Track your order in real-time.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* App Download CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-primary/90 text-white">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-semibold mb-4">Get The Donerci App</h2>
              <p className="text-white/80 mb-6">
                Download our mobile app to access personalized AI food recommendations, 
                exclusive deals, and a seamless ordering experience wherever you go.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button className="bg-white text-primary hover:bg-white/90">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M17.5227 7.39601V8.92935C17.5227 9.14935 17.3493 9.32268 17.1293 9.32268C16.9093 9.32268 16.736 9.14935 16.736 8.92935V7.39601C16.736 6.83601 16.2826 6.38268 15.7227 6.38268H8.27599C7.71599 6.38268 7.26266 6.83601 7.26266 7.39601V16.604C7.26266 17.164 7.71599 17.6173 8.27599 17.6173H15.7227C16.2826 17.6173 16.736 17.164 16.736 16.604V15.0707C16.736 14.8507 16.9093 14.6773 17.1293 14.6773C17.3493 14.6773 17.5227 14.8507 17.5227 15.0707V16.604C17.5227 17.6107 16.7293 18.404 15.7227 18.404Z" fill="currentColor"/>
                    <path d="M14.3767 11.5773H10.8767C10.6567 11.5773 10.4834 11.404 10.4834 11.184C10.4834 10.964 10.6567 10.7907 10.8767 10.7907H14.3767C14.5967 10.7907 14.7701 10.964 14.7701 11.184C14.7701 11.404 14.5967 11.5773 14.3767 11.5773Z" fill="currentColor"/>
                    <path d="M12.6227 13.3307C12.5027 13.3307 12.3827 13.284 12.2893 13.1907C12.1027 13.004 12.1027 12.704 12.2893 12.5173L13.5847 11.222L12.2893 9.92667C12.1027 9.74001 12.1027 9.44001 12.2893 9.25334C12.476 9.06667 12.776 9.06667 12.9627 9.25334L14.5913 10.882C14.7779 11.0687 14.7779 11.3687 14.5913 11.5553L12.9627 13.184C12.8627 13.284 12.7427 13.3307 12.6227 13.3307Z" fill="currentColor"/>
                  </svg>
                  App Store
                </Button>
                <Button className="bg-white text-primary hover:bg-white/90">
                  <svg className="h-5 w-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M7.26271 5.59601L11.7427 10.0827L15.046 6.7827L7.26271 5.59601Z" fill="currentColor"/>
                    <path d="M17.5227 7.39601V9.9827L21.0627 7.99935L17.5227 7.39601Z" fill="currentColor"/>
                    <path d="M21.0627 7.99935L17.5227 6.016V7.39601L21.0627 7.99935Z" fill="currentColor"/>
                    <path d="M2.93604 7.99935L6.47604 9.9827V6.016L2.93604 7.99935Z" fill="currentColor"/>
                    <path d="M6.47604 6.016V9.9827L7.26271 5.59601L6.47604 6.016Z" fill="currentColor"/>
                    <path d="M6.47604 17.984L7.26271 18.404L11.7427 13.9173L6.47604 17.984Z" fill="currentColor"/>
                    <path d="M17.5227 16.604L15.046 17.2173L11.7427 13.9173L17.5227 16.604Z" fill="currentColor"/>
                    <path d="M17.5227 16.604V14.0173L21.0627 12.0007L17.5227 16.604Z" fill="currentColor"/>
                    <path d="M21.0627 12.0007L17.5227 16.604L15.046 17.2173L21.0627 12.0007Z" fill="currentColor"/>
                    <path d="M2.93604 12.0007L6.47604 14.0173V17.984L2.93604 12.0007Z" fill="currentColor"/>
                    <path d="M2.93604 12.0007L6.47604 17.984L11.7427 13.9173L2.93604 12.0007Z" fill="currentColor"/>
                    <path d="M11.7427 10.0827L7.26271 5.59601L11.7427 2.93601V10.0827Z" fill="currentColor"/>
                    <path d="M11.7427 10.0827V2.93601L15.046 6.7827L11.7427 10.0827Z" fill="currentColor"/>
                    <path d="M11.7427 21.064V13.9173L15.046 17.2173L11.7427 21.064Z" fill="currentColor"/>
                    <path d="M11.7427 21.064L7.26271 18.404L11.7427 13.9173V21.064Z" fill="currentColor"/>
                  </svg>
                  Google Play
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 flex justify-center">
              <div className="relative w-64 h-96">
                <div className="absolute top-0 left-0 w-full h-full bg-white/10 backdrop-blur-sm rounded-3xl overflow-hidden">
                  <img 
                    src="https://images.unsplash.com/photo-1576867757603-05b134ebc379?auto=format&fit=crop&q=80&w=1364" 
                    alt="App Preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />

      {/* Cart */}
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

export default Index;
