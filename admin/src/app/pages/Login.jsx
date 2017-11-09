import React from 'react';
import $ from 'jquery';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                emai: '',
                password: ''   
            },
            error: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
    }
    componentDidMount() {
        this.emailInput.focus(); 
    }
    handleChange(e) {
        const p = e.target.name;
        const v = e.target.value;
        var user = this.state.user;
        user[p] = v;
        this.setState({
            user: user
        });
    }
    handleLogin(e) {
        const _this = this;
        const user = this.state.user;
        e.preventDefault();
        $.ajax({
            url: '/admin/controllers/employee.php?action=login',
            method: 'POST',
            data: {user: user},
            success(res) {
                if (res.code == 200) {
                    _this.setState({
                        error: false
                    });
                    _this.props.handleLogin(res.data);
                } else {
                    _this.setState({
                        error: true
                    });
                }
            }
        });
    }
    render() {
        return (
            <form id="login" autoComplete="false" className="container card" onSubmit={this.handleLogin}>
                <h1 className="is-size-2 has-text-centered">La Promesse Management System</h1>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="text" name="email" onChange={this.handleChange} ref={(input) => { this.emailInput = input; }} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" name="password" onChange={this.handleChange} />
                    </div>
                </div>
                <button className="button is-primary">Login</button>
                {(this.state.error) ?
                <div className="notification is-danger">
                  Email or Password is not correct.
                </div>
                :null
                }
            </form>
        );
    }
}

export default Login;