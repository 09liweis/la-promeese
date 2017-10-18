import React from 'react';
import $ from 'jquery';

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
    }
    componentDidMount() {
        this.getEmployees();
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
    getEmployees() {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/employee.php?action=getEmployees',
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
            url: '/admin/controllers/employee.php?action=upsertEmployee',
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
        const employees = this.state.employees.map((em) =>
            <tr key={em.id}>
                <th>{em.name}</th>
                <th>{em.email}</th>
                <th>{em.admin_level}</th>
                <th>{em.last_login}</th>
                <th><a className="button is-danger" onClick={_this.edit.bind(_this, em)}>Edit</a></th>
            </tr>
        );
        return(
            <div className="columns">
                <div className="column card is-6">
                <a className="button is-primary" onClick={this.setNew}>Add</a>
                <table className="table is-fullwidth is-striped is-narrow">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>Email</th>
                            <th>权限</th>
                            <th>最后登陆时间</th>
                        </tr>
                    </thead>
                    <tbody>
                    {employees}
                    </tbody>
                </table>
                </div>
                <form className="column card is-6" onSubmit={this.handleSubmit}>
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
                                <option value="1">Admin</option>
                                <option value="2">Normal</option>
                                <option value="3">Read Only</option>
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