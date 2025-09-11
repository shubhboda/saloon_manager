import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const AppointmentsHistory = () => {
  const [appointments] = useState([
    {
      id: '1',
      service: 'Hair Cut',
      staff: 'John Doe',
      date: '2025-01-15',
      time: '10:00 AM',
      status: 'completed',
      price: 50
    },
    {
      id: '2',
      service: 'Hair Color',
      staff: 'Jane Smith',
      date: '2025-01-20',
      time: '2:00 PM',
      status: 'upcoming',
      price: 100
    },
    {
      id: '3',
      service: 'Facial',
      staff: 'Mike Johnson',
      date: '2025-01-10',
      time: '11:00 AM',
      status: 'completed',
      price: 80
    }
  ]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'upcoming':
        return 'text-blue-600 bg-blue-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed':
        return 'CheckCircle';
      case 'upcoming':
        return 'Clock';
      case 'cancelled':
        return 'XCircle';
      default:
        return 'AlertCircle';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">My Appointments</h1>
            <p className="text-muted-foreground">
              View your appointment history and upcoming bookings.
            </p>
          </div>

          <div className="space-y-4">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="bg-card rounded-lg border border-border p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                      <Icon name="Calendar" size={24} color="white" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-foreground">
                        {appointment.service}
                      </h3>
                      <p className="text-muted-foreground">
                        with {appointment.staff}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {appointment.date} at {appointment.time}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-4">
                    <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      <Icon name={getStatusIcon(appointment.status)} size={16} className="inline mr-1" />
                      {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-foreground">
                        ${appointment.price}
                      </p>
                    </div>
                  </div>
                </div>

                {appointment.status === 'upcoming' && (
                  <div className="mt-4 flex justify-end space-x-2">
                    <Button variant="outline" size="sm">
                      Reschedule
                    </Button>
                    <Button variant="outline" size="sm" className="text-red-600 hover:text-red-700">
                      Cancel
                    </Button>
                  </div>
                )}
              </div>
            ))}
          </div>

          {appointments.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Calendar" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No appointments yet</h3>
              <p className="text-muted-foreground mb-4">
                You haven't booked any appointments yet.
              </p>
              <Button>
                Book Your First Appointment
              </Button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default AppointmentsHistory;
