# taller_app

Aplicación para el relevamiento de autos en un taller mecánico.

> Proyecto en construcción — el nombre definitivo aún no está decidido.

## Descripción

Sistema para registrar y llevar el seguimiento del estado de vehículos que ingresan a un taller: datos del auto, cliente, diagnóstico, trabajos realizados, repuestos y estado general de la reparación.

## Estado

En desarrollo inicial. Funcionalidades y stack tecnológico se irán definiendo a medida que avance el proyecto.

## Ruta de armado

Checklist de construcción paso a paso. Se marca a medida que se completa cada etapa.

- [ ] **1. Estructura** — crear el esqueleto de carpetas del proyecto (`backend/`, `frontend/`, subcarpetas).
- [ ] **2. HTML** — maquetar las vistas principales (inicio, alta de vehículo, listado, detalle).
- [ ] **3. CSS** — aplicar estilos y diseño responsivo.
- [ ] **4. JS del cliente** — interactividad básica (formularios, navegación, eventos).
- [ ] **5. Backend: setup** — elegir stack, inicializar proyecto y configurar entorno.
- [ ] **6. Base de datos** — diseñar el modelo entidad-relación y conectar el backend.
- [ ] **7. API / endpoints** — implementar los CRUD de vehículos, clientes y órdenes de trabajo.
- [ ] **8. Integración front ↔ back** — consumir la API desde el frontend con `fetch`.
- [ ] **9. Validaciones** — chequeos en cliente (formato) y servidor (reglas de negocio).
- [ ] **10. Autenticación** — login de usuarios y control de acceso por rol.
- [ ] **11. Reportes y filtros** — búsquedas avanzadas y listados exportables.
- [ ] **12. Deploy** — publicar backend y frontend.

## Funcionalidades

### Entidades principales

- **Vehículo**: patente, marca, modelo, año, kilometraje, color, observaciones.
- **Cliente**: nombre, DNI/CUIT, teléfono, email, dirección.
- **Orden de trabajo**: vehículo asociado, cliente, fecha de ingreso, estado, diagnóstico.
- **Trabajo realizado**: descripción, mano de obra, mecánico responsable.
- **Repuesto**: nombre, código, precio, cantidad utilizada.

### Módulos / pantallas

- [ ] Alta, edición y baja de vehículos
- [ ] Gestión de clientes
- [ ] Registro de ingreso al taller (nueva orden de trabajo)
- [ ] Diagnóstico y presupuesto
- [ ] Carga de trabajos y repuestos utilizados
- [ ] Cambio de estado (recibido → diagnóstico → reparando → listo → entregado)
- [ ] Historial de reparaciones por vehículo
- [ ] Búsqueda y filtros (por patente, cliente, estado)
- [ ] Reportes básicos (órdenes abiertas, ingresos del mes)

## Estructura propuesta

```
taller_app/
├── backend/                # API / lógica del servidor
│   ├── src/
│   │   ├── models/         # Entidades (Vehiculo, Cliente, OrdenTrabajo, etc.)
│   │   ├── controllers/    # Lógica de cada endpoint
│   │   ├── routes/         # Definición de rutas de la API
│   │   ├── services/       # Lógica de negocio reutilizable
│   │   ├── middleware/     # Validaciones, auth, manejo de errores
│   │   ├── db/             # Conexión y migraciones de la base de datos
│   │   └── config/         # Variables de entorno y configuración
│   └── tests/              # Pruebas unitarias y de integración
│
├── frontend/               # Interfaz web
│   ├── index.html          # Punto de entrada
│   ├── pages/              # Vistas (alta, listado, detalle, etc.)
│   ├── css/                # Hojas de estilo
│   │   ├── main.css
│   │   └── components/     # Estilos por componente
│   ├── js/                 # Scripts del cliente
│   │   ├── main.js
│   │   ├── api/            # Cliente HTTP para consumir el backend
│   │   ├── components/     # Componentes reutilizables (tarjetas, tablas, forms)
│   │   └── utils/          # Helpers (formato, validaciones, etc.)
│   └── assets/             # Imágenes, íconos, fuentes
│
├── docs/                   # Documentación extra (diagramas, modelo de datos)
├── .gitignore
├── LICENSE
└── README.md
```

## Licencia

Ver [LICENSE](LICENSE).
