import React from 'react';
import Icon from '../../../components/AppIcon';

const StaffAvailability = ({ staffMembers, selectedDate, onStaffClick }) => {
  const getAvailabilityStatus = (staff, date) => {
    // Mock availability logic
    const dayOfWeek = date?.getDay();
    const hour = new Date()?.getHours();
    
    if (staff?.schedule && staff?.schedule?.[dayOfWeek]) {
      const schedule = staff?.schedule?.[dayOfWeek];
      if (schedule?.isWorking) {
        const startHour = parseInt(schedule?.startTime?.split(':')?.[0]);
        const endHour = parseInt(schedule?.endTime?.split(':')?.[0]);
        
        if (hour >= startHour && hour < endHour) {
          return staff?.currentStatus || 'available';
        }
      }
    }
    
    return 'unavailable';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'available': return 'bg-success';
      case 'busy': return 'bg-warning';
      case 'break': return 'bg-accent';
      case 'unavailable': return 'bg-error';
      default: return 'bg-muted';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'available': return 'Available';
      case 'busy': return 'With Client';
      case 'break': return 'On Break';
      case 'unavailable': return 'Unavailable';
      default: return 'Unknown';
    }
  };

  const getNextAppointment = (staffId) => {
    // Mock next appointment logic
    const mockAppointments = {
      'sarah': { time: '14:30', customer: 'Alice Johnson' },
      'mike': { time: '15:00', customer: 'Bob Smith' },
      'emma': { time: '16:00', customer: 'Carol Davis' },
      'alex': null
    };
    
    return mockAppointments?.[staffId];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Staff Availability</h3>
        <div className="flex items-center space-x-4 text-xs">
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-warning rounded-full"></div>
            <span className="text-muted-foreground">Busy</span>
          </div>
          <div className="flex items-center space-x-1">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="text-muted-foreground">Break</span>
          </div>
        </div>
      </div>
      <div className="space-y-3">
        {staffMembers?.map(staff => {
          const status = getAvailabilityStatus(staff, selectedDate);
          const nextAppointment = getNextAppointment(staff?.id);
          
          return (
            <div
              key={staff?.id}
              className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted cursor-pointer salon-transition-micro"
              onClick={() => onStaffClick(staff)}
            >
              <div className="flex items-center space-x-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(status)} rounded-full border-2 border-card`}></div>
                </div>
                
                <div>
                  <h4 className="font-medium text-foreground">{staff?.name}</h4>
                  <p className="text-sm text-muted-foreground">{staff?.role}</p>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-2 mb-1">
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    status === 'available' ? 'bg-success/20 text-success' :
                    status === 'busy' ? 'bg-warning/20 text-warning' :
                    status === 'break'? 'bg-accent/20 text-accent' : 'bg-error/20 text-error'
                  }`}>
                    {getStatusText(status)}
                  </span>
                </div>
                
                {nextAppointment && (
                  <div className="text-xs text-muted-foreground">
                    <p>Next: {nextAppointment?.time}</p>
                    <p className="truncate max-w-20">{nextAppointment?.customer}</p>
                  </div>
                )}
                
                {!nextAppointment && status === 'available' && (
                  <p className="text-xs text-muted-foreground">No upcoming appointments</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      {/* Quick Stats */}
      <div className="mt-4 pt-4 border-t border-border">
        <div className="grid grid-cols-2 gap-4 text-center">
          <div>
            <p className="text-2xl font-bold text-success">
              {staffMembers?.filter(s => getAvailabilityStatus(s, selectedDate) === 'available')?.length}
            </p>
            <p className="text-xs text-muted-foreground">Available</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-warning">
              {staffMembers?.filter(s => getAvailabilityStatus(s, selectedDate) === 'busy')?.length}
            </p>
            <p className="text-xs text-muted-foreground">Busy</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffAvailability;