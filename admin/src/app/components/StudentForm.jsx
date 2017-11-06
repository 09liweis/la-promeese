import React from 'react';
import $ from 'jquery';

import Datepicker from '../elements/Datepicker.jsx';
import Api from '../services/api.js';
const api = new Api();

class StudentForm extends React.Component {
    constructor() {
        super();
        this.state = {
            regions: [],
            provinces: [],
            cities: [],
            offices: [],
            agencies: [],
            student: {
                id: 0,
                name: '',
                gender: '',
                dob: '',
                region_id: '',
                province_id: '',
                city_id: '',
                visa_info: '',
                visa_date: '',
                passport_number: '',
                passport_date: '',
                status: '',
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
            url: api.getRegions(),
            success(res) {
                _this.setState({
                    regions: res
                });
            }
        });
        $.ajax({
            url: api.getOffices(),
            success(res) {
                _this.setState({
                    offices: res
                });
            }
        });
        $.ajax({
            url: api.getAgencies(),
            success(res) {
                _this.setState({
                    agencies: res
                });
            }
        });
    }
    getProvinces(id) {
        const _this = this;
        $.ajax({
            url: api.getProvinces(),
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
            url: api.getCities(),
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
                if (res == 'ok') {
                    _this.props.refreshPage();
                } else {
                    alert('客户护照已存在');
                }
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
        const offices = this.state.offices.map((o) =>
            <option key={o.id} value={o.id}>{o.name}</option>
        );
        const agencies = this.state.agencies.map((a) =>
            <option key={a.id} value={a.id}>{a.name}</option>
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
                                <Datepicker name={"dob"} value={student.dob} handleChange={this.handleChange}/>
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
                            <label className="label">客人归属地</label>
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
                                <div className="select">
                                    <select name="visa_info" value={student.visa_info} onChange={this.handleChange}>
                                        <option>Please Select</option>
                                        <option value="学签">学签</option>
                                        <option value="工签">工签</option>
                                        <option value="访问签">访问签</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">签证到期日</label>
                            <div className="control">
                                <Datepicker name={"visa_date"} value={student.visa_date} handleChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">护照号码</label>
                            <div className="control">
                                <input className="input" type="text" name="passport_number" value={student.passport_number} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">护照到期日</label>
                            <div className="control">
                                <Datepicker name={"passport_date"} value={student.passport_date} handleChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">身份</label>
                            <div className="control">
                                <div className="select">
                                    <select name="status" value={student.status} onChange={this.handleChange}>
                                        <option>Please Select</option>
                                        <option value="留学生">留学生</option>
                                        <option value="移民">移民</option>
                                        <option value="公民">公民</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="column is-2">
                        <div className="field">
                            <label className="label">代理公司</label>
                                <div className="control">
                                    <div className="select">
                                        <select name="agency_id" value={student.agency_id} onChange={this.handleChange}>
                                            <option>Please Select</option>
                                            {agencies}
                                        </select>
                                    </div>
                                </div>
                        </div>
                        <div className="field">
                            <label className="label">备注</label>
                            <div className="control">
                                <textarea className="textarea" name="remark" onChange={this.handleChange}>{student.remark}</textarea>
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