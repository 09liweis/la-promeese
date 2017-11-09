import React from 'react';
import $ from 'jquery';

class SchoolApplication extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            application: this.props.application
        };
    }
    componentWillReceiveProps(nextProps) {
        const a = nextProps.application;
        this.setState({
            application: a
        });
    }
    render() {
        const a = this.state.application;
        const schools = JSON.parse(this.state.application.schools);
        const list = schools.map((s, i)=>
            <tr key={i}>
                <td>{s.sub_service_name}</td>
                <td>${s.application_fee}</td>
                <td>{s.student_number}</td>
                <td>{s.password}</td>
                <td>{s.progress_name}</td>
            </tr>
        );
        return (
            <div className="card">
                <div className="columns">
                    <div className="column">
                    {a.service_name}
                    </div>
                    <div className="column">
                    <p>OUAC Confirmation Number: {a.ouac_confirmation_number}</p>
                    <p>OUAC账号: {a.ouac_account}</p>
                    <p>OUAC密码: {a.ouac_password}</p>
                    </div>
                    <div className="column">
                    <p>Email: {a.email}</p>
                    <p>Email密码: {a.email_password}</p>
                    </div>
                    <div className="column">
                    <p>备注: {a.remark}</p>
                    <p>最后修改人: {a.last_modified_name}</p>
                    <p>最后修改时间: {a.updated_at}</p>
                    </div>
                    {(this.props.user.admin_level == 1 || this.props.user.admin_level == 2) ?
                    <div className="column">
                        <a className="button is-warning" onClick={this.props.edit}>Edit</a>
                        <a className="button is-danger" onClick={this.props.remove}>Delete</a>
                    </div>
                    :null}
                </div>
                <table className="table is-fullwidth is-striped is-narrow">
                    <thead>
                        <tr>
                            <th>学校</th>
                            <th>申请费</th>
                            <th>学号</th>
                            <th>密码</th>
                            <th>进度</th>
                        </tr>
                    </thead>
                    <tbody>
                    {list}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default SchoolApplication;