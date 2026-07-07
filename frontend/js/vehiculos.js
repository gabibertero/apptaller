import { getAll, remove } from "./storage/vehiculos.js";

const tbody = document.getElementById("tbody-vehiculos");

function createCell(content) {
    const cell = document.createElement("td");
    cell.textContent = content;
    return cell;
}

function renderEmptyState() {
    const row = document.createElement("tr");
    const cell = document.createElement("td");

    cell.colSpan = 7;
    cell.className = "tabla-vacia";
    cell.textContent = "No hay vehículos registrados.";

    row.appendChild(cell);
    tbody.replaceChildren(row);
}

function createActionsCell(vehiculo) {
    const cell = document.createElement("td");
    const actions = document.createElement("div");
    const editLink = document.createElement("a");
    const deleteButton = document.createElement("button");

    actions.className = "acciones-fila";

    editLink.href = `editar-vehiculo.html?id=${encodeURIComponent(vehiculo.id)}`;
    editLink.className = "btn btn-secundario btn-tabla";
    editLink.textContent = "Editar";

    deleteButton.type = "button";
    deleteButton.className = "btn btn-peligro btn-tabla";
    deleteButton.textContent = "Eliminar";
    deleteButton.dataset.action = "delete";
    deleteButton.dataset.id = vehiculo.id;
    deleteButton.dataset.patente = vehiculo.patente;

    actions.append(editLink, deleteButton);
    cell.appendChild(actions);

    return cell;
}

function renderVehiculos() {
    const vehiculos = getAll();

    if (vehiculos.length === 0) {
        renderEmptyState();
        return;
    }

    const rows = vehiculos.map((vehiculo) => {
        const row = document.createElement("tr");

        row.append(
            createCell(vehiculo.patente),
            createCell(vehiculo.marca),
            createCell(vehiculo.modelo),
            createCell(String(vehiculo.anio)),
            createCell(vehiculo.cliente),
            createCell(vehiculo.estado),
            createActionsCell(vehiculo)
        );

        return row;
    });

    tbody.replaceChildren(...rows);
}

tbody.addEventListener("click", (event) => {
    const button = event.target.closest('[data-action="delete"]');

    if (!button) {
        return;
    }

    const patente = button.dataset.patente || "este vehículo";
    const shouldDelete = window.confirm(`¿Eliminar el vehículo ${patente}?`);

    if (!shouldDelete) {
        return;
    }

    remove(button.dataset.id);
    renderVehiculos();
});

renderVehiculos();
