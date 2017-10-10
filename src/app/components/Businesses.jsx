import React from 'react';
import $ from 'jquery';

class Businesses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businesses: [],
            services: [],
            business: {},
            subServices: [],
            progresses: [],
            commissionProgresses: [],
        };
        this.addNew = this.addNew.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getEmptyBusiness = this.getEmptyBusiness.bind(this);
        this.setEmptyBusiness = this.setEmptyBusiness.bind(this);
        this.getBusinesses = this.getBusinesses.bind(this);
        this.edit = this.edit.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.setEmptyBusiness();
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
        this.getBusinesses(this.props.id);
    }
    getBusinesses(id) {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/business.php?action=getBusinesses',
            data: {id: id},
            success(res) {
                _this.setState({
                    businesses: res
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
    getEmptyBusiness() {
        return {
            id: 0,
            student_id: this.props.id,
            service_id: '',
            sub_service_id: '',
            progress_id: '',
            submit_date: '',
            government_fee: '',
            service_fee: '',
            post_fee: '',
            application_fee: '',
            new_date: '',
            school: {
                
            }
        };
    }
    setEmptyBusiness() {
        this.setState({
            business: this.getEmptyBusiness()
        });
    }
    addNew() {
        this.setEmptyBusiness();
    }
    edit(business) {
        this.getSubServices(business.service_id);
        this.getProgresses(business.service_id);
        var b = this.getEmptyBusiness();
        Object.keys(b).map((key) =>
            b[key] = business[key]
        );
        this.setState({
            business: b
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
                _this.setEmptyBusiness();
                _this.getBusinesses(_this.props.id);
            }
        });
    }
    render() {
        const business = this.state.business;
        const _this = this;
        const businesses = this.state.businesses.map((b) =>
            <div key={b.id} className="columns is-multiline">
                <div className="column is-2">
                    服务: {b.service_name}
                </div>
                <div className="column is-2">
                    副服务: {b.sub_service_name}
                </div>
                { b.service_id == '7' ?
                <div className="column is-2">
                    政府费: {b.government_fee}
                </div>
                :
                <div className="column is-2">
                    申请费: {b.application_fee}
                </div>
                }
                <div className="column is-2">
                    服务费: {b.service_fee}
                </div>
                <div className="column is-2">
                    邮寄费: {b.post_fee}
                </div>
                <div className="column is-2">
                    收据: 
                </div>
                <div className="column is-2">
                    递交时间: {b.submit_date}
                </div>
                <div className="column is-2">
                    进度: {b.progress_name}
                </div>
                <div className="column is-2">
                    获批时间至: {b.new_date}
                </div>
                <div className="column is-2">
                    签证:
                </div>
                <div className="column is-2">
                    <a className="button is-danger" onClick={_this.edit.bind(_this, b)}>Edit</a>
                </div>
            </div>
        );
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
        return (
            <div>
                <h2>业务</h2>
                <button className="button is-primary" onClick={this.addNew}>添加</button>
                {businesses}
                <form className="columns is-multiline" autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className="field column is-2">
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
                    <div className="field column is-2">
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
                    {(business.service_id == '7') ?
                    <div className="field column is-2">
                        <label className="label">政府费</label>
                        <div className="control">
                            <input className="input" type="text" name="government_fee" value={business.government_fee} onChange={this.handleChange} />
                        </div>
                    </div>
                    :
                    <div className="field column is-2">
                        <label className="label">申请费</label>
                        <div className="control">
                            <input className="input" type="text" name="application_fee" value={business.application_fee} onChange={this.handleChange} />
                        </div>
                    </div>
                    }
                    <div className="field column is-2">
                        <label className="label">服务费</label>
                        <div className="control">
                            <input className="input" type="text" name="service_fee" value={business.service_fee} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column is-2">
                        <label className="label">邮寄费</label>
                        <div className="control">
                            <input className="input" type="text" name="post_fee" value={business.post_fee} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column is-2">
                        收据
                    </div>
                    <div className="field column is-2">
                        <label className="label">递交时间</label>
                        <div className="control">
                            <input className="input" type="text" name="submit_date" value={business.submit_date} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column is-4">
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
                    <div className="field column is-2">
                        <label className="label">新时间</label>
                        <div className="control">
                            <input className="input" type="text" name="new_date" value={business.new_date} onChange={this.handleChange} />
                        </div>
                    </div>
                    <div className="field column">
                        <button className="button is-primary">Submit</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default Businesses;