import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route, Navigate } from "react-router-dom";
import { useAuth } from "./contexts/AuthContext";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AppointmentCalendar from './pages/appointment-calendar';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import CustomerManagement from './pages/customer-management';
import StaffManagement from './pages/staff-management';
import Register from './pages/register';
import CustomerPortal from './pages/customer-portal';
import BookAppointment from './pages/customer-portal/BookAppointment';
import AppointmentsHistory from './pages/customer-portal/AppointmentsHistory';
import CustomerProfile from './pages/customer-portal/CustomerProfile';

// Protected Route Component
const ProtectedRoute = ({ children, allowedRoles = [] }) => {
  const { isAuthenticated, hasRole, isLoading } = useAuth();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.some(role => hasRole(role))) {
    // Redirect to appropriate dashboard based on user role
    const userRole = JSON.parse(localStorage.getItem('saloon_user'))?.role;
    if (userRole === 'customer') {
      return <Navigate to="/customer/dashboard" replace />;
    } else {
      return <Navigate to="/dashboard" replace />;
    }
  }

  return children;
};

// Owner/Staff Routes Component
const OwnerRoutes = () => (
  <>
    <Route path="/" element={<AppointmentCalendar />} />
    <Route path="/appointment-calendar" element={<AppointmentCalendar />} />
    <Route path="/dashboard" element={<ProtectedRoute allowedRoles={['owner', 'manager', 'staff']}><Dashboard /></ProtectedRoute>} />
    <Route path="/customer-management" element={<ProtectedRoute allowedRoles={['owner', 'manager']}><CustomerManagement /></ProtectedRoute>} />
    <Route path="/staff-management" element={<ProtectedRoute allowedRoles={['owner', 'manager']}><StaffManagement /></ProtectedRoute>} />
  </>
);

// Customer Routes Component
const CustomerRoutes = () => (
  <>
    <Route path="/customer" element={<ProtectedRoute allowedRoles={['customer']}><CustomerPortal /></ProtectedRoute>} />
    <Route path="/customer/dashboard" element={<ProtectedRoute allowedRoles={['customer']}><CustomerPortal /></ProtectedRoute>} />
    <Route path="/customer/book-appointment" element={<ProtectedRoute allowedRoles={['customer']}><BookAppointment /></ProtectedRoute>} />
    <Route path="/customer/appointments" element={<ProtectedRoute allowedRoles={['customer']}><AppointmentsHistory /></ProtectedRoute>} />
    <Route path="/customer/profile" element={<ProtectedRoute allowedRoles={['customer']}><CustomerProfile /></ProtectedRoute>} />
  </>
);

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Owner/Staff routes */}
        {OwnerRoutes()}

        {/* Customer routes */}
        {CustomerRoutes()}

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
