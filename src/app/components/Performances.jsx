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
            commission_progress_id: ''
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
                <td>{p.fee}</td>
                <td>{p.progress_name}</td>
                <td>{p.commission_progress_name}</td>
                <td><a className="button is-danger" onClick={_this.addPerformanceForm.bind(_this, p)}>Edit</a></td>
            </tr>
        );
        return(
            <div className="card">
                <h2>业绩</h2>
                <button className="button is-primary" onClick={this.openForm}>添加</button>
                <table className="table is-fullwidth is-striped is-narrow">
                    <thead>
                    <tr>
                        <th>服务</th>
                        <th>学校</th>
                        <th>学费</th>
                        <th>进度</th>
                        <th>佣金申报</th>
                        <th>客人归属</th>
                        <th>Actions</th>
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