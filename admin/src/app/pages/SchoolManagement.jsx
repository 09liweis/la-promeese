import React from 'react';
import SchoolCMS from '../components/SchoolCMS.jsx';

import Api from '../services/api.js';
const api = new Api();

class SchoolManagement extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        
    }
    getSchools(service_id) {
        
    }
    
    render() {
        return (
            <div id="schoolmanagement">
                <SchoolCMS title="业绩学校管理" servicesURL={api.getFreeServices()} subServicesURL={api.getSubServices()} upsert={api.getUpsertSubService()} />
            </div>
        );
    }
}

export default SchoolManagement;