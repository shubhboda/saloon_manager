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
import CustomerPortal from './pages/customer-portal';
import BookAppointment from './pages/customer-portal/BookAppointment';
import AppointmentsHistory from './pages/customer-portal/AppointmentsHistory';
import CustomerProfile from './pages/customer-portal/CustomerProfile';

const Routes = () => {
  return (
    <BrowserRouter>
      <ErrorBoundary>
      <ScrollToTop />
      <RouterRoutes>
        {/* Owner/Manager routes */}
        <Route path="/" element={<AppointmentCalendar />} />
        <Route path="/appointment-calendar" element={<AppointmentCalendar />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/customer-management" element={<CustomerManagement />} />
        <Route path="/staff-management" element={<StaffManagement />} />
        <Route path="/register" element={<Register />} />

        {/* Customer Portal routes */}
        <Route path="/customer" element={<CustomerPortal />} />
        <Route path="/customer/dashboard" element={<CustomerPortal />} />
        <Route path="/customer/book-appointment" element={<BookAppointment />} />
        <Route path="/customer/appointments" element={<AppointmentsHistory />} />
        <Route path="/customer/profile" element={<CustomerProfile />} />

        <Route path="*" element={<NotFound />} />
      </RouterRoutes>
      </ErrorBoundary>
    </BrowserRouter>
  );
};

export default Routes;
