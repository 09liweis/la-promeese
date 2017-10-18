import React from 'react';

import Employees from '../components/Employees.jsx';

class CMS extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return [
            <Employees />
        ];
    }
}

export default CMS;