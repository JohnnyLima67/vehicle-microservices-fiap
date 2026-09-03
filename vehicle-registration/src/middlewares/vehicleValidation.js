const Joi = require("joi");

const vehicleSchema = Joi.object({
  brand: Joi.string().min(2).max(50).required(),

  model: Joi.string().min(1).max(50).required(),

  year: Joi.number()
    .integer()
    .min(1886)
    .max(new Date().getFullYear() + 1)
    .required(),

  color: Joi.string().min(2).max(30).required(),

  plate: Joi.string()
    .pattern(/^[A-Z]{3}[0-9][A-Z0-9][0-9]{2}$/)
    .required(),
});

function validateVehicle(req, res, next) {
  const { error } = vehicleSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      message: "Dados do veículo inválidos",
      details: error.details.map((detail) => detail.message),
    });
  }

  next();
}

module.exports = validateVehicle;