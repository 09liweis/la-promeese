import React from 'react';

import Employees from '../components/Employees.jsx';
import EmployeesMaterial from '../components/EmployeesMaterial.jsx';
import Offices from '../components/Offices.jsx';
import Agencies from '../components/Agencies.jsx';

class CMS extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return [
            <Employees />,
            <EmployeesMaterial />,
            <Offices />,
            <Agencies />
        ];
    }
}

export default CMS;