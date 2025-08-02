import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { MapPin, Calendar, User, Search, Loader2 } from "lucide-react";
import { sampleProperties } from "../data/sampleProperties";

interface Property {
  id: string;
  title: string;
  location: string;
  price: string;
  type: string;
  bedrooms?: number;
  bathrooms?: number;
  area?: string;
  description: string;
  isForRent?: boolean;
  images: string[];
  amenities: string[];
  agent: {
    name: string;
    phone: string;
    email: string;
    image: string;
  };
}

const PropertyDetails = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [activeImage, setActiveImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [property, setProperty] = useState<Property | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });
  
  const [showScheduleModal, setShowScheduleModal] = useState(false);
  const [scheduleForm, setScheduleForm] = useState({
    date: "",
    time: "",
    name: "",
    phone: "",
    email: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        setLoading(true);
        // In a real app, you would fetch from an API:
        // const response = await fetch(`/api/properties/${id}`);
        // const data = await response.json();
        
        // For now, we'll use the sample data
        const foundProperty = sampleProperties.find(p => p.id === id);
        
        if (foundProperty) {
          // Add additional details that would come from the API
          const propertyWithDetails: Property = {
            ...foundProperty,
            description: `Beautiful ${foundProperty.type.toLowerCase()} in ${foundProperty.location.split(',')[0]}, featuring modern finishes, spacious living areas, and stunning views. This property includes ${foundProperty.bedrooms} bedrooms and ${foundProperty.bathrooms} bathrooms.`,
            images: [
              foundProperty.image,
              `https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=800&h=600&fit=crop&id=${foundProperty.id}`,
              `https://images.unsplash.com/photo-1560185007-cde436f6a4d0?w=800&h=600&fit=crop&id=${foundProperty.id}`,
              `https://images.unsplash.com/photo-1571055107559-3e67626fa8be?w=800&h=600&fit=crop&id=${foundProperty.id}`
            ],
            amenities: [
              "24/7 Security", 
              "Parking", 
              "Water Backup", 
              "CCTV",
              foundProperty.bedrooms > 2 ? "Gym" : "",
              foundProperty.bedrooms > 2 ? "Swimming Pool" : ""
            ].filter(Boolean) as string[],
            agent: {
              name: "Vincent Ojiambo",
              phone: "+254 700 000 000",
              email: "info@propalink.co.ke",
              image: "/img.jpg"
            }
          };
          
          setProperty(propertyWithDetails);
        } else {
          setError("Property not found");
          // Optionally redirect to 404 after a delay
          setTimeout(() => navigate("/"), 2000);
        }
      } catch (err) {
        console.error("Error fetching property:", err);
        setError("Failed to load property details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProperty();
    }
  }, [id, navigate]);
  // Property data will be loaded from the sample data or API

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Contact form submitted:", contactForm);
    alert("Your inquiry has been sent! The agent will contact you within 24 hours.");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleScheduleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setScheduleForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCallAgent = () => {
    if (property?.agent.phone) {
      window.location.href = `tel:${property.agent.phone.replace(/\D/g, '')}`;
    }
  };

  const handleScheduleViewing = (e: React.FormEvent) => {
    e.preventDefault();
    if (!property) return;
    
    setIsSubmitting(true);
    
    // In a real app, you would send this data to your backend
    console.log('Scheduling viewing:', {
      propertyId: property.id,
      propertyTitle: property.title,
      ...scheduleForm
    });
    
    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setShowScheduleModal(false);
      alert('Viewing scheduled successfully! The agent will contact you shortly to confirm.');
      // Reset form
      setScheduleForm({
        date: '',
        time: '',
        name: '',
        phone: '',
        email: ''
      });
    }, 1500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-primary animate-spin mx-auto mb-4" />
          <p className="text-foreground">Loading property details...</p>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center p-6 max-w-md">
          <div className="text-destructive text-2xl mb-4">
            {error || "Property not found"}
          </div>
          <Button onClick={() => navigate('/')} variant="property">
            Back to Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <Navbar />
      <div className="flex-grow">
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
                {property.bedrooms !== undefined && (
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{property.bedrooms}</div>
                    <div className="text-sm text-muted-foreground">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms !== undefined && (
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{property.bathrooms}</div>
                    <div className="text-sm text-muted-foreground">Bathrooms</div>
                  </div>
                )}
                {property.area && (
                  <div className="text-center">
                    <div className="text-xl font-bold text-foreground">{property.area}</div>
                    <div className="text-sm text-muted-foreground">Area</div>
                  </div>
                )}
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
                <Button 
                  variant="hero" 
                  className="w-full"
                  onClick={() => setShowScheduleModal(true)}
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Schedule Viewing
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full"
                  onClick={handleCallAgent}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
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
                  <User className="h-4 w-4 mr-2" />
                  Send Inquiry
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />

      {/* Schedule Viewing Modal */}
      {showScheduleModal && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-card rounded-xl shadow-2xl w-full max-w-md p-6 relative">
            <button
              onClick={() => setShowScheduleModal(false)}
              className="absolute top-4 right-4 text-muted-foreground hover:text-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <h2 className="text-2xl font-bold text-foreground mb-2">Schedule a Viewing</h2>
            <p className="text-muted-foreground mb-6">
              Fill in your details to schedule a viewing for {property?.title}
            </p>
            
            <form onSubmit={handleScheduleViewing} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Date <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="date"
                    name="date"
                    value={scheduleForm.date}
                    onChange={handleScheduleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    required
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Time <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="time"
                    name="time"
                    value={scheduleForm.time}
                    onChange={handleScheduleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    required
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-1">
                  Full Name <span className="text-destructive">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={scheduleForm.name}
                  onChange={handleScheduleInputChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                  required
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Email <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={scheduleForm.email}
                    onChange={handleScheduleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1">
                    Phone <span className="text-destructive">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={scheduleForm.phone}
                    onChange={handleScheduleInputChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent bg-background text-foreground"
                    required
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <Button 
                  type="submit" 
                  className="w-full"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Scheduling...
                    </>
                  ) : (
                    'Schedule Viewing'
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PropertyDetails;