import React from 'react';
import axios from 'axios';

import Dropdown from '../elements/Dropdown.jsx';
import Api from '../services/api.js';
const api = new Api();

class FreeSchools extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            service_id: '',
            schools: [],
            school: {
                id: 0,
                name: ''
            }
        };
    }
    componentDidMount() {
        axios.get(api.getFreeServices()).then((res) => {
            this.setState({
                services: res.data
            });
        })
        .catch(function (error) {
            console.log(error);
        });
    }
    handleChange(e) {
        
    }
    render() {
        const {service_id} = this.state;
        const services = this.state.services.map((s) => 
            <option key={s.id} value={s.id}>{s.name}</option>
        );
        return (
            <div className="card">
                <h1 className="is-size-2 has-text-centered">业绩学校管理</h1>
                <div className="columns">
                    <div className="column">
                        <Dropdown title={'服务'} name={'service_id'} value={service_id} handleChange={this.handleChange} options={services} />
                    </div>
                    <div className="column">
                        <h2>学校</h2>
                        
                    </div>
                </div>
            </div>
        );
    }
}

export default FreeSchools;