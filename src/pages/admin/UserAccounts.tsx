import { useState, useEffect } from "react";
import { format } from "date-fns";
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
import { Search, Plus, Edit, Trash2, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserData {
  id: string;
  name: string;
  email: string;
  isAdmin?: boolean;
  createdAt: string;
}

const UserAccounts = () => {
  const [users, setUsers] = useState<UserData[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showAddUserDialog, setShowAddUserDialog] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false
  });
  const { toast } = useToast();

  // Load user data on component mount
  useEffect(() => {
    try {
      const storedUsers = localStorage.getItem("users");
      if (storedUsers) {
        setUsers(JSON.parse(storedUsers));
      } else {
        // Sample data if none exists
        const sampleUsers: UserData[] = [
          { id: "1", name: "Admin User", email: "admin@example.com", isAdmin: true, createdAt: "2023-01-01" },
          { id: "2", name: "John Doe", email: "john@example.com", createdAt: "2023-02-15" },
          { id: "3", name: "Jane Smith", email: "jane@example.com", createdAt: "2023-03-22" },
        ];
        setUsers(sampleUsers);
        localStorage.setItem("users", JSON.stringify(sampleUsers));
      }
    } catch (error) {
      console.error("Error loading user data:", error);
    }
  }, []);

  const deleteUser = (id: string) => {
    const userToDelete = users.find(user => user.id === id);
    if (userToDelete?.isAdmin) {
      toast({
        title: "Cannot delete admin",
        description: "Admin users cannot be deleted",
        variant: "destructive"
      });
      return;
    }

    const updatedUsers = users.filter(user => user.id !== id);
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Log activity
    logActivity("Delete", "admin", `Deleted user with ID: ${id}`);
    
    toast({
      title: "User deleted",
      description: "The user has been successfully deleted"
    });
  };

  const handleAddUser = () => {
    if (!newUser.name || !newUser.email || !newUser.password) {
      toast({
        title: "Incomplete information",
        description: "Please fill in all required fields",
        variant: "destructive"
      });
      return;
    }
    
    const addedUser = {
      id: Date.now().toString(),
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      createdAt: selectedDate ? format(selectedDate, 'yyyy-MM-dd') : format(new Date(), 'yyyy-MM-dd')
    };
    
    const updatedUsers = [...users, addedUser];
    setUsers(updatedUsers);
    localStorage.setItem("users", JSON.stringify(updatedUsers));
    
    // Log activity
    logActivity("Create", "admin", `Added new user: ${addedUser.name}`);
    
    // Reset form
    setNewUser({ name: "", email: "", password: "", isAdmin: false });
    setShowAddUserDialog(false);
    
    toast({
      title: "User added",
      description: `${addedUser.name} has been successfully added`
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
          <User size={20} />
          User Accounts
        </h2>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              className="pl-8 w-[250px]"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Dialog open={showAddUserDialog} onOpenChange={setShowAddUserDialog}>
            <DialogTrigger asChild>
              <Button>
                <Plus className="mr-1" size={16} />
                Add User
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New User</DialogTitle>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input 
                    id="name" 
                    value={newUser.name} 
                    onChange={(e) => setNewUser({...newUser, name: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input 
                    id="email" 
                    type="email"
                    value={newUser.email} 
                    onChange={(e) => setNewUser({...newUser, email: e.target.value})} 
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <Input 
                    id="password" 
                    type="password"
                    value={newUser.password} 
                    onChange={(e) => setNewUser({...newUser, password: e.target.value})} 
                  />
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isAdmin"
                    checked={newUser.isAdmin}
                    onChange={(e) => setNewUser({...newUser, isAdmin: e.target.checked})}
                    className="h-4 w-4 rounded border-gray-300"
                  />
                  <Label htmlFor="isAdmin">Admin User</Label>
                </div>
                <div className="space-y-2">
                  <Label>Registration Date</Label>
                  <Calendar
                    mode="single"
                    selected={selectedDate}
                    onSelect={setSelectedDate}
                    className="border rounded-md p-3"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setShowAddUserDialog(false)}>Cancel</Button>
                <Button onClick={handleAddUser}>Add User</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </div>
      
      <Table>
        <TableCaption>List of all registered users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users
            .filter(user => 
              user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              user.email.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.isAdmin ? "Admin" : "User"}</TableCell>
                <TableCell>{user.createdAt}</TableCell>
                <TableCell className="text-right space-x-1">
                  <Button size="sm" variant="ghost">
                    <Edit size={16} />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="ghost" 
                    onClick={() => deleteUser(user.id)}
                    disabled={user.isAdmin} // Prevent deleting admin users
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

export default UserAccounts;
