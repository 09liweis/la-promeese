import React from 'react';

class ConfirmDeleteForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            deleteId: props.deleteId
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            deleteId: nextProps.deleteId
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        this.props.remove(this.state.deleteId);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit}>
                <h2>确定删除</h2>
                <button type="submit" className="button is-danger">删除</button>
            </form>
        );
    }
}

export default ConfirmDeleteForm;