import React from 'react';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="field">
                <label className="label">{this.props.title}</label>
                <div className="control">
                    <input className="input" type="text" name={this.props.name} value={this.props.value} onChange={this.props.handleChange} />
                </div>
            </div>
        );
    }
}

export default TextInput;