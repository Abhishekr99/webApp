import React from 'react';
import {Card, Table} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons';


export default function IpoList(props) {
    const marginTop={
      marginTop:"2rem"
    }
  
    return (
        <Card className="border border-dark bg-dark text-white">
            <Card.Header>
                
                <div style={{ float: "left" }}>
                    <FontAwesomeIcon icon={faList} /> IPO List
                </div>
                
            </Card.Header>
            <Card.Body>
                <Table bordered hover striped variant="dark">
                    <thead>
                        <tr>
                        <th>Price Per Share</th>
                        <th>Number of Shares</th>
                        <th>Open Date</th>
                        <th>Open Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            props.ipos.length === 0 ?
                            <tr align="center">
                                <td colSpan="6">{props.ipos.length} IPOs available</td>
                            </tr> :
                            props.ipos.map((ipo)=>(
                                <tr key={ipo.ipoId} >
                                    <td>{ipo.pricePerShare}</td>
                                    <td>{ipo.noOfShares}</td>
                                    <td>{ipo.openDate}</td>
                                    <td>{ipo.openTime}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </Table>
            
            </Card.Body>
        </Card>
    );
  }
