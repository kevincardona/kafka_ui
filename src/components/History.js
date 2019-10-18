import React from 'react';
import '../styles/components/History.css'

export class History extends React.Component {
  render(){
    return(
      <div className="block">
        <a className="link-top" href="#producer">Producer ⤴</a>
        <div>
          <h2>History</h2>
          <ul id="history">
            <br/>No History
          </ul>
        </div>
      </div>
    )
  }
}

