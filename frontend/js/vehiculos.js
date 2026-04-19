const tbody = document.getElementById("tbody-vehiculos");

const vehiculos = JSON.parse(localStorage.getItem("vehiculos")) || [];

if (vehiculos.length === 0) {
    tbody.innerHTML = `
        <tr>
            <td colspan="6" style="text-align: center; color: #888;">No hay vehículos registrados.</td>
        </tr>
    `
} else {
    tbody.innerHTML = vehiculos.map(vehiculo => `
        <tr>
            <td>${vehiculo.patente}</td>
            <td>${vehiculo.marca}</td>
            <td>${vehiculo.modelo}</td>
            <td>${vehiculo.anio}</td>
            <td>${vehiculo.cliente}</td>
            <td>${vehiculo.estado}</td>
        </tr>
    `).join("");
}