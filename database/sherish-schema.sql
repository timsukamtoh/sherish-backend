CREATE TABLE users (
    username VARCHAR (25) PRIMARY KEY,
    password TEXT NOT NULL,
    first_name TEXT NOT NULL,
    last_name TEXT NOT NULL,
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
    id SERIAL PRIMARY KEY,
    username REFERENCES users ON DELETE CASCADE,
    product_url TEXT
)

