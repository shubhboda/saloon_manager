import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AlertNotifications = () => {
  const [alerts, setAlerts] = useState([
    {
      id: 1,
      type: 'inventory',
      title: 'Low Inventory Alert',
      message: 'Hair shampoo stock is critically low (2 units remaining)',
      severity: 'high',
      timestamp: '10 minutes ago',
      dismissed: false
    },
    {
      id: 2,
      type: 'appointment',
      title: 'Upcoming Appointment',
      message: 'Sarah Johnson appointment in 15 minutes - Hair Cut & Style',
      severity: 'medium',
      timestamp: '5 minutes ago',
      dismissed: false
    },
    {
      id: 3,
      type: 'system',
      title: 'System Update',
      message: 'New features available - Customer loyalty program is now active',
      severity: 'low',
      timestamp: '1 hour ago',
      dismissed: false
    }
  ]);

  const dismissAlert = (alertId) => {
    setAlerts(alerts?.map(alert => 
      alert?.id === alertId ? { ...alert, dismissed: true } : alert
    ));
  };

  const activeAlerts = alerts?.filter(alert => !alert?.dismissed);

  const getSeverityColor = (severity) => {
    switch (severity) {
      case 'high': return 'border-error bg-error/5';
      case 'medium': return 'border-warning bg-warning/5';
      case 'low': return 'border-accent bg-accent/5';
      default: return 'border-muted bg-muted/5';
    }
  };

  const getSeverityIcon = (type) => {
    switch (type) {
      case 'inventory': return 'Package';
      case 'appointment': return 'Clock';
      case 'system': return 'Settings';
      default: return 'Bell';
    }
  };

  const getSeverityIconColor = (severity) => {
    switch (severity) {
      case 'high': return 'text-error';
      case 'medium': return 'text-warning';
      case 'low': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  if (activeAlerts?.length === 0) {
    return null;
  }

  return (
    <div className="space-y-3">
      {activeAlerts?.map((alert) => (
        <div
          key={alert?.id}
          className={`border rounded-lg p-4 salon-shadow-card ${getSeverityColor(alert?.severity)}`}
        >
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <Icon 
                name={getSeverityIcon(alert?.type)} 
                size={20} 
                className={getSeverityIconColor(alert?.severity)} 
              />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center justify-between mb-1">
                <h4 className="font-medium text-foreground text-sm">{alert?.title}</h4>
                <span className="text-xs text-muted-foreground">{alert?.timestamp}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-2">{alert?.message}</p>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={() => dismissAlert(alert?.id)}
              className="w-6 h-6 flex-shrink-0"
            >
              <Icon name="X" size={14} />
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AlertNotifications;