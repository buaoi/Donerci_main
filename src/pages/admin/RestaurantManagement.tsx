
import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogTrigger
} from "@/components/ui/dialog";
import { Search, Plus, Edit, Trash2, Database } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  address: string;
  createdAt: string;
}

const RestaurantManagement = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAddRestaurantDialog, setShowAddRestaurantDialog] = useState(false);
  const [newRestaurant, setNewRestaurant] = useState({
    name: "",
    cuisine: "",
    address: ""
  });
  const { toast } = useToast();

  // Load restaurant data on component mount
  useEffect(() => {
    try {
      const storedRestaurants = localStorage.getItem("restaurants");
      if (storedRestaurants) {
        setRestaurants(JSON.parse(storedRestaurants));
      } else {
        // Sample data if none exists
        const sampleRestaurants: Restaurant[] = [
          { id: "1", name: "Istanbul Grill", cuisine: "Turkish", rating: 4.5, address: "123 Main St", createdAt: "2023-01-05" },
          { id: "2", name: "Antalya Kebab", cuisine: "Mediterranean", rating: 4.2, address: "456 Oak Ave", createdAt: "2023-02-18" },
          { id: "3", name: "Bosphorus Delight", cuisine: "Turkish", rating: 4.8, address: "789 Pine Rd", createdAt: "2023-03-30" },
        ];
        setRestaurants(sampleRestaurants);
        localStorage.setItem("restaurants", JSON.stringify(sampleRestaurants));
      }
    } catch (error) {
      console.error("Error loading restaurant data:", error);
    }
  }, []);

  const deleteRestaurant = (id: string) => {
    const updatedRestaurants = restaurants.filter(restaurant => restaurant.id !== id);
    setRestaurants(updatedRestaurants);
    localStorage.setItem("restaurants", JSON.stringify(updatedRestaurants));
    
    // Log activity
    logActivity("Delete", "admin", `Deleted restaurant with ID: ${id}`);
    
    toast({
      title: "Restaurant deleted",
      description: "The restaurant has been successfully deleted"
    });
  };

  const handleAddRestaurant = () => {
    if (!newRestaurant.name || !newRestaurant.cuisine || !newRestaurant.address) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const addedRestaurant = {
      id: Date.now().toString(),
      name: newRestaurant.name,
      cuisine: newRestaurant.cuisine,
      rating: 0,
      address: newRestaurant.address,
      createdAt: format(selectedDate || new Date(), 'yyyy-MM-dd')
    };
    
    const updatedRestaurants = [...restaurants, addedRestaurant];
    setRestaurants(updatedRestaurants);
    localStorage.setItem("restaurants", JSON.stringify(updatedRestaurants));
    
    // Log activity
    logActivity("Create", "admin", `Added new restaurant: ${addedRestaurant.name}`);
    
    // Reset form
    setNewRestaurant({ name: "", cuisine: "", address: "" });
    setShowAddRestaurantDialog(false);
    
    toast({
      title: "Restaurant added",
      description: `${addedRestaurant.name} has been successfully added`
    });
  };

  const logActivity = (type: string, user: string, details: string) => {
    try {
      const storedActivities = localStorage.getItem("activities");
      let activities = storedActivities ? JSON.parse(storedActivities) : [];
      
      const newActivity = {
        id: Date.now().toString(),
        type,
        user,
        details,
        timestamp: new Date().toLocaleString()
      };
      
      activities = [newActivity, ...activities];
      localStorage.setItem("activities", JSON.stringify(activities));
    } catch (error) {
      console.error("Error logging activity:", error);
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <Database size={20} />
          Restaurants
        </h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search restaurants..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={showAddRestaurantDialog} onOpenChange={setShowAddRestaurantDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-1" size={16} />
                Add Restaurant
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Restaurant</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Restaurant Name</Label>
                  <Input 
                    id="name" 
                    value={newRestaurant.name} 
                    onChange={(e) => setNewRestaurant({...newRestaurant, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cuisine">Cuisine Type</Label>
                  <Input 
                    id="cuisine" 
                    value={newRestaurant.cuisine} 
                    onChange={(e) => setNewRestaurant({...newRestaurant, cuisine: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Address</Label>
                  <Input 
                    id="address" 
                    value={newRestaurant.address} 
                    onChange={(e) => setNewRestaurant({...newRestaurant, address: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label>Opening Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-md p-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddRestaurantDialog(false)}>Cancel</Button>
                <Button onClick={handleAddRestaurant}>Add Restaurant</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Table>
        <TableCaption>List of all restaurants</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead>Rating</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {restaurants
            .filter(restaurant => 
              restaurant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              restaurant.cuisine.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((restaurant) => (
              <TableRow key={restaurant.id}>
                <TableCell>{restaurant.name}</TableCell>
                <TableCell>{restaurant.cuisine}</TableCell>
                <TableCell>{restaurant.rating}</TableCell>
                <TableCell>{restaurant.address}</TableCell>
                <TableCell>{restaurant.createdAt}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button size="sm" variant="ghost">
                    <Edit size={16} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost"
                    onClick={() => deleteRestaurant(restaurant.id)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          }
        </TableBody>
      </Table>
      
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#" isActive>1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default RestaurantManagement;
