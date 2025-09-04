import React from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const CalendarHeader = ({ 
  currentDate, 
  viewMode, 
  onViewModeChange, 
  onDateChange, 
  selectedStaff, 
  onStaffChange, 
  selectedService, 
  onServiceChange,
  onTodayClick,
  onNewAppointment 
}) => {
  const viewOptions = [
    { value: 'day', label: 'Day View' },
    { value: 'week', label: 'Week View' },
    { value: 'month', label: 'Month View' }
  ];

  const staffOptions = [
    { value: 'all', label: 'All Staff' },
    { value: 'sarah', label: 'Sarah Johnson' },
    { value: 'mike', label: 'Mike Chen' },
    { value: 'emma', label: 'Emma Davis' },
    { value: 'alex', label: 'Alex Rodriguez' }
  ];

  const serviceOptions = [
    { value: 'all', label: 'All Services' },
    { value: 'haircut', label: 'Haircut' },
    { value: 'coloring', label: 'Hair Coloring' },
    { value: 'styling', label: 'Hair Styling' },
    { value: 'facial', label: 'Facial Treatment' },
    { value: 'manicure', label: 'Manicure' },
    { value: 'pedicure', label: 'Pedicure' }
  ];

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate);
    if (viewMode === 'day') {
      newDate?.setDate(newDate?.getDate() + direction);
    } else if (viewMode === 'week') {
      newDate?.setDate(newDate?.getDate() + (direction * 7));
    } else {
      newDate?.setMonth(newDate?.getMonth() + direction);
    }
    onDateChange(newDate);
  };

  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        {/* Left Section - Date Navigation */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate(-1)}
              className="h-10 w-10"
            >
              <Icon name="ChevronLeft" size={20} />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => navigateDate(1)}
              className="h-10 w-10"
            >
              <Icon name="ChevronRight" size={20} />
            </Button>
          </div>
          
          <div className="flex flex-col">
            <h2 className="text-xl font-semibold text-foreground">
              {formatDate(currentDate)}
            </h2>
            <p className="text-sm text-muted-foreground">
              {viewMode?.charAt(0)?.toUpperCase() + viewMode?.slice(1)} View
            </p>
          </div>
          
          <Button
            variant="ghost"
            onClick={onTodayClick}
            className="text-accent hover:text-accent-foreground hover:bg-accent"
          >
            Today
          </Button>
        </div>

        {/* Right Section - Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
          {/* Filters */}
          <div className="flex flex-col sm:flex-row gap-3">
            <Select
              options={viewOptions}
              value={viewMode}
              onChange={onViewModeChange}
              className="w-full sm:w-32"
            />
            
            <Select
              options={staffOptions}
              value={selectedStaff}
              onChange={onStaffChange}
              placeholder="Filter by staff"
              className="w-full sm:w-40"
            />
            
            <Select
              options={serviceOptions}
              value={selectedService}
              onChange={onServiceChange}
              placeholder="Filter by service"
              className="w-full sm:w-40"
            />
          </div>

          {/* Action Buttons */}
          <div className="flex gap-2">
            <Button
              variant="outline"
              iconName="Filter"
              iconPosition="left"
              className="flex-1 sm:flex-none"
            >
              More Filters
            </Button>
            
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={onNewAppointment}
              className="flex-1 sm:flex-none"
            >
              New Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarHeader;