import React,{Component} from 'react';
import {Card, Table, Button, Form, Row, Col} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faSave, faList, faPlusCircle} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import { connect } from 'react-redux';

class StockExchangeList extends Component{
    constructor(props){
        super(props);
        this.state={
            exchanges:[],
            exchName:'',
            exchBrief:'',
            show:false
        };
    }

    componentDidMount(){
        this.getAllExchanges();
    }

    getAllExchanges(){
        axios.get(`${process.env.REACT_APP_API_URL}/exchange`)
        .then((res)=>{console.log("dataa",res.data)
            this.setState({exchanges: res.data})
        });
    }

    exchangeChange = (e)=>{
        this.setState({
            [e.target.name]:e.target.value
        })
    }

    submitExchange = (e)=>{
        e.preventDefault();//console.log("state",this.state)
        const {exchName, exchBrief} = this.state;
        let reqBody={exchName, exchBrief};
        axios.post(`${process.env.REACT_APP_API_URL}/exchange`, reqBody)
            .then(res => {
                if(res.data !== null && res.data !== undefined){
                    this.setState({show: true});
                    setTimeout(()=>this.setState({show:false}),3000);
                }
                else{
                    this.setState({show: false});
                }
                console.log("compp",res);
            })
            .catch(err=>{
                console.log("errr",err)
            })
            this.setState({exchName:'',exchBrief:''});
            this.getAllExchanges();
        
    }

    render(){
        const {exchName, exchBrief}=this.state;
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show= {this.state.show} message= {"Exchange Saved Successfully." } type={"success"}/>
                </div>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header>
                        
                        <div style={{ float: "left" }}>
                            <FontAwesomeIcon icon={faList} /> Stock Exchange List
                        </div>
                        
                    </Card.Header>
                    <Card.Body>
                        <Table bordered hover striped variant="dark">
                            <thead>
                                <tr>
                                <th>Name</th>
                                <th>Exchange Brief</th>
                                
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    this.state.exchanges.length === 0 ?
                                    <tr align="center">
                                        <td colSpan="6">{this.state.exchanges.length} Exchanges available</td>
                                    </tr> :
                                    this.state.exchanges.map((exchange)=>(
                                        <tr key={exchange.exchId} >
                                            <td>{exchange.exchName}</td>
                                            <td>{exchange.exchBrief}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </Table>
                    
                    </Card.Body>
                </Card>
                <hr/>
                {this.props.auth.role==='ROLE_ADMIN' && 
                <Card className="border border-dark bg-dark text-white">
                <Card.Header>
                    {/* <FontAwesomeIcon icon={faList} /> Company List */}
                    {/* <input type="text" placeholder="Search..." onChange={(e)=>{this.setState({searchTerm: e.target.value})}}/> */}
                    <div style={{ float: "left" }}>
                        <FontAwesomeIcon icon={faPlusCircle} /> Add Stock Exchange
                    </div>
                    
                </Card.Header>
                <Form onSubmit={this.submitExchange} id="exchangeFormId">
                            <Card.Body>
                                    <Row>
                                        {/* <input type="text"></input> */}
                                        <Form.Group as={Col} className="mb-3" controlId="formGridExchName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control required autoComplete="off"
                                                type="text" name="exchName"
                                                value={exchName}
                                                onChange={this.exchangeChange}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Exchange Name" />
                                            
                                        </Form.Group>
                                        <Form.Group as={Col} className="mb-3" controlId="formGridExchBrief">
                                            <Form.Label>Exchange Brief</Form.Label>
                                            <Form.Control required autoComplete="off"
                                                type="text" name="exchBrief"
                                                value={exchBrief}
                                                onChange={this.exchangeChange}
                                                className={"bg-dark text-white"}
                                                placeholder="Enter Exchange Brief" />
                                            
                                        </Form.Group>
                                    
                                    </Row>
                                
                            </Card.Body>
                            <Card.Footer style={{"textAlign":"right"}}>
                                <Button size="sm" variant="success" type="submit">
                                    <FontAwesomeIcon icon={faSave} />   Save
                                </Button>
                                
                            </Card.Footer>
                </Form>
            </Card>}
         </div>
        );
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth
    }
};

export default connect(mapStateToProps)(StockExchangeList);
