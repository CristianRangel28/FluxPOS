-- ============================================
-- FluxPOS
-- 04 - Ventas, detalles y pagos
-- ============================================

CREATE TABLE sales (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    customer_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    sale_number VARCHAR(30) NOT NULL UNIQUE,
    sale_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    subtotal NUMERIC(12, 2) NOT NULL,
    total NUMERIC(12, 2) NOT NULL,
    status VARCHAR(20) NOT NULL DEFAULT 'completed',
    cancelled_at TIMESTAMP,
    cancelled_by INTEGER,

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

CREATE TABLE payments (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    sale_id INTEGER NOT NULL,
    name_method VARCHAR(50) NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    payment_date TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    reference VARCHAR(100),

    CONSTRAINT fk_payments_sale
        FOREIGN KEY (sale_id)
        REFERENCES sales(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_payments_amount
        CHECK (amount > 0)
);

-- Índices para consultar ventas y sus relaciones
CREATE INDEX idx_sales_customer_id
    ON sales(customer_id);

CREATE INDEX idx_sales_user_id
    ON sales(user_id);

CREATE INDEX idx_sales_sale_date
    ON sales(sale_date);

CREATE INDEX idx_sale_details_sale_id
    ON sale_details(sale_id);

CREATE INDEX idx_sale_details_product_id
    ON sale_details(product_id);

CREATE INDEX idx_payments_sale_id
    ON payments(sale_id);