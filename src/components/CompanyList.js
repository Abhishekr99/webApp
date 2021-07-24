import React,{Component} from 'react';
import {Card, Table, ButtonGroup, Button} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faList, faBan, faCheckSquare} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class CompanyList extends Component{
    constructor(props){
        super(props);
        this.state={
            companies:[]
        };
    }

    componentDidMount(){
        this.getAllCompanies();
    }

    getAllCompanies(){
        axios.get("http://localhost:8082/company")
        .then((res)=>{console.log("dataa",res.data)
            this.setState({companies: res.data})
        });
    }

    deactivateCompany = (compId)=>{
        axios.post("http://localhost:8082/company/deactivate/"+compId, {})
        .then((res)=>{
            console.log("deactivate",res);
        });
        this.getAllCompanies();
    };

    activateCompany = (compId)=>{
        axios.post("http://localhost:8082/company/activate/"+compId, {})
        .then((res)=>{
            console.log("activate",res);
        });
        this.getAllCompanies();
    };

    render(){
        
        return (
            <Card className="border border-dark bg-dark text-white">
                <Card.Header><FontAwesomeIcon icon={faList} /> Company List</Card.Header>
                <Card.Body>
                    <Table bordered hover striped variant="dark">
                        <thead>
                            <tr>
                            <th>Name</th>
                            <th>Turnover</th>
                            <th>CEO</th>
                            <th>Board of Directors</th>
                            <th>Sector</th>
                            <th>Description</th>
                            <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.companies.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">{this.state.companies.length} Companies available</td>
                                </tr> :
                                this.state.companies.map((company)=>(
                                    <tr key={company.compId} >
                                        <td>{company.compName}</td>
                                        <td>{company.turnover}</td>
                                        <td>{company.ceo}</td>
                                        <td>{company.boardOfDirectors}</td>
                                        <td>{company.sector.sectName}</td>
                                        <td>{company.compBrief}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Link to={"edit/"+company.compId} className="btn btn-sm btn-outline-primary"><FontAwesomeIcon icon={faEdit} /></Link>{' '} 
                                                {company.active ?
                                                <Button size="sm" variant="outline-danger" onClick={this.deactivateCompany.bind(this, company.compId)}><FontAwesomeIcon icon={faBan} /></Button>
                                                :
                                                <Button size="sm" variant="outline-success" onClick={this.activateCompany.bind(this, company.compId)}><FontAwesomeIcon icon={faCheckSquare} /></Button>
                                                }
                                            </ButtonGroup>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}
