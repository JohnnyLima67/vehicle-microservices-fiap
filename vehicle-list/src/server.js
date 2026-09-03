const express = require("express");
const mongoose = require("mongoose");
const swaggerUi = require("swagger-ui-express");

const vehicleRoutes = require("./routes/vehicleRoutes");
const { startConsumer } = require("./services/rabbitmq");
const swaggerDocument = require("./swagger.json");

const app = express();

app.use(express.json());

app.use("/vehicles", vehicleRoutes);

app.use(
  "/api-docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument)
);

const PORT = process.env.PORT || 3002;

const MONGO_URL =
  process.env.MONGO_URL ||
  "mongodb://localhost:27017/vehicle_list";

async function start() {
  try {
    await mongoose.connect(MONGO_URL);

    console.log("MongoDB conectado");

    await startConsumer();

    app.listen(PORT, () => {
      console.log(
        `Vehicle List rodando na porta ${PORT}`
      );
    });
  } catch (error) {
    console.error("Erro ao iniciar aplicação:", error);
    process.exit(1);
  }
}

start();