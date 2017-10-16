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
      user: {id: 0}
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
            user: res.data
          });
        }
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
    this.setState({
      user: {id: 0},
      login: false
    });
  }
  render() {
    return (
      <div className="wrapper">
        <Header user={this.state.user} handleLogout={this.handleLogout} />
        {this.state.login ?
        <Main />
        : <Login handleLogin={this.handleLogin} />
        }
      </div>
    );
  }
}

export default App;