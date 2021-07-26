import React,{Component} from 'react';
import {Card, Form, Button, Row, Col} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faEdit, faList, faPlusSquare, faSave, faUndo} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';

export default class Company extends Component{
    constructor(props){
        super(props);
        this.state=this.initialState;
        this.state.show = false;
    }

    initialState = {
        compId:'',
        compName:'',
        turnover:'',
        ceo:'',
        boardOfDirectors:'',
        sectName:'',
        compBrief:'',
        pricePerShare:'',
        noOfShares:'',
        openDate:'',
        openTime:''
    }

    componentDidMount(){
        const compId = this.props.match.params.id;
        if(compId){
            this.findCompanyById(compId);
        }
    }

    findCompanyById = (compId) => {
        axios.get("http://localhost:8082/company/"+compId)
        .then((res)=>{console.log("compById",res)
            const {compId,compName,turnover,ceo,boardOfDirectors,compBrief}=res.data;
            if(res.data != null && res.data.ipo === null){
                this.setState({
                    compId,compName,turnover,ceo,boardOfDirectors,compBrief,
                    sectName: res.data.sector.sectName
                })
            }
            else{
                const {pricePerShare,noOfShares,openDateTime}=res.data.ipo;
                const [openDate,openTime]=openDateTime.split("T");
                this.setState({
                    compId,compName,turnover,ceo,boardOfDirectors,compBrief,
                    sectName: res.data.sector.sectName,
                    pricePerShare,noOfShares,openDate,openTime
                })
            }
            
        })
        .catch((err)=>{
            console.log("compErr",err)
        })
    }

    submitCompany = (e)=>{
        e.preventDefault();console.log("state",this.state)
        const {pricePerShare, noOfShares, openDate, openTime} = this.state;
        let reqBody;
        if(pricePerShare==="" || noOfShares==="" || openDate==="" || openTime===""){
            reqBody = {
                company:{
                    compName: this.state.compName,
                    turnover: this.state.turnover,
                    ceo: this.state.ceo,
                    boardOfDirectors: this.state.boardOfDirectors,
                    compBrief: this.state.compBrief
                },
                sector: {
                    sectName: this.state.sectName,
                    sectBrief: this.state.sectName
                }
                
    
            };
        }
        else{
            reqBody = {
                company:{
                    compName: this.state.compName,
                    turnover: this.state.turnover,
                    ceo: this.state.ceo,
                    boardOfDirectors: this.state.boardOfDirectors,
                    compBrief: this.state.compBrief,
                    ipo:{
                        pricePerShare: pricePerShare,
                        noOfShares: noOfShares,
                        openDateTime: openDate+"T"+openTime
                    }
                },
                sector: {
                    sectName: this.state.sectName,
                    sectBrief: this.state.sectName
                }
                
    
            };
        }
        
        console.log("reqBody",reqBody)
        if(this.state.compId){
            //Update company
            let updateBody=reqBody.company;
            updateBody["sector"]=reqBody.sector;
            axios.put("http://localhost:8082/company/"+this.state.compId, updateBody)
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

        }
        else{
            //Save company
            axios.post("http://localhost:8082/company", reqBody)
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
            //this.setState(this.initialState);
        }
        
        
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
        const {compName, turnover, ceo, boardOfDirectors, sectName, compBrief,
                pricePerShare, noOfShares, openDate, openTime} = this.state;
        return (
            <div>
                <div style={{"display": this.state.show ? "block" : "none"}}>
                    <MyToast show= {this.state.show} message= {this.state.compId? "Company Updated Successfully." : "Company Saved Successfully."} type={"success"}/>
                </div>
                <Card className="border border-dark bg-dark text-white">
                    <Card.Header><FontAwesomeIcon icon={this.state.compId? faEdit : faPlusSquare} />{' '}
                    {this.state.compId? "Update Company" : "Add Company"}
                    </Card.Header>
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
                                            placeholder="Enter Turnover" />
                                        
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="formGridCeo">
                                        <Form.Label>CEO</Form.Label>
                                        <Form.Control required
                                            type="test" name="ceo" autoComplete="off"
                                            value={ceo}
                                            onChange={this.companyChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter CEO" />
                                        
                                    </Form.Group>
                                </Row>
                                <Row>
                                    <Form.Group as={Col} className="mb-3" controlId="formGridBoardOfDirectors">
                                        <Form.Label>Board of Directors</Form.Label>
                                        <Form.Control required
                                            type="test" name="boardOfDirectors" autoComplete="off"
                                            value={boardOfDirectors}
                                            onChange={this.companyChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Board of Directors" />
                                        
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="formGridSectName">
                                        <Form.Label>Sector</Form.Label>
                                        <Form.Control required
                                            type="test" name="sectName" autoComplete="off"
                                            value={sectName}
                                            onChange={this.companyChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Sector" />
                                        
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="formGridDescription">
                                        <Form.Label>Description</Form.Label>
                                        <Form.Control required
                                            type="test" name="compBrief" autoComplete="off"
                                            value={compBrief}
                                            onChange={this.companyChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Company Description" />
                                        
                                    </Form.Group>
                                </Row>
                                <hr/>
                                <h6><FontAwesomeIcon icon={faPlusSquare} /> IPO Details</h6>
                                <Row>
                                    <Form.Group as={Col} className="mb-3" controlId="formGridPricePerShare">
                                        <Form.Label>Price per Share</Form.Label>
                                        <Form.Control 
                                            type="test" name="pricePerShare" autoComplete="off"
                                            value={pricePerShare}
                                            onChange={this.companyChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Price per Share" />
                                        
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="formGridNoOfShares">
                                        <Form.Label>Number of Shares</Form.Label>
                                        <Form.Control 
                                            type="test" name="noOfShares" autoComplete="off"
                                            value={noOfShares}
                                            onChange={this.companyChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Number of Shares" />
                                        
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="formGridOpenDate">
                                        <Form.Label>Opening Date</Form.Label>
                                        <Form.Control 
                                            type="date" name="openDate" autoComplete="off"
                                            value={openDate}
                                            onChange={this.companyChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Price per Share" />
                                        
                                    </Form.Group>
                                    <Form.Group as={Col} className="mb-3" controlId="formGridOpenTime">
                                        <Form.Label>Opening Time</Form.Label>
                                        <Form.Control 
                                            type="time" name="openTime" autoComplete="off"
                                            value={openTime}
                                            onChange={this.companyChange}
                                            className={"bg-dark text-white"}
                                            placeholder="Enter Number of Shares" />
                                        
                                    </Form.Group>
                                </Row>
                        </Card.Body>
                        <Card.Footer style={{"textAlign":"right"}}>
                            <Button size="sm" variant="success" type="submit">
                                <FontAwesomeIcon icon={faSave} />   {this.state.compId? "Update" : "Save"}
                            </Button>
                            <Button style={{marginLeft: "1rem"}} size="sm" variant="info" type="reset">
                                <FontAwesomeIcon icon={faUndo} />   Reset
                            </Button>
                            <Button style={{marginLeft: "1rem"}} size="sm" variant="info" type="reset" onClick={()=>this.props.history.push('/company-list')}>
                                <FontAwesomeIcon icon={faList} />   Company List
                            </Button>
                        </Card.Footer>
                    </Form>
                </Card>
            </div>
            
        );
    }
}
