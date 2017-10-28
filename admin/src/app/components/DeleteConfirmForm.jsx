import React from 'react';
import $ from 'jquery';

class DeleteConfirmForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            password: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(e) {
        this.setState({
            password: e.target.value
        });
    }
    handleSubmit(e) {
        $.ajax({
            url: '/admin/controllers/student.php?action=deleteStudent',
            data: {}
        })
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
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