
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navbar } from "./components";
import { Toaster } from "@/components/ui/toaster";
import Index from "./pages/Index";
import Restaurants from "./pages/Restaurants";
import RestaurantDetail from "./pages/RestaurantDetail";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Profile from "./pages/Profile";
import CartPage from "./pages/CartPage";
import NotFound from "./pages/NotFound";
import AdminLayout from "./components/AdminLayout";
import AdminPanel from "./pages/AdminPanel";
import UserAccounts from "./pages/admin/UserAccounts";
import RestaurantManagement from "./pages/admin/RestaurantManagement";
import ActivityLog from "./pages/admin/ActivityLog";
import "./App.css";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/restaurants" element={<Restaurants />} />
        <Route path="/restaurants/:id" element={<RestaurantDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/cart" element={<CartPage />} />
        
        {/* Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminPanel tab="dashboard" />} />
          <Route path="users" element={<UserAccounts />} />
          <Route path="restaurants" element={<RestaurantManagement />} />
          <Route path="activity" element={<ActivityLog />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </Router>
  );
}

export default App;
