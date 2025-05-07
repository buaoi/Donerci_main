
import { useEffect, useState } from "react";
import { Outlet, useNavigate, useLocation } from "react-router-dom";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/toaster";

const AdminLayout = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user is admin on component mount
  useEffect(() => {
    const checkAdmin = () => {
      const currentUser = localStorage.getItem("currentUser");
      if (currentUser) {
        try {
          const userData = JSON.parse(currentUser);
          // Simple check - in a real app this would be more robust
          if (userData.isAdmin) {
            setIsAdmin(true);
            return;
          }
        } catch (error) {
          console.error("Failed to parse user data");
        }
      }
      
      // Redirect if not admin
      navigate("/");
    };
    
    checkAdmin();
  }, [navigate]);

  // Determine active tab based on current path
  const getActiveTab = () => {
    const path = location.pathname;
    if (path.includes("/admin/users")) return "users";
    if (path.includes("/admin/restaurants")) return "restaurants";
    if (path.includes("/admin/activity")) return "activity";
    return "dashboard";
  };

  if (!isAdmin) {
    return <div className="p-8 text-center">Checking permissions...</div>;
  }

  return (
    <div className="container mx-auto pt-24 pb-10">
      <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>
      
      <Tabs value={getActiveTab()} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger 
            value="dashboard" 
            onClick={() => navigate("/admin")}
          >
            Dashboard
          </TabsTrigger>
          <TabsTrigger 
            value="users" 
            onClick={() => navigate("/admin/users")}
          >
            User Accounts
          </TabsTrigger>
          <TabsTrigger 
            value="restaurants" 
            onClick={() => navigate("/admin/restaurants")}
          >
            Restaurants
          </TabsTrigger>
          <TabsTrigger 
            value="activity" 
            onClick={() => navigate("/admin/activity")}
          >
            Activity Log
          </TabsTrigger>
        </TabsList>
      </Tabs>
      
      <div className="mt-6">
        <Outlet />
      </div>
      
      <Toaster />
    </div>
  );
};

export default AdminLayout;
