# FluxPOS — Product Backlog completo

**Proyecto:** FluxPOS
**Versión:** 1.2 (incorpora HU-26 y la asignación de tareas del Sprint 1)
**Metodología:** Scrum · 4 sprints de 1 semana · equipo de 6 personas (Product Owner y 5 desarrolladores)
**Roles del sistema:** Administrador (`admin`) y Vendedor (`seller`)

> Las estimaciones en puntos son una **propuesta inicial** (escala Fibonacci, relativa) para que el equipo las revise en el Sprint Planning. No son horas ni compromisos. Las prioridades y la asignación a sprints deben validarse con el Product Owner.

---

## 1. Resumen

| Concepto | Valor |
|---|---|
| Historias de usuario | 26 (HU-01 a HU-26) |
| Tareas técnicas | 21 (T-01 a T-21) |
| Puntos de historias | 114 |
| Puntos de tareas técnicas | 42 |
| Prioridad Alta / Media / Baja | 14 / 11 / 1 |

---

## 2. Backlog priorizado

Ordenado por prioridad y por dependencias: ninguna historia aparece antes de lo que necesita.

| # | ID | Historia | Rol | Prioridad | Pts | Sprint | Depende de |
|--:|---|---|---|---|--:|:-:|---|
| 1 | T-01 a T-16 | Preparación técnica del Sprint 1 (ver sección 4) | Equipo | Alta | 28 | 1 | — |
| 2 | T-17 | Datos iniciales (administrador, cliente general, métodos de pago) | Equipo | Alta | 2 | 2 | T-08 |
| 3 | HU-01 | Iniciar sesión | Todos | Alta | 5 | 2 | T-08, T-17 |
| 4 | HU-02 | Controlar el acceso según el rol | Admin | Alta | 5 | 2 | HU-01 |
| 5 | HU-03 | Cerrar sesión | Todos | Alta | 2 | 2 | HU-01 |
| 6 | HU-26 | Gestionar usuarios del sistema | Admin | Alta | 8 | 2 | HU-01, HU-02 |
| 7 | HU-07 | Registrar categorías | Admin | Media | 2 | 2 | T-08 |
| 8 | HU-04 | Registrar productos | Admin | Alta | 5 | 2 | HU-07 |
| 9 | HU-05 | Consultar productos | Admin, Vendedor | Alta | 3 | 2 | HU-04 |
| 10 | HU-06 | Actualizar y desactivar productos | Admin | Alta | 3 | 2 | HU-04 |
| 11 | HU-08 | Consultar y actualizar categorías | Admin | Media | 3 | 2 | HU-07 |
| 12 | HU-12 | Registrar clientes | Vendedor, Admin | Media | 3 | 2 | T-17 |
| 13 | HU-13 | Consultar clientes | Vendedor, Admin | Media | 2 | 2 | HU-12 |
| 14 | HU-14 | Registrar proveedores | Admin | Media | 2 | 2 | T-08 |
| 15 | HU-15 | Consultar proveedores | Admin | Media | 2 | 2 | HU-14 |
| 16 | HU-25 | Mostrar mensajes y manejar errores | Todos | Alta | 5 | 2 → 4 | Transversal |
| 17 | HU-09 | Consultar existencias | Admin, Vendedor | Alta | 3 | 3 | HU-05 |
| 18 | HU-16 | Registrar una venta | Vendedor | Alta | 13 | 3 | HU-05, HU-09, HU-13 |
| 19 | HU-17 | Registrar el pago de una venta | Vendedor | Alta | 5 | 3 | HU-16 |
| 20 | HU-20 | Registrar una compra | Admin | Alta | 8 | 3 | HU-15, HU-05 |
| 21 | HU-23 | Mantener la integridad de las operaciones | Admin | Alta | 8 | 3 | HU-16, HU-20 |
| 22 | HU-10 | Registrar ajustes de inventario | Admin | Media | 5 | 3 | HU-09 |
| 23 | HU-11 | Consultar movimientos de inventario | Admin | Media | 3 | 3 | HU-10 |
| 24 | HU-19 | Anular una venta | Admin | Alta | 8 | 4 | HU-16, HU-09 |
| 25 | HU-22 | Consultar el detalle de una venta | Admin, Vendedor | Media | 3 | 4 | HU-16 |
| 26 | HU-18 | Consultar historial de ventas | Admin | Media | 3 | 4 | HU-16 |
| 27 | HU-21 | Consultar historial de compras | Admin | Media | 3 | 4 | HU-20 |
| 28 | T-18 a T-21 | Pruebas, documentación, demo y presentación | Equipo | Alta | 12 | 4 | Todas |
| 29 | HU-24 | Actualizar automáticamente la fecha de modificación | Admin | Baja | 2 | 4 | T-08 |

> HU-25 se reparte: 2 puntos en el Sprint 2 (componente de mensajes y manejo de errores del backend) y 3 puntos en el Sprint 4 (revisión final de todos los mensajes).

---

## 3. Plan por sprint

### Calendario propuesto

| Sprint | Fechas | Días hábiles | Nota |
|---|---|:-:|---|
| 1 | lun 16 – vie 20 nov | 4 | El lunes 16 es festivo; el trabajo arranca el martes 17. |
| 2 | lun 23 – vie 27 nov | 5 | — |
| 3 | lun 30 nov – vie 4 dic | 5 | — |
| 4 | lun 7 – vie 11 dic | 4 | El martes 8 de diciembre es festivo. |

Los sprints 1 y 4 tienen un día hábil menos; conviene tenerlo en cuenta al comprometer el alcance.

### Sprint 1 — Preparación y fundamentos · 28 pts · 16–20 nov

**Objetivo:** frontend, backend y base de datos funcionando localmente y conectados entre sí.

| Responsable | Tarea | Entrega |
|---|---|---|
| Daniel Monterrey | T-01 Inicializar el backend | 18-nov |
| | T-02 Crear el endpoint de comprobación | 18-nov |
| | T-03 Organizar las rutas de la API | 19-nov |
| Brito | T-04 Inicializar el frontend | 17-nov |
| | T-05 Configurar Vue Router | 18-nov |
| | T-06 Crear la estructura visual | 20-nov |
| Breyler | T-07 Preparar los scripts SQL | 17-nov |
| | T-08 Crear y verificar la base de datos | 19-nov |
| | T-09 Verificar las restricciones de la base de datos | 20-nov |
| Deyner | T-10 Probar la comunicación entre frontend y backend | 19-nov |
| | T-11 Configurar Axios | 18-nov |
| | T-12 Preparar las variables de entorno | 20-nov |
| Alex | T-13 Configurar la conexión a PostgreSQL | 19-nov |
| | T-14 Crear una utilidad de acceso a la base de datos | 20-nov |
| | T-15 Crear un endpoint de prueba de base de datos | 20-nov |
| | T-16 Documentar la ejecución local del proyecto | 21-nov |

**Demo:** frontend y backend corriendo, con una consulta a PostgreSQL visible desde el frontend.

**Puntos de atención del Sprint 1**

- **Variables de entorno:** T-12 (20-nov) queda después de T-13 (19-nov), que necesita las credenciales de la base de datos. Conviene adelantar T-12 o acordar un archivo de ejemplo antes del 19.
- **Base de datos:** T-13 empieza el mismo día en que termina T-08 (19-nov), y T-14 y T-15 dependen de T-13 al día siguiente. No hay margen si T-08 se retrasa.
- **T-16 (21-nov):** cae en sábado, después del cierre del sprint. Conviene adelantarla al viernes 20 o dejar claro que el Sprint Review no la incluye.
- **Pendientes sin asignar:** el repositorio y sus reglas de ramas, las convenciones de código y los datos iniciales (T-17, necesarios para HU-01).

### Sprint 2 — Acceso, usuarios y catálogos · 49 pts (47 de historias y 2 de tarea técnica) · 23–27 nov

**Objetivo:** que un usuario pueda iniciar sesión según su rol, que el admin pueda crear vendedores y que existan los catálogos base.

| ID | Historia | Pts |
|---|---|--:|
| T-17 | Datos iniciales: administrador, cliente general, métodos de pago (tarea técnica) | 2 |
| HU-01 | Iniciar sesión | 5 |
| HU-02 | Controlar el acceso según el rol | 5 |
| HU-03 | Cerrar sesión | 2 |
| HU-26 | Gestionar usuarios del sistema | 8 |
| HU-07 | Registrar categorías | 2 |
| HU-04 | Registrar productos | 5 |
| HU-05 | Consultar productos | 3 |
| HU-06 | Actualizar y desactivar productos | 3 |
| HU-08 | Consultar y actualizar categorías | 3 |
| HU-12 | Registrar clientes | 3 |
| HU-13 | Consultar clientes | 2 |
| HU-14 | Registrar proveedores | 2 |
| HU-15 | Consultar proveedores | 2 |
| HU-25 | Mensajes y errores (base) | 2 |

**Demo:** el admin inicia sesión, crea un vendedor, el vendedor cambia su clave y entra; se ve el catálogo con productos y categorías.

**Riesgo:** es el sprint más cargado. Si el avance real no alcanza, las candidatas a pasar al Sprint 3 son **HU-12, HU-13, HU-14 y HU-15** (9 pts), porque no bloquean al resto hasta que empiecen las ventas y las compras. HU-13 sí es necesaria para HU-16 (cliente general): ese cliente puede entrar por el script de datos iniciales.

### Sprint 3 — Ventas, compras e inventario · 45 pts · 30 nov – 4 dic

**Objetivo:** completar el flujo comercial principal, con el inventario consistente.

| ID | Historia | Pts |
|---|---|--:|
| HU-09 | Consultar existencias | 3 |
| HU-16 | Registrar una venta | 13 |
| HU-17 | Registrar el pago de una venta | 5 |
| HU-20 | Registrar una compra | 8 |
| HU-23 | Integridad de las operaciones | 8 |
| HU-10 | Registrar ajustes de inventario | 5 |
| HU-11 | Consultar movimientos de inventario | 3 |

**Demo:** el vendedor registra una venta con varios productos y la cobra; el admin registra una compra; el inventario cambia y cada cambio queda en los movimientos. Un intento de vender sin existencias es rechazado.

**Riesgo:** HU-16 es la historia más grande. Si no cabe, dividirla en: (a) carrito y totales, (b) validación de existencias, (c) guardado transaccional.

### Sprint 4 — Anulaciones, consultas, integración y entrega · 34 pts · 7–11 dic

**Objetivo:** cerrar las consultas históricas, anular ventas y dejar el sistema estable y presentable.

| ID | Historia | Pts |
|---|---|--:|
| HU-19 | Anular una venta | 8 |
| HU-22 | Consultar el detalle de una venta | 3 |
| HU-18 | Consultar historial de ventas | 3 |
| HU-21 | Consultar historial de compras | 3 |
| HU-25 | Mensajes y errores (cierre) | 3 |
| HU-24 | Fecha de modificación automática | 2 |
| T-18 a T-21 | Pruebas, documentación, demo, presentación | 12 |

**Demo final:** flujos completos de venta, compra, anulación y gestión de usuarios.
**Orden de recorte si falta tiempo:** primero HU-24, luego HU-21 y HU-18 (solo consulta).

---

## 4. Backlog técnico

| ID | Tarea | Responsable | Pts | Sprint | Entrega |
|---|---|---|--:|:-:|---|
| T-01 | Inicializar el backend | Daniel Monterrey | 2 | 1 | 18-nov |
| T-02 | Crear el endpoint de comprobación | Daniel Monterrey | 1 | 1 | 18-nov |
| T-03 | Organizar las rutas de la API | Daniel Monterrey | 1 | 1 | 19-nov |
| T-04 | Inicializar el frontend | Brito | 2 | 1 | 17-nov |
| T-05 | Configurar Vue Router | Brito | 1 | 1 | 18-nov |
| T-06 | Crear la estructura visual | Brito | 3 | 1 | 20-nov |
| T-07 | Preparar los scripts SQL | Breyler | 3 | 1 | 17-nov |
| T-08 | Crear y verificar la base de datos | Breyler | 2 | 1 | 19-nov |
| T-09 | Verificar las restricciones de la base de datos | Breyler | 2 | 1 | 20-nov |
| T-10 | Probar la comunicación entre frontend y backend | Deyner | 2 | 1 | 19-nov |
| T-11 | Configurar Axios | Deyner | 1 | 1 | 18-nov |
| T-12 | Preparar las variables de entorno | Deyner | 1 | 1 | 20-nov |
| T-13 | Configurar la conexión a PostgreSQL | Alex | 2 | 1 | 19-nov |
| T-14 | Crear una utilidad de acceso a la base de datos | Alex | 2 | 1 | 20-nov |
| T-15 | Crear un endpoint de prueba de base de datos | Alex | 1 | 1 | 20-nov |
| T-16 | Documentar la ejecución local del proyecto | Alex | 2 | 1 | 21-nov |
| T-17 | Datos iniciales: primer administrador, cliente general, métodos de pago y categorías de ejemplo | Por asignar | 2 | 2 | Inicio del Sprint 2 |
| T-18 | Pruebas de los flujos principales (venta, compra, anulación, permisos, existencias negativas) | Por asignar | 5 | 4 | — |
| T-19 | Documentación técnica y guía breve de uso | Por asignar | 3 | 4 | — |
| T-20 | Datos de demostración | Por asignar | 2 | 4 | — |
| T-21 | Ensayo y preparación de la presentación final | Por asignar | 2 | 4 | — |

**Carga del Sprint 1 por persona:** Daniel 4 pts, Brito 6, Breyler 7, Deyner 4 y Alex 7.

---

## 5. Trazabilidad con los requerimientos

| Requerimiento | Historias |
|---|---|
| RF-01 Iniciar sesión | HU-01, HU-03 |
| RF-02 Control de acceso por rol | HU-02 |
| RF-03 Productos y categorías | HU-04, HU-05, HU-06, HU-07, HU-08 |
| RF-04 Clientes y proveedores | HU-12, HU-13, HU-14, HU-15 |
| RF-05 Existencias | HU-09 |
| RF-06 Registrar ventas | HU-16 |
| RF-07 Sin existencias negativas | HU-16, HU-23 |
| RF-08 Pagos | HU-17 |
| RF-09 Anular ventas | HU-19 |
| RF-10 Registrar compras | HU-20 |
| RF-11 Actualizar inventario | HU-16, HU-20 |
| RF-12 Movimientos de inventario | HU-10, HU-11, HU-19 |
| RF-13 Historiales y consultas | HU-11, HU-18, HU-21, HU-22 |
| RF-14 Validaciones y mensajes | HU-25 |
| **RF-15 (nuevo)** Gestión de usuarios | HU-26 |

Todos los requerimientos tienen al menos una historia. HU-24 y HU-23 respaldan los requerimientos no funcionales de integridad y trazabilidad (RNF-04, RNF-08, RNF-09).

---

## 6. Distribución por rol

| Rol | Historias |
|---|---|
| Administrador | HU-02, HU-04, HU-06, HU-07, HU-08, HU-10, HU-11, HU-14, HU-15, HU-18, HU-19, HU-20, HU-21, HU-26 |
| Vendedor | HU-12, HU-13, HU-16, HU-17 |
| Ambos | HU-01, HU-03, HU-05, HU-09, HU-22, HU-25 |

---
