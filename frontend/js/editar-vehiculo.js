import { getById, update, ValidationError } from "./storage/vehiculos.js";

const form = document.getElementById("form-editar");
const mensajeEdicion = document.getElementById("mensaje-edicion");
const fieldNames = ["patente", "marca", "modelo", "anio", "cliente", "estado"];
const searchParams = new URLSearchParams(window.location.search);
const vehiculoId = searchParams.get("id");

function setFieldError(fieldName, message = "") {
    const input = document.getElementById(fieldName);
    const errorElement = document.getElementById(`error-${fieldName}`);

    if (!input || !errorElement) {
        return;
    }

    errorElement.textContent = message;
    input.classList.toggle("input-error", Boolean(message));
    input.setAttribute("aria-invalid", message ? "true" : "false");
}

function clearErrors() {
    fieldNames.forEach((fieldName) => setFieldError(fieldName));
}

function getFormData() {
    return {
        patente: document.getElementById("patente").value,
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        anio: document.getElementById("anio").value,
        cliente: document.getElementById("cliente").value,
        estado: document.getElementById("estado").value
    };
}

function fillForm(vehiculo) {
    document.getElementById("patente").value = vehiculo.patente;
    document.getElementById("marca").value = vehiculo.marca;
    document.getElementById("modelo").value = vehiculo.modelo;
    document.getElementById("anio").value = vehiculo.anio;
    document.getElementById("cliente").value = vehiculo.cliente;
    document.getElementById("estado").value = vehiculo.estado;
}

function showMissingVehicleMessage() {
    const link = document.createElement("a");

    form.hidden = true;
    mensajeEdicion.hidden = false;
    mensajeEdicion.textContent = "No se encontró el vehículo solicitado. ";

    link.href = "vehiculos.html";
    link.textContent = "Volver al listado";

    mensajeEdicion.appendChild(link);
}

fieldNames.forEach((fieldName) => {
    const input = document.getElementById(fieldName);

    if (!input) {
        return;
    }

    const eventName = fieldName === "estado" ? "change" : "input";

    input.addEventListener(eventName, () => {
        if (fieldName === "patente") {
            input.value = input.value.toUpperCase();
        }

        setFieldError(fieldName);
    });
});

const vehiculo = getById(vehiculoId);

if (!vehiculo) {
    showMissingVehicleMessage();
} else {
    fillForm(vehiculo);
}

form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    try {
        const updatedVehiculo = update(vehiculoId, getFormData());

        if (!updatedVehiculo) {
            showMissingVehicleMessage();
            return;
        }

        window.location.href = "vehiculos.html";
    } catch (error) {
        if (error instanceof ValidationError) {
            Object.entries(error.errors).forEach(([fieldName, message]) => {
                setFieldError(fieldName, message);
            });
            return;
        }

        window.alert("No se pudo actualizar el vehiculo.");
        console.error(error);
    }
});
