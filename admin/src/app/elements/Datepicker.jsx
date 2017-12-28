import React from 'react';
import Flatpickr from 'react-flatpickr';
import { getCurrentDate } from '../services/functions.js';

class Datepicker extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e) {
        let d = {
            target: {
                name: '',
                value: ''
            }
        };
        d.target.name = this.props.name;
        d.target.value = getCurrentDate(e[0]);
        this.props.handleChange(d);
    }
    render() {
        const value = this.props.value == '0000-00-00' ? '' : this.props.value;
        return (
            <Flatpickr className="input" placeholder="Please select a date" options={{dateFormat: 'Y-m-d'}} name={this.props.name} value={value} onChange={this.handleChange} />
        );
    }
}

export default Datepicker;