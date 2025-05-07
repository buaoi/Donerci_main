
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Star, Clock, Tag } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

interface RestaurantCardProps {
  id: string;
  name: string;
  image: string;
  cuisine: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
  isAIRecommended?: boolean;
}

const RestaurantCard = ({
  id,
  name,
  image,
  cuisine,
  rating,
  deliveryTime,
  priceRange,
  isAIRecommended = false,
}: RestaurantCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={`/restaurant/${id}`}
      className="group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="overflow-hidden rounded-xl bg-white shadow-sm border border-border transition-all duration-300 hover:shadow-md">
        <div className="relative aspect-[4/3] overflow-hidden">
          <div className={cn("absolute inset-0 bg-gray-200", !isImageLoaded && "animate-pulse")} />
          <img
            src={image}
            alt={name}
            className={cn(
              "w-full h-full object-cover transition-transform duration-500 ease-out",
              isHovered && "scale-105",
              isImageLoaded ? "opacity-100" : "opacity-0"
            )}
            onLoad={() => setIsImageLoaded(true)}
          />
          {isAIRecommended && (
            <div className="absolute top-3 right-3 z-10">
              <Badge className="bg-accent text-white font-medium text-xs px-2">
                AI Recommended
              </Badge>
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-lg">{name}</h3>
            <div className="flex items-center space-x-1 text-amber-500">
              <Star className="h-4 w-4 fill-amber-500" />
              <span className="text-sm font-medium">{rating.toFixed(1)}</span>
            </div>
          </div>
          <p className="text-muted-foreground text-sm mt-1">{cuisine}</p>
          <div className="flex items-center space-x-3 mt-3">
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{deliveryTime}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Tag className="h-3.5 w-3.5 mr-1" />
              <span className="text-xs">{priceRange}</span>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default RestaurantCard;
