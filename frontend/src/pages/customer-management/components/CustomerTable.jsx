import React, { useState, useMemo } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const CustomerTable = ({ customers, onEditCustomer, onViewHistory, onBookAppointment, selectedCustomers, onSelectCustomer, onSelectAll }) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });

  const handleSort = (key) => {
    let direction = 'asc';
    if (sortConfig?.key === key && sortConfig?.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const sortedCustomers = React.useMemo(() => {
    if (!sortConfig?.key) return customers;

    return [...customers]?.sort((a, b) => {
      if (sortConfig?.key === 'totalSpent') {
        return sortConfig?.direction === 'asc' 
          ? a?.totalSpent - b?.totalSpent 
          : b?.totalSpent - a?.totalSpent;
      }
      
      if (sortConfig?.key === 'lastVisit') {
        return sortConfig?.direction === 'asc'
          ? new Date(a.lastVisit) - new Date(b.lastVisit)
          : new Date(b.lastVisit) - new Date(a.lastVisit);
      }

      const aValue = a?.[sortConfig?.key]?.toString()?.toLowerCase() || '';
      const bValue = b?.[sortConfig?.key]?.toString()?.toLowerCase() || '';
      
      if (aValue < bValue) return sortConfig?.direction === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortConfig?.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }, [customers, sortConfig]);

  const getSortIcon = (columnKey) => {
    if (sortConfig?.key !== columnKey) {
      return <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />;
    }
    return sortConfig?.direction === 'asc' 
      ? <Icon name="ArrowUp" size={16} className="text-foreground" />
      : <Icon name="ArrowDown" size={16} className="text-foreground" />;
  };

  const getLoyaltyBadge = (status) => {
    const badges = {
      'VIP': 'bg-yellow-100 text-yellow-800 border-yellow-200',
      'Gold': 'bg-orange-100 text-orange-800 border-orange-200',
      'Silver': 'bg-gray-100 text-gray-800 border-gray-200',
      'Regular': 'bg-blue-100 text-blue-800 border-blue-200'
    };
    
    return badges?.[status] || badges?.['Regular'];
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    })?.format(amount);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="bg-card rounded-lg border border-border salon-shadow-card">
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/50 border-b border-border">
            <tr>
              <th className="w-12 px-4 py-3">
                <input
                  type="checkbox"
                  checked={selectedCustomers?.length === customers?.length}
                  onChange={onSelectAll}
                  className="rounded border-border"
                />
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-2 hover:text-accent salon-transition-micro"
                >
                  <span>Customer</span>
                  {getSortIcon('name')}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center space-x-2 hover:text-accent salon-transition-micro"
                >
                  <span>Contact</span>
                  {getSortIcon('email')}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => handleSort('lastVisit')}
                  className="flex items-center space-x-2 hover:text-accent salon-transition-micro"
                >
                  <span>Last Visit</span>
                  {getSortIcon('lastVisit')}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">
                <button
                  onClick={() => handleSort('totalSpent')}
                  className="flex items-center space-x-2 hover:text-accent salon-transition-micro"
                >
                  <span>Total Spent</span>
                  {getSortIcon('totalSpent')}
                </button>
              </th>
              <th className="text-left px-4 py-3 font-medium text-foreground">Loyalty Status</th>
              <th className="text-right px-4 py-3 font-medium text-foreground">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {sortedCustomers?.map((customer) => (
              <tr key={customer?.id} className="hover:bg-muted/30 salon-transition-micro">
                <td className="px-4 py-4">
                  <input
                    type="checkbox"
                    checked={selectedCustomers?.includes(customer?.id)}
                    onChange={() => onSelectCustomer(customer?.id)}
                    className="rounded border-border"
                  />
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center space-x-3">
                    <Image
                      src={customer?.avatar}
                      alt={customer?.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="font-medium text-foreground">{customer?.name}</p>
                      <p className="text-sm text-muted-foreground">ID: {customer?.id}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <div>
                    <p className="text-sm text-foreground">{customer?.email}</p>
                    <p className="text-sm text-muted-foreground">{customer?.phone}</p>
                  </div>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-foreground">{formatDate(customer?.lastVisit)}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="font-medium text-foreground">{formatCurrency(customer?.totalSpent)}</p>
                </td>
                <td className="px-4 py-4">
                  <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getLoyaltyBadge(customer?.loyaltyStatus)}`}>
                    {customer?.loyaltyStatus}
                  </span>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center justify-end space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onBookAppointment(customer)}
                      iconName="Calendar"
                      iconSize={16}
                    >
                      Book
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewHistory(customer)}
                      iconName="History"
                      iconSize={16}
                    >
                      History
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onEditCustomer(customer)}
                      iconName="Edit"
                      iconSize={16}
                    >
                      Edit
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden divide-y divide-border">
        {sortedCustomers?.map((customer) => (
          <div key={customer?.id} className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  checked={selectedCustomers?.includes(customer?.id)}
                  onChange={() => onSelectCustomer(customer?.id)}
                  className="rounded border-border mt-1"
                />
                <Image
                  src={customer?.avatar}
                  alt={customer?.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-medium text-foreground">{customer?.name}</h3>
                  <p className="text-sm text-muted-foreground">ID: {customer?.id}</p>
                </div>
              </div>
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getLoyaltyBadge(customer?.loyaltyStatus)}`}>
                {customer?.loyaltyStatus}
              </span>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4 text-sm">
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="text-foreground">{customer?.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Phone</p>
                <p className="text-foreground">{customer?.phone}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Last Visit</p>
                <p className="text-foreground">{formatDate(customer?.lastVisit)}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Total Spent</p>
                <p className="font-medium text-foreground">{formatCurrency(customer?.totalSpent)}</p>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => onBookAppointment(customer)}
                iconName="Calendar"
                iconSize={16}
                className="flex-1"
              >
                Book
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewHistory(customer)}
                iconName="History"
                iconSize={16}
                className="flex-1"
              >
                History
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onEditCustomer(customer)}
                iconName="Edit"
                iconSize={16}
                className="flex-1"
              >
                Edit
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CustomerTable;