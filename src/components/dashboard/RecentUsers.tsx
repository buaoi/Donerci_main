
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

interface UserData {
  id: string;
  name: string;
  email: string;
  createdAt: string;
}

interface RecentUsersProps {
  users: UserData[];
}

export const RecentUsers = ({ users }: RecentUsersProps) => {
  const navigate = useNavigate();
  
  return (
    <div>
      <h3 className="text-xl font-medium mb-3">Recent Users</h3>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Created</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.slice(0, 3).map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.createdAt}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button 
        variant="ghost" 
        className="mt-2" 
        onClick={() => navigate("/admin/users")}
      >
        View All Users
      </Button>
    </div>
  );
};
