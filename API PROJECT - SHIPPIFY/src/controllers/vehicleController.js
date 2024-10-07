const vehicleService = require('../services/vehicleService');

// Registrar um novo veículo
const createVehicle = async (req, res) => {
    try {
        const vehicleData = req.body;
        const newVehicle = await vehicleService.createVehicle(vehicleData);
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// Listar veículos por motorista
const getVehiclesByDriver = async (req, res) => {
    try {
        const { id } = req.params;
        const vehicles = await vehicleService.getVehiclesByDriver(id);
        if (!vehicles.length) {
            return res.status(404).json({ message: 'Nenhum veículo encontrado para este motorista' });
        }
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Excluir veículo
const deleteVehicle = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedVehicle = await vehicleService.deleteVehicle(id);
        if (!deletedVehicle) {
            return res.status(404).json({ message: 'Veículo não encontrado' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    createVehicle,
    getVehiclesByDriver,
    deleteVehicle,
};
