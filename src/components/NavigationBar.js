import React,{Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';

class NavigationBar extends Component{
    render(){
        return (
            <Navbar bg="dark" variant="dark">
                
                <Link to={""} className="navbar-brand">
                <img src="https://iconarchive.com/download/i100101/iynque/ios7-style/Stocks.ico" width="25" height="25" alt="brand"/>
                Stock Chart
                </Link>
                
                <Nav className="me-auto">
                    <Link to={"add-company"} className="nav-link">Add Company</Link>
                    <Link to={"company-list"} className="nav-link">Company List</Link>
                    <Link to={"add-stock-exchange"} className="nav-link">Add Stock Excahnge</Link>
                    <Link to={"stock-exchange-list"} className="nav-link">Stock Exchange List</Link>
                    <Link to={"import-stocks"} className="nav-link">Import Stocks</Link>
                    <Link to={"ipo"} className="nav-link">IPO</Link>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;