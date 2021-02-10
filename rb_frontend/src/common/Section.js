import React from 'react';

import {add_icon} from './Icons';

import 'bootstrap/dist/css/bootstrap.min.css';
import './Section.css';

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
                    { this.props.children }
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