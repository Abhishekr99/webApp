import React,{Component} from 'react';
import {Toast} from 'react-bootstrap';

export default class MyToast extends Component{
    render(){
        const toastCss={
            position: 'fixed',
            top: '10px',
            right: '10px',
            zIndex: '1',
            boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'
        };
        return (
            this.props.show &&
            <div style={this.props.show && toastCss}>
                <Toast className={`border ${this.props.type === "success" ? "bg-success border-success" : "bg-danger border-danger"} text-white`}>
                    <Toast.Header className={`text-white ${this.props.type === "success" ? "bg-success" : "bg-danger"}`} closeButton={false}>
                        <strong className="mr-auto">{this.props.type === "success" ? "Success" : "Failure"}</strong>
                    </Toast.Header>
                    <Toast.Body className={`${this.props.type === "success" ? "bg-success" : "bg-danger"} text-white`}>
                        {this.props.message}
                    </Toast.Body>
                </Toast>
                
            </div>
        );
    }
}
