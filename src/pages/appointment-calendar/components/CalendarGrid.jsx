import React from 'react';
import Icon from '../../../components/AppIcon';

const CalendarGrid = ({ 
  viewMode, 
  currentDate, 
  appointments, 
  onAppointmentClick, 
  onTimeSlotClick,
  staffMembers 
}) => {
  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
    '15:00', '15:30', '16:00', '16:30', '17:00', '17:30',
    '18:00', '18:30', '19:00', '19:30'
  ];

  const getWeekDays = (date) => {
    const week = [];
    const startOfWeek = new Date(date);
    const day = startOfWeek?.getDay();
    const diff = startOfWeek?.getDate() - day;
    startOfWeek?.setDate(diff);

    for (let i = 0; i < 7; i++) {
      const day = new Date(startOfWeek);
      day?.setDate(startOfWeek?.getDate() + i);
      week?.push(day);
    }
    return week;
  };

  const getAppointmentForSlot = (date, time, staffId = null) => {
    return appointments?.find(apt => {
      const aptDate = new Date(apt.date);
      const isSameDate = aptDate?.toDateString() === date?.toDateString();
      const isSameTime = apt?.time === time;
      const isSameStaff = !staffId || apt?.staffId === staffId;
      return isSameDate && isSameTime && isSameStaff;
    });
  };

  const getServiceColor = (serviceType) => {
    const colors = {
      'haircut': 'bg-blue-100 border-blue-300 text-blue-800',
      'coloring': 'bg-purple-100 border-purple-300 text-purple-800',
      'styling': 'bg-pink-100 border-pink-300 text-pink-800',
      'facial': 'bg-green-100 border-green-300 text-green-800',
      'manicure': 'bg-yellow-100 border-yellow-300 text-yellow-800',
      'pedicure': 'bg-orange-100 border-orange-300 text-orange-800'
    };
    return colors?.[serviceType] || 'bg-gray-100 border-gray-300 text-gray-800';
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmed': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'completed': return 'Check';
      case 'cancelled': return 'X';
      default: return 'Calendar';
    }
  };

  const renderDayView = () => {
    return (
      <div className="flex-1 bg-background">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
          {staffMembers?.map(staff => (
            <div key={staff?.id} className="bg-card rounded-lg border border-border">
              <div className="p-4 border-b border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center">
                    <Icon name="User" size={20} color="white" />
                  </div>
                  <div>
                    <h3 className="font-medium text-foreground">{staff?.name}</h3>
                    <p className="text-sm text-muted-foreground">{staff?.role}</p>
                  </div>
                  <div className={`ml-auto w-3 h-3 rounded-full ${staff?.available ? 'bg-success' : 'bg-error'}`}></div>
                </div>
              </div>
              
              <div className="p-2 max-h-96 overflow-y-auto">
                {timeSlots?.map(time => {
                  const appointment = getAppointmentForSlot(currentDate, time, staff?.id);
                  return (
                    <div
                      key={time}
                      className={`p-2 mb-1 rounded-md cursor-pointer salon-transition-micro ${
                        appointment 
                          ? `${getServiceColor(appointment?.serviceType)} border-l-4`
                          : 'hover:bg-muted border border-transparent'
                      }`}
                      onClick={() => appointment ? onAppointmentClick(appointment) : onTimeSlotClick(currentDate, time, staff?.id)}
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{time}</span>
                        {appointment && (
                          <Icon name={getStatusIcon(appointment?.status)} size={16} />
                        )}
                      </div>
                      {appointment && (
                        <div className="mt-1">
                          <p className="text-sm font-medium">{appointment?.customerName}</p>
                          <p className="text-xs opacity-75">{appointment?.serviceName}</p>
                          <p className="text-xs opacity-75">{appointment?.duration}min</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderWeekView = () => {
    const weekDays = getWeekDays(currentDate);
    
    return (
      <div className="flex-1 bg-background overflow-hidden">
        <div className="grid grid-cols-8 border-b border-border bg-card">
          <div className="p-4 border-r border-border">
            <span className="text-sm font-medium text-muted-foreground">Time</span>
          </div>
          {weekDays?.map(day => (
            <div key={day?.toISOString()} className="p-4 border-r border-border last:border-r-0">
              <div className="text-center">
                <p className="text-sm font-medium text-foreground">
                  {day?.toLocaleDateString('en-US', { weekday: 'short' })}
                </p>
                <p className="text-lg font-semibold text-foreground mt-1">
                  {day?.getDate()}
                </p>
              </div>
            </div>
          ))}
        </div>
        <div className="overflow-y-auto max-h-96">
          {timeSlots?.map(time => (
            <div key={time} className="grid grid-cols-8 border-b border-border">
              <div className="p-3 border-r border-border bg-muted">
                <span className="text-sm font-medium text-muted-foreground">{time}</span>
              </div>
              {weekDays?.map(day => {
                const appointment = getAppointmentForSlot(day, time);
                return (
                  <div
                    key={`${day?.toISOString()}-${time}`}
                    className={`p-2 border-r border-border last:border-r-0 min-h-16 cursor-pointer salon-transition-micro ${
                      appointment 
                        ? `${getServiceColor(appointment?.serviceType)}`
                        : 'hover:bg-muted'
                    }`}
                    onClick={() => appointment ? onAppointmentClick(appointment) : onTimeSlotClick(day, time)}
                  >
                    {appointment && (
                      <div className="text-xs">
                        <div className="flex items-center justify-between mb-1">
                          <span className="font-medium">{appointment?.customerName}</span>
                          <Icon name={getStatusIcon(appointment?.status)} size={12} />
                        </div>
                        <p className="opacity-75">{appointment?.serviceName}</p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderMonthView = () => {
    const monthStart = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const monthEnd = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const startDate = new Date(monthStart);
    startDate?.setDate(startDate?.getDate() - monthStart?.getDay());
    
    const days = [];
    const current = new Date(startDate);
    
    while (current <= monthEnd || days?.length < 42) {
      days?.push(new Date(current));
      current?.setDate(current?.getDate() + 1);
    }

    return (
      <div className="flex-1 bg-background p-6">
        <div className="bg-card rounded-lg border border-border overflow-hidden">
          <div className="grid grid-cols-7 border-b border-border">
            {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']?.map(day => (
              <div key={day} className="p-4 text-center border-r border-border last:border-r-0 bg-muted">
                <span className="text-sm font-medium text-muted-foreground">{day}</span>
              </div>
            ))}
          </div>
          
          <div className="grid grid-cols-7">
            {days?.map((day, index) => {
              const dayAppointments = appointments?.filter(apt => {
                const aptDate = new Date(apt.date);
                return aptDate?.toDateString() === day?.toDateString();
              });
              
              const isCurrentMonth = day?.getMonth() === currentDate?.getMonth();
              const isToday = day?.toDateString() === new Date()?.toDateString();
              
              return (
                <div
                  key={index}
                  className={`min-h-24 p-2 border-r border-b border-border last:border-r-0 cursor-pointer salon-transition-micro ${
                    isCurrentMonth ? 'bg-card hover:bg-muted' : 'bg-muted/50'
                  } ${isToday ? 'ring-2 ring-accent' : ''}`}
                  onClick={() => onTimeSlotClick(day, '09:00')}
                >
                  <div className="flex justify-between items-start mb-2">
                    <span className={`text-sm font-medium ${
                      isCurrentMonth ? 'text-foreground' : 'text-muted-foreground'
                    }`}>
                      {day?.getDate()}
                    </span>
                    {dayAppointments?.length > 0 && (
                      <span className="text-xs bg-accent text-accent-foreground px-1 rounded">
                        {dayAppointments?.length}
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    {dayAppointments?.slice(0, 2)?.map(apt => (
                      <div
                        key={apt?.id}
                        className={`text-xs p-1 rounded ${getServiceColor(apt?.serviceType)}`}
                        onClick={(e) => {
                          e?.stopPropagation();
                          onAppointmentClick(apt);
                        }}
                      >
                        <p className="font-medium truncate">{apt?.customerName}</p>
                        <p className="opacity-75">{apt?.time}</p>
                      </div>
                    ))}
                    {dayAppointments?.length > 2 && (
                      <p className="text-xs text-muted-foreground">
                        +{dayAppointments?.length - 2} more
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-hidden">
      {viewMode === 'day' && renderDayView()}
      {viewMode === 'week' && renderWeekView()}
      {viewMode === 'month' && renderMonthView()}
    </div>
  );
};

export default CalendarGrid;