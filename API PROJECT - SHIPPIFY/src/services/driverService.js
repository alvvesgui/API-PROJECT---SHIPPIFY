const db = require('../config/db');

// Função para criar um novo motorista
const createDriver = async (driverData) => {
    const { firstName, lastName, email, phone, companyId, city } = driverData;

    // Verifica se o e-mail é único
    const [existingDriver] = await db.query('SELECT * FROM drivers WHERE email = ?', [email]);
    if (existingDriver.length > 0) {
        throw new Error('O e-mail já está em uso.');
    }

    // Verifica se a empresa existe
    const [existingCompany] = await db.query('SELECT * FROM companies WHERE id = ?', [companyId]);
    if (existingCompany.length === 0) {
        throw new Error('A empresa não existe.');
    }

    // Insere o novo motorista no banco de dados
    const [result] = await db.query('INSERT INTO drivers (firstName, lastName, email, phone, companyId, city) VALUES (?, ?, ?, ?, ?, ?)', 
    [firstName, lastName, email, phone, companyId, city]);

    return { id: result.insertId, ...driverData };
};

// Função para listar todos os motoristas
const getAllDrivers = async (filters = {}) => {
    const { city, status } = filters;

    let query = 'SELECT * FROM drivers';
    const queryParams = [];

    if (city || status) {
        query += ' WHERE';
        if (city) {
            query += ' city = ?';
            queryParams.push(city);
        }
        if (status) {
            query += city ? ' AND' : '';
            query += ' status = ?';
            queryParams.push(status);
        }
    }

    const [drivers] = await db.query(query, queryParams);
    return drivers;
};

// Outras funções como updateDriver e deleteDriver podem ser adicionadas aqui.

module.exports = {
    createDriver,
    getAllDrivers,
    // Exporte outras funções que você criar
};
