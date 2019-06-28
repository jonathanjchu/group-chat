import React, { Component } from 'react';
import '../App.css';

class NewMessageForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      newMsg: ""
    };
  }

  onNewMsgSubmit = (e) => {
    e.preventDefault();

    if (this.state.newMsg.length > 0) {
      this.props.onNewMessage(this.state.newMsg);

      this.setState({
        newMsg: ""
      });
    }
  }

  onMsgChange = (e) => {
    this.setState({ newMsg: e.target.value });
  }

  render() {
    return (
        <form className="form" onSubmit={this.onNewMsgSubmit}>
          <input type="text" className="new_message"
            onChange={this.onMsgChange}
            value={this.state.newMsg} />
          <input type="submit" value="Send" />
        </form>
    );
  }
}

export default NewMessageForm;