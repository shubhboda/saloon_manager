import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'SSL Encrypted',
      description: 'Your data is protected with 256-bit encryption'
    },
    {
      icon: 'Lock',
      title: 'Secure Login',
      description: 'Multi-factor authentication available'
    },
    {
      icon: 'CheckCircle',
      title: 'Verified Platform',
      description: 'Trusted by 500+ salons worldwide'
    }
  ];

  const testimonials = [
    {
      name: 'Sarah Johnson',
      role: 'Salon Owner',
      business: 'Elegance Hair Studio',
      content: `This platform transformed our booking system. We've seen a 40% increase in appointments and our staff loves the intuitive interface.`,
      rating: 5
    },
    {
      name: 'Michael Chen',role: 'Manager',business: 'Urban Beauty Lounge',
      content: `The customer management features are outstanding. We can track preferences and provide personalized service like never before.`,
      rating: 5
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div key={index} className="flex flex-col items-center text-center p-4 bg-muted/50 rounded-lg">
            <div className="w-10 h-10 bg-success/10 rounded-full flex items-center justify-center mb-2">
              <Icon name={feature?.icon} size={20} className="text-success" />
            </div>
            <h4 className="font-medium text-sm text-foreground mb-1">{feature?.title}</h4>
            <p className="text-xs text-muted-foreground">{feature?.description}</p>
          </div>
        ))}
      </div>
      {/* Testimonials */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-foreground text-center">Trusted by Professionals</h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="bg-card border border-border rounded-lg p-4 salon-shadow-card">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(testimonial?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={12} className="text-warning fill-current" />
                    ))}
                  </div>
                  <p className="text-sm text-foreground mb-2">{testimonial?.content}</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">{testimonial?.name}</span>
                    <span className="mx-1">•</span>
                    <span>{testimonial?.role}</span>
                    <span className="mx-1">•</span>
                    <span>{testimonial?.business}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;