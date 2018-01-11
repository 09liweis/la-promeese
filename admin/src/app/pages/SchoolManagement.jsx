import React from 'react';
import axios from 'axios';

import Dropdown from '../elements/Dropdown.jsx';
import TextInput from '../elements/TextInput.jsx';
import Api from '../services/api.js';
const api = new Api();

class SchoolManagement extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            schools: [],
            school: {
                id: 0,
                name: '',
                application_fee: 0,
                service_id: '',
            }
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getSchools = this.getSchools.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.add = this.add.bind(this);
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
    getSchools(service_id) {
        const params = {
            params: {
                id: service_id
            }
        };
        axios.get(api.getSubServices(), params).then((res) => {
            this.setState({
                schools: res.data
            });
        });
    }
    handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;
        const school = this.state.school;
        school[name] = value;
        this.setState({
            school: school
        });
        if (name == 'service_id') {
            this.getSchools(value);
        }
    }
    add() {
        this.setState({
            id: 0,
            name: '',
            application_fee: 0
        });
    }
    handleEdit(school) {
        this.setState({
            school: school
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const school = this.state.school;
        const params = Object.keys(school).map((k) => 
            k + '=' + school[k]
        ).join('&');
        axios.post(api.getUpsertSubService(), params).then((res) => {
            this.setState({
                school: {
                    id: 0,
                    name: '',
                    application_fee: 0
                }
            });
            this.getSchools(school.service_id);
        });
    }
    render() {
        const {school} = this.state;
        const services = this.state.services.map((s) => 
            <option key={s.id} value={s.id}>{s.name}</option>
        );
        const schools = this.state.schools.map((s) => 
            <tr key={s.id}>
                <th>{s.name}</th>
                <th>{s.application_fee}</th>
                <th><a onClick={this.handleEdit.bind(this, s)} className="button is-warning">Edit</a></th>
            </tr>
        );
        return (
            <div className="card">
                <h1 className="is-size-2 has-text-centered">业绩学校管理</h1>
                <div className="columns">
                    <div className="column is-2">
                        <Dropdown title={'服务'} name={'service_id'} value={school.service_id} handleChange={this.handleChange} options={services} />
                    </div>
                    <div className="column">
                        <table className="table is-fullwidth is-striped is-narrow">
                            <thead>
                                <tr>
                                    <th>学校</th>
                                    <th>申请费</th>
                                    <th>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                            {schools}
                            </tbody>
                        </table>
                    </div>
                    <div className="column">
                        <a className="button is-primary" onClick={this.add}>创建新学校</a>
                        <p className="is-italic">注意: 更改学校名字会同时更改业绩里面的学校名字，但不会同时修改首先名字，需要update才会修改首先显示</p>
                        <form className="" onSubmit={this.handleSubmit}>
                            <TextInput title={'学校名字'} name={'name'} value={school.name} handleChange={this.handleChange} />
                            <TextInput title={'申请费'} name={'application_fee'} value={school.application_fee} handleChange={this.handleChange} />
                            <Dropdown title={'服务'} name={'service_id'} value={school.service_id} handleChange={this.handleChange} options={services} />
                            <button className="button is-primary">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

export default SchoolManagement;