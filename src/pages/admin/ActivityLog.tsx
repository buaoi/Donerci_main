
import { useState, useEffect } from "react";
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
import { Calendar as CalendarIcon } from "lucide-react";
import { Search } from "lucide-react";

interface Activity {
  id: string;
  type: string;
  user: string;
  details: string;
  timestamp: string;
}

const ActivityLog = () => {
  const [activities, setActivities] = useState<Activity[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    try {
      const storedActivities = localStorage.getItem("activities");
      if (storedActivities) {
        setActivities(JSON.parse(storedActivities));
      } else {
        // Sample data if none exists
        const sampleActivity: Activity[] = [
          { id: "1", type: "Login", user: "admin@example.com", details: "Admin user logged in", timestamp: "2023-05-01 09:30:22" },
          { id: "2", type: "Create", user: "admin@example.com", details: "Added new restaurant: Istanbul Grill", timestamp: "2023-05-01 10:15:45" },
          { id: "3", type: "Order", user: "john@example.com", details: "New order #12345 placed", timestamp: "2023-05-01 12:22:10" },
        ];
        setActivities(sampleActivity);
        localStorage.setItem("activities", JSON.stringify(sampleActivity));
      }
    } catch (error) {
      console.error("Error loading activity data:", error);
    }
  }, []);

  // Filter activities based on search term
  const filteredActivities = activities.filter(activity => 
    activity.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.user.toLowerCase().includes(searchTerm.toLowerCase()) ||
    activity.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Pagination
  const totalPages = Math.ceil(filteredActivities.length / itemsPerPage);
  const paginatedActivities = filteredActivities.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-semibold flex items-center gap-2">
          <CalendarIcon size={20} />
          Activity Log
        </h2>
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search activities..."
            className="pl-8 w-[250px]"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <Table>
        <TableCaption>Record of all system activities</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Details</TableHead>
            <TableHead>Timestamp</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedActivities.map((activity) => (
            <TableRow key={activity.id}>
              <TableCell>{activity.type}</TableCell>
              <TableCell>{activity.user}</TableCell>
              <TableCell>{activity.details}</TableCell>
              <TableCell>{activity.timestamp}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      
      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) setCurrentPage(currentPage - 1);
              }} 
              className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
          {Array.from({ length: totalPages }, (_, i) => (
            <PaginationItem key={i + 1}>
              <PaginationLink 
                href="#" 
                isActive={currentPage === i + 1}
                onClick={(e) => {
                  e.preventDefault();
                  setCurrentPage(i + 1);
                }}
              >
                {i + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              href="#" 
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) setCurrentPage(currentPage + 1);
              }}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default ActivityLog;
