import React from 'react';
import $ from 'jquery';

import Modal from './Modal.jsx';
import PerformanceForm from './PerformanceForm.jsx';

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
            fee: '',
            progress_id: '',
            commission_progress_id: '',
            employee_id: '',
            employee_material_id: ''
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
            <tr key={p.id}>
                <td>{p.service_name}</td>
                <td>{p.sub_service_name}</td>
                <td>${p.fee}</td>
                <td>{p.progress_name}</td>
                <td>{p.commission_progress_name}</td>
                <td>{p.employee_name}</td>
                <td>{p.employee_material_name}</td>
                {(this.props.user.admin_level != 3) ?
                <td>
                    <a className="button is-warning" onClick={_this.addPerformanceForm.bind(_this, p)}>Edit</a>
                    <a className="button is-danger" onClick={_this.remove.bind(_this, p)}>Delete</a>
                </td>
                :null}
            </tr>
        );
        return(
            <div className="card">
                <h2 className="is-size-3 has-text-centered">业绩</h2>
                {(this.props.user.admin_level != 3) ?
                <button className="button is-primary" onClick={this.openForm}>添加</button>
                :null}
                <table className="table is-fullwidth is-striped is-narrow">
                    <thead>
                    <tr>
                        <th>服务</th>
                        <th>学校</th>
                        <th>学费</th>
                        <th>进度</th>
                        <th>佣金申报</th>
                        <th>责任客服</th>
                        <th>责任文案</th>
                        {(this.props.user.admin_level != 3) ?
                        <th>Actions</th>
                        :null}
                    </tr>
                    </thead>
                    <tbody>
                    {performances}
                    </tbody>
                </table>
                <Modal modal={this.state.modal} form={<PerformanceForm performance={this.state.performance} refreshPage={this.refreshPage} />} closeModal={this.closeModal} />
            </div>
        );
    }
}

export default Performances;