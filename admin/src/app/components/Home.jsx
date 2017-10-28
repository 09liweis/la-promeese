import React from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';

import Api from '../services/api.js';
import Modal from './Modal.jsx';
import StudentForm from './StudentForm.jsx';
import DeleteConfirmForm from './DeleteConfirmForm.jsx';
import { getCurrentDate, getDateDifferent } from '../services/functions.js';


import Datepicker from '../elements/Datepicker.jsx';

const api = new Api();

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            students: [],
            employees: [],
            employeesMaterial: [],
            modal: false,
            deleteStudent: false,
            search: {
                name: '',
                start_date: '',
                end_date: '',
                employee_id: '',
                employee_material_id: ''
            }
        };
        this.addStudent = this.addStudent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.refreshStudents = this.refreshStudents.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.search = this.search.bind(this);
        this.reset = this.reset.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }
    handleSearchChange(e) {
        let search = this.state.search;
        const p = e.target.name;
        const v = e.target.value;
        search[p] = v;
        this.setState({
            search: search
        });
    }
    search() {
        const _this = this;
        $.ajax({
            url: api.getStudents(),
            data: _this.state.search,
            success(res) {
                _this.setState({
                    students: res
                });
            }
        });
    }
    reset() {
        this.setState({
            search: {
                name: '',
                start_date: '',
                end_date: '',
                employee_id: '',
                employee_material_id: ''
            }
        });
        this.refreshStudents();
    }
    componentDidMount() {
        this.refreshStudents();
        const _this = this;
        $.ajax({
            url: api.getEmployees(),
            success(res) {
                _this.setState({
                    employees: res
                });
            }
        });
        $.ajax({
            url: api.getEmployeesMaterial(),
            success(res) {
                _this.setState({
                    employeesMaterial: res
                });
            }
        });
    }
    refreshStudents() {
        this.closeModal();
        const _this = this;
        $.ajax({
            url: api.getStudents(),
            success(res) {
                _this.setState({
                    students: res
                });
            }
        });
    }
    addStudent() {
        this.setState({
            modal: true
        });
    }
    closeModal() {
        this.setState({
            modal: false,
            deleteStudent: false
        });
    }
    deleteStudent(id) {
        this.setState({
            deleteStudent: true
        });
        console.log(id);
    }
    render() {
        const employees = this.state.employees.map((c) =>
            <option key={c.id} value={c.id}>{c.name}</option>
        );
        const employeesMaterial = this.state.employeesMaterial.map((c) =>
            <option key={c.id} value={c.id}>{c.name}</option>
        );
        const students = this.state.students;
        const currentDate = getCurrentDate();
        let visaColor = '';
        let passColor = '';
        const list = students.map((s) => {
            let visaDiffDate = getDateDifferent(s.visa_date);
            if (s.visa_date > currentDate) {
                visaColor = (visaDiffDate < 90) ? 'has-text-warning' : '';
            } else {
                visaColor = 'has-text-danger';
            }
            let passDiffDate = getDateDifferent(s.passport_date);
            if (s.passport_date > currentDate) {
                if (passDiffDate <= 180) {
                    passColor = 'has-text-warning';
                }
                if (passDiffDate <=  30) {
                    passColor = 'has-text-danger';
                }
                if (passDiffDate > 180) {
                    passColor = '';
                }
            } else {
                passColor = 'has-text-danger';
            }
            const _this = this;
            return (
                <tr key={s.id}>
                    <th><Link to={`/admin/student/${s.id}`}>{s.name}</Link></th>
                    <th className={visaColor}>{s.visa_date}</th>
                    <th className={passColor}>{s.passport_date}</th>
                    <th>{s.employee_name}</th>
                    <th>{s.employee_material_name}</th>
                    <th>{s.service}</th>
                    <th>${s.service_fee}</th>
                    <th>{s.progress}</th>
                    <th>{s.updated_at}</th>
                    <th><a className="button is-danger" onClick={_this.deleteStudent.bind(_this, s.id)}>Delete</a></th>
                </tr>
            );
        }
        );
        return(
            <div className="card">
                {(this.props.user.admin_level != 3) ?
                <a className="button is-primary" onClick={this.addStudent}>添加学生</a>
                :null}
                <div className="serach columns">
                    <div className="column is-3">
                        <div className="field">
                            <label className="label">姓名</label>
                            <div className="control">
                                <input className="input" type="text" name="name" value={this.state.search.name} onChange={this.handleSearchChange} />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">签证到期日</label>
                    <div className="columns">
                    <div className="column field">
                        <label className="label">开始日期</label>
                        <Datepicker name={'start_date'} value={this.state.search.start_date} handleChange={this.handleSearchChange} />
                    </div>
                    <div className="column field">
                        <label className="label">结束日期</label>
                        <Datepicker name={"end_date"} value={this.state.search.end_date} handleChange={this.handleSearchChange}/>
                    </div>
                    </div>
                </div>
                <div className="columns">
                    <div className="column field is-2">
                        <label className="label">责任客服</label>
                        <div className="control">
                        <div className="select">
                            <select name="employee_id" value={this.state.search.employee_id} onChange={this.handleSearchChange}>
                                <option value="">Select dropdown</option>
                                {employees}
                            </select>
                        </div>
                        </div>
                    </div>
                    <div className="column field is-2">
                        <label className="label">责任文案</label>
                        <div className="control">
                        <div className="select">
                            <select name="employee_material_id" value={this.state.search.employee_material_id} onChange={this.handleSearchChange}>
                                <option value="">Select dropdown</option>
                                {employeesMaterial}
                            </select>
                        </div>
                        </div>
                    </div>
                    <div className="column is-2">
                        <a className="button is-primary" onClick={this.search}>搜素</a>
                        <a className="button is-danger" onClick={this.reset}>重置</a>
                    </div>
                </div>
                <Modal modal={this.state.deleteStudent} width={'414px'} form={<DeleteConfirmForm refreshPage={this.refreshStudents} />} closeModal={this.closeModal} title='删除学生' />
                <table className="table is-fullwidth is-striped is-narrow">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>签证到期日</th>
                            <th>护照到期日</th>
                            <th>责任客服</th>
                            <th>责任文案</th>
                            <th>服务内容</th>
                            <th>服务金额</th>
                            <th>进度</th>
                            <th>更新时间</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {list}
                    </tbody>
                </table>
                <Modal modal={this.state.modal} form={<StudentForm refreshPage={this.refreshStudents} />} closeModal={this.closeModal} title='添加学生' />
            </div>
        );
    }
}

export default Home;