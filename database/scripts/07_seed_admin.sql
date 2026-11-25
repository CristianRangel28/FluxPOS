
-- ============================================
-- FluxPOS
-- 07 - Usuario administrador inicial
-- Responsable: Breyler
-- ============================================

-- Habilitar extensión para generar hashes bcrypt
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- Insertar usuario administrador
INSERT INTO users (
    role_id,
    username,
    name,
    password_hash,
    is_active
)
SELECT
    r.id,
    'admin',
    'Administrador',
    crypt('Admin123*', gen_salt('bf', 10)),
    TRUE
FROM roles r
WHERE r.name = 'admin'

ON CONFLICT (username) DO NOTHING;
