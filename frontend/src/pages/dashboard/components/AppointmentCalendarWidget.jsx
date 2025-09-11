import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const AppointmentCalendarWidget = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(new Date());

  const todayAppointments = [
    {
      id: 1,
      time: "09:00 AM",
      customer: "Sarah Johnson",
      service: "Hair Cut & Style",
      stylist: "Emma Wilson",
      duration: "1h 30m",
      status: "confirmed"
    },
    {
      id: 2,
      time: "10:30 AM",
      customer: "Michael Brown",
      service: "Beard Trim",
      stylist: "James Smith",
      duration: "45m",
      status: "in-progress"
    },
    {
      id: 3,
      time: "12:00 PM",
      customer: "Lisa Davis",
      service: "Hair Color",
      stylist: "Emma Wilson",
      duration: "2h",
      status: "confirmed"
    },
    {
      id: 4,
      time: "02:30 PM",
      customer: "David Wilson",
      service: "Full Service",
      stylist: "James Smith",
      duration: "2h 30m",
      status: "pending"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed': return 'bg-success';
      case 'in-progress': return 'bg-warning';
      case 'pending': return 'bg-muted';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed': return 'Confirmed';
      case 'in-progress': return 'In Progress';
      case 'pending': return 'Pending';
      default: return 'Unknown';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 salon-shadow-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center">
            <Icon name="Calendar" size={20} color="white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">Today's Schedule</h3>
            <p className="text-sm text-muted-foreground">
              {selectedDate?.toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}
            </p>
          </div>
        </div>
        <Button
          variant="outline"
          size="sm"
          iconName="ExternalLink"
          iconPosition="right"
          onClick={() => navigate('/appointment-calendar')}
        >
          View Full Calendar
        </Button>
      </div>
      <div className="space-y-3 max-h-80 overflow-y-auto">
        {todayAppointments?.map((appointment) => (
          <div
            key={appointment?.id}
            className="flex items-center space-x-4 p-3 bg-muted rounded-lg hover:bg-muted/80 salon-transition-micro cursor-pointer"
          >
            <div className="text-center min-w-0 flex-shrink-0">
              <div className="text-sm font-semibold text-foreground">{appointment?.time}</div>
              <div className="text-xs text-muted-foreground">{appointment?.duration}</div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="font-medium text-foreground text-sm truncate">{appointment?.customer}</h4>
                <div className={`w-2 h-2 rounded-full ${getStatusColor(appointment?.status)}`}></div>
              </div>
              <p className="text-xs text-muted-foreground truncate">{appointment?.service}</p>
              <p className="text-xs text-muted-foreground truncate">with {appointment?.stylist}</p>
            </div>

            <div className="flex items-center space-x-2 flex-shrink-0">
              <span className={`text-xs px-2 py-1 rounded-full text-white ${getStatusColor(appointment?.status)}`}>
                {getStatusText(appointment?.status)}
              </span>
              <Button variant="ghost" size="icon" className="w-8 h-8">
                <Icon name="MoreVertical" size={16} />
              </Button>
            </div>
          </div>
        ))}
      </div>
      {todayAppointments?.length === 0 && (
        <div className="text-center py-8">
          <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground">No appointments scheduled for today</p>
        </div>
      )}
    </div>
  );
};

export default AppointmentCalendarWidget;