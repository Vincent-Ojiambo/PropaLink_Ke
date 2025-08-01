import { useState, useEffect, useMemo } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

// Sample rental properties
const rentalProperties = [
  {
    id: "1",
    title: "Modern 3-Bedroom Apartment in Westlands",
    location: "Westlands, Nairobi",
    price: "120,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "120 sqm",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
    isForRent: true
  },
  {
    id: "3",
    title: "Spacious Family Home in Karen",
    location: "Karen, Nairobi",
    price: "180,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: "250 sqm",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=300&fit=crop",
    isForRent: true
  },
  {
    id: "4",
    title: "Commercial Office Space",
    location: "CBD, Nairobi",
    price: "300,000",
    type: "Commercial",
    area: "200 sqm",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    isForRent: true
  },
  {
    id: "6",
    title: "Student Housing near University",
    location: "Kikuyu, Kiambu",
    price: "35,000",
    type: "Apartment",
    bedrooms: 1,
    bathrooms: 1,
    area: "45 sqm",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=400&h=300&fit=crop",
    isForRent: true
  },
  {
    id: "7",
    title: "Luxury Penthouse with City View",
    location: "Kilimani, Nairobi",
    price: "250,000",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 3,
    area: "180 sqm",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    isForRent: true
  },
  {
    id: "8",
    title: "Beachfront Vacation Rental",
    location: "Diani Beach, Kwale",
    price: "80,000",
    type: "Villa",
    bedrooms: 4,
    bathrooms: 3,
    area: "200 sqm",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    isForRent: true
  }
];

const Rent = () => {
  const location = useLocation();
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [budget, setBudget] = useState("");

  // Read URL parameters and set initial state
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const locationParam = urlParams.get('location');
    const typeParam = urlParams.get('type');
    const budgetParam = urlParams.get('budget');

    if (locationParam) setSearchLocation(locationParam);
    if (typeParam) setPropertyType(typeParam);
    if (budgetParam) setBudget(budgetParam);
  }, [location.search]);

  // Auto-filter properties when filters change
  const filteredProperties = useMemo(() => {
    let filtered = rentalProperties;

    if (searchLocation) {
      filtered = filtered.filter(property =>
        property.location.toLowerCase().includes(searchLocation.toLowerCase())
      );
    }

    if (propertyType && propertyType !== "Property Type") {
      filtered = filtered.filter(property =>
        property.type.toLowerCase() === propertyType.toLowerCase()
      );
    }

    if (budget && budget !== "Budget (KES)") {
      const priceRange = budget.replace(/[^\d-+]/g, '').split('-');
      const minPrice = parseInt(priceRange[0]) || 0;
      const maxPrice = priceRange[1] ? parseInt(priceRange[1]) : (budget.includes('+') ? Infinity : minPrice + 50000);
      
      filtered = filtered.filter(property => {
        const propertyPrice = parseInt(property.price.replace(/,/g, ''));
        return propertyPrice >= minPrice && propertyPrice <= maxPrice;
      });
    }

    return filtered;
  }, [searchLocation, propertyType, budget]);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-earth py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Properties for Rent in Kenya
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find your perfect rental property from apartments to commercial spaces
            </p>
          </div>

          {/* Search Section */}
          <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-elegant max-w-4xl mx-auto">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                />
              </div>
              
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="px-4 py-4 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option>Property Type</option>
                <option>Apartment</option>
                <option>House</option>
                <option>Commercial</option>
                <option>Villa</option>
                <option>Penthouse</option>
              </select>
              
              <select
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                className="px-4 py-4 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option>Budget (KES)</option>
                <option>Under 50K</option>
                <option>50K - 100K</option>
                <option>100K - 200K</option>
                <option>200K+</option>
              </select>
              
              <Button variant="hero">
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-foreground">
              {filteredProperties.length} Properties Found
            </h2>
            <select className="px-4 py-2 border border-border rounded-lg bg-background text-foreground">
              <option>Sort by: Price (Low to High)</option>
              <option>Sort by: Price (High to Low)</option>
              <option>Sort by: Newest</option>
              <option>Sort by: Most Popular</option>
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((property) => (
              <PropertyCard key={property.id} {...property} />
            ))}
          </div>

          {filteredProperties.length === 0 && (
            <div className="text-center py-16">
              <p className="text-muted-foreground text-lg">
                No properties match your search criteria. Try adjusting your filters.
              </p>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Rent;