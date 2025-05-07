
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

interface Activity {
  id: string;
  type: string;
  user: string;
  timestamp: string;
}

interface RecentActivitiesProps {
  activities: Activity[];
}

export const RecentActivities = ({ activities }: RecentActivitiesProps) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h3 className="text-xl font-medium mb-3">Recent Activities</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {activities.slice(0, 5).map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>{activity.type}</TableCell>
              <TableCell>{activity.user}</TableCell>
              <TableCell>{activity.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button 
        variant="ghost" 
        className="mt-2" 
        onClick={() => navigate("/admin/activity")}
      >
        View All Activities
      </Button>
    </div>
  );
};
