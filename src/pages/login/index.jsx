import React, { useEffect } from 'react';
import LoginHeader from './components/LoginHeader';
import LoginForm from './components/LoginForm';
import AuthActions from './components/AuthActions';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';


const Login = () => {
  useEffect(() => {
    document.title = 'Login - Saloon Manager';
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5">
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Left Side - Login Form */}
        <div className="flex-1 flex items-center justify-center p-6 lg:p-12">
          <div className="w-full max-w-md space-y-8">
            <LoginHeader />
            <LoginForm />
            <AuthActions />
          </div>
        </div>

        {/* Right Side - Trust Signals & Testimonials */}
        <div className="flex-1 bg-card/50 backdrop-blur-sm border-l border-border p-6 lg:p-12 flex items-center justify-center">
          <div className="w-full max-w-lg">
            <TrustSignals />
          </div>
        </div>
      </div>
      {/* Mobile Bottom Section */}
      <div className="lg:hidden bg-card border-t border-border p-6">
        <div className="max-w-md mx-auto">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Icon name="Shield" size={16} className="text-success" />
                <span>SSL Secured</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Users" size={16} className="text-accent" />
                <span>500+ Salons</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} className="text-warning" />
                <span>4.9 Rating</span>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">
              © {new Date()?.getFullYear()} Saloon Manager. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;