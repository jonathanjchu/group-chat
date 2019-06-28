import React, { Component } from 'react';
import '../App.css';

class NewUserForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      username: "",
      canSubmit: false
    };
  }

  onUsernameSubmit = (e) => {
    e.preventDefault();

    if (this.state.username.length > 0 && this.state.username.length < 16) {
      this.props.onUsernameSubmit(this.state.username);
    }
  }

  onUsernameChange = (e) => {
    let canSubmit = this.state.canSubmit;

    if (e.target.value.length > 0 && e.target.value.length < 16) {
      canSubmit = true;
    }

    this.setState({
      username: e.target.value,
      canSubmit: canSubmit
    });
  }

  render() {
    return (
      <div>
        <form className="form" onSubmit={this.onUsernameSubmit}>
          <div className="form-group">
            <label htmlFor="id_username">Enter username: </label>
            <input className="form-control" type="text" name="username" id="id_username" maxLength="15"
              onChange={this.onUsernameChange}
              value={this.state.username} />
          </div>
          <input type="submit" value="OK" disabled={!this.state.canSubmit} />
        </form>
      </div>
    );
  }
}

export default NewUserForm;