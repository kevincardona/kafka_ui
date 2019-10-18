const {ipcMain} = require("electron");
var kafka = require('kafka-node');

ipcMain.on('produce-message', (event, data) => {
  var producer
  if(!data.broker)
    producer = new kafka.Producer(new kafka.KafkaClient())
  else
    producer = new kafka.Producer(new kafka.KafkaClient({kafkaHost: data.broker}))
    
  producer.send([{topic: data.topic, messages: [data.message]}], (res) => {
    event.returnValue = 'pong'
  })
});