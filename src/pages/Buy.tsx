import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PropertyCard from "@/components/PropertyCard";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";

// Sample properties for sale
const saleProperties = [
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
    id: "9",
    title: "Modern Family Home in Kileleshwa",
    location: "Kileleshwa, Nairobi",
    price: "18,500,000",
    type: "House",
    bedrooms: 4,
    bathrooms: 3,
    area: "280 sqm",
    image: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=300&fit=crop",
    isForRent: false
  },
  {
    id: "10",
    title: "Investment Apartment Building",
    location: "Ruaka, Kiambu",
    price: "45,000,000",
    type: "Commercial",
    area: "1200 sqm",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
    isForRent: false
  },
  {
    id: "11",
    title: "Luxury Penthouse Suite",
    location: "Upperhill, Nairobi",
    price: "35,000,000",
    type: "Penthouse",
    bedrooms: 3,
    bathrooms: 3,
    area: "220 sqm",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=300&fit=crop",
    isForRent: false
  },
  {
    id: "12",
    title: "Prime Land for Development",
    location: "Kiambu Road, Kiambu",
    price: "12,000,000",
    type: "Land",
    area: "2 acres",
    image: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=400&h=300&fit=crop",
    isForRent: false
  }
];

const Buy = () => {
  const [searchLocation, setSearchLocation] = useState("");
  const [propertyType, setPropertyType] = useState("");
  const [priceRange, setPriceRange] = useState("");
  const [filteredProperties, setFilteredProperties] = useState(saleProperties);

  const handleSearch = () => {
    let filtered = saleProperties;

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

    setFilteredProperties(filtered);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-earth py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              Properties for Sale in Kenya
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover your dream home, investment property, or commercial space
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
                <option>House</option>
                <option>Apartment</option>
                <option>Villa</option>
                <option>Penthouse</option>
                <option>Commercial</option>
                <option>Land</option>
              </select>
              
              <select
                value={priceRange}
                onChange={(e) => setPriceRange(e.target.value)}
                className="px-4 py-4 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option>Price Range (KES)</option>
                <option>Under 5M</option>
                <option>5M - 15M</option>
                <option>15M - 30M</option>
                <option>30M+</option>
              </select>
              
              <Button variant="hero" onClick={handleSearch}>
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
              {filteredProperties.length} Properties for Sale
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

export default Buy;