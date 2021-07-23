import React,{Component} from 'react';
import {Card, Form, Button, Row, Col} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

export default class Company extends Component{
    constructor(props){
        super(props);
        this.state=this.initialState;
    }

    initialState = {
        compName:'',
        turnover:'',
        ceo:'',
        boardOfDirectors:'',
        sector:'',
        compBrief:''
    }

    submitCompany = (e)=>{
        e.preventDefault();
        const reqBody = {
            company:{
                compName: this.state.compName,
                turnover: this.state.turnover,
                ceo: this.state.ceo,
                boardOfDirectors: this.state.boardOfDirectors,
                compBrief: this.state.compBrief
            },
            sector: {
                sectName: this.state.sector,
                sectBrief: this.state.sector
            }
            

        };console.log("reqBody",reqBody)
        axios.post("http://localhost:8082/company", reqBody)
        .then(res => {
            console.log("compp",res);
        })
        .catch(err=>{
            console.log("errr",err)
        })
    }

    companyChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    resetCompany = ()=>{
        this.setState(() => this.initialState);
    }

    render(){
        const {compName, turnover, ceo, boardOfDirectors, sector, compBrief} = this.state;
        return (
            <Card className="border border-dark bg-dark text-white">
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Add Company</Card.Header>
                <Form onReset={this.resetCompany} onSubmit={this.submitCompany} id="companyFormId">
                    <Card.Body>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="compName"
                                        value={compName}
                                        onChange={this.companyChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Company Name" />
                                    
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="formGridTurnover">
                                    <Form.Label>Turnover</Form.Label>
                                    <Form.Control required autoComplete="off"
                                        type="test" name="turnover"
                                        value={turnover}
                                        onChange={this.companyChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Company Name" />
                                    
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="formGridCeo">
                                    <Form.Label>CEO</Form.Label>
                                    <Form.Control required
                                        type="test" name="ceo" autoComplete="off"
                                        value={ceo}
                                        onChange={this.companyChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Company Name" />
                                    
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="formGridBoardOfDirectors">
                                    <Form.Label>Board of Directors</Form.Label>
                                    <Form.Control required
                                        type="test" name="boardOfDirectors" autoComplete="off"
                                        value={boardOfDirectors}
                                        onChange={this.companyChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Company Name" />
                                    
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="formGridSector">
                                    <Form.Label>Sector</Form.Label>
                                    <Form.Control required
                                        type="test" name="sector" autoComplete="off"
                                        value={sector}
                                        onChange={this.companyChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Company Name" />
                                    
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="formGridDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required
                                        type="test" name="compBrief" autoComplete="off"
                                        value={compBrief}
                                        onChange={this.companyChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Company Name" />
                                    
                                </Form.Group>
                            </Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button size="sm" variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} />   Submit
                        </Button>
                        <Button style={{marginLeft: "1rem"}} size="sm" variant="info" type="reset">
                            <FontAwesomeIcon icon={faUndo} />   Reset
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}
