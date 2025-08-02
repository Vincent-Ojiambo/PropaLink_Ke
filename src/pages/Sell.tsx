import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Upload, Home } from "lucide-react";

const Sell = () => {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    price: "",
    propertyType: "",
    bedrooms: "",
    bathrooms: "",
    area: "",
    description: "",
    contact: "",
    email: ""
  });

  // Track if land is selected to conditionally show/hide fields
  const isLand = formData.propertyType === 'land';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission - would typically send to backend
    console.log("Property listing data:", formData);
    alert("Property listing submitted successfully! We'll review and publish it within 24 hours.");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header Section */}
      <section className="bg-gradient-earth py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              List Your Property
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Reach thousands of potential buyers and tenants across Kenya
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
          <form onSubmit={handleSubmit} className="bg-card rounded-2xl shadow-elegant p-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Property Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Property Title *
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder="e.g., Modern 3-Bedroom Apartment in Westlands"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                />
              </div>

              {/* Location */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Location *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                  <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleInputChange}
                    placeholder="City, Area, County"
                    className="w-full pl-10 pr-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    required
                  />
                </div>
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Price (KES) *
                </label>
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="e.g., 120,000 or 15,000,000"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                />
              </div>

              {/* Property Type */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Property Type *
                </label>
                <select
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={(e) => {
                    handleInputChange(e);
                    // Clear bedrooms and bathrooms when switching to land
                    if (e.target.value === 'land') {
                      setFormData(prev => ({
                        ...prev,
                        bedrooms: '',
                        bathrooms: ''
                      }));
                    }
                  }}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                >
                  <option value="">Select Property Type</option>
                  <option value="apartment">Apartment</option>
                  <option value="house">House</option>
                  <option value="villa">Villa</option>
                  <option value="penthouse">Penthouse</option>
                  <option value="commercial">Commercial</option>
                  <option value="land">Land</option>
                </select>
              </div>

              {/* Bedrooms - Hidden for land */}
              {!isLand && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Bedrooms *
                    </label>
                    <select
                      name="bedrooms"
                      value={formData.bedrooms}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                      required={!isLand}
                    >
                      <option value="">Select Bedrooms</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5+">5+</option>
                    </select>
                  </div>

                  {/* Bathrooms - Hidden for land */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">
                      Bathrooms *
                    </label>
                    <select
                      name="bathrooms"
                      value={formData.bathrooms}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                      required={!isLand}
                    >
                      <option value="">Select Bathrooms</option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5+">5+</option>
                    </select>
                  </div>
                </>
              )}

              {/* Area - Always visible but with dynamic placeholder */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Area *
                </label>
                <input
                  type="text"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  placeholder={isLand ? "e.g., 1/8 acre or 50x100ft" : "e.g., 120 sqm or 3,000 sqft"}
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Description *
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  placeholder="Describe your property, amenities, neighborhood, etc."
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                />
              </div>

              {/* Contact Information */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Contact Number *
                </label>
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleInputChange}
                  placeholder="e.g., +254 700 000 000"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                />
              </div>

              {/* Photo Upload */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-foreground mb-2">
                  Property Photos
                </label>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-2">
                    Click to upload or drag and drop photos
                  </p>
                  <p className="text-sm text-muted-foreground">
                    PNG, JPG up to 10MB each (Max 10 photos)
                  </p>
                  <Button variant="outline" className="mt-4">
                    Choose Photos
                  </Button>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 text-center">
              <Button type="submit" variant="hero" size="lg">
                <Home className="h-5 w-5" />
                List My Property
              </Button>
              <p className="text-sm text-muted-foreground mt-4">
                By submitting, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>
          </form>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Sell;