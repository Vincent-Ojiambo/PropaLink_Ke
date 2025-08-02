import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Terms of Service
          </h1>
          <p className="text-muted-foreground mb-8">
            Last Updated: August 2, 2024
          </p>

          <div className="prose prose-lg text-foreground max-w-none">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
              <p className="mb-4">
                Welcome to PropaLink Kenya. These Terms of Service ("Terms") govern your use of our website and services. 
                By accessing or using our platform, you agree to be bound by these Terms and our Privacy Policy.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">2. Definitions</h2>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li><strong>"Platform"</strong> refers to the PropaLink website and mobile applications.</li>
                <li><strong>"User"</strong> means any person who accesses or uses our Platform.</li>
                <li><strong>"Content"</strong> includes all text, images, videos, and other materials on our Platform.</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">3. Account Registration</h2>
              <p className="mb-4">
                To access certain features of our Platform, you may need to create an account. You agree to provide accurate 
                and complete information and to keep your account credentials secure.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">4. Property Listings</h2>
              <p className="mb-4">
                Property listings on our Platform are provided by third parties. We do not guarantee the accuracy, 
                completeness, or reliability of any listing. Users are responsible for verifying all property details 
                before making any transactions.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">5. User Conduct</h2>
              <p className="mb-4">You agree not to:</p>
              <ul className="list-disc pl-6 mb-4 space-y-2">
                <li>Post false or misleading information</li>
                <li>Use the Platform for any illegal purpose</li>
                <li>Harass or harm other users</li>
                <li>Attempt to gain unauthorized access to our systems</li>
              </ul>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">6. Intellectual Property</h2>
              <p className="mb-4">
                All content on our Platform, including text, graphics, logos, and software, is the property of PropaLink 
                or its licensors and is protected by intellectual property laws.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">7. Limitation of Liability</h2>
              <p className="mb-4">
                PropaLink shall not be liable for any indirect, incidental, special, or consequential damages arising 
                from your use of the Platform or any transactions conducted through it.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">8. Changes to Terms</h2>
              <p className="mb-4">
                We may update these Terms from time to time. We will notify users of any significant changes by posting 
                the new Terms on our Platform.
              </p>
            </section>

            <section className="mb-8">
              <h2 className="text-2xl font-semibold mb-4">9. Governing Law</h2>
              <p className="mb-4">
                These Terms shall be governed by and construed in accordance with the laws of Kenya. Any disputes shall 
                be resolved in the courts of Kenya.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">10. Contact Us</h2>
              <p className="mb-4">
                If you have any questions about these Terms, please contact us at:
              </p>
              <p>
                <strong>Email:</strong> legal@propalink.co.ke<br />
                <strong>Address:</strong> P.O. Box 12345-00100, Nairobi, Kenya
              </p>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default TermsOfService;
