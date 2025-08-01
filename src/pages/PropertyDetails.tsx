import { useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, User, Search } from "lucide-react";

const PropertyDetails = () => {
  const { id } = useParams();
  const [activeImage, setActiveImage] = useState(0);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // Sample property data - in real app, this would be fetched by ID
  const property = {
    id: "1",
    title: "Modern 3-Bedroom Apartment in Westlands",
    location: "Westlands, Nairobi",
    price: "120,000",
    type: "Apartment",
    bedrooms: 3,
    bathrooms: 2,
    area: "120 sqm",
    description: "Beautiful modern apartment in the heart of Westlands, featuring contemporary finishes, spacious living areas, and stunning city views. The property includes a modern kitchen with built-in appliances, master bedroom with en-suite bathroom, and access to building amenities including gym, pool, and 24/7 security.",
    isForRent: true,
    images: [
      "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop"
    ],
    amenities: [
      "24/7 Security", "Swimming Pool", "Gym", "Parking", "Generator", "Water Backup", "CCTV", "Elevator"
    ],
    agent: {
      name: "Mary Njoki",
      phone: "+254 700 123 456",
      email: "mary@safihomes.co.ke",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop"
    }
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    alert("Your inquiry has been sent! The agent will contact you within 24 hours.");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setContactForm({
      ...contactForm,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Gallery */}
            <div className="mb-8">
              <div className="relative mb-4">
                <img 
                  src={property.images[activeImage]}
                  alt={property.title}
                  className="w-full h-96 object-cover rounded-xl shadow-elegant"
                />
                <div className="absolute top-4 right-4">
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    property.isForRent 
                      ? 'bg-secondary text-secondary-foreground' 
                      : 'bg-primary text-primary-foreground'
                  }`}>
                    {property.isForRent ? 'For Rent' : 'For Sale'}
                  </span>
                </div>
              </div>
              
              <div className="flex gap-4 overflow-x-auto pb-2">
                {property.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Property ${index + 1}`}
                    className={`w-20 h-20 object-cover rounded-lg cursor-pointer transition-all ${
                      activeImage === index ? 'ring-2 ring-primary' : 'opacity-70 hover:opacity-100'
                    }`}
                    onClick={() => setActiveImage(index)}
                  />
                ))}
              </div>
            </div>

            {/* Property Info */}
            <div className="bg-card rounded-xl shadow-soft p-6 mb-8">
              <h1 className="text-3xl font-bold text-foreground mb-4">
                {property.title}
              </h1>
              
              <div className="flex items-center text-muted-foreground mb-4">
                <MapPin className="h-5 w-5 mr-2" />
                <span>{property.location}</span>
              </div>

              <div className="flex items-center justify-between mb-6">
                <div className="text-3xl font-bold text-primary">
                  KES {property.price}
                  {property.isForRent && <span className="text-lg font-normal text-muted-foreground">/month</span>}
                </div>
                <div className="text-muted-foreground bg-muted px-3 py-1 rounded">
                  {property.type}
                </div>
              </div>

              {/* Property Details */}
              <div className="grid grid-cols-3 gap-4 mb-6 p-4 bg-gradient-earth rounded-lg">
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">{property.bedrooms}</div>
                  <div className="text-sm text-muted-foreground">Bedrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">{property.bathrooms}</div>
                  <div className="text-sm text-muted-foreground">Bathrooms</div>
                </div>
                <div className="text-center">
                  <div className="text-xl font-bold text-foreground">{property.area}</div>
                  <div className="text-sm text-muted-foreground">Area</div>
                </div>
              </div>

              {/* Description */}
              <div className="mb-6">
                <h3 className="text-xl font-semibold text-foreground mb-3">Description</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {property.description}
                </p>
              </div>

              {/* Amenities */}
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-3">Amenities</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                  {property.amenities.map((amenity, index) => (
                    <div key={index} className="bg-muted px-3 py-2 rounded-lg text-sm text-muted-foreground text-center">
                      {amenity}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Agent Info */}
            <div className="bg-card rounded-xl shadow-soft p-6 mb-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Contact Agent</h3>
              
              <div className="flex items-center mb-4">
                <img 
                  src={property.agent.image}
                  alt={property.agent.name}
                  className="w-12 h-12 rounded-full mr-3"
                />
                <div>
                  <div className="font-semibold text-foreground">{property.agent.name}</div>
                  <div className="text-sm text-muted-foreground">Licensed Agent</div>
                </div>
              </div>

              <div className="space-y-2 mb-6">
                <div className="text-sm">
                  <span className="text-muted-foreground">Phone: </span>
                  <span className="text-foreground">{property.agent.phone}</span>
                </div>
                <div className="text-sm">
                  <span className="text-muted-foreground">Email: </span>
                  <span className="text-foreground">{property.agent.email}</span>
                </div>
              </div>

              <div className="space-y-2">
                <Button variant="hero" className="w-full">
                  <Calendar className="h-4 w-4" />
                  Schedule Viewing
                </Button>
                <Button variant="outline" className="w-full">
                  Call Agent
                </Button>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-card rounded-xl shadow-soft p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Send Inquiry</h3>
              
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={contactForm.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                />
                
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={contactForm.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                />
                
                <input
                  type="tel"
                  name="phone"
                  placeholder="Your Phone"
                  value={contactForm.phone}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                />
                
                <textarea
                  name="message"
                  placeholder="Your message..."
                  value={contactForm.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                />
                
                <Button type="submit" variant="safari" className="w-full">
                  <User className="h-4 w-4" />
                  Send Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PropertyDetails;