import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './historypage.css';

class EditableDiv extends React.Component{
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


class SkillSection extends React.Component{
    constructor(props){
        //@props: baseApiUrl : TODO: Add this
        super(props);
        
        this.state = {
            skills : {}
        }

        this.nextNegativeId = -1;
        this.negetiveIds = new Array();

        this.updateSkill = this.updateSkill.bind(this);
        this.deleteSkill = this.deleteSkill.bind(this);
        this.addSkill = this.addSkill.bind(this);
        this.loadAPIData = this.loadAPIData.bind(this);

        this.baseApiUrl = 'http://localhost:8000/coreapi/';
        this.authHeaders = { 
            'Content-Type':'application/json',
            'Authorization': 'token '+window.localStorage.getItem('rb_access_token')
        };
        
    }

    loadAPIData(data){
        // data is an object returned by calling GET on '/coreapi/skills/'
        var new_skills = {};
        for(var i = 0; i < data.length; i++){
            new_skills[data[i]['id']] = {name: data[i]['name'], score: data[i]['score']};
        }
        this.setState({skills:new_skills});
    }

    pushNewDataToServer(){
        // Takes all this.negetiveIds and push them to the server
        // Then update the state with valid ids recieved fromt the server
        //
        // This process may be simplified.
        for(const negId of this.negetiveIds){
            fetch(this.baseApiUrl+'skills/',{ headers: this.authHeaders,method:"POST", body: JSON.stringify(this.state.skills[negId]) })
                .then(resp => resp.json())
                    .then((data)=>{
                            var new_skill = {name: data['name'], score: data['score']};
                            var skills_copy = Object.assign({},this.state.skills);
                            delete skills_copy[negId];
                            skills_copy[data['id']] = new_skill;
                            this.setState({skills:skills_copy});                        
                         },
                         (error) => {
                             // TODO: Handle this erro
                         }                    
                    
                    );
        }

        this.negetiveIds = [];
        this.nextNegativeId = -1;
    }

    componentDidMount(){
        // TODO: NEED TO HANDLE API error
        fetch(this.baseApiUrl+'skills/',{headers:this.authHeaders,method:"GET"})
            .then(resp => resp.json())
                .then((data)=>{this.loadAPIData(data)});
    }
    
    updateSkill(id,key,value){
        var skills_copy = Object.assign({},this.state.skills);
        skills_copy[id][key] = value;

        fetch(this.baseApiUrl+'skills/'+id+'/',{ headers: this.authHeaders,method:"PUT", body: JSON.stringify(skills_copy[id]) })
            .then(resp => resp.json())
            .then((data) => {
                    this.setState({skills:skills_copy});
                },
                (error) =>{
                    // todo: handle error here
                }
            );
        
    }
    
    deleteSkill(id){
        var skills_copy = Object.assign({},this.state.skills);
        fetch(this.baseApiUrl+'skills/'+id+'/',{headers:this.authHeaders,method:"DELETE"})
            .then((resp) => {
                    delete skills_copy[id];
                    this.setState({skills:skills_copy});
                },
                (error) => {
                    // TODO: HANDLE this error.
                }
            );

    }

    getSkillSection(skill_id){
        // Returns a skill row
        const delete_icon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
        );


        var skill_row = (
            <div className="row" key={skill_id}>
                <div className="col-10 nopadding text-wrap">
                    <div className="section-content">
                        <div className="label">
                            <EditableDiv content={this.state.skills[skill_id].name} onUpdate={(value)=>this.updateSkill(skill_id,'name',value)}/>
                        </div>
                        <div className="value">
                            <EditableDiv content={this.state.skills[skill_id].score} onUpdate={(value)=>this.updateSkill(skill_id,'score',value)}/>
                        </div>
                    </div>
                </div>
                <div className="col-2 nopadding">
                    <div className="delete-button" onClick={()=>this.deleteSkill(skill_id)}>
                        {delete_icon}
                    </div>
                </div>
            </div>
        );
        return skill_row;
    }

    addSkill(){
        //TODO: Need to handle api error

        // First add a skill with a negetive id
        // This will create a skill name 'Unnamed', score 0
        // Then push the information to the server, then it will update the negetive id to a valid id
        // 
        // I am making two calls to create on entity. THAT IS BAD

        var new_skill = {name:'Default',score:1}
        var skills_copy = Object.assign({},this.state.skills);
        skills_copy[''+this.nextNegativeId] = new_skill;

        
        this.negetiveIds.push(''+this.nextNegativeId);
        this.nextNegativeId--;
        
        this.setState({skills:skills_copy},()=>{
            this.pushNewDataToServer();
        });
        
        
    }

    render(){
        const add_icon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
        );


        var main = (
            <div className="history-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10 nopadding">
                            <div className="section-header">Skills</div>
                        </div>
                        <div className="col-2 nopadding">
                            <div onClick={this.addSkill} className="add-button">
                                {add_icon}
                            </div>
                        </div>
                    </div>
                    { 
                        Object.keys(this.state.skills).map((value,index)=>{
                            return this.getSkillSection(value);
                        })
                    }                    
                </div>
            </div>

        );
        return main;
    }

}

class ContactSection extends React.Component{
    constructor(props){
        super(props);
        
        this.state ={
            contacts : {}
        }

        this.baseApiUrl = 'http://localhost:8000/coreapi/';
        this.authHeaders = { 
            'Content-Type':'application/json',
            'Authorization': 'token '+window.localStorage.getItem('rb_access_token')
        };

        this.updateContact = this.updateContact.bind(this);
        this.addContact = this.addContact.bind(this);

    }
    componentDidMount(){
        fetch(this.baseApiUrl+'contacts/',{headers:this.authHeaders,method:"GET"})
            .then(resp => resp.json())
            .then((data)=>{
                        var new_contacts = {};
                        for(const i of data){
                            new_contacts[i['id']] = {label:i['label'], value:i['value']}
                        }
                        this.setState({contacts:new_contacts});
                    },
                    (error) => {
                        //Handle error here
                    }
                );
    }
    updateContact(id,key,value){
        var contacts_copy = Object.assign({},this.state.contacts);
        contacts_copy[id][key] = value;

        fetch(this.baseApiUrl+'contacts/'+id+'/',{ headers: this.authHeaders,method:"PUT", body: JSON.stringify(contacts_copy[id]) })
            .then(resp => resp.json())
            .then((data) => {
                    this.setState({contacts:contacts_copy});
                },
                (error) =>{
                    // todo: handle error here
                }
            );

    }
    deleteContact(id){
        var contacts_copy = Object.assign({},this.state.contacts);
        fetch(this.baseApiUrl+'contacts/'+id+'/',{headers:this.authHeaders,method:"DELETE"})
            .then((resp) => {
                    delete contacts_copy[id];
                    this.setState({contacts:contacts_copy});
                },
                (error) => {
                    // TODO: HANDLE this error.
                }
            );
    }
    getContactRow(id){
        // console.log(this.state.contacts[id]);
        const delete_icon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-trash-fill" viewBox="0 0 16 16">
                <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
            </svg>
        );


        var row = (
            <div className="row" key={id}>
                <div className="col-10 nopadding text-wrap">
                    <div className="section-content">
                        <div className="label">
                            <EditableDiv content={this.state.contacts[id].label} onUpdate={(value)=>this.updateContact(id,'label',value)}/>
                        </div>
                        <div className="value">
                            <EditableDiv content={this.state.contacts[id].value} onUpdate={(value)=>this.updateContact(id,'value',value)}/>
                        </div>
                    </div>
                </div>
                <div className="col-2 nopadding">
                    <div className="delete-button" onClick={()=>this.deleteContact(id)}>
                        {delete_icon}
                    </div>
                </div>
            </div>
        );
        return row;
         
    }
    addContact(){
        var new_contact = { label:'Contact Label', value:'Contact Details'}
        var contacts_copy = Object.assign({},this.state.contacts);
        contacts_copy["new"] = new_contact;
        
        this.setState({contacts:contacts_copy},()=>{
            fetch(this.baseApiUrl+'contacts/',{ headers: this.authHeaders, method:"POST", body: JSON.stringify(this.state.contacts["new"])})
                .then(resp => resp.json())
                .then((data)=>{
                        var contact = {label: data['label'], value: data['value']};
                        var _contacts = Object.assign({},this.state.contacts);
                        delete _contacts["new"];
                        _contacts[data['id']] = contact;
                        this.setState({contacts:_contacts}); 
                    },
                    (error)=>{
                        //TODO:
                    }
                );
        });
    }
    render(){
        const add_icon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
        );
        var main = (
            <div className="history-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10 nopadding">
                            <div className="section-header">Contacts</div>
                        </div>
                        <div className="col-2 nopadding">
                            <div onClick={this.addContact} className="add-button">
                                {add_icon}
                            </div>
                        </div>
                    </div>
                    {
                        Object.keys(this.state.contacts).map((value,index)=>{
                            return this.getContactRow(value);
                        })
                    }               
                </div>
            </div>

        );
        return main;
    }
}

class ExperienceSection extends React.Component{
    constructor(props){
        super(props);
    }
    render(){
        const add_icon = (
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="white" class="bi bi-plus-circle-fill" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.5 4.5a.5.5 0 0 0-1 0v3h-3a.5.5 0 0 0 0 1h3v3a.5.5 0 0 0 1 0v-3h3a.5.5 0 0 0 0-1h-3v-3z"/>
            </svg>
        );
        var main = (
            <div className="history-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10 nopadding">
                            <div className="section-header">Experiences</div>
                        </div>
                        <div className="col-2 nopadding">
                            <div onClick={this.addContact} className="add-button">
                                {add_icon}
                            </div>
                        </div>
                    </div>

                    {/* Add  */}
                </div>
            </div>

        );
        return main;
    }
}


export default class HistoryPage extends React.Component {
    constructor(props){
        // @props: onNav : function : takes 'history' or 'resumes'
        super(props);

    }

    componentDidMount(){
        this.props.onNav('history');
    }

    render(){
        var main = (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <SkillSection/>
                        <ContactSection/>
                    </div>
                    <div className="col-lg-6 col-md-6">
                        <ExperienceSection/>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <h1>Education</h1>
                    </div>
                </div>
            </div>
        )

        
        return main;
    }
}