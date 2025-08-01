import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Search, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroImage from "@/assets/hero-image.jpg";

const Hero = () => {
  const navigate = useNavigate();
  const [searchData, setSearchData] = useState({
    location: "",
    propertyType: "",
    budget: ""
  });

  const handleSearch = () => {
    const searchParams = new URLSearchParams();
    if (searchData.location) searchParams.set('location', searchData.location);
    if (searchData.propertyType) searchParams.set('type', searchData.propertyType);
    if (searchData.budget) searchParams.set('budget', searchData.budget);
    
    navigate(`/rent?${searchParams.toString()}`);
  };

  const handleInputChange = (field: string, value: string) => {
    setSearchData(prev => ({ ...prev, [field]: value }));
  };
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/60 to-background/40"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 animate-slide-up">
          Find Your Perfect Home in{" "}
          <span className="text-transparent bg-gradient-hero bg-clip-text">Kenya</span>
        </h1>
        
        <p className="text-lg sm:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-slide-up">
          Discover beautiful homes, apartments, and commercial properties across Kenya. 
          From Nairobi to Mombasa, find your dream property today.
        </p>

        {/* Search Bar */}
        <div className="bg-card/95 backdrop-blur-sm rounded-2xl p-6 shadow-elegant mb-8 animate-slide-up">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <input
                type="text"
                placeholder="City, county, or area (e.g., Nairobi, Mombasa)"
                value={searchData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                className="w-full pl-12 pr-4 py-4 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
              />
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <select 
                value={searchData.propertyType}
                onChange={(e) => handleInputChange('propertyType', e.target.value)}
                className="px-4 py-4 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Property Type</option>
                <option value="apartment">Apartment</option>
                <option value="house">House</option>
                <option value="commercial">Commercial</option>
                <option value="land">Land</option>
              </select>
              
              <select 
                value={searchData.budget}
                onChange={(e) => handleInputChange('budget', e.target.value)}
                className="px-4 py-4 border border-border rounded-lg bg-background text-foreground focus:ring-2 focus:ring-primary focus:border-transparent"
              >
                <option value="">Budget (KES)</option>
                <option value="0-50000">Under 50K</option>
                <option value="50000-100000">50K - 100K</option>
                <option value="100000-200000">100K - 200K</option>
                <option value="200000+">200K+</option>
              </select>
              
              <Button variant="hero" size="lg" onClick={handleSearch}>
                <Search className="h-5 w-5" />
                Search
              </Button>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
          <Button variant="safari" size="lg" onClick={() => navigate('/rent')}>
            Browse Rentals
          </Button>
          <Button variant="secondary" size="lg" onClick={() => navigate('/buy')}>
            Properties for Sale
          </Button>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 right-20 w-20 h-20 bg-primary/10 rounded-full animate-float hidden lg:block"></div>
      <div className="absolute bottom-32 left-16 w-12 h-12 bg-secondary/20 rounded-full animate-float hidden lg:block" style={{ animationDelay: '2s' }}></div>
      <div className="absolute top-1/3 left-1/4 w-6 h-6 bg-accent/30 rounded-full animate-float hidden lg:block" style={{ animationDelay: '4s' }}></div>
    </section>
  );
};

export default Hero;