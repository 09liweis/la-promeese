import React from 'react';
import $ from 'jquery';

class Form extends React.Component {
    constructor() {
        super();
        this.state = {
            regions: [],
            provinces: [],
            employees: [],
            student: {
                id: 0,
                name: '',
                gender: '',
                dob: '',
                region_id: '',
                province_id: '',
                city_id: '',
                employee_id: '',
                high_info: '',
                uni_info: '',
                visa_info: '',
                visa_date: '',
                passport_date: '',
                phone: '',
                email: '',
                location_id: '',
                agency_id: ''
            }
        };
        this.getProvinces = this.getProvinces.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/location.php?action=getRegions',
            success(res) {
                _this.setState({
                    regions: res
                });
            }
        });
        $.ajax({
            url: '/admin/controllers/employee.php?action=getEmployees',
            success(res) {
                _this.setState({
                    employees: res
                });
            }
        });
    }
    getProvinces(id) {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/location.php?action=getProvinces',
            data: {
                id: id
            },
            success(res) {
                _this.setState({
                    provinces: res
                });
            }
        });
    }
    
    handleChange(e) {
        const p = e.target.name;
        const v = e.target.value;
        var student = this.state.student;
        student[p] = v;
        this.setState({
            student: student
        });
        
        if (p == 'region_id') {
            this.getProvinces(v);
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        const _this = this;
        $.ajax({
            url: '/admin/controllers/student.php?action=upsertStudent',
            data: _this.state.student,
            method: 'POST',
            success(res) {
                
            }
        });
    }
    render() {
        const student = this.state.student;
        const regions = this.state.regions.map((r) =>
            <option key={r.id} value={r.id}>{r.name}</option>
        );
        const provinces = this.state.provinces.map((p) =>
            <option key={p.id} value={p.id}>{p.name}</option>
        );
        const employees = this.state.employees.map((e) =>
            <option key={e.id} value={e.id}>{e.name}</option>
        );
        return(
            <form onSubmit={this.handleSubmit}>
                <input type="hidden" value={student.id} name="id" onChange={this.handleChange} />
                <div className="columns">
                    <div className="field column is-2">
                        <label className="label">姓名</label>
                        <div className="control">
                            <input className="input" type="text" name="name" value={student.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column is-2">
                        <label className="label">性别</label>
                        <div className="control">
                            <input className="input" type="text" name="gender" value={student.gender} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column is-2">
                        <label className="label">生日</label>
                        <div className="control">
                            <input className="input" type="text" name="dob" value={student.dob} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column is-2">
                        <label className="label">电话</label>
                        <div className="control">
                            <input className="input" type="text" name="phone" value={student.phone} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column is-2">
                        <label className="label">Email</label>
                        <div className="control">
                            <input className="input" type="text" name="email" value={student.email} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column is-2">
                        <label className="label">客人归属</label>
                        <div className="control">
                            <input className="input" type="text" name="location_id" value={student.location_id} onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="field column is-4-mobile">
                        <label className="label">地区</label>
                        <div className="control">
                            <div className="select">
                                <select name="region_id" value={student.region_id} onChange={this.handleChange}>
                                    <option>Please Select</option>
                                    {regions}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field column is-4-mobile">
                        <label className="label">省份</label>
                        <div className="control">
                            <div className="select">
                                <select name="province_id" value={student.province_id} onChange={this.handleChange}>
                                    <option>Please Select</option>
                                    {provinces}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field column is-4-mobile">
                        <label className="label">城市</label>
                        <div className="control">
                            <div className="select">
                                <select name="city_id" value={student.city_id} onChange={this.handleChange}>
                                    <option>Please Select</option>
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">责任客服</label>
                    <div className="control">
                        <div className="select">
                            <select name="employee_id" value={student.employee_id} onChange={this.handleChange}>
                                <option>Please Select</option>
                                {employees}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="field column is-2">
                        <label className="label">中国高中信息</label>
                        <div className="control">
                            <input className="input" type="text" name="high_info" value={student.high_info} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column is-2">
                        <label className="label">中国大学信息</label>
                        <div className="control">
                            <input className="input" type="text" name="uni_info" value={student.uni_info} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column is-2">
                        <label className="label">签证信息</label>
                        <div className="control">
                            <input className="input" type="text" name="visa_info" value={student.visa_info} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column is-2">
                        <label className="label">签证日期</label>
                        <div className="control">
                            <input className="input" type="text" name="visa_date" value={student.visa_date} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column is-2">
                        <label className="label">护照日期</label>
                        <div className="control">
                            <input className="input" type="text" name="passport_date" value={student.passport_date} onChange={this.handleChange} />
                        </div>
                    </div>
                    
                    <div className="field column is-2">
                        <label className="label">代理公司</label>
                        <div className="control">
                            <input className="input" type="text" name="agency_id" value={student.agency_id} onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="field">
                    <div className="control">
                        <input className="button" type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        );
    }
}

export default Form;