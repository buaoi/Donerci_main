
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

interface RestaurantFormData {
  name: string;
  cuisine: string;
  address: string;
}

interface AddRestaurantDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onAddRestaurant: (restaurantData: RestaurantFormData, date: Date) => void;
}

export const AddRestaurantDialog = ({ 
  open, 
  onOpenChange, 
  onAddRestaurant 
}: AddRestaurantDialogProps) => {
  const [restaurantData, setRestaurantData] = useState<RestaurantFormData>({
    name: "",
    cuisine: "",
    address: ""
  });
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const handleSubmit = () => {
    if (!restaurantData.name || !restaurantData.cuisine || !restaurantData.address) return;
    onAddRestaurant(restaurantData, selectedDate || new Date());
    setRestaurantData({ name: "", cuisine: "", address: "" });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Restaurant</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="name">Restaurant Name</Label>
            <Input 
              id="name" 
              value={restaurantData.name} 
              onChange={(e) => setRestaurantData({...restaurantData, name: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="cuisine">Cuisine Type</Label>
            <Input 
              id="cuisine" 
              value={restaurantData.cuisine} 
              onChange={(e) => setRestaurantData({...restaurantData, cuisine: e.target.value})} 
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input 
              id="address" 
              value={restaurantData.address} 
              onChange={(e) => setRestaurantData({...restaurantData, address: e.target.value})} 
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
          <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
          <Button onClick={handleSubmit}>Add Restaurant</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
