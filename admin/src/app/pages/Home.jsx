import React from 'react';
import { Link } from 'react-router-dom'

class Home extends React.Component {
    render() {
        return (
            <div>
                <h1 className="text-center">DashBoard</h1>
                <Link to="/admin/students" className="">Clients</Link>
            </div>
        );
    }
}

export default Home;