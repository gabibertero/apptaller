const STORAGE_KEY = "vehiculos";
const PATENTE_REGEX = /^[A-Z0-9]{6,7}$/i;
const LEGACY_ESTADO = "En el taller";
const DEFAULT_ESTADO = "Recibido";

/**
 * @typedef {Object} Vehiculo
 * @property {string} id UUID o string unico
 * @property {string} patente Unica, case-insensitive
 * @property {string} marca
 * @property {string} modelo
 * @property {string|number} anio
 * @property {string} cliente Texto libre por ahora
 * @property {string} estado Uno del enum VEHICULO_ESTADOS
 */

export const VEHICULO_ESTADOS = Object.freeze([
    "Recibido",
    "En diagnóstico",
    "Reparando",
    "Listo para entregar",
    "Entregado"
]);

export class ValidationError extends Error {
    constructor(errors) {
        super("Los datos del vehiculo no son validos.");
        this.name = "ValidationError";
        this.errors = errors;
    }
}

function normalizeText(value) {
    return String(value ?? "").trim();
}

function normalizePatente(value) {
    return normalizeText(value).toUpperCase();
}

function normalizeEstado(value) {
    const estado = normalizeText(value);

    if (!estado) {
        return DEFAULT_ESTADO;
    }

    if (estado.toLowerCase() === LEGACY_ESTADO.toLowerCase()) {
        return DEFAULT_ESTADO;
    }

    return VEHICULO_ESTADOS.includes(estado) ? estado : DEFAULT_ESTADO;
}

function generateId() {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") {
        return globalThis.crypto.randomUUID();
    }

    return `v_${Date.now()}_${Math.random().toString(36).slice(2)}`;
}

function readStorage() {
    const rawData = localStorage.getItem(STORAGE_KEY);

    if (!rawData) {
        return [];
    }

    try {
        const parsed = JSON.parse(rawData);
        return Array.isArray(parsed) ? parsed : [];
    } catch {
        return [];
    }
}

function persistVehiculos(vehiculos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(vehiculos));
}

function migrateVehiculo(rawVehiculo) {
    if (!rawVehiculo || typeof rawVehiculo !== "object") {
        return { vehiculo: null, changed: true };
    }

    const id = normalizeText(rawVehiculo.id) || generateId();
    const patente = normalizePatente(rawVehiculo.patente);
    const marca = normalizeText(rawVehiculo.marca);
    const modelo = normalizeText(rawVehiculo.modelo);
    const anio = normalizeText(rawVehiculo.anio);
    const cliente = normalizeText(rawVehiculo.cliente);
    const estado = normalizeEstado(rawVehiculo.estado);

    const vehiculo = {
        id,
        patente,
        marca,
        modelo,
        anio,
        cliente,
        estado
    };

    const changed =
        id !== normalizeText(rawVehiculo.id) ||
        patente !== normalizePatente(rawVehiculo.patente) ||
        marca !== normalizeText(rawVehiculo.marca) ||
        modelo !== normalizeText(rawVehiculo.modelo) ||
        anio !== normalizeText(rawVehiculo.anio) ||
        cliente !== normalizeText(rawVehiculo.cliente) ||
        estado !== normalizeText(rawVehiculo.estado);

    return { vehiculo, changed };
}

function validateVehiculoData(datos, vehiculos, currentId = null, requireEstado = false) {
    const errors = {};
    const patente = normalizePatente(datos.patente);
    const marca = normalizeText(datos.marca);
    const modelo = normalizeText(datos.modelo);
    const anio = normalizeText(datos.anio);
    const cliente = normalizeText(datos.cliente);
    const estado = normalizeText(datos.estado);

    if (!patente) {
        errors.patente = "La patente es obligatoria.";
    } else if (!PATENTE_REGEX.test(patente)) {
        errors.patente = "La patente debe tener 6 o 7 caracteres alfanumericos.";
    } else if (vehiculos.some((vehiculo) => vehiculo.id !== currentId && normalizePatente(vehiculo.patente) === patente)) {
        errors.patente = "Ya existe un vehiculo con esa patente.";
    }

    if (!marca) {
        errors.marca = "La marca es obligatoria.";
    }

    if (!modelo) {
        errors.modelo = "El modelo es obligatorio.";
    }

    if (!anio) {
        errors.anio = "El anio es obligatorio.";
    } else {
        const anioNumero = Number(anio);

        if (!Number.isInteger(anioNumero) || anioNumero < 1950 || anioNumero > 2030) {
            errors.anio = "El anio debe estar entre 1950 y 2030.";
        }
    }

    if (!cliente) {
        errors.cliente = "El cliente es obligatorio.";
    }

    if (requireEstado) {
        if (!estado) {
            errors.estado = "El estado es obligatorio.";
        } else if (!VEHICULO_ESTADOS.includes(estado)) {
            errors.estado = "Selecciona un estado valido.";
        }
    }

    if (Object.keys(errors).length > 0) {
        throw new ValidationError(errors);
    }

    return {
        patente,
        marca,
        modelo,
        anio,
        cliente,
        estado: requireEstado ? estado : DEFAULT_ESTADO
    };
}

export function getAll() {
    const rawVehiculos = readStorage();
    let changed = false;

    const vehiculos = rawVehiculos.reduce((collection, rawVehiculo) => {
        const migrated = migrateVehiculo(rawVehiculo);

        changed = changed || migrated.changed;

        if (migrated.vehiculo) {
            collection.push(migrated.vehiculo);
        }

        return collection;
    }, []);

    if (changed) {
        persistVehiculos(vehiculos);
    }

    return vehiculos;
}

export function getById(id) {
    const targetId = normalizeText(id);

    if (!targetId) {
        return null;
    }

    return getAll().find((vehiculo) => vehiculo.id === targetId) ?? null;
}

export function add(datos) {
    const vehiculos = getAll();
    const vehiculo = {
        id: generateId(),
        ...validateVehiculoData(datos, vehiculos)
    };

    vehiculos.push(vehiculo);
    persistVehiculos(vehiculos);

    return vehiculo;
}

export function update(id, datos) {
    const targetId = normalizeText(id);
    const vehiculos = getAll();
    const index = vehiculos.findIndex((vehiculo) => vehiculo.id === targetId);

    if (index === -1) {
        return null;
    }

    const updatedVehiculo = {
        id: targetId,
        ...validateVehiculoData(datos, vehiculos, targetId, true)
    };

    vehiculos[index] = updatedVehiculo;
    persistVehiculos(vehiculos);

    return updatedVehiculo;
}

export function remove(id) {
    const targetId = normalizeText(id);
    const vehiculos = getAll();
    const filteredVehiculos = vehiculos.filter((vehiculo) => vehiculo.id !== targetId);

    if (filteredVehiculos.length === vehiculos.length) {
        return false;
    }

    persistVehiculos(filteredVehiculos);
    return true;
}
