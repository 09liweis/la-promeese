import React from 'react';
import $ from 'jquery';

import TextInput from '../elements/TextInput.jsx';
import Api from '../services/api.js';
const api = new Api();

class EmployeesMaterial extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employeesMaterial: [],
            employee: {
                
            }
        };
        this.getEmployeesMaterial = this.getEmployeesMaterial.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.edit = this.edit.bind(this);
        this.setNew = this.setNew.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.remove = this.remove.bind(this);
    }
    componentDidMount() {
        this.getEmployeesMaterial();
    }
    setNew() {
        this.setState({
            employee: {
                id: 0,
                name: '',
            }
        });
    }
    handleChange(e) {
        const p = e.target.name;
        const v = e.target.value;
        var employee = this.state.employee;
        employee[p] = v;
        this.setState({
            employee: employee
        });
    }
    edit(employee) {
        this.setState({
            employee: employee
        });
    }
    remove(em) {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/employee.php?action=removeEmployeeMaterial',
            data: {id: em.id},
            method: 'POST',
            success(res) {
                _this.getEmployeesMaterial();
            }
        });
    }
    getEmployeesMaterial() {
        const _this = this;
        $.ajax({
            url: api.getEmployeesMaterial(),
            success(res) {
                _this.setState({
                    employeesMaterial: res
                });
            }
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const _this = this;
        $.ajax({
            url: '/admin/controllers/employee.php?action=upsertEmployeeMaterial',
            data: _this.state.employee,
            method: 'POST',
            success(res) {
                _this.getEmployeesMaterial();
                _this.setNew();
            }
        });
    }
    render() {
        const _this = this;
        const employee = this.state.employee;
        const employeesMaterial = this.state.employeesMaterial.map((em, i) => {
            return (
                <tr key={i}>
                    <th>{em.name}</th>
                    <th>
                        <a className="button is-warning" onClick={_this.edit.bind(_this, em)}>Edit</a>
                        <a className="button is-danger" onClick={_this.remove.bind(_this, em)}>Delete</a>
                    </th>
                </tr>
            );
        }
        );
        return(
            <div className="columns">
                <div className="column card is-6">
                <a className="button is-primary" onClick={this.setNew}>Add</a>
                <table className="table is-fullwidth is-striped is-narrow">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {employeesMaterial}
                    </tbody>
                </table>
                </div>
                <form className="column card is-6" onSubmit={this.handleSubmit}>
                    <h2 className="is-size-2 has-text-centered">责任文案</h2>
                    <TextInput title={'姓名'} name={'name'} value={employee.name} handleChange={this.handleChange} />
                    <button className="button is-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default EmployeesMaterial;