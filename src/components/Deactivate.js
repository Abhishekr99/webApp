import React,{Component} from 'react';
import {Card, Table} from 'react-bootstrap'; 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faList} from '@fortawesome/free-solid-svg-icons';
import {connect} from 'react-redux';

class Deactivate extends Component {
    

    render(){
        return (
            <div className="text-white">
                Update successful !
            </div>
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

export default Deactivate;

