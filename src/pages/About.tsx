import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { MapPin, User, Calendar, Search } from "lucide-react";

const About = () => {
  const stats = [
    { number: "10,000+", label: "Properties Listed" },
    { number: "5,000+", label: "Happy Customers" },
    { number: "47", label: "Counties Covered" },
    { number: "24/7", label: "Customer Support" }
  ];

  const team = [
    {
      name: "Sarah Wanjiku",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=300&h=300&fit=crop",
      bio: "10+ years in Kenyan real estate market"
    },
    {
      name: "James Kimani",
      role: "CTO",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=300&fit=crop",
      bio: "Expert in property technology solutions"
    },
    {
      name: "Grace Ochieng",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=300&h=300&fit=crop",
      bio: "Specializes in customer experience"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Hero Section */}
      <section className="bg-gradient-earth py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              About SafiHomes Kenya
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              We're revolutionizing the Kenyan real estate market by making property 
              search, rental, and purchase processes simple, transparent, and accessible to everyone.
            </p>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-foreground mb-6">Our Mission</h2>
              <p className="text-lg text-muted-foreground mb-6">
                To democratize access to quality housing across Kenya by connecting 
                property seekers with verified listings and trusted agents through 
                innovative technology.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                We believe everyone deserves a safe, comfortable home, and we're 
                committed to making the journey to find it as smooth as possible.
              </p>
              <div className="grid grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-2xl font-bold text-primary">{stat.number}</div>
                    <div className="text-sm text-muted-foreground">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=400&fit=crop"
                alt="Modern Kenyan homes"
                className="rounded-2xl shadow-elegant"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gradient-earth">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              What Makes Us Different
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not just another property listing site. We're your trusted partner 
              in finding the perfect home in Kenya.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center bg-card p-6 rounded-xl shadow-soft">
              <div className="w-12 h-12 bg-gradient-safari rounded-lg flex items-center justify-center mx-auto mb-4">
                <Search className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Verified Listings
              </h3>
              <p className="text-muted-foreground text-sm">
                Every property is personally verified by our team
              </p>
            </div>

            <div className="text-center bg-card p-6 rounded-xl shadow-soft">
              <div className="w-12 h-12 bg-gradient-safari rounded-lg flex items-center justify-center mx-auto mb-4">
                <MapPin className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Local Expertise
              </h3>
              <p className="text-muted-foreground text-sm">
                Deep knowledge of all 47 counties in Kenya
              </p>
            </div>

            <div className="text-center bg-card p-6 rounded-xl shadow-soft">
              <div className="w-12 h-12 bg-gradient-safari rounded-lg flex items-center justify-center mx-auto mb-4">
                <User className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Personal Support
              </h3>
              <p className="text-muted-foreground text-sm">
                Dedicated agent support throughout your journey
              </p>
            </div>

            <div className="text-center bg-card p-6 rounded-xl shadow-soft">
              <div className="w-12 h-12 bg-gradient-safari rounded-lg flex items-center justify-center mx-auto mb-4">
                <Calendar className="h-6 w-6 text-primary-foreground" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Easy Scheduling
              </h3>
              <p className="text-muted-foreground text-sm">
                Book viewings and appointments with one click
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Meet Our Team
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The passionate individuals working to transform Kenya's real estate landscape
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center bg-card p-6 rounded-xl shadow-soft hover:shadow-elegant transition-shadow duration-300">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary font-medium mb-2">{member.role}</p>
                <p className="text-muted-foreground text-sm">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 bg-gradient-hero">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-primary-foreground mb-4">
            Ready to Find Your Dream Home?
          </h2>
          <p className="text-lg text-primary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of satisfied customers who found their perfect property through SafiHomes
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-background text-primary hover:bg-background/90 px-8 py-3 rounded-lg font-semibold shadow-soft hover:shadow-elegant transition-all duration-300">
              Start Your Search
            </button>
            <button className="border-2 border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary px-8 py-3 rounded-lg font-semibold transition-all duration-300">
              Contact Us
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;