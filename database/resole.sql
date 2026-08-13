CREATE DATABASE IF NOT EXISTS resole_db;
USE resole_db;

-- Users / Login
CREATE TABLE users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Customers
CREATE TABLE customers (
    customer_id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    phone VARCHAR(15) NOT NULL UNIQUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Repair Types
CREATE TABLE repair_types (
    repair_type_id INT AUTO_INCREMENT PRIMARY KEY,
    type_name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),
    default_cost DECIMAL(10,2) DEFAULT 0.00,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Repair Orders
CREATE TABLE orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    repair_type_id INT NOT NULL,
    delivery_date DATE NOT NULL,
    repair_cost DECIMAL(10,2) NOT NULL,
    status ENUM('Received', 'Repairing', 'Ready', 'Delivered')
        DEFAULT 'Received',
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (customer_id)
        REFERENCES customers(customer_id)
        ON DELETE CASCADE,

    FOREIGN KEY (repair_type_id)
        REFERENCES repair_types(repair_type_id)
        ON DELETE RESTRICT
);

-- Default Repair Types
INSERT INTO repair_types (type_name, description, default_cost)
VALUES
('Sole Replacement', 'Replacement of damaged shoe sole', 800.00),
('Heel Repair', 'Repair or replacement of shoe heel', 400.00),
('Stitching', 'Repair damaged stitching', 200.00),
('Polishing', 'Professional shoe polishing', 150.00),
('Color Restoration', 'Restore faded shoe color', 500.00);

-- Test Admin/User
INSERT INTO users (name, phone, password)
VALUES ('Admin', '9999999999', 'admin123');