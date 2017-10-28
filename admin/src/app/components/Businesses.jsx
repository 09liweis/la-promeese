import React from 'react';
import $ from 'jquery';

import Modal from './Modal.jsx';
import BusinessForm from './BusinessForm.jsx';

class Businesses extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            businesses: [],
            business: {},
            modal: false
        };
        this.addNew = this.addNew.bind(this);
        
        this.setEmptyBusiness = this.setEmptyBusiness.bind(this);
        this.getBusinesses = this.getBusinesses.bind(this);
        this.edit = this.edit.bind(this);
        this.refreshPage = this.refreshPage.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }
    closeModal() {
        this.setState({
            modal: false
        });
    }
    componentDidMount() {
        this.setEmptyBusiness();
        this.getBusinesses(this.props.id);
    }
    getBusinesses(id) {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/business.php?action=getBusinesses',
            data: {id: id},
            success(res) {
                _this.setState({
                    businesses: res
                });
            }
        });
    }
    
    
    getEmptyBusiness() {
        return {
            id: 0,
            student_id: this.props.id,
            service_id: '',
            sub_service_id: '',
            progress_id: '',
            submit_date: '',
            government_fee: '',
            service_fee: '',
            post_fee: '',
            application_fee: '',
            new_date: '',
            employee_id: '',
            employee_material_id: ''
        };
    }
    setEmptyBusiness() {
        this.setState({
            business: this.getEmptyBusiness()
        });
    }
    addNew() {
        this.setEmptyBusiness();
        this.setState({
            modal: true
        });
    }
    edit(business) {
        var b = this.getEmptyBusiness();
        Object.keys(b).map((key) =>
            b[key] = business[key]
        );
        this.setState({
            business: b,
            modal: true
        });
    }
    remove(b) {
        const _this = this;
        $.ajax({
            url: '/admin/controllers/business.php?action=removeBusiness',
            method: 'POST',
            data: {id: b.id},
            success(res) {
                _this.refreshPage();
            }
        });
    }
    refreshPage() {
        this.getBusinesses(this.props.id);
        this.closeModal();
    }
    render() {
        const _this = this;
        const businesses = this.state.businesses.map((b) => {
            let date = '';
            switch (b.service_id) {
                case '7':
                    date = '获批时间至';
                    break;
                case '8':
                    date = '登陆时间';
                    break;
                case '9':
                    date = '入职时间';
                    break;
            }
            return (
                <div key={b.id} className="columns is-multiline card">
                    <div className="column">
                        <p>服务: {b.service_name}</p>
                        <p>副服务: {b.sub_service_name}</p>
                    </div>
                    
                    <div className="column">
                    { b.service_id == '7' ?
                        <p>政府费: ${b.government_fee}</p>
                    :
                        <p>申请费: ${b.application_fee}</p>
                    }
                        <p>服务费: ${b.service_fee}</p>
                        <p>邮寄费: ${b.post_fee}</p>
                    </div>
                    <div className="column">
                        <p>递交时间: {b.submit_date}</p>
                        <p>进度: {b.progress_name}</p>
                        <p>{date}: {b.new_date}</p>
                    </div>
                    <div className="column">
                        <p>责任客服: {b.employee_name}</p>
                        <p>责任文案: {b.employee_material_name}</p>
                    </div>
                    {(this.props.user.admin_level != 3) ?
                    <div className="column">
                        <a className="button is-warning" onClick={_this.edit.bind(_this, b)}>Edit</a>
                        <a className="button is-danger" onClick={_this.remove.bind(_this, b)}>Delete</a>
                    </div>
                    :null}
                </div>
            );
        });
        return (
            <div className="card">
                <h2 className="is-size-3 has-text-centered">业务</h2>
                {(this.props.user.admin_level != 3) ?
                <button className="button is-primary" onClick={this.addNew}>添加</button>
                :null}
                {businesses}
                <Modal modal={this.state.modal} closeModal={this.closeModal} form={<BusinessForm business={this.state.business} refreshPage={this.refreshPage} />}  />
            </div>
        );
    }
}

export default Businesses;