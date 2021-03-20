DROP DATABASE IF EXISTS sdc;

CREATE DATABASE sdc;

\c sdc

CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL,
  name VARCHAR(55),
  slogan VARCHAR(250),
  description VARCHAR(500),
  category VARCHAR(25),
  default_price INTEGER,
  PRIMARY KEY(id)
);

CREATE TABLE IF NOT EXISTS features (
  id BIGSERIAL,
  productId INTEGER,
  name VARCHAR(50),
  value VARCHAR(50),
  PRIMARY KEY(id),
  FOREIGN KEY(productId)
    REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS styles (
  id BIGSERIAL,
  productId INTEGER,
  name VARCHAR(55),
  sale_price INTEGER,
  original_price INTEGER,
  default_style BOOLEAN,
  PRIMARY KEY(id),
  FOREIGN KEY(productId)
    REFERENCES products(id)
);

CREATE TABLE IF NOT EXISTS photos (
  id BIGSERIAL,
  styleId INTEGER,
  url TEXT,
  thumbnail_url TEXT,
  PRIMARY KEY(id),
  FOREIGN KEY(styleId)
    REFERENCES styles(id)
);

CREATE TABLE IF NOT EXISTS skus (
  id BIGSERIAL,
  styleId INTEGER,
  size VARCHAR(10),
  quantity INTEGER,
  PRIMARY KEY(id),
  FOREIGN KEY(styleId)
    REFERENCES styles(id)
);

CREATE TABLE IF NOT EXISTS related (
  id BIGSERIAL,
  current_product_id INTEGER,
  related_product_id INTEGER,
  PRIMARY KEY(id),
  FOREIGN KEY(current_product_id)
    REFERENCES products(id)
);