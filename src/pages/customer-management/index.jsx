import React, { useState, useMemo } from 'react';
import Header from '../../components/ui/Header';
import Breadcrumb from '../../components/ui/Breadcrumb';
import CustomerStats from './components/CustomerStats';
import CustomerFilters from './components/CustomerFilters';
import CustomerTable from './components/CustomerTable';
import CustomerModal from './components/CustomerModal';
import Icon from '../../components/AppIcon';


const CustomerManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({});
  const [selectedCustomers, setSelectedCustomers] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);
  const [modalMode, setModalMode] = useState('view');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Mock customer data
  const mockCustomers = [
    {
      id: 'CUST001',
      name: 'Ravi Sharma',
      email: 'ravi.sharma247@email.in',
      phone: '+91 98764 32015',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
      lastVisit: '2025-01-15',
      totalSpent: 1250.00,
      totalVisits: 18,
      loyaltyStatus: 'VIP',
      joinDate: '2023-03-15',
      address: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      dateOfBirth: '1988-07-22'
    },
    {
      id: 'CUST002',
      name: 'Pooja Mehta',
      email: 'pooja.m1993@outlook.com',
      phone: '+91 91234 78956',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      lastVisit: '2025-01-12',
      totalSpent: 890.00,
      totalVisits: 12,
      loyaltyStatus: 'Gold',
      joinDate: '2023-06-10',
      address: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      dateOfBirth: '1985-11-15'
    },
    {
      id: 'CUST003',
      name: 'Arjun Verma',
      email: 'arjun.verma88@gmail.com',
      phone: '+91 99872 45610',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      lastVisit: '2025-01-10',
      totalSpent: 650.00,
      totalVisits: 8,
      loyaltyStatus: 'Silver',
      joinDate: '2023-09-20',
      address: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      dateOfBirth: '1992-04-08'
    },
    {
      id: 'CUST004',
      name: 'David Thompson',
      email: 'david.thompson@email.com',
      phone: '(555) 456-7890',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      lastVisit: '2025-01-08',
      totalSpent: 420.00,
      totalVisits: 6,
      loyaltyStatus: 'Regular',
      joinDate: '2024-01-12',
      address: '321 Elm St',
      city: 'Houston',
      state: 'TX',
      zipCode: '77001',
      dateOfBirth: '1990-09-30'
    },
    {
      id: 'CUST005',
      name: 'Jessica Martinez',
      email: 'jessica.martinez@email.com',
      phone: '(555) 567-8901',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face',
      lastVisit: '2025-01-05',
      totalSpent: 1580.00,
      totalVisits: 22,
      loyaltyStatus: 'VIP',
      joinDate: '2022-11-08',
      address: '654 Maple Dr',
      city: 'Miami',
      state: 'FL',
      zipCode: '33101',
      dateOfBirth: '1987-12-18'
    },
    {
      id: 'CUST006',
      name: 'Robert Wilson',
      email: 'robert.wilson@email.com',
      phone: '(555) 678-9012',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face',
      lastVisit: '2025-01-03',
      totalSpent: 320.00,
      totalVisits: 4,
      loyaltyStatus: 'Regular',
      joinDate: '2024-05-15',
      address: '987 Cedar Ln',
      city: 'Phoenix',
      state: 'AZ',
      zipCode: '85001',
      dateOfBirth: '1983-06-25'
    },
    {
      id: 'CUST007',
      name: 'Amanda Davis',
      email: 'amanda.davis@email.com',
      phone: '(555) 789-0123',
      avatar: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=150&h=150&fit=crop&crop=face',
      lastVisit: '2024-12-28',
      totalSpent: 750.00,
      totalVisits: 10,
      loyaltyStatus: 'Silver',
      joinDate: '2023-08-22',
      address: '147 Birch St',
      city: 'Seattle',
      state: 'WA',
      zipCode: '98101',
      dateOfBirth: '1991-03-12'
    },
    {
      id: 'CUST008',
      name: 'Christopher Lee',
      email: 'christopher.lee@email.com',
      phone: '(555) 890-1234',
      avatar: 'https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?w=150&h=150&fit=crop&crop=face',
      lastVisit: '2024-12-25',
      totalSpent: 1120.00,
      totalVisits: 15,
      loyaltyStatus: 'Gold',
      joinDate: '2023-02-14',
      address: '258 Spruce Ave',
      city: 'Denver',
      state: 'CO',
      zipCode: '80201',
      dateOfBirth: '1986-10-05'
    }
  ];

  // Mock statistics
  const mockStats = {
    totalCustomers: 1247,
    customerGrowth: 8.2,
    newCustomers: 42,
    newCustomerGrowth: 15.3,
    retentionRate: 87,
    retentionChange: 3.1,
    averageSpend: 156,
    spendChange: 12.4
  };

  // Filter customers based on search and filters
  const filteredCustomers = useMemo(() => {
    let filtered = mockCustomers;

    // Apply search filter
    if (searchTerm) {
      const search = searchTerm?.toLowerCase();
      filtered = filtered?.filter(customer =>
        customer?.name?.toLowerCase()?.includes(search) ||
        customer?.email?.toLowerCase()?.includes(search) ||
        customer?.phone?.includes(search) ||
        customer?.id?.toLowerCase()?.includes(search)
      );
    }

    // Apply advanced filters
    if (filters?.loyaltyStatus) {
      filtered = filtered?.filter(customer => customer?.loyaltyStatus === filters?.loyaltyStatus);
    }

    if (filters?.spendingRange) {
      const [min, max] = filters?.spendingRange?.split('-')?.map(v => v === '+' ? Infinity : parseInt(v));
      filtered = filtered?.filter(customer => {
        if (max === undefined) return customer?.totalSpent >= min;
        return customer?.totalSpent >= min && customer?.totalSpent <= max;
      });
    }

    if (filters?.lastVisit) {
      const days = parseInt(filters?.lastVisit);
      const cutoffDate = new Date();
      cutoffDate?.setDate(cutoffDate?.getDate() - days);
      filtered = filtered?.filter(customer => new Date(customer.lastVisit) >= cutoffDate);
    }

    return filtered;
  }, [searchTerm, filters]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  const handleSelectCustomer = (customerId) => {
    setSelectedCustomers(prev => 
      prev?.includes(customerId)
        ? prev?.filter(id => id !== customerId)
        : [...prev, customerId]
    );
  };

  const handleSelectAll = () => {
    if (selectedCustomers?.length === filteredCustomers?.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers?.map(customer => customer?.id));
    }
  };

  const handleEditCustomer = (customer) => {
    setSelectedCustomer(customer);
    setModalMode('edit');
    setIsModalOpen(true);
  };

  const handleViewHistory = (customer) => {
    setSelectedCustomer(customer);
    setModalMode('view');
    setIsModalOpen(true);
  };

  const handleBookAppointment = (customer) => {
    console.log('Booking appointment for:', customer?.name);
    // Navigate to appointment booking with customer pre-selected
  };

  const handleExport = () => {
    console.log('Exporting selected customers:', selectedCustomers);
    // Implement export functionality
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedCustomer(null);
    setModalMode('view');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="pt-16">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <Breadcrumb />
          
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">Customer Management</h1>
            <p className="text-muted-foreground">
              Manage your customer database, track service history, and build lasting relationships.
            </p>
          </div>

          <CustomerStats stats={mockStats} />
          
          <CustomerFilters
            onSearch={handleSearch}
            onFilter={handleFilter}
            onExport={handleExport}
            selectedCount={selectedCustomers?.length}
          />

          <CustomerTable
            customers={filteredCustomers}
            onEditCustomer={handleEditCustomer}
            onViewHistory={handleViewHistory}
            onBookAppointment={handleBookAppointment}
            selectedCustomers={selectedCustomers}
            onSelectCustomer={handleSelectCustomer}
            onSelectAll={handleSelectAll}
          />

          {filteredCustomers?.length === 0 && (
            <div className="text-center py-12">
              <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                <Icon name="Users" size={32} className="text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-2">No customers found</h3>
              <p className="text-muted-foreground mb-4">
                {searchTerm || Object.values(filters)?.some(v => v)
                  ? 'Try adjusting your search or filters' :'Get started by adding your first customer'
                }
              </p>
            </div>
          )}
        </div>
      </main>
      <CustomerModal
        customer={selectedCustomer}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        mode={modalMode}
      />
    </div>
  );
};

export default CustomerManagement;