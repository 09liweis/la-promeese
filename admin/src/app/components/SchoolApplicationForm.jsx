import React from 'react';
import $ from 'jquery';

import TextInput from '../elements/TextInput.jsx';
import Dropdown from '../elements/Dropdown.jsx';
import Datepicker from '../elements/Datepicker.jsx';

class SchoolApplicationForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: {},
            applications: [],
            services: [],
            subServices: [],
            progresses: [],
            commissionProgresses: [],
            employees: [],
            employeesMaterial: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.getServices = this.getServices.bind(this);
        this.getSubServices = this.getSubServices.bind(this);
        this.getProgresses = this.getProgresses.bind(this);
        this.addSchool = this.addSchool.bind(this);
        this.handleSchoolChange = this.handleSchoolChange.bind(this);
        this.handleSchoolRemove = this.handleSchoolRemove.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getSubServiceName = this.getSubServiceName.bind(this);
        this.getProgressName = this.getProgressName.bind(this);
        this.getCommissionProgresses = this.getCommissionProgresses.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const application = nextProps.application;
        const schools = application.schools;
        this.getSubServices(application.service_id);
        this.getProgresses(application.service_id);
        if (typeof schools != 'undefined' && schools != '') {
            const applications = schools;
            this.setState({
                applications: applications
            });
        }
        this.setState({
            application: application,
        });
    }
    componentDidMount() {
        this.getServices();
        this.getCommissionProgresses();
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
            url: '/admin/controllers/employee.php?action=getEmployeesMaterial',
            data: {type: 'free'},
            success(res) {
                _this.setState({
                    employeesMaterial: res
                });
            }
        });
    }
    handleChange(e) {
        const p = e.target.name;
        const v = e.target.value;
        var application = this.state.application;
        application[p] = v;
        this.setState({
            application: application
        });
        if (p == 'service_id') {
            this.getSubServices(v);
            this.getProgresses(v);
        }
    }
    getProgresses(id) {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/progress.php?action=getProgresses',
            data: {id: id},
            success(res) {
                _this.setState({
                    progresses: res
                });
            }
        });
    }
    getServices() {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/service.php?action=getPostGradServices',
            success(res) {
                _this.setState({
                    services: res
                });
            }
        });
    }
    getSubServices(id) {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/service.php?action=getSubServices',
            data: {id: id},
            success(res) {
                _this.setState({
                    subServices: res
                });
            }
        });
    }
    getCommissionProgresses() {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/commissionProgress.php?action=getCommissionProgress',
            data: {type: 'paid'},
            success(res) {
                _this.setState({
                    commissionProgresses: res
                });
            }
        });
    }
    getNewSchoolApplication() {
        return  {
            sub_service_id: '',
            application_fee: '',
            campus: '',
            program: '',
            student_number: '',
            account: '',
            password: '',
            progress_id: '',
            trace_number: '',
            submit_date: ''
        };
    }
    addSchool() {
        var applications = this.state.applications;
        applications.push(this.getNewSchoolApplication());
        this.setState({
            applications: applications
        });
    }
    handleSchoolChange(a, i, e) {
        const p = e.target.name;
        const v = e.target.value;
        var applications = this.state.applications;
        applications[i][p] = v;
        this.setState({
            applications: applications
        });
    }
    handleSchoolRemove(a, i, e) {
        var applications = this.state.applications;
        applications.splice(i, 1);
        this.setState({
            applications: applications
        });
    }
    getSubServiceName(id) {
        const length = this.state.subServices.length;
        for (var i = 0; i < length; i++) {
            if (this.state.subServices[i].id == id) {
                return this.state.subServices[i].name;
            }
        }
    }
    getProgressName(id) {
        const length = this.state.progresses.length;
        for (var i = 0; i < length; i++) {
            if (this.state.progresses[i].id == id) {
                return this.state.progresses[i].name;
            }
        }
    }
    handleSubmit(e) {
        e.preventDefault();
        let {application, applications} = this.state;
        application.schools = JSON.stringify(applications);
        const _this = this;
        $.ajax({
            url: '/admin/controllers/schoolApplication.php?action=upsertApplication',
            data: application,
            method: 'POST',
            success(res) {
                _this.setState({
                    applications: []
                });
                _this.props.refreshPage();
            }
        });
    }
    render() {
        const _this = this;
        const application = this.state.application;
        const services = this.state.services.map((s) =>
            <option key={s.id} value={s.id}>{s.name}</option>
        );
        const subServices = this.state.subServices.map((s) =>
            <option key={s.id} value={s.id}>{s.name}</option>
        );
        const progresses = this.state.progresses.map((p) =>
            <option key={p.id} value={p.id}>{p.name}</option>
        );
        const commissionProgresses = this.state.commissionProgresses.map((c) =>
            <option key={c.id} value={c.id}>{c.name}</option>
        );
        const employees = this.state.employees.map((c) =>
            <option key={c.id} value={c.id}>{c.name}</option>
        );
        const employeesMaterial = this.state.employeesMaterial.map((c) =>
            <option key={c.id} value={c.id}>{c.name}</option>
        );
        const apps = (typeof this.state.applications == 'string') ? [] : this.state.applications;
        const applications = apps.map((a, i) =>
            <div key={i} className="columns card is-multiline">
                <div className="column">
                    <Dropdown title={"学校"} name={"sub_service_id"} value={a.sub_service_id} handleChange={_this.handleSchoolChange.bind(_this, a, i)} options={subServices} />
                    <TextInput title={"校区"} name={"campus"} value={a.campus} handleChange={_this.handleSchoolChange.bind(_this, a, i)} />
                    <TextInput title={"专业"} name={"program"} value={a.program} handleChange={_this.handleSchoolChange.bind(_this, a, i)} />
                    <TextInput title={"申请费"} name={"application_fee"} value={a.application_fee} handleChange={_this.handleSchoolChange.bind(_this, a, i)} />
                </div>
                {(application.service_id != '5') ?
                <div className="column">
                    <TextInput title={"追踪号码"} name={"trace_number"} value={a.trace_number} handleChange={_this.handleSchoolChange.bind(_this, a, i)} />
                    <div className="field">
                        <label className="label">递交时间</label>
                        <div className="control">
                            <Datepicker title={"递交时间"} name={"submit_date"} value={a.submit_date} handleChange={_this.handleSchoolChange.bind(_this, a, i)} />
                        </div>
                    </div>
                </div>
                :null}
                <div className="column">
                    <TextInput title={"学号"} name={"student_number"} value={a.student_number} handleChange={_this.handleSchoolChange.bind(_this, a, i)} />
                    <TextInput title={"账号"} name={"account"} value={a.account} handleChange={_this.handleSchoolChange.bind(_this, a, i)} />
                    <TextInput title={"密码"} name={"password"} value={a.password} handleChange={_this.handleSchoolChange.bind(_this, a, i)} />
                </div>
                <div className="column">
                    <Dropdown title={"进度"} name={"progress_id"} value={a.progress_id} handleChange={_this.handleSchoolChange.bind(_this, a, i)} options={progresses} />
                </div>
                <div className="column">
                    <a className="button is-primary" onClick={_this.handleSchoolRemove.bind(_this, a, i)}>Remove</a>
                </div>
            </div>
        );
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="columns">
                    <div className="column">
                        <Dropdown title={"服务"} name={"service_id"} value={application.service_id} handleChange={this.handleChange} options={services} />
                    </div>
                    {(application.service_id == '5') ?
                    <div className="column">
                        <TextInput title={"OUAC Confirmation Number"} name={"ouac_confirmation_number"} value={application.ouac_confirmation_number} handleChange={this.handleChange} />
                        <TextInput title={"OUAC Account"} name={"ouac_account"} value={application.ouac_account} handleChange={this.handleChange} />
                        <TextInput title={"OUAC Password"} name={"ouac_password"} value={application.ouac_password} handleChange={this.handleChange} />
                    </div>
                    : null }
                    <div className="column">
                        <TextInput title={"Email"} name={"email"} value={application.email} handleChange={this.handleChange} />
                        <TextInput title={"Email Password"} name={"email_password"} value={application.email_password} handleChange={this.handleChange} />
                    </div>
                    <div className="column">
                        <TextInput title={"服务费"} name={"service_fee"} value={application.service_fee} handleChange={this.handleChange} />
                    </div>
                    <div className="column">
                        <Dropdown title={"佣金申报"} name={"commission_progress_id"} value={application.commission_progress_id} handleChange={this.handleChange} options={commissionProgresses} />
                    </div>
                    <div className="column">
                        <Dropdown title={"责任服务"} name={"employee_id"} value={application.employee_id} handleChange={this.handleChange} options={employees} />
                        <Dropdown title={"责任文案"} name={"employee_material_id"} value={application.employee_material_id} handleChange={this.handleChange} options={employeesMaterial} />
                    </div>
                    <div className="column">
                        <TextInput title={'备注'} name={'remark'} value={application.remark} handleChange={this.handleChange} />
                    </div>
                </div>
                <a className="button is-primary" onClick={this.addSchool}>添加学校</a>
                {applications}
                <button className="button is-primary is-pulled-right">Submit</button>
            </form>
        );
    }
}

export default SchoolApplicationForm;