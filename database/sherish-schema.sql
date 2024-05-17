-- User Table Creation
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR (25) NOT NULL UNIQUE,
    password TEXT NOT NULL,
    first_name TEXT,
    last_name TEXT,
    email TEXT NOT NULL UNIQUE
        CHECK (position('@' IN email) > 1),
    image_url TEXT,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Category Table Creation
CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_category_id INTEGER REFERENCES categories(category_id)
);

-- Product Table Creation
CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    review TEXT,
    rating DECIMAL(2, 1) NOT NULL CHECK (rating >= 0.0 AND rating <= 5.0),
    product_url TEXT,
    user_id INTEGER REFERENCES users(user_id),
    category_id INTEGER REFERENCES categories(category_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Attribute Table Creation
CREATE TABLE attributes (
    attribute_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL CHECK (name = lower(name))
);

-- Product Attributes Table Creation
CREATE TABLE product_attributes (
    product_id INTEGER REFERENCES products(product_id),
    attribute_id INTEGER REFERENCES attributes(attribute_id),
    value TEXT NOT NULL,
    PRIMARY KEY (product_id, attribute_id)
);

-- Index Creation for Users Table
CREATE INDEX idx_users_username ON users(username);
CREATE INDEX idx_users_email ON users(email);

-- Index Creation for Categories Table
CREATE INDEX idx_categories_name ON categories(name);
CREATE INDEX idx_categories_parent_id ON categories(parent_category_id);

-- Index Creation for Products Table
CREATE INDEX idx_products_name ON products(name);
CREATE INDEX idx_products_user_id ON products(user_id);
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_rating ON products(rating);

-- Index Creation for Attributes Table
CREATE INDEX idx_attributes_name ON attributes(name);

-- Index Creation for Product Attributes Table
CREATE INDEX idx_product_attributes_value ON product_attributes(value);