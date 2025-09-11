import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import MetricsCard from './components/MetricsCard';
import QuickActionButton from './components/QuickActionButton';
import AppointmentCalendarWidget from './components/AppointmentCalendarWidget';
import RecentActivityFeed from './components/RecentActivityFeed';
import AlertNotifications from './components/AlertNotifications';
import ServicePriceCard from './components/ServicePriceCard'; // Import the new ServicePriceCard
import WaitingListPanel from './components/WaitingListPanel'; // Import the new WaitingListPanel

const Dashboard = () => {
  const navigate = useNavigate();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [userRole] = useState('manager'); // This would come from auth context

  // Update current time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  // Mock metrics data - would come from API
  const metricsData = [
    {
      title: "Today\'s Appointments",
      value: "24",
      change: "+12%",
      changeType: "positive",
      icon: "Calendar",
      color: "accent"
    },
    {
      title: "Daily Revenue",
      value: "$2,450",
      change: "+8.5%",
      changeType: "positive",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Staff Utilization",
      value: "87%",
      change: "+5%",
      changeType: "positive",
      icon: "Users",
      color: "warning"
    },
    {
      title: "Customer Satisfaction",
      value: "4.8",
      change: "+0.2",
      changeType: "positive",
      icon: "Star",
      color: "accent"
    }
  ];

  // Quick actions configuration
  const quickActions = [
    {
      title: "New Appointment",
      description: "Schedule a new customer appointment",
      icon: "Plus",
      action: { type: 'navigate', path: '/appointment-calendar' },
      variant: "default"
    },
    {
      title: "Walk-in Registration",
      description: "Register a walk-in customer",
      icon: "UserPlus",
      action: { 
        type: 'function', 
        handler: () => {
          // Mock walk-in registration
          alert('Walk-in registration feature would open here');
        }
      },
      variant: "outline"
    },
    {
      title: "Staff Check-in",
      description: "Check in staff members",
      icon: "UserCheck",
      action: { type: 'navigate', path: '/staff-management' },
      variant: "outline"
    }
  ];

  const formatTime = (date) => {
    return date?.toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const formatDate = (date) => {
    return date?.toLocaleDateString('en-US', { 
      weekday: 'long',
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Welcome Section */}
          <div className="mb-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
              <div>
                <h1 className="text-3xl font-bold text-foreground mb-2">
                  Welcome back, John! 👋
                </h1>
                <p className="text-muted-foreground">
                  {formatDate(currentTime)} • {formatTime(currentTime)}
                </p>
              </div>
              <div className="mt-4 sm:mt-0 text-right">
                <p className="text-sm text-muted-foreground">Shubh's Saloon Status</p>
                <div className="flex items-center space-x-2 mt-1">
                  <div className="w-2 h-2 bg-success rounded-full"></div>
                  <span className="text-sm font-medium text-foreground">Open & Active</span>
                </div>
              </div>
            </div>
          </div>

          {/* Alert Notifications */}
          <div className="mb-8">
            <AlertNotifications />
          </div>

          {/* New Saloon Specific Widgets */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <ServicePriceCard />
            <WaitingListPanel />
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Quick Actions */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-foreground mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {quickActions?.map((action, index) => (
                <QuickActionButton
                  key={index}
                  title={action?.title}
                  description={action?.description}
                  icon={action?.icon}
                  action={action?.action}
                  variant={action?.variant}
                />
              ))}
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Calendar Widget - Takes 2 columns on large screens */}
            <div className="lg:col-span-2">
              <AppointmentCalendarWidget />
            </div>

            {/* Activity Feed - Takes 1 column */}
            <div className="lg:col-span-1">
              <RecentActivityFeed />
            </div>
          </div>

          {/* Role-based Additional Content */}
          {userRole === 'manager' && (
            <div className="mt-8">
              <div className="bg-card border border-border rounded-lg p-6 salon-shadow-card">
                <h3 className="text-lg font-semibold text-foreground mb-4">Manager Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">$12,450</div>
                    <div className="text-sm text-muted-foreground">Weekly Revenue</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">156</div>
                    <div className="text-sm text-muted-foreground">Total Customers</div>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-2xl font-bold text-foreground">92%</div>
                    <div className="text-sm text-muted-foreground">Staff Performance</div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Dashboard;