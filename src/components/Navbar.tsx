import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Search, User, MapPin, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/useAuth";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img 
                src="/propalink.png" 
                alt="PropaLink Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold ml-2">
                <span className="text-foreground">Propa</span>
                <span className="text-green-600">Link</span>
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-foreground hover:text-primary transition-colors">Home</Link>
            <Link to="/rent" className="text-foreground hover:text-primary transition-colors">Rent</Link>
            <Link to="/buy" className="text-foreground hover:text-primary transition-colors">Buy</Link>
            <Link to="/sell" className="text-foreground hover:text-primary transition-colors">Sell</Link>
            <Link to="/about" className="text-foreground hover:text-primary transition-colors">About</Link>
            <Link to="/contact" className="text-foreground hover:text-primary transition-colors">Contact</Link>
          </div>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground">
                  Welcome, {user.email}
                </span>
                <Button variant="ghost" size="sm" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" />
                  Sign Out
                </Button>
              </>
            ) : (
              <Button variant="ghost" size="sm" asChild>
                <Link to="/signin">
                  <User className="h-4 w-4" />
                  Sign In
                </Link>
              </Button>
            )}
            <Button variant="default" size="sm" asChild>
              <Link to="/sell">List Property</Link>
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </Button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border animate-slide-up">
            <div className="flex flex-col space-y-4">
              <Link to="/" className="block py-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/rent" className="block py-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Rent</Link>
              <Link to="/buy" className="block py-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Buy</Link>
              <Link to="/sell" className="block py-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Sell</Link>
              <Link to="/about" className="block py-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>About</Link>
              <Link to="/contact" className="block py-2 text-foreground hover:text-primary" onClick={() => setIsMenuOpen(false)}>Contact</Link>
              <div className="flex flex-col space-y-2 pt-4 border-t border-border">
                {user ? (
                  <>
                    <span className="text-sm text-muted-foreground px-3">
                      Welcome, {user.email}
                    </span>
                    <Button variant="ghost" size="sm" className="justify-start" onClick={handleSignOut}>
                      <LogOut className="h-4 w-4" />
                      Sign Out
                    </Button>
                  </>
                ) : (
                  <Button variant="ghost" size="sm" className="justify-start" asChild>
                    <Link to="/signin">
                      <User className="h-4 w-4" />
                      Sign In
                    </Link>
                  </Button>
                )}
                <Button variant="default" size="sm" asChild>
                  <Link to="/sell">List Property</Link>
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;