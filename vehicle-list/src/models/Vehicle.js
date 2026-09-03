const mongoose = require("mongoose");

const vehicleSchema = new mongoose.Schema(
  {
    registrationId: {
      type: String,
      required: true,
      unique: true,
    },

    brand: {
      type: String,
      required: true,
    },

    model: {
      type: String,
      required: true,
    },

    year: {
      type: Number,
      required: true,
    },

    color: {
      type: String,
      required: true,
    },

    plate: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Vehicle", vehicleSchema);