//Obtener referencia al formulario
const form = document.getElementById("form-alta");

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Evitar que recargue el navegador

    const vehiculo = {
        patente: document.getElementById("patente").value,
        marca: document.getElementById("marca").value,
        modelo: document.getElementById("modelo").value,
        anio: document.getElementById("anio").value,
        cliente: document.getElementById("cliente").value,
        estado: "En el taller" // Estado inicial del vehículo
    }
    const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

    vehiculos.push(vehiculo);

    localStorage.setItem("vehiculos", JSON.stringify(vehiculos));

    window.location.href = "vehiculos.html";
})

