-- ============================================
-- FluxPOS
-- 06 - Auditoría de movimientos del inventario
-- ============================================

CREATE TABLE inventory_movements (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    product_id INTEGER NOT NULL,
    user_id INTEGER NOT NULL,
    movement_type VARCHAR(20) NOT NULL,
    quantity INTEGER NOT NULL,
    previous_quantity INTEGER NOT NULL,
    new_quantity INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_inventory_movements_product
        FOREIGN KEY (product_id)
        REFERENCES products(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT fk_inventory_movements_user
        FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_inventory_movements_type
        CHECK (
            movement_type IN (
                'sale',
                'purchase',
                'adjustment',
                'sale_reversal'
            )
        ),

    CONSTRAINT chk_inventory_movements_quantity
        CHECK (quantity > 0),

    CONSTRAINT chk_inventory_movements_previous
        CHECK (previous_quantity >= 0),

    CONSTRAINT chk_inventory_movements_new
        CHECK (new_quantity >= 0)
);

-- Índices para consultar el historial
CREATE INDEX idx_inventory_movements_product_id
    ON inventory_movements(product_id);

CREATE INDEX idx_inventory_movements_user_id
    ON inventory_movements(user_id);

CREATE INDEX idx_inventory_movements_created_at
    ON inventory_movements(created_at);

CREATE INDEX idx_inventory_movements_type
    ON inventory_movements(movement_type);