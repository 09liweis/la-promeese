import React from 'react';
import $ from 'jquery';

import Modal from './Modal.jsx';
import SchoolApplicationForm from './SchoolApplicationForm.jsx';
import SchoolApplication from './SchoolApplication.jsx';
import ConfirmDeleteForm from '../forms/ConfirmDeleteForm.jsx';

class SchoolApplicatoins extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student_id: this.props.id,
            applications: [],
            application: {},
            modal: false,
            delete: false,
            deleteId: ''
        };
        this.getSchoolApplications = this.getSchoolApplications.bind(this);
        this.setNewSchoolApplication = this.setNewSchoolApplication.bind(this);
        this.getNewSchoolApplication = this.getNewSchoolApplication.bind(this);
        this.openForm = this.openForm.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.edit = this.edit.bind(this);
        this.remove = this.remove.bind(this);
        this.removeConfirm = this.removeConfirm.bind(this);
        this.closeRemove = this.closeRemove.bind(this);
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
        this.setNewSchoolApplication();
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
            schools: [],
            ouac_confirmation_number: '',
            ouac_account: '',
            ouac_password: '',
            email: '',
            email_password: '',
            service_fee: '',
            commission_progress_id: '',
            employee_id: '',
            employee_material_id: '',
            remark: ''
        };
    }
    setNewSchoolApplication() {
        this.setState({
            application: this.getNewSchoolApplication()
        });
    }
    remove(id) {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/schoolApplication.php?action=removeSchoolApplication',
            method: 'POST',
            data: {id: id},
            success(res) {
                _this.setState({
                    delete: false
                });
                _this.refreshPage();
            }
        });
    }
    removeConfirm(b) {
        this.setState({
            delete: true,
            deleteId: b.id
        });
    }
    closeRemove() {
        this.setState({
            delete: false
        });
    }
    refreshPage() {
        this.getSchoolApplications();
        this.closeModal();
    }
    render() {
        const _this = this;
        const applications = this.state.applications.map((a) =>
            <SchoolApplication user={_this.props.user} key={a.id} application={a} edit={_this.edit.bind(_this, a)} remove={_this.removeConfirm.bind(_this, a)} />
        );
        return(
            <div className="card">
                <h2 className="is-size-3 has-text-centered">收费学校申请</h2>
                {(this.props.user.admin_level == 1 || this.props.user.admin_level == 2) ?
                <a className="button is-primary" onClick={this.openForm}>添加学校申请</a>
                :null}
                {applications}
                <Modal form={<SchoolApplicationForm application={this.state.application} refreshPage={this.refreshPage} />} modal={this.state.modal} closeModal={this.closeModal} />
                <Modal width={'414px'} form={<ConfirmDeleteForm deleteId={this.state.deleteId} remove={this.remove} />} modal={this.state.delete} closeModal={this.closeRemove} />
            </div>
        );
    }
}

export default SchoolApplicatoins;