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
            school: {
                
            }
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
    refreshPage() {
        this.getBusinesses(this.props.id);
        this.closeModal();
    }
    render() {
        const _this = this;
        const businesses = this.state.businesses.map((b) =>
            <div key={b.id} className="columns is-multiline">
                <div className="column is-2">
                    服务: {b.service_name}
                </div>
                <div className="column is-2">
                    副服务: {b.sub_service_name}
                </div>
                { b.service_id == '7' ?
                <div className="column is-2">
                    政府费: {b.government_fee}
                </div>
                :
                <div className="column is-2">
                    申请费: {b.application_fee}
                </div>
                }
                <div className="column is-2">
                    服务费: {b.service_fee}
                </div>
                <div className="column is-2">
                    邮寄费: {b.post_fee}
                </div>
                <div className="column is-2">
                    收据: 
                </div>
                <div className="column is-2">
                    递交时间: {b.submit_date}
                </div>
                <div className="column is-2">
                    进度: {b.progress_name}
                </div>
                <div className="column is-2">
                    获批时间至: {b.new_date}
                </div>
                <div className="column is-2">
                    签证:
                </div>
                <div className="column is-2">
                    <a className="button is-danger" onClick={_this.edit.bind(_this, b)}>Edit</a>
                </div>
            </div>
        );
        return (
            <div>
                <h2>业务</h2>
                <button className="button is-primary" onClick={this.addNew}>添加</button>
                {businesses}
                <Modal modal={this.state.modal} closeModal={this.closeModal} form={<BusinessForm business={this.state.business} refreshPage={this.refreshPage} />}  />
            </div>
        );
    }
}

export default Businesses;