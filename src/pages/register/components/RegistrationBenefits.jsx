import React from 'react';
import Icon from '../../../components/AppIcon';

const RegistrationBenefits = () => {
  const benefits = [
    {
      icon: 'Calendar',
      title: 'Smart Scheduling',
      description: 'Automated appointment booking with real-time availability and conflict prevention'
    },
    {
      icon: 'Users',
      title: 'Customer Management',
      description: 'Complete customer profiles with service history and personalized preferences'
    },
    {
      icon: 'BarChart3',
      title: 'Business Analytics',
      description: 'Detailed reports on revenue, performance metrics, and growth insights'
    },
    {
      icon: 'Smartphone',
      title: 'Mobile Access',
      description: 'Manage your salon on-the-go with our responsive mobile interface'
    },
    {
      icon: 'CreditCard',
      title: 'Payment Processing',
      description: 'Secure payment gateway with multiple payment options and automated billing'
    },
    {
      icon: 'MessageSquare',
      title: 'Communication Tools',
      description: 'Automated reminders, notifications, and customer communication features'
    }
  ];

  const pricingPlans = [
    {
      name: 'Starter',
      price: '$29',
      period: '/month',
      features: ['Up to 100 appointments', 'Basic reporting', 'Email support'],
      popular: false
    },
    {
      name: 'Professional',
      price: '$59',
      period: '/month',
      features: ['Unlimited appointments', 'Advanced analytics', 'Priority support', 'Staff management'],
      popular: true
    },
    {
      name: 'Enterprise',
      price: '$99',
      period: '/month',
      features: ['Multi-location support', 'Custom integrations', 'Dedicated account manager', 'White-label options'],
      popular: false
    }
  ];

  return (
    <div className="space-y-8">
      {/* Benefits Section */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-6 text-center">
          Why Choose Saloon Manager?
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {benefits?.map((benefit, index) => (
            <div
              key={index}
              className="flex items-start space-x-4 p-4 bg-card rounded-lg salon-shadow-card hover:shadow-lg salon-transition-micro"
            >
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                <Icon name={benefit?.icon} size={24} className="text-accent" />
              </div>
              <div>
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  {benefit?.title}
                </h4>
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {benefit?.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Pricing Preview */}
      <div className="bg-muted/30 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Choose Your Plan
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {pricingPlans?.map((plan, index) => (
            <div
              key={index}
              className={`relative bg-card rounded-lg p-4 salon-shadow-card ${
                plan?.popular ? 'ring-2 ring-accent' : ''
              }`}
            >
              {plan?.popular && (
                <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
                  <span className="bg-accent text-accent-foreground text-xs font-medium px-3 py-1 rounded-full">
                    Most Popular
                  </span>
                </div>
              )}
              
              <div className="text-center mb-4">
                <h4 className="text-sm font-semibold text-foreground mb-2">
                  {plan?.name}
                </h4>
                <div className="flex items-baseline justify-center">
                  <span className="text-2xl font-bold text-foreground">{plan?.price}</span>
                  <span className="text-sm text-muted-foreground">{plan?.period}</span>
                </div>
              </div>
              
              <ul className="space-y-2">
                {plan?.features?.map((feature, featureIndex) => (
                  <li key={featureIndex} className="flex items-center space-x-2">
                    <Icon name="Check" size={14} className="text-success flex-shrink-0" />
                    <span className="text-xs text-muted-foreground">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <p className="text-center text-xs text-muted-foreground mt-4">
          Start with a 14-day free trial. No credit card required.
        </p>
      </div>
      {/* Success Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { number: '10,000+', label: 'Active Users' },
          { number: '500K+', label: 'Appointments Booked' },
          { number: '99.9%', label: 'Uptime' },
          { number: '4.9/5', label: 'User Rating' }
        ]?.map((stat, index) => (
          <div key={index} className="text-center p-4 bg-card rounded-lg salon-shadow-card">
            <div className="text-xl font-bold text-accent mb-1">{stat?.number}</div>
            <div className="text-xs text-muted-foreground">{stat?.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RegistrationBenefits;