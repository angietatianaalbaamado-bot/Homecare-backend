# HomeCare  – Plataforma de servicios domésticos y de cuidado personal
# 🏡 HomeCare  – Plataforma de Servicios Domésticos y de Cuidado Personal

## 💡 Descripción del Negocio

**HomeCare** es una aplicación **backend** que conecta a usuarios que necesitan servicios domésticos o de cuidado personal con trabajadores confiables y certificados que ofrecen atención en el hogar.

El sistema permite solicitar servicios como:
- 🧹 Aseo general del hogar  
- 👕 Lavado, planchado y cocina  
- 👵 Cuidado de adultos mayores  
- 👶 Cuidado infantil o niñeras por horas  
- 🌿 Jardinería y mantenimiento básico  

El objetivo es **brindar seguridad, calidad y formalidad laboral**, mediante una red organizada de trabajadores con tarifas definidas y seguimiento de servicio.

---

## ⚙️ Lógica del Negocio

### 🎯 Actividades principales

| Funcionalidad | Descripción |
|----------------|-------------|
| 👥 Gestión de usuarios | Registro, autenticación y control de roles |
| 📅 Solicitud de servicios | Creación de órdenes de servicio (tipo, fecha, hora, dirección) |
| 🧾 Gestión de trabajadores | Registro de empleados con validación y certificaciones |
| 💳 Pagos y tarifas | Definición de tarifas fijas según tipo de servicio |
| 📩 Notificaciones | Confirmación de servicio por correo o mensaje |

---

## 🌐 Rutas API

### 🔐 Autenticación
| Método | Ruta | Descripción |
|--------|------|-------------|
| POST | `/auth/register` | Registro de usuario |
| POST | `/auth/login` | Inicio de sesión |
| POST | `/auth/logout` | Cierre de sesión |

### 👥 Usuarios
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/users` | Listar todos los usuarios |
| GET | `/users/me` | Ver perfil propio |
| PATCH | `/users/:id` | Actualizar datos del usuario |
| DELETE | `/users/:id` | Eliminar usuario |

### 🧹 Servicios Domésticos
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/services` | Listar todos los servicios disponibles |
| POST | `/services` | Crear una nueva solicitud de servicio |
| PATCH | `/services/:id` | Actualizar una solicitud |
| DELETE | `/services/:id` | Cancelar solicitud |

---

## 🗄️ Entidades Principales

### 👤 Usuario
- id: Primary Key  
- nombre: String  
- email: String (único)  
- password: String (encriptado)  
- rol: Enum (CLIENTE / TRABAJADOR / ADMIN)  
- estado: Boolean  
- createdAt: DateTime  

### 🧹 Servicio
- id: Primary Key  
- tipo: String  
- descripcion: String  
- fecha: Date  
- hora: String  
- estado: Enum (PENDIENTE / EN_PROCESO / COMPLETADO)  
- usuarioId: Foreign Key  
- trabajadorId: Foreign Key  

### 💳 Pago
- id: Primary Key  
- monto: Number  
- metodo: Enum (Yape / Nequi / PayPal / Transferencia)  
- fechaPago: DateTime  
- servicioId: Foreign Key  