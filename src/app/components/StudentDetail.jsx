import React from 'react';
import $ from 'jquery';

import Modal from './Modal.jsx';
import StudentForm from './StudentForm.jsx';
import Performances from './Performances.jsx';
import Businesses from './Businesses.jsx';
import SchoolApplicatoins from './SchoolApplicatoins.jsx';

class StudentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                id: props.match.params.id
            },
            modal: false
        };
        this.closeModal = this.closeModal.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.edit = this.edit.bind(this);
    }
    edit() {
        this.setState({
            modal: true
        });
    }
    closeModal() {
        this.setState({
            modal: false
        });
    }
    componentDidMount() {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/student.php?action=getStudent',
            data: {id: _this.state.student.id},
            success(res) {
                _this.setState({
                    student: res
                });
            }
        });
    }
    refreshPage() {
        this.closeModal();
    }
    render() {
        const s = this.state.student;
        return(
            <div>
                <h1>Student Detail</h1>
                <a className="button is-danger" onClick={this.edit}>编辑学生</a>
                <Modal modal={this.state.modal} closeModal={this.closeModal} form={<StudentForm student={this.state.student} refreshPage={this.refreshPage} />} />
                <Performances id={this.state.student.id} />
                <Businesses id={this.state.student.id} />
                <SchoolApplicatoins id={this.state.student.id} />
            </div>
        );
    }
}

export default StudentDetail;