import React from 'react';
import $ from 'jquery';

import Modal from './Modal.jsx';
import Semesters from './Semesters.jsx';
import PerformanceForm from './PerformanceForm.jsx';

import {getColor, getDateWithoutTime } from '../services/functions.js';

class Performances extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student_id: this.props.id,
            performances: [],
            performance: {},
            modal: false
        };
        this.getPerformances = this.getPerformances.bind(this);
        this.openForm = this.openForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.getEmptyPerformance = this.getEmptyPerformance.bind(this);
        this.getNewPerformance = this.getNewPerformance.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.remove = this.remove.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const student_id = nextProps.id;
        this.setState({
            student_id: student_id
        });
    }
    closeModal() {
        this.setState({
            modal: false
        });
    }
    openForm() {
        this.setState({
            modal: true
        });
        this.getNewPerformance();
    }
    componentDidMount() {
        this.getNewPerformance();
        this.getPerformances();
    }
    getEmptyPerformance() {
        return {
            id: 0,
            student_id: this.state.student_id,
            service_id: '',
            sub_service_id: '',
            semester: '',
            school_start_date: '',
            fee: '',
            tuition: '',
            progress_id: '',
            commission_progress_id: '',
            employee_id: '',
            employee_material_id: '',
            remark: ''
        };
    }
    getNewPerformance() {
        this.setState({
            performance: this.getEmptyPerformance()
        });
    }
    addPerformanceForm(performance) {
        var p = this.getEmptyPerformance();
        Object.keys(p).map((key) =>
            p[key] = performance[key]
        );
        this.setState({
            performance: p,
            modal: true
        });
    }
    getPerformances() {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/performance.php?action=getPerformances',
            data: {id: _this.props.id},
            success(res) {
                _this.setState({
                    performances: res
                });
            }
        });
    }
    remove(p) {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/performance.php?action=removePerformance',
            method: 'POST',
            data: {id: p.id},
            success(res) {
                _this.refreshPage();
            }
        });
    }
    refreshPage() {
        this.getPerformances();
        this.closeModal();
    }
    render() {
        const _this = this;
        const performances = this.state.performances.map((p) =>
            <div key={p.id} className="card">
                <div className="columns">
                    <div className="column">
                    <p>服务: {p.service_name}</p>
                    <p>学校: {p.sub_service_name}</p>
                    </div>
                    <div className="column">
                    <p>申请费: ${p.fee}</p>
                    <p>备注: {p.remark}</p>
                    </div>
                    <div className="column">
                    <p>责任客服: {p.employee_name}</p>
                    <p>责任文案: {p.employee_material_name}</p>
                    </div>
                    <div className="column">
                    <p>最后修改: {p.last_modified_name}</p>
                    <p>最后修改时间: {getDateWithoutTime(p.updated_at)}</p>
                    </div>
                    {(this.props.user.admin_level == 1 || this.props.user.admin_level == 2) ?
                    <div className="column">
                        <a className="button is-warning" onClick={_this.addPerformanceForm.bind(_this, p)}>Edit</a>
                        <a className="button is-danger" onClick={_this.remove.bind(_this, p)}>Delete</a>
                    </div>
                    :null}
                </div>
                {p.semesters.length != 0 ?
                <Semesters semesters={p.semesters} serviceId={p.service_id} />
                :null}
            </div>
        );
        return(
            <div className="card">
                <h2 className="is-size-3 has-text-centered">业绩</h2>
                {(this.props.user.admin_level == 1 || this.props.user.admin_level == 2) ?
                <button className="button is-primary" onClick={this.openForm}>添加</button>
                :null}
                {performances}
                <Modal modal={this.state.modal} form={<PerformanceForm performance={this.state.performance} refreshPage={this.refreshPage} />} closeModal={this.closeModal} />
            </div>
        );
    }
}

export default Performances;