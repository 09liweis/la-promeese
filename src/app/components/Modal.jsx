import React from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        
    }
    render() {
        const modalClass = this.props.modal ? 'modal is-active' : 'modal';
        return (
            <div className={modalClass}>
                <div className="modal-background" onClick={this.props.closeModal}></div>
                <div className="modal-card">
                    <header className="modal-card-head">
                        <p className="modal-card-title">{this.props.title}</p>
                        <button className="delete" aria-label="close" onClick={this.props.closeModal}></button>
                    </header>
                    <section className="modal-card-body">
                    {this.props.form}
                    </section>
                    <footer className="modal-card-foot">
                    </footer>
                </div>
            </div>
        );
    }
}

export default Modal;