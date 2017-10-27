import React from 'react';
import $ from 'jquery';

import Datepicker from '../elements/Datepicker.jsx';

class BusinessForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            services: [],
            business: {},
            subServices: [],
            progresses: [],
            commissionProgresses: [],
            employees: [],
            employeesMaterial: []
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getProgresses = this.getProgresses.bind(this);
        this.getSubServices = this.getSubServices.bind(this);
        
    }
    componentWillReceiveProps(nextProps) {
        const business = nextProps.business;
        this.getSubServices(business.service_id);
        this.getProgresses(business.service_id);
        this.setState({
            business: business
        });
    }
    componentDidMount() {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/service.php?action=getPaidServices',
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
        var b = this.state.business;
        b[p] = v;
        this.setState({
            business: b
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
        $.ajax({
            url: '/admin/controllers/business.php?action=upsertBusiness',
            method: 'POST',
            data: _this.state.business,
            success(res) {
                _this.props.refreshPage();
            }
        });
    }
    render() {
        const business = this.state.business;
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
        var newDateDes = '新时间';
        switch (business.service_id) {
            case '7':
                newDateDes = '获批时间至';
                break;
            case '8':
                newDateDes = '登陆时间';
                break;
            case '9':
                newDateDes = '入职时间';
                break;
            default:
                newDateDes = '新时间';
        }
        
        return (
            <form className="columns is-multiline" autoComplete="off" onSubmit={this.handleSubmit}>
                <div className="column is-2">
                    <div className="field">
                        <label className="label">服务</label>
                        <div className="control">
                            <div className="select">
                                <select name="service_id" value={business.service_id} onChange={this.handleChange}>
                                    <option>Please Select</option>
                                    {services}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">副服务</label>
                        <div className="control">
                            <div className="select">
                                <select name="sub_service_id" value={business.sub_service_id} onChange={this.handleChange}>
                                    <option>Please Select</option>
                                    {subServices}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="column is-2">
                    {(business.service_id == '7') ?
                    <div className="field">
                        <label className="label">政府费</label>
                        <div className="control">
                            <input className="input" type="text" name="government_fee" value={business.government_fee} onChange={this.handleChange} />
                        </div>
                    </div>
                    :
                    <div className="field">
                        <label className="label">申请费</label>
                        <div className="control">
                            <input className="input" type="text" name="application_fee" value={business.application_fee} onChange={this.handleChange} />
                        </div>
                    </div>
                    }
                    <div className="field">
                        <label className="label">服务费</label>
                        <div className="control">
                            <input className="input" type="text" name="service_fee" value={business.service_fee} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">邮寄费</label>
                        <div className="control">
                            <input className="input" type="text" name="post_fee" value={business.post_fee} onChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="column is-2">
                    <div className="field">
                        <label className="label">递交时间</label>
                        <div className="control">
                            <Datepicker name={"submit_date"} value={business.submit_date} handleChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">进度</label>
                        <div className="control">
                            <div className="select">
                                <select name="progress_id" value={business.progress_id} onChange={this.handleChange}>
                                    <option>Please Select</option>
                                    {progresses}
                                </select>
                            </div>
                        </div>
                    </div>
                    <div className="field">
                        <label className="label">{newDateDes}</label>
                        <div className="control">
                            <Datepicker name={"new_date"} value={business.new_date} handleChange={this.handleChange} />
                        </div>
                    </div>
                </div>
                <div className="column is-2">
                    <div className="field">
                        <label className="label">责任服务</label>
                        <div className="control">
                            <div className="select">
                                <select name="employee_id" value={business.employee_id} onChange={this.handleChange}>
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
                                <select name="employee_material_id" value={business.employee_material_id} onChange={this.handleChange}>
                                    <option>Please Select</option>
                                    {employeesMaterial}
                                </select>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="field column">
                    <button className="button is-primary">Submit</button>
                </div>
            </form>
        );
    }
}

export default BusinessForm;