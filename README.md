# HomeCare API

Backend para una plataforma de servicios domésticos y de cuidado personal.  
HomeCare conecta usuarios que necesitan atención en el hogar con trabajadores confiables y previamente validados, permitiendo gestionar solicitudes, usuarios, servicios y pagos desde una API REST.

## Descripción

HomeCare fue diseñado para digitalizar la contratación de servicios domésticos y de cuidado personal, ofreciendo una solución organizada, segura y escalable para la gestión de servicios en casa.

Entre los servicios gestionados por la plataforma se incluyen:

- Aseo general del hogar
- Lavado, planchado y cocina
- Cuidado de adultos mayores
- Cuidado infantil o niñeras por horas
- Jardinería y mantenimiento básico

## Objetivo

El objetivo del proyecto es brindar seguridad, calidad y formalidad en la contratación de servicios, mediante una plataforma que permita:

- Registrar usuarios y trabajadores
- Solicitar servicios por fecha, hora y dirección
- Asignar trabajadores a cada servicio
- Gestionar tarifas y pagos
- Mantener trazabilidad del estado del servicio

## Funcionalidades principales

| Funcionalidad | Descripción |
|---|---|
| Gestión de usuarios | Registro, autenticación y administración de roles |
| Solicitud de servicios | Creación y seguimiento de órdenes de servicio |
| Gestión de trabajadores | Registro y validación de personal |
| Pagos y tarifas | Definición y control de pagos por servicio |
| Notificaciones | Confirmaciones y seguimiento del servicio |

## Tecnologías

Este proyecto está construido con tecnologías orientadas al desarrollo backend escalable:

- Node.js
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT
- Bcrypt

## Estructura general del negocio

La API permite gestionar tres actores principales:

- **Cliente:** usuario que solicita servicios.
- **Trabajador:** persona que presta el servicio.
- **Administrador:** usuario con permisos de control y supervisión.

El flujo general del sistema es:

1. El usuario se registra e inicia sesión.
2. El cliente solicita un servicio.
3. El sistema registra la orden con fecha, hora y dirección.
4. Un trabajador puede ser asignado al servicio.
5. El pago queda asociado a la solicitud.
6. El estado del servicio se actualiza según su avance.

## Endpoints principales

### Autenticación

| Método | Ruta | Descripción |
|---|---|---|
| POST | `/auth/register` | Registrar un nuevo usuario |
| POST | `/auth/login` | Iniciar sesión |
| POST | `/auth/logout` | Cerrar sesión |

### Usuarios

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/users` | Listar usuarios |
| GET | `/users/me` | Obtener perfil del usuario autenticado |
| PATCH | `/users/:id` | Actualizar usuario |
| DELETE | `/users/:id` | Eliminar usuario |

### Servicios

| Método | Ruta | Descripción |
|---|---|---|
| GET | `/services` | Listar servicios disponibles o solicitados |
| POST | `/services` | Crear una solicitud de servicio |
| PATCH | `/services/:id` | Actualizar una solicitud |
| DELETE | `/services/:id` | Cancelar una solicitud |

## Entidades principales

### Usuario

- `id`: identificador único
- `nombre`: nombre completo
- `email`: correo electrónico único
- `password`: contraseña encriptada
- `rol`: CLIENTE | TRABAJADOR | ADMIN
- `estado`: estado del usuario
- `createdAt`: fecha de creación

### Servicio

- `id`: identificador único
- `tipo`: tipo de servicio
- `descripcion`: detalle del servicio solicitado
- `fecha`: fecha programada
- `hora`: hora programada
- `estado`: PENDIENTE | EN_PROCESO | COMPLETADO
- `usuarioId`: usuario que solicita
- `trabajadorId`: trabajador asignado

### Pago

- `id`: identificador único
- `monto`: valor pagado
- `metodo`: Yape | Nequi | PayPal | Transferencia
- `fechaPago`: fecha y hora del pago
- `servicioId`: servicio relacionado

## Instalación

```bash
git clone https://github.com/angietatianaalbaamado-bot/Homecare-backend.git
cd Homecare-backend
npm install
```

## Variables de entorno

Crea un archivo `.env` con la configuración necesaria para ejecutar el proyecto:

```env
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_NAME=
JWT_SECRET=
```

## Ejecución del proyecto

## desarrollo
npm run start:dev

producción
npm run build
npm run start:prod


## Estado del proyecto

Proyecto backend en desarrollo orientado a la gestión de servicios domésticos y de cuidado personal mediante arquitectura REST.

## Autor

Desarrollado por Angie Tatiana Alba Amado.