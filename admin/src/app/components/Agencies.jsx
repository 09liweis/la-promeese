import React from 'react';
import $ from 'jquery';

import TextInput from '../elements/TextInput.jsx';

class Agencies extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            agencies: [],
            agency: {
                
            }
        };
        this.getAgencies = this.getAgencies.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.edit = this.edit.bind(this);
        this.setNew = this.setNew.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    componentDidMount() {
        this.getAgencies();
    }
    setNew() {
        this.setState({
            agency: {
                id: 0,
                name: ''
            }
        });
    }
    handleChange(e) {
        const p = e.target.name;
        const v = e.target.value;
        var agency = this.state.agency;
        agency[p] = v;
        this.setState({
            agency: agency
        });
    }
    edit(agency) {
        this.setState({
            agency: agency
        });
    }
    remove(agency) {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/agency.php?action=removeAgency',
            data: {id: agency.id},
            method: 'POST',
            success(res) {
                _this.getAgencies();
            }
        });
    }
    getAgencies() {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/agency.php?action=getAgencies',
            success(res) {
                _this.setState({
                    agencies: res
                });
            }
        });
    }
    handleSubmit(e) {
        e.preventDefault();
        const _this = this;
        $.ajax({
            url: '/admin/controllers/agency.php?action=upsertAgency',
            data: _this.state.agency,
            method: 'POST',
            success(res) {
                _this.getAgencies();
                _this.setNew();
            }
        });
    }
    render() {
        const _this = this;
        const agency = this.state.agency;
        const agencies = this.state.agencies.map((o, i) => {
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
                    {agencies}
                    </tbody>
                </table>
                </div>
                <form className="column card is-6" onSubmit={this.handleSubmit}>
                    <h2 className="is-size-2 has-text-centered">代理公司</h2>
                    <TextInput title={'名字'} name={'name'} value={agency.name} handleChange={this.handleChange} />
                    <button className="button is-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Agencies;