import React from 'react';
import { Link } from 'react-router-dom';
import $ from 'jquery';

import Api from '../services/api.js';
import Modal from '../components/Modal.jsx';
import StudentForm from '../components/StudentForm.jsx';
import DeleteConfirmForm from '../components/DeleteConfirmForm.jsx';
import Pagination from '../components/Pagination.jsx';
import Dropdown from '../elements/Dropdown.jsx';
import { getDateColor, getColor, parseSearchParams, getSearchLink } from '../services/functions.js';

import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

const api = new Api();
const studentsPerPage = 25;

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            students: [],
            services: [],
            employees: [],
            employeesMaterial: [],
            schoolProgresses: [],
            colors: [{key: 'green', value: '绿色'}, {key: 'yellow', value: '黄色'}, {key: 'blue', value: '蓝色'}, {key: 'red', value: '红色'}],
            visa_immigrates: [],
            modal: false,
            deleteStudent: false,
            studentToDelete: {},
            totalStudents: '',
            currentPage: 1,
            search: {
                page: '1',
                name: '',
                employee_id: '',
                employee_material_id: '',
                service: '',
                school_progress_name: '',
                color: '',
                visa_progress_name: ''
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
        $.ajax({
            url: api.getServices(),
            success(res) {
                _this.setState({
                    services: res
                });
            }
        });
        $.ajax({
            url: api.getSchoolProgresses(),
            success(res) {
                _this.setState({
                    schoolProgresses: res
                });
            }
        });
        $.ajax({
            url: api.getVisaImmiProgresses(),
            success(res) {
                _this.setState({
                    visa_immigrates: res
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
                        employee_material_id: res.search.employee_material_id,
                        service: res.search.service,
                        school_progress_name: res.search.school_progress_name,
                        visa_progress_name: res.search.visa_progress_name,
                        color: res.search.color
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
        const currentPage = this.state.currentPage;
        const _this = this;
        const employees = this.state.employees.map((c) =>
            <option key={c.id} value={c.id}>{c.name}</option>
        );
        const employeesMaterial = this.state.employeesMaterial.map((c) =>
            <option key={c.id} value={c.id}>{c.name}</option>
        );
        const services = this.state.services.map((s) =>
            <option key={s.id} value={s.name}>{s.name}</option>
        );
        const schoolProgresses = this.state.schoolProgresses.map((p) =>
            <option key={p.name} value={p.name}>{p.name}</option>
        );
        const colors = this.state.colors.map((c) => 
            <option key={c.key} value={c.key}>{c.value}</option>
        );
        const visa_immigrates = this.state.visa_immigrates.map((vi) =>
            <option key={vi.name} value={vi.name}>{vi.name}</option>
        );
        const students = this.state.students;
        let passColor = '';
        const list = students.map((s) => {
            const visaColor = getDateColor(s.visa_date, 'visa');
            const passColor = getDateColor(s.passport_date, 'passport');
            const _this = this;
            return (
                <tr key={s.id}>
                    <th><Link to={`/admin/student/${s.id}?returnURL=/admin/students?page=${currentPage}${searchQuery}`}>{s.name}</Link></th>
                    <th className={visaColor}>{s.visa_date}</th>
                    <th className={passColor}>{s.passport_date}</th>
                    <th>{s.employee_name}</th>
                    <th>{s.employee_material_name}</th>
                    <th>{s.service}</th>
                    <th>${s.service_fee}</th>
                    <th><span className={getColor(s.school_progress_name)}>{s.school_progress_name}</span></th>
                    <th><span className={getColor(s.visa_progress_name)}>{s.visa_progress_name}</span></th>
                    <th>{s.updated_at.substring(0, 10)}</th>
                    {(this.props.user.admin_level == 1) ?
                    <th><a className="button is-danger" onClick={_this.deleteStudent.bind(_this, s)}>Delete</a></th>
                    :null}
                </tr>
            );
        }
        );
        return(
            <div className="card">
                {(this.props.user.admin_level != 4) ?
                <ReactCSSTransitionGroup transitionName="anim" transitionAppear={true} transitionAppearTimeout={5000} transitionEnter={false} transitionLeave={false}>
                <a className="button is-primary" onClick={this.addStudent}>添加客户</a>
                </ReactCSSTransitionGroup>
                :null}
                <div className="columns">
                    <div className="column is-3">
                        <div className="field">
                            <label className="label">关键词</label>
                            <div className="control">
                                <input className="input" type="text" name="name" value={this.state.search.name} onChange={this.handleSearchChange} />
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <Dropdown title={'颜色'} name={'color'} value={this.state.search.color} handleChange={this.handleSearchChange} options={colors} />
                    </div>
                    <div className="column">
                        <Link className="button is-primary" to={`/admin/students?page=${this.state.currentPage}${searchQuery}`}>搜素</Link>
                        <Link className="button is-danger" to={'/admin/students'}>重置</Link>
                    </div>
                </div>
                <Modal modal={this.state.deleteStudent} width={'414px'} form={<DeleteConfirmForm studentToDelete={this.state.studentToDelete} refreshPage={this.refreshStudents} />} closeModal={this.closeModal} title='删除客户' />
                {(this.state.totalStudents > studentsPerPage) ?
                <Pagination totalStudents={this.state.totalStudents} studentsPerPage={studentsPerPage} currentPage={currentPage} searchQuery={searchQuery} />
                :null}
                <table id="students" className="table is-fullwidth is-striped is-narrow">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>签证到期日</th>
                            <th>护照到期日</th>
                            <th><Dropdown title={'责任客服'} name={'employee_id'} value={this.state.search.employee_id} handleChange={this.handleSearchChange} options={employees} /></th>
                            <th><Dropdown title={'责任文案'} name={'employee_material_id'} value={this.state.search.employee_material_id} handleChange={this.handleSearchChange} options={employeesMaterial} /></th>
                            <th><Dropdown title={'服务内容'} name={'service'} value={this.state.search.service} handleChange={this.handleSearchChange} options={services} /></th>
                            <th>服务金额</th>
                            <th><Dropdown title={'学校申请'} name={'school_progress_name'} value={this.state.search.school_progress_name} handleChange={this.handleSearchChange} options={schoolProgresses} /></th>
                            <th><Dropdown title={'签证移民'} name={'visa_progress_name'} value={this.state.search.visa_progress_name} handleChange={this.handleSearchChange} options={visa_immigrates} /></th>
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
                <Pagination totalStudents={this.state.totalStudents} studentsPerPage={studentsPerPage} currentPage={currentPage} searchQuery={searchQuery} />
                :null}
                <Modal modal={this.state.modal} form={<StudentForm refreshPage={this.refreshStudents} />} closeModal={this.closeModal} title='添加学生' />
            </div>
        );
    }
}

export default Home;