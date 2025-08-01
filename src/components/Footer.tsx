import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link to="/" className="flex items-center mb-4">
              <img 
                src="/propalink.png" 
                alt="PropaLink Logo" 
                className="h-8 w-auto"
              />
              <span className="text-xl font-bold ml-2">
                <span className="text-background">Propa</span>
                <span className="text-green-400">Link</span>
              </span>
            </Link>
            <p className="text-background/80 mb-4 max-w-md">
              Kenya's leading real estate platform. Find your perfect home, apartment, 
              or commercial property across all counties in Kenya.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors">
                Facebook
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors">
                Twitter
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-background/60 hover:text-background transition-colors">
                Instagram
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/rent" className="text-background/80 hover:text-background transition-colors">Properties for Rent</Link></li>
              <li><Link to="/buy" className="text-background/80 hover:text-background transition-colors">Properties for Sale</Link></li>
              <li><Link to="/buy?type=commercial" className="text-background/80 hover:text-background transition-colors">Commercial Properties</Link></li>
              <li><Link to="/buy?type=land" className="text-background/80 hover:text-background transition-colors">Land for Sale</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-background/80 hover:text-background transition-colors">Help Center</Link></li>
              <li><Link to="/about" className="text-background/80 hover:text-background transition-colors">Contact Us</Link></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-background/80 hover:text-background transition-colors">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 mt-8 pt-8 text-center">
          <p className="text-background/60">
            © 2024 PropaLink Kenya. All rights reserved. | Proudly serving all 47 counties of Kenya
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;