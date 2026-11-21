-- ============================================
-- FluxPOS
-- 02 - Categorías, productos e inventario
-- Motor: PostgreSQL
-- ============================================

-- ============================================
-- TABLA: categories
-- ============================================

CREATE TABLE categories (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    description VARCHAR(255),

    CONSTRAINT chk_categories_name
        CHECK (LENGTH(TRIM(name)) > 0)
);

-- ============================================
-- TABLA: products
-- ============================================

CREATE TABLE products (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    category_id INTEGER NOT NULL,

    name VARCHAR(150) NOT NULL,
    description TEXT,

    cost_price NUMERIC(12, 2) NOT NULL,
    sale_price NUMERIC(12, 2) NOT NULL,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_products_category
        FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_products_name
        CHECK (LENGTH(TRIM(name)) > 0),

    CONSTRAINT chk_products_cost_price
        CHECK (cost_price >= 0),

    CONSTRAINT chk_products_sale_price
        CHECK (sale_price >= 0)
);

-- ============================================
-- TABLA: inventory
-- ============================================

CREATE TABLE inventory (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    product_id INTEGER NOT NULL UNIQUE,

    quantity INTEGER NOT NULL DEFAULT 0,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_inventory_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_inventory_quantity
        CHECK (quantity >= 0)
);

-- ============================================
-- INDICES
-- ============================================

CREATE INDEX idx_products_category_id
ON products(category_id);

-- ============================================
-- TRIGGERS: ACTUALIZACION AUTOMATICA
-- Reutiliza la funcion del Script 01
-- ============================================

CREATE TRIGGER trg_products_updated_at
BEFORE UPDATE ON products
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER trg_inventory_updated_at
BEFORE UPDATE ON inventory
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- ============================================
-- FUNCION: CREAR INVENTARIO AUTOMATICAMENTE
-- ============================================

CREATE OR REPLACE FUNCTION create_product_inventory()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO inventory (product_id, quantity)
    VALUES (NEW.id, 0);

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGER: INVENTARIO AUTOMATICO
-- ============================================

CREATE TRIGGER trg_create_product_inventory
AFTER INSERT ON products
FOR EACH ROW
EXECUTE FUNCTION create_product_inventory();

