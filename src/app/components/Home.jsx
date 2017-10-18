import React from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';

import Modal from './Modal.jsx';
import StudentForm from './StudentForm.jsx';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            students: [],
            modal: false
        };
        this.addStudent = this.addStudent.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.refreshStudents = this.refreshStudents.bind(this);
    }
    componentDidMount() {
        this.refreshStudents();
    }
    refreshStudents() {
        this.closeModal();
        const _this = this;
        $.ajax({
            url: '/admin/controllers/student.php?action=getStudents',
            success(res) {
                _this.setState({
                    students: res
                });
            }
        });
    }
    addStudent() {
        this.setState({
            modal: true
        });
    }
    closeModal() {
        this.setState({
            modal: false
        });
    }
    render() {
        const students = this.state.students;
        const list = students.map((s) =>
            <tr key={s.id}>
                <th><Link to={`/admin/student/${s.id}`}>{s.name}</Link></th>
                <th>{s.visa_date}</th>
                <th>{s.passport_date}</th>
                <th>{s.phone}</th>
                <th>{s.agency_name}</th>
                <th>{s.employee_name}</th>
                <th></th>
                <th>{s.service}</th>
                <th>{s.service_fee}</th>
                <th>school</th>
                <th>{s.office_name}</th>
                <th>{s.progress}</th>
                <th>{s.updated_at}</th>
            </tr>
        );
        return(
            <div className="card">
                <a className="button is-primary" onClick={this.addStudent}>添加学生</a>
                <table className="table is-fullwidth is-striped is-narrow">
                    <thead>
                        <tr>
                            <th>姓名</th>
                            <th>签证到期日</th>
                            <th>护照到期日</th>
                            <th>联系方式</th>
                            <th>代理公司</th>
                            <th>责任客服</th>
                            <th>责任文案</th>
                            <th>服务内容</th>
                            <th>服务金额</th>
                            <th>学校</th>
                            <th>客人归属</th>
                            <th>进度</th>
                            <th>更新时间</th>
                        </tr>
                    </thead>
                    <tbody>
                    {list}
                    </tbody>
                </table>
                <Modal modal={this.state.modal} form={<StudentForm refreshPage={this.refreshStudents} />} closeModal={this.closeModal} title='添加学生' />
            </div>
        );
    }
}

export default Home;