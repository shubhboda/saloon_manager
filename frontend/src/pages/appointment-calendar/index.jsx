import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CalendarHeader from './components/CalendarHeader';
import CalendarGrid from './components/CalendarGrid';
import AppointmentModal from './components/AppointmentModal';
import StaffAvailability from './components/StaffAvailability';
import WaitlistPanel from './components/WaitlistPanel';

const AppointmentCalendar = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('week');
  const [selectedStaff, setSelectedStaff] = useState('all');
  const [selectedService, setSelectedService] = useState('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [appointments, setAppointments] = useState([]);
  const [staffMembers, setStaffMembers] = useState([]);
  const [waitlistCustomers, setWaitlistCustomers] = useState([]);

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch staff
        const staffResponse = await fetch('http://localhost:4000/api/staff');
        const staffData = await staffResponse.json();

        // Map staff data to the expected format
        const formattedStaff = staffData.map(staff => ({
          id: staff.id.toString(),
          name: staff.name,
          role: staff.role,
          available: true,
          currentStatus: 'available',
          schedule: {
            0: { isWorking: false },
            1: { isWorking: true, startTime: '09:00', endTime: '18:00' },
            2: { isWorking: true, startTime: '09:00', endTime: '18:00' },
            3: { isWorking: true, startTime: '09:00', endTime: '18:00' },
            4: { isWorking: true, startTime: '09:00', endTime: '18:00' },
            5: { isWorking: true, startTime: '09:00', endTime: '17:00' },
            6: { isWorking: true, startTime: '10:00', endTime: '16:00' }
          }
        }));
        setStaffMembers(formattedStaff);

        // Fetch appointments
        const appointmentsResponse = await fetch('http://localhost:4000/api/appointments');
        const appointmentsData = await appointmentsResponse.json();

        // Map appointments to expected format
        const formattedAppointments = appointmentsData.map(apt => ({
          id: apt.id.toString(),
          customerName: `Customer ${apt.customer_id}`,
          customerPhone: '(555) 123-4567',
          customerEmail: 'customer@example.com',
          serviceType: apt.service.toLowerCase().replace(' ', ''),
          serviceName: apt.service,
          staffId: apt.staff_id.toString(),
          date: apt.time.split(' ')[0],
          time: apt.time.split(' ')[1],
          duration: 45,
          status: 'confirmed',
          notes: 'Appointment from database'
        }));
        setAppointments(formattedAppointments);

        // Mock waitlist for now
        const mockWaitlistCustomers = [
          {
            id: 'w1',
            name: 'Jennifer Brown',
            phone: '(555) 567-8901',
            requestedService: 'Hair Styling',
            preferredStaff: 'Sarah Johnson',
            priority: 'high',
            addedTime: new Date(Date.now() - 45 * 60 * 1000)?.toISOString(),
            notes: 'Wedding tomorrow, very urgent'
          }
        ];
        setWaitlistCustomers(mockWaitlistCustomers);

      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const handleTodayClick = () => {
    setCurrentDate(new Date());
  };

  const handleNewAppointment = () => {
    setSelectedAppointment(null);
    setSelectedTimeSlot(null);
    setIsModalOpen(true);
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setSelectedTimeSlot(null);
    setIsModalOpen(true);
  };

  const handleTimeSlotClick = (date, time, staffId = null) => {
    setSelectedAppointment(null);
    setSelectedTimeSlot({
      date,
      time,
      staffId
    });
    setIsModalOpen(true);
  };

  const handleSaveAppointment = async (appointmentData) => {
    if (selectedAppointment) {
      // Update existing appointment
      setAppointments(prev => 
        prev?.map(apt => 
          apt?.id === selectedAppointment?.id ? appointmentData : apt
        )
      );
    } else {
      // Create new appointment
      setAppointments(prev => [...prev, appointmentData]);
    }
  };

  const handleDeleteAppointment = async (appointmentId) => {
    setAppointments(prev => prev?.filter(apt => apt?.id !== appointmentId));
  };

  const handleStaffClick = (staff) => {
    setSelectedStaff(staff?.id);
  };

  const handleMoveToAppointment = (customer) => {
    setSelectedAppointment(null);
    setSelectedTimeSlot({
      date: currentDate,
      time: '09:00',
      staffId: null,
      customerName: customer?.name,
      customerPhone: customer?.phone,
      serviceType: customer?.requestedService?.toLowerCase()?.replace(' ', '')
    });
    setIsModalOpen(true);
    
    // Remove from waitlist
    setWaitlistCustomers(prev => prev?.filter(c => c?.id !== customer?.id));
  };

  const handleRemoveFromWaitlist = (customerId) => {
    setWaitlistCustomers(prev => prev?.filter(c => c?.id !== customerId));
  };

  // Filter appointments based on selected filters
  const filteredAppointments = appointments?.filter(apt => {
    const staffMatch = selectedStaff === 'all' || apt?.staffId === selectedStaff;
    const serviceMatch = selectedService === 'all' || apt?.serviceType === selectedService;
    return staffMatch && serviceMatch;
  });

return (
    <div className="min-h-screen bg-background font-sans text-foreground">
      <Header />
      
      <main className="pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Calendar Area */}
            <div className="flex-1 flex flex-col salon-shadow-card rounded-lg p-4 salon-transition-layout bg-card">
              <CalendarHeader
                currentDate={currentDate}
                viewMode={viewMode}
                onViewModeChange={setViewMode}
                onDateChange={setCurrentDate}
                selectedStaff={selectedStaff}
                onStaffChange={setSelectedStaff}
                selectedService={selectedService}
                onServiceChange={setSelectedService}
                onTodayClick={handleTodayClick}
                onNewAppointment={handleNewAppointment}
              />
              
              <CalendarGrid
                viewMode={viewMode}
                currentDate={currentDate}
                appointments={filteredAppointments}
                onAppointmentClick={handleAppointmentClick}
                onTimeSlotClick={handleTimeSlotClick}
                staffMembers={staffMembers}
              />
            </div>

            {/* Sidebar */}
            <div className="w-full lg:w-80 space-y-6">
              <StaffAvailability
                staffMembers={staffMembers}
                selectedDate={currentDate}
                onStaffClick={handleStaffClick}
              />
              
              <WaitlistPanel
                waitlistCustomers={waitlistCustomers}
                onMoveToAppointment={handleMoveToAppointment}
                onRemoveFromWaitlist={handleRemoveFromWaitlist}
              />
            </div>
          </div>
        </div>
      </main>

      {/* Appointment Modal */}
      <AppointmentModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        appointment={selectedAppointment}
        selectedDate={selectedTimeSlot?.date}
        selectedTime={selectedTimeSlot?.time}
        selectedStaffId={selectedTimeSlot?.staffId}
        onSave={handleSaveAppointment}
        onDelete={handleDeleteAppointment}
      />
    </div>
  );
};

export default AppointmentCalendar;
