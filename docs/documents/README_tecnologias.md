
# FluxPOS — Tecnologías del proyecto

## 1. ¿Qué es FluxPOS?

FluxPOS es un sistema de punto de venta (POS) diseñado para administrar las ventas, los productos, el inventario, los clientes y las compras de una tienda.

El objetivo es construir una aplicación web en la que los usuarios puedan registrar ventas, consultar productos y mantener actualizado el inventario.

Para desarrollar el proyecto utilizaremos diferentes tecnologías. Cada una tendrá una responsabilidad específica y todas trabajarán en conjunto.

---

## 2. Tecnologías que utilizaremos

### 2.1. Vue.js — Frontend

**¿Qué es?**

Vue.js es un framework de JavaScript que permite construir interfaces de usuario para aplicaciones web.

**¿Para qué lo utilizaremos?**

Lo usaremos para construir todo lo que el usuario verá e interactuará dentro de FluxPOS, por ejemplo:

- Pantalla de inicio de sesión.
- Panel principal.
- Formularios para registrar productos.
- Listado de productos y categorías.
- Pantalla para realizar ventas.
- Vistas para consultar clientes e inventario.

**¿Cómo funciona?**

Vue permite dividir la interfaz en componentes reutilizables. Por ejemplo, podemos crear un componente para el menú lateral y utilizarlo en varias pantallas.

Además, cuando los datos cambian, Vue puede actualizar automáticamente la interfaz.

**En nuestro proyecto:** Vue 3 será la base del frontend.

---

### 2.2. Vue Router — Navegación

**¿Qué es?**

Vue Router es una biblioteca que permite gestionar la navegación entre las diferentes pantallas de una aplicación Vue.

**¿Para qué lo utilizaremos?**

Permitirá navegar entre secciones como:

- `/login`
- `/dashboard`
- `/products`
- `/inventory`
- `/sales`
- `/customers`

**¿Cómo funciona?**

Cuando el usuario selecciona una opción del menú, Vue Router muestra la vista correspondiente sin tener que recargar toda la página.

**En nuestro proyecto:** se encargará de organizar las rutas y las pantallas de FluxPOS.

---

### 2.3. Axios — Comunicación HTTP

**¿Qué es?**

Axios es una biblioteca de JavaScript que permite enviar solicitudes HTTP desde el frontend hacia un servidor.

**¿Para qué lo utilizaremos?**

Lo utilizaremos para solicitar información y enviar datos al backend.

Por ejemplo:

- Consultar los productos registrados.
- Enviar los datos de una venta.
- Registrar un nuevo cliente.
- Consultar las cantidades disponibles en el inventario.

**¿Cómo funciona?**

Cuando un usuario registra una venta, Vue recopila los datos del formulario y Axios los envía al backend mediante una solicitud HTTP.

El backend procesa la solicitud y devuelve una respuesta que el frontend puede mostrar al usuario.

**En nuestro proyecto:** Axios será el puente de comunicación entre Vue y Express.

---

### 2.4. Node.js — Entorno de ejecución

**¿Qué es?**

Node.js permite ejecutar JavaScript fuera del navegador, por ejemplo, en un servidor.

**¿Para qué lo utilizaremos?**

Lo utilizaremos para ejecutar el código del backend de FluxPOS.

Este código será responsable de recibir solicitudes, aplicar reglas del negocio y comunicarse con PostgreSQL.

**¿Cómo funciona?**

Node.js recibe y ejecuta el código JavaScript del servidor. Gracias a él, podemos utilizar JavaScript tanto en el frontend como en el backend, aunque cada parte tendrá responsabilidades diferentes.

**En nuestro proyecto:** Node.js será el entorno donde se ejecutará el servidor.

---

### 2.5. Express.js — Backend y API REST

**¿Qué es?**

Express.js es un framework para Node.js que facilita la creación de servidores web y API.

**¿Para qué lo utilizaremos?**

Será responsable de procesar las solicitudes del frontend y aplicar las reglas del negocio.

Algunos ejemplos:

- Consultar productos.
- Crear y modificar productos.
- Registrar ventas.
- Validar cantidades disponibles.
- Consultar el historial de movimientos del inventario.

**¿Cómo funciona?**

Express permite definir rutas o endpoints que indican qué debe hacer el servidor cuando recibe una solicitud.

Por ejemplo:

- `GET /api/products`: consultar productos.
- `POST /api/products`: registrar un producto.
- `GET /api/sales`: consultar ventas.
- `POST /api/sales`: registrar una venta.

Estos son ejemplos de las rutas que podríamos implementar; no significa que ya estén creadas.

**¿Qué es una API REST?**

Es una forma organizada de permitir que diferentes partes de una aplicación se comuniquen mediante solicitudes HTTP.

En FluxPOS, el frontend enviará solicitudes a la API y el backend responderá con datos, normalmente en formato JSON.

**En nuestro proyecto:** Express será la base de la API REST.

---

### 2.6. PostgreSQL — Base de datos

**¿Qué es?**

PostgreSQL es un sistema de gestión de bases de datos relacional. Permite almacenar, consultar y relacionar información de forma estructurada.

**¿Para qué lo utilizaremos?**

Será el lugar donde almacenaremos la información de FluxPOS, como:

- Usuarios y roles.
- Productos y categorías.
- Inventario.
- Clientes y proveedores.
- Ventas y sus detalles.
- Pagos.
- Compras y sus detalles.
- Movimientos del inventario.

**¿Cómo funciona?**

PostgreSQL organiza la información en tablas relacionadas entre sí.

Por ejemplo, una venta puede estar relacionada con un usuario, un cliente y varios detalles de venta. Cada detalle indica qué producto se vendió, en qué cantidad y a qué precio.

Para consultar o modificar los datos utilizaremos SQL.

**En nuestro proyecto:** PostgreSQL almacenará la información de forma persistente, incluso cuando se cierre la aplicación.

---

### 2.7. SQL — Lenguaje de consultas

**¿Qué es?**

SQL es el lenguaje utilizado para trabajar con bases de datos relacionales.

**¿Para qué lo utilizaremos?**

Lo usaremos para crear tablas, consultar registros, insertar información, actualizar datos y definir relaciones entre tablas.

Ejemplos de operaciones SQL:

- `SELECT`: consultar información.
- `INSERT`: insertar registros.
- `UPDATE`: actualizar registros.
- `DELETE`: eliminar registros.
- `CREATE TABLE`: crear tablas.

**¿Cómo funciona?**

Escribimos instrucciones SQL que PostgreSQL interpreta y ejecuta.

También utilizaremos restricciones, claves primarias y claves foráneas para mantener la integridad de los datos.

Además, estudiaremos funciones y triggers para automatizar ciertas tareas de la base de datos, especialmente las relacionadas con el inventario y su auditoría.

**En nuestro proyecto:** SQL será fundamental para diseñar y consultar la base de datos.

---

### 2.8. Node-postgres (`pg`) — Conexión con PostgreSQL

**¿Qué es?**

`pg`, también conocido como node-postgres, es una biblioteca que permite conectar aplicaciones Node.js con bases de datos PostgreSQL.

**¿Para qué lo utilizaremos?**

Lo utilizaremos desde el backend para ejecutar consultas SQL sobre nuestra base de datos.

**¿Cómo funciona?**

Cuando Express recibe una solicitud, el backend puede utilizar `pg` para ejecutar una consulta SQL, obtener los resultados y devolverlos al frontend.

Por ejemplo, al solicitar los productos, el backend consulta la tabla `products` y envía los resultados al frontend.

También permite utilizar transacciones para agrupar varias operaciones que deben completarse correctamente como una unidad.

**En nuestro proyecto:** `pg` será el enlace entre Node.js y PostgreSQL.

---

### 2.9. Git y GitHub — Control de versiones y colaboración

**¿Qué es Git?**

Git es un sistema de control de versiones que permite registrar los cambios realizados en el código.

**¿Qué es GitHub?**

GitHub es una plataforma que permite alojar repositorios Git en internet y colaborar con otras personas.

**¿Para qué los utilizaremos?**

Los utilizaremos para trabajar en equipo, compartir el código y mantener un historial de los cambios.

Por ejemplo, una persona puede trabajar en el módulo de productos mientras otra desarrolla el módulo de clientes.

**¿Cómo funciona?**

Git permite crear commits, que son registros de cambios. También permite utilizar ramas para desarrollar funcionalidades de manera separada.

GitHub permite compartir esas ramas, revisar cambios y unirlos al proyecto principal.

**En nuestro proyecto:** Git y GitHub nos ayudarán a organizar el trabajo colaborativo y evitar perder avances.

---

## 3. ¿Cómo se conectan todas las tecnologías?

El flujo general de FluxPOS será el siguiente:

1. El usuario interactúa con la interfaz construida con Vue.
2. Vue Router permite navegar entre las diferentes pantallas.
3. Axios envía una solicitud HTTP al backend.
4. Node.js ejecuta el servidor y Express recibe la solicitud.
5. Express valida los datos y aplica las reglas del negocio.
6. El backend utiliza `pg` para consultar o modificar PostgreSQL.
7. PostgreSQL ejecuta las instrucciones SQL y devuelve los resultados.
8. Express envía una respuesta al frontend.
9. Vue actualiza la interfaz para mostrar el resultado.

### Ejemplo: registrar una venta

Supongamos que un empleado registra la venta de dos unidades de un producto.

1. El empleado selecciona el producto y la cantidad en la interfaz.
2. Axios envía los datos de la venta al backend.
3. Express valida los datos recibidos.
4. El backend utiliza `pg` para iniciar una transacción en PostgreSQL.
5. PostgreSQL registra la venta y sus detalles, y actualiza el inventario según las reglas implementadas.
6. Si todas las operaciones son correctas, se confirma la transacción. Si ocurre un error, se revierte.
7. El backend responde al frontend indicando el resultado.
8. Vue muestra un mensaje al usuario.

La actualización del inventario y el registro de sus movimientos deberán implementarse de forma que no queden inconsistentes si una operación falla.

---

## 4. Arquitectura general del proyecto

Podemos representar la arquitectura de la siguiente manera:

```text
┌───────────────────────────────────┐
│             FRONTEND              │
│                                   │
│  Vue 3 + Vue Router + Axios       │
│                                   │
│  Interfaz, formularios y vistas   │
└─────────────────┬─────────────────┘
                  │
                  │ Solicitudes HTTP
                  ▼
┌───────────────────────────────────┐
│              BACKEND              │
│                                   │
│  Node.js + Express.js             │
│                                   │
│  API REST y reglas del negocio    │
│                                   │
│  Node-postgres (pg)               │
└─────────────────┬─────────────────┘
                  │
                  │ Consultas SQL
                  ▼
┌───────────────────────────────────┐
│             DATABASE              │
│                                   │
│           PostgreSQL              │
│                                   │
│  Tablas, relaciones, restricciones │
│  y triggers                       │
└───────────────────────────────────┘
```

Git y GitHub se utilizarán de manera transversal para controlar las versiones del proyecto y coordinar el trabajo del equipo.

---

## 5. Estructura de carpetas

La estructura inicial del repositorio será similar a esta:

```text
FluxPOS/
├── database/
│   ├── 00_create_database.sql
│   ├── 01_create_roles_and_users.sql
│   ├── 02_create_categories_products_inventory.sql
│   ├── 03_create_customers_suppliers.sql
│   ├── 04_create_sales.sql
│   ├── 05_create_purchases.sql
│   └── 06_create_inventory_movements.sql
│
├── backend/
│   ├── src/
│   ├── package.json
│   └── .env
│
├── frontend/
│   ├── src/
│   └── package.json
│
└── README.md
```

Esta es una estructura de referencia. Las carpetas y los archivos internos de `backend/` y `frontend/` se irán creando a medida que avancemos.

- `database/`: contiene los scripts SQL para crear y configurar la base de datos.
- `backend/`: contiene el servidor, las rutas de la API y la lógica del negocio.
- `frontend/`: contiene la interfaz de usuario.
- `package.json`: registra las dependencias y los comandos de cada aplicación.
- `.env`: permite configurar variables como los datos de conexión a la base de datos. No debe subirse a GitHub si contiene contraseñas u otros secretos.

---

## 6. ¿Qué necesitamos instalar?

Para comenzar a desarrollar, necesitaremos:

1. **Node.js y npm:** para ejecutar JavaScript en el servidor y administrar las dependencias del proyecto.
2. **PostgreSQL:** para instalar y ejecutar nuestro sistema de bases de datos.
3. **Un editor de código:** por ejemplo, Visual Studio Code.
4. **Git:** para controlar las versiones del código.
5. **Una cuenta de GitHub:** para compartir el repositorio con el equipo.
6. **Un navegador web:** para probar la aplicación.

Podemos utilizar una herramienta gráfica como pgAdmin para administrar PostgreSQL, aunque también es posible trabajar desde la terminal.

---

## 7. Conceptos importantes que debemos aprender

Como este es nuestro primer proyecto de desarrollo, conviene familiarizarnos con algunos conceptos:

- **Frontend:** la parte de la aplicación con la que interactúa el usuario.
- **Backend:** la parte que procesa las solicitudes y aplica las reglas del sistema.
- **Base de datos:** el lugar donde se almacena la información.
- **API:** el mecanismo mediante el cual el frontend y el backend intercambian información.
- **Endpoint:** una ruta de la API que permite realizar una operación.
- **CRUD:** las cuatro operaciones básicas de gestión de datos: crear, consultar, actualizar y eliminar.
- **JSON:** un formato común para intercambiar información entre sistemas.
- **Transacción:** un conjunto de operaciones de base de datos que se confirman juntas o se revierten si algo falla.
- **Trigger:** una función de la base de datos que se ejecuta automáticamente cuando ocurre un evento definido, como insertar o actualizar un registro.
- **Clave primaria (PK):** identifica de forma única cada registro de una tabla.
- **Clave foránea (FK):** conecta registros de una tabla con otra y ayuda a mantener la integridad de los datos.
- **Repositorio:** el espacio donde se almacena y organiza el código del proyecto.

---

## 8. Orden recomendado para aprender y desarrollar

Para no intentar aprenderlo todo al mismo tiempo, recomendamos avanzar por etapas:

1. Comprender las tablas, las relaciones y las consultas básicas de PostgreSQL.
2. Crear y probar la base de datos.
3. Aprender los fundamentos de JavaScript y Node.js.
4. Crear un servidor básico con Express.
5. Conectar Express con PostgreSQL utilizando `pg`.
6. Crear endpoints para consultar y registrar información.
7. Aprender los fundamentos de Vue 3.
8. Construir las primeras pantallas del frontend.
9. Conectar Vue con la API utilizando Axios.
10. Implementar los módulos del sistema progresivamente.
11. Probar las operaciones, las validaciones y los casos de error.
12. Utilizar Git y GitHub durante todo el proceso.

No es necesario dominar todas las tecnologías antes de comenzar. Lo importante es entender para qué sirve cada una e ir aprendiendo mientras construimos el proyecto.

---

## 9. Resumen

| Tecnología | Responsabilidad principal |
|---|---|
| Vue 3 | Construir la interfaz de usuario |
| Vue Router | Gestionar la navegación |
| Axios | Enviar solicitudes HTTP |
| Node.js | Ejecutar JavaScript en el servidor |
| Express.js | Crear la API y procesar solicitudes |
| PostgreSQL | Almacenar y relacionar los datos |
| SQL | Consultar y administrar la base de datos |
| Node-postgres (`pg`) | Conectar el backend con PostgreSQL |
| Git | Controlar las versiones del código |
| GitHub | Compartir el proyecto y colaborar |

**Nuestra meta:** construir FluxPOS paso a paso, entendiendo cómo funciona cada parte y cómo se conecta con las demás.
