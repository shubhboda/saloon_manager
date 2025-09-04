import React from 'react';
import Icon from '../../../components/AppIcon';

const RecentActivityFeed = () => {
  const activities = [
    {
      id: 1,
      type: 'appointment',
      icon: 'Calendar',
      title: 'New appointment booked',
      description: 'Sarah Johnson booked Hair Cut & Style for tomorrow 2:00 PM',
      timestamp: '5 minutes ago',
      color: 'success'
    },
    {
      id: 2,
      type: 'checkin',
      icon: 'UserCheck',
      title: 'Customer checked in',
      description: 'Michael Brown checked in for Beard Trim appointment',
      timestamp: '12 minutes ago',
      color: 'accent'
    },
    {
      id: 3,
      type: 'cancellation',
      icon: 'X',
      title: 'Appointment cancelled',
      description: 'Jennifer Lee cancelled Hair Color appointment for today',
      timestamp: '25 minutes ago',
      color: 'warning'
    },
    {
      id: 4,
      type: 'payment',
      icon: 'CreditCard',
      title: 'Payment received',
      description: 'David Wilson paid $85.00 for Full Service package',
      timestamp: '1 hour ago',
      color: 'success'
    },
    {
      id: 5,
      type: 'staff',
      icon: 'Users',
      title: 'Staff checked in',
      description: 'Emma Wilson started her shift',
      timestamp: '2 hours ago',
      color: 'accent'
    },
    {
      id: 6,
      type: 'inventory',
      icon: 'Package',
      title: 'Low inventory alert',
      description: 'Hair shampoo stock is running low (5 units remaining)',
      timestamp: '3 hours ago',
      color: 'error'
    }
  ];

  const getIconColor = (color) => {
    switch (color) {
      case 'success': return 'text-success';
      case 'warning': return 'text-warning';
      case 'error': return 'text-error';
      case 'accent': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const getBgColor = (color) => {
    switch (color) {
      case 'success': return 'bg-success/10';
      case 'warning': return 'bg-warning/10';
      case 'error': return 'bg-error/10';
      case 'accent': return 'bg-accent/10';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 salon-shadow-card">
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
          <Icon name="Activity" size={20} color="white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-foreground">Recent Activity</h3>
          <p className="text-sm text-muted-foreground">Latest salon updates and notifications</p>
        </div>
      </div>
      <div className="space-y-4 max-h-96 overflow-y-auto">
        {activities?.map((activity) => (
          <div key={activity?.id} className="flex items-start space-x-3">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${getBgColor(activity?.color)}`}>
              <Icon name={activity?.icon} size={16} className={getIconColor(activity?.color)} />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-foreground text-sm">{activity?.title}</h4>
                <span className="text-xs text-muted-foreground flex-shrink-0">{activity?.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">{activity?.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <button className="w-full text-center text-sm text-accent hover:text-accent/80 salon-transition-micro">
          View all activities
        </button>
      </div>
    </div>
  );
};

export default RecentActivityFeed;