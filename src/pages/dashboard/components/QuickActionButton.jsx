import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../../components/ui/Button';

const QuickActionButton = ({ title, description, icon, action, variant = "outline", className = "" }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (action?.type === 'navigate') {
      navigate(action?.path);
    } else if (action?.type === 'function') {
      action?.handler();
    }
  };

  return (
    <Button
      variant={variant}
      onClick={handleClick}
      className={`h-auto p-4 flex-col items-start text-left space-y-2 ${className}`}
      fullWidth
    >
      <div className="flex items-center space-x-3 w-full">
        <div className="w-10 h-10 bg-accent rounded-lg flex items-center justify-center flex-shrink-0">
          <Button
            variant="ghost"
            size="icon"
            iconName={icon}
            iconSize={20}
            className="text-white hover:bg-transparent"
          />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-foreground text-sm">{title}</h4>
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        </div>
      </div>
    </Button>
  );
};

export default QuickActionButton;