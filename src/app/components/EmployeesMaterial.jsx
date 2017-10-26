import React from 'react';
import $ from 'jquery';

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
    getEmployeesMaterial() {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/employee.php?action=getEmployeesMaterial',
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
            url: '/admin/controllers/employee.php?action=upsertEmployeMaterial',
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
                    <th><a className="button is-danger" onClick={_this.edit.bind(_this, em)}>Edit</a></th>
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
                        </tr>
                    </thead>
                    <tbody>
                    {employeesMaterial}
                    </tbody>
                </table>
                </div>
                <form className="column card is-6" onSubmit={this.handleSubmit}>
                    <h2 className="is-size-2 has-text-centered">责任文案</h2>
                    <div className="field">
                        <label className="label">姓名</label>
                        <div className="control">
                            <input className="input" type="text" name="name" value={employee.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <button className="button is-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default EmployeesMaterial;