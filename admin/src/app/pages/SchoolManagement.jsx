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
        const freeServicesParams = {
            is_free: '1'
        };
        const highSchoolPaidParams = {
            id: 4
        };
        return (
            <div id="schoolmanagement">
                <SchoolCMS title="业绩学校管理" servicesURL={api.getServicesBy()} params={freeServicesParams} subServicesURL={api.getSubServices()} upsert={api.getUpsertSubService()} />
                <SchoolCMS title="收费高中学校管理" servicesURL={api.getServicesBy()} params={highSchoolPaidParams} subServicesURL={api.getSubServices()} upsert={api.getUpsertSubService()} />
            </div>
        );
    }
}

export default SchoolManagement;