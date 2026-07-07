# apptaller

Aplicacion web para la gestion inicial de vehiculos en un taller mecanico.

## Demo

Demo publicada en GitHub Pages:

https://gabibertero.github.io/apptaller/index.html

## Descripcion

`apptaller` es un frontend en HTML, CSS y JavaScript vanilla pensado para registrar vehiculos que ingresan al taller y seguir su estado general. En esta etapa no hay backend ni base de datos: toda la persistencia se resuelve con `localStorage`.

## Funcionalidades actuales

- Dashboard con contadores reales de vehiculos.
- Alta de vehiculos con validaciones de campos.
- Listado persistido en `localStorage`.
- Edicion de datos y cambio de estado.
- Baja de vehiculos con confirmacion.
- Migracion automatica de registros viejos sin `id`.
- Compatibilidad con el estado legado `"En el taller"`, convertido a `"Recibido"`.

## Flujo de estados

Estados soportados actualmente:

- `Recibido`
- `En diagnostico`
- `Reparando`
- `Listo para entregar`
- `Entregado`

Reglas del dashboard:

- `Vehiculos en el Taller`: cuenta todo vehiculo con estado distinto de `Entregado`.
- `Pendientes de Diagnostico`: cuenta `Recibido` y `En diagnostico`.
- `Listos para entregar`: cuenta solo `Listo para entregar`.

## Stack

- HTML5
- CSS plano
- JavaScript ES modules
- `localStorage` del navegador
- GitHub Pages para la demo

## Estructura del proyecto

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
|-- .github/
|   `-- workflows/
|       `-- pages.yml
|-- .gitignore
|-- LICENSE
`-- README.md
```

## Modelo de datos

Los vehiculos se guardan bajo la clave `vehiculos` de `localStorage`.

Ejemplo:

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

## Como ejecutarlo localmente

Como el proyecto usa modulos ES en el navegador, conviene levantar un servidor estatico local en lugar de abrir los archivos con `file://`.

Opcion con Python:

```bash
cd frontend
python -m http.server 5500
```

Luego abrir:

http://localhost:5500/

En Windows, si `python` no responde, tambien puede servir:

```powershell
cd frontend
py -m http.server 5500
```

## Validaciones actuales

- Patente obligatoria, con `trim`, unica y formato alfanumerico de 6 o 7 caracteres.
- Marca obligatoria.
- Modelo obligatorio.
- Cliente obligatorio.
- Anio obligatorio entre `1950` y `2030`.

## Limitaciones de esta fase

- No hay backend.
- No hay autenticacion.
- No hay clientes como entidad separada.
- No hay ordenes de trabajo, reportes ni filtros.
- Los datos viven en el navegador del usuario, por lo que la demo no comparte informacion entre dispositivos ni usuarios.
- No hay tests automatizados todavia.

## Roadmap

Posibles pasos siguientes:

- Reemplazar `localStorage` por una API REST.
- Incorporar backend con Node.js y persistencia real.
- Separar clientes y ordenes de trabajo como entidades propias.
- Agregar filtros por patente, cliente y estado.
- Sumar reportes y metricas operativas.

## Estado del proyecto

Proyecto en desarrollo academico / incremental. La version actual ya cubre un flujo CRUD basico del modulo de vehiculos y sirve como demo funcional de frontend.

## Licencia

Ver [LICENSE](LICENSE).
