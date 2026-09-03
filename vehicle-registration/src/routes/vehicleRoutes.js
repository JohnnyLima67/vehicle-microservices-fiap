const express = require("express");

const Vehicle = require("../models/Vehicle");
const validateVehicle = require("../middlewares/vehicleValidation");
const {
  publishVehicleCreated,
} = require("../services/rabbitmq");

const router = express.Router();

router.post("/", validateVehicle, async (req, res) => {
  try {
    const vehicle = await Vehicle.create(req.body);

    publishVehicleCreated({
      id: vehicle._id.toString(),
      brand: vehicle.brand,
      model: vehicle.model,
      year: vehicle.year,
      color: vehicle.color,
      plate: vehicle.plate,
      createdAt: vehicle.createdAt,
    });

    return res.status(201).json(vehicle);
  } catch (error) {
    console.error(error);

    if (error.code === 11000) {
      return res.status(409).json({
        message: "Já existe um veículo cadastrado com essa placa",
      });
    }

    return res.status(500).json({
      message: "Erro ao cadastrar veículo",
    });
  }
});

module.exports = router;