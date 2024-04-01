-- Use SQL insert statements to add any
-- starting/dummy data to your database tables

-- EXAMPLE:

--  insert into "todos"
--    ("task", "isCompleted")
--    values
--      ('Learn to code', false),
--      ('Build projects', false),
--      ('Get a job', false);

-- Inserting sample data into "users" table
INSERT INTO users (id, full_name, email, created_at, address) VALUES
(1, 'John Doe', 'john@example.com', '2024-03-24', '123 Main St'),
(2, 'Jane Smith', 'jane@example.com', '2024-03-25', '456 Elm St');

-- Inserting sample data into "categories" table
INSERT INTO categories (id, cat_name, parent_id) VALUES
(1, 'Books', NULL),
(2, 'Fiction', 1),
(3, 'Non-Fiction', 1),
(4, 'Clothes', NULL),
(5, 'Men', 4),
(6, 'Women', 4);

-- Inserting sample data into "products" table
INSERT INTO products (id, name, merchant_id, price, status, created_at, category_id) VALUES
(1, 'Book A', 1, 20, 'available', '2024-03-24', 2),
(2, 'T-Shirt Blue', 2, 25, 'available', '2024-03-25', 5);

-- Inserting sample data into "orders" table
INSERT INTO orders (id, user_id, status, created_at) VALUES
(1, 1, 'pending', '2024-03-24'),
(2, 2, 'completed', '2024-03-25');

-- Inserting sample data into "order_items" table
INSERT INTO order_items (order_id, product_id, quantity) VALUES
(1, 1, 2),
(2, 2, 1);
