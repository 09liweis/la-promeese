import React from 'react';
import InputMask from 'react-input-mask';
import $ from 'jquery';
import Datepicker from '../elements/Datepicker.jsx';
import Dropdown from '../elements/Dropdown.jsx';
import TextInput from '../elements/TextInput.jsx';
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
            employees: [],
            services: [],
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
                office_id: '',
                agency_id: '',
                remark: '',
                employee_id: '',
                service_id: ''
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
            url: '/admin/controllers/employee.php?action=getEmployees',
            data: {type: 'free'},
            success(res) {
                _this.setState({
                    employees: res
                });
            }
        });
        $.ajax({
            url: api.getServices(),
            success(res) {
                _this.setState({
                    services: res
                });
            }
        });
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
        
        if (p == 'phone') {
            
        }
        
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
        const employees = this.state.employees.map((a) =>
            <option key={a.id} value={a.id}>{a.name}</option>
        );
        const services = this.state.services.map((a) =>
            <option key={a.id} value={a.id}>{a.name}</option>
        );
        return(
            <form onSubmit={this.handleSubmit}>
                <div className="columns">
                    <div className="column is-2">
                        <TextInput title={'姓名'} name={'name'} value={student.name} handleChange={this.handleChange} />
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
                        <InputMask title={'电话'} name={'phone'} mask="999-999-9999" placeholder="123-456-7890" maskChar=" "  onChange={this.handleChange}  />
                        <TextInput title={'邮箱'} name={'email'} value={student.email} handleChange={this.handleChange} />

                    </div>
                    <div className="column is-2">
                        <TextInput title={'护照号码'} name={'passport_number'} value={student.passport_number} handleChange={this.handleChange} />

                        <div className="field">
                            <label className="label">护照到期日</label>
                            <div className="control">
                                <Datepicker name={"passport_date"} value={student.passport_date} handleChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">签证信息</label>
                            <div className="control">
                                <div className="select">
                                    <select name="visa_info" value={student.visa_info} onChange={this.handleChange}>
                                        <option>Please Select</option>
                                        <option value="大学学签">大学学签</option>
                                        <option value="高中学签">高中学签</option>
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
                    </div>
                    <div className="column is-2">
                        
                        <Dropdown title={'地区'} name={'region_id'} value={student.region_id} handleChange={this.handleChange} options={regions} />
                        <Dropdown title={'省份'} name={'province_id'} value={student.province_id} handleChange={this.handleChange} options={provinces} />
                        <Dropdown title={'城市'} name={'city_id'} value={student.city_id} handleChange={this.handleChange} options={cities} />
                        <Dropdown title={'代理公司'} name={'agency_id'} value={student.agency_id} handleChange={this.handleChange} options={agencies} />
                    </div>
                    <div className="column is-2">
                        <Dropdown title={'客人归属地'} name={'office_id'} value={student.office_id} handleChange={this.handleChange} options={offices} />
                        <Dropdown title={'责任客服'} name={'employee_id'} value={student.employee_id} handleChange={this.handleChange} options={employees} />
                        <Dropdown title={'服务内容'} name={'service_id'} value={student.service_id} handleChange={this.handleChange} options={services} />
                        <div className="field">
                            <label className="label">备注</label>
                            <div className="control">
                                <textarea className="textarea" name="remark" onChange={this.handleChange} value={student.remark}></textarea>
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