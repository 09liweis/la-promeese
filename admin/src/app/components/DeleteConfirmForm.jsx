import React from 'react';
import $ from 'jquery';

class DeleteConfirmForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentToDelete: this.props.studentToDelete,
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            studentToDelete: nextProps.studentToDelete
        });
    }
    handleChange(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const s = {
            id: this.state.studentToDelete.id,
            password: this.state.password
        };
        const _this = this;
        $.ajax({
            url: '/admin/controllers/student.php?action=deleteStudent',
            data: s,
            method: 'POST',
            success(res) {
                if (res == 'ok') {
                    _this.props.refreshPage();   
                } else {
                    alert('Password incorrect');
                }
            }
        });
    }
    render() {
        const studentToDelete = this.state.studentToDelete;
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>确定删除 {studentToDelete.name}</h2>
                <div className="field">
                    <label className="label">输入密码</label>
                    <div className="control">
                        <input className="input" name="password" value={this.state.password} onChange={this.handleChange} />
                    </div>
                </div>
                <button type="submit" className="button is-danger">确定删除</button>
            </form>
        );
    }
}

export default DeleteConfirmForm;