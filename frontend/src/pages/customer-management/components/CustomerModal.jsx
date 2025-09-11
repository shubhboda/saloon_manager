import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const CustomerModal = ({ customer, isOpen, onClose, mode = 'view', onSave }) => {
  const [activeTab, setActiveTab] = useState('profile');
  const [editData, setEditData] = useState(customer || {});
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState(null);

  if (!isOpen || !customer) return null;

  const tabs = [
    { id: 'profile', label: 'Profile', icon: 'User' },
    { id: 'history', label: 'Service History', icon: 'History' },
    { id: 'preferences', label: 'Preferences', icon: 'Settings' },
    { id: 'communications', label: 'Communications', icon: 'MessageSquare' }
  ];

  const serviceHistory = [
    {
      id: 1,
      date: '2025-01-15',
      service: 'Haircut & Style',
      stylist: 'Sarah Johnson',
      duration: '45 min',
      cost: 65.00,
      rating: 5,
      notes: 'Customer loved the new layered cut'
    },
    {
      id: 2,
      date: '2024-12-20',
      service: 'Hair Color & Highlights',
      stylist: 'Mike Chen',
      duration: '2.5 hours',
      cost: 180.00,
      rating: 5,
      notes: 'Blonde highlights, very satisfied'
    },
    {
      id: 3,
      date: '2024-11-10',
      service: 'Deep Conditioning Treatment',
      stylist: 'Sarah Johnson',
      duration: '30 min',
      cost: 45.00,
      rating: 4,
      notes: 'Hair felt much healthier after treatment'
    }
  ];

  const communications = [
    {
      id: 1,
      type: 'email',
      date: '2025-01-10',
      subject: 'Appointment Reminder',
      status: 'sent',
      content: 'Reminder for your upcoming appointment on January 15th'
    },
    {
      id: 2,
      type: 'sms',
      date: '2025-01-05',
      subject: 'Birthday Offer',
      status: 'delivered',
      content: 'Happy Birthday! Enjoy 20% off your next service'
    },
    {
      id: 3,
      type: 'email',
      date: '2024-12-25',
      subject: 'Holiday Greetings',
      status: 'opened',
      content: 'Season\'s greetings from our salon family'
    }
  ];

  const handleInputChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    setError(null);

    // Validate email format according to detailed rules
    const emailRegex = /^[a-zA-Z0-9]+([._-][a-zA-Z0-9]+)*@[a-zA-Z0-9]+([.-][a-zA-Z0-9]+)*\.[a-zA-Z]{2,}$/;
    if (editData.email && !emailRegex.test(editData.email)) {
      setError('Please enter a valid email address following the specified format rules.');
      setIsSaving(false);
      return;
    }

    // Validate phone number length (must be exactly 10 digits)
    const phoneDigits = editData.phone ? editData.phone.replace(/\D/g, '') : '';
    if (phoneDigits.length !== 10) {
      setError('Phone number must be exactly 10 digits.');
      setIsSaving(false);
      return;
    }

    try {
      const API_BASE = 'http://localhost:4000/api';
      const url = mode === 'add' ? `${API_BASE}/customers` : `${API_BASE}/customers/${customer.id}`;
      const method = mode === 'add' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(editData),
      });

      if (!response.ok) {
        throw new Error(`Failed to ${mode === 'add' ? 'add' : 'update'} customer`);
      }

      const savedCustomer = await response.json();

      if (onSave) {
        onSave(savedCustomer, mode);
      }

      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSaving(false);
    }
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

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Icon
        key={i}
        name="Star"
        size={16}
        className={i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}
      />
    ));
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <Image
          src={customer?.avatar}
          alt={customer?.name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div className="flex-1">
          {mode === 'edit' ? (
            <div className="space-y-4">
              <Input
                label="Full Name"
                value={editData?.name || ''}
                onChange={(e) => handleInputChange('name', e?.target?.value)}
              />
              <div className="grid grid-cols-2 gap-4">
                <Input
                  label="Email"
                  type="email"
                  value={editData?.email || ''}
                  onChange={(e) => handleInputChange('email', e?.target?.value)}
                />
                <Input
                  label="Phone"
                  type="tel"
                  value={editData?.phone || ''}
                  onChange={(e) => handleInputChange('phone', e?.target?.value)}
                />
              </div>
            </div>
          ) : (
            <div>
              <h2 className="text-2xl font-bold text-foreground mb-2">{customer?.name}</h2>
              <div className="space-y-1 text-sm text-muted-foreground">
                <p className="flex items-center space-x-2">
                  <Icon name="Mail" size={16} />
                  <span>{customer?.email}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Icon name="Phone" size={16} />
                  <span>{customer?.phone}</span>
                </p>
                <p className="flex items-center space-x-2">
                  <Icon name="Calendar" size={16} />
                  <span>Customer since {formatDate(customer?.joinDate)}</span>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">Total Spent</h3>
          <p className="text-2xl font-bold text-foreground">{formatCurrency(customer?.totalSpent)}</p>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">Total Visits</h3>
          <p className="text-2xl font-bold text-foreground">{customer?.totalVisits}</p>
        </div>
        <div className="bg-muted/30 rounded-lg p-4">
          <h3 className="font-medium text-foreground mb-2">Loyalty Status</h3>
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-yellow-100 text-yellow-800 border border-yellow-200">
            {customer?.loyaltyStatus}
          </span>
        </div>
      </div>

      {mode === 'edit' && (
        <div className="space-y-4">
          <Input
            label="Address"
            value={editData?.address || ''}
            onChange={(e) => handleInputChange('address', e?.target?.value)}
          />
          <div className="grid grid-cols-3 gap-4">
            <Input
              label="City"
              value={editData?.city || ''}
              onChange={(e) => handleInputChange('city', e?.target?.value)}
            />
            <Input
              label="State"
              value={editData?.state || ''}
              onChange={(e) => handleInputChange('state', e?.target?.value)}
            />
            <Input
              label="ZIP Code"
              value={editData?.zipCode || ''}
              onChange={(e) => handleInputChange('zipCode', e?.target?.value)}
            />
          </div>
          <Input
            label="Date of Birth"
            type="date"
            value={editData?.dateOfBirth || ''}
            onChange={(e) => handleInputChange('dateOfBirth', e?.target?.value)}
          />
        </div>
      )}
    </div>
  );

  const renderHistoryTab = () => (
    <div className="space-y-4">
      {serviceHistory?.map((service) => (
        <div key={service?.id} className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start justify-between mb-3">
            <div>
              <h3 className="font-medium text-foreground">{service?.service}</h3>
              <p className="text-sm text-muted-foreground">with {service?.stylist}</p>
            </div>
            <div className="text-right">
              <p className="font-medium text-foreground">{formatCurrency(service?.cost)}</p>
              <p className="text-sm text-muted-foreground">{formatDate(service?.date)}</p>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <span className="flex items-center space-x-1">
                <Icon name="Clock" size={14} />
                <span>{service?.duration}</span>
              </span>
              <div className="flex items-center space-x-1">
                {renderStars(service?.rating)}
              </div>
            </div>
          </div>
          
          {service?.notes && (
            <p className="text-sm text-muted-foreground mt-2 italic">"{service?.notes}"</p>
          )}
        </div>
      ))}
    </div>
  );

  const renderPreferencesTab = () => (
    <div className="space-y-6">
      <div>
        <h3 className="font-medium text-foreground mb-3">Service Preferences</h3>
        <div className="space-y-2">
          <p className="text-sm"><span className="font-medium">Preferred Stylist:</span> Sarah Johnson</p>
          <p className="text-sm"><span className="font-medium">Preferred Time:</span> Weekday mornings</p>
          <p className="text-sm"><span className="font-medium">Favorite Services:</span> Haircut, Color, Highlights</p>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-foreground mb-3">Allergies & Notes</h3>
        <div className="bg-muted/30 rounded-lg p-4">
          <p className="text-sm text-muted-foreground">
            Allergic to ammonia-based products. Prefers organic and natural hair care products. 
            Has sensitive scalp - use gentle massage techniques.
          </p>
        </div>
      </div>
      
      <div>
        <h3 className="font-medium text-foreground mb-3">Communication Preferences</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="rounded border-border" />
            <span className="text-sm">Email notifications</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" defaultChecked className="rounded border-border" />
            <span className="text-sm">SMS reminders</span>
          </label>
          <label className="flex items-center space-x-2">
            <input type="checkbox" className="rounded border-border" />
            <span className="text-sm">Promotional offers</span>
          </label>
        </div>
      </div>
    </div>
  );

  const renderCommunicationsTab = () => (
    <div className="space-y-4">
      {communications?.map((comm) => (
        <div key={comm?.id} className="bg-muted/30 rounded-lg p-4">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center space-x-2">
              <Icon 
                name={comm?.type === 'email' ? 'Mail' : 'MessageSquare'} 
                size={16} 
                className="text-muted-foreground" 
              />
              <h3 className="font-medium text-foreground">{comm?.subject}</h3>
            </div>
            <div className="flex items-center space-x-2">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                comm?.status === 'sent' ? 'bg-blue-100 text-blue-800' :
                comm?.status === 'delivered'? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
              }`}>
                {comm?.status}
              </span>
              <span className="text-sm text-muted-foreground">{formatDate(comm?.date)}</span>
            </div>
          </div>
          <p className="text-sm text-muted-foreground">{comm?.content}</p>
        </div>
      ))}
    </div>
  );

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-1200 p-4">
      <div className="bg-card rounded-lg border border-border salon-shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h1 className="text-xl font-semibold text-foreground">
            {mode === 'edit' ? 'Edit Customer' : 'Customer Details'}
          </h1>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <nav className="flex space-x-8 px-6">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm salon-transition-micro ${
                  activeTab === tab?.id
                    ? 'border-accent text-accent' :'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'profile' && renderProfileTab()}
          {activeTab === 'history' && renderHistoryTab()}
          {activeTab === 'preferences' && renderPreferencesTab()}
          {activeTab === 'communications' && renderCommunicationsTab()}
        </div>

        {/* Footer */}
        {mode === 'edit' && (
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button variant="default" onClick={handleSave}>
              Save Changes
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default CustomerModal;