import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerFilters = ({ onSearch, onFilter, onExport, selectedCount }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [filters, setFilters] = useState({
    loyaltyStatus: '',
    visitFrequency: '',
    spendingRange: '',
    lastVisit: ''
  });

  const handleSearchChange = (e) => {
    const value = e?.target?.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilter(newFilters);
  };

  const clearFilters = () => {
    setFilters({
      loyaltyStatus: '',
      visitFrequency: '',
      spendingRange: '',
      lastVisit: ''
    });
    setSearchTerm('');
    onSearch('');
    onFilter({});
  };

  const loyaltyOptions = [
    { value: '', label: 'All Loyalty Levels' },
    { value: 'VIP', label: 'VIP' },
    { value: 'Gold', label: 'Gold' },
    { value: 'Silver', label: 'Silver' },
    { value: 'Regular', label: 'Regular' }
  ];

  const frequencyOptions = [
    { value: '', label: 'All Frequencies' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'monthly', label: 'Monthly' },
    { value: 'quarterly', label: 'Quarterly' },
    { value: 'yearly', label: 'Yearly' }
  ];

  const spendingOptions = [
    { value: '', label: 'All Spending Ranges' },
    { value: '0-100', label: '$0 - $100' },
    { value: '100-500', label: '$100 - $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000+', label: '$1,000+' }
  ];

  const visitOptions = [
    { value: '', label: 'All Time' },
    { value: '7', label: 'Last 7 days' },
    { value: '30', label: 'Last 30 days' },
    { value: '90', label: 'Last 3 months' },
    { value: '365', label: 'Last year' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6 salon-shadow-card mb-6">
      {/* Search and Primary Actions */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
        <div className="flex-1 max-w-md">
          <div className="relative">
            <Icon 
              name="Search" 
              size={20} 
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
            />
            <Input
              type="text"
              placeholder="Search customers by name, email, or phone..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="pl-10"
            />
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
            iconName="Filter"
            iconPosition="left"
            iconSize={16}
          >
            Filters
          </Button>
          
          {selectedCount > 0 && (
            <Button
              variant="outline"
              onClick={onExport}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              Export ({selectedCount})
            </Button>
          )}
          
          <Button
            variant="default"
            iconName="UserPlus"
            iconPosition="left"
            iconSize={16}
            onClick={() => {
              if (typeof window !== 'undefined' && window.dispatchEvent) {
                window.dispatchEvent(new CustomEvent('addCustomer'));
              }
            }}
          >
            Add Customer
          </Button>
        </div>
      </div>
      {/* Advanced Filters */}
      {showAdvancedFilters && (
        <div className="border-t border-border pt-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Loyalty Status
              </label>
              <select
                value={filters?.loyaltyStatus}
                onChange={(e) => handleFilterChange('loyaltyStatus', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {loyaltyOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Visit Frequency
              </label>
              <select
                value={filters?.visitFrequency}
                onChange={(e) => handleFilterChange('visitFrequency', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {frequencyOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Spending Range
              </label>
              <select
                value={filters?.spendingRange}
                onChange={(e) => handleFilterChange('spendingRange', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {spendingOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Last Visit
              </label>
              <select
                value={filters?.lastVisit}
                onChange={(e) => handleFilterChange('lastVisit', e?.target?.value)}
                className="w-full px-3 py-2 border border-border rounded-md bg-input text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              >
                {visitOptions?.map(option => (
                  <option key={option?.value} value={option?.value}>
                    {option?.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {Object.values(filters)?.some(v => v) ? 'Active filters applied' : 'No filters applied'}
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
              iconSize={16}
            >
              Clear Filters
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default CustomerFilters;