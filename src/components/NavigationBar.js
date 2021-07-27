import React,{Component} from 'react';
import { Navbar, Nav } from 'react-bootstrap';
import {Link} from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faSignInAlt, faSignOutAlt, faUserPlus} from "@fortawesome/free-solid-svg-icons";
import { connect } from 'react-redux';
import { logoutUser } from '../services/index';

class NavigationBar extends Component{
    logout =()=>{
        this.props.logoutUser();
    }
    render(){
        const guestLinks =(
            <>
                <Nav className="ms-auto">
                    <Link to={"/register"} className="nav-link"><FontAwesomeIcon icon={faUserPlus}/> Register</Link>
                    <Link to={"/login"} className="nav-link"><FontAwesomeIcon icon={faSignInAlt}/> Login</Link>

                </Nav>
            </>
        );
        const userLinks =(
            <>
                <Nav className="me-auto">
                    <Link to={"/add-company"} className="nav-link">Add Company</Link>
                    <Link to={"/company-list"} className="nav-link">Company List</Link>

                    <Link to={"/stock-exchange-list"} className="nav-link">Stock Exchange List</Link>
                    <Link to={"/import-stocks"} className="nav-link">Import Stocks</Link>
                    <Link to={"/ipo"} className="nav-link">IPO</Link>
                    <div >
                    <Link to={"/logout"} className="nav-link" onClick={this.logout}><FontAwesomeIcon icon={faSignOutAlt}/> Logout</Link>
                    </div>
                    
                </Nav>
            </>
        );
        return (
            <Navbar bg="dark" variant="dark">
                
                <Link to={""} className="navbar-brand">
                <img src="https://iconarchive.com/download/i100101/iynque/ios7-style/Stocks.ico" width="25" height="25" alt="brand"/>
                Stock Chart
                </Link>
                
                {this.props.auth.isLoggedIn ? userLinks : guestLinks}
            </Navbar>
        );
    }
}

const mapStateToProps = state => {
    return{
        auth: state.auth
    }
};

const mapDispatchToProps = dispatch => {
    return{
        logoutUser: ()=>dispatch(logoutUser())
    }
};

export default connect(mapStateToProps, mapDispatchToProps)(NavigationBar);
