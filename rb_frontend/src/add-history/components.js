import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import './historypage.css';

export let delete_icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
    </svg>
);

export let add_icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="black" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
    </svg>
);

export let edit_icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
    </svg>
);

export let done_icon = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-circle-fill" viewBox="0 0 16 16">
        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zm-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z"/>
    </svg>
);

export let downarrow =(
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-down" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/>
    </svg>
);

export let uparrow = (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-chevron-up" viewBox="0 0 16 16">
    <path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/>
    </svg>
);

export class EditableDiv extends React.Component{
    constructor({content,onUpdate,className,...rest}){
        // @props: content: thing to display
        // @props: onUpdate: function to be called when content is updated. Takes on argument
        super(rest);
        this.state = {
            value : content,
            placeholder : ''
        }

        this.inputRef = React.createRef();
        this.divRef = React.createRef();

        this.handleClick = this.handleClick.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount(){
        this.inputRef.current.style.display = 'None';
        if(this.state.value == '')
            this.divRef.current.click();
    }

    handleClick(){
        this.divRef.current.style.display = 'None';
        this.inputRef.current.style.display = '';
        this.inputRef.current.focus();
    }
    handleBlur(){
        if(this.inputRef.current.value.length<1){
            this.setState({placeholder:'Enter a value'});
            this.inputRef.current.focus();
            return;
        }
        this.divRef.current.style.display = '';
        this.inputRef.current.style.display = 'None';
        this.props.onUpdate(this.state.value);
    }
    handleChange(e){
        this.setState({value : e.target.value});
    }
    render(){
        return (
            <div>
                <div 
                    onClick={this.handleClick} 
                    ref={this.divRef}>
                        {this.state.value}
                </div>
                <input 
                    onBlur={this.handleBlur} 
                    onChange={this.handleChange} 
                    ref={this.inputRef} 
                    placeholder={this.state.placeholder} 
                    value={this.state.value}
                />
            </div>
        );
    }
}

export class CollasableDisplay extends React.Component{
    constructor(props){
        //@props: optional props: onClickAdd
        super(props);

        this.state = {
            name : props.name,
            is_expanded : false
        }
        this.handleToggle = this.handleToggle.bind(this);
        this.contentRef = React.createRef();
    }

    componentDidMount(){
        this.contentRef.current.style.display = "None";

    }
    handleToggle(){
        this.setState({is_expanded: !this.state.is_expanded},()=>{
            var disp = this.state.is_expanded ? '' : 'None';
            this.contentRef.current.style.display = disp;
        });
    }

    render(){
        var main = (

            <div className="collapsable">
                <div className="row">
                    <div className="col col-sm-6">
                        <div className="heading">
                            <span>{this.state.name}</span>
                        </div>
                    </div>
                    <div className="col col-sm-3">
                        <span className="close-button" onClick={this.handleToggle}>
                            {this.state.is_expanded ? <span>{downarrow}</span> : <span>{uparrow}</span>}
                        </span>

                    </div>
                    <div className="col col-sm-3">
                        { this.props.onClickAdd && <span onClick={this.props.onClickAdd} className="add-button" style={{border:'None'}}>{add_icon}</span>}
                    </div>
                </div>
            </div>

        );
        return (
            <>
            {main}
            <div ref={this.contentRef}>
                {this.props.children}
            </div>
            </>
        );
    }
}

export function getDisplayDate(date){
    // date is a Date object
    // return string that looks like 'Jan 2019'
    var mon = new Intl.DateTimeFormat('en',{ month: 'short'}).format(date);
    var year = new Intl.DateTimeFormat('en',{ year: 'numeric' }).format(date);
    return mon+' '+year;
}

export function parseToDate(str){
    // str is a date string recieved from the server
    // in the format of YYYY-MM-DD
    if(str === null)
        return null;

    var parts = str.split('-');
    return new Date(parts[0], parts[1] - 1, parts[2]);

}

export function splitTextToPara(str){
    // 1 new line = <br>, 2 new line = new para

    var list = str.split("\n\n");
    list = list.map((val)=>val.split("\n"));

    return (
        <span>
        {
            list.map(para=>{
                return (
                    <p>
                    {
                        para.map(line=>{
                            return <span>{line}<br/></span>
                        })
                    }
                    </p>
                )
            })
        }
        </span>
    )

}