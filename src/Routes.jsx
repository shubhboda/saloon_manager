import React from "react";
import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ScrollToTop from "components/ScrollToTop";
import ErrorBoundary from "components/ErrorBoundary";
import NotFound from "pages/NotFound";
import AppointmentCalendar from './pages/appointment-calendar';
import Login from './pages/login';
import Dashboard from './pages/dashboard';
import CustomerManagement from './pages/customer-management';
import StaffManagement from './pages/staff-management';
import Register from './pages/register';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Define your route here */}
        <Route path="/" element={<AppointmentCalendar />} />
        <Route path="/appointment-calendar" element={<AppointmentCalendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer-management" element={<CustomerManagement />} />
        <Route path="/staff-management" element={<StaffManagement />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
