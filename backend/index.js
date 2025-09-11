import express from 'express';
import cors from 'cors';
import mysql from 'mysql2/promise';

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '', // Add your MySQL password here
  database: 'saloon_manager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Customers CRUD
app.get('/api/customers', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM customers');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/customers', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    const [result] = await pool.execute('INSERT INTO customers (name, email, phone) VALUES (?, ?, ?)', [name, email, phone]);
    res.status(201).json({ id: result.insertId, name, email, phone });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/api/customers/:id', async (req, res) => {
  try {
    const { name, email, phone } = req.body;
    await pool.execute('UPDATE customers SET name = ?, email = ?, phone = ? WHERE id = ?', [name, email, phone, req.params.id]);
    res.json({ id: req.params.id, name, email, phone });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete('/api/customers/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM customers WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Staff CRUD
app.get('/api/staff', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM staff');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/staff', async (req, res) => {
  try {
    const { name, role } = req.body;
    const [result] = await pool.execute('INSERT INTO staff (name, role) VALUES (?, ?)', [name, role]);
    res.status(201).json({ id: result.insertId, name, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/api/staff/:id', async (req, res) => {
  try {
    const { name, role } = req.body;
    await pool.execute('UPDATE staff SET name = ?, role = ? WHERE id = ?', [name, role, req.params.id]);
    res.json({ id: req.params.id, name, role });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete('/api/staff/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM staff WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Appointments CRUD
app.get('/api/appointments', async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT * FROM appointments');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.post('/api/appointments', async (req, res) => {
  try {
    const { customer_id, staff_id, service, time } = req.body;
    const [result] = await pool.execute('INSERT INTO appointments (customer_id, staff_id, service, time) VALUES (?, ?, ?, ?)', [customer_id, staff_id, service, time]);
    res.status(201).json({ id: result.insertId, customer_id, staff_id, service, time });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.put('/api/appointments/:id', async (req, res) => {
  try {
    const { customer_id, staff_id, service, time } = req.body;
    await pool.execute('UPDATE appointments SET customer_id = ?, staff_id = ?, service = ?, time = ? WHERE id = ?', [customer_id, staff_id, service, time, req.params.id]);
    res.json({ id: req.params.id, customer_id, staff_id, service, time });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});
app.delete('/api/appointments/:id', async (req, res) => {
  try {
    await pool.execute('DELETE FROM appointments WHERE id = ?', [req.params.id]);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/', (req, res) => res.send('Saloon Manager Backend Running'));

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
