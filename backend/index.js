import express from 'express';
import cors from 'cors';
import admin from 'firebase-admin';
import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin SDK
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Customers CRUD
app.get('/api/customers', async (req, res) => {
  try {
    const customersRef = db.collection('customers');
    const snapshot = await customersRef.get();
    const customers = [];
    snapshot.forEach(doc => {
      customers.push({ id: doc.id, ...doc.data() });
    });
    res.json(customers);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/customers', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const docRef = await db.collection('customers').add({ name, email, phone });
    res.status(201).json({ id: docRef.id, name, email, phone });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/api/customers/:id', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    await db.collection('customers').doc(req.params.id).update({ name, email, phone });
    res.json({ id: req.params.id, name, email, phone });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete('/api/customers/:id', async (req, res) => {
  try {
    await db.collection('customers').doc(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Staff CRUD
app.get('/api/staff', async (req, res) => {
  try {
    const staffRef = db.collection('staff');
    const snapshot = await staffRef.get();
    const staff = [];
    snapshot.forEach(doc => {
      staff.push({ id: doc.id, ...doc.data() });
    });
    res.json(staff);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/staff', async (req, res) => {
  try {
    const { name, role } = req.body;
    const docRef = await db.collection('staff').add({ name, role });
    res.status(201).json({ id: docRef.id, name, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/api/staff/:id', async (req, res) => {
  try {
    const { name, role } = req.body;
    await db.collection('staff').doc(req.params.id).update({ name, role });
    res.json({ id: req.params.id, name, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete('/api/staff/:id', async (req, res) => {
  try {
    await db.collection('staff').doc(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Appointments CRUD
app.get('/api/appointments', async (req, res) => {
  try {
    const appointmentsRef = db.collection('appointments');
    const snapshot = await appointmentsRef.get();
    const appointments = [];
    snapshot.forEach(doc => {
      appointments.push({ id: doc.id, ...doc.data() });
    });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/appointments', async (req, res) => {
  try {
    const { customer_id, staff_id, service, time } = req.body;
    const docRef = await db.collection('appointments').add({ customer_id, staff_id, service, time });
    res.status(201).json({ id: docRef.id, customer_id, staff_id, service, time });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/api/appointments/:id', async (req, res) => {
  try {
    const { customer_id, staff_id, service, time } = req.body;
    await db.collection('appointments').doc(req.params.id).update({ customer_id, staff_id, service, time });
    res.json({ id: req.params.id, customer_id, staff_id, service, time });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete('/api/appointments/:id', async (req, res) => {
  try {
    await db.collection('appointments').doc(req.params.id).delete();
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => res.send('Saloon Manager Backend Running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
