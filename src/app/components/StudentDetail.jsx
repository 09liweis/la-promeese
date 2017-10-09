import React from 'react';
import $ from 'jquery';

import Performances from './Performances.jsx';

class StudentDetail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            student: {
                id: props.match.params.id
            }
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
        return(
            <div>
                <h1>Student Detail</h1>
                <Performances id={this.state.student.id} />
            </div>
        );
    }
}

export default StudentDetail;