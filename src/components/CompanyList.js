import React,{Component} from 'react';
import {Card, Table, ButtonGroup, Button, InputGroup, FormControl} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faList, faBan, faCheckSquare, faSearch, faTimes} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import {Link} from 'react-router-dom';

export default class CompanyList extends Component{
    constructor(props){
        super(props);
        this.state={
            companies:[],
            searchTerm:''
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

    searchChange = (event) => {
        this.setState({
          [event.target.name]: event.target.value,
        });
      };
    
    cancelSearch = () => {
    this.setState({ searchTerm: "" });
    };

    render(){
        
        return (
            <Card className="border border-dark bg-dark text-white">
                <Card.Header>
                    {/* <FontAwesomeIcon icon={faList} /> Company List */}
                    {/* <input type="text" placeholder="Search..." onChange={(e)=>{this.setState({searchTerm: e.target.value})}}/> */}
                    <div style={{ float: "left" }}>
                        <FontAwesomeIcon icon={faList} /> Company List
                    </div>
                    <div style={{ float: "right" }}>
                        <InputGroup size="sm">
                            <FormControl
                            placeholder="Search..."
                            name="searchTerm"
                            value={this.state.searchTerm}
                            className={"info-border bg-dark text-white"}
                            onChange={this.searchChange}
                            />
                            
                            <Button
                                size="sm"
                                variant="outline-light"
                                type="button"
                                onClick={this.cancelSearch}
                            >
                                <FontAwesomeIcon icon={faTimes} />
                            </Button>
                            
                        </InputGroup>
                    </div>
                </Card.Header>
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
                                this.state.companies.filter((company)=>{
                                    if(this.state.searchTerm === ""){
                                        return company;
                                    }
                                    else if(company.compName.toLowerCase().includes(this.state.searchTerm.toLowerCase())){
                                        return company;
                                    }
                                    
                                }).map((company)=>(
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
