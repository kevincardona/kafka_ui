const {app, BrowserWindow, ipcMain} = require("electron");
var kafka = require('kafka-node');
const path = require("path");
const isDev = require("electron-is-dev");
let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    title: "Kafka UI",
    width: 900,
    height: 680,
    webPreferences: {
      nodeIntegration: true
    }
  });
  mainWindow.loadURL(
    isDev ?
    "http://localhost:3000" :
    `file://${path.join(__dirname, "../build/index.html")}`
  );
  mainWindow.on("closed", () => (mainWindow = null));
}
app.on("ready", createWindow);

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (mainWindow === null) {
    createWindow();
  }
});


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