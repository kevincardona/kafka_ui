var textareas = document.getElementsByTagName('textarea');
var count = textareas.length;
for(var i=0;i<count;i++){
    textareas[i].onkeydown = function(e){
        if(e.keyCode==9 || e.which==9){
            e.preventDefault();
            var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1; 
        }
    }
}

var broker = document.getElementById('broker');
var topic = document.getElementById('topic');
var message = document.getElementById('message');
var produce = document.getElementById('produce');

var setForm = (topicvalue, messagevalue) => {
    topic.value = topicvalue
    message.value = messagevalue
}

produce.addEventListener('click', ()=> {
    const params = {
        headers: {
            "Accept": 'application/json',
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            topic: topic.value,
            message: JSON.parse(message.value),
            broker: broker.value
        }),
        method: "POST"
    };

    fetch("http://localhost:12412/produce", params).then(data => {
        return data.json()
    }).then(res => {
        console.log(res);
    }).catch(err => {
        console.log(err)
    })
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
    var history = document.getElementById('history');
    history.insertBefore(item, history.firstChild)
})