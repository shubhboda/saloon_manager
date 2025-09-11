import React, { useState, useEffect } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const AppointmentModal = ({ 
  isOpen, 
  onClose, 
  appointment, 
  selectedDate, 
  selectedTime, 
  selectedStaffId,
  onSave,
  onDelete 
}) => {
  const [formData, setFormData] = useState({
    customerName: '',
    customerPhone: '',
    customerEmail: '',
    serviceType: '',
    serviceName: '',
    staffId: '',
    date: '',
    time: '',
    duration: 60,
    notes: '',
    status: 'pending'
  });

  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const serviceOptions = [
    { value: 'haircut', label: 'Haircut', duration: 45 },
    { value: 'coloring', label: 'Hair Coloring', duration: 120 },
    { value: 'styling', label: 'Hair Styling', duration: 60 },
    { value: 'facial', label: 'Facial Treatment', duration: 90 },
    { value: 'manicure', label: 'Manicure', duration: 45 },
    { value: 'pedicure', label: 'Pedicure', duration: 60 }
  ];

  const staffOptions = [
    { value: 'sarah', label: 'Sarah Johnson - Senior Stylist' },
    { value: 'mike', label: 'Mike Chen - Hair Colorist' },
    { value: 'emma', label: 'Emma Davis - Nail Technician' },
    { value: 'alex', label: 'Alex Rodriguez - Esthetician' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending Confirmation' },
    { value: 'confirmed', label: 'Confirmed' },
    { value: 'completed', label: 'Completed' },
    { value: 'cancelled', label: 'Cancelled' }
  ];

  useEffect(() => {
    if (appointment) {
      setFormData({
        customerName: appointment?.customerName || '',
        customerPhone: appointment?.customerPhone || '',
        customerEmail: appointment?.customerEmail || '',
        serviceType: appointment?.serviceType || '',
        serviceName: appointment?.serviceName || '',
        staffId: appointment?.staffId || '',
        date: appointment?.date || '',
        time: appointment?.time || '',
        duration: appointment?.duration || 60,
        notes: appointment?.notes || '',
        status: appointment?.status || 'pending'
      });
    } else if (selectedDate && selectedTime) {
      setFormData(prev => ({
        ...prev,
        date: selectedDate?.toISOString()?.split('T')?.[0],
        time: selectedTime,
        staffId: selectedStaffId || ''
      }));
    }
  }, [appointment, selectedDate, selectedTime, selectedStaffId]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Auto-update duration when service changes
    if (field === 'serviceType') {
      const service = serviceOptions?.find(s => s?.value === value);
      if (service) {
        setFormData(prev => ({
          ...prev,
          serviceName: service?.label,
          duration: service?.duration
        }));
      }
    }

    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.customerName?.trim()) {
      newErrors.customerName = 'Customer name is required';
    }

    if (!formData?.customerPhone?.trim()) {
      newErrors.customerPhone = 'Phone number is required';
    }

    if (!formData?.serviceType) {
      newErrors.serviceType = 'Service selection is required';
    }

    if (!formData?.staffId) {
      newErrors.staffId = 'Staff member selection is required';
    }

    if (!formData?.date) {
      newErrors.date = 'Date is required';
    }

    if (!formData?.time) {
      newErrors.time = 'Time is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSave = async () => {
    if (!validateForm()) return;

    setIsLoading(true);
    try {
      await onSave({
        ...formData,
        id: appointment?.id || Date.now()?.toString()
      });
      onClose();
    } catch (error) {
      console.error('Error saving appointment:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!appointment?.id) return;
    
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      setIsLoading(true);
      try {
        await onDelete(appointment?.id);
        onClose();
      } catch (error) {
        console.error('Error deleting appointment:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4 salon-transition-layout">
      <div className="bg-card rounded-lg border border-border w-full max-w-2xl max-h-[90vh] overflow-y-auto salon-shadow-modal salon-transition-layout">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border bg-muted/30">
          <h2 className="text-xl font-semibold text-foreground font-sans">
            {appointment ? 'Edit Appointment' : 'New Appointment'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose} className="salon-hover-scale salon-transition-micro">
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <div className="p-6 space-y-6">
          {/* Customer Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground font-sans">Customer Information</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Customer Name"
                type="text"
                value={formData?.customerName}
                onChange={(e) => handleInputChange('customerName', e?.target?.value)}
                error={errors?.customerName}
                required
                placeholder="Enter customer name"
              />
              
              <Input
                label="Phone Number"
                type="tel"
                value={formData?.customerPhone}
                onChange={(e) => handleInputChange('customerPhone', e?.target?.value)}
                error={errors?.customerPhone}
                required
                placeholder="(555) 123-4567"
              />
            </div>

            <Input
              label="Email Address"
              type="email"
              value={formData?.customerEmail}
              onChange={(e) => handleInputChange('customerEmail', e?.target?.value)}
              placeholder="customer@example.com"
              description="Optional - for appointment confirmations"
            />
          </div>

          {/* Service Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground font-sans">Service Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Service Type"
                options={serviceOptions}
                value={formData?.serviceType}
                onChange={(value) => handleInputChange('serviceType', value)}
                error={errors?.serviceType}
                required
                placeholder="Select a service"
              />
              
              <Select
                label="Staff Member"
                options={staffOptions}
                value={formData?.staffId}
                onChange={(value) => handleInputChange('staffId', value)}
                error={errors?.staffId}
                required
                placeholder="Select staff member"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Input
                label="Date"
                type="date"
                value={formData?.date}
                onChange={(e) => handleInputChange('date', e?.target?.value)}
                error={errors?.date}
                required
              />
              
              <Input
                label="Time"
                type="time"
                value={formData?.time}
                onChange={(e) => handleInputChange('time', e?.target?.value)}
                error={errors?.time}
                required
              />
              
              <Input
                label="Duration (minutes)"
                type="number"
                value={formData?.duration}
                onChange={(e) => handleInputChange('duration', parseInt(e?.target?.value))}
                min="15"
                max="300"
                step="15"
              />
            </div>
          </div>

          {/* Additional Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-foreground">Additional Information</h3>
            
            <Select
              label="Status"
              options={statusOptions}
              value={formData?.status}
              onChange={(value) => handleInputChange('status', value)}
              placeholder="Select status"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Notes
              </label>
              <textarea
                value={formData?.notes}
                onChange={(e) => handleInputChange('notes', e?.target?.value)}
                placeholder="Special requests, allergies, or other notes..."
                rows={3}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent salon-transition-micro"
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between p-6 border-t border-border">
          <div>
            {appointment && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                loading={isLoading}
                iconName="Trash2"
                iconPosition="left"
              >
                Delete
              </Button>
            )}
          </div>
          
          <div className="flex space-x-3">
            <Button variant="outline" onClick={onClose} disabled={isLoading}>
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
            >
              {appointment ? 'Update' : 'Create'} Appointment
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentModal;