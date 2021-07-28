import React, { Component } from "react";
import { connect } from "react-redux";
import {
  Row,
  Col,
  Card,
  Form,
  InputGroup,
  FormControl,
  Button,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
  faLock,
  faUndo,
  faUserPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import MyToast from "../MyToast";
import axios from "axios";

class Profile extends Component{
    constructor(props){
        super(props);
        this.state=this.initialState;
        
    }

    initialState = {
        username:'',
        email:'',
        password:'',
        show: false
    }

    componentDidMount(){
        this.findUserById(this.props.auth.id);
    }

    findUserById = (id) => {
        axios.get(`${process.env.REACT_APP_API_URL}/api/auth/user/`+id)
        .then((res)=>{console.log("userr",res)
            const {username, email}=res.data;
            this.setState({username: username, email: email});
        })
        .catch((err)=>{
            console.log("userERr",err.response)
        })
    }

    updateUser = () => {
        let userObject = {
          id: this.props.auth.id,
          username: this.state.username,
          email: this.state.email,
          password: this.state.password
          
        };
        // this.props.registerUser(userObject);
        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/update`, userObject)
        .then((res)=>{
            if (res.data != null) {
                this.setState({ show: true });
                
              } else {
                this.setState({ show: false });
              }
    
        })
        .catch((err)=>{
            if(err.response.status === 400){
                this.setState({ show: true, message: err.response.data.message, type: "failure" });
                setTimeout(()=>this.setState({show:false}),3000);
            }
            console.log("signup err",err.response)
        })
        
       
      };

    resetUser = ()=>{
        this.setState(() => this.initialState);
    }

    userChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };

    render(){
        const {username, email, password} = this.state;
        return (
            <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={"Profile updated succesfully !"}
            type={"success"}
          />
        </div>
        
        <Row className="justify-content-md-center">
          <Col xs={5}>
          
            <Card className={"border border-dark bg-dark text-white"}>
              <Card.Header>
                <FontAwesomeIcon icon={faUserPlus} /> Profile
              </Card.Header>
              
              <Card.Body>
              
                  <Form.Group as={Col}>
                    
                     <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faUser}/></span>
                        <input 
                            type="text" required autoComplete="off"
                            className="form-control bg-dark text-white" 
                            placeholder="Enter Username" 
                            name="username"
                            value={username} 
                            onChange={this.userChange}/>
                    </div>
                  </Form.Group>
                
                
                  <Form.Group as={Col}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faEnvelope}/></span>
                        <input 
                            type="text" required autoComplete="off"
                            className="form-control bg-dark text-white" 
                            placeholder="Enter Email" 
                            name="email"
                            value={email} 
                            onChange={this.userChange}/>
                    </div>
                    
                  </Form.Group>
                
                
                  <Form.Group as={Col}>
                    <div className="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1"><FontAwesomeIcon icon={faLock}/></span>
                        <input 
                            type="password" required autoComplete="off" min="6"
                            className="form-control bg-dark text-white" 
                            placeholder="Enter Password" 
                            name="password"
                            value={password} 
                            onChange={this.userChange}/>
                    </div>
                    
                  </Form.Group>
                
                  {this.state.password.length < 6 && this.state.password.length > 0 &&
                <div className="alert alert-secondary" role="alert">
                    Password must be atleast 6 characters
                </div>}
              </Card.Body>
              <Card.Footer style={{ textAlign: "right" }}>
                <Button
                  size="sm"
                  type="button"
                  variant="success"
                  onClick={this.updateUser}
                  disabled={
                    this.state.email.length === 0 || this.state.username.length === 0 ||
                    this.state.password.length < 6
                  }
                >
                  <FontAwesomeIcon icon={faUserPlus} /> Update Profile
                </Button>{" "}
                <Button
                  size="sm"
                  type="button"
                  variant="info"
                  onClick={this.resetUser}
                >
                  <FontAwesomeIcon icon={faUndo} /> Reset
                </Button>
                
              </Card.Footer>
              
            </Card>
            
          </Col>
        </Row>
        
      </div>
            
        );
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth
    }
};

export default connect(mapStateToProps)(Profile);