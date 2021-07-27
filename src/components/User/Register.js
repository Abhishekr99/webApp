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

export default class Register extends Component {
  constructor(props) {
    super(props);
    this.state = this.initialState;
    this.state.show = false;
    this.state.message = "";
    this.state.type="";
  }

  initialState = {
    username: "",
    email: "",
    password: ""
    
  };

  userChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  registerUser = () => {
    let userObject = {
      username: this.state.username,
      email: this.state.email,
      password: this.state.password,
      role:["user"]
    };
    // this.props.registerUser(userObject);
    axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, userObject)
    .then((res)=>{
        if (res.data.message != null) {
            this.setState({ show: true, message: res.data.message, type: "success" });
            setTimeout(() => {
              this.setState({ show: false });
              this.props.history.push("/login");
            }, 3000);
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
    this.resetRegisterForm();
    // setTimeout(() => {
    //   if (this.props.user.message != null) {
    //     this.setState({ show: true, message: this.props.user.message });
    //     setTimeout(() => {
    //       this.setState({ show: false });
    //       this.props.history.push("/login");
    //     }, 3000);
    //   } else {
    //     this.setState({ show: false });
    //   }
    // }, 2000);
  };

  resetRegisterForm = () => {
    this.setState(() => this.initialState);
  };

  render() {
    const { username, email, password } = this.state;

    return (
      <div>
        <div style={{ display: this.state.show ? "block" : "none" }}>
          <MyToast
            show={this.state.show}
            message={this.state.message}
            type={this.state.type}
          />
        </div>
        
        <Row className="justify-content-md-center">
          <Col xs={5}>
          
            <Card className={"border border-dark bg-dark text-white"}>
              <Card.Header>
                <FontAwesomeIcon icon={faUserPlus} /> Register
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
                  onClick={this.registerUser}
                  disabled={
                    this.state.email.length === 0 || this.state.username.length === 0 ||
                    this.state.password.length < 6
                  }
                >
                  <FontAwesomeIcon icon={faUserPlus} /> Register
                </Button>{" "}
                <Button
                  size="sm"
                  type="button"
                  variant="info"
                  onClick={this.resetRegisterForm}
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

// const mapStateToProps = (state) => {
//   return {
//     user: state.user,
//   };
// };

// const mapDispatchToProps = (dispatch) => {
//   return {
//     registerUser: (userObject) => dispatch(registerUser(userObject)),
//   };
// };

// export default Register;