import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const AuthActions = () => {
  return (
    <div className="space-y-6">
      {/* Forgot Password */}
      <div className="text-center">
        <button className="text-sm text-accent hover:text-accent/80 salon-transition-micro font-medium">
          Forgot your password?
        </button>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-4 bg-background text-muted-foreground">New to Saloon Manager?</span>
        </div>
      </div>

      {/* Create Account */}
      <div className="text-center space-y-4">
        <Link to="/register">
          <Button variant="outline" fullWidth className="h-12">
            <Icon name="UserPlus" size={18} className="mr-2" />
            Create Account
          </Button>
        </Link>
        
        <p className="text-xs text-muted-foreground">
          By signing up, you agree to our{' '}
          <button className="text-accent hover:text-accent/80 salon-transition-micro">
            Terms of Service
          </button>{' '}
          and{' '}
          <button className="text-accent hover:text-accent/80 salon-transition-micro">
            Privacy Policy
          </button>
        </p>
      </div>

      {/* Quick Access Demo Credentials */}
      <div className="bg-muted/30 rounded-lg p-4 border border-border">
        <h4 className="text-sm font-medium text-foreground mb-3 flex items-center">
          <Icon name="Info" size={16} className="mr-2 text-accent" />
          Demo Access
        </h4>
        <div className="space-y-2 text-xs">
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Owner:</span>
            <span className="font-mono text-foreground">owner@salon.com / owner123</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Staff:</span>
            <span className="font-mono text-foreground">staff@salon.com / staff123</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-muted-foreground">Customer:</span>
            <span className="font-mono text-foreground">customer@salon.com / customer123</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthActions;