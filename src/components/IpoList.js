import React,{Component} from 'react';
import {Card, Table} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';

class IpoList extends Component {
    constructor(props){
        super(props);
        this.state={
            
            ipos:[]
        };
        
    }

    componentDidMount(){
        this.getAllCompanies();
    }

    getAllCompanies(){
        let ipoArray=[];
        let obj={};
        this.props.companies.map((company)=>{
            if(company.ipo !== null){
                obj['compName']=company.compName;
                obj['pricePerShare']=company.ipo.pricePerShare;
                obj['noOfShares']=company.ipo.noOfShares;
                [obj['openDate'], obj['openTime']]=company.ipo.openDateTime.split("T");
                obj['ipoId']=company.ipo.ipoId;
                ipoArray.push(obj);
                obj={};
            }
        });
        ipoArray.sort((a,b)=>new Date(b.openDate) -  new Date(a.openDate))
        //console.log("ipos",ipoArray)
        this.setState({ipos: [...ipoArray]});
    };

    render(){
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
                            <th>Company Name</th>
                            <th>Price Per Share</th>
                            <th>Number of Shares</th>
                            <th>Open Date</th>
                            <th>Open Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                this.state.ipos.length === 0 ?
                                <tr align="center">
                                    <td colSpan="6">{this.state.ipos.length} IPOs available</td>
                                </tr> :
                                this.state.ipos.map((ipo)=>(
                                    <tr key={ipo.ipoId} >
                                        <td>{ipo.compName}</td>
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
    
}

const mapStateToProps = state => {
    return{
        companies: state.company.companies
    }
};

// const mapDispatchToProps = dispatch => {
//     return{
//         fetchCompanies: ()=>dispatch(fetchCompanies())
//     }
// };

export default connect(mapStateToProps)(IpoList);

