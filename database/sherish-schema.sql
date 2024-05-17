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
)

CREATE TABLE categories (
    category_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    parent_category_id INTEGER REFERENCES categories(category_id) -- Allows for nested categories.
);

CREATE TABLE products (
    product_id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    review TEXT,
    rating DECIMAL(2, 1) NOT NULL CHECK (rating >= 0.0 AND rating <= 5.0),
    product_url TEXT,
    user_id VARCHAR(255) REFERENCES users(user_id),
    category_id INTEGER REFERENCES categories(category_id),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE attributes (
    attribute_id SERIAL PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL CHECK (name = lower(name))
    -- e.g., "Sustainability", "Color", "Material"
);

CREATE TABLE product_attributes (
    product_id INTEGER REFERENCES products(product_id),
    attribute_id INTEGER REFERENCES attributes(attribute_id),
    value TEXT NOT NULL, -- This could be "Eco-Friendly", "Red", etc.
    PRIMARY KEY (product_id, attribute_id)
);