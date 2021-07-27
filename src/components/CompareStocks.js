import React,{Component} from "react";
import * as XLSX from "xlsx";
import {Row, Col, Form, Button} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faDownload, faUpload, faSave} from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import MyToast from './MyToast';
import Dropdown from 'react-multilevel-dropdown';
import LineChart from "./LineChart";

export default class CompareStocks extends Component{
    constructor(props){
        super(props);
        this.state={
            companies:[],
            sectors:[],
            stocks:[],
            dataset:[],
            category:[]
        };
    }

    componentDidMount(){
        this.getAllCompanies();
        this.getAllSectors();
    }

    getAllCompanies(){
        axios.get(`${process.env.REACT_APP_API_URL}/company/name`)
        .then((res)=>{console.log("compp",res.data)
            this.setState({companies: res.data})
        });
    }

    getAllSectors(){
        axios.get(`${process.env.REACT_APP_API_URL}/sector`)
        .then((res)=>{console.log("sectors",res.data)
            this.setState({sectors: res.data})
        });
    }

    
    
    submitForm = (e)=>{
        e.preventDefault();
        
        
    }

    getCompanyStock = (compId, compName)=>{
        // this.setState(prevState=>({seriesNames: [...prevState.seriesNames, compName]}));
        let dataArray=[];
        let labelArray=[];
        let valueObj={};
        let labelObj={};
        axios.get(`${process.env.REACT_APP_API_URL}/stock/`+compId)
        .then((res)=>{console.log("dataa",res.data)
            res.data.map((stock)=>{
                valueObj['value']=stock.sharePrice;
                dataArray.push(valueObj);
                labelObj['label']=stock.datee;
                if(this.state.category.length<12){
                    this.state.category.push(labelObj);
                }
                
                valueObj={};
                labelObj={};
            })
        })
        // this.state.dataset.push({
        //     seriesname: compName,
        //     data: dataArray
        // })
        //this.setState({category: [...labelArray]});
        setTimeout(()=>{
            this.setState(prevState=>({
                dataset: [...prevState.dataset, {seriesname: compName, data: dataArray}]
                
            }));
        },1000)
        
        
        
    }

    getSectorStock = (sectId, sectName)=>{
        // this.setState(prevState=>({seriesNames: [...prevState.seriesNames, compName]}));
        let dataArray=[];
        let labelArray=[];
        let valueObj={};
        let labelObj={};
        axios.get(`${process.env.REACT_APP_API_URL}/stock/sect/`+sectId)
        .then((res)=>{console.log("sectt",res.data)
            res.data.map((stock)=>{
                valueObj['value']=stock[0].toString();
                dataArray.push(valueObj);
                labelObj['label']=stock[2];
                if(this.state.category.length<12){
                    this.state.category.push(labelObj);
                }
                valueObj={};
            })
        })
        
        setTimeout(()=>{
            this.setState(prevState=>({
                dataset: [...prevState.dataset, {seriesname: sectName, data: dataArray}]
                
            }));
        },1000)
        
        
    }

    render(){
        
        return (
            <div style={{textAlign: 'center'}}>
                <div className="mb-3"> 
                    <Dropdown title='Select' >
                        <Dropdown.Item>
                            Company
                            <Dropdown.Submenu>
                                {this.state.companies.map((company)=>(
                                    <Dropdown.Item key={company.compId} value={company.compId} onClick={(e) => this.getCompanyStock(e.target.value, company.compName)}>
                                        {company.compName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Submenu>
                        </Dropdown.Item>
                        <Dropdown.Item > 
                            Sector
                            <Dropdown.Submenu>
                                {this.state.sectors.map((sector)=>(
                                    <Dropdown.Item key={sector.sectId} value={sector.sectId} onClick={(e) => this.getSectorStock(e.target.value, sector.sectName)}>
                                        {sector.sectName}
                                    </Dropdown.Item>
                                ))}
                            </Dropdown.Submenu>
                        </Dropdown.Item>
                        
                    </Dropdown>
                </div>
                
                <LineChart dataset={this.state.dataset} category={this.state.category}/>
            </div>
            
        );
    }
}

