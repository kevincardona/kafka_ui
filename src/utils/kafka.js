var kafka = require('kafka-node');

var produceMessage = (broker, topic, message) => {
    var producer
    if(!broker)
      producer = new kafka.Producer(new kafka.KafkaClient())
    else
      producer = new kafka.Producer(new kafka.KafkaClient({kafkaHost: broker}))
      
    producer.send([{topic: topic, messages: [message]}], (res) => {
      console.log(res)
    })
}

var functions = {
  produceMessage: produceMessage
}

module.exports = functions