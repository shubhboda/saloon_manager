import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const PerformanceModal = ({ staff, isOpen, onClose }) => {
  const [selectedPeriod, setSelectedPeriod] = useState('month');

  if (!isOpen || !staff) return null;

  const periodOptions = [
    { value: 'week', label: 'This Week' },
    { value: 'month', label: 'This Month' },
    { value: 'quarter', label: 'This Quarter' },
    { value: 'year', label: 'This Year' }
  ];

  const performanceMetrics = [
    {
      label: 'Customer Rating',
      value: staff?.performance,
      target: 4.5,
      unit: '/5',
      trend: '+0.2',
      trendType: 'positive',
      icon: 'Star'
    },
    {
      label: 'Completion Rate',
      value: staff?.completionRate,
      target: 90,
      unit: '%',
      trend: '+3%',
      trendType: 'positive',
      icon: 'CheckCircle'
    },
    {
      label: 'Revenue Generated',
      value: 8450,
      target: 8000,
      unit: '$',
      trend: '+12%',
      trendType: 'positive',
      icon: 'DollarSign'
    },
    {
      label: 'Services Completed',
      value: 156,
      target: 140,
      unit: '',
      trend: '+8',
      trendType: 'positive',
      icon: 'Scissors'
    },
    {
      label: 'Punctuality Score',
      value: 94,
      target: 95,
      unit: '%',
      trend: '-1%',
      trendType: 'negative',
      icon: 'Clock'
    },
    {
      label: 'Customer Retention',
      value: 87,
      target: 80,
      unit: '%',
      trend: '+5%',
      trendType: 'positive',
      icon: 'Users'
    }
  ];

  const recentFeedback = [
    {
      id: 1,
      customer: "Jennifer Smith",
      rating: 5,
      comment: "Absolutely amazing service! Sarah really knows her craft and made me feel so comfortable. The haircut exceeded my expectations.",
      date: "2024-12-02",
      service: "Hair Cut & Style"
    },
    {
      id: 2,
      customer: "Maria Garcia",
      rating: 5,
      comment: "Perfect color match and beautiful highlights. Very professional and friendly. Will definitely book again!",
      date: "2024-11-30",
      service: "Hair Coloring"
    },
    {
      id: 3,
      customer: "Lisa Johnson",
      rating: 4,
      comment: "Great service overall. The cut looks fantastic and Sarah was very attentive to what I wanted.",
      date: "2024-11-28",
      service: "Hair Cut"
    },
    {
      id: 4,
      customer: "Amanda Wilson",
      rating: 5,
      comment: "Love my new look! Sarah is incredibly talented and really listens to her clients. Highly recommend!",
      date: "2024-11-25",
      service: "Hair Cut & Color"
    }
  ];

  const monthlyData = [
    { month: 'Aug', revenue: 7200, services: 142, rating: 4.6 },
    { month: 'Sep', revenue: 7800, services: 148, rating: 4.7 },
    { month: 'Oct', revenue: 8100, services: 152, rating: 4.7 },
    { month: 'Nov', revenue: 8300, services: 158, rating: 4.8 },
    { month: 'Dec', revenue: 8450, services: 156, rating: 4.8 }
  ];

  const getTrendColor = (type) => {
    switch (type) {
      case 'positive':
        return 'text-success';
      case 'negative':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getProgressColor = (value, target) => {
    const percentage = (value / target) * 100;
    if (percentage >= 100) return 'bg-success';
    if (percentage >= 80) return 'bg-warning';
    return 'bg-error';
  };

  const renderStars = (rating) => {
    return (
      <div className="flex">
        {[1, 2, 3, 4, 5]?.map((star) => (
          <Icon
            key={star}
            name="Star"
            size={14}
            className={star <= rating ? "text-warning fill-current" : "text-muted-foreground"}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-1200 flex items-center justify-center p-4">
      <div className="bg-card border border-border rounded-lg w-full max-w-6xl max-h-[90vh] overflow-hidden salon-shadow-modal">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div>
            <h2 className="text-xl font-semibold text-foreground">Performance Analytics</h2>
            <p className="text-sm text-muted-foreground">{staff?.name} - {staff?.role}</p>
          </div>
          <div className="flex items-center space-x-3">
            <Select
              options={periodOptions}
              value={selectedPeriod}
              onChange={setSelectedPeriod}
              className="w-40"
            />
            <Button variant="ghost" size="icon" onClick={onClose}>
              <Icon name="X" size={20} />
            </Button>
          </div>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)] space-y-8">
          {/* Performance Metrics Grid */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Key Performance Indicators</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {performanceMetrics?.map((metric, index) => (
                <div key={index} className="p-4 bg-muted/30 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2">
                      <Icon name={metric?.icon} size={20} className="text-accent" />
                      <span className="text-sm font-medium text-foreground">{metric?.label}</span>
                    </div>
                    <span className={`text-sm font-medium ${getTrendColor(metric?.trendType)}`}>
                      {metric?.trend}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-baseline space-x-1">
                      <span className="text-2xl font-bold text-foreground">
                        {metric?.unit === '$' ? '$' : ''}{metric?.value}{metric?.unit !== '$' ? metric?.unit : ''}
                      </span>
                      <span className="text-sm text-muted-foreground">
                        / {metric?.unit === '$' ? '$' : ''}{metric?.target}{metric?.unit !== '$' ? metric?.unit : ''}
                      </span>
                    </div>
                    
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className={`h-2 rounded-full salon-transition-micro ${getProgressColor(metric?.value, metric?.target)}`}
                        style={{ width: `${Math.min((metric?.value / metric?.target) * 100, 100)}%` }}
                      ></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Trend Chart */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Performance Trends</h3>
            <div className="p-6 bg-muted/30 rounded-lg">
              <div className="grid grid-cols-5 gap-4">
                {monthlyData?.map((data, index) => (
                  <div key={index} className="text-center">
                    <div className="space-y-2 mb-3">
                      <div className="h-24 flex items-end justify-center">
                        <div
                          className="w-8 bg-accent rounded-t"
                          style={{ height: `${(data?.revenue / 9000) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-xs font-medium text-foreground">{data?.month}</span>
                    </div>
                    <div className="space-y-1 text-xs text-muted-foreground">
                      <p>${data?.revenue?.toLocaleString()}</p>
                      <p>{data?.services} services</p>
                      <p>{data?.rating} rating</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Recent Customer Feedback */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Recent Customer Feedback</h3>
            <div className="space-y-4">
              {recentFeedback?.map((feedback) => (
                <div key={feedback?.id} className="p-4 bg-card border border-border rounded-lg">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-accent/10 rounded-full flex items-center justify-center">
                        <Icon name="User" size={16} className="text-accent" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{feedback?.customer}</p>
                        <p className="text-xs text-muted-foreground">{feedback?.service}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      {renderStars(feedback?.rating)}
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(feedback.date)?.toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                  <p className="text-sm text-foreground">{feedback?.comment}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Performance Goals */}
          <div>
            <h3 className="text-lg font-medium text-foreground mb-4">Monthly Goals</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="p-4 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Target" size={20} className="text-success" />
                  <span className="font-medium text-foreground">Revenue Goal</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-foreground">$8,450 / $8,000</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-success h-2 rounded-full" style={{ width: '105%' }}></div>
                  </div>
                  <p className="text-xs text-success">Goal exceeded by $450!</p>
                </div>
              </div>

              <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Icon name="Clock" size={20} className="text-warning" />
                  <span className="font-medium text-foreground">Punctuality Goal</span>
                </div>
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-muted-foreground">Progress</span>
                    <span className="text-sm font-medium text-foreground">94% / 95%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-warning h-2 rounded-full" style={{ width: '94%' }}></div>
                  </div>
                  <p className="text-xs text-warning">1% away from goal</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceModal;