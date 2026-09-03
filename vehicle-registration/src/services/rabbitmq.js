const amqp = require("amqplib");

let channel;

const QUEUE = "vehicle.created";

async function connectRabbitMQ() {
  const connection = await amqp.connect(
    process.env.RABBITMQ_URL || "amqp://localhost:5672"
  );

  channel = await connection.createChannel();

  await channel.assertQueue(QUEUE, {
    durable: true,
  });

  console.log("RabbitMQ conectado");
}

function publishVehicleCreated(vehicle) {
  if (!channel) {
    throw new Error("RabbitMQ não está conectado");
  }

  channel.sendToQueue(
    QUEUE,
    Buffer.from(JSON.stringify(vehicle)),
    {
      persistent: true,
    }
  );

  console.log("Evento vehicle.created publicado");
}

module.exports = {
  connectRabbitMQ,
  publishVehicleCreated,
};