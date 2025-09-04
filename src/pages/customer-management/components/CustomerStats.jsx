import React from 'react';
import Icon from '../../../components/AppIcon';

const CustomerStats = ({ stats }) => {
  const statCards = [
    {
      title: 'Total Customers',
      value: stats?.totalCustomers,
      change: stats?.customerGrowth,
      changeType: stats?.customerGrowth >= 0 ? 'positive' : 'negative',
      icon: 'Users',
      color: 'bg-blue-500'
    },
    {
      title: 'New This Month',
      value: stats?.newCustomers,
      change: stats?.newCustomerGrowth,
      changeType: stats?.newCustomerGrowth >= 0 ? 'positive' : 'negative',
      icon: 'UserPlus',
      color: 'bg-green-500'
    },
    {
      title: 'Retention Rate',
      value: `${stats?.retentionRate}%`,
      change: stats?.retentionChange,
      changeType: stats?.retentionChange >= 0 ? 'positive' : 'negative',
      icon: 'Heart',
      color: 'bg-purple-500'
    },
    {
      title: 'Avg. Spend',
      value: `$${stats?.averageSpend}`,
      change: stats?.spendChange,
      changeType: stats?.spendChange >= 0 ? 'positive' : 'negative',
      icon: 'DollarSign',
      color: 'bg-orange-500'
    }
  ];

  const formatChange = (change, changeType) => {
    const sign = changeType === 'positive' ? '+' : '';
    const color = changeType === 'positive' ? 'text-success' : 'text-error';
    const icon = changeType === 'positive' ? 'TrendingUp' : 'TrendingDown';
    
    return (
      <div className={`flex items-center space-x-1 ${color}`}>
        <Icon name={icon} size={14} />
        <span className="text-sm font-medium">{sign}{change}%</span>
      </div>
    );
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
      {statCards?.map((stat, index) => (
        <div key={index} className="bg-card rounded-lg border border-border p-6 salon-shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 ${stat?.color} rounded-lg flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} color="white" />
            </div>
            {formatChange(stat?.change, stat?.changeType)}
          </div>
          
          <div>
            <h3 className="text-2xl font-bold text-foreground mb-1">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CustomerStats;