-- Seed Users
INSERT INTO users (username, password, first_name, last_name, email, image_url) VALUES
('john_doe', 'hashedpassword', 'John', 'Doe', 'john.doe@example.com', 'http://example.com/images/john.jpg'),
('jane_smith', 'hashedpassword', 'Jane', 'Smith', 'jane.smith@example.com', 'http://example.com/images/jane.jpg'),

-- Seed Categories
INSERT INTO categories (name, description, parent_category_id) VALUES
('Electronics', 'Electronic gadgets and devices', NULL),
('Clothing', 'Apparel for men, women, and children', NULL),

-- Seed Categories with a nested structure
-- Assuming 'Clothing' has id 2
INSERT INTO categories (name, description, parent_category_id) VALUES
('Pants', 'All kinds of pants for all genders', 2),
('Shirts', 'Variety of shirts for all genders', 2),
('Jackets', 'Warm and cozy jackets', 2);

-- You would need to adjust the user_id and product_id according to the actual values in your table
-- Seed Products
INSERT INTO products (name, review, rating, product_url, user_id, category_id) VALUES
('Smartphone Model X', 'Great smartphone with latest features.', 4.5, 'http://example.com/products/smartphone', 1, 1),

-- Seed Products with nested categories
-- Assuming the subcategories Pants, Shirts, and Jackets have IDs 3, 4, and 5 respectively
INSERT INTO products (name, review, rating, product_url, user_id, category_id) VALUES
('Designer Jeans', 'Stylish and comfortable.', 4.0, 'http://example.com/products/designer-jeans', 1, 3),
('Casual Shirt', 'Perfect for everyday wear.', 4.2, 'http://example.com/products/casual-shirt', 2, 4),
('Winter Jacket', 'Stay warm in the harshest weather.', 4.7, 'http://example.com/products/winter-jacket', 1, 5);

-- Seed Attributes
INSERT INTO attributes (name) VALUES
('color'),
('size'),

-- Seed Product Attributes
INSERT INTO product_attributes (product_id, attribute_id, value) VALUES
(1, 1, 'Black'),
(1, 2, '64GB'),
