const db = require('../config/db');

class Driver {
    // Método para criar um novo motorista
    static async create(firstName, lastName, email, phone, companyId, city, status) {
        const query = `
            INSERT INTO drivers (firstName, lastName, email, phone, companyId, city, status)
            VALUES (?, ?, ?, ?, ?, ?, ?);
        `;
        const [result] = await db.execute(query, [firstName, lastName, email, phone, companyId, city, status]);
        return result;
    }

    // Método para listar todos os motoristas
    static async findAll() {
        const query = `
            SELECT * FROM drivers;
        `;
        const [rows] = await db.execute(query);
        return rows;
    }

    // Método para encontrar um motorista por ID
    static async findById(id) {
        const query = `
            SELECT * FROM drivers WHERE id = ?;
        `;
        const [rows] = await db.execute(query, [id]);
        return rows[0]; // Retorna o motorista encontrado ou undefined se não existir
    }

    // Método para atualizar um motorista
    static async update(id, firstName, lastName, email, phone, companyId, city, status) {
        const query = `
            UPDATE drivers 
            SET firstName = ?, lastName = ?, email = ?, phone = ?, companyId = ?, city = ?, status = ? 
            WHERE id = ?;
        `;
        const [result] = await db.execute(query, [firstName, lastName, email, phone, companyId, city, status, id]);
        return result;
    }

    // Método para deletar um motorista
    static async delete(id) {
        const query = `
            DELETE FROM drivers WHERE id = ?;
        `;
        const [result] = await db.execute(query, [id]);
        return result;
    }
}

module.exports = Driver;
