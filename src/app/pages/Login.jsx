import React from 'react';
import $ from 'jquery';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {
                emai: '',
                password: ''   
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
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
                    _this.props.handleLogin(res.data);
                } else {
                    console.log('fail');
                }
            }
        });
    }
    render() {
        return (
            <form id="login" autoComplete="false" className="container card" onSubmit={this.handleLogin}>
                <h1 className="is-size-1 has-text-centered">后台管理登陆</h1>
                <div className="field">
                    <label className="label">Email</label>
                    <div className="control">
                        <input className="input" type="text" name="email" onChange={this.handleChange} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">Password</label>
                    <div className="control">
                        <input className="input" type="password" name="password" onChange={this.handleChange} />
                    </div>
                </div>
                <button className="button is-primary">Login</button>
            </form>
        );
    }
}

export default Login;