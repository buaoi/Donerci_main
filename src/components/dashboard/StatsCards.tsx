
import { Card } from "@/components/ui/card";

interface StatsCardsProps {
  userCount: number;
  restaurantCount: number;
  activityCount: number;
}

export const StatsCards = ({ 
  userCount, 
  restaurantCount, 
  activityCount 
}: StatsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h3 className="font-medium text-muted-foreground mb-2">Total Users</h3>
        <p className="text-3xl font-bold">{userCount}</p>
      </div>
      
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h3 className="font-medium text-muted-foreground mb-2">Total Restaurants</h3>
        <p className="text-3xl font-bold">{restaurantCount}</p>
      </div>
      
      <div className="bg-white rounded-lg border p-6 shadow-sm">
        <h3 className="font-medium text-muted-foreground mb-2">Recent Activities</h3>
        <p className="text-3xl font-bold">{activityCount}</p>
      </div>
    </div>
  );
};
