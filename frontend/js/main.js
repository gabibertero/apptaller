import { getAll } from "./storage/vehiculos.js";

const vehiculos = getAll();
const vehiculosActivos = vehiculos.filter((vehiculo) => vehiculo.estado !== "Entregado");
const vehiculosPendientes = vehiculos.filter((vehiculo) => vehiculo.estado === "Recibido" || vehiculo.estado === "En diagnóstico");
const vehiculosListos = vehiculos.filter((vehiculo) => vehiculo.estado === "Listo para entregar");

document.getElementById("count-vehiculos").textContent = String(vehiculosActivos.length);
document.getElementById("count-pendientes").textContent = String(vehiculosPendientes.length);
document.getElementById("count-listos").textContent = String(vehiculosListos.length);
