# FluxPOS

**Sistema de punto de venta y gestión de inventario**

## 📌 Descripción del proyecto

FluxPOS es un sistema de punto de venta (POS, *Point of Sale*) diseñado para facilitar y centralizar las operaciones comerciales de una tienda. Su propósito es ofrecer una herramienta que permita gestionar productos, controlar existencias, registrar ventas y compras, administrar clientes y proveedores, y mantener un historial de los movimientos de inventario.

El sistema busca mejorar la organización de la información y la eficiencia de las operaciones diarias, reduciendo la dependencia de registros manuales y facilitando el seguimiento de las transacciones realizadas en el negocio.

FluxPOS se desarrolla como un proyecto de software que aplica buenas prácticas de desarrollo, organización de bases de datos y trabajo colaborativo mediante metodologías ágiles.

## 🎯 Objetivo general

Desarrollar un sistema de punto de venta que permita administrar de manera centralizada las operaciones comerciales y el inventario de una tienda, garantizando la integridad de la información y facilitando el registro, la consulta y el seguimiento de las transacciones.

## 🎯 Objetivos específicos

- Gestionar productos y categorías de manera organizada.
- Controlar las existencias y registrar los movimientos de inventario.
- Registrar ventas y sus respectivos pagos.
- Administrar las compras y la información de los proveedores.
- Gestionar los datos de los clientes.
- Mantener un historial de las operaciones para facilitar su consulta y seguimiento.
- Implementar un sistema de autenticación y control de acceso basado en roles.
- Garantizar la consistencia de los datos mediante validaciones y mecanismos de integridad en la base de datos.

## ⚙️ Funcionalidades principales

| Módulo | Descripción |
|---|---|
| **Autenticación y usuarios** | Permite iniciar sesión y controlar el acceso según el rol del usuario. |
| **Productos y categorías** | Permite registrar, consultar y actualizar los productos y sus categorías. |
| **Inventario** | Permite consultar existencias, realizar ajustes y mantener un registro de los movimientos de inventario. |
| **Ventas** | Permite registrar ventas, asociar sus detalles y gestionar los pagos correspondientes. |
| **Compras** | Permite registrar las compras realizadas a proveedores y reflejar sus efectos en el inventario. |
| **Clientes** | Permite registrar y consultar la información de los clientes. |
| **Proveedores** | Permite administrar la información de los proveedores. |
| **Historial y auditoría** | Permite consultar operaciones anteriores y conservar un registro de los movimientos de inventario. |

## 🛠️ Tecnologías

El proyecto utilizará las siguientes tecnologías:

- **Frontend:** Vue 3.
- **Navegación:** Vue Router.
- **Comunicación HTTP:** Axios.
- **Backend:** Node.js y Express.js.
- **Base de datos:** PostgreSQL.
- **Acceso a la base de datos:** `pg` (node-postgres).
- **Control de versiones:** Git y GitHub.
- **Gestión del proyecto:** Scrum y Trello.

## 🏗️ Arquitectura general

FluxPOS utilizará una arquitectura cliente-servidor dividida en tres componentes principales:

- **Frontend:** interfaz con la que interactúan los usuarios para realizar las operaciones del sistema.
- **Backend:** API REST encargada de procesar las solicitudes, aplicar las reglas de negocio y comunicarse con la base de datos.
- **Base de datos:** almacena la información de los usuarios, productos, clientes, proveedores, ventas, compras, pagos e inventario.

La comunicación entre el frontend y el backend se realizará mediante solicitudes HTTP a través de la API REST. El backend será responsable de gestionar las operaciones sobre PostgreSQL y de aplicar las validaciones necesarias para preservar la integridad de la información.

## 👥 Metodología de trabajo

El desarrollo de FluxPOS se organizará mediante la metodología ágil **Scrum**, con un Product Owner, un Scrum Master y un equipo de cinco desarrolladores.

El proyecto se planificará en cuatro sprints de una semana cada uno. Cada sprint tendrá objetivos definidos y un conjunto de tareas priorizadas, con el propósito de construir el sistema de manera incremental, integrar sus componentes y reservar tiempo para realizar pruebas y corregir posibles errores antes de la entrega final.

## 📋 Alcance del proyecto

FluxPOS estará orientado a las operaciones habituales de una tienda e incluirá la gestión de productos, categorías, inventario, clientes, proveedores, ventas, pagos y compras.

También contemplará el control de acceso por roles, el registro de movimientos de inventario y mecanismos para preservar la integridad de las operaciones.

El alcance se centrará en las funcionalidades definidas para el proyecto. La incorporación de características adicionales podrá evaluarse posteriormente según las necesidades y el tiempo disponible.

## 🚀 Resultado esperado

Al finalizar el desarrollo, se espera contar con una aplicación funcional que integre una interfaz web, una API REST y una base de datos relacional, permitiendo centralizar las principales operaciones comerciales de una tienda.

El resultado deberá ofrecer una estructura organizada, datos consistentes y un historial de operaciones que facilite la administración y el seguimiento de las actividades realizadas.

---

**FluxPOS** — Simplificando la gestión del punto de venta y el inventario.