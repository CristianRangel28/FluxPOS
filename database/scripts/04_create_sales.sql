
-- ============================================
-- FluxPOS
-- 04 - Ventas, detalles y pagos
-- Motor: PostgreSQL
-- ============================================

-- ============================================
-- TABLA: sales
-- ============================================

CREATE TABLE sales (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    customer_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,

    sale_number VARCHAR(30) NOT NULL UNIQUE,

    sale_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    subtotal NUMERIC(12, 2) NOT NULL,
    total NUMERIC(12, 2) NOT NULL,

    status VARCHAR(20) NOT NULL DEFAULT 'completed',

    cancelled_at TIMESTAMPTZ,
    cancelled_by INTEGER,

    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_sales_customer
        FOREIGN KEY (customer_id)
        REFERENCES customers(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_sales_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_sales_cancelled_by
        FOREIGN KEY (cancelled_by)
        REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_sales_number
        CHECK (LENGTH(TRIM(sale_number)) > 0),

    CONSTRAINT chk_sales_subtotal
        CHECK (subtotal >= 0),

    CONSTRAINT chk_sales_total
        CHECK (total >= 0),

    CONSTRAINT chk_sales_status
        CHECK (status IN ('completed', 'cancelled')),

    CONSTRAINT chk_sales_cancellation
        CHECK (
            (status = 'completed'
                AND cancelled_at IS NULL
                AND cancelled_by IS NULL)
            OR
            (status = 'cancelled'
                AND cancelled_at IS NOT NULL
                AND cancelled_by IS NOT NULL)
        )
);

-- ============================================
-- TABLA: sale_details
-- ============================================

CREATE TABLE sale_details (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    sale_id INTEGER NOT NULL,
    product_id INTEGER NOT NULL,

    quantity INTEGER NOT NULL,
    unit_price NUMERIC(12, 2) NOT NULL,
    subtotal NUMERIC(12, 2) NOT NULL,

    CONSTRAINT fk_sale_details_sale
        FOREIGN KEY (sale_id)
        REFERENCES sales(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_sale_details_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_sale_details_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_sale_details_unit_price
        CHECK (unit_price >= 0),

    CONSTRAINT chk_sale_details_subtotal
        CHECK (subtotal >= 0)
);

-- ============================================
-- TABLA: payments
-- ============================================

CREATE TABLE payments (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    sale_id INTEGER NOT NULL,

    name_method VARCHAR(50) NOT NULL,

    amount NUMERIC(12, 2) NOT NULL,

    payment_date TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    reference VARCHAR(100),

    CONSTRAINT fk_payments_sale
        FOREIGN KEY (sale_id)
        REFERENCES sales(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_payments_method
        CHECK (LENGTH(TRIM(name_method)) > 0),

    CONSTRAINT chk_payments_amount
        CHECK (amount > 0)
);

-- ============================================
-- INDICES
-- ============================================

CREATE INDEX idx_sales_customer_id
    ON sales(customer_id);

CREATE INDEX idx_sales_user_id
    ON sales(user_id);

CREATE INDEX idx_sales_sale_date
    ON sales(sale_date);

CREATE INDEX idx_sales_status
    ON sales(status);

CREATE INDEX idx_sale_details_sale_id
    ON sale_details(sale_id);

CREATE INDEX idx_sale_details_product_id
    ON sale_details(product_id);

CREATE INDEX idx_payments_sale_id
    ON payments(sale_id);

CREATE INDEX idx_payments_payment_date
    ON payments(payment_date);

-- ============================================
-- TRIGGER: ACTUALIZACION AUTOMATICA
-- Reutiliza la funcion del Script 01
-- ============================================

CREATE TRIGGER trg_sales_updated_at
BEFORE UPDATE ON sales
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();
