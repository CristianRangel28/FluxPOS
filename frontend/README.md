# FluxPOS — Frontend (mockups)

Vue 3 + Vue Router + Axios, con Vite.

```bash
cd frontend
npm install
npm run dev      # http://localhost:5173
```

## Pantallas (mockups con datos de ejemplo en `src/data/mock.js`)

| Ruta | Pantalla | Historias |
|---|---|---|
| `/login` | Inicio de sesión | HU-01, HU-03 |
| `/dashboard` | Resumen general | — |
| `/productos` | Catálogo, búsqueda, filtro por categoría, alta/edición con validación | HU-04 a HU-06 |
| `/inventario` | Existencias, alertas de stock, movimientos y ajustes | HU-09 a HU-11 |
| `/ventas` | Nueva venta (carrito, validación de stock) e historial con detalle | HU-16, HU-18, HU-19, HU-22 |
| `/compras` | Historial y registro de compras | HU-20, HU-21 |
| `/clientes` | Listado, búsqueda y alta | HU-12, HU-13 |
| `/proveedores` | Tarjetas y alta | HU-14, HU-15 |

Los datos son estáticos: la conexión con la API (`src/services/api.js`) se hará cuando exista el backend.
