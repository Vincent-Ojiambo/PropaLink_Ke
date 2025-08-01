import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Search, Filter } from "lucide-react";
import PropertyCard from "./PropertyCard";

// Sample property data - in a real app, this would come from an API
const sampleProperties = [
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
    id: "2",
    title: "Luxury Villa with Ocean View",
    location: "Nyali, Mombasa",
    price: "25,000,000",
    type: "Villa",
    bedrooms: 5,
    bathrooms: 4,
    area: "400 sqm",
    image: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=300&fit=crop",
    isForRent: false
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
    id: "5",
    title: "Beachfront Apartment",
    location: "Kilifi, Coast",
    price: "8,500,000",
    type: "Apartment",
    bedrooms: 2,
    bathrooms: 2,
    area: "95 sqm",
    image: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=400&h=300&fit=crop",
    isForRent: false
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
  }
];

const FeaturedProperties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("");
  const [filterPurpose, setFilterPurpose] = useState(""); // rent or sale

  const filteredProperties = useMemo(() => {
    return sampleProperties.filter(property => {
      const matchesSearch = !searchTerm || 
        property.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesType = !filterType || property.type.toLowerCase() === filterType.toLowerCase();
      
      const matchesPurpose = !filterPurpose || 
        (filterPurpose === "rent" && property.isForRent) ||
        (filterPurpose === "sale" && !property.isForRent);
      
      return matchesSearch && matchesType && matchesPurpose;
    });
  }, [searchTerm, filterType, filterPurpose]);

  return (
    <section className="py-16 bg-gradient-earth">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Featured Properties
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Discover our handpicked selection of premium properties across Kenya
          </p>
        </div>

        {/* Search and Filter Controls */}
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-elegant mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <select 
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">All Types</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="villa">Villa</option>
                <option value="commercial">Commercial</option>
              </select>
              
              <select 
                value={filterPurpose}
                onChange={(e) => setFilterPurpose(e.target.value)}
                className="px-4 py-3 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Rent & Sale</option>
                <option value="rent">For Rent</option>
                <option value="sale">For Sale</option>
              </select>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProperties.length > 0 ? (
            filteredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                {...property}
              />
            ))
          ) : (
            <div className="col-span-full text-center py-12">
              <p className="text-muted-foreground text-lg">No properties found matching your criteria.</p>
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setFilterType("");
                  setFilterPurpose("");
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}
        </div>

        <div className="text-center mt-12">
          <button className="bg-primary text-primary-foreground hover:bg-primary-glow px-8 py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all duration-300 hover:scale-105">
            View All Properties
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProperties;