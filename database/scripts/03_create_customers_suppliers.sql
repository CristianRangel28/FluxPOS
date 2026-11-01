-- ============================================
-- FluxPOS
-- 03 - Clientes y proveedores
-- ============================================

CREATE TABLE customers (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    document_number VARCHAR(30) UNIQUE,
    phone VARCHAR(30),
    email VARCHAR(150),
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE suppliers (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    email VARCHAR(150),
    address VARCHAR(255)
);

-- Cliente predeterminado para ventas generales
INSERT INTO customers (name)
VALUES ('Cliente general');