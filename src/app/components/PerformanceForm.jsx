import React from 'react';
import $ from 'jquery';

class PerformanceForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            performance: this.props.performance,
            services: [],
            subServices: [],
            progresses: [],
            commissionProgresses: []
        };
        this.getNewPerformance = this.getNewPerformance.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.addPerformanceForm = this.addPerformanceForm.bind(this);
        this.getSubServices = this.getSubServices.bind(this);
        this.getProgresses = this.getProgresses.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getEmptyPerformance = this.getEmptyPerformance.bind(this);
    }
    componentDidMount() {
        this.getNewPerformance();
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
    }
    getEmptyPerformance() {
        return {
                id: 0,
                student_id: this.props.id,
                service_id: '',
                sub_service_id: '',
                fee: '',
                progress_id: '',
                commission_progress_id: ''
            };
    }
    getNewPerformance() {
        this.setState({
            performance: this.getEmptyPerformance()
        });
    }
    addNew() {
        this.getNewPerformance();
    }
    addPerformanceForm(performance) {
        this.getSubServices(performance.service_id);
        this.getProgresses(performance.service_id);
        var p = this.getEmptyPerformance();
        Object.keys(p).map((key) =>
            p[key] = performance[key]
        );
        this.setState({
            performance: p
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
        $.ajax({
            url: '/admin/controllers/performance.php?action=upsertPerformance',
            method: 'POST',
            data: _this.state.performance,
            success(res) {
                _this.getNewPerformance();
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
        const performance = this.state.performance;
        return (
            <form className="columns is-multiline" onSubmit={this.handleSubmit}>
                <div className="field column is-2">
                    <label className="label">服务</label>
                    <div className="control">
                        <div className="select">
                            <select name="service_id" value={performance.service_id} onChange={this.handleChange}>
                                <option>Please Select</option>
                                {services}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field column is-2">
                    <label className="label">学校</label>
                    <div className="control">
                        <div className="select">
                            <select name="sub_service_id" value={performance.sub_service_id} onChange={this.handleChange}>
                                <option>Please Select</option>
                                {subServices}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field column is-2">
                    <label className="label">学费</label>
                    <div className="control">
                        <input className="input" type="text" name="fee" value={performance.fee} onChange={this.handleChange} />
                    </div>
                </div>
                <div className="field column is-2">
                    <label className="label">进度</label>
                    <div className="control">
                        <div className="select">
                            <select name="progress_id" value={performance.progress_id} onChange={this.handleChange}>
                                <option>Please Select</option>
                                {progresses}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field column is-2">
                    <label className="label">佣金申报</label>
                    <div className="control">
                        <div className="select">
                            <select name="commission_progress_id" value={performance.commission_progress_id} onChange={this.handleChange}>
                                <option>Please Select</option>
                                {commissionProgresses}
                            </select>
                        </div>
                    </div>
                </div>
                <div className="field column is-2">
                    <label className="label">客人归属</label>
                    <div className="control">
                    </div>
                </div>
                <div className="column is-2">
                    <button className="button is-primary">提交</button>
                </div>
            </form>
        );
    }
}

export default PerformanceForm;