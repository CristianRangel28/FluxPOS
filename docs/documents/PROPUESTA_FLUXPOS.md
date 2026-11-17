
# PROPUESTA DE DESARROLLO DE SOFTWARE
# FluxPOS — Sistema de Punto de Venta

**Proyecto:** FluxPOS  
**Tipo de proyecto:** Desarrollo de aplicación web  
**Metodología:** Scrum  
**Duración estimada:** 4 semanas (4 sprints)  
**Tamaño del equipo:** 6 integrantes  
**Versión del documento:** 1.0

---

## 1. Introducción

En los pequeños establecimientos comerciales, el control de las ventas, los productos y el inventario puede realizarse de manera manual o mediante herramientas que no están integradas entre sí. Esto puede dificultar el seguimiento de las operaciones, la consulta de información y el control de las existencias.

FluxPOS propone el desarrollo de un sistema web de punto de venta que permita centralizar estas operaciones en una sola aplicación, facilitando el registro de ventas, la administración de productos y el seguimiento del inventario.

El proyecto se desarrollará de manera incremental mediante la metodología Scrum, organizando el trabajo en cuatro sprints de una semana cada uno.

## 2. Planteamiento del problema

La gestión manual o desorganizada de las operaciones de una tienda puede generar dificultades como:

- Errores al registrar ventas y calcular sus valores.
- Falta de actualización oportuna de las existencias.
- Dificultad para consultar el historial de ventas.
- Información de productos, clientes y proveedores dispersa.
- Poca trazabilidad sobre los cambios realizados en el inventario.

Por esta razón, se plantea desarrollar una aplicación que centralice la información y automatice las operaciones principales de un punto de venta.

## 3. Objetivos

### 3.1. Objetivo general

Desarrollar FluxPOS, una aplicación web de punto de venta que permita gestionar productos, inventario, ventas, clientes y compras de manera organizada, segura y consistente.

### 3.2. Objetivos específicos

- Implementar una interfaz web intuitiva para la gestión de las operaciones comerciales.
- Desarrollar una API REST para procesar solicitudes y aplicar las reglas del negocio.
- Diseñar e integrar una base de datos relacional para almacenar la información.
- Automatizar la actualización de las existencias al registrar operaciones de venta y compra.
- Mantener un historial de movimientos del inventario para facilitar su seguimiento.
- Aplicar controles de validación y manejo de errores.
- Organizar el desarrollo mediante Scrum y herramientas de control de versiones.

## 4. Propuesta de solución

Se propone construir una aplicación web centralizada, dividida en tres componentes principales:

1. **Frontend:** interfaz mediante la cual los usuarios interactuarán con el sistema.
2. **Backend:** servicio encargado de procesar las solicitudes, validar la información y aplicar las reglas del negocio.
3. **Base de datos:** componente responsable de almacenar la información y mantener las relaciones entre los registros.

Los componentes se comunicarán mediante una API REST. Las operaciones que afecten simultáneamente las ventas y el inventario deberán ejecutarse de manera consistente, evitando que un error deje información incompleta.

La aplicación estará orientada inicialmente a la administración de una sola tienda.

## 5. Alcance del proyecto

### 5.1. Funcionalidades incluidas

El desarrollo contempla los siguientes módulos:

- **Usuarios y acceso:** inicio de sesión, control de acceso según el rol asignado y gestión de usuarios (alta, edición, desactivación y restablecimiento de contraseña).
- **Productos y categorías:** registro, consulta, actualización y desactivación de productos, y gestión de sus categorías.
- **Inventario:** consulta de existencias, actualización automática y registro de movimientos.
- **Ventas:** registro de ventas ya pagadas, detalle de productos, cálculo de totales y registro del pago único por el total.
- **Anulación de ventas:** anulación controlada de operaciones y devolución de las cantidades correspondientes al inventario.
- **Clientes:** registro y consulta de información de clientes.
- **Proveedores:** registro y consulta de información de proveedores.
- **Compras:** registro de compras a proveedores y actualización de las existencias.
- **Consultas básicas:** visualización del historial de ventas y consulta de movimientos del inventario.

### 5.2. Fuera del alcance inicial

Para cumplir con el plazo de cuatro semanas, se excluyen inicialmente:

- Integración con plataformas externas de facturación electrónica.
- Integración con pasarelas de pago o entidades bancarias.
- Aplicación móvil nativa.
- Gestión de múltiples sucursales.
- Integración con hardware especializado, como lectores de códigos de barras o impresoras fiscales.
- Módulos avanzados de contabilidad, nómina y análisis predictivo.
- Ventas a crédito, pagos parciales (abonos) y pagos divididos entre varios métodos de pago.

Estas funcionalidades podrán considerarse como mejoras futuras.

## 6. Requerimientos funcionales

Los requerimientos funcionales describen las acciones que el sistema debe permitir realizar.

| Código | Requerimiento |
|---|---|
| RF-01 | El sistema debe permitir iniciar sesión y validar las credenciales de los usuarios. |
| RF-02 | El sistema debe controlar el acceso a las funcionalidades según el rol del usuario. |
| RF-03 | El sistema debe permitir registrar, consultar y actualizar productos y categorías, y desactivar productos. |
| RF-04 | El sistema debe permitir registrar y consultar clientes y proveedores. |
| RF-05 | El sistema debe mostrar las existencias disponibles de cada producto. |
| RF-06 | El sistema debe permitir registrar ventas con uno o varios productos y calcular sus subtotales y total. |
| RF-07 | El sistema debe impedir que una venta genere existencias negativas. |
| RF-08 | El sistema debe registrar el pago de cada venta, por su valor total y con un único método de pago. |
| RF-09 | El sistema debe permitir anular ventas y devolver las cantidades correspondientes al inventario sin eliminar el historial. |
| RF-10 | El sistema debe permitir registrar compras asociadas a proveedores. |
| RF-11 | El sistema debe actualizar el inventario al confirmar compras y ventas. |
| RF-12 | El sistema debe registrar los movimientos de inventario generados por ventas, compras, ajustes y anulaciones. |
| RF-13 | El sistema debe permitir consultar el historial de ventas y los movimientos del inventario. |
| RF-14 | El sistema debe validar los datos obligatorios y mostrar mensajes comprensibles cuando una operación no pueda completarse. |
| RF-15 | El sistema debe permitir al administrador crear, editar, desactivar y reactivar usuarios, y restablecer sus contraseñas. |

## 7. Requerimientos no funcionales

Los requerimientos no funcionales establecen las condiciones de calidad con las que debe funcionar el sistema.

| Código | Requerimiento |
|---|---|
| RNF-01 | **Usabilidad:** la interfaz debe ser clara, consistente y fácil de utilizar. |
| RNF-02 | **Seguridad:** las contraseñas deben almacenarse mediante funciones de hash seguras, nunca en texto plano. |
| RNF-03 | **Control de acceso:** el backend debe verificar los permisos; no debe depender únicamente de las restricciones visuales del frontend. |
| RNF-04 | **Integridad:** las operaciones relacionadas con ventas, compras e inventario deben mantener la consistencia de los datos mediante transacciones y restricciones. |
| RNF-05 | **Mantenibilidad:** el código debe organizarse por módulos, con nombres claros y responsabilidades definidas. |
| RNF-06 | **Compatibilidad:** la aplicación debe funcionar en versiones recientes de los principales navegadores web. |
| RNF-07 | **Rendimiento:** las operaciones habituales deben responder en tiempos razonables bajo la carga de prueba prevista para una tienda pequeña. |
| RNF-08 | **Trazabilidad:** los movimientos de inventario deben conservar información suficiente para identificar el producto, el tipo de movimiento, las cantidades y la fecha. |
| RNF-09 | **Confiabilidad:** el sistema debe gestionar los errores sin dejar operaciones parcialmente aplicadas. |
| RNF-10 | **Control de versiones:** el código fuente debe gestionarse mediante Git y un repositorio compartido en GitHub. |

## 8. Tecnologías propuestas

Se utilizarán tecnologías ampliamente conocidas en el desarrollo de aplicaciones web.

| Tecnología | Uso dentro de FluxPOS |
|---|---|
| Vue 3 | Construcción de la interfaz de usuario. |
| Vue Router | Navegación entre las pantallas de la aplicación. |
| Axios | Comunicación HTTP entre el frontend y el backend. |
| Node.js | Entorno de ejecución del backend. |
| Express.js | Creación de la API REST y procesamiento de solicitudes. |
| PostgreSQL | Almacenamiento y administración de los datos. |
| SQL | Creación de tablas, consultas, restricciones y operaciones sobre la base de datos. |
| Node-postgres (`pg`) | Conexión entre Node.js y PostgreSQL. |
| Git y GitHub | Control de versiones y colaboración entre los integrantes. |

### Arquitectura propuesta

```text
┌──────────────────────────────┐
│           FRONTEND           │
│   Vue 3 + Vue Router          │
│          + Axios              │
└──────────────┬───────────────┘
               │ HTTP / JSON
               ▼
┌──────────────────────────────┐
│           BACKEND            │
│     Node.js + Express         │
│        API REST               │
│      Node-postgres (pg)       │
└──────────────┬───────────────┘
               │ SQL
               ▼
┌──────────────────────────────┐
│          BASE DE DATOS       │
│          PostgreSQL           │
└──────────────────────────────┘
```

## 9. Metodología de trabajo: Scrum

Se utilizará Scrum como marco de trabajo para organizar el desarrollo en ciclos cortos llamados *sprints*.

Cada sprint tendrá una duración de una semana y un objetivo concreto. Al finalizarlo, el equipo deberá contar con un incremento funcional del producto o con un avance verificable hacia él.

Las actividades principales serán:

- **Sprint Planning:** definir el objetivo del sprint y seleccionar las tareas.
- **Daily Scrum:** reunión breve para revisar avances, próximos pasos y bloqueos.
- **Sprint Review:** presentar y validar el trabajo desarrollado.
- **Sprint Retrospective:** identificar qué funcionó bien y qué debe mejorarse.
- **Product Backlog:** lista priorizada de funcionalidades, mejoras y correcciones.

Debido a la corta duración del proyecto, las reuniones deben ser breves y enfocadas en obtener resultados concretos.

## 10. Organización del equipo

El equipo estará compuesto por seis integrantes.

| Rol | Cantidad | Responsabilidades principales |
|---|---:|---|
| Product Owner (PO) | 1 | Priorizar las funcionalidades y representar las necesidades del usuario. |
| Equipo de desarrollo | 5 | Diseñar, programar, integrar, probar y documentar el sistema. |
| **Total** | **6** | |

El Product Owner colaborará con el equipo y participará en las actividades de planificación y revisión. Al no contar con un Scrum Master, los desarrolladores se repartirán la facilitación de las reuniones y la gestión de bloqueos. Se recomienda que los cinco desarrolladores se organicen en tareas de frontend, backend, base de datos e integración, compartiendo conocimientos para evitar que una sola persona concentre una parte crítica del sistema.

Las responsabilidades técnicas podrán rotarse o compartirse según las habilidades de los integrantes.

## 11. Plan de trabajo: cuatro sprints

La duración total estimada es de cuatro semanas. Cada sprint tendrá una duración de cinco días hábiles.

### Sprint 1 — Semana 1: Preparación y fundamentos

**Objetivo:** establecer la base técnica y organizativa del proyecto.

Actividades:

- Confirmar el alcance y priorizar el Product Backlog.
- Crear el repositorio compartido en GitHub.
- Configurar el entorno de desarrollo.
- Preparar la base de datos y ejecutar los scripts existentes.
- Crear la estructura inicial del backend con Node.js y Express.
- Crear la estructura inicial del frontend con Vue 3.
- Establecer la conexión entre el backend y PostgreSQL.
- Definir convenciones de código y organización de carpetas.

**Entregables:**
- Repositorio inicializado.
- Base de datos creada y verificada.
- Frontend y backend ejecutándose localmente.
- Conexión funcional entre backend y base de datos.
- Product Backlog priorizado.

### Sprint 2 — Semana 2: Usuarios y gestión de información

**Objetivo:** construir los componentes fundamentales para administrar la información de la tienda.

Actividades:

- Implementar el inicio de sesión y las validaciones básicas.
- Configurar el control de acceso según roles.
- Desarrollar el CRUD de productos y categorías.
- Desarrollar la gestión de clientes y proveedores.
- Crear y probar los endpoints correspondientes.
- Conectar las vistas de Vue con la API.
- Realizar pruebas de validación y manejo de errores.

**Entregables:**
- Inicio de sesión funcional.
- Gestión básica de productos y categorías.
- Gestión básica de clientes y proveedores.
- Frontend conectado con los endpoints implementados.

### Sprint 3 — Semana 3: Ventas, compras e inventario

**Objetivo:** implementar el flujo principal de las operaciones comerciales.

Actividades:

- Desarrollar el registro de ventas y sus detalles.
- Calcular subtotales y totales.
- Registrar los pagos asociados a las ventas.
- Implementar las reglas para actualizar el inventario.
- Desarrollar el registro de compras y sus detalles.
- Implementar los movimientos de inventario y su auditoría.
- Implementar la anulación controlada de ventas.
- Probar transacciones, restricciones y casos de error.

**Entregables:**
- Registro de ventas funcional.
- Registro de compras funcional.
- Actualización consistente del inventario.
- Registro de movimientos de inventario.
- Anulación de ventas con devolución de existencias.

### Sprint 4 — Semana 4: Integración, pruebas y entrega

**Objetivo:** estabilizar el sistema y preparar la presentación final.

Actividades:

- Integrar los módulos desarrollados.
- Corregir errores detectados durante las pruebas.
- Validar los permisos de acceso.
- Probar los flujos completos de venta, compra y anulación.
- Verificar que no se produzcan existencias negativas.
- Implementar o completar las consultas e historiales básicos.
- Mejorar los mensajes de error y la usabilidad.
- Preparar la documentación y los datos de demostración.
- Ensayar la presentación del proyecto.

**Entregables:**
- Versión integrada y funcional de FluxPOS.
- Pruebas de los principales flujos.
- Documentación técnica y guía básica de uso.
- Presentación y demostración final.

### Resumen del cronograma

| Sprint | Semana | Enfoque principal |
|---|---|---|
| Sprint 1 | 1 | Configuración y fundamentos |
| Sprint 2 | 2 | Usuarios y gestión de información |
| Sprint 3 | 3 | Ventas, compras e inventario |
| Sprint 4 | 4 | Integración, pruebas y entrega |

**Nota:** este cronograma representa una planificación inicial. El alcance deberá priorizarse según el avance real, la complejidad de las funcionalidades y la capacidad del equipo.

## 12. Criterios de aceptación del producto

Se considerará que la versión inicial cumple su objetivo cuando se verifique que:

1. Los usuarios pueden iniciar sesión y acceder únicamente a las funcionalidades autorizadas.
2. Se pueden registrar y consultar productos, categorías, clientes y proveedores.
3. Se puede registrar una venta con varios productos y calcular su total correctamente.
4. El sistema impide confirmar una venta cuando no existe inventario suficiente.
5. Las ventas confirmadas actualizan el inventario y generan los movimientos correspondientes.
6. Las compras confirmadas incrementan las existencias.
7. La anulación de una venta devuelve las cantidades al inventario sin duplicar movimientos ni eliminar el historial.
8. Los errores en operaciones transaccionales no dejan cambios parciales en los datos.
9. Se pueden consultar el historial de ventas y los movimientos de inventario.
10. El equipo puede demostrar los flujos principales durante la presentación final.
11. Cada venta se registra como pagada, con un único pago igual al total de la venta.

## 13. Riesgos y estrategias de mitigación

| Riesgo | Estrategia |
|---|---|
| Poca experiencia previa del equipo | Dividir las tareas en partes pequeñas, documentar las decisiones y compartir conocimientos. |
| Retrasos en el desarrollo | Priorizar las funcionalidades esenciales y revisar el avance diariamente. |
| Problemas de integración | Definir desde el inicio la estructura de la API y las responsabilidades de cada módulo. |
| Errores en las operaciones de inventario | Utilizar transacciones, restricciones y pruebas de casos límite. |
| Conflictos al combinar código | Trabajar con ramas de Git, commits pequeños y revisión de cambios. |
| Tiempo insuficiente para terminar todos los módulos | Mantener las funcionalidades avanzadas fuera del alcance inicial y priorizar los flujos esenciales. |

## 14. Herramientas de apoyo

Además de las tecnologías de desarrollo, se podrán utilizar:

- **Visual Studio Code:** edición del código.
- **pgAdmin:** administración gráfica de PostgreSQL.
- **Postman:** pruebas de los endpoints de la API.
- **Trello:** organización y seguimiento de tareas.
- **Markdown:** documentación del proyecto.
- **Diagramas de arquitectura y entidad-relación:** apoyo para comprender el diseño del sistema.

## 15. Entregables finales

Al terminar las cuatro semanas, se espera entregar:

- Código fuente del frontend y backend.
- Scripts SQL de creación y configuración de la base de datos.
- Aplicación integrada con sus módulos principales.
- Repositorio Git con el historial de cambios.
- Documentación técnica básica.
- Evidencias de pruebas funcionales.
- Guía breve de uso.
- Presentación y demostración del sistema.

## 16. Conclusión

FluxPOS busca ofrecer una solución web organizada para gestionar las operaciones esenciales de un punto de venta, integrando la administración de productos, ventas, compras e inventario.

El uso de tecnologías como Vue 3, Node.js, Express y PostgreSQL permitirá construir una aplicación modular y mantenible. La metodología Scrum facilitará la distribución del trabajo, el seguimiento del avance y la entrega progresiva de funcionalidades.

Con una planificación realista, comunicación constante y priorización de los requisitos esenciales, se espera desarrollar en cuatro semanas una primera versión funcional que pueda demostrarse y evaluarse académicamente.

---

**Nombre del proyecto:** FluxPOS  
**Duración:** 4 semanas  
**Metodología:** Scrum  
**Equipo:** 6 integrantes  
**Resultado esperado:** primera versión funcional de un sistema web de punto de venta.
