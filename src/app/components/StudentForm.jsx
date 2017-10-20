import React from 'react';
import $ from 'jquery';

class StudentForm extends React.Component {
    constructor() {
        super();
        this.state = {
            regions: [],
            provinces: [],
            cities: [],
            employees: [],
            offices: [],
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
                service: '',
                service_fee: '',
                school: '',
                progress: '',
                office_id: '',
                agency_id: ''
            }
        };
        this.getProvinces = this.getProvinces.bind(this);
        this.getCities = this.getCities.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getEditStudent = this.getEditStudent.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.student != 'undefined') {
            const student = nextProps.student;
            this.getProvinces(student.region_id);
            this.getCities(student.province_id);
            this.setState({
                student: this.getEditStudent(student)
            });   
        }
    }
    getEditStudent(student) {
        var newS = {};
        Object.keys(this.state.student).map((p) => {
            newS[p] = student[p];
        });
        return newS;
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
        $.ajax({
            url: '/admin/controllers/office.php?action=getOffices',
            success(res) {
                _this.setState({
                    offices: res
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
    getCities(id) {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/location.php?action=getCities',
            data: {id: id},
            success(res) {
                _this.setState({
                    cities: res
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
        if (p == 'province_id') {
            this.getCities(v);
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
                _this.props.refreshPage();
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
        const cities = this.state.cities.map((c) =>
            <option key={c.id} value={c.id}>{c.name}</option>
        );
        const employees = this.state.employees.map((e) =>
            <option key={e.id} value={e.id}>{e.name}</option>
        );
        const offices = this.state.offices.map((o) =>
            <option key={o.id} value={o.id}>{o.name}</option>
        );
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="columns">
                    <div className="column is-2">
                        <div className="field">
                            <label className="label">姓名</label>
                            <div className="control">
                                <input className="input" type="text" name="name" value={student.name} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">性别</label>
                            <div className="control">
                                <div className="select">
                                    <select name="gender" value={student.gender} onChange={this.handleChange}>
                                        <option>Please Select</option>
                                        <option value="男">男</option>
                                        <option value="女">女</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">生日</label>
                            <div className="control">
                                <input className="input" type="date" name="dob" value={student.dob} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">电话</label>
                            <div className="control">
                                <input className="input" type="text" name="phone" value={student.phone} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="text" name="email" value={student.email} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="column is-2">
                        <div className="field">
                            <label className="label">客人归属</label>
                            <div className="control">
                                <div className="select">
                                    <select name="office_id" value={student.office_id} onChange={this.handleChange}>
                                        <option>Please Select</option>
                                        {offices}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
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
                        <div className="field">
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
                        <div className="field">
                            <label className="label">城市</label>
                            <div className="control">
                                <div className="select">
                                    <select name="city_id" value={student.city_id} onChange={this.handleChange}>
                                        <option>Please Select</option>
                                        {cities}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-2">
                        <div className="field">
                            <label className="label">签证信息</label>
                            <div className="control">
                                <input className="input" type="text" name="visa_info" value={student.visa_info} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">签证日期</label>
                            <div className="control">
                                <input className="input" type="date" name="visa_date" value={student.visa_date} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">护照日期</label>
                            <div className="control">
                                <input className="input" type="date" name="passport_date" value={student.passport_date} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="column is-2">
                        <div className="field">
                            <label className="label">中国高中信息</label>
                            <div className="control">
                                <input className="input" type="text" name="high_info" value={student.high_info} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">中国大学信息</label>
                            <div className="control">
                                <input className="input" type="text" name="uni_info" value={student.uni_info} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="column is-2">
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
                        <div className="field">
                            <label className="label">代理公司</label>
                            <div className="control">
                                <input className="input" type="text" name="agency_id" value={student.agency_id} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                </div>
                    
                    
                <div className="field">
                    <div className="control">
                        <input className="button is-primary" type="submit" value="Submit" />
                    </div>
                </div>
            </form>
        );
    }
}

export default StudentForm;