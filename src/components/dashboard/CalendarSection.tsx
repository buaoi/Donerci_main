
import { useState } from "react";
import { format } from "date-fns";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import { Plus } from "lucide-react";

interface CalendarSectionProps {
  onAddRestaurant: () => void;
  onAddUser: () => void;
}

export const CalendarSection = ({ 
  onAddRestaurant, 
  onAddUser 
}: CalendarSectionProps) => {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  return (
    <Card className="p-6">
      <h3 className="text-lg font-medium mb-4">Restaurant Management Calendar</h3>
      <Calendar
        mode="single"
        selected={selectedDate}
        onSelect={setSelectedDate}
        className="rounded-md border mx-auto"
      />
      <div className="mt-4">
        <p className="text-sm text-muted-foreground">
          {selectedDate ? (
            <>Selected date: {format(selectedDate, 'PPP')}</>
          ) : (
            <>Select a date to manage restaurants</>
          )}
        </p>
        {selectedDate && (
          <div className="mt-2 flex justify-center">
            <Button 
              variant="outline" 
              className="mr-2"
              onClick={onAddRestaurant}
            >
              <Plus className="mr-1" size={14} />
              Add Restaurant
            </Button>
            <Button 
              variant="outline"
              onClick={onAddUser}
            >
              <Plus className="mr-1" size={14} />
              Add User
            </Button>
          </div>
        )}
      </div>
    </Card>
  );
};
