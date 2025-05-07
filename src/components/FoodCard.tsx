
import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface FoodCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  onAddToCart: (id: string) => void;
  isAIRecommended?: boolean;
}

const FoodCard = ({
  id,
  name,
  description,
  price,
  image,
  onAddToCart,
  isAIRecommended = false,
}: FoodCardProps) => {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative"
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
            <div className="absolute top-3 right-3 z-10 bg-accent text-white text-xs px-2 py-0.5 rounded-full">
              AI Recommended
            </div>
          )}
        </div>
        <div className="p-4">
          <div className="flex items-start justify-between">
            <h3 className="font-medium text-base">{name}</h3>
            <span className="font-medium text-base">${price.toFixed(2)}</span>
          </div>
          <p className="text-muted-foreground text-sm mt-1 line-clamp-2">{description}</p>
          <Button
            onClick={(e) => {
              e.preventDefault();
              onAddToCart(id);
            }}
            className="mt-3 w-full bg-accent text-white hover:bg-accent/90 transition-all"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-1" /> Add to Cart
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
