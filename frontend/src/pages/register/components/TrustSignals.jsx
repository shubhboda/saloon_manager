import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const trustFeatures = [
    {
      icon: 'Shield',
      title: 'Secure & Encrypted',
      description: 'Your data is protected with bank-level security'
    },
    {
      icon: 'Users',
      title: '10,000+ Users',
      description: 'Trusted by salon professionals worldwide'
    },
    {
      icon: 'Award',
      title: 'Industry Leader',
      description: 'Award-winning salon management platform'
    },
    {
      icon: 'Clock',
      title: '24/7 Support',
      description: 'Round-the-clock customer assistance'
    }
  ];

  const securityBadges = [
    {
      name: 'SSL Certificate',
      icon: 'Lock',
      color: 'text-success'
    },
    {
      name: 'GDPR Compliant',
      icon: 'ShieldCheck',
      color: 'text-accent'
    },
    {
      name: 'SOC 2 Certified',
      icon: 'Certificate',
      color: 'text-primary'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Trust Features */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {trustFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-4 bg-card rounded-lg salon-shadow-card"
          >
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={20} className="text-accent" />
            </div>
            <div>
              <h4 className="text-sm font-medium text-foreground mb-1">
                {feature?.title}
              </h4>
              <p className="text-xs text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      {/* Security Badges */}
      <div className="bg-muted/50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-foreground mb-3 text-center">
          Security & Compliance
        </h4>
        <div className="flex items-center justify-center space-x-6">
          {securityBadges?.map((badge, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name={badge?.icon} size={16} className={badge?.color} />
              <span className="text-xs font-medium text-muted-foreground">
                {badge?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
      {/* Testimonial */}
      <div className="bg-card rounded-lg p-6 salon-shadow-card">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-gradient-to-br from-accent to-accent/80 rounded-full flex items-center justify-center">
            <span className="text-white font-semibold text-sm">SM</span>
          </div>
          <div>
            <h4 className="text-sm font-medium text-foreground">SHUBH BODA</h4>
            <p className="text-xs text-muted-foreground">Saloon Owner</p>
          </div>
        </div>
        <blockquote className="text-sm text-muted-foreground italic">
          "Saloon Manager transformed our business operations. The registration process was seamless, and we were up and running in minutes. Highly recommended!"
        </blockquote>
        <div className="flex items-center mt-3">
          {[...Array(5)]?.map((_, i) => (
            <Icon key={i} name="Star" size={14} className="text-warning fill-current" />
          ))}
          <span className="text-xs text-muted-foreground ml-2">5.0 rating</span>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;