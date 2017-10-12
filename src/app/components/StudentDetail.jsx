import React from 'react';
import $ from 'jquery';
import { Link } from 'react-router-dom';

import Performances from './Performances.jsx';
import Businesses from './Businesses.jsx';

class StudentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                id: props.match.params.id
            },
            modal: false
        };
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
    render() {
        const s = this.state.student;
        return(
            <div>
                <h1>Student Detail</h1>
                <Link to={`/admin/student/${s.id}/edit`}>Edit Student</Link>
                <Performances id={this.state.student.id} />
                <Businesses id={this.state.student.id} />
            </div>
        );
    }
}

export default StudentDetail;