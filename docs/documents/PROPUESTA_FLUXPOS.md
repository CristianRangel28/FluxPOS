# PROPUESTA DE DESARROLLO DE SOFTWARE
# FluxPOS
### Sistema de punto de venta y gestión de inventario

**Versión:** 1.0  
**Estado:** Propuesta inicial  
**Metodología:** Scrum  
**Duración estimada:** 4 semanas  
**Equipo de desarrollo:** 5 desarrolladores

---

# 1. Introducción

En los establecimientos comerciales, la administración de ventas, productos, compras e inventario representa una actividad fundamental para garantizar el correcto funcionamiento del negocio. Cuando estos procesos se realizan mediante registros manuales o herramientas poco integradas, pueden presentarse dificultades para controlar las existencias, consultar el historial de operaciones, mantener organizada la información y realizar un seguimiento adecuado de las transacciones.

Como respuesta a esta necesidad, se propone el desarrollo de **FluxPOS**, un sistema de punto de venta (POS, *Point of Sale*) orientado a centralizar y facilitar las operaciones comerciales de una tienda.

La aplicación permitirá administrar productos, categorías, clientes, proveedores, ventas, pagos, compras e inventario desde una plataforma web. Además, incorporará mecanismos de control de acceso, validaciones de información y un registro histórico de los movimientos de inventario para mantener la trazabilidad de las operaciones.

El desarrollo se llevará a cabo mediante la metodología ágil Scrum, utilizando tecnologías web modernas y una base de datos relacional que permita mantener la consistencia y organización de la información.

# 2. Planteamiento del problema

La administración de una tienda requiere mantener un control constante sobre los productos disponibles, las ventas realizadas, las compras efectuadas y los movimientos del inventario.

Cuando estos procesos no se encuentran centralizados, pueden surgir problemas como:

- Dificultad para conocer las existencias reales de los productos.
- Errores al registrar ventas, compras o ajustes de inventario.
- Falta de organización en la información de clientes y proveedores.
- Dificultad para consultar transacciones anteriores.
- Ausencia de trazabilidad sobre los cambios realizados en el inventario.
- Riesgo de inconsistencias entre las ventas registradas y las existencias disponibles.
- Falta de control sobre las operaciones que puede realizar cada usuario.

Por esta razón, se identifica la necesidad de desarrollar una solución que integre estos procesos en un único sistema, facilite la administración diaria y permita mantener un registro organizado y confiable de las operaciones comerciales.

# 3. Justificación

El desarrollo de FluxPOS permitirá implementar una herramienta tecnológica que facilite la gestión de las actividades comerciales de una tienda, centralizando la información y automatizando procesos relacionados con las ventas, compras e inventario.

La implementación de este sistema aportará beneficios como:

- **Centralización de la información:** los datos comerciales estarán almacenados en una única base de datos.
- **Control de inventario:** las existencias se actualizarán de acuerdo con las operaciones realizadas.
- **Trazabilidad:** los movimientos de inventario quedarán registrados para facilitar su consulta y seguimiento.
- **Organización administrativa:** los productos, clientes y proveedores podrán gestionarse desde módulos específicos.
- **Integridad de la información:** se implementarán restricciones y validaciones para evitar operaciones inconsistentes.
- **Control de acceso:** los usuarios tendrán permisos según el rol asignado.
- **Mantenimiento y escalabilidad:** la separación entre frontend, backend y base de datos facilitará futuras modificaciones.

Además, el proyecto permitirá aplicar conocimientos relacionados con desarrollo web, diseño de bases de datos, programación backend, integración de sistemas, control de versiones y metodologías ágiles.

# 4. Objetivos

## 4.1. Objetivo general

Desarrollar un sistema de punto de venta que permita administrar de manera centralizada las operaciones comerciales y el inventario de una tienda, garantizando la integridad de la información y facilitando el registro, consulta y seguimiento de las transacciones.

## 4.2. Objetivos específicos

1. Diseñar e implementar una base de datos relacional normalizada para almacenar la información del sistema.
2. Desarrollar una interfaz web que permita a los usuarios interactuar con las funcionalidades de FluxPOS.
3. Implementar una API REST para gestionar la comunicación entre el frontend y la base de datos.
4. Desarrollar módulos para la administración de productos, categorías, clientes y proveedores.
5. Implementar el registro de ventas, pagos y compras.
6. Automatizar la actualización de existencias mediante las operaciones comerciales.
7. Implementar un registro histórico de movimientos de inventario.
8. Incorporar autenticación y control de acceso basado en roles.
9. Aplicar validaciones y mecanismos de integridad para mantener la consistencia de los datos.
10. Realizar pruebas de integración y funcionamiento para verificar la calidad del sistema.

# 5. Alcance del proyecto

FluxPOS estará orientado a la gestión de las operaciones habituales de una única tienda.

## 5.1. Funcionalidades incluidas

### A. Autenticación y usuarios

- Inicio de sesión.
- Cierre de sesión.
- Validación de credenciales.
- Control de acceso según el rol del usuario.
- Administración de usuarios del sistema.

Se contemplarán inicialmente dos roles:

- **Administrador:** tendrá acceso a las funcionalidades administrativas del sistema.
- **Vendedor:** tendrá acceso a las operaciones de venta y a las consultas autorizadas.

Los permisos específicos de cada rol se establecerán durante la implementación.

### B. Gestión de productos y categorías

- Registrar productos.
- Consultar productos.
- Actualizar información de productos.
- Asociar productos con categorías.
- Registrar y consultar categorías.
- Mantener información organizada sobre los artículos disponibles.

### C. Gestión de inventario

- Consultar existencias actuales.
- Realizar ajustes de inventario autorizados.
- Actualizar existencias al registrar compras.
- Descontar existencias al registrar ventas.
- Recuperar existencias cuando se anule una venta.
- Consultar el historial de movimientos de inventario.
- Evitar que las existencias sean negativas.

### D. Gestión de clientes

- Registrar clientes.
- Consultar clientes.
- Asociar clientes con las ventas realizadas.

Se contará con un cliente general predeterminado para las operaciones en las que no sea necesario registrar un cliente específico.

Los clientes no requerirán credenciales ni acceso al sistema.

### E. Gestión de proveedores

- Registrar proveedores.
- Consultar proveedores.
- Actualizar información de proveedores.
- Asociar proveedores con las compras realizadas.

### F. Gestión de ventas

- Registrar ventas.
- Agregar productos y cantidades a una venta.
- Calcular subtotales y totales.
- Asociar clientes con las ventas.
- Registrar los pagos correspondientes.
- Consultar el historial de ventas.
- Consultar los detalles de una venta.
- Anular ventas bajo las condiciones establecidas.

### G. Gestión de pagos

- Registrar pagos asociados a las ventas.
- Almacenar información sobre el valor y método de pago.
- Consultar los pagos registrados.

### H. Gestión de compras

- Registrar compras realizadas a proveedores.
- Agregar productos y cantidades a una compra.
- Registrar precios y totales.
- Actualizar las existencias de los productos comprados.
- Consultar el historial de compras.

### I. Auditoría y trazabilidad

- Registrar los movimientos de inventario.
- Identificar el producto afectado.
- Registrar el usuario responsable de la operación.
- Almacenar el tipo de movimiento realizado.
- Conservar la cantidad anterior y la cantidad resultante.
- Registrar la fecha y hora de cada movimiento.

## 5.2. Funcionalidades fuera del alcance inicial

Para mantener un alcance adecuado al tiempo disponible, no se contemplan inicialmente:

- Gestión de múltiples sucursales.
- Integración con plataformas externas de comercio electrónico.
- Aplicaciones móviles nativas.
- Integración con terminales bancarias o pasarelas de pago.
- Facturación electrónica.
- Gestión de nómina.
- Contabilidad financiera avanzada.
- Programas de fidelización y puntos.
- Reportes financieros avanzados o análisis predictivo.

Estas funcionalidades podrán evaluarse como posibles mejoras futuras.

# 6. Requerimientos funcionales

| Código | Requerimiento |
|---|---|
| RF-01 | El sistema debe permitir iniciar sesión mediante credenciales válidas. |
| RF-02 | El sistema debe controlar el acceso a las funcionalidades según el rol del usuario. |
| RF-03 | El sistema debe permitir cerrar sesión. |
| RF-04 | El sistema debe permitir registrar productos. |
| RF-05 | El sistema debe permitir consultar productos. |
| RF-06 | El sistema debe permitir actualizar productos. |
| RF-07 | El sistema debe permitir registrar categorías. |
| RF-08 | El sistema debe permitir consultar y actualizar categorías. |
| RF-09 | El sistema debe permitir consultar las existencias de los productos. |
| RF-10 | El sistema debe permitir realizar ajustes autorizados de inventario. |
| RF-11 | El sistema debe permitir consultar los movimientos de inventario. |
| RF-12 | El sistema debe permitir registrar y consultar clientes. |
| RF-13 | El sistema debe permitir registrar y consultar proveedores. |
| RF-14 | El sistema debe permitir registrar ventas y sus respectivos detalles. |
| RF-15 | El sistema debe permitir registrar pagos asociados a las ventas. |
| RF-16 | El sistema debe permitir consultar el historial de ventas. |
| RF-17 | El sistema debe permitir anular ventas, conservando su historial. |
| RF-18 | El sistema debe permitir registrar compras y sus respectivos detalles. |
| RF-19 | El sistema debe permitir consultar el historial de compras. |
| RF-20 | El sistema debe permitir consultar el detalle de una venta. |
| RF-21 | El sistema debe actualizar las existencias según las operaciones realizadas. |
| RF-22 | El sistema debe impedir operaciones que produzcan existencias negativas. |
| RF-23 | El sistema debe mantener la integridad de las operaciones comerciales mediante transacciones y validaciones. |
| RF-24 | El sistema debe actualizar automáticamente el campo `updated_at` cuando corresponda. |
| RF-25 | El sistema debe mostrar mensajes claros de confirmación y error. |

# 7. Requerimientos no funcionales

| Código | Requerimiento |
|---|---|
| RNF-01 | El sistema debe contar con una interfaz clara, organizada y fácil de utilizar. |
| RNF-02 | La aplicación debe utilizar una arquitectura cliente-servidor. |
| RNF-03 | La comunicación entre frontend y backend debe realizarse mediante una API REST. |
| RNF-04 | La información debe almacenarse en una base de datos relacional PostgreSQL. |
| RNF-05 | El sistema debe validar los datos recibidos antes de procesar las operaciones. |
| RNF-06 | Las operaciones críticas deben mantener la consistencia de la información mediante transacciones. |
| RNF-07 | Las credenciales y configuraciones sensibles no deben almacenarse directamente en el repositorio. |
| RNF-08 | Las contraseñas de los usuarios deben almacenarse utilizando mecanismos seguros de hash. |
| RNF-09 | El código debe organizarse en módulos que faciliten su mantenimiento. |
| RNF-10 | El proyecto debe utilizar Git y GitHub para el control de versiones y la colaboración. |
| RNF-11 | El sistema debe conservar un registro histórico de los movimientos de inventario. |
| RNF-12 | La aplicación debe proporcionar mensajes comprensibles cuando ocurra un error. |

# 8. Arquitectura del sistema

FluxPOS utilizará una arquitectura cliente-servidor dividida en tres componentes principales.

## 8.1. Frontend

Será la interfaz gráfica mediante la cual los usuarios interactuarán con el sistema.

Tecnologías:

- Vue 3.
- Vue Router.
- Axios.

Responsabilidades:

- Mostrar las interfaces de cada módulo.
- Gestionar la navegación.
- Capturar y validar información básica de formularios.
- Enviar solicitudes HTTP al backend.
- Mostrar respuestas, mensajes y errores.

## 8.2. Backend

Será responsable de procesar las solicitudes y ejecutar las reglas de negocio.

Tecnologías:

- Node.js.
- Express.js.
- pg (node-postgres).

Responsabilidades:

- Exponer endpoints mediante una API REST.
- Validar las solicitudes recibidas.
- Gestionar la autenticación y autorización.
- Ejecutar operaciones sobre PostgreSQL.
- Aplicar reglas de negocio.
- Controlar las transacciones de ventas, compras y movimientos de inventario.
- Gestionar los errores y las respuestas de la API.

## 8.3. Base de datos

Se utilizará PostgreSQL como sistema de gestión de bases de datos relacional.

Responsabilidades:

- Almacenar la información del sistema.
- Mantener relaciones entre las entidades.
- Aplicar restricciones de integridad.
- Evitar inconsistencias en las operaciones.
- Registrar movimientos de inventario.
- Automatizar determinadas operaciones mediante funciones y triggers.

## 8.4. Flujo general de comunicación

1. El usuario realiza una acción desde la interfaz.
2. El frontend envía una solicitud HTTP al backend mediante Axios.
3. Express recibe la solicitud y ejecuta las validaciones correspondientes.
4. El backend realiza las operaciones necesarias en PostgreSQL mediante `pg`.
5. La base de datos devuelve el resultado.
6. El backend responde al frontend mediante JSON.
7. El frontend presenta el resultado al usuario.

# 9. Diseño de la base de datos

La base de datos de FluxPOS se diseñará bajo un modelo relacional normalizado, buscando reducir la duplicidad de información y garantizar la integridad de los datos.

Se contempla inicialmente un modelo compuesto por **13 tablas**.

## 9.1. Tablas principales

| Tabla | Descripción |
|---|---|
| `roles` | Almacena los roles disponibles en el sistema. |
| `users` | Almacena las cuentas de usuario y su rol asociado. |
| `categories` | Almacena las categorías de productos. |
| `products` | Almacena la información de los productos. |
| `inventory` | Almacena las existencias actuales de los productos. |
| `customers` | Almacena la información de los clientes. |
| `suppliers` | Almacena la información de los proveedores. |
| `sales` | Almacena las ventas realizadas. |
| `sale_details` | Almacena los productos y cantidades correspondientes a cada venta. |
| `payments` | Almacena los pagos asociados a las ventas. |
| `purchases` | Almacena las compras realizadas a proveedores. |
| `purchase_details` | Almacena los productos y cantidades correspondientes a cada compra. |
| `inventory_movements` | Almacena el historial de movimientos de inventario. |

## 9.2. Normalización y organización

Se utilizarán tablas independientes para entidades que requieren administración propia, como roles y categorías.

Las relaciones entre tablas permitirán evitar la repetición innecesaria de información y facilitarán el mantenimiento de los datos.

La tabla `inventory` mantendrá las existencias actuales, mientras que `inventory_movements` conservará el historial de cambios realizados.

## 9.3. Auditoría de inventario

La tabla `inventory_movements` funcionará como registro histórico y de auditoría de las operaciones que afecten las existencias.

Cada movimiento deberá registrar, como mínimo:

- Producto afectado.
- Usuario responsable.
- Tipo de movimiento.
- Cantidad modificada.
- Cantidad anterior.
- Cantidad nueva.
- Fecha y hora.

Se contemplan inicialmente los siguientes tipos de movimiento:

| Tipo | Descripción |
|---|---|
| `sale` | Disminución de existencias por una venta. |
| `purchase` | Aumento de existencias por una compra. |
| `adjustment` | Ajuste manual autorizado. |
| `sale_reversal` | Devolución de existencias por anulación de una venta. |

Se utilizarán funciones y triggers de PostgreSQL para automatizar el registro de movimientos y determinadas actualizaciones de inventario.

El backend deberá identificar al usuario responsable de cada operación y proporcionar esa información al mecanismo de auditoría. No se deberá confiar en un identificador de usuario enviado libremente por el frontend.

## 9.4. Integridad de las operaciones

Las operaciones de ventas, compras y ajustes de inventario deberán ejecutarse de manera consistente.

Se utilizarán transacciones para asegurar que una operación se complete correctamente o se revierta en caso de error.

Reglas principales:

- Las existencias no podrán ser negativas.
- Una venta deberá descontar las cantidades correspondientes del inventario.
- Una compra deberá aumentar las existencias.
- Una anulación de venta deberá recuperar las existencias correspondientes.
- Los movimientos deberán conservar la información histórica.
- Los registros históricos de ventas y compras no deberán eliminarse para corregir una operación.
- Los campos de actualización, como `updated_at`, deberán mantenerse automáticamente cuando corresponda.

## 9.5. Anulación de ventas

La anulación de una venta no implicará eliminar físicamente su registro.

La operación deberá:

1. Cambiar el estado de la venta a `cancelled`.
2. Registrar la fecha de anulación.
3. Registrar el usuario responsable.
4. Recuperar las existencias de los productos vendidos.
5. Registrar los movimientos correspondientes con tipo `sale_reversal`.
6. Conservar los detalles y pagos originales como historial de la operación.

Este mecanismo permitirá mantener la trazabilidad y evitar la pérdida de información.

# 10. Tecnologías y herramientas

| Tecnología | Uso dentro del proyecto |
|---|---|
| Vue 3 | Desarrollo de la interfaz web. |
| Vue Router | Navegación entre las vistas. |
| Axios | Comunicación HTTP con el backend. |
| Node.js | Entorno de ejecución del backend. |
| Express.js | Desarrollo de la API REST. |
| PostgreSQL | Sistema de gestión de bases de datos. |
| pg | Conexión y ejecución de consultas SQL desde Node.js. |
| SQL | Definición y manipulación de la base de datos. |
| Git | Control de versiones. |
| GitHub | Repositorio y colaboración. |
| Trello | Organización de tareas y seguimiento del trabajo. |

Se utilizará SQL escrito manualmente para las consultas y operaciones de base de datos. En la etapa inicial no se utilizará un ORM ni TypeScript, con el propósito de mantener una estructura sencilla y facilitar la comprensión del funcionamiento de las consultas.

# 11. Estructura del repositorio

El repositorio del proyecto tendrá una organización inicial como la siguiente:

```text
FluxPOS/
│
├── frontend/
│   └── .gitkeep
│
├── backend/
│   └── .gitkeep
│
├── database/
│   └── .gitkeep
│
├── docs/
│   ├── README_tecnologias.md
│   ├── PROPUESTA_FLUXPOS.md
│   └── historias_usuario.md
│
├── .gitignore
└── README.md
```

Durante el desarrollo se incorporarán las estructuras internas de cada componente.

La carpeta `frontend` contendrá la aplicación Vue, `backend` contendrá la API REST y `database` almacenará los scripts SQL necesarios para crear y configurar la base de datos.

# 12. Metodología de desarrollo

El proyecto se desarrollará utilizando la metodología ágil **Scrum**, que permitirá organizar el trabajo en periodos cortos, establecer objetivos por sprint y revisar continuamente los avances.

## 12.1. Organización del equipo

El equipo estará conformado por siete integrantes:

| Rol | Responsabilidad |
|---|---|
| Product Owner | Definir prioridades, gestionar el Product Backlog y validar que el producto cumpla los objetivos. |
| Scrum Master | Facilitar el proceso Scrum, acompañar al equipo y ayudar a eliminar impedimentos. |
| Desarrollador 1 | Desarrollo de funcionalidades asignadas. |
| Desarrollador 2 | Desarrollo de funcionalidades asignadas. |
| Desarrollador 3 | Desarrollo de funcionalidades asignadas. |
| Desarrollador 4 | Desarrollo de funcionalidades asignadas. |
| Desarrollador 5 | Desarrollo de funcionalidades asignadas. |

Los desarrolladores serán:

- monterrey
- cristian
- breyler
- deiner
- alex

El Product Owner y el Scrum Master no tendrán tarjetas de programación asignadas. Sus responsabilidades estarán enfocadas en la gestión, planificación, coordinación y seguimiento del proyecto.

## 12.2. Duración de los sprints

El proyecto tendrá una duración estimada de cuatro semanas, distribuidas en cuatro sprints de una semana cada uno.

Se establece un máximo de **20 tareas por sprint**, buscando mantener una carga de trabajo manejable y facilitar el seguimiento.

## 12.3. Planificación general

| Sprint | Objetivo principal | Resultado esperado |
|---|---|---|
| Sprint 1 | Preparación de la infraestructura e integración inicial. | Frontend, backend y PostgreSQL configurados y comunicándose correctamente. |
| Sprint 2 | Autenticación y módulos administrativos básicos. | Gestión de usuarios, productos, categorías, clientes y proveedores. |
| Sprint 3 | Operaciones comerciales e inventario. | Registro de ventas, pagos, compras y actualización de existencias. |
| Sprint 4 | Auditoría, consultas, integración y estabilización. | Sistema integrado, pruebas funcionales y corrección de errores. |

### Sprint 1: Infraestructura e integración

Objetivo: preparar el entorno de desarrollo y establecer la comunicación entre los componentes del sistema.

Actividades principales:

- Inicialización del backend con Node.js y Express.
- Inicialización del frontend con Vue 3.
- Configuración de Vue Router.
- Configuración de Axios.
- Preparación de la conexión con PostgreSQL mediante `pg`.
- Creación de la estructura inicial de la base de datos.
- Organización de las rutas de la API.
- Configuración de variables de entorno.
- Verificación de la comunicación frontend-backend.
- Documentación de la ejecución local.

**Resultado esperado:** una estructura funcional donde el frontend pueda comunicarse con el backend y este pueda conectarse a PostgreSQL.

### Sprint 2: Autenticación y administración

Objetivo: implementar los módulos básicos necesarios para administrar la información del sistema.

Actividades principales:

- Implementación del inicio y cierre de sesión.
- Gestión de roles y usuarios.
- Control de acceso según los permisos.
- Registro y consulta de productos.
- Actualización de productos.
- Registro y consulta de categorías.
- Consulta de existencias.
- Registro y consulta de clientes.
- Registro y consulta de proveedores.

**Resultado esperado:** una aplicación con autenticación y funcionalidades administrativas básicas.

### Sprint 3: Operaciones comerciales

Objetivo: implementar los procesos principales de ventas, compras y actualización de inventario.

Actividades principales:

- Registro de ventas.
- Gestión de detalles de venta.
- Registro de pagos.
- Consulta del historial de ventas.
- Consulta de detalles de ventas.
- Registro de compras.
- Gestión de detalles de compra.
- Consulta del historial de compras.
- Actualización de existencias mediante ventas y compras.
- Validaciones para evitar existencias negativas.

**Resultado esperado:** un sistema capaz de registrar las operaciones comerciales y actualizar el inventario de forma consistente.

### Sprint 4: Auditoría, integración y estabilización

Objetivo: completar las funcionalidades pendientes, verificar el funcionamiento general y corregir los errores detectados.

Actividades principales:

- Implementación de movimientos de inventario.
- Automatización de auditoría mediante funciones y triggers.
- Implementación de ajustes de inventario.
- Anulación de ventas y recuperación de existencias.
- Consulta del historial de movimientos.
- Verificación de permisos y validaciones.
- Pruebas de integración.
- Corrección de errores.
- Verificación de los criterios de aceptación.
- Preparación de la documentación y demostración final.

**Distribución recomendada del tiempo:**

- Días 1 y 2: completar funcionalidades e integración.
- Días 3 y 4: pruebas, detección y corrección de errores.
- Día 5: validación final, documentación y demostración.

Se procurará no utilizar todo el tiempo disponible en nuevas funcionalidades, reservando una parte importante del último sprint para estabilizar el sistema.

# 13. Gestión del Product Backlog

El Product Backlog estará compuesto por las historias de usuario definidas para FluxPOS.

Cada historia deberá incluir:

- Identificador.
- Nombre.
- Descripción.
- Prioridad.
- Criterios de aceptación.
- Dependencias, cuando corresponda.

Las historias se organizarán según su importancia para el funcionamiento del sistema.

Las tareas técnicas se crearán en Trello a partir de las historias de usuario, indicando el responsable, descripción, criterios de aceptación y estimación.

La planificación de cada sprint deberá respetar el límite de 20 tareas y considerar las dependencias entre funcionalidades.

# 14. Control de versiones y colaboración

El proyecto utilizará Git y GitHub para gestionar el código fuente y facilitar el trabajo colaborativo.

Se utilizará el siguiente esquema de ramas:

| Rama | Propósito |
|---|---|
| `main` | Contendrá las versiones estables del proyecto. |
| `develop` | Rama principal de integración del equipo. |
| `feature/*` | Ramas para desarrollar funcionalidades o tareas específicas. |
| `fix/*` | Ramas para corregir errores identificados. |

## 14.1. Flujo de trabajo

1. Cada desarrollador actualizará su repositorio local con los cambios de `develop`.
2. Creará una rama específica para la tarea asignada.
3. Realizará los cambios correspondientes.
4. Registrará los avances mediante commits descriptivos.
5. Publicará la rama en GitHub.
6. Creará un Pull Request hacia `develop`.
7. Los cambios serán revisados antes de integrarse.
8. Al finalizar un sprint, se verificará la estabilidad de la versión integrada.
9. Las versiones que superen las verificaciones podrán incorporarse a `main`.

No se realizarán desarrollos directamente sobre `main`. Se recomienda tampoco realizar cambios directamente sobre `develop`, utilizando Pull Requests para integrar el trabajo.

Cada Pull Request deberá relacionarse con la tarjeta correspondiente de Trello.

# 15. Criterios generales de aceptación

El proyecto se considerará satisfactorio cuando cumpla las siguientes condiciones:

- Los usuarios puedan iniciar sesión y acceder según su rol.
- Los productos y categorías puedan administrarse correctamente.
- Los clientes y proveedores puedan registrarse y consultarse.
- Las ventas puedan registrarse con sus respectivos detalles y pagos.
- Las compras puedan registrarse y reflejarse en el inventario.
- Las existencias se actualicen correctamente.
- El sistema impida existencias negativas.
- Las ventas puedan anularse sin eliminar su historial.
- Los movimientos de inventario queden registrados.
- Las operaciones críticas mantengan la integridad de los datos.
- El frontend y backend se comuniquen correctamente.
- La aplicación pueda conectarse a PostgreSQL.
- Los módulos principales hayan superado las pruebas funcionales acordadas.

# 16. Definition of Ready (DoR)

Una historia de usuario o tarea estará lista para desarrollarse cuando:

- Tenga una descripción clara.
- Cuente con criterios de aceptación definidos.
- Tenga prioridad establecida.
- Sus dependencias estén identificadas.
- El equipo comprenda el resultado esperado.
- Pueda ser abordada dentro del sprint correspondiente.

# 17. Definition of Done (DoD)

Una tarea se considerará terminada cuando:

- Cumpla con su descripción y criterios de aceptación.
- El código esté implementado y organizado.
- Se hayan realizado las pruebas correspondientes.
- No introduzca errores conocidos que impidan su funcionamiento.
- Los cambios estén publicados en una rama de funcionalidad.
- El Pull Request haya sido revisado y aprobado.
- Los cambios estén integrados correctamente en `develop`.
- La documentación se haya actualizado cuando corresponda.

# 18. Riesgos del proyecto

| Riesgo | Consecuencia | Medida preventiva |
|---|---|---|
| Retrasos en el desarrollo | Incumplimiento de los objetivos del sprint. | Priorizar funcionalidades y realizar seguimiento frecuente. |
| Conflictos al integrar código | Errores o pérdida de cambios. | Utilizar ramas independientes y Pull Requests. |
| Errores en la lógica de inventario | Existencias incorrectas. | Implementar transacciones, restricciones y pruebas. |
| Problemas de comunicación entre módulos | Funcionalidades incompletas. | Definir endpoints y contratos de API con anticipación. |
| Cambios en el alcance | Aumento del trabajo planificado. | Gestionar las nuevas solicitudes mediante el Product Backlog. |
| Falta de tiempo para pruebas | Entrega con errores. | Reservar tiempo de estabilización en el Sprint 4. |
| Problemas de configuración local | Dificultad para ejecutar el proyecto. | Documentar variables de entorno y procedimientos de instalación. |

# 19. Entregables

Al finalizar el proyecto se espera contar con los siguientes entregables:

1. Propuesta formal del proyecto.
2. Documento de historias de usuario y criterios de aceptación.
3. Modelo entidad-relación de la base de datos.
4. Scripts SQL para la creación y configuración de PostgreSQL.
5. Código fuente del frontend.
6. Código fuente del backend.
7. API REST funcional.
8. Base de datos implementada.
9. Sistema integrado de punto de venta e inventario.
10. Evidencias de pruebas funcionales e integración.
11. Documentación técnica y guía básica de ejecución.
12. Repositorio GitHub con el historial de desarrollo.

# 20. Conclusión

FluxPOS representa una propuesta de solución tecnológica para centralizar y facilitar la gestión de las operaciones comerciales de una tienda.

Mediante la integración de una interfaz web, una API REST y una base de datos relacional, el sistema permitirá administrar productos, clientes, proveedores, ventas, pagos, compras e inventario de manera organizada.

El uso de PostgreSQL, junto con mecanismos de integridad, transacciones y auditoría, permitirá mantener un registro confiable de las operaciones y facilitar el seguimiento de los movimientos de inventario.

Finalmente, la aplicación de Scrum y el uso de GitHub permitirán organizar el trabajo del equipo, desarrollar las funcionalidades de manera incremental y mantener un proceso de integración y validación durante las cuatro semanas de desarrollo.

**FluxPOS busca simplificar la gestión del punto de venta y proporcionar una base organizada y confiable para las operaciones diarias de una tienda.**