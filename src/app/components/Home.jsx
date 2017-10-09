import React from 'react';
import { Link } from 'react-router-dom'
import $ from 'jquery';

class Home extends React.Component {
    constructor() {
        super();
        this.state = {
            students: []
        };
    }
    componentDidMount() {
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
    render() {
        const students = this.state.students;
        const list = students.map((s) =>
            <tr key={s.id}>
                <th><Link to={`/admin/student/${s.id}`}>{s.name}</Link></th>
                <th>{s.visa_date}</th>
                <th>{s.passport_date}</th>
                <th>{s.phone}</th>
                <th>{s.agency_id}</th>
                <th>{s.employee_id}</th>
                <th></th>
                <th>$$$</th>
                <th>school</th>
                <th>{s.location_id}</th>
                <th></th>
                <th>Time</th>
            </tr>
        );
        return(
            <table className="table is-fullwidth is-striped is-narrow">
                <thead>
                    <tr>
                        <th>姓名</th>
                        <th>签证到期日</th>
                        <th>护照到期日</th>
                        <th>联系方式</th>
                        <th>代理公司</th>
                        <th>责任客服</th>
                        <th>服务项目</th>
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
        );
    }
}

export default Home;