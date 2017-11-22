import React from 'react';
import $ from 'jquery';

import Datepicker from '../elements/Datepicker.jsx';
import Dropdown from '../elements/Dropdown.jsx';

import SemesterForm from '../forms/SemesterForm.jsx';

class PerformanceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            performance: this.props.performance,
            services: [],
            subServices: [],
            progresses: [],
            commissionProgresses: [],
            employees: [],
            employeesMaterial: []
        };
        
        this.handleChange = this.handleChange.bind(this);
        
        this.getSubServices = this.getSubServices.bind(this);
        this.getProgresses = this.getProgresses.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        
    }
    componentWillReceiveProps(nextProps) {
        const performance = nextProps.performance;
        this.getSubServices(performance.service_id);
        this.getProgresses(performance.service_id);
        this.setState({
            performance: performance
        });
    }
    componentDidMount() {
        
        const _this = this;
        $.ajax({
            url: '/admin/controllers/service.php?action=getFreeServices',
            success(res) {
                _this.setState({
                    services: res
                });
            }
        });
        $.ajax({
            url: '/admin/controllers/commissionProgress.php?action=getCommissionProgress',
            data: {type: 'free'},
            success(res) {
                _this.setState({
                    commissionProgresses: res
                });
            }
        });
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
        var performance = this.state.performance;
        performance[p] = v;
        this.setState({
            performance: performance
        });
        if (p == 'service_id') {
            this.getSubServices(v);
            this.getProgresses(v);
        }
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
    handleSubmit(e) {
        e.preventDefault();
        const _this = this;
        const performance = this.state.performance;
        $.ajax({
            url: '/admin/controllers/performance.php?action=upsertPerformance',
            method: 'POST',
            data: performance,
            success(res) {
                _this.props.refreshPage();
            }
        });
    }
    render() {
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
        const performance = this.state.performance;
        return (
            <form className="" onSubmit={this.handleSubmit}>
                <div className="columns is-multiline">
                <div className="column is-2">
                    <Dropdown title={'服务'} name={'service_id'} value={performance.service_id} handleChange={this.handleChange} options={services} />
                </div>
                <div className="column is-2">
                    <Dropdown title={'学校'} name={'sub_service_id'} value={performance.sub_service_id} handleChange={this.handleChange} options={subServices} />
                </div>
                <div className="field column is-2">
                    <label className="label">Semester</label>
                    <div className="control">
                        <div className="select">
                            <select name="semester" value={performance.semester} onChange={this.handleChange}>
                                <option>Please Select</option>
                                <option value="ESL">ESL</option>
                                <option value="1st Semester">1st Semester</option>
                                <option value="2nd Semester">2nd Semester</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field column is-2">
                    <label className="label">开学日期</label>
                    <div className="control">
                        <Datepicker name={"school_start_date"} value={performance.school_start_date} handleChange={this.handleChange} />
                    </div>
                </div>
                <div className="field column is-2">
                    <label className="label">申请费</label>
                    <div className="control">
                        <input className="input" type="text" name="fee" value={performance.fee} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="field column is-2">
                    <label className="label">学费</label>
                    <div className="control">
                        <input className="input" type="text" name="tuition" value={performance.tuition} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="column is-2">
                    <Dropdown title={'进度'} name={'progress_id'} value={performance.progress_id} handleChange={this.handleChange} options={progresses} />
                </div>
                <div className="column is-2">
                    <Dropdown title={'佣金申报'} name={'commission_progress_id'} value={performance.commission_progress_id} handleChange={this.handleChange} options={commissionProgresses} />
                </div>
                <div className="column is-2">
                    <Dropdown title={'责任服务'} name={'employee_id'} value={performance.employee_id} handleChange={this.handleChange} options={employees} />
                </div>
                <div className="field column is-2">
                    <Dropdown title={'责任文案'} name={'employee_material_id'} value={performance.employee_material_id} handleChange={this.handleChange} options={employeesMaterial} />
                </div>
                <div className="field column is-2">
                    <label className="label">备注</label>
                    <div className="control">
                        <input type="text" className="input" name="remark" value={performance.remark} onChange={this.handleChange}/>
                    </div>
                </div>
                </div>
                {performance.id ?
                <SemesterForm performanceId={performance.id} employees={employees} progresses={progresses} commissionProgresses={commissionProgresses} employeesMaterial={employeesMaterial} />
                :null}
                <button className="button is-primary">Submit</button>
            </form>
        );
    }
}

export default PerformanceForm;