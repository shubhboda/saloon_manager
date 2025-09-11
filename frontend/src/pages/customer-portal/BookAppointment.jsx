import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';

const BookAppointment = () => {
  const [formData, setFormData] = useState({
    service: '',
    staff: '',
    date: '',
    time: '',
    notes: ''
  });
  const [services] = useState([
    { id: '1', name: 'Hair Cut', price: 50 },
    { id: '2', name: 'Hair Wash', price: 30 },
    { id: '3', name: 'Hair Color', price: 100 },
    { id: '4', name: 'Facial', price: 80 }
  ]);
  const [staff] = useState([
    { id: '1', name: 'John Doe' },
    { id: '2', name: 'Jane Smith' },
    { id: '3', name: 'Mike Johnson' }
  ]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Booking appointment:', formData);
    // Here you would make API call to book appointment
    alert('Appointment booked successfully!');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-2xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Book Appointment</h1>
            <p className="text-muted-foreground">
              Schedule your next visit with our professional staff.
            </p>
          </div>

          <div className="bg-card rounded-lg border border-border p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Service
                  </label>
                  <Select
                    value={formData.service}
                    onChange={(value) => handleInputChange('service', value)}
                    options={services.map(service => ({
                      value: service.id,
                      label: `${service.name} - $${service.price}`
                    }))}
                    placeholder="Select a service"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Staff Member
                  </label>
                  <Select
                    value={formData.staff}
                    onChange={(value) => handleInputChange('staff', value)}
                    options={staff.map(member => ({
                      value: member.id,
                      label: member.name
                    }))}
                    placeholder="Select staff member"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Date
                  </label>
                  <Input
                    type="date"
                    value={formData.date}
                    onChange={(e) => handleInputChange('date', e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Time
                  </label>
                  <Select
                    value={formData.time}
                    onChange={(value) => handleInputChange('time', value)}
                    options={[
                      { value: '09:00', label: '9:00 AM' },
                      { value: '10:00', label: '10:00 AM' },
                      { value: '11:00', label: '11:00 AM' },
                      { value: '14:00', label: '2:00 PM' },
                      { value: '15:00', label: '3:00 PM' },
                      { value: '16:00', label: '4:00 PM' }
                    ]}
                    placeholder="Select time"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  className="w-full px-3 py-2 border border-border rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                  rows={3}
                  value={formData.notes}
                  onChange={(e) => handleInputChange('notes', e.target.value)}
                  placeholder="Any special requests or notes..."
                />
              </div>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
                <Button type="submit">
                  Book Appointment
                </Button>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BookAppointment;
