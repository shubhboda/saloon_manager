import React from 'react';
// Temporary Card components to fix build error
const Card = ({ children, className }) => <div className={className}>{children}</div>;
const CardHeader = ({ children, className }) => <div className={className}>{children}</div>;
const CardTitle = ({ children, className }) => <div className={className}>{children}</div>;
const CardContent = ({ children, className }) => <div className={className}>{children}</div>;
import Icon from '@/components/AppIcon'; // Assuming AppIcon is correctly aliased or relatively imported

const ServicePriceCard = () => {
    const services = [
        { name: "Haircutting", price: "$25 - $50", icon: "scissors" },
        { name: "Bearding", price: "$15 - $30", icon: "beard" }, // Assuming 'beard' icon exists or similar
        { name: "Skincare", price: "$40 - $100", icon: "face" }, // Assuming 'face' icon exists or similar
    ];

    return (
        <Card className="salon-shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Service Fees</CardTitle>
                <Icon name="dollar-sign" className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
                <div className="grid gap-2">
                    {services.map((service, index) => (
                        <div key={index} className="flex items-center justify-between text-lg font-bold">
                            <span className="flex items-center">
                                <Icon name={service.icon} className="mr-2 text-primary" size={18} />
                                {service.name}
                            </span>
                            <span>{service.price}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default ServicePriceCard;
