import React from 'react';
import '../styles/components/Producer.css'
const { ipcRenderer } = window.require('electron');

export class Producer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      broker: "",
      topic: "",
      message: ""
    }
  }

  updateTopic = (event) => {
    this.setState({topic: event.target.value})
  }
  updateBroker = (event) => {
    this.setState({broker: event.target.value})
  }
  updateMessage = (event) => {
    this.setState({message: event.target.value})
    if (event.keyCode === 9)
      event.preventDefault();
  }

  produce = () =>{
    const {broker, topic, message} = this.state
    var data = {
      topic: topic,
      message: message,
      broker: broker
    }
    ipcRenderer.send('produce-message', data)
  }

  render(){
    return(
      <div className="block" id="producer">
        <h2>Produce Message</h2>
        <div className="row space-between">
          <div>
            <h5>broker</h5>
            <input id="broker" onChange={this.updateBroker} className="input-short" type="text" placeholder="http://localhost:9092"/>
          </div>
          <div>
            <h5>Topic</h5>
            <input id="topic" onChange={this.updateTopic} className="input-short" type="text" placeholder=""/>
          </div>
        </div>
      <h4>Message</h4>
      <textarea id="message" onChange={this.updateMessage} className="input-long" type="text"></textarea>
      <button id="submit" onClick={this.produce} className="submit">Send</button>
      <br/>
      <br/>
      <a className="link-bottom" href="#history">History ⤵</a>   
    </div>
    )
  }
}

