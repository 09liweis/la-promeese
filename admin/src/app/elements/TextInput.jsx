import React from 'react';
import InputMask from 'react-input-mask';

class TextInput extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        let inputField = <input className="input" type="text" name={this.props.name} value={this.props.value} onChange={this.props.handleChange} />;
        if (this.props.type == 'phone') {
            inputField = <InputMask className="input" name={this.props.name} value={this.props.value} mask="999-999-9999" placeholder="123-456-7890" maskChar=" "  onChange={this.props.handleChange} />;
        }
        return (
            <div className="field">
                <label className="label">{this.props.title}</label>
                <div className="control">
                    {inputField}
                </div>
            </div>
        );
    }
}

export default TextInput;