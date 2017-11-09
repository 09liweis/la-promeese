import React from 'react';

class Modal extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            width: '100%'
        };
    }
    componentWillReceiveProps(nextProps) {
        if (typeof nextProps.width != 'undefined') {
            this.setState({
                width: nextProps.width
            });
        }
    }
    render() {
        let modalClass = 'modal animated slideInDown';
        modalClass = this.props.modal ? modalClass + ' is-active' : modalClass;
        const style = {'width': this.state.width};
        return (
            <div className={modalClass}>
                <div className="modal-background" onClick={this.props.closeModal}></div>
                <div className="modal-card" style={style}>
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