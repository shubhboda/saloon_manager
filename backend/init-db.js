import mysql from 'mysql2/promise';

// MySQL connection config (same as in index.js)
const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '', // Add your MySQL password here if any
  database: 'saloon_manager',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
};

async function initDatabase() {
  let connection;

  try {
    // Connect without specifying database to create it if needed
    connection = await mysql.createConnection({
      host: dbConfig.host,
      user: dbConfig.user,
      password: dbConfig.password
    });

    // Create database if it doesn't exist
    await connection.execute('CREATE DATABASE IF NOT EXISTS saloon_manager');
    console.log('Database saloon_manager created or already exists.');

    // Switch to the database
    await connection.execute('USE saloon_manager');

    // Create customers table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS customers (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) UNIQUE NOT NULL,
        phone VARCHAR(20)
      )
    `);
    console.log('Customers table created.');

    // Create staff table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS staff (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        role VARCHAR(100) NOT NULL
      )
    `);
    console.log('Staff table created.');

    // Create appointments table
    await connection.execute(`
      CREATE TABLE IF NOT EXISTS appointments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        customer_id INT NOT NULL,
        staff_id INT NOT NULL,
        service VARCHAR(255) NOT NULL,
        time DATETIME NOT NULL,
        FOREIGN KEY (customer_id) REFERENCES customers(id) ON DELETE CASCADE,
        FOREIGN KEY (staff_id) REFERENCES staff(id) ON DELETE CASCADE
      )
    `);
    console.log('Appointments table created.');

    // Insert sample customers
    await connection.execute(`
      INSERT INTO customers (name, email, phone) VALUES
      ('John Doe', 'john@example.com', '123-456-7890'),
      ('Jane Smith', 'jane@example.com', '098-765-4321'),
      ('Bob Johnson', 'bob@example.com', '555-123-4567'),
      ('Alice Brown', 'alice@example.com', '444-567-8901'),
      ('Charlie Wilson', 'charlie@example.com', '333-789-0123')
    `);
    console.log('Sample customers inserted.');

    // Insert sample staff
    await connection.execute(`
      INSERT INTO staff (name, role) VALUES
      ('Sarah Hairdresser', 'Hairdresser'),
      ('Mike Barber', 'Barber'),
      ('Lisa Stylist', 'Stylist'),
      ('Tom Groomer', 'Groomer')
    `);
    console.log('Sample staff inserted.');

    // Insert sample appointments
    await connection.execute(`
      INSERT INTO appointments (customer_id, staff_id, service, time) VALUES
      (1, 1, 'Haircut', '2023-10-01 10:00:00'),
      (2, 2, 'Shave', '2023-10-01 11:00:00'),
      (3, 3, 'Coloring', '2023-10-02 14:00:00'),
      (4, 4, 'Trim', '2023-10-02 15:30:00'),
      (5, 1, 'Styling', '2023-10-03 09:00:00'),
      (1, 2, 'Beard Trim', '2023-10-03 16:00:00')
    `);
    console.log('Sample appointments inserted.');

    console.log('Database initialized successfully!');

  } catch (error) {
    console.error('Error initializing database:', error);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

initDatabase();
