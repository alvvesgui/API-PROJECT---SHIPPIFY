const db = require('../config/db');

// Função para registrar um novo veículo
const createVehicle = async (vehicleData) => {
    const { plate, model, type, capacity, driverId } = vehicleData;

    // Verifica se o motorista existe
    const [existingDriver] = await db.query('SELECT * FROM drivers WHERE id = ?', [driverId]);
    if (existingDriver.length === 0) {
        throw new Error('O motorista não existe.');
    }

    // Insere o novo veículo no banco de dados
    const [result] = await db.query('INSERT INTO vehicles (plate, model, type, capacity, driverId) VALUES (?, ?, ?, ?, ?)', 
    [plate, model, type, capacity, driverId]);

    return { id: result.insertId, ...vehicleData };
};

// Função para listar todos os veículos
const getAllVehicles = async () => {
    const [vehicles] = await db.query('SELECT * FROM vehicles');
    return vehicles;
};

// Outras funções como updateVehicle e deleteVehicle podem ser adicionadas aqui.

module.exports = {
    createVehicle,
    getAllVehicles,
    // Exporte outras funções que você criar
};
