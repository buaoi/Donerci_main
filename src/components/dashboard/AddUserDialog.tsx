
import { useState } from "react";
import { format } from "date-fns";
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";

interface UserFormData {
  name: string;
  email: string;
  password: string;
  isAdmin: boolean;
}

interface AddUserDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddUser: (userData: UserFormData, date: Date) => void;
}

export const AddUserDialog = ({ 
  open, 
  onOpenChange, 
  onAddUser 
}: AddUserDialogProps) => {
  const [userData, setUserData] = useState<UserFormData>({
    name: "",
    email: "",
    password: "",
    isAdmin: false
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleSubmit = () => {
    if (!userData.name || !userData.email || !userData.password) return;
    onAddUser(userData, selectedDate || new Date());
    setUserData({ name: "", email: "", password: "", isAdmin: false });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={userData.name} 
              onChange={(e) => setUserData({...userData, name: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input 
              id="email" 
              type="email"
              value={userData.email} 
              onChange={(e) => setUserData({...userData, email: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input 
              id="password" 
              type="password"
              value={userData.password} 
              onChange={(e) => setUserData({...userData, password: e.target.value})} 
            />
          </div>
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="isAdmin"
              checked={userData.isAdmin}
              onChange={(e) => setUserData({...userData, isAdmin: e.target.checked})}
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add User</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
