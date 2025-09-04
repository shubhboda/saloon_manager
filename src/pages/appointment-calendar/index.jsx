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

  // Mock data initialization
  useEffect(() => {
    const mockStaffMembers = [
      {
        id: 'sarah',
        name: 'Sarah Johnson',
        role: 'Senior Stylist',
        available: true,
        currentStatus: 'available',
        schedule: {
          0: { isWorking: false }, // Sunday
          1: { isWorking: true, startTime: '09:00', endTime: '18:00' }, // Monday
          2: { isWorking: true, startTime: '09:00', endTime: '18:00' }, // Tuesday
          3: { isWorking: true, startTime: '09:00', endTime: '18:00' }, // Wednesday
          4: { isWorking: true, startTime: '09:00', endTime: '18:00' }, // Thursday
          5: { isWorking: true, startTime: '09:00', endTime: '17:00' }, // Friday
          6: { isWorking: true, startTime: '10:00', endTime: '16:00' }  // Saturday
        }
      },
      {
        id: 'mike',
        name: 'Mike Chen',
        role: 'Hair Colorist',
        available: true,
        currentStatus: 'busy',
        schedule: {
          0: { isWorking: false },
          1: { isWorking: true, startTime: '10:00', endTime: '19:00' },
          2: { isWorking: true, startTime: '10:00', endTime: '19:00' },
          3: { isWorking: true, startTime: '10:00', endTime: '19:00' },
          4: { isWorking: true, startTime: '10:00', endTime: '19:00' },
          5: { isWorking: true, startTime: '10:00', endTime: '18:00' },
          6: { isWorking: true, startTime: '09:00', endTime: '17:00' }
        }
      },
      {
        id: 'emma',
        name: 'Emma Davis',
        role: 'Nail Technician',
        available: true,
        currentStatus: 'break',
        schedule: {
          0: { isWorking: false },
          1: { isWorking: true, startTime: '09:00', endTime: '17:00' },
          2: { isWorking: true, startTime: '09:00', endTime: '17:00' },
          3: { isWorking: true, startTime: '09:00', endTime: '17:00' },
          4: { isWorking: true, startTime: '09:00', endTime: '17:00' },
          5: { isWorking: true, startTime: '09:00', endTime: '17:00' },
          6: { isWorking: true, startTime: '10:00', endTime: '15:00' }
        }
      },
      {
        id: 'alex',
        name: 'Alex Rodriguez',
        role: 'Esthetician',
        available: true,
        currentStatus: 'available',
        schedule: {
          0: { isWorking: false },
          1: { isWorking: true, startTime: '11:00', endTime: '20:00' },
          2: { isWorking: true, startTime: '11:00', endTime: '20:00' },
          3: { isWorking: true, startTime: '11:00', endTime: '20:00' },
          4: { isWorking: true, startTime: '11:00', endTime: '20:00' },
          5: { isWorking: true, startTime: '11:00', endTime: '19:00' },
          6: { isWorking: true, startTime: '10:00', endTime: '18:00' }
        }
      }
    ];

    const mockAppointments = [
      {
        id: '1',
        customerName: 'Alice Johnson',
        customerPhone: '(555) 123-4567',
        customerEmail: 'alice@example.com',
        serviceType: 'haircut',
        serviceName: 'Haircut',
        staffId: 'sarah',
        date: new Date()?.toISOString()?.split('T')?.[0],
        time: '10:00',
        duration: 45,
        status: 'confirmed',
        notes: 'Regular customer, prefers shorter layers'
      },
      {
        id: '2',
        customerName: 'Bob Smith',
        customerPhone: '(555) 234-5678',
        customerEmail: 'bob@example.com',
        serviceType: 'coloring',
        serviceName: 'Hair Coloring',
        staffId: 'mike',
        date: new Date()?.toISOString()?.split('T')?.[0],
        time: '14:00',
        duration: 120,
        status: 'confirmed',
        notes: 'First time coloring, wants natural brown'
      },
      {
        id: '3',
        customerName: 'Carol Davis',
        customerPhone: '(555) 345-6789',
        customerEmail: 'carol@example.com',
        serviceType: 'manicure',
        serviceName: 'Manicure',
        staffId: 'emma',
        date: new Date()?.toISOString()?.split('T')?.[0],
        time: '11:30',
        duration: 45,
        status: 'pending',
        notes: 'Gel polish, prefers neutral colors'
      },
      {
        id: '4',
        customerName: 'David Wilson',
        customerPhone: '(555) 456-7890',
        customerEmail: 'david@example.com',
        serviceType: 'facial',
        serviceName: 'Facial Treatment',
        staffId: 'alex',
        date: new Date()?.toISOString()?.split('T')?.[0],
        time: '16:00',
        duration: 90,
        status: 'confirmed',
        notes: 'Sensitive skin, avoid strong products'
      }
    ];

    const mockWaitlistCustomers = [
      {
        id: 'w1',
        name: 'Jennifer Brown',
        phone: '(555) 567-8901',
        requestedService: 'Hair Styling',
        preferredStaff: 'Sarah Johnson',
        priority: 'high',
        addedTime: new Date(Date.now() - 45 * 60 * 1000)?.toISOString(), // 45 minutes ago
        notes: 'Wedding tomorrow, very urgent'
      },
      {
        id: 'w2',
        name: 'Michael Taylor',
        phone: '(555) 678-9012',
        requestedService: 'Haircut',
        preferredStaff: null,
        priority: 'medium',
        addedTime: new Date(Date.now() - 120 * 60 * 1000)?.toISOString(), // 2 hours ago
        notes: 'Flexible with timing'
      },
      {
        id: 'w3',
        name: 'Lisa Anderson',
        phone: '(555) 789-0123',
        requestedService: 'Pedicure',
        preferredStaff: 'Emma Davis',
        priority: 'low',
        addedTime: new Date(Date.now() - 30 * 60 * 1000)?.toISOString(), // 30 minutes ago
        notes: 'Can wait until later today'
      }
    ];

    setStaffMembers(mockStaffMembers);
    setAppointments(mockAppointments);
    setWaitlistCustomers(mockWaitlistCustomers);
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="pt-16">
        <div className="p-6">
          <Breadcrumb />
          
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Main Calendar Area */}
            <div className="flex-1 flex flex-col">
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