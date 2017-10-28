import React from 'react';
import $ from 'jquery';

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
                    <th><a className="button is-danger" onClick={_this.edit.bind(_this, o)}>Edit</a></th>
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
                    <div className="field">
                        <label className="label">名字</label>
                        <div className="control">
                            <input className="input" type="text" name="name" value={office.name} onChange={this.handleChange} />
                        </div>
                    </div>
                    <button className="button is-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default Offices;