
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { 
  Navbar, 
  FoodCard, 
  Footer, 
  Cart, 
  AIRecommendation 
} from '@/components';
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { 
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Star, Clock, DollarSign, Info, Utensils, MapPin, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

// Mock restaurant data
const restaurantData = {
  id: '1',
  name: 'Italiano Delight',
  description: 'Experience authentic Italian cuisine with our handcrafted dishes made from traditional recipes. Our chefs use only the freshest ingredients to bring you the true taste of Italy.',
  image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&q=80&w=1470',
  cuisine: 'Italian',
  rating: 4.8,
  reviewCount: 243,
  deliveryTime: '25-35 min',
  deliveryFee: 3.99,
  priceRange: '$$',
  address: '123 Italian Way, Foodville, CA 94123',
  phone: '+1 (555) 123-4567',
  hours: 'Mon-Sun: 11:00 AM - 10:00 PM',
};

// Mock menu categories
const categories = [
  { id: 'appetizers', name: 'Appetizers' },
  { id: 'pasta', name: 'Pasta' },
  { id: 'pizza', name: 'Pizza' },
  { id: 'mains', name: 'Main Courses' },
  { id: 'desserts', name: 'Desserts' },
  { id: 'drinks', name: 'Drinks' },
];

// Mock food items
const allFoodItems = [
  {
    id: '1',
    name: 'Margherita Pizza',
    description: 'Classic pizza with tomato sauce, mozzarella, and fresh basil',
    price: 14.99,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&q=80&w=1469',
    category: 'pizza',
    isPopular: true,
    isAIRecommended: true,
  },
  {
    id: '2',
    name: 'Spaghetti Carbonara',
    description: 'Spaghetti with a creamy sauce of eggs, cheese, pancetta, and black pepper',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1612874742237-6526221588e3?auto=format&fit=crop&q=80&w=1471',
    category: 'pasta',
    isPopular: true,
    isAIRecommended: false,
  },
  {
    id: '3',
    name: 'Bruschetta',
    description: 'Grilled bread rubbed with garlic and topped with diced tomatoes, fresh basil, and olive oil',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1572695044730-08262f3b3295?auto=format&fit=crop&q=80&w=1374',
    category: 'appetizers',
    isPopular: false,
    isAIRecommended: true,
  },
  {
    id: '4',
    name: 'Tiramisu',
    description: 'Classic Italian dessert made with layers of coffee-soaked ladyfingers and mascarpone cream',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&q=80&w=1373',
    category: 'desserts',
    isPopular: true,
    isAIRecommended: false,
  },
  {
    id: '5',
    name: 'Caprese Salad',
    description: 'Fresh mozzarella, tomatoes, and sweet basil, seasoned with salt and olive oil',
    price: 12.99,
    image: 'https://images.unsplash.com/photo-1592417817098-8fd3d9eb14a5?auto=format&fit=crop&q=80&w=1374',
    category: 'appetizers',
    isPopular: false,
    isAIRecommended: true,
  },
  {
    id: '6',
    name: 'Fettuccine Alfredo',
    description: 'Fettuccine pasta in a rich, creamy Parmesan cheese sauce',
    price: 15.99,
    image: 'https://images.unsplash.com/photo-1645112411341-6c4fd023882c?auto=format&fit=crop&q=80&w=1374',
    category: 'pasta',
    isPopular: true,
    isAIRecommended: false,
  },
  {
    id: '7',
    name: 'Pepperoni Pizza',
    description: 'Pizza topped with tomato sauce, mozzarella cheese, and pepperoni',
    price: 16.99,
    image: 'https://images.unsplash.com/photo-1604917877934-07d8d248d396?auto=format&fit=crop&q=80&w=1373',
    category: 'pizza',
    isPopular: true,
    isAIRecommended: true,
  },
  {
    id: '8',
    name: 'Chicken Parmesan',
    description: 'Breaded chicken breast topped with tomato sauce and melted mozzarella',
    price: 18.99,
    image: 'https://images.unsplash.com/photo-1632778149955-e80f8ceca2e8?auto=format&fit=crop&q=80&w=1470',
    category: 'mains',
    isPopular: false,
    isAIRecommended: true,
  },
  {
    id: '9',
    name: 'Italian Gelato',
    description: 'Artisanal Italian ice cream in various flavors',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1557142046-c704a3adf364?auto=format&fit=crop&q=80&w=1374',
    category: 'desserts',
    isPopular: false,
    isAIRecommended: false,
  },
  {
    id: '10',
    name: 'Red Wine',
    description: 'House selection of Italian red wine',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1553361371-9b22f78e8b1d?auto=format&fit=crop&q=80&w=1374',
    category: 'drinks',
    isPopular: false,
    isAIRecommended: false,
  },
];

const RestaurantDetail = () => {
  const { id } = useParams<{ id: string }>();
  const isMobile = useIsMobile();
  const [activeCategory, setActiveCategory] = useState(categories[0]?.id || '');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState('all');
  
  // For pagination
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const openCart = () => {
    setIsCartOpen(true);
  };

  const closeCart = () => {
    setIsCartOpen(false);
  };

  const handleAddToCart = (itemId: string) => {
    console.log('Added to cart:', itemId);
    if (isMobile) {
      // If on mobile, open the cart immediately when adding an item
      openCart();
    }
  };

  // Filter food items based on category and tab
  const filteredItems = allFoodItems.filter((item) => {
    if (currentTab === 'popular') return item.isPopular;
    if (currentTab === 'recommended') return item.isAIRecommended;
    if (currentTab === 'all' && activeCategory) return item.category === activeCategory;
    return true;
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredItems.length / itemsPerPage);
  const displayedItems = filteredItems.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Scroll to menu when page loads or category changes
  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory, currentTab]);

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />

      {/* Hero section with restaurant image */}
      <div className="pt-16">
        <div className="relative h-72 sm:h-96 lg:h-[400px] w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10" />
          <img
            src={restaurantData.image}
            alt={restaurantData.name}
            className="w-full h-full object-cover"
          />
          <div className="absolute bottom-0 left-0 right-0 p-6 sm:p-8 z-20">
            <div className="container mx-auto">
              <div className="flex flex-col items-start">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
                  {restaurantData.name}
                </h1>
                <div className="flex flex-wrap items-center gap-3 text-white mb-2">
                  <span className="flex items-center">
                    <Badge variant="secondary" className="bg-white/20 text-white">
                      {restaurantData.cuisine}
                    </Badge>
                  </span>
                  <span className="flex items-center">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400 mr-1" />
                    <span>{restaurantData.rating}</span>
                    <span className="text-white/70">
                      ({restaurantData.reviewCount} reviews)
                    </span>
                  </span>
                  <span className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{restaurantData.deliveryTime}</span>
                  </span>
                  <span className="flex items-center">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{restaurantData.priceRange}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Restaurant info */}
      <div className="bg-white border-b border-border">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto py-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <p className="text-muted-foreground mb-4">
                {restaurantData.description}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Address</h4>
                    <p className="text-sm text-muted-foreground">
                      {restaurantData.address}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Phone</h4>
                    <p className="text-sm text-muted-foreground">
                      {restaurantData.phone}
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-accent mr-2 flex-shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-medium text-sm">Hours</h4>
                    <p className="text-sm text-muted-foreground">
                      {restaurantData.hours}
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-1">
              <AIRecommendation 
                title="Try These!"
                description="Our AI recommends these dishes based on your preferences and popular choices."
              />
            </div>
          </div>
        </div>
      </div>

      {/* Menu section */}
      <div className="flex-grow py-8">
        <div className="container px-4 sm:px-6 lg:px-8 mx-auto">
          {/* Category navigation */}
          <div className="mb-6">
            <h2 className="text-2xl font-bold mb-4">Menu</h2>
            <Tabs defaultValue="all" className="w-full" onValueChange={setCurrentTab}>
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                <TabsList>
                  <TabsTrigger value="all">All Items</TabsTrigger>
                  <TabsTrigger value="popular">Popular</TabsTrigger>
                  <TabsTrigger value="recommended">AI Recommended</TabsTrigger>
                </TabsList>
                
                {currentTab === 'all' && (
                  <div className="overflow-x-auto hide-scrollbar pb-2">
                    <div className="flex space-x-2">
                      {categories.map((category) => (
                        <Button
                          key={category.id}
                          variant={activeCategory === category.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveCategory(category.id)}
                          className="whitespace-nowrap"
                        >
                          {category.name}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <TabsContent value="all" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedItems.map((item) => (
                    <div 
                      key={item.id}
                      className="animate-fade-up"
                      style={{ animationDelay: `${parseInt(item.id) % 6 * 50}ms` }}
                    >
                      <FoodCard
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                        onAddToCart={handleAddToCart}
                        isAIRecommended={item.isAIRecommended}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="popular" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedItems.map((item) => (
                    <div 
                      key={item.id}
                      className="animate-fade-up"
                      style={{ animationDelay: `${parseInt(item.id) % 6 * 50}ms` }}
                    >
                      <FoodCard
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                        onAddToCart={handleAddToCart}
                        isAIRecommended={item.isAIRecommended}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="recommended" className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {displayedItems.map((item) => (
                    <div 
                      key={item.id}
                      className="animate-fade-up"
                      style={{ animationDelay: `${parseInt(item.id) % 6 * 50}ms` }}
                    >
                      <FoodCard
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        price={item.price}
                        image={item.image}
                        onAddToCart={handleAddToCart}
                        isAIRecommended={item.isAIRecommended}
                      />
                    </div>
                  ))}
                </div>
              </TabsContent>
            </Tabs>

            {/* Pagination */}
            {totalPages > 1 && (
              <Pagination className="mt-8">
                <PaginationContent>
                  {currentPage > 1 && (
                    <PaginationItem>
                      <PaginationPrevious 
                        onClick={() => setCurrentPage(currentPage - 1)} 
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                  
                  {Array.from({ length: Math.min(totalPages, 5) }).map((_, i) => {
                    let pageNum;
                    
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                      if (i === 4) pageNum = totalPages;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <PaginationItem key={i}>
                        <PaginationLink
                          isActive={pageNum === currentPage}
                          onClick={() => setCurrentPage(pageNum)}
                          className="cursor-pointer"
                        >
                          {pageNum}
                        </PaginationLink>
                      </PaginationItem>
                    );
                  })}
                  
                  {currentPage < totalPages && (
                    <PaginationItem>
                      <PaginationNext 
                        onClick={() => setCurrentPage(currentPage + 1)} 
                        className="cursor-pointer"
                      />
                    </PaginationItem>
                  )}
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </div>
      </div>

      <Footer />
      <Cart isOpen={isCartOpen} onClose={closeCart} />

      {/* Floating cart button (mobile only) */}
      <div className="fixed bottom-6 right-6 md:hidden z-40">
        <Button 
          onClick={openCart}
          className="h-14 w-14 rounded-full bg-accent hover:bg-accent/90 shadow-lg"
        >
          <DollarSign className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
};

export default RestaurantDetail;
