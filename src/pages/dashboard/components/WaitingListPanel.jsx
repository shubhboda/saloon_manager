import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'; // Assuming you have a Card component in ui
import Icon from '@/components/AppIcon'; // Assuming AppIcon is correctly aliased or relatively imported

const WaitingListPanel = () => {
    // This would ideally come from a state management solution or API
    const waitingCustomers = [
        { id: 1, name: "Alice Johnson", service: "Haircutting", waitTime: "15 min" },
        { id: 2, name: "Bob Williams", service: "Bearding", waitTime: "10 min" },
        { id: 3, name: "Charlie Brown", service: "Skincare", waitTime: "30 min" },
    ];

    return (
        <Card className="salon-shadow-card">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Waiting List</CardTitle>
                <Icon name="clock" className="text-muted-foreground" />
            </CardHeader>
            <CardContent>
                {waitingCustomers.length > 0 ? (
                    <div className="grid gap-3">
                        {waitingCustomers.map((customer) => (
                            <div key={customer.id} className="flex items-center justify-between text-base">
                                <div className="flex flex-col">
                                    <span className="font-semibold text-foreground">{customer.name}</span>
                                    <span className="text-sm text-muted-foreground">{customer.service}</span>
                                </div>
                                <span className="font-medium text-primary">{customer.waitTime}</span>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-muted-foreground text-sm">No customers currently waiting.</p>
                )}
            </CardContent>
        </Card>
    );
};

export default WaitingListPanel;
