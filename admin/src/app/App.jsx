import React from 'react';
import $ from 'jquery';

import Header from './Header.jsx';
import Main from './Main.jsx';
import Login from './pages/Login.jsx';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      login: false,
      user: {id: 0},
      loading: true
    };
    this.handleLogout = this.handleLogout.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  componentDidMount() {
    const _this = this;
    $.ajax({
      url: '/admin/controllers/employee.php?action=checkSession',
      success(res) {
        if (res.code == 200) {
          _this.setState({
            login: true,
            user: res.data,
          });
        }
        setTimeout(() => {
          _this.setState({
            loading: false
          });
        }, 2000);
      }
    });
  }
  handleLogin(user) {
    this.setState({
      user: user,
      login: true
    });
  }
  handleLogout() {
    window.location = '/admin';
  }
  render() {
    return (
      <div className="wrapper">
        {(this.state.loading) ?
        <div className="modal is-active">
        <div id="loading" className="modal-background"></div>
        <div className="button is-primary is-loading">Loading</div>
        </div>
        :null
        }
        <Header user={this.state.user} handleLogout={this.handleLogout} />
        {this.state.login ?
        <Main user={this.state.user} />
        : <Login handleLogin={this.handleLogin} />
        }
      </div>
    );
  }
}

export default App;