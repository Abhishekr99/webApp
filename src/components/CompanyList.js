import React,{Component} from 'react';
import {Card, Table, ButtonGroup, Button} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faList, faTrash} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

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
        .then((res)=>{
            this.setState({companies: res.data})
        });
    }

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
                                    <tr key={company.compId}>
                                        <td>{company.compName}</td>
                                        <td>{company.turnover}</td>
                                        <td>{company.ceo}</td>
                                        <td>{company.boardOfDirectors}</td>
                                        <td>{company.sector.sectName}</td>
                                        <td>{company.compBrief}</td>
                                        <td>
                                            <ButtonGroup>
                                                <Button size="sm" variant="outline-primary"><FontAwesomeIcon icon={faEdit} /></Button>
                                                <Button size="sm" variant="outline-danger"><FontAwesomeIcon icon={faTrash} /></Button>
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
