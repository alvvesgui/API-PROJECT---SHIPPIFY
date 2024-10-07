const driverService = require('../services/driverService');

// Criar um novo motorista
const createDriver = async (req, res) => {
    try {
        const driverData = req.body;
        const newDriver = await driverService.createDriver(driverData);
        res.status(201).json(newDriver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar todos os motoristas
const getAllDrivers = async (req, res) => {
    try {
        const filters = req.query; // Filtra por cidade ou status
        const drivers = await driverService.getAllDrivers(filters);
        res.status(200).json(drivers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Recuperar motorista por ID
const getDriverById = async (req, res) => {
    try {
        const { id } = req.params;
        const driver = await driverService.getDriverById(id);
        if (!driver) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }
        res.status(200).json(driver);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Atualizar motorista
const updateDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const driverData = req.body;
        const updatedDriver = await driverService.updateDriver(id, driverData);
        if (!updatedDriver) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }
        res.status(200).json(updatedDriver);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Excluir motorista
const deleteDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedDriver = await driverService.deleteDriver(id);
        if (!deletedDriver) {
            return res.status(404).json({ message: 'Motorista não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createDriver,
    getAllDrivers,
    getDriverById,
    updateDriver,
    deleteDriver,
};
