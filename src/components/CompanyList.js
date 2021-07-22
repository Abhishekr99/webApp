import React,{Component} from 'react';
import {Card, Table} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons';

export default class CompanyList extends Component{
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
                            </tr>
                        </thead>
                        <tbody>
                            <tr align="center">
                                <td colSpan="6">No Companies available</td>
                            </tr>
                        </tbody>
                    </Table>
                </Card.Body>
            </Card>
        );
    }
}
