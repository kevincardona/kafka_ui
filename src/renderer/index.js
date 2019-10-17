const { ipcRenderer } = require('electron')

var broker = document.getElementById('broker');
var topic = document.getElementById('topic');
var message = document.getElementById('message');
var produce = document.getElementById('submit');

var setForm = (topicvalue, messagevalue) => {
    topic.value = topicvalue
    message.value = messagevalue
}

var addHistory = () => {
    var history = document.getElementById('history');
    console.log(history.innerHTML)
    if (history.innerHTML.includes("<br>No History")) {
        history.innerHTML = ""
    }
    var item = document.createElement('li');
    var button = document.createElement('button');
    button.innerHTML =  `
        <h3>Topic</h3>${topic.value}<br><h3>Message</h3>${message.value}
    `
    button.addEventListener('click', function(topicvalue, messagevalue) {
        return function(event) {
            setForm(topicvalue, messagevalue)
        }
    }(topic.value, message.value))
    button.setAttribute('class', "history-item")
    item.appendChild(button);
    history.insertBefore(item, history.firstChild)
}

produce.addEventListener('click', ()=> {
    data = {
        topic: topic.value,
        message: message.value,
        broker: broker.value
    }
    ipcRenderer.send('produce-message', data)
    addHistory()
})