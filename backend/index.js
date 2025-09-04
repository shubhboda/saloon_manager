// Test MySQL connection endpoint
app.get('/api/test-db', async (req, res) => {
  try {
    const conn = await getConnection();
    await conn.query('SELECT 1');
    await conn.end();
    res.json({ success: true, message: 'MySQL connection successful!' });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});
import express from 'express';
import mysql from 'mysql2/promise';
const app = express();
app.use(express.json());

// MySQL connection config
const dbConfig = {
  host: 'localhost',
  user: 'shubhboda',
  password: 'Shubh@9090',
  database: 'saloon_manager'
};

async function getConnection() {
  return await mysql.createConnection(dbConfig);
}

// Customers CRUD
app.get('/api/customers', async (req, res) => {
  const conn = await getConnection();
  const [rows] = await conn.query('SELECT * FROM customers');
  await conn.end();
  res.json(rows);
});
app.post('/api/customers', async (req, res) => {
  const { name, email, phone } = req.body;
  const conn = await getConnection();
  const [result] = await conn.query('INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
  await conn.end();
  res.status(201).json({ id: result.insertId, name, email, phone });
});
app.put('/api/customers/:id', async (req, res) => {
  const { name, email, phone } = req.body;
  const conn = await getConnection();
  await conn.query('UPDATE customers SET name=?, email=?, phone=? WHERE id=?', [name, email, phone, req.params.id]);
  await conn.end();
  res.json({ id: req.params.id, name, email, phone });
});
app.delete('/api/customers/:id', async (req, res) => {
  const conn = await getConnection();
  await conn.query('DELETE FROM customers WHERE id=?', [req.params.id]);
  await conn.end();
  res.status(204).send();
});

// Staff CRUD
app.get('/api/staff', async (req, res) => {
  const conn = await getConnection();
  const [rows] = await conn.query('SELECT * FROM staff');
  await conn.end();
  res.json(rows);
});
app.post('/api/staff', async (req, res) => {
  const { name, role } = req.body;
  const conn = await getConnection();
  const [result] = await conn.query('INSERT INTO staff (name, role) VALUES (?, ?)', [name, role]);
  await conn.end();
  res.status(201).json({ id: result.insertId, name, role });
});
app.put('/api/staff/:id', async (req, res) => {
  const { name, role } = req.body;
  const conn = await getConnection();
  await conn.query('UPDATE staff SET name=?, role=? WHERE id=?', [name, role, req.params.id]);
  await conn.end();
  res.json({ id: req.params.id, name, role });
});
app.delete('/api/staff/:id', async (req, res) => {
  const conn = await getConnection();
  await conn.query('DELETE FROM staff WHERE id=?', [req.params.id]);
  await conn.end();
  res.status(204).send();
});

// Appointments CRUD
app.get('/api/appointments', async (req, res) => {
  const conn = await getConnection();
  const [rows] = await conn.query('SELECT * FROM appointments');
  await conn.end();
  res.json(rows);
});
app.post('/api/appointments', async (req, res) => {
  const { customer_id, staff_id, service, time } = req.body;
  const conn = await getConnection();
  const [result] = await conn.query('INSERT INTO appointments (customer_id, staff_id, service, time) VALUES (?, ?, ?, ?)', [customer_id, staff_id, service, time]);
  await conn.end();
  res.status(201).json({ id: result.insertId, customer_id, staff_id, service, time });
});
app.put('/api/appointments/:id', async (req, res) => {
  const { customer_id, staff_id, service, time } = req.body;
  const conn = await getConnection();
  await conn.query('UPDATE appointments SET customer_id=?, staff_id=?, service=?, time=? WHERE id=?', [customer_id, staff_id, service, time, req.params.id]);
  await conn.end();
  res.json({ id: req.params.id, customer_id, staff_id, service, time });
});
app.delete('/api/appointments/:id', async (req, res) => {
  const conn = await getConnection();
  await conn.query('DELETE FROM appointments WHERE id=?', [req.params.id]);
  await conn.end();
  res.status(204).send();
});

app.get('/', (req, res) => res.send('Saloon Manager Backend Running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
