import React from 'react';

export default class ResumePage extends React.Component {
    constructor(props){
        // @props: onNav : function : takes 'history' or 'resumes'
        super(props);
    }

    componentDidMount(){
        this.props.onNav('resumes');
    }
    render(){
        return (
            <h1>Resumes page</h1>
        );
    }
}