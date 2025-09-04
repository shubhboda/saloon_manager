import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const WaitlistPanel = ({ waitlistCustomers, onMoveToAppointment, onRemoveFromWaitlist }) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-error/20 text-error border-error/30';
      case 'medium': return 'bg-warning/20 text-warning border-warning/30';
      case 'low': return 'bg-success/20 text-success border-success/30';
      default: return 'bg-muted/20 text-muted-foreground border-border';
    }
  };

  const formatWaitTime = (addedTime) => {
    const now = new Date();
    const added = new Date(addedTime);
    const diffMinutes = Math.floor((now - added) / (1000 * 60));
    
    if (diffMinutes < 60) {
      return `${diffMinutes}m ago`;
    } else {
      const hours = Math.floor(diffMinutes / 60);
      return `${hours}h ago`;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="Clock" size={20} className="text-accent" />
          <h3 className="text-lg font-semibold text-foreground">Waitlist</h3>
          <span className="bg-accent/20 text-accent px-2 py-1 rounded-full text-xs font-medium">
            {waitlistCustomers?.length}
          </span>
        </div>
        
        <Button variant="ghost" size="sm" iconName="Plus" iconPosition="left">
          Add to Waitlist
        </Button>
      </div>
      {waitlistCustomers?.length === 0 ? (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No customers on waitlist</p>
          <p className="text-sm text-muted-foreground mt-1">
            Customers will appear here when they're waiting for appointments
          </p>
        </div>
      ) : (
        <div className="space-y-3 max-h-80 overflow-y-auto">
          {waitlistCustomers?.map(customer => (
            <div
              key={customer?.id}
              className="p-3 border border-border rounded-lg hover:bg-muted salon-transition-micro"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className="font-medium text-foreground">{customer?.name}</h4>
                    <span className={`text-xs px-2 py-1 rounded-full border ${getPriorityColor(customer?.priority)}`}>
                      {customer?.priority} priority
                    </span>
                  </div>
                  
                  <div className="text-sm text-muted-foreground space-y-1">
                    <p className="flex items-center space-x-1">
                      <Icon name="Scissors" size={14} />
                      <span>{customer?.requestedService}</span>
                    </p>
                    
                    {customer?.preferredStaff && (
                      <p className="flex items-center space-x-1">
                        <Icon name="User" size={14} />
                        <span>Prefers: {customer?.preferredStaff}</span>
                      </p>
                    )}
                    
                    <p className="flex items-center space-x-1">
                      <Icon name="Clock" size={14} />
                      <span>Waiting {formatWaitTime(customer?.addedTime)}</span>
                    </p>
                    
                    {customer?.phone && (
                      <p className="flex items-center space-x-1">
                        <Icon name="Phone" size={14} />
                        <span>{customer?.phone}</span>
                      </p>
                    )}
                  </div>
                </div>
              </div>

              {customer?.notes && (
                <div className="mb-3 p-2 bg-muted rounded text-sm text-muted-foreground">
                  <Icon name="MessageSquare" size={14} className="inline mr-1" />
                  {customer?.notes}
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button
                    variant="default"
                    size="sm"
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={() => onMoveToAppointment(customer)}
                  >
                    Book Now
                  </Button>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    iconName="Phone"
                    iconPosition="left"
                  >
                    Call
                  </Button>
                </div>
                
                <Button
                  variant="ghost"
                  size="sm"
                  iconName="X"
                  onClick={() => onRemoveFromWaitlist(customer?.id)}
                  className="text-error hover:text-error hover:bg-error/10"
                />
              </div>
            </div>
          ))}
        </div>
      )}
      {/* Waitlist Stats */}
      {waitlistCustomers?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center text-sm">
            <div>
              <p className="font-semibold text-error">
                {waitlistCustomers?.filter(c => c?.priority === 'high')?.length}
              </p>
              <p className="text-muted-foreground">High Priority</p>
            </div>
            <div>
              <p className="font-semibold text-warning">
                {waitlistCustomers?.filter(c => c?.priority === 'medium')?.length}
              </p>
              <p className="text-muted-foreground">Medium Priority</p>
            </div>
            <div>
              <p className="font-semibold text-success">
                {waitlistCustomers?.filter(c => c?.priority === 'low')?.length}
              </p>
              <p className="text-muted-foreground">Low Priority</p>
            </div>
          </div>
          
          <div className="mt-3 text-center">
            <p className="text-xs text-muted-foreground">
              Average wait time: {Math.round(
                waitlistCustomers?.reduce((acc, c) => {
                  const waitTime = (new Date() - new Date(c.addedTime)) / (1000 * 60);
                  return acc + waitTime;
                }, 0) / waitlistCustomers?.length
              )} minutes
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WaitlistPanel;