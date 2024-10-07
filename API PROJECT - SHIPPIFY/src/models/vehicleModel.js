const db = require('../config/db');

class Vehicle {
    // Método para registrar um novo veículo
    static async create(plate, model, type, capacity, driverId) {
        const query = `
            INSERT INTO vehicles (plate, model, type, capacity, driverId)
            VALUES (?, ?, ?, ?, ?);
        `;
        const [result] = await db.execute(query, [plate, model, type, capacity, driverId]);
        return result;
    }

    // Método para listar todos os veículos
    static async findAll() {
        const query = `
            SELECT * FROM vehicles;
        `;
        const [rows] = await db.execute(query);
        return rows;
    }

    // Método para encontrar um veículo por ID
    static async findById(id) {
        const query = `
            SELECT * FROM vehicles WHERE id = ?;
        `;
        const [rows] = await db.execute(query, [id]);
        return rows[0]; // Retorna o veículo encontrado ou undefined se não existir
    }

    // Método para atualizar um veículo
    static async update(id, plate, model, type, capacity, driverId) {
        const query = `
            UPDATE vehicles 
            SET plate = ?, model = ?, type = ?, capacity = ?, driverId = ? 
            WHERE id = ?;
        `;
        const [result] = await db.execute(query, [plate, model, type, capacity, driverId, id]);
        return result;
    }

    // Método para deletar um veículo
    static async delete(id) {
        const query = `
            DELETE FROM vehicles WHERE id = ?;
        `;
        const [result] = await db.execute(query, [id]);
        return result;
    }
}

module.exports = Vehicle;
