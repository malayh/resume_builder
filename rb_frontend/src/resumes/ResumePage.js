import React from 'react';
import {SectionBody} from '../common/Section'

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
                        <SectionBody heading="Resumes" onAdd={()=>{}}>
                            Hi
                        </SectionBody>
                    </div>
                    <div className="col-lg-9 col-md-6">
                    </div>
                </div>
            </div>
        )

        
        return main;
    }
}