import React from 'react';

export default class Dropdown extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            title: props.title,
            name: props.name,
            value: props.value,
            options: []
        };
    }
    componentWillReceiveProps(nextProps) {
        this.setState({
            options: nextProps.options,
            value: nextProps.value
        });
    }
    render() {
        return (
            <div className="field">
                <label className="label">{this.state.title}</label>
                <div className="control">
                    <div className="select">
                        <select name={this.state.name} value={this.state.value} onChange={this.props.handleChange}>
                            <option value="">Select dropdown</option>
                            {this.state.options}
                        </select>
                    </div>
                </div>
            </div>
        );
    }
}