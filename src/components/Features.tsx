import { MapPin, Search, User, Calendar } from "lucide-react";

const features = [
  {
    icon: Search,
    title: "Smart Property Search",
    description: "Advanced filters to find exactly what you're looking for across Kenya"
  },
  {
    icon: MapPin,
    title: "Location Intelligence",
    description: "Detailed neighborhood insights and Google Maps integration"
  },
  {
    icon: User,
    title: "Verified Listings",
    description: "All properties verified by our team for authenticity and quality"
  },
  {
    icon: Calendar,
    title: "Easy Scheduling",
    description: "Book property viewings and manage appointments seamlessly"
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Why Choose SafiHomes?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            We make finding and renting properties in Kenya simple, secure, and transparent
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div 
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300"
              >
                <div className="w-16 h-16 bg-gradient-safari rounded-xl flex items-center justify-center mx-auto mb-6 shadow-soft group-hover:shadow-elegant transition-shadow duration-300">
                  <Icon className="h-8 w-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Features;