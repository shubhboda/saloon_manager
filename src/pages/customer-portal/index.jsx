import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';

const CustomerPortal = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Mock login state
  const [services, setServices] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  // Mock customer data
  const customer = {
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+1 (555) 123-4567'
  };

  // Fetch services from staff API
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/staff');
        const staffData = await response.json();
        // Map staff to services
        const serviceList = staffData.map(staff => ({
          id: staff.id,
          name: staff.role,
          price: Math.floor(Math.random() * 100) + 30, // Mock price
          duration: '45 min' // Mock duration
        }));
        setServices(serviceList);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    const fetchAppointments = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/appointments');
        const appointmentsData = await response.json();
        setAppointments(appointmentsData);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    fetchServices();
    fetchAppointments();
    setLoading(false);
  }, []);

  const upcomingAppointments = appointments.slice(0, 2); // Show first 2 appointments

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Customer Portal</h1>
            <p className="text-muted-foreground">
              Book appointments, view your history, and manage your beauty experience.
            </p>
          </div>

          {!isLoggedIn ? (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="User" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">Welcome to Our Saloon</h3>
              <p className="text-muted-foreground mb-6">
                Please log in to book appointments and view your account.
              </p>
              <div className="space-x-4">
                <Button onClick={() => setIsLoggedIn(true)}>Login</Button>
                <Button variant="outline">Register</Button>
              </div>
            </div>
          ) : (
            <div className="space-y-8">
              {/* Welcome Section */}
              <div className="bg-card rounded-lg p-6 border">
                <h2 className="text-xl font-semibold mb-4">Welcome back, {customer.name}!</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center">
                    <Icon name="Calendar" size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Upcoming Appointments</p>
                    <p className="text-2xl font-bold">{upcomingAppointments.length}</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Clock" size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Total Visits</p>
                    <p className="text-2xl font-bold">12</p>
                  </div>
                  <div className="text-center">
                    <Icon name="Star" size={24} className="mx-auto mb-2 text-primary" />
                    <p className="text-sm text-muted-foreground">Loyalty Points</p>
                    <p className="text-2xl font-bold">450</p>
                  </div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Button className="h-20 flex flex-col items-center justify-center">
                  <Icon name="Plus" size={24} className="mb-2" />
                  Book Appointment
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Icon name="Calendar" size={24} className="mb-2" />
                  View Appointments
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Icon name="History" size={24} className="mb-2" />
                  Appointment History
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                  <Icon name="User" size={24} className="mb-2" />
                  Profile Settings
                </Button>
              </div>

              {/* Services */}
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-lg font-semibold mb-4">Our Services</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {services.map(service => (
                    <div key={service.id} className="border rounded-lg p-4">
                      <h4 className="font-medium">{service.name}</h4>
                      <p className="text-sm text-muted-foreground">{service.duration}</p>
                      <p className="text-lg font-bold text-primary">${service.price}</p>
                      <Button size="sm" className="mt-2">Book Now</Button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Upcoming Appointments */}
              <div className="bg-card rounded-lg p-6 border">
                <h3 className="text-lg font-semibold mb-4">Upcoming Appointments</h3>
                {upcomingAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {upcomingAppointments.map(apt => (
                      <div key={apt.id} className="flex justify-between items-center border-b pb-4">
                        <div>
                          <p className="font-medium">{apt.service}</p>
                          <p className="text-sm text-muted-foreground">
                            {apt.date} at {apt.time} with {apt.staff}
                          </p>
                        </div>
                        <Button variant="outline" size="sm">Reschedule</Button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-muted-foreground">No upcoming appointments.</p>
                )}
              </div>
            </div>
          )}

          {/* Link back to Owner Portal */}
          <div className="mt-8 text-center">
            <Link to="/" className="text-primary hover:underline">
              Switch to Owner/Manager Portal
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CustomerPortal;
