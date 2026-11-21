
-- ============================================
-- FluxPOS
-- 01 - Roles y usuarios
-- Motor: PostgreSQL
-- ============================================

-- ============================================
-- TABLA: roles
-- ============================================

CREATE TABLE roles (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description VARCHAR(255)
);

-- ============================================
-- TABLA: users
-- ============================================

CREATE TABLE users (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,

    role_id INTEGER NOT NULL,

    username VARCHAR(50) NOT NULL UNIQUE,
    name VARCHAR(100) NOT NULL,
    password_hash VARCHAR(255) NOT NULL,

    is_active BOOLEAN NOT NULL DEFAULT TRUE,

    created_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMPTZ NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_users_role
        FOREIGN KEY (role_id)
        REFERENCES roles(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE,

    CONSTRAINT chk_users_name
        CHECK (LENGTH(TRIM(name)) > 0),

    CONSTRAINT chk_users_username
        CHECK (LENGTH(TRIM(username)) > 0),

    CONSTRAINT chk_users_password
        CHECK (LENGTH(TRIM(password_hash)) > 0)
);

-- ============================================
-- INDICES
-- ============================================

CREATE INDEX idx_users_role_id
ON users(role_id);

-- ============================================
-- FUNCION: actualizar fecha de modificacion
-- ============================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- ============================================
-- TRIGGER: actualizacion automatica
-- ============================================

CREATE TRIGGER trg_users_updated_at
BEFORE UPDATE ON users
FOR EACH ROW
EXECUTE FUNCTION update_updated_at();

-- ============================================
-- ROLES INICIALES
-- ============================================

INSERT INTO roles (name, description)
VALUES
    ('admin', 'Administrador del sistema'),
    ('seller', 'Vendedor o empleado')
ON CONFLICT (name) DO NOTHING;

