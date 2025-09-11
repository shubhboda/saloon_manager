import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Image from '../../../components/AppImage';

const StaffProfileModal = ({ staff, isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('overview');

  if (!isOpen || !staff) return null;

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'performance', label: 'Performance', icon: 'BarChart3' },
    { id: 'schedule', label: 'Schedule', icon: 'Calendar' },
    { id: 'payroll', label: 'Payroll', icon: 'DollarSign' }
  ];

  const performanceData = [
    { label: 'Customer Rating', value: staff?.performance, max: 5, type: 'rating' },
    { label: 'Completion Rate', value: staff?.completionRate, max: 100, type: 'percentage' },
    { label: 'Today\'s Appointments', value: staff?.todayAppointments, max: 10, type: 'count' },
    { label: 'Monthly Revenue', value: 8450, max: 10000, type: 'currency' }
  ];

  const scheduleData = [
    { day: 'Monday', hours: '9:00 AM - 6:00 PM', status: 'scheduled' },
    { day: 'Tuesday', hours: '9:00 AM - 6:00 PM', status: 'scheduled' },
    { day: 'Wednesday', hours: '10:00 AM - 7:00 PM', status: 'scheduled' },
    { day: 'Thursday', hours: '9:00 AM - 6:00 PM', status: 'scheduled' },
    { day: 'Friday', hours: '9:00 AM - 6:00 PM', status: 'scheduled' },
    { day: 'Saturday', hours: '8:00 AM - 4:00 PM', status: 'scheduled' },
    { day: 'Sunday', hours: 'Off', status: 'off' }
  ];

  const payrollData = [
    { period: 'December 2024', base: 3200, commission: parseFloat(staff?.commission?.replace('$', '')?.replace(',', '')), total: 3200 + parseFloat(staff?.commission?.replace('$', '')?.replace(',', '')) },
    { period: 'November 2024', base: 3200, commission: 2180, total: 5380 },
    { period: 'October 2024', base: 3200, commission: 1950, total: 5150 }
  ];

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center space-y-4 sm:space-y-0 sm:space-x-6">
        <Image
          src={staff?.avatar}
          alt={staff?.name}
          className="w-20 h-20 rounded-full object-cover mx-auto sm:mx-0"
        />
        <div className="text-center sm:text-left">
          <h3 className="text-xl font-semibold text-foreground">{staff?.name}</h3>
          <p className="text-muted-foreground">{staff?.role}</p>
          <div className="flex items-center justify-center sm:justify-start space-x-1 mt-2">
            <Icon name="Star" size={16} className="text-warning fill-current" />
            <span className="text-sm font-medium">{staff?.performance} rating</span>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Contact Information</h4>
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <Icon name="Phone" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{staff?.phone}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Mail" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">{staff?.email}</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <span className="text-sm text-foreground">Joined {new Date(staff.joinDate)?.toLocaleDateString()}</span>
            </div>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-medium text-foreground">Specializations</h4>
          <div className="flex flex-wrap gap-2">
            {staff?.specializations?.map((spec, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-accent/10 text-accent text-xs rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-2xl font-bold text-foreground">{staff?.todayAppointments}</p>
          <p className="text-xs text-muted-foreground">Today's Appointments</p>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-2xl font-bold text-foreground">{staff?.completionRate}%</p>
          <p className="text-xs text-muted-foreground">Completion Rate</p>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-2xl font-bold text-foreground">{staff?.commission}</p>
          <p className="text-xs text-muted-foreground">Monthly Commission</p>
        </div>
        <div className="text-center p-3 bg-muted/30 rounded-lg">
          <p className="text-2xl font-bold text-foreground">156</p>
          <p className="text-xs text-muted-foreground">Total Services</p>
        </div>
      </div>
    </div>
  );

  const renderPerformance = () => (
    <div className="space-y-6">
      <h4 className="font-medium text-foreground">Performance Metrics</h4>
      <div className="space-y-4">
        {performanceData?.map((metric, index) => (
          <div key={index} className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-sm text-foreground">{metric?.label}</span>
              <span className="text-sm font-medium text-foreground">
                {metric?.type === 'rating' && `${metric?.value}/5`}
                {metric?.type === 'percentage' && `${metric?.value}%`}
                {metric?.type === 'count' && metric?.value}
                {metric?.type === 'currency' && `$${metric?.value?.toLocaleString()}`}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div
                className="bg-accent h-2 rounded-full salon-transition-micro"
                style={{ width: `${(metric?.value / metric?.max) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="font-medium text-foreground mb-3">Recent Customer Feedback</h4>
        <div className="space-y-3">
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4, 5]?.map((star) => (
                  <Icon key={star} name="Star" size={14} className="text-warning fill-current" />
                ))}
              </div>
              <span className="text-xs text-muted-foreground">2 days ago</span>
            </div>
            <p className="text-sm text-foreground">"Excellent service! Sarah really understood what I wanted and delivered perfectly."</p>
          </div>
          <div className="p-3 bg-muted/30 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <div className="flex">
                {[1, 2, 3, 4]?.map((star) => (
                  <Icon key={star} name="Star" size={14} className="text-warning fill-current" />
                ))}
                <Icon name="Star" size={14} className="text-muted-foreground" />
              </div>
              <span className="text-xs text-muted-foreground">1 week ago</span>
            </div>
            <p className="text-sm text-foreground">"Great haircut, very professional. Will definitely come back!"</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSchedule = () => (
    <div className="space-y-6">
      <h4 className="font-medium text-foreground">Weekly Schedule</h4>
      <div className="space-y-2">
        {scheduleData?.map((day, index) => (
          <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
            <span className="font-medium text-foreground">{day?.day}</span>
            <div className="flex items-center space-x-2">
              <span className="text-sm text-foreground">{day?.hours}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                day?.status === 'scheduled' ?'bg-success/10 text-success' :'bg-muted text-muted-foreground'
              }`}>
                {day?.status === 'scheduled' ? 'Scheduled' : 'Off'}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <h4 className="font-medium text-foreground mb-3">Upcoming Time Off</h4>
        <div className="space-y-2">
          <div className="p-3 bg-warning/10 border border-warning/20 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-foreground">Vacation Request</p>
                <p className="text-sm text-muted-foreground">Dec 23 - Dec 30, 2024</p>
              </div>
              <span className="px-2 py-1 bg-warning/20 text-warning text-xs rounded-full">Pending</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPayroll = () => (
    <div className="space-y-6">
      <h4 className="font-medium text-foreground">Payroll History</h4>
      <div className="space-y-3">
        {payrollData?.map((period, index) => (
          <div key={index} className="p-4 bg-muted/30 rounded-lg">
            <div className="flex items-center justify-between mb-3">
              <h5 className="font-medium text-foreground">{period?.period}</h5>
              <span className="text-lg font-bold text-foreground">${period?.total?.toLocaleString()}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-muted-foreground">Base Salary:</span>
                <span className="ml-2 text-foreground">${period?.base?.toLocaleString()}</span>
              </div>
              <div>
                <span className="text-muted-foreground">Commission:</span>
                <span className="ml-2 text-foreground">${period?.commission?.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-accent/10 border border-accent/20 rounded-lg">
        <h5 className="font-medium text-foreground mb-2">Commission Structure</h5>
        <div className="text-sm text-muted-foreground space-y-1">
          <p>• Base commission: 40% of service revenue</p>
          <p>• Bonus tier: 45% for monthly revenue &gt; $8,000</p>
          <p>• Product sales: 15% commission</p>
        </div>
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return renderOverview();
      case 'performance':
        return renderPerformance();
      case 'schedule':
        return renderSchedule();
      case 'payroll':
        return renderPayroll();
      default:
        return renderOverview();
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1200 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden salon-shadow-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Staff Profile</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 text-sm font-medium border-b-2 salon-transition-micro ${
                  activeTab === tab?.id
                    ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};

export default StaffProfileModal;