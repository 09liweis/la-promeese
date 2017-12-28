import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

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
            returnURL: '',
            modal: false
        };
        this.closeModal = this.closeModal.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.edit = this.edit.bind(this);
        this.getStudent = this.getStudent.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        const search = nextProps.location.search;
        if (search != '') {
            const returnURL = search.substring(11);
            this.setState({
                returnURL: returnURL
            });
        }
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
        this.getStudent();
    }
    getStudent() {
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
        this.getStudent();
    }
    render() {
        console.log(this.state.returnURL);
        const s = this.state.student;
        let student = '';
        if (typeof s.name != 'undefined') {
            student = 
                <div className="card">
                    <div className="columns">
                    <div className="column">
                        <h1>{s.name}</h1>
                        <p>
                            <span className="icon has-text-success">
                                <i className="fa fa-genderless"></i>
                            </span>
                            {s.gender}
                        </p>
                        <p>
                            <span className="icon has-text-success">
                                <i className="fa fa-birthday-cake"></i>
                            </span>
                            {s.dob}
                        </p>
                        <p>
                            <span className="icon has-text-success">
                                <i className="fa fa-phone"></i>
                            </span>
                            {s.phone}
                        </p>
                        <p>
                            <span className="icon has-text-success">
                                <i className="fa fa-envelope"></i>
                            </span>
                            {s.email}
                        </p>
                    </div>
                    <div className="column">
                        <p>护照号码: {s.passport_number}</p>
                        <p>护照到期日: {s.passport_date}</p>
                        <p>身份: {s.status}</p>
                        <p>签证信息: {s.visa_info}</p>
                        <p>签证到期日: {s.visa_date}</p>
                    </div>
                    <div className="column">
                        <p>地区: {s.region_name}</p>
                        <p>省份: {s.province_name}</p>
                        <p>城市: {s.city_name}</p>
                    </div>
                    <div className="column">
                        <p>客人归属地: {s.office_name}</p>
                        <p>代理公司: {s.agency_name}</p>
                        <p>责任客服: {s.employee_name}</p>
                        <p>服务内容: {s.service_name}</p>
                        <p>备注: {s.remark}</p>
                    </div>
                    </div>
                    {this.props.user.admin_level != '4' ?
                    <a className="button is-danger" onClick={this.edit}>编辑客户</a>
                    :null}
                </div>;
        }
        return(
            <div className="">
                {student}
                <Modal modal={this.state.modal} closeModal={this.closeModal} form={<StudentForm student={this.state.student} refreshPage={this.refreshPage} />} />
                <Performances id={this.state.student.id} user={this.props.user} />
                <Businesses id={this.state.student.id} user={this.props.user} />
                <SchoolApplicatoins id={this.state.student.id} user={this.props.user} />
            </div>
        );
    }
}

export default StudentDetail;