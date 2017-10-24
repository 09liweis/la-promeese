import React from 'react';
import $ from 'jquery';

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
            const applications = JSON.parse(schools);
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
            url: '/admin/controllers/service.php?action=schoolServices',
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
            sub_service_name: '',
            application_fee: '',
            student_number: '',
            account: '',
            password: '',
            progress_id: '',
            progress_name: '',
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
        if (p == 'sub_service_id') {
            applications[i].sub_service_name = this.getSubServiceName(v);
        }
        if (p == 'progress_id') {
            applications[i].progress_name = this.getProgressName(v);
        }
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
        var application = this.state.application;
        application.schools = JSON.stringify(this.state.applications);
        const _this = this;
        $.ajax({
            url: '/admin/controllers/schoolApplication.php?action=upsertApplication',
            data: application,
            method: 'POST',
            success(res) {
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
        const applications = this.state.applications.map((a, i) =>
            <div key={i} className="columns is-multiline">
                <div className="column">
                <div className="field">
                    <label className="label">学校</label>
                    <div className="control">
                        <div className="select">
                            <select name="sub_service_id" value={a.sub_service_id} onChange={_this.handleSchoolChange.bind(_this, a, i)}>
                                <option>Please Select</option>
                                {subServices}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field">
                    <label className="label">申请费</label>
                    <div className="control">
                        <input className="input" type="text" name="application_fee" value={a.application_fee} onChange={_this.handleSchoolChange.bind(_this, a, i)} />
                    </div>
                </div>
                </div>
                <div className="column">
                <div className="field">
                    <label className="label">跟踪号码</label>
                    <div className="control">
                        <input className="input" type="text" name="trace_number" value={a.trace_number} onChange={_this.handleSchoolChange.bind(_this, a, i)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">递交时间</label>
                    <div className="control">
                        <input className="input" type="date" name="submit_date" value={a.submit_date} onChange={_this.handleSchoolChange.bind(_this, a, i)} />
                    </div>
                </div>
                </div>
                <div className="column">
                <div className="field">
                    <label className="label">学号</label>
                    <div className="control">
                        <input className="input" type="text" name="student_number" value={a.student_number} onChange={_this.handleSchoolChange.bind(_this, a, i)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">账号</label>
                    <div className="control">
                        <input className="input" type="text" name="account" value={a.account} onChange={_this.handleSchoolChange.bind(_this, a, i)} />
                    </div>
                </div>
                <div className="field">
                    <label className="label">密码</label>
                    <div className="control">
                        <input className="input" type="text" name="password" value={a.password} onChange={_this.handleSchoolChange.bind(_this, a, i)} />
                    </div>
                </div>
                </div>
                <div className="field column">
                    <label className="label">进度</label>
                    <div className="control">
                        <div className="select">
                            <select name="progress_id" value={a.progress_id} onChange={_this.handleSchoolChange.bind(_this, a, i)}>
                                <option>Please Select</option>
                                {progresses}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="column">
                    <a className="button is-primary" onClick={_this.handleSchoolRemove.bind(_this, a, i)}>Remove</a>
                </div>
            </div>
        );
        return (
            <form onSubmit={this.handleSubmit}>
                <div className="columns">
                    <div className="field column">
                        <label className="label">Service</label>
                        <div className="control">
                            <div className="select">
                                <select name="service_id" value={application.service_id} onChange={this.handleChange}>
                                    <option>Please Select</option>
                                    {services}
                                </select>
                            </div>
                        </div>
                    </div>
                    {(application.service_id == '5') ?
                    <div className="column">
                    <div className="field">
                        <label className="label">OUAC account</label>
                        <div className="control">
                            <input className="input" type="text" name="ouac_account" value={application.ouac_account} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">OUAC password</label>
                        <div className="control">
                            <input className="input" type="text" name="ouac_password" value={application.ouac_password} onChange={this.handleChange} />
                        </div>
                    </div>
                    </div>
                    : null }
                    <div className="column">
                        <div className="field">
                            <label className="label">Email</label>
                            <div className="control">
                                <input className="input" type="text" name="email" value={application.email} onChange={this.handleChange} />
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">Email password</label>
                            <div className="control">
                                <input className="input" type="text" name="email_password" value={application.email_password} onChange={this.handleChange} />
                            </div>
                        </div>
                    </div>
                    <div className="field column">
                        <label className="label">服务费</label>
                        <div className="control">
                            <input className="input" type="text" name="service_fee" value={application.service_fee} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column">
                        <label className="label">佣金申报</label>
                        <div className="control">
                            <div className="select">
                                <select name="commission_progress_id" value={application.commission_progress_id} onChange={this.handleChange}>
                                    <option>Please Select</option>
                                    {commissionProgresses}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="column">
                        <div className="field">
                            <label className="label">责任服务</label>
                            <div className="control">
                                <div className="select">
                                    <select name="employee_id" value={application.employee_id} onChange={this.handleChange}>
                                        <option>Please Select</option>
                                        {employees}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                            <label className="label">责任文案</label>
                            <div className="control">
                                <div className="select">
                                    <select name="employee_material_id" value={application.employee_material_id} onChange={this.handleChange}>
                                        <option>Please Select</option>
                                        {employeesMaterial}
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <a className="button is-primary" onClick={this.addSchool}>添加学校</a>
                {applications}
                <button className="button is-primary">Submit</button>
            </form>
        );
    }
}

export default SchoolApplicationForm;