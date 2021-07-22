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
                    <Link to={"add"} className="nav-link">Add Company</Link>
                    <Link to={"list"} className="nav-link">Company List</Link>
                </Nav>
            </Navbar>
        );
    }
}

export default NavigationBar;