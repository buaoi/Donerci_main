
import { useState, useEffect } from "react";
import { format } from "date-fns";
import { StatsCards } from "../components/dashboard/StatsCards";
import { CalendarSection } from "../components/dashboard/CalendarSection";
import { RecentActivities } from "../components/dashboard/RecentActivities";
import { RecentUsers } from "../components/dashboard/RecentUsers";
import { RecentRestaurants } from "../components/dashboard/RecentRestaurants";
import { AddUserDialog } from "../components/dashboard/AddUserDialog";
import { AddRestaurantDialog } from "../components/dashboard/AddRestaurantDialog";

// Types
interface UserData {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  createdAt: string;
}

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  rating: number;
  address: string;
  createdAt: string;
}

interface Activity {
  id: string;
  type: string;
  user: string;
  details: string;
  timestamp: string;
}

const AdminPanel = ({ tab = "dashboard" }: { tab?: string }) => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAddRestaurantDialog, setShowAddRestaurantDialog] = useState(false);
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);

  useEffect(() => {
    // Load users from localStorage
    try {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        // Use sample data if none exists
        const sampleUsers: UserData[] = [
          { id: "1", name: "Admin User", email: "admin@example.com", isAdmin: true, createdAt: "2023-01-01" },
          { id: "2", name: "John Doe", email: "john@example.com", createdAt: "2023-02-15" },
          { id: "3", name: "Jane Smith", email: "jane@example.com", createdAt: "2023-03-22" },
        ];
        setUsers(sampleUsers);
        localStorage.setItem("users", JSON.stringify(sampleUsers));
      }
      
      // Load restaurants data
      const storedRestaurants = localStorage.getItem("restaurants");
      if (storedRestaurants) {
        setRestaurants(JSON.parse(storedRestaurants));
      } else {
        const sampleRestaurants: Restaurant[] = [
          { id: "1", name: "Istanbul Grill", cuisine: "Turkish", rating: 4.5, address: "123 Main St", createdAt: "2023-01-05" },
          { id: "2", name: "Antalya Kebab", cuisine: "Mediterranean", rating: 4.2, address: "456 Oak Ave", createdAt: "2023-02-18" },
          { id: "3", name: "Bosphorus Delight", cuisine: "Turkish", rating: 4.8, address: "789 Pine Rd", createdAt: "2023-03-30" },
        ];
        setRestaurants(sampleRestaurants);
        localStorage.setItem("restaurants", JSON.stringify(sampleRestaurants));
      }
      
      // Load activity data
      const storedActivities = localStorage.getItem("activities");
      if (storedActivities) {
        setActivities(JSON.parse(storedActivities));
      } else {
        const sampleActivity: Activity[] = [
          { id: "1", type: "Login", user: "admin@example.com", details: "Admin user logged in", timestamp: "2023-05-01 09:30:22" },
          { id: "2", type: "Create", user: "admin@example.com", details: "Added new restaurant: Istanbul Grill", timestamp: "2023-05-01 10:15:45" },
          { id: "3", type: "Order", user: "john@example.com", details: "New order #12345 placed", timestamp: "2023-05-01 12:22:10" },
        ];
        setActivities(sampleActivity);
        localStorage.setItem("activities", JSON.stringify(sampleActivity));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  }, []);

  const logActivity = (type: string, user: string, details: string) => {
    const newActivity = {
      id: Date.now().toString(),
      type,
      user,
      details,
      timestamp: new Date().toLocaleString()
    };
    
    const updatedActivities = [newActivity, ...activities];
    setActivities(updatedActivities);
    localStorage.setItem("activities", JSON.stringify(updatedActivities));
  };

  const handleAddUser = (userData: { name: string; email: string; password: string; isAdmin: boolean }, date: Date) => {
    const addedUser = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      isAdmin: userData.isAdmin,
      createdAt: format(date, 'yyyy-MM-dd')
    };
    
    const updatedUsers = [...users, addedUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Log activity
    logActivity("Create", "admin", `Added new user: ${addedUser.name}`);
    
    // Close dialog
    setShowAddUserDialog(false);
  };

  const handleAddRestaurant = (restaurantData: { name: string; cuisine: string; address: string }, date: Date) => {
    const addedRestaurant = {
      id: Date.now().toString(),
      name: restaurantData.name,
      cuisine: restaurantData.cuisine,
      rating: 0,
      address: restaurantData.address,
      createdAt: format(date, 'yyyy-MM-dd')
    };
    
    const updatedRestaurants = [...restaurants, addedRestaurant];
    setRestaurants(updatedRestaurants);
    localStorage.setItem("restaurants", JSON.stringify(updatedRestaurants));
    
    // Log activity
    logActivity("Create", "admin", `Added new restaurant: ${addedRestaurant.name}`);
    
    // Close dialog
    setShowAddRestaurantDialog(false);
  };

  return (
    <div className="bg-gray-50 rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-4">Dashboard Overview</h2>
      
      {/* Stats cards */}
      <StatsCards 
        userCount={users.length}
        restaurantCount={restaurants.length}
        activityCount={activities.length}
      />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Calendar section */}
        <CalendarSection 
          onAddRestaurant={() => setShowAddRestaurantDialog(true)}
          onAddUser={() => setShowAddUserDialog(true)}
        />

        {/* Recent activities */}
        <RecentActivities activities={activities} />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <RecentUsers users={users} />
        
        {/* Recent restaurants */}
        <RecentRestaurants restaurants={restaurants} />
      </div>

      {/* Add user dialog */}
      <AddUserDialog 
        open={showAddUserDialog}
        onOpenChange={setShowAddUserDialog}
        onAddUser={handleAddUser}
      />

      {/* Add restaurant dialog */}
      <AddRestaurantDialog 
        open={showAddRestaurantDialog}
        onOpenChange={setShowAddRestaurantDialog}
        onAddRestaurant={handleAddRestaurant}
      />
    </div>
  );
};

export default AdminPanel;
