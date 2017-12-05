import React from 'react';
import $ from 'jquery';

import Api from '../services/api.js';
const api = new Api();

class Employees extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            employees: [],
            employee: {
                
            }
        };
        this.getEmployees = this.getEmployees.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.edit = this.edit.bind(this);
        this.setNew = this.setNew.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.remove = this.remove.bind(this);
    }
    componentDidMount() {
        this.getEmployees();
    }
    componentDidCatch(error) {
        
    }
    setNew() {
        this.setState({
            employee: {
                id: 0,
                name: '',
                email: '',
                password: '',
                admin_level: '3'
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
            url: api.removeEmployee(),
            data: {id: em.id},
            method: 'POST',
            success(res) {
                _this.getEmployees();
            }
        });
    }
    getEmployees() {
        const _this = this;
        $.ajax({
            url: api.getEmployees(),
            success(res) {
                _this.setState({
                    employees: res
                });
            }
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const _this = this;
        $.ajax({
            url: api.getUpsertEmployee(),
            data: _this.state.employee,
            method: 'POST',
            success(res) {
                _this.getEmployees();
                _this.setNew();
            }
        });
    }
    render() {
        const _this = this;
        const employee = this.state.employee;
        const employees = this.state.employees.map((em, i) => {
            let level = '';
            switch (em.admin_level) {
                case '1':
                    level = '一级';
                    break;
                case '2':
                    level = '二级';
                    break;
                case '3':
                    level = '三级';
                    break;
                default:
                    level = '合作方';
            }
            return (
                <tr key={i}>
                    <th>{em.name}</th>
                    <th>{em.email}</th>
                    <th>{level}</th>
                    <th>{(em.last_login != null && em.last_login != '') ? em.last_login.substring(0, 10) : ''}</th>
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
                <div className="column card is-8">
                <a className="button is-primary" onClick={this.setNew}>Add</a>
                <table className="table is-fullwidth is-striped is-narrow">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>Email</th>
                            <th>权限</th>
                            <th>最后登陆时间</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {employees}
                    </tbody>
                </table>
                </div>
                <form className="column card" onSubmit={this.handleSubmit}>
                    <h2 className="is-size-2 has-text-centered">责任客服</h2>
                    <div className="field">
                        <label className="label">姓名</label>
                        <div className="control">
                            <input className="input" type="text" name="name" value={employee.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="text" name="email" value={employee.email} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">密码</label>
                        <div className="control">
                            <input className="input" type="password" name="password" value={employee.password} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">权限</label>
                        <div className="select">
                            <select name="admin_level" value={employee.admin_level} onChange={this.handleChange}>
                                <option>Please Select</option>
                                <option value="1">一级管理</option>
                                <option value="2">二级管理</option>
                                <option value="3">三级管理</option>
                                <option value="4">合作方</option>
                            </select>
                        </div>
                    </div>
                    <button className="button is-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Employees;