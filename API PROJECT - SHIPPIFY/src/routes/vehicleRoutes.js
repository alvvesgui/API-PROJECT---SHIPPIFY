const express = require('express');
const router = express.Router();
const vehicleService = require('../services/vehicleService');

// Rota para registrar um novo veículo
router.post('/', async (req, res) => {
    try {
        const vehicleData = req.body;
        const newVehicle = await vehicleService.createVehicle(vehicleData);
        res.status(201).json(newVehicle);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Rota para listar todos os veículos
router.get('/', async (req, res) => {
    try {
        const vehicles = await vehicleService.getAllVehicles();
        res.status(200).json(vehicles);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Exporte o router
module.exports = router;
