import React, { useState } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import StaffSummaryCards from './components/StaffSummaryCards';
import StaffTable from './components/StaffTable';
import StaffProfileModal from './components/StaffProfileModal';
import ScheduleModal from './components/ScheduleModal';
import PerformanceModal from './components/PerformanceModal';

const StaffManagement = () => {
  const [selectedStaff, setSelectedStaff] = useState(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isScheduleModalOpen, setIsScheduleModalOpen] = useState(false);
  const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState(false);

  const handleViewProfile = (staff) => {
    setSelectedStaff(staff);
    setIsProfileModalOpen(true);
  };

  const handleEditSchedule = (staff) => {
    setSelectedStaff(staff);
    setIsScheduleModalOpen(true);
  };

  const handleViewPerformance = (staff) => {
    setSelectedStaff(staff);
    setIsPerformanceModalOpen(true);
  };

  const handleSaveSchedule = (scheduleData) => {
    console.log('Saving schedule:', scheduleData);
    // Here you would typically save the schedule data to your backend
  };

  const handleAddNewStaff = () => {
    console.log('Add new staff member');
    // Here you would typically open a form to add a new staff member
  };

  const handleExportData = () => {
    console.log('Exporting staff data');
    // Here you would typically export staff data to CSV or PDF
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          {/* Page Header */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Staff Management</h1>
              <p className="text-muted-foreground mt-2">
                Manage your salon team, schedules, and performance metrics
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="outline"
                onClick={handleExportData}
                iconName="Download"
                iconPosition="left"
                iconSize={16}
              >
                Export Data
              </Button>
              <Button
                onClick={handleAddNewStaff}
                iconName="UserPlus"
                iconPosition="left"
                iconSize={16}
              >
                Add Staff Member
              </Button>
            </div>
          </div>

          {/* Summary Cards */}
          <StaffSummaryCards />

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 salon-shadow-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center">
                  <Icon name="Calendar" size={24} className="text-accent" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Schedule Overview</h3>
                  <p className="text-sm text-muted-foreground">View today's staff schedule</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Schedule
              </Button>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 salon-shadow-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-success/10 rounded-lg flex items-center justify-center">
                  <Icon name="TrendingUp" size={24} className="text-success" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Performance Report</h3>
                  <p className="text-sm text-muted-foreground">Monthly team analytics</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                View Report
              </Button>
            </div>

            <div className="bg-card border border-border rounded-lg p-6 salon-shadow-card">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-warning/10 rounded-lg flex items-center justify-center">
                  <Icon name="Clock" size={24} className="text-warning" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Time Off Requests</h3>
                  <p className="text-sm text-muted-foreground">3 pending approvals</p>
                </div>
              </div>
              <Button variant="outline" size="sm" className="w-full">
                Review Requests
              </Button>
            </div>
          </div>

          {/* Staff Table */}
          <StaffTable
            onViewProfile={handleViewProfile}
            onEditSchedule={handleEditSchedule}
            onViewPerformance={handleViewPerformance}
          />

          {/* Modals */}
          <StaffProfileModal
            staff={selectedStaff}
            isOpen={isProfileModalOpen}
            onClose={() => {
              setIsProfileModalOpen(false);
              setSelectedStaff(null);
            }}
          />

          <ScheduleModal
            staff={selectedStaff}
            isOpen={isScheduleModalOpen}
            onClose={() => {
              setIsScheduleModalOpen(false);
              setSelectedStaff(null);
            }}
            onSave={handleSaveSchedule}
          />

          <PerformanceModal
            staff={selectedStaff}
            isOpen={isPerformanceModalOpen}
            onClose={() => {
              setIsPerformanceModalOpen(false);
              setSelectedStaff(null);
            }}
          />
        </div>
      </main>
    </div>
  );
};

export default StaffManagement;