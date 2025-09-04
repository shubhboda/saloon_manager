import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import RegistrationForm from './components/RegistrationForm';
import TrustSignals from './components/TrustSignals';
import RegistrationBenefits from './components/RegistrationBenefits';

const Register = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/dashboard" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <Icon name="Scissors" size={20} color="white" />
              </div>
              <span className="text-xl font-semibold text-foreground">Saloon Manager</span>
            </Link>
            
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-sm text-muted-foreground hover:text-foreground salon-transition-micro"
              >
                Already have an account?
              </Link>
              <Link
                to="/login"
                className="bg-accent text-accent-foreground px-4 py-2 rounded-lg text-sm font-medium hover:bg-accent/90 salon-transition-micro"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </header>
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left Column - Registration Form */}
          <div className="order-2 lg:order-1">
            <RegistrationForm />
          </div>

          {/* Right Column - Benefits and Trust Signals */}
          <div className="order-1 lg:order-2 space-y-8">
            {/* Welcome Section */}
            <div className="text-center lg:text-left">
              <h2 className="text-2xl font-bold text-foreground mb-4">
                Join the Future of Salon Management
              </h2>
              <p className="text-muted-foreground leading-relaxed">
                Transform your salon operations with our comprehensive management platform. 
                Streamline appointments, manage staff, track inventory, and grow your business 
                with powerful analytics and automation tools.
              </p>
            </div>

            {/* Trust Signals */}
            <TrustSignals />

            {/* Benefits */}
            <div className="hidden lg:block">
              <RegistrationBenefits />
            </div>
          </div>
        </div>

        {/* Mobile Benefits Section */}
        <div className="lg:hidden mt-12">
          <RegistrationBenefits />
        </div>
      </main>
      {/* Footer */}
      <footer className="bg-card border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                  <Icon name="Scissors" size={20} color="white" />
                </div>
                <span className="text-xl font-semibold text-foreground">Saloon Manager</span>
              </div>
              <p className="text-sm text-muted-foreground mb-4 max-w-md">
                The complete salon management solution trusted by thousands of beauty professionals worldwide. 
                Streamline your operations and grow your business with our powerful platform.
              </p>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">support@saloonmanager.com</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">1-800-SALOON</span>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Quick Links</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Features', href: '#' },
                  { label: 'Pricing', href: '#' },
                  { label: 'Support', href: '#' },
                  { label: 'Documentation', href: '#' }
                ]?.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link?.href}
                      className="text-sm text-muted-foreground hover:text-foreground salon-transition-micro"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="text-sm font-semibold text-foreground mb-4">Legal</h4>
              <ul className="space-y-2">
                {[
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                  { label: 'Cookie Policy', href: '#' },
                  { label: 'GDPR', href: '#' }
                ]?.map((link, index) => (
                  <li key={index}>
                    <a
                      href={link?.href}
                      className="text-sm text-muted-foreground hover:text-foreground salon-transition-micro"
                    >
                      {link?.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Bottom Footer */}
          <div className="border-t border-border pt-8 mt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} Saloon Manager. All rights reserved.
              </p>
              <div className="flex items-center space-x-6 mt-4 md:mt-0">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-success" />
                  <span className="text-sm text-muted-foreground">SSL Secured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Lock" size={16} className="text-accent" />
                  <span className="text-sm text-muted-foreground">GDPR Compliant</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Register;