
import { Lightbulb } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface AIRecommendationProps {
  recommendations?: string[];
  className?: string;
  title?: string;
  description?: string;
  onAddToCart?: (id: string) => void;
}

const AIRecommendation = ({ 
  recommendations = ["Try our signature pasta dishes with homemade sauces.", "Based on your preferences, you might enjoy our vegetarian options.", "Our chef's special today pairs perfectly with your previous orders."], 
  className,
  title = "AI Recommendations",
  description,
  onAddToCart
}: AIRecommendationProps) => {
  return (
    <div className={cn("rounded-lg bg-accent/10 p-4", className)}>
      <div className="flex items-center gap-2 mb-3">
        <Lightbulb className="h-5 w-5 text-accent" />
        <h3 className="font-medium">{title}</h3>
      </div>
      {description && (
        <p className="text-sm text-muted-foreground mb-3">{description}</p>
      )}
      <div className="space-y-2">
        {recommendations.map((recommendation, index) => (
          <p key={index} className="text-sm text-muted-foreground">{recommendation}</p>
        ))}
      </div>
    </div>
  );
};

export default AIRecommendation;
