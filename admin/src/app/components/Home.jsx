import React from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';

import Api from '../services/api.js';
import Modal from './Modal.jsx';
import StudentForm from './StudentForm.jsx';
import DeleteConfirmForm from './DeleteConfirmForm.jsx';
import { getCurrentDate, getDateDifferent, getColor, parseSearchParams, getSearchLink } from '../services/functions.js';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const api = new Api();
const studentsPerPage = 25;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            employees: [],
            employeesMaterial: [],
            modal: false,
            deleteStudent: false,
            studentToDelete: {},
            totalStudents: '',
            currentPage: 1,
            search: {
                page: '1',
                name: '',
                employee_id: '',
                employee_material_id: ''
            }
        };
        this.addStudent = this.addStudent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.refreshStudents = this.refreshStudents.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
        this.deleteStudent = this.deleteStudent.bind(this);
    }
    handleSearchChange(e) {
        let search = this.state.search;
        const p = e.target.name;
        const v = e.target.value;
        search[p] = v;
        this.setState({
            search: search,
            currentPage: 1
        });
    }
    componentWillReceiveProps(nextProps) {
        const params = parseSearchParams(nextProps.location.search);
        this.setState({
            currentPage: params.page
        });
        this.refreshStudents(params);
    }
    componentDidMount() {
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
    refreshStudents(data) {
        this.closeModal();
        const _this = this;
        $.ajax({
            url: api.getStudents(),
            data: data,
            success(res) {
                _this.setState({
                    students: res.data,
                    totalStudents: res.total,
                    currentPage: res.search.page,
                    search: {
                        page: res.search.page,
                        name: res.search.name,
                        employee_id: res.search.employee_id,
                        employee_material_id: res.search.employee_material_id
                    }
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
    deleteStudent(s) {
        this.setState({
            deleteStudent: true,
            studentToDelete: s
        });
    }
    render() {
        const searchQuery = getSearchLink(this.state.search);
        const _this = this;
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
                    <th><span className={getColor(s.progress)}>{s.progress}</span></th>
                    <th>{s.updated_at.substring(0, 10)}</th>
                    {(this.props.user.admin_level == 1) ?
                    <th><a className="button is-danger" onClick={_this.deleteStudent.bind(_this, s)}>Delete</a></th>
                    :null}
                </tr>
            );
        }
        );
        
        const totalStudents = this.state.totalStudents;
        const currentPage = this.state.currentPage;
        const totalPages = Math.ceil(totalStudents / studentsPerPage );
        const pagination = Array(totalPages).fill().map((x, i) => {
            const currentClass = (currentPage - 1) == i ? 'pagination-link is-current' : 'pagination-link';
            return (
                <li key={i}>
                    <Link className={currentClass} to={`/admin/students?page=${i+1}${searchQuery}`} aria-label="Page {i+1}" aria-current="page">{i+1}</Link>
                </li>
            );
        });
        
        return(
            <div className="card">
                {(this.props.user.admin_level != 4) ?
                <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
                <a className="button is-primary" onClick={this.addStudent}>添加客户</a>
                </ReactCSSTransitionGroup>
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
                        <Link className="button is-primary" to={`/admin/students?page=${this.state.currentPage}${searchQuery}`}>搜素</Link>
                        <Link className="button is-danger" to={'/admin/students'}>重置</Link>
                    </div>
                </div>
                <Modal modal={this.state.deleteStudent} width={'414px'} form={<DeleteConfirmForm studentToDelete={this.state.studentToDelete} refreshPage={this.refreshStudents} />} closeModal={this.closeModal} title='删除客户' />
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
                            {(this.props.user.admin_level == 1) ?
                            <th>Actions</th>
                            :null}
                        </tr>
                    </thead>
                    <tbody>
                    {list}
                    </tbody>
                </table>
                {(this.state.totalStudents > studentsPerPage) ?
                <nav className="pagination is-centered" role="navigation" aria-label="pagination">
                    <ul className="pagination-list">
                    {pagination}
                    </ul>
                </nav>
                :null}
                <Modal modal={this.state.modal} form={<StudentForm refreshPage={this.refreshStudents} />} closeModal={this.closeModal} title='添加学生' />
            </div>
        );
    }
}

export default Home;