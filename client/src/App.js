import React, { Component } from 'react';
import './App.css';
import SocketIOClient from 'socket.io-client';
import NewUserForm from './components/NewUserForm';
import MessageBoard from './components/Messageboard';
import NewMessageForm from './components/NewMessageForm';

class App extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      endpoint: "192.168.1.81:48618",
      username: "",
      allMessages: [{username: "server", message: "joining chatroom"}]
    };
  }

  componentWillMount = () => {
    let socket = SocketIOClient(this.state.endpoint);

    socket.on('get_all_messages', data => {
      this.setState({
        allMessages: data.messages
      });
    });

    socket.on('receive_new_message', data => {
      let allMessages = [...this.state.allMessages];
      
      let newMsg = {
        username: data.username,
        message: data.message
      };

      allMessages.push({
        username: data.username,
        message: data.message
      });

      this.setState({
        allMessages: allMessages
      });
    });
  }

  onUsernameSubmit = (username) => {
    if (username.length > 0) {
      this.setState({ username: username });

      const socket = SocketIOClient(this.state.endpoint);
      socket.emit('new_user', { username: username });
    }
  }

  onNewMessage = (newMessage) => {
    if (newMessage.length > 0) {
      let newMsg = {
        username: this.state.username,
        message: newMessage
      };

      const socket = SocketIOClient(this.state.endpoint);
      socket.emit('send_new_message', newMsg);
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {
            this.state.username.length > 0 ?
            <>
              <h3>Signed on as {this.state.username}</h3>
              <MessageBoard messages={this.state.allMessages} />
              <NewMessageForm onNewMessage={this.onNewMessage} />
            </>
            :
            <NewUserForm onUsernameSubmit={this.onUsernameSubmit} />
          }
        </header>
      </div>
    );
  }
}

export default App;