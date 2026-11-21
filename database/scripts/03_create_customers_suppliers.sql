
-- ============================================
-- FluxPOS
-- 03 - Clientes y proveedores
-- Motor: PostgreSQL
-- ============================================

-- ============================================
-- TABLA: customers
-- ============================================

CREATE TABLE customers (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name VARCHAR(150) NOT NULL,
    document_number VARCHAR(30) UNIQUE,
    phone VARCHAR(30),
    email VARCHAR(150),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_customers_name
        CHECK (LENGTH(TRIM(name)) > 0)
);

-- ============================================
-- TABLA: suppliers
-- ============================================

CREATE TABLE suppliers (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    name VARCHAR(150) NOT NULL,
    phone VARCHAR(30),
    email VARCHAR(150),
    address VARCHAR(255),

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT chk_suppliers_name
        CHECK (LENGTH(TRIM(name)) > 0)
);

-- ============================================
-- INDICES
-- ============================================

CREATE INDEX idx_customers_name
ON customers(name);

CREATE INDEX idx_suppliers_name
ON suppliers(name);

-- ============================================
-- TRIGGERS: ACTUALIZACION AUTOMATICA
-- Reutiliza la funcion del Script 01
-- ============================================

CREATE TRIGGER trg_customers_updated_at
BEFORE UPDATE ON customers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_suppliers_updated_at
BEFORE UPDATE ON suppliers
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- ============================================
-- CLIENTE PREDETERMINADO
-- ============================================

INSERT INTO customers (name)
VALUES ('Cliente general')
ON CONFLICT DO NOTHING;

