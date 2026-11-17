# FluxPOS - Mockups

Abre `index.html` en el navegador. Cada pantalla es un archivo HTML independiente (sin librerías, sin instalar nada).

## Estructura
- `assets/base.css`: componentes comunes (botones, tablas, formularios, modales, badges).
- `assets/admin.css`: **colores y layout del administrador** (barra lateral).
- `assets/seller.css`: **colores y layout del vendedor** (barra superior).
- `admin/`, `seller/`, `shared/`: una pantalla por archivo.

## Cambiar colores
Edita las variables `:root` al inicio de `admin.css` o `seller.css`: `--primary`, `--primary-ink`, `--primary-soft`, `--side`. Los colores de estado (éxito, error, etc.) están en `base.css`.

## Mover un botón o un bloque
- Los botones de cada pantalla están en el bloque `<div class="acts">` del encabezado; mueve el `<a class="btn">` donde quieras.
- Para reordenar menús, cambia el orden de los `<a>` dentro de `.side` (admin) o `.top` (vendedor).
- Los modales están al final de cada archivo (`<div class="modal" id="...">`). Se abren con un enlace `href="#id"`.
- Cambiar columnas del layout: `.g2/.g3/.g4/.g21` (grillas) y `.pos` (punto de venta).

## Notas
- Las tipografías (Bricolage Grotesque y Public Sans) se cargan de Google Fonts; sin internet se usa la fuente del sistema.
- La sección **Usuarios** (`admin/a14-usuarios.html`) solo existe en el menú del admin; el vendedor que intente abrirla ve `shared/x03-sin-permisos.html`.
- Los datos son de ejemplo. Los permisos reales deben validarse en el backend, no solo ocultando botones.
