import React from 'react';
import $ from 'jquery';

import TextInput from '../elements/TextInput.jsx';

class Offices extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            offices: [],
            office: {
                
            }
        };
        this.getOffices = this.getOffices.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.edit = this.edit.bind(this);
        this.setNew = this.setNew.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.remove = this.remove.bind(this);
    }
    componentDidMount() {
        this.getOffices();
    }
    setNew() {
        this.setState({
            office: {
                id: 0,
                name: ''
            }
        });
    }
    handleChange(e) {
        const p = e.target.name;
        const v = e.target.value;
        var office = this.state.office;
        office[p] = v;
        this.setState({
            office: office
        });
    }
    edit(office) {
        this.setState({
            office: office
        });
    }
    remove(office) {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/office.php?action=removeOffice',
            data: {id: office.id},
            method: 'POST',
            success(res) {
                _this.getOffices();
            }
        });
    }
    getOffices() {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/office.php?action=getOffices',
            success(res) {
                _this.setState({
                    offices: res
                });
            }
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const _this = this;
        $.ajax({
            url: '/admin/controllers/office.php?action=upsertOffice',
            data: _this.state.office,
            method: 'POST',
            success(res) {
                _this.getOffices();
                _this.setNew();
            }
        });
    }
    render() {
        const _this = this;
        const office = this.state.office;
        const offices = this.state.offices.map((o, i) => {
            return (
                <tr key={i}>
                    <th>{o.name}</th>
                    <th>
                        <a className="button is-warning" onClick={_this.edit.bind(_this, o)}>Edit</a>
                        <a className="button is-danger" onClick={_this.remove.bind(_this, o)}>Delete</a>
                    </th>
                </tr>
            );
        }
        );
        return(
            <div className="columns">
                <div className="column card is-6">
                <a className="button is-primary" onClick={this.setNew}>Add</a>
                <table className="table is-fullwidth is-striped is-narrow">
                    <thead>
                        <tr>
                            <th>名字</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                    {offices}
                    </tbody>
                </table>
                </div>
                <form className="column card is-6" onSubmit={this.handleSubmit}>
                    <h2 className="is-size-2 has-text-centered">客人归属</h2>
                    <TextInput title={'名字'} name={'name'} value={office.name} handleChange={this.handleChange} />
                    <button className="button is-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Offices;