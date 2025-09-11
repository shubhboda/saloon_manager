import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const Breadcrumb = () => {
  const location = useLocation();
  
  const pathMap = {
    '/dashboard': 'Dashboard',
    '/appointment-calendar': 'Calendar',
    '/customer-management': 'Customers',
    '/staff-management': 'Staff',
    '/login': 'Login',
    '/register': 'Register',
  };

  const generateBreadcrumbs = () => {
    const pathSegments = location?.pathname?.split('/')?.filter(segment => segment);
    const breadcrumbs = [];

    // Always start with Dashboard as home
    if (location?.pathname !== '/dashboard') {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/dashboard',
        isActive: false
      });
    }

    // Add current page
    const currentPath = location?.pathname;
    const currentLabel = pathMap?.[currentPath] || 'Page';
    
    if (currentPath !== '/dashboard') {
      breadcrumbs?.push({
        label: currentLabel,
        path: currentPath,
        isActive: true
      });
    } else {
      breadcrumbs?.push({
        label: 'Dashboard',
        path: '/dashboard',
        isActive: true
      });
    }

    return breadcrumbs;
  };

  const breadcrumbs = generateBreadcrumbs();

  // Don't show breadcrumbs on login/register pages
  if (location?.pathname === '/login' || location?.pathname === '/register') {
    return null;
  }

  return (
    <nav className="flex items-center space-x-2 text-sm text-muted-foreground mb-6">
      {breadcrumbs?.map((crumb, index) => (
        <React.Fragment key={crumb?.path}>
          {index > 0 && (
            <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
          )}
          {crumb?.isActive ? (
            <span className="text-foreground font-medium">{crumb?.label}</span>
          ) : (
            <Link
              to={crumb?.path}
              className="hover:text-foreground salon-transition-micro"
            >
              {crumb?.label}
            </Link>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;