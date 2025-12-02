-- Создание таблицы market_trends для хранения данных о трендах рынка
CREATE TABLE IF NOT EXISTS market_trends (
    id SERIAL PRIMARY KEY,
    rank INTEGER NOT NULL,
    name VARCHAR(100) NOT NULL,
    price DECIMAL(15, 3) NOT NULL,
    change_24h DECIMAL(6, 2) NOT NULL,  /* Может хранить положительные и отрицательные значения с 2 знаками после запятой */
);

-- Добавление записей в таблицу
INSERT INTO market_trends (rank, name, price, change_24h)
VALUES
  (1, 'Bitcoin', 94456.987, 16.50),
  (2, 'Ethereum', 50632.964, -10.80),
  (3, 'Tether', 15896.123, -5.80),
  (4, 'Ripple', 5548.621, 14.60),
  (5, 'Dogecoin', 15548.621, 14.60);

-- Создание таблицы пользователей для хранения данных о зарегистрированных пользователях
CREATE TABLE IF NOT EXISTS users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE,
    phone_code VARCHAR(10),
    phone_number VARCHAR(20),
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create the login_activity table
CREATE TABLE login_activity (
    id SERIAL PRIMARY KEY,
    time TIMESTAMP NOT NULL,
    status VARCHAR(10) NOT NULL CHECK (status IN ('Success', 'Fail')),
    ip INET NOT NULL
);

-- Insert sample data
INSERT INTO login_activity (time, status, ip) 
VALUES
('2025-04-24 19:50:45', 'Success', '192.72.134.201'),
('2025-04-23 14:02:11', 'Fail', '104.16.201.8'),
('2025-04-22 09:15:33', 'Success', '72.21.214.11'),
('2025-04-21 22:40:57', 'Success', '185.64.12.55'),
('2025-04-20 06:05:02', 'Fail', '45.91.184.62');

-- Создание индекса для улучшения производительности поиска по email
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Создание индекса для улучшения производительности поиска по номеру телефона
CREATE INDEX IF NOT EXISTS idx_users_phone ON users(phone_code, phone_number);

