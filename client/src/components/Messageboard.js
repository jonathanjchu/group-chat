import React, { Component } from 'react';
import '../App.css';

class MessageBoard extends Component {

  render() {
    console.log(this.props);

    return (
      <div id="message_board">
        {
          this.props.messages.map((msg, i) => 
            <div key={i} className="message_row">
              <div className="message_user">
                {msg.username}: 
              </div>
              <div className="message_message">
                {msg.message}
              </div>
            </div>
          )
        }
      </div>
    );
  }
}

export default MessageBoard;