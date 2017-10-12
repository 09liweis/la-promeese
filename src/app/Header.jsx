import React from 'react';
import { Link } from 'react-router-dom'

class Header extends React.Component {

    constructor(props) {
        super(props);
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
                    <Link to="/admin/student/add" className="navbar-item">
                        Add
                    </Link>
                </div>
            </nav>
        );
    }

}

export default Header;