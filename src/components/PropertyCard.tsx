import { Button } from "@/components/ui/button";
import { MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";

export interface PropertyCardProps {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  image: string;
  isForRent?: boolean;
}

const PropertyCard = ({ 
  id,
  title, 
  location, 
  price, 
  type, 
  bedrooms, 
  bathrooms, 
  area, 
  image, 
  isForRent = true 
}: PropertyCardProps) => {
  const navigate = useNavigate();
  
  const handleViewDetails = () => {
    navigate(`/properties/${id}`);
  };
  return (
    <div className="bg-card rounded-xl shadow-property hover:shadow-elegant transition-all duration-300 hover:scale-105 overflow-hidden group">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
            isForRent 
              ? 'bg-secondary text-secondary-foreground' 
              : 'bg-primary text-primary-foreground'
          }`}>
            {isForRent ? 'For Rent' : 'For Sale'}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-lg font-semibold text-foreground mb-2 line-clamp-2">
          {title}
        </h3>
        
        <div className="flex items-center text-muted-foreground mb-3">
          <MapPin className="h-4 w-4 mr-1" />
          <span className="text-sm">{location}</span>
        </div>

        <div className="flex items-center justify-between mb-4">
          <div className="text-2xl font-bold text-primary">
            KES {price}
            {isForRent && <span className="text-sm font-normal text-muted-foreground">/month</span>}
          </div>
          <div className="text-sm text-muted-foreground bg-muted px-2 py-1 rounded">
            {type}
          </div>
        </div>

        {/* Property Details */}
        {(bedrooms || bathrooms || area) && (
          <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
            {bedrooms && (
              <span>{bedrooms} bed{bedrooms > 1 ? 's' : ''}</span>
            )}
            {bathrooms && (
              <span>{bathrooms} bath{bathrooms > 1 ? 's' : ''}</span>
            )}
            {area && (
              <span>{area}</span>
            )}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2">
          <Button 
            variant="property" 
            className="flex-1"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
          <Button variant="outline" size="sm">
            Contact
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;