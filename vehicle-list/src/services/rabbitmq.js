const amqp = require("amqplib");
const Vehicle = require("../models/Vehicle");

const QUEUE = "vehicle.created";

async function startConsumer() {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost:5672"
  );

  const channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, {
    durable: true,
  });

  console.log("RabbitMQ conectado");
  console.log("Aguardando eventos de veículos...");

  channel.consume(QUEUE, async (message) => {
    if (!message) {
      return;
    }

    try {
      const vehicle = JSON.parse(
        message.content.toString()
      );

      console.log("Evento recebido:", vehicle);

      await Vehicle.updateOne(
        {
          registrationId: vehicle.id,
        },
        {
          registrationId: vehicle.id,
          brand: vehicle.brand,
          model: vehicle.model,
          year: vehicle.year,
          color: vehicle.color,
          plate: vehicle.plate,
        },
        {
          upsert: true,
        }
      );

      channel.ack(message);

      console.log(
        `Veículo ${vehicle.plate} armazenado no serviço de listagem`
      );
    } catch (error) {
      console.error(
        "Erro ao processar evento:",
        error
      );

      channel.nack(message, false, false);
    }
  });
}

module.exports = {
  startConsumer,
};