import React, {Component} from 'react';
import {Row, Col, Card, Form, InputGroup, FormControl, Button, Alert} from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignInAlt, faEnvelope, faLock, faUndo} from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { authenticateUser } from '../../services/index';

class Login extends Component{
    constructor(props) {
        super(props);
        this.state = this.initialState;
    }

    initialState = {
        username:'', password:'', error:''
    };

    resetLoginForm = () => {
        this.setState(() => this.initialState);
    };

    credentialChange = event => {
        this.setState({
            [event.target.name] : event.target.value
        });
    };

    validateUser = ()=>{
        this.props.authenticateUser(this.state.username, this.state.password);
        setTimeout(()=>{
            if(this.props.auth.isLoggedIn){
                return this.props.history.push('/')
            }
            else{
                this.resetLoginForm();
                this.setState({error: 'Invalid username and password'})
            }
        },500)
    };

    render(){
        const {username, password, error} = this.state;

        return(
        <Row className="justify-content-md-center">
            <Col xs={5}>
                {/* {this.props.message && <Alert variant="success">{this.props.message}</Alert>}
                {error && <Alert variant="danger">{error}</Alert>} */}
                {this.state.error && <Alert variant="danger">{error}</Alert>}
                <Card className={"border border-dark bg-dark text-white"}>
                    <Card.Header>
                        <FontAwesomeIcon icon={faSignInAlt}/> Login
                    </Card.Header>
                    <Card.Body>
                        
                            <Form.Group as={Col}>
                                
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faEnvelope}/></span>
                                    <input 
                                     type="text" required autoComplete="off"
                                     className="form-control bg-dark text-white" 
                                     placeholder="Enter Username" 
                                     name="username"
                                     value={username} 
                                     onChange={this.credentialChange}/>
                                </div>
                            </Form.Group>
                        
                            <Form.Group as={Col}>
                                
                                <div className="input-group mb-3">
                                    <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faLock}/></span>
                                    <input 
                                     type="password" required autoComplete="off"
                                     className="form-control bg-dark text-white" 
                                     placeholder="Enter Password" 
                                     name="password"
                                     value={password} 
                                     onChange={this.credentialChange}/>
                                </div>
                            </Form.Group>
                            
                        
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" type="button" variant="success" onClick={this.validateUser}
                            disabled={this.state.username.length === 0 || this.state.password.length === 0}>
                            <FontAwesomeIcon icon={faSignInAlt}/> Login
                        </Button>{' '}
                        <Button size="sm" type="button" variant="info" onClick={this.resetLoginForm}
                            disabled={this.state.username.length === 0 && this.state.password.length === 0 && this.state.error.length === 0}>
                            <FontAwesomeIcon icon={faUndo}/> Reset
                        </Button>
                    </Card.Footer>
                </Card>
            </Col>
        </Row>

        
        );
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return{
        authenticateUser: (username, password)=>dispatch(authenticateUser(username, password))
    }
};


export default connect(mapStateToProps, mapDispatchToProps)(Login);
