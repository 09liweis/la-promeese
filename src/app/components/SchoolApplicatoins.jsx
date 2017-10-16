import React from 'react';
import $ from 'jquery';

import Modal from './Modal.jsx';
import SchoolApplicationForm from './SchoolApplicationForm.jsx';

class SchoolApplicatoins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student_id: this.props.id,
            applications: [],
            application: {},
            modal: false
        };
        this.getSchoolApplications = this.getSchoolApplications.bind(this);
        this.setNewSchoolApplication = this.setNewSchoolApplication.bind(this);
        this.getNewSchoolApplication = this.getNewSchoolApplication.bind(this);
        this.openForm = this.openForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.edit = this.edit.bind(this);
    }
    
    componentDidMount() {
        this.setNewSchoolApplication();
        this.getSchoolApplications();
    }
    getSchoolApplications() {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/schoolApplication.php?action=getApplications',
            data: {id: _this.state.student_id},
            success(res) {
                _this.setState({
                    applications: res
                });
            }
        });
    }
    edit(a) {
        var editApplication = this.getNewSchoolApplication();
        Object.keys(editApplication).map((p) =>{
            editApplication[p] = a[p];
        });
        this.setState({
            application: editApplication,
            modal: true
        });
    }
    closeModal() {
        this.setState({
            modal: false
        });
    }
    openForm() {
        this.setState({
            application: this.getNewSchoolApplication(),
            modal: true
        });
    }
    getNewSchoolApplication() {
        return {
            student_id: this.props.id,
            id: 0,
            service_id: '',
            schools: '',
            ouac_account: '',
            ouac_password: '',
            email: '',
            email_password: '',
            service_fee: '',
            commission_progress_id: ''
        };
    }
    setNewSchoolApplication() {
        this.setState({
            application: this.getNewSchoolApplication()
        });
    }
    refreshPage() {
        this.getSchoolApplications();
        this.closeModal();
    }
    render() {
        const _this = this;
        const applications = this.state.applications.map((a) =>
            <div key={a.id}>
                <a className="button is-danger" onClick={_this.edit.bind(_this, a)}>编辑</a>
            </div>
        );
        return(
            <div>
                <a className="button is-primary" onClick={this.openForm}>添加学校申请</a>
                {applications}
                <Modal form={<SchoolApplicationForm application={this.state.application} refreshPage={this.refreshPage} />} modal={this.state.modal} closeModal={this.closeModal} />
            </div>
        );
    }
}

export default SchoolApplicatoins;