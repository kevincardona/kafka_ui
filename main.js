const {app, BrowserWindow, ipcMain} = require('electron')
var kafka = require('kafka-node');
var path = require('path')

function createWindow () {
  let win = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      nodeIntegration: true
    },
    icon: path.join(__dirname, './public/icons/64x64.png')
  })

  win.loadFile('public/index.html')
}

ipcMain.on('produce-message', (event, data) => {
  var producer
  if(!data.broker)
    producer = new kafka.Producer(new kafka.KafkaClient())
  else
    producer = new kafka.Producer(new kafka.KafkaClient({kafkaHost: data.broker}))
    
  producer.send([{topic: data.topic, messages: [data.message]}], (res) => {
    event.returnValue = 'pong'
  })
})

app.on('ready', createWindow)