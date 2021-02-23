import React from 'react';

import {add_icon} from './Icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Section.css';

class EmptyInstuction extends React.Component {
    render(){
        return(
            <div style={{padding:"1em"}}>
                <p>Section Empty!</p>
                <p style={{fontSize:"10pt"}}>Click on the   {add_icon}   icon on top right hand corner of this box to add something</p>
            </div>
        );
    }
}
export class SectionBody extends React.Component{
    //This is container-fluid, each child must be a bootstrp row
    constructor(props){
        super(props);
    }

    render(){
        var main = (
            <div className="section-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10 nopadding">
                            <div className="section-body-header">{this.props.heading}</div>
                        </div>
                        {this.props.onAdd && <div className="col-2 nopadding">
                            <div onClick={this.props.onAdd} className="add-button">
                                {add_icon}
                            </div>
                        </div>}
                    </div>
                    { React.Children.count(this.props.children) ? this.props.children : <EmptyInstuction/>}
                </div>
            </div>

        );
        return main;
    }
}

export class SectionContent extends React.Component{
    constructor(props){
        super(props);
    }

    render(){
        return<div></div>
    }

}