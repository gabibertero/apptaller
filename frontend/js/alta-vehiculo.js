import { add, ValidationError } from "./storage/vehiculos.js";

const form = document.getElementById("form-alta");
const fieldNames = ["patente", "marca", "modelo", "anio", "cliente"];

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
        cliente: document.getElementById("cliente").value
    };
}

fieldNames.forEach((fieldName) => {
    const input = document.getElementById(fieldName);

    if (!input) {
        return;
    }

    input.addEventListener("input", () => {
        if (fieldName === "patente") {
            input.value = input.value.toUpperCase();
        }

        setFieldError(fieldName);
    });
});

form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearErrors();

    try {
        add(getFormData());
        window.location.href = "vehiculos.html";
    } catch (error) {
        if (error instanceof ValidationError) {
            Object.entries(error.errors).forEach(([fieldName, message]) => {
                setFieldError(fieldName, message);
            });
            return;
        }

        window.alert("No se pudo guardar el vehiculo.");
        console.error(error);
    }
});
