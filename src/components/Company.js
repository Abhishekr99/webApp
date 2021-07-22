import React,{Component} from 'react';
import {Card, Form, Button, Row, Col} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faPlusSquare, faSave} from '@fortawesome/free-solid-svg-icons';

export default class Company extends Component{
    constructor(props){
        super(props);
        this.state={
            compName:'',
            turnover:'',
            ceo:'',
            boardOfDirectors:'',
            sector:'',
            compBrief:''
        }
    }

    submitCompany = (e)=>{
        e.preventDefault();
        console.log(this.state);
    }

    companyChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    render(){
        return (
            <Card className="border border-dark bg-dark text-white">
                <Card.Header><FontAwesomeIcon icon={faPlusSquare} /> Add Company</Card.Header>
                <Form onSubmit={this.submitCompany} id="companyFormId">
                    <Card.Body>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="formGridName">
                                    <Form.Label>Name</Form.Label>
                                    <Form.Control required
                                        type="test" name="compName"
                                        value={this.state.compName}
                                        onChange={this.companyChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Company Name" />
                                    
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="formGridTurnover">
                                    <Form.Label>Turnover</Form.Label>
                                    <Form.Control required
                                        type="test" name="turnover"
                                        value={this.state.turnover}
                                        onChange={this.companyChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Company Name" />
                                    
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="formGridCeo">
                                    <Form.Label>CEO</Form.Label>
                                    <Form.Control required
                                        type="test" name="ceo"
                                        value={this.state.ceo}
                                        onChange={this.companyChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Company Name" />
                                    
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="formGridBoardOfDirectors">
                                    <Form.Label>Board of Directors</Form.Label>
                                    <Form.Control required
                                        type="test" name="boardOfDirectors"
                                        value={this.state.boardOfDirectors}
                                        onChange={this.companyChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Company Name" />
                                    
                                </Form.Group>
                            </Row>
                            <Row>
                                <Form.Group as={Col} className="mb-3" controlId="formGridSector">
                                    <Form.Label>Sector</Form.Label>
                                    <Form.Control required
                                        type="test" name="sector"
                                        value={this.state.sector}
                                        onChange={this.companyChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Company Name" />
                                    
                                </Form.Group>
                                <Form.Group as={Col} className="mb-3" controlId="formGridDescription">
                                    <Form.Label>Description</Form.Label>
                                    <Form.Control required
                                        type="test" name="compBrief"
                                        value={this.state.compBrief}
                                        onChange={this.companyChange}
                                        className={"bg-dark text-white"}
                                        placeholder="Enter Company Name" />
                                    
                                </Form.Group>
                            </Row>
                    </Card.Body>
                    <Card.Footer style={{"textAlign":"right"}}>
                        <Button variant="success" type="submit">
                            <FontAwesomeIcon icon={faSave} />   Submit
                        </Button>
                    </Card.Footer>
                </Form>
            </Card>
        );
    }
}
