-- Create database
CREATE DATABASE IF NOT EXISTS saloon_manager;
USE saloon_manager;

-- Customers table
CREATE TABLE IF NOT EXISTS customers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100),
  phone VARCHAR(20)
);

-- Staff table
CREATE TABLE IF NOT EXISTS staff (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  role VARCHAR(50)
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  staff_id INT,
  service VARCHAR(100),
  time DATETIME,
  FOREIGN KEY (customer_id) REFERENCES customers(id),
  FOREIGN KEY (staff_id) REFERENCES staff(id)
);
