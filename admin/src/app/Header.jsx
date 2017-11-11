import React from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user
        };
        this.logout = this.logout.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            user: nextProps.user
        });
    }
    logout() {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/employee.php?action=logout',
            success(res) {
                _this.props.handleLogout();
            }
        });
    }
    render() {
        return (
            <nav className="navbar is-light is-primary" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/admin" className="navbar-item">
                        <h2>La Promesse</h2>
                    </Link>
                </div>
                <div className="navbar-start">
                    <Link to="/admin" className="navbar-item">Home</Link>
                    {this.state.user.id != 0 ?
                    <Link to="/admin/students" className="navbar-item">Clients</Link>
                    :null}
                    {this.state.user.admin_level == 1 ?
                    <Link to="/admin/cms" className="navbar-item">Admin</Link>
                    : null}
                </div>
                { this.state.user.id != 0 ?
                <div className="navbar-end">
                    <div className="navbar-item">
                        <h3>{this.state.user.name}</h3>
                        <h4>Level: {this.state.user.admin_level}</h4>
                    </div>
                    <div className="navbar-item">
                        <a className="button is-danger" onClick={this.logout}>Logout</a>
                    </div>
                </div>
                : null}
            </nav>
        );
    }

}

export default Header;