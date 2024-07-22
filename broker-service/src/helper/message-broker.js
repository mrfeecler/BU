const amqp = require("amqplib");
const { queueDataFormat, SEED_QUEUE_NAME } = require("./const-variable");

class MessageBroker {
  static async sendMessage(datas, dataType) {
    try {
      const rabbitmqUrl = "amqp://localhost:5672";
      const connection = await amqp.connect(rabbitmqUrl);
      const channel = await connection.createChannel();
      await channel.assertQueue(SEED_QUEUE_NAME, { durable: false });
      const data = queueDataFormat(dataType, datas);
      channel.sendToQueue(SEED_QUEUE_NAME, Buffer.from(data));
      setTimeout(() => {
        connection.close();
        process.exit(0);
      }, 500);
    } catch (error) {
      console.error(error);
    }
  }
}
module.exports = MessageBroker;
