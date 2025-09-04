CREATE TABLE IF NOT EXISTS payments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  customer_id INT,
  amount DECIMAL(10,2) NOT NULL,
  method VARCHAR(50) NOT NULL, -- e.g., 'card', 'upi', 'netbanking'
  transaction_id VARCHAR(100),
  status VARCHAR(20) DEFAULT 'pending',
  time DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (customer_id) REFERENCES customers(id)
);
