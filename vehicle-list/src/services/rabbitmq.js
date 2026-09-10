const amqp = require("amqplib");
const Vehicle = require("../models/Vehicle");

const QUEUE = "vehicle.created";

async function startConsumer() {
  try {
    const connection = await amqp.connect(
      process.env.RABBITMQ_URL || "amqp://localhost:5672"
    );

    const channel = await connection.createChannel();

    await channel.assertQueue(QUEUE, { durable: true });

    console.log("RabbitMQ conectado");
    console.log("Aguardando novos veículos...");

    channel.consume(QUEUE, async (message) => {
      if (!message) return;

      try {
        const vehicle = JSON.parse(message.content.toString());

        await Vehicle.updateOne(
          { registrationId: vehicle.id },
          {
            registrationId: vehicle.id,
            brand: vehicle.brand,
            model: vehicle.model,
            year: vehicle.year,
            color: vehicle.color,
            plate: vehicle.plate
          },
          { upsert: true }
        );

        channel.ack(message);

        console.log(`Veículo ${vehicle.plate} adicionado à lista`);
      } catch (error) {
        console.error("Erro ao processar veículo:", error);
        channel.nack(message, false, false);
      }
    });
  } catch (error) {
    console.error("Erro ao conectar ao RabbitMQ:", error);
    throw error;
  }
}

module.exports = { startConsumer };