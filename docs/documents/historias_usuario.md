# FluxPOS — Historias de usuario y Product Backlog

**Proyecto:** FluxPOS  
**Documento:** Historias de usuario, Product Backlog y criterios de aceptación  
**Versión:** 1.0  
**Metodología:** Scrum  
**Duración del proyecto:** 4 sprints de 1 semana  
**Roles del sistema:** Administrador (`admin`) y Vendedor (`seller`)

---

# 1. Introducción

Este documento reúne las historias de usuario y los criterios de aceptación que servirán como base para planificar y desarrollar FluxPOS.

Las historias de usuario describen las funcionalidades desde la perspectiva de quienes utilizarán el sistema. Los criterios de aceptación establecen las condiciones mínimas que deben cumplirse para considerar que cada funcionalidad satisface su propósito.

El Product Backlog organiza estas funcionalidades según su prioridad para facilitar la planificación de los cuatro sprints.

Este documento podrá actualizarse durante el desarrollo cuando el equipo identifique nuevas necesidades, dependencias o ajustes en el alcance.

# 2. Convenciones

## 2.1. Estructura de las historias

Las historias de usuario seguirán el formato:

> Como [tipo de usuario], quiero [funcionalidad], para [beneficio esperado].

Cada historia incluirá:

- **ID:** identificador único.
- **Nombre:** descripción breve de la funcionalidad.
- **Historia:** necesidad expresada desde la perspectiva del usuario.
- **Prioridad:** importancia relativa para el producto.
- **Criterios de aceptación:** condiciones que deben cumplirse para validar la funcionalidad.

## 2.2. Roles

| Rol | Descripción |
|---|---|
| Administrador (`admin`) | Gestiona la información principal de la tienda y tiene acceso a las operaciones administrativas autorizadas. |
| Vendedor (`seller`) | Realiza ventas y consulta la información necesaria para atender a los clientes, según los permisos definidos. |

Los permisos definitivos deberán implementarse en el backend. Ocultar botones en la interfaz no es suficiente para proteger una operación.

## 2.3. Prioridades

| Prioridad | Significado |
|---|---|
| Alta | Funcionalidad esencial para el funcionamiento inicial del sistema. |
| Media | Funcionalidad importante que complementa las operaciones principales. |
| Baja | Funcionalidad complementaria que puede aplazarse si el tiempo es insuficiente. |

Las prioridades son una propuesta inicial y podrán ajustarse con el Product Owner.

---

# 3. Historias de usuario

## Módulo A. Autenticación y acceso

### HU-01 — Iniciar sesión

**Historia de usuario**

Como usuario registrado, quiero iniciar sesión con mis credenciales para acceder a las funcionalidades autorizadas del sistema.

**Prioridad:** Alta.

**Criterios de aceptación**

1. El sistema debe solicitar las credenciales necesarias para iniciar sesión.
2. Si las credenciales son correctas, el usuario debe poder acceder al sistema.
3. Si las credenciales son incorrectas, el sistema debe mostrar un mensaje comprensible.
4. El sistema no debe revelar contraseñas ni información sensible en los mensajes de error.
5. Las contraseñas deben almacenarse mediante un mecanismo seguro de hash, nunca en texto plano.

### HU-02 — Controlar el acceso según el rol

**Historia de usuario**

Como administrador, quiero que cada usuario tenga permisos según su rol para proteger las operaciones administrativas de la tienda.

**Prioridad:** Alta.

**Criterios de aceptación**

1. El sistema debe reconocer los roles `admin` y `seller`.
2. El administrador debe poder acceder a las funcionalidades administrativas autorizadas.
3. El vendedor debe poder acceder a las funcionalidades necesarias para realizar sus tareas.
4. El backend debe rechazar las operaciones para las que el usuario no tenga permisos.
5. Los intentos de acceso no autorizado deben producir una respuesta controlada.

### HU-03 — Cerrar sesión

**Historia de usuario**

Como usuario autenticado, quiero cerrar sesión para evitar que otras personas utilicen mi acceso cuando termine de trabajar.

**Prioridad:** Alta.

**Criterios de aceptación**

1. La interfaz debe ofrecer una opción para cerrar sesión.
2. Al cerrar sesión, las credenciales o el estado de autenticación local deben invalidarse según el mecanismo utilizado.
3. El usuario debe regresar a la pantalla de inicio de sesión.
4. No debe ser posible acceder a funcionalidades protegidas utilizando una sesión que ya no sea válida.

---

## Módulo B. Productos y categorías

### HU-04 — Registrar productos

**Historia de usuario**

Como administrador, quiero registrar productos con su información y precios para mantener actualizado el catálogo de la tienda.

**Prioridad:** Alta.

**Criterios de aceptación**

1. El sistema debe permitir ingresar el nombre, la categoría, el precio de costo y el precio de venta del producto.
2. El sistema debe validar los campos obligatorios.
3. Los precios deben ser valores válidos y no negativos.
4. El producto debe quedar asociado a una categoría existente cuando se seleccione una.
5. Si el registro es exitoso, el producto debe aparecer en el catálogo.
6. Si los datos no son válidos, el sistema debe informar el error sin guardar un registro incorrecto.

### HU-05 — Consultar productos

**Historia de usuario**

Como administrador o vendedor autorizado, quiero consultar los productos registrados para conocer sus precios y características.

**Prioridad:** Alta.

**Criterios de aceptación**

1. El sistema debe mostrar una lista de productos registrados.
2. Cada producto debe mostrar al menos su nombre, categoría y precio de venta.
3. El sistema debe informar cuando no existan productos registrados.
4. Los datos mostrados deben corresponder a la información almacenada en la base de datos.

### HU-06 — Actualizar productos

**Historia de usuario**

Como administrador, quiero modificar la información de un producto para mantener actualizados sus datos y precios.

**Prioridad:** Alta.

**Criterios de aceptación**

1. El sistema debe permitir seleccionar un producto existente.
2. El administrador debe poder modificar sus campos autorizados.
3. El sistema debe validar los nuevos valores antes de guardarlos.
4. Si la actualización es exitosa, los cambios deben reflejarse en las consultas posteriores.
5. La actualización no debe modificar indebidamente el historial de ventas anteriores.

### HU-07 — Registrar categorías

**Historia de usuario**

Como administrador, quiero registrar categorías para organizar los productos de la tienda.

**Prioridad:** Media.

**Criterios de aceptación**

1. El sistema debe permitir registrar el nombre y la descripción de una categoría.
2. El nombre de la categoría debe ser obligatorio.
3. El sistema debe validar que el registro cumpla las reglas definidas para los nombres.
4. Una categoría registrada debe estar disponible para asociarla con productos.
5. El sistema debe mostrar un mensaje cuando no pueda completar el registro.

### HU-08 — Consultar y actualizar categorías

**Historia de usuario**

Como administrador, quiero consultar y actualizar las categorías para mantener organizado el catálogo de productos.

**Prioridad:** Media.

**Criterios de aceptación**

1. El sistema debe mostrar las categorías registradas.
2. El administrador debe poder modificar el nombre y la descripción de una categoría existente.
3. Los cambios deben reflejarse en las consultas posteriores.
4. Si una categoría está asociada a productos, su actualización no debe eliminar ni alterar esos productos.
5. El sistema debe impedir operaciones que comprometan la integridad de los datos.

---

## Módulo C. Inventario

### HU-09 — Consultar existencias

**Historia de usuario**

Como administrador o vendedor autorizado, quiero consultar las existencias de los productos para conocer su disponibilidad antes de realizar una operación.

**Prioridad:** Alta.

**Criterios de aceptación**

1. El sistema debe mostrar la cantidad disponible de cada producto.
2. Las cantidades mostradas deben corresponder al inventario registrado.
3. El sistema debe permitir identificar los productos con existencias iguales a cero.
4. Si no existen registros de inventario para los productos consultados, el sistema debe informar la situación de forma controlada.

### HU-10 — Registrar ajustes de inventario

**Historia de usuario**

Como administrador, quiero registrar ajustes autorizados de inventario para corregir diferencias entre las existencias registradas y las reales.

**Prioridad:** Media.

**Criterios de aceptación**

1. El sistema debe permitir seleccionar el producto que se ajustará.
2. El administrador debe poder indicar la cantidad resultante o la variación, según el mecanismo definido.
3. El ajuste debe ser validado antes de aplicarse.
4. El inventario resultante nunca debe ser negativo.
5. El sistema debe registrar un movimiento de tipo `adjustment`.
6. El movimiento debe conservar el producto, el usuario, la cantidad anterior, la nueva cantidad y la fecha.
7. Si el ajuste falla, el inventario no debe quedar parcialmente actualizado.

### HU-11 — Consultar movimientos de inventario

**Historia de usuario**

Como administrador, quiero consultar el historial de movimientos del inventario para hacer seguimiento a los cambios en las existencias.

**Prioridad:** Media.

**Criterios de aceptación**

1. El sistema debe mostrar los movimientos registrados.
2. Cada movimiento debe incluir el producto, el tipo de movimiento, las cantidades anterior y nueva, el usuario y la fecha.
3. El sistema debe permitir distinguir movimientos de venta, compra, ajuste y anulación de venta.
4. El historial debe conservar los movimientos anteriores después de nuevas operaciones.
5. El sistema debe mostrar un mensaje cuando no existan movimientos registrados.

---

## Módulo D. Clientes y proveedores

### HU-12 — Registrar clientes

**Historia de usuario**

Como vendedor, quiero registrar clientes para asociar sus datos a las ventas cuando sea necesario.

**Prioridad:** Media.

**Criterios de aceptación**

1. El sistema debe permitir registrar el nombre del cliente.
2. Debe permitir ingresar información opcional, como documento, teléfono y correo electrónico.
3. El sistema debe validar los datos cuando se proporcionen.
4. El cliente registrado debe quedar disponible para seleccionarlo durante una venta.
5. El sistema debe informar cuando el registro no pueda completarse.

### HU-13 — Consultar clientes

**Historia de usuario**

Como vendedor autorizado, quiero consultar los clientes registrados para seleccionar al cliente correspondiente durante una venta.

**Prioridad:** Media.

**Criterios de aceptación**

1. El sistema debe mostrar los clientes registrados.
2. Cada registro debe mostrar la información necesaria para identificar al cliente.
3. El sistema debe permitir identificar al cliente general predeterminado.
4. El sistema debe informar cuando no existan resultados.

### HU-14 — Registrar proveedores

**Historia de usuario**

Como administrador, quiero registrar proveedores para asociar las compras con quienes suministran los productos.

**Prioridad:** Media.

**Criterios de aceptación**

1. El sistema debe permitir registrar el nombre del proveedor.
2. Debe permitir ingresar teléfono, correo electrónico y dirección.
3. El nombre debe ser obligatorio.
4. El sistema debe validar los datos proporcionados.
5. El proveedor registrado debe quedar disponible para asociarlo a una compra.

### HU-15 — Consultar proveedores

**Historia de usuario**

Como administrador, quiero consultar los proveedores registrados para identificar a quién corresponde una compra.

**Prioridad:** Media.

**Criterios de aceptación**

1. El sistema debe mostrar los proveedores registrados.
2. Cada registro debe mostrar el nombre y la información de contacto disponible.
3. El sistema debe permitir seleccionar un proveedor durante el registro de una compra.
4. Si no existen proveedores registrados, el sistema debe informar esta situación.

---

## Módulo E. Ventas y pagos

### HU-16 — Registrar una venta

**Historia de usuario**

Como vendedor, quiero registrar una venta con uno o varios productos para documentar la operación comercial y calcular el importe que debe pagar el cliente.

**Prioridad:** Alta.

**Criterios de aceptación**

1. El sistema debe permitir seleccionar uno o varios productos y especificar sus cantidades.
2. Cada producto debe tener una cantidad válida mayor que cero.
3. El sistema debe utilizar los precios de venta vigentes para calcular los subtotales.
4. El total debe corresponder a la suma de los subtotales.
5. El sistema debe validar que exista inventario suficiente para todos los productos.
6. La venta debe quedar asociada al usuario que la registra y al cliente seleccionado, incluido el cliente general cuando corresponda.
7. La venta debe guardar sus detalles y los valores correspondientes.
8. Si alguna validación falla, la venta no debe confirmarse.
9. La operación debe evitar que se registren ventas duplicadas por reintentos o errores de procesamiento.

### HU-17 — Registrar pagos

**Historia de usuario**

Como vendedor, quiero registrar el pago de una venta para dejar constancia de cómo se realizó el cobro.

**Prioridad:** Alta.

**Criterios de aceptación**

1. El sistema debe permitir seleccionar el método de pago disponible.
2. Debe permitir registrar el importe recibido.
3. El importe debe ser válido y mayor que cero.
4. El pago debe quedar asociado a la venta correspondiente.
5. El sistema debe conservar la fecha y los datos de referencia cuando sean aplicables.
6. El sistema debe validar que los importes registrados cumplan las reglas de pago definidas para la venta.
7. Si el pago no puede registrarse, el sistema debe informar el error sin dejar información inconsistente.

### HU-18 — Consultar historial de ventas

**Historia de usuario**

Como administrador, quiero consultar el historial de ventas para revisar las operaciones realizadas por la tienda.

**Prioridad:** Media.

**Criterios de aceptación**

1. El sistema debe mostrar las ventas registradas.
2. Cada venta debe incluir su número, fecha, usuario, total y estado.
3. El sistema debe permitir identificar las ventas anuladas.
4. Al consultar una venta, deben poder revisarse sus detalles y pagos registrados.
5. La consulta no debe modificar la información histórica.

### HU-19 — Anular una venta

**Historia de usuario**

Como administrador autorizado, quiero anular una venta cuando corresponda para corregir una operación sin perder su historial.

**Prioridad:** Alta.

**Criterios de aceptación**

1. El sistema debe permitir anular una venta que se encuentre en estado `completed`.
2. La venta anulada debe conservar su registro y sus detalles históricos.
3. El sistema debe registrar el usuario que realizó la anulación y su fecha.
4. El inventario debe recibir la devolución de las cantidades correspondientes.
5. La operación debe registrar los movimientos de tipo `sale_reversal`.
6. Una misma venta no debe poder anularse dos veces.
7. La anulación y la actualización del inventario deben ejecutarse de manera consistente.
8. Los pagos originales deben conservarse como parte del historial.
9. Si la anulación falla, no deben quedar aplicadas parcialmente sus modificaciones.

---

## Módulo F. Compras

### HU-20 — Registrar una compra

**Historia de usuario**

Como administrador, quiero registrar compras asociadas a un proveedor para documentar la adquisición de productos para la tienda.

**Prioridad:** Alta.

**Criterios de aceptación**

1. El sistema debe permitir seleccionar un proveedor registrado.
2. La compra debe contener uno o varios productos.
3. Cada detalle debe registrar la cantidad, el costo unitario y el subtotal.
4. Las cantidades deben ser mayores que cero y los costos deben ser válidos.
5. El total debe corresponder a la suma de los subtotales.
6. La compra debe quedar asociada al usuario que la registra.
7. Una compra confirmada debe actualizar las existencias de los productos correspondientes.
8. La compra y sus detalles deben guardarse de manera consistente.
9. Si ocurre un error, no deben quedar la compra y el inventario en estados incompatibles.

### HU-21 — Consultar historial de compras

**Historia de usuario**

Como administrador, quiero consultar las compras registradas para revisar las adquisiciones realizadas y sus costos.

**Prioridad:** Media.

**Criterios de aceptación**

1. El sistema debe mostrar las compras registradas.
2. Cada compra debe incluir su número, fecha, proveedor, usuario y total.
3. El sistema debe permitir consultar los detalles de una compra.
4. Los datos mostrados deben corresponder a los registros almacenados.
5. La consulta no debe modificar el historial.

---

## Módulo G. Consultas y mantenimiento

### HU-22 — Consultar el detalle de una venta

**Historia de usuario**

Como administrador o vendedor autorizado, quiero consultar el detalle de una venta para revisar los productos, las cantidades y los valores de una operación.

**Prioridad:** Media.

**Criterios de aceptación**

1. El sistema debe permitir consultar una venta existente.
2. Debe mostrar los productos vendidos, sus cantidades, precios unitarios y subtotales.
3. Debe mostrar el subtotal y el total de la venta.
4. Debe mostrar su estado actual y los pagos registrados.
5. Una venta anulada debe seguir siendo consultable.

### HU-23 — Mantener la integridad de las operaciones

**Historia de usuario**

Como administrador, quiero que las operaciones comerciales mantengan la consistencia de la información para evitar diferencias entre las ventas, las compras y el inventario.

**Prioridad:** Alta.

**Criterios de aceptación**

1. El sistema debe impedir que las cantidades del inventario sean negativas.
2. Las operaciones que modifican varias tablas relacionadas deben utilizar transacciones.
3. Si una operación falla antes de confirmarse, sus cambios deben revertirse.
4. Las relaciones entre registros deben protegerse mediante las restricciones correspondientes de la base de datos.
5. Los registros históricos relacionados con operaciones realizadas no deben eliminarse de forma que se pierda la trazabilidad.

### HU-24 — Actualizar automáticamente la fecha de modificación

**Historia de usuario**

Como administrador, quiero que los registros que tengan un campo de actualización mantengan su fecha de modificación para conocer cuándo se actualizaron por última vez.

**Prioridad:** Baja.

**Criterios de aceptación**

1. Las tablas que dispongan de un campo `updated_at` deben actualizarlo cuando corresponda.
2. La fecha debe cambiar cuando se modifique un registro.
3. La fecha de creación no debe alterarse durante una actualización.
4. El mecanismo debe comportarse de forma consistente en las tablas donde se implemente.

### HU-25 — Mostrar mensajes y manejar errores

**Historia de usuario**

Como usuario del sistema, quiero recibir mensajes claros cuando una operación se complete o falle para comprender qué ocurrió y cómo continuar.

**Prioridad:** Alta.

**Criterios de aceptación**

1. El sistema debe informar cuando una operación se complete correctamente.
2. Si los datos proporcionados son inválidos, debe explicar qué debe corregirse.
3. Si el usuario no tiene permisos, debe informar que la operación no está autorizada.
4. Los errores internos no deben exponer contraseñas, credenciales de conexión ni información sensible.
5. Los errores de conexión o de base de datos deben gestionarse de manera controlada.
6. Los mensajes mostrados al usuario deben ser comprensibles y no depender de detalles técnicos internos.

---

# 4. Product Backlog

## 4.1. Descripción

El Product Backlog es la lista priorizada de funcionalidades, mejoras y trabajos necesarios para construir FluxPOS.

El Product Owner será responsable de mantener su prioridad y claridad, trabajando con el equipo para comprender las necesidades y ajustar el alcance.

La siguiente tabla reúne las 25 historias de usuario y propone una prioridad inicial.

| ID | Historia de usuario | Prioridad | Dependencia principal |
|---|---|---|---|
| HU-01 | Iniciar sesión | Alta | Configuración de usuarios |
| HU-02 | Controlar el acceso según el rol | Alta | HU-01 |
| HU-03 | Cerrar sesión | Alta | HU-01 |
| HU-04 | Registrar productos | Alta | Categorías |
| HU-05 | Consultar productos | Alta | Base de datos de productos |
| HU-06 | Actualizar productos | Alta | HU-04 |
| HU-07 | Registrar categorías | Media | Base de datos |
| HU-08 | Consultar y actualizar categorías | Media | HU-07 |
| HU-09 | Consultar existencias | Alta | Inventario |
| HU-10 | Registrar ajustes de inventario | Media | HU-09 |
| HU-11 | Consultar movimientos de inventario | Media | Registro de movimientos |
| HU-12 | Registrar clientes | Media | Base de datos de clientes |
| HU-13 | Consultar clientes | Media | HU-12 y cliente general |
| HU-14 | Registrar proveedores | Media | Base de datos de proveedores |
| HU-15 | Consultar proveedores | Media | HU-14 |
| HU-16 | Registrar una venta | Alta | HU-05, HU-09 y cliente general |
| HU-17 | Registrar pagos | Alta | HU-16 |
| HU-18 | Consultar historial de ventas | Media | HU-16 |
| HU-19 | Anular una venta | Alta | HU-16 y HU-09 |
| HU-20 | Registrar una compra | Alta | HU-14 y productos |
| HU-21 | Consultar historial de compras | Media | HU-20 |
| HU-22 | Consultar el detalle de una venta | Media | HU-16 |
| HU-23 | Mantener la integridad de las operaciones | Alta | Operaciones de base de datos |
| HU-24 | Actualizar automáticamente la fecha de modificación | Baja | Tablas con `updated_at` |
| HU-25 | Mostrar mensajes y manejar errores | Alta | Transversal a todos los módulos |

## 4.2. Orden sugerido de implementación

Se recomienda desarrollar primero las capacidades técnicas y funcionales necesarias para que las demás historias puedan utilizarse.

El orden general propuesto es:

1. Configuración del proyecto y conexión con PostgreSQL.
2. Autenticación y permisos.
3. Productos y categorías.
4. Clientes y proveedores.
5. Consulta de inventario.
6. Registro de ventas y pagos.
7. Registro de compras.
8. Actualización y auditoría del inventario.
9. Anulación de ventas.
10. Consultas históricas.
11. Mejoras, validaciones y pruebas finales.

Este orden es orientativo. El equipo deberá ajustar la secuencia según las dependencias técnicas, la capacidad disponible y los objetivos de cada sprint.

## 4.3. Gestión del backlog

Para mantener el Product Backlog actualizado:

- El Product Owner priorizará las historias según su valor para el producto.
- El equipo aclarará las dudas técnicas antes de comprometerse con una historia.
- Las historias demasiado grandes podrán dividirse en otras más pequeñas.
- Las tareas técnicas necesarias para completar las historias también deberán registrarse.
- Las estimaciones se realizarán en equipo y no se interpretarán como tiempos exactos.
- Las funcionalidades que no quepan en el plazo inicial podrán aplazarse, documentando la decisión.

---

# 5. Criterios generales de aceptación

Además de los criterios particulares de cada historia, se establecen las siguientes condiciones generales para FluxPOS.

## 5.1. Validación de datos

- Los campos obligatorios deben validarse antes de guardar información.
- Las cantidades y los precios deben respetar las reglas del negocio.
- Los datos recibidos por el backend deben validarse aunque el frontend ya los haya comprobado.
- Los mensajes de error deben ayudar a comprender el problema.

## 5.2. Integridad de la información

- Las relaciones entre tablas deben mantenerse mediante claves foráneas y restricciones.
- Las operaciones relacionadas deben utilizar transacciones cuando corresponda.
- No deben existir cantidades negativas en el inventario.
- Las ventas anuladas deben conservar sus registros históricos.
- Los movimientos de inventario deben reflejar los cambios efectivamente aplicados.

## 5.3. Seguridad

- Las contraseñas no deben almacenarse en texto plano.
- Las operaciones protegidas deben comprobar los permisos del usuario en el backend.
- Los errores no deben exponer credenciales ni datos sensibles.
- Los secretos de configuración deben mantenerse fuera del repositorio público.

## 5.4. Pruebas

- Cada historia debe probarse con datos válidos.
- Deben comprobarse los casos de error relevantes.
- Las operaciones que afecten al inventario deben probarse con cantidades suficientes e insuficientes.
- Las operaciones transaccionales deben probarse ante fallos.
- Los cambios integrados no deben romper las funcionalidades previamente verificadas.

---

# 6. Definition of Ready

Una historia estará preparada para entrar en un sprint cuando cumpla las siguientes condiciones:

- [ ] Su objetivo y beneficio están claros.
- [ ] La descripción se entiende sin ambigüedades importantes.
- [ ] Tiene criterios de aceptación verificables.
- [ ] Se conocen sus dependencias principales.
- [ ] El equipo tiene una idea razonable de su complejidad.
- [ ] Puede desarrollarse y probarse dentro de un sprint, o se ha dividido en partes más pequeñas.

La Definition of Ready es una guía de trabajo propuesta para FluxPOS, no una obligación formal de Scrum.

---

# 7. Definition of Done

Una historia se considerará terminada cuando:

- [ ] Cumpla sus criterios de aceptación.
- [ ] El código esté integrado en el proyecto.
- [ ] Se hayan realizado las pruebas necesarias.
- [ ] Se hayan revisado las validaciones y el manejo de errores.
- [ ] No introduzca errores conocidos que bloqueen el funcionamiento.
- [ ] La documentación se haya actualizado cuando corresponda.
- [ ] El resultado pueda demostrarse al equipo o al Product Owner.

El equipo podrá ampliar estos criterios conforme avance el desarrollo.

---

# 8. Consideraciones para la planificación de los sprints

El proyecto tendrá una duración de cuatro sprints de una semana cada uno.

La asignación definitiva de las historias a los sprints se realizará durante la planificación, considerando las dependencias técnicas, las prioridades y la capacidad real del equipo.

Como orientación inicial:

- **Sprint 1:** configuración técnica, repositorio, conexión con la base de datos y primera comunicación entre frontend y backend.
- **Sprint 2:** autenticación, permisos y gestión básica de productos, categorías, clientes y proveedores.
- **Sprint 3:** ventas, pagos, compras, inventario y movimientos.
- **Sprint 4:** anulación de ventas, consultas históricas, integración, pruebas y correcciones.

La asignación no es definitiva. Las historias de mayor complejidad podrán dividirse y los elementos de prioridad menor podrán aplazarse si el tiempo disponible no permite implementarlos correctamente.

---

# 9. Control de cambios

El Product Backlog y las historias de usuario podrán actualizarse durante el desarrollo.

Los cambios deberán considerar:

- El valor que aportan al producto.
- El impacto en las funcionalidades existentes.
- Las dependencias técnicas.
- El tiempo disponible.
- La capacidad del equipo.
- Los acuerdos con el profesor y los objetivos académicos.

Las modificaciones importantes deberán quedar registradas para que todo el equipo trabaje con la misma información.

---

# 10. Conclusión

Este documento proporciona una base común para planificar y validar las funcionalidades de FluxPOS.

Las historias de usuario describen las necesidades del sistema, el Product Backlog permite priorizar el trabajo y los criterios de aceptación ayudan a comprobar que las funcionalidades cumplen los resultados esperados.

A partir de este documento, el equipo podrá planificar los sprints, asignar responsabilidades y avanzar de manera incremental hacia una primera versión funcional del sistema de punto de venta.