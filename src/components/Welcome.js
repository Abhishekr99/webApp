import React,{Component} from 'react';

export default class Welcome extends Component{
    render(){
        return (
            <div>
                <div className="jumbotron bg-dark text-white">
                    <h1>Welcome to Stock Chart</h1>
                    <p>This is a simple stock comparison tool</p>
                </div>
                <div >
                    <img width="100%" src="/stock-chart.png"/>
                </div>
                
            </div>
            
           
        );
    }
}
