
import { useEffect, useState } from 'react';
import { Navbar, Footer } from '@/components';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { ClipboardList, CreditCard, LogOut, User, MapPin, Settings } from 'lucide-react';

interface UserData {
  id?: string;
  name: string;
  email: string;
  created_at?: string;
  avatar_url?: string;
}

const Profile = () => {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is authenticated
    const getUser = async () => {
      setLoading(true);
      
      try {
        const currentUser = localStorage.getItem('currentUser');
        if (currentUser) {
          const parsedUser = JSON.parse(currentUser);
          setUserData({
            id: parsedUser.id,
            email: parsedUser.email,
            name: parsedUser.name,
            created_at: parsedUser.created_at,
            avatar_url: parsedUser.avatar_url
          });
        } else {
          setUserData(null);
        }
      } catch (error) {
        console.error('Error getting user:', error);
        setUserData(null);
      } finally {
        setLoading(false);
      }
    };
    
    getUser();
  }, []);

  useEffect(() => {
    // If no user is logged in, redirect to auth page
    if (!loading && !userData) {
      navigate('/auth');
    }
  }, [userData, loading, navigate]);

  const handleLogout = async () => {
    try {
      // Remove current user from local storage
      localStorage.removeItem('currentUser');
      
      toast({
        title: "Logged out",
        description: "You have been successfully logged out.",
      });
      navigate('/');
    } catch (error) {
      console.error('Error signing out:', error);
      toast({
        title: "Error",
        description: "Failed to log out. Please try again.",
        variant: "destructive"
      });
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!userData) {
    return null; // Will redirect via useEffect
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-1 container mx-auto px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
            <Avatar className="h-20 w-20">
              <AvatarImage src={userData.avatar_url || `https://api.dicebear.com/7.x/initials/svg?seed=${userData.name}`} alt={userData.name} />
              <AvatarFallback>{userData.name.substring(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-bold">{userData.name}</h1>
              <p className="text-muted-foreground">{userData.email}</p>
            </div>
            <div className="sm:ml-auto">
              <Button variant="outline" onClick={handleLogout} className="flex items-center gap-2">
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          </div>

          <Tabs defaultValue="orders">
            <TabsList className="mb-8">
              <TabsTrigger value="orders" className="flex items-center gap-1">
                <ClipboardList className="h-4 w-4" />
                Orders
              </TabsTrigger>
              <TabsTrigger value="addresses" className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                Addresses
              </TabsTrigger>
              <TabsTrigger value="payment" className="flex items-center gap-1">
                <CreditCard className="h-4 w-4" />
                Payment Methods
              </TabsTrigger>
              <TabsTrigger value="account" className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Account
              </TabsTrigger>
            </TabsList>

            <TabsContent value="orders">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order History</h2>
                <div className="text-center py-8">
                  <ClipboardList className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">You haven't placed any orders yet.</p>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="addresses">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Saved Addresses</h2>
                <div className="text-center py-8">
                  <MapPin className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">You haven't saved any addresses yet.</p>
                  <Button className="mt-4">Add New Address</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="payment">
              <Card className="p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Methods</h2>
                <div className="text-center py-8">
                  <CreditCard className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <p className="text-muted-foreground">You haven't added any payment methods yet.</p>
                  <Button className="mt-4">Add Payment Method</Button>
                </div>
              </Card>
            </TabsContent>

            <TabsContent value="account">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold">Account Settings</h2>
                  <Button variant="outline" size="icon">
                    <Settings className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Name</h3>
                    <p>{userData.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Email</h3>
                    <p>{userData.email}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-muted-foreground">Member Since</h3>
                    <p>{userData.created_at ? new Date(userData.created_at).toLocaleDateString() : 'April 2024'}</p>
                  </div>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Profile;
