# TODO: Disconnect Firebase and Ensure Full MySQL Connection

## Information Gathered
- Backend already uses mysql2 for MySQL connection and exposes REST APIs for customers, staff, appointments.
- Frontend has firebase.js config file but Firebase is not actively used (only unused imports in customer-portal).
- Frontend already fetches data from backend API (localhost:4000).
- Firebase dependency is in frontend/package.json.

## Plan
- [x] Delete frontend/src/firebase.js file
- [x] Edit frontend/src/pages/customer-portal/index.jsx: Remove unused Firebase imports (db, collection, getDocs, addDoc)
- [x] Edit frontend/package.json: Remove firebase dependency
- [x] Run npm install in frontend to update dependencies
- [x] Verify app works fully connected to MySQL backend without Firebase

## Dependent Files to Edit
- frontend/src/firebase.js (delete)
- frontend/src/pages/customer-portal/index.jsx (edit)
- frontend/package.json (edit)

## Followup Steps
- Test frontend-backend integration
- Confirm no Firebase code remains
