import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const ScheduleModal = ({ staff, isOpen, onClose, onSave }) => {
  const [scheduleData, setScheduleData] = useState({
    monday: { start: '09:00', end: '18:00', isWorking: true },
    tuesday: { start: '09:00', end: '18:00', isWorking: true },
    wednesday: { start: '10:00', end: '19:00', isWorking: true },
    thursday: { start: '09:00', end: '18:00', isWorking: true },
    friday: { start: '09:00', end: '18:00', isWorking: true },
    saturday: { start: '08:00', end: '16:00', isWorking: true },
    sunday: { start: '10:00', end: '16:00', isWorking: false }
  });

  const [timeOffRequests, setTimeOffRequests] = useState([
    {
      id: 1,
      startDate: '2024-12-23',
      endDate: '2024-12-30',
      reason: 'Vacation',
      status: 'pending'
    }
  ]);

  const [newTimeOff, setNewTimeOff] = useState({
    startDate: '',
    endDate: '',
    reason: ''
  });

  if (!isOpen || !staff) return null;

  const days = [
    { key: 'monday', label: 'Monday' },
    { key: 'tuesday', label: 'Tuesday' },
    { key: 'wednesday', label: 'Wednesday' },
    { key: 'thursday', label: 'Thursday' },
    { key: 'friday', label: 'Friday' },
    { key: 'saturday', label: 'Saturday' },
    { key: 'sunday', label: 'Sunday' }
  ];

  const reasonOptions = [
    { value: 'vacation', label: 'Vacation' },
    { value: 'sick', label: 'Sick Leave' },
    { value: 'personal', label: 'Personal' },
    { value: 'training', label: 'Training' },
    { value: 'other', label: 'Other' }
  ];

  const handleScheduleChange = (day, field, value) => {
    setScheduleData(prev => ({
      ...prev,
      [day]: {
        ...prev?.[day],
        [field]: value
      }
    }));
  };

  const handleAddTimeOff = () => {
    if (newTimeOff?.startDate && newTimeOff?.endDate && newTimeOff?.reason) {
      const newRequest = {
        id: Date.now(),
        ...newTimeOff,
        status: 'pending'
      };
      setTimeOffRequests(prev => [...prev, newRequest]);
      setNewTimeOff({ startDate: '', endDate: '', reason: '' });
    }
  };

  const handleRemoveTimeOff = (id) => {
    setTimeOffRequests(prev => prev?.filter(request => request?.id !== id));
  };

  const handleSave = () => {
    onSave({ scheduleData, timeOffRequests });
    onClose();
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { color: 'bg-warning/10 text-warning', label: 'Pending' },
      approved: { color: 'bg-success/10 text-success', label: 'Approved' },
      rejected: { color: 'bg-error/10 text-error', label: 'Rejected' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1200 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden salon-shadow-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Edit Schedule</h2>
            <p className="text-sm text-muted-foreground">{staff?.name} - {staff?.role}</p>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-8">
          {/* Weekly Schedule */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Weekly Schedule</h3>
            <div className="space-y-4">
              {days?.map((day) => (
                <div key={day?.key} className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                  <div className="w-24">
                    <span className="font-medium text-foreground">{day?.label}</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      checked={scheduleData?.[day?.key]?.isWorking}
                      onChange={(e) => handleScheduleChange(day?.key, 'isWorking', e?.target?.checked)}
                      className="w-4 h-4 text-accent bg-background border-border rounded focus:ring-accent"
                    />
                    <span className="text-sm text-muted-foreground">Working</span>
                  </div>

                  {scheduleData?.[day?.key]?.isWorking && (
                    <div className="flex items-center space-x-2">
                      <Input
                        type="time"
                        value={scheduleData?.[day?.key]?.start}
                        onChange={(e) => handleScheduleChange(day?.key, 'start', e?.target?.value)}
                        className="w-32"
                      />
                      <span className="text-muted-foreground">to</span>
                      <Input
                        type="time"
                        value={scheduleData?.[day?.key]?.end}
                        onChange={(e) => handleScheduleChange(day?.key, 'end', e?.target?.value)}
                        className="w-32"
                      />
                    </div>
                  )}

                  {!scheduleData?.[day?.key]?.isWorking && (
                    <span className="text-sm text-muted-foreground">Day off</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Time Off Requests */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Time Off Requests</h3>
            
            {/* Add New Time Off */}
            <div className="p-4 bg-muted/30 rounded-lg mb-4">
              <h4 className="font-medium text-foreground mb-3">Request Time Off</h4>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                <Input
                  type="date"
                  label="Start Date"
                  value={newTimeOff?.startDate}
                  onChange={(e) => setNewTimeOff(prev => ({ ...prev, startDate: e?.target?.value }))}
                />
                <Input
                  type="date"
                  label="End Date"
                  value={newTimeOff?.endDate}
                  onChange={(e) => setNewTimeOff(prev => ({ ...prev, endDate: e?.target?.value }))}
                />
                <Select
                  label="Reason"
                  options={reasonOptions}
                  value={newTimeOff?.reason}
                  onChange={(value) => setNewTimeOff(prev => ({ ...prev, reason: value }))}
                  placeholder="Select reason"
                />
                <div className="flex items-end">
                  <Button
                    onClick={handleAddTimeOff}
                    iconName="Plus"
                    iconSize={16}
                    className="w-full"
                  >
                    Add Request
                  </Button>
                </div>
              </div>
            </div>

            {/* Existing Time Off Requests */}
            <div className="space-y-3">
              {timeOffRequests?.map((request) => (
                <div key={request?.id} className="flex items-center justify-between p-4 bg-card border border-border rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium text-foreground capitalize">{request?.reason}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(request.startDate)?.toLocaleDateString()} - {new Date(request.endDate)?.toLocaleDateString()}
                        </p>
                      </div>
                      {getStatusBadge(request?.status)}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveTimeOff(request?.id)}
                    iconName="Trash2"
                    iconSize={16}
                  >
                    Remove
                  </Button>
                </div>
              ))}

              {timeOffRequests?.length === 0 && (
                <div className="text-center py-8">
                  <Icon name="Calendar" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">No time off requests</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Schedule Templates */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Quick Templates</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
              <Button
                variant="outline"
                onClick={() => {
                  const fullTime = {
                    monday: { start: '09:00', end: '18:00', isWorking: true },
                    tuesday: { start: '09:00', end: '18:00', isWorking: true },
                    wednesday: { start: '09:00', end: '18:00', isWorking: true },
                    thursday: { start: '09:00', end: '18:00', isWorking: true },
                    friday: { start: '09:00', end: '18:00', isWorking: true },
                    saturday: { start: '09:00', end: '17:00', isWorking: true },
                    sunday: { start: '10:00', end: '16:00', isWorking: false }
                  };
                  setScheduleData(fullTime);
                }}
              >
                Full Time (Mon-Sat)
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  const partTime = {
                    monday: { start: '10:00', end: '16:00', isWorking: true },
                    tuesday: { start: '10:00', end: '16:00', isWorking: true },
                    wednesday: { start: '10:00', end: '16:00', isWorking: true },
                    thursday: { start: '10:00', end: '16:00', isWorking: false },
                    friday: { start: '10:00', end: '16:00', isWorking: true },
                    saturday: { start: '09:00', end: '15:00', isWorking: true },
                    sunday: { start: '10:00', end: '16:00', isWorking: false }
                  };
                  setScheduleData(partTime);
                }}
              >
                Part Time
              </Button>
              
              <Button
                variant="outline"
                onClick={() => {
                  const weekend = {
                    monday: { start: '09:00', end: '18:00', isWorking: false },
                    tuesday: { start: '09:00', end: '18:00', isWorking: false },
                    wednesday: { start: '09:00', end: '18:00', isWorking: false },
                    thursday: { start: '09:00', end: '18:00', isWorking: false },
                    friday: { start: '09:00', end: '18:00', isWorking: false },
                    saturday: { start: '08:00', end: '18:00', isWorking: true },
                    sunday: { start: '09:00', end: '17:00', isWorking: true }
                  };
                  setScheduleData(weekend);
                }}
              >
                Weekend Only
              </Button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSave}>
            Save Schedule
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ScheduleModal;