# apptaller

Aplicacion web para registrar vehiculos que ingresan a un taller mecanico.

## Estado actual

La app funciona solo en frontend y guarda los datos en `localStorage`, sin backend todavia. Hoy incluye:

- Dashboard con contadores reales segun el estado de los vehiculos.
- Alta de vehiculos con validaciones de patente, anio y campos obligatorios.
- Listado de vehiculos persistidos en el navegador.
- Edicion y baja desde el listado.
- Migracion automatica de registros viejos sin `id` o con estado legado `"En el taller"`.

## Flujo implementado

Cada vehiculo se guarda bajo la clave `vehiculos` de `localStorage` con esta estructura:

```json
{
  "id": "4dfbb90d-74bd-4a67-88c9-4db80d8f7dd2",
  "patente": "AB123CD",
  "marca": "Volkswagen",
  "modelo": "Golf",
  "anio": "2018",
  "cliente": "Juan Perez",
  "estado": "Recibido"
}
```

Estados soportados en esta fase:

- `Recibido`
- `En diagnóstico`
- `Reparando`
- `Listo para entregar`
- `Entregado`

## Estructura real

```text
apptaller/
|-- frontend/
|   |-- index.html
|   |-- vehiculos.html
|   |-- alta-vehiculo.html
|   |-- editar-vehiculo.html
|   |-- css/
|   |   `-- style.css
|   `-- js/
|       |-- main.js
|       |-- vehiculos.js
|       |-- alta-vehiculo.js
|       |-- editar-vehiculo.js
|       `-- storage/
|           `-- vehiculos.js
|-- .gitignore
|-- LICENSE
`-- README.md
```

## Alcance actual

Implementado:

- CRUD local de vehiculos en el navegador.
- Navegacion entre inicio, alta, listado y edicion.
- Validaciones basicas del formulario.
- Conteo de vehiculos activos, pendientes y listos para entregar.

Pendiente para fases futuras:

- Backend y API REST.
- Entidades de clientes, ordenes y diagnosticos.
- Filtros, reportes y autenticacion.
- Reemplazo de `localStorage` por persistencia real.

## Prueba manual

1. Abrir `frontend/index.html` en el navegador.
2. Ir a `Vehiculos` y crear un registro nuevo.
3. Confirmar que el alta redirige al listado y muestra el nuevo vehiculo.
4. Editar estado y datos desde el boton `Editar`.
5. Eliminar un registro con el boton `Eliminar`.
6. Volver al dashboard y revisar que los contadores coincidan.

## Licencia

Ver [LICENSE](LICENSE).
