var kafka = require('kafka-node');
var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var path = require('path');
var open = require('open');
var DEBUG = true

if (!DEBUG) {
  (async () => {
    await open('http://localhost:12412', {app: 'google chrome'});
  })();
}
app.use(express.static('public'))
app.use(bodyParser.json());

app.post('/produce', (req, res) => {
  var producer
  if(!req.body.broker)
    producer = new kafka.Producer(new kafka.KafkaClient())
  else
    producer = new kafka.Producer(new kafka.KafkaClient({kafkaHost: req.body.broker}))
    
  producer.send([{topic: req.body.topic, messages: [req.body.message]}], (data) => {
    console.log(data)
    res.send({message:"OK"})
  })
})

app.listen(12412);

