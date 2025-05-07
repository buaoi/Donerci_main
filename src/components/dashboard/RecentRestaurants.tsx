
import { useNavigate } from "react-router-dom";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

interface Restaurant {
  id: string;
  name: string;
  cuisine: string;
  createdAt: string;
}

interface RecentRestaurantsProps {
  restaurants: Restaurant[];
}

export const RecentRestaurants = ({ restaurants }: RecentRestaurantsProps) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h3 className="text-xl font-medium mb-3">Recent Restaurants</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Cuisine</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {restaurants.slice(0, 3).map((restaurant) => (
            <TableRow key={restaurant.id}>
              <TableCell>{restaurant.name}</TableCell>
              <TableCell>{restaurant.cuisine}</TableCell>
              <TableCell>{restaurant.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button 
        variant="ghost" 
        className="mt-2" 
        onClick={() => navigate("/admin/restaurants")}
      >
        View All Restaurants
      </Button>
    </div>
  );
};
