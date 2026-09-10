const express = require("express");
const Vehicle = require("../models/Vehicle");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const { brand, year } = req.query;
    const filter = {};

    if (brand) {
      filter.brand = new RegExp(brand, "i");
    }

    if (year) {
      filter.year = Number(year);
    }

    const vehicles = await Vehicle.find(filter);

    res.json({
      total: vehicles.length,
      vehicles
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao buscar veículos"
    });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const vehicle = await Vehicle.findOne({
      registrationId: req.params.id
    });

    if (!vehicle) {
      return res.status(404).json({
        message: "Veículo não encontrado"
      });
    }

    res.json(vehicle);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Erro ao buscar veículo"
    });
  }
});

module.exports = router;
