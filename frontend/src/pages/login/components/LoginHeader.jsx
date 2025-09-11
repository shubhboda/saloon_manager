import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const LoginHeader = () => {
  return (
    <div className="text-center space-y-6">
      {/* Logo */}
      <Link to="/dashboard" className="inline-flex items-center space-x-3">
        <div className="w-12 h-12 bg-accent rounded-xl flex items-center justify-center">
          <Icon name="Scissors" size={24} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">Saloon Manager</h1>
          <p className="text-sm text-muted-foreground">Professional Salon Management</p>
        </div>
      </Link>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">Welcome Back</h2>
        <p className="text-muted-foreground">
          Sign in to your account to manage your salon operations
        </p>
      </div>

      {/* Current Status */}
      <div className="flex items-center justify-center space-x-4 text-sm">
        <div className="flex items-center space-x-1">
          <div className="w-2 h-2 bg-success rounded-full"></div>
          <span className="text-muted-foreground">System Online</span>
        </div>
        <div className="w-px h-4 bg-border"></div>
        <div className="flex items-center space-x-1">
          <Icon name="Shield" size={14} className="text-success" />
          <span className="text-muted-foreground">Secure Connection</span>
        </div>
      </div>
    </div>
  );
};

export default LoginHeader;