import React from 'react';
import {SectionBody} from '../common/Section'

import TemplateZhong from './templates/Zhong';

import './resumepage.css';


class ResumeControl extends React.Component {
    constructor(props){
        super(props);
    }
    render(){
        var main = (
            <SectionBody heading="Resumes" onAdd={()=>{}}>
                Hi
            </SectionBody>
        );

        return main;
    }
}

class ResumeComposer extends React.Component {

}
export default class ResumePage extends React.Component {
    constructor(props){
        // @props: onNav : function : takes 'history' or 'resumes'
        super(props);
    }

    componentDidMount(){
        this.props.onNav('resumes');
    }
    render(){
        var main = (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <ResumeControl/>
                    </div>
                    <div className="col-lg-9 col-md-6">
                        <div id="resume-compose">
                            <TemplateZhong/>
                        </div>
                    </div>
                </div>
            </div>
        )

        
        return main;
    }
}