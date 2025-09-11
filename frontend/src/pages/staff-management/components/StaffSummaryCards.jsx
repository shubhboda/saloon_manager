import React from 'react';
import Icon from '../../../components/AppIcon';

const StaffSummaryCards = () => {
  const summaryData = [
    {
      id: 1,
      title: "Total Staff",
      value: "24",
      change: "+2",
      changeType: "positive",
      icon: "Users",
      description: "Active employees"
    },
    {
      id: 2,
      title: "On Duty Today",
      value: "18",
      change: "75%",
      changeType: "neutral",
      icon: "UserCheck",
      description: "Currently working"
    },
    {
      id: 3,
      title: "Avg Performance",
      value: "4.7",
      change: "+0.2",
      changeType: "positive",
      icon: "Star",
      description: "Out of 5.0 rating"
    },
    {
      id: 4,
      title: "Total Commissions",
      value: "$12,450",
      change: "+8.5%",
      changeType: "positive",
      icon: "DollarSign",
      description: "This month"
    }
  ];

  const getChangeColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {summaryData?.map((item) => (
        <div key={item?.id} className="bg-card border border-border rounded-lg p-6 salon-shadow-card">
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center`}>
              <Icon name={item?.icon} size={24} className="text-accent" />
            </div>
            <span className={`text-sm font-medium ${getChangeColor(item?.changeType)}`}>
              {item?.change}
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{item?.value}</h3>
            <p className="text-sm font-medium text-foreground">{item?.title}</p>
            <p className="text-xs text-muted-foreground">{item?.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StaffSummaryCards;