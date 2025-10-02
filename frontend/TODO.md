# TODO: Setup MySQL Database with XAMPP and Connect Backend

## Information Gathered
- Backend uses mysql2 for MySQL connection to 'saloon_manager' database.
- REST APIs for customers, staff, appointments are implemented.
- Frontend fetches data from backend API (localhost:4000).
- Firebase has been disconnected.

## Plan
- [x] Create backend/database.sql with table schemas and sample data
- [x] Create backend/init-db.js script for programmatic database setup
- [ ] Start XAMPP and run database.sql in phpMyAdmin or command line
- [ ] Start backend server (npm start in backend)
- [ ] Test backend endpoints (e.g., GET /api/customers)
- [ ] Start frontend (npm run dev in frontend)
- [ ] Verify full frontend-backend integration

## Dependent Files
- backend/database.sql (created)
- backend/init-db.js (created)

## Followup Steps
- Ensure XAMPP MySQL is running
- Execute database.sql to create tables and insert sample data
- Run backend and frontend
- Test CRUD operations in the app
