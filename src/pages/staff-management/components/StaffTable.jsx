import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Image from '../../../components/AppImage';

const StaffTable = ({ onViewProfile, onEditSchedule, onViewPerformance }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [filterRole, setFilterRole] = useState('all');

  const staffData = [
    {
      id: 1,
      name: "Sarah Johnson",
      role: "Senior Stylist",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      status: "active",
      schedule: "9:00 AM - 6:00 PM",
      performance: 4.8,
      commission: "$2,450",
      phone: "(555) 123-4567",
      email: "sarah.johnson@salon.com",
      specializations: ["Hair Cutting", "Coloring", "Styling"],
      joinDate: "2022-03-15",
      todayAppointments: 8,
      completionRate: 95
    },
    {
      id: 2,
      name: "Michael Chen",
      role: "Barber",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      status: "active",
      schedule: "10:00 AM - 7:00 PM",
      performance: 4.6,
      commission: "$1,890",
      phone: "(555) 234-5678",
      email: "michael.chen@salon.com",
      specializations: ["Men\'s Cuts", "Beard Trimming", "Shaving"],
      joinDate: "2021-11-08",
      todayAppointments: 6,
      completionRate: 92
    },
    {
      id: 3,
      name: "Emily Rodriguez",
      role: "Nail Technician",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      status: "break",
      schedule: "8:00 AM - 5:00 PM",
      performance: 4.9,
      commission: "$1,650",
      phone: "(555) 345-6789",
      email: "emily.rodriguez@salon.com",
      specializations: ["Manicure", "Pedicure", "Nail Art"],
      joinDate: "2023-01-20",
      todayAppointments: 5,
      completionRate: 98
    },
    {
      id: 4,
      name: "David Thompson",
      role: "Massage Therapist",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      status: "active",
      schedule: "11:00 AM - 8:00 PM",
      performance: 4.7,
      commission: "$2,100",
      phone: "(555) 456-7890",
      email: "david.thompson@salon.com",
      specializations: ["Deep Tissue", "Swedish", "Hot Stone"],
      joinDate: "2022-07-12",
      todayAppointments: 4,
      completionRate: 89
    },
    {
      id: 5,
      name: "Lisa Park",
      role: "Esthetician",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      status: "off",
      schedule: "Day Off",
      performance: 4.5,
      commission: "$1,320",
      phone: "(555) 567-8901",
      email: "lisa.park@salon.com",
      specializations: ["Facials", "Chemical Peels", "Microdermabrasion"],
      joinDate: "2023-05-03",
      todayAppointments: 0,
      completionRate: 87
    },
    {
      id: 6,
      name: "James Wilson",
      role: "Hair Colorist",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      status: "active",
      schedule: "9:30 AM - 6:30 PM",
      performance: 4.8,
      commission: "$2,780",
      phone: "(555) 678-9012",
      email: "james.wilson@salon.com",
      specializations: ["Hair Coloring", "Highlights", "Balayage"],
      joinDate: "2021-09-14",
      todayAppointments: 7,
      completionRate: 94
    }
  ];

  const roleOptions = [
    { value: 'all', label: 'All Roles' },
    { value: 'Senior Stylist', label: 'Senior Stylist' },
    { value: 'Barber', label: 'Barber' },
    { value: 'Nail Technician', label: 'Nail Technician' },
    { value: 'Massage Therapist', label: 'Massage Therapist' },
    { value: 'Esthetician', label: 'Esthetician' },
    { value: 'Hair Colorist', label: 'Hair Colorist' }
  ];

  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'role', label: 'Role' },
    { value: 'performance', label: 'Performance' },
    { value: 'commission', label: 'Commission' }
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success', label: 'Active' },
      break: { color: 'bg-warning/10 text-warning', label: 'On Break' },
      off: { color: 'bg-muted text-muted-foreground', label: 'Off Duty' }
    };
    
    const config = statusConfig?.[status] || statusConfig?.off;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const filteredAndSortedStaff = staffData?.filter(staff => {
      const matchesSearch = staff?.name?.toLowerCase()?.includes(searchTerm?.toLowerCase()) ||
                           staff?.role?.toLowerCase()?.includes(searchTerm?.toLowerCase());
      const matchesRole = filterRole === 'all' || staff?.role === filterRole;
      return matchesSearch && matchesRole;
    })?.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return a?.name?.localeCompare(b?.name);
        case 'role':
          return a?.role?.localeCompare(b?.role);
        case 'performance':
          return b?.performance - a?.performance;
        case 'commission':
          return parseFloat(b?.commission?.replace('$', '')?.replace(',', '')) - 
                 parseFloat(a?.commission?.replace('$', '')?.replace(',', ''));
        default:
          return 0;
      }
    });

  return (
    <div className="bg-card border border-border rounded-lg salon-shadow-card">
      {/* Header with Search and Filters */}
      <div className="p-6 border-b border-border">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Staff Directory</h2>
            <p className="text-sm text-muted-foreground">Manage your salon team</p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Input
              type="search"
              placeholder="Search staff..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e?.target?.value)}
              className="w-full sm:w-64"
            />
            
            <Select
              options={roleOptions}
              value={filterRole}
              onChange={setFilterRole}
              placeholder="Filter by role"
              className="w-full sm:w-48"
            />
            
            <Select
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              className="w-full sm:w-40"
            />
          </div>
        </div>
      </div>
      {/* Desktop Table View */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50">
            <tr>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Staff Member</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Role</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Status</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Schedule</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Performance</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Commission</th>
              <th className="text-left p-4 text-sm font-medium text-muted-foreground">Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredAndSortedStaff?.map((staff) => (
              <tr key={staff?.id} className="border-b border-border hover:bg-muted/30 salon-transition-micro">
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={staff?.avatar}
                      alt={staff?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{staff?.name}</p>
                      <p className="text-sm text-muted-foreground">{staff?.email}</p>
                    </div>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{staff?.role}</span>
                </td>
                <td className="p-4">
                  {getStatusBadge(staff?.status)}
                </td>
                <td className="p-4">
                  <span className="text-sm text-foreground">{staff?.schedule}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={16} className="text-warning fill-current" />
                    <span className="text-sm font-medium text-foreground">{staff?.performance}</span>
                  </div>
                </td>
                <td className="p-4">
                  <span className="text-sm font-medium text-foreground">{staff?.commission}</span>
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewProfile(staff)}
                      iconName="User"
                      iconSize={16}
                    >
                      Profile
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditSchedule(staff)}
                      iconName="Calendar"
                      iconSize={16}
                    >
                      Schedule
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewPerformance(staff)}
                      iconName="BarChart3"
                      iconSize={16}
                    >
                      Performance
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Card View */}
      <div className="lg:hidden">
        {filteredAndSortedStaff?.map((staff) => (
          <div key={staff?.id} className="p-4 border-b border-border last:border-b-0">
            <div className="flex items-start space-x-3">
              <Image
                src={staff?.avatar}
                alt={staff?.name}
                className="w-12 h-12 rounded-full object-cover flex-shrink-0"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-medium text-foreground truncate">{staff?.name}</h3>
                  {getStatusBadge(staff?.status)}
                </div>
                <p className="text-sm text-muted-foreground mb-1">{staff?.role}</p>
                <p className="text-sm text-muted-foreground mb-2">{staff?.schedule}</p>
                
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-1">
                    <Icon name="Star" size={14} className="text-warning fill-current" />
                    <span className="text-sm text-foreground">{staff?.performance}</span>
                  </div>
                  <span className="text-sm font-medium text-foreground">{staff?.commission}</span>
                </div>
                
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onViewProfile(staff)}
                    iconName="User"
                    iconSize={14}
                    className="flex-1"
                  >
                    Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onEditSchedule(staff)}
                    iconName="Calendar"
                    iconSize={14}
                    className="flex-1"
                  >
                    Schedule
                  </Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredAndSortedStaff?.length === 0 && (
        <div className="p-8 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No staff found</h3>
          <p className="text-muted-foreground">Try adjusting your search or filter criteria.</p>
        </div>
      )}
    </div>
  );
};

export default StaffTable;