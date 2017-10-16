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
            <nav className="navbar is-light" role="navigation" aria-label="main navigation">
                <div className="navbar-brand">
                    <Link to="/admin" className="navbar-item">
                        <h2>La Promeese</h2>
                    </Link>
                </div>
                <div className="navbar-start">
                    <Link to="/admin" className="navbar-item">
                        Home
                    </Link>
                    { this.state.user.id != 0 ?
                    <a className="button is-danger" onClick={this.logout}>Logout</a>
                    : null}
                </div>
            </nav>
        );
    }

}

export default Header;