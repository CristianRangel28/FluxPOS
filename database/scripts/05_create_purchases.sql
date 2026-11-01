-- ============================================
-- FluxPOS
-- 05 - Compras y detalles de compra
-- ============================================

CREATE TABLE purchases (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    supplier_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    purchase_number VARCHAR(30) NOT NULL UNIQUE,
    purchase_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subtotal NUMERIC(12, 2) NOT NULL,
    total NUMERIC(12, 2) NOT NULL,

    CONSTRAINT fk_purchases_supplier
        FOREIGN KEY (supplier_id)
        REFERENCES suppliers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_purchases_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_purchases_subtotal
        CHECK (subtotal >= 0),

    CONSTRAINT chk_purchases_total
        CHECK (total >= 0)
);

CREATE TABLE purchase_details (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    purchase_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,
    quantity INTEGER NOT NULL,
    unit_cost NUMERIC(12, 2) NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL,

    CONSTRAINT fk_purchase_details_purchase
        FOREIGN KEY (purchase_id)
        REFERENCES purchases(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_purchase_details_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_purchase_details_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_purchase_details_unit_cost
        CHECK (unit_cost >= 0),

    CONSTRAINT chk_purchase_details_subtotal
        CHECK (subtotal >= 0)
);

-- Índices para consultas de compras
CREATE INDEX idx_purchases_supplier_id
    ON purchases(supplier_id);

CREATE INDEX idx_purchases_user_id
    ON purchases(user_id);

CREATE INDEX idx_purchase_details_purchase_id
    ON purchase_details(purchase_id);

CREATE INDEX idx_purchase_details_product_id
    ON purchase_details(product_id);