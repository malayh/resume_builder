import React from 'react';
import DatePicker from 'react-datepicker';

import 'react-datepicker/dist/react-datepicker.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import './historypage.css';

import {
    delete_icon,add_icon,edit_icon,done_icon,
    EditableDiv,CollasableDisplay,
    getDisplayDate, parseToDate, splitTextToPara
} from './components';

import {configs} from '../Config';




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

        this.baseApiUrl = configs.apiHostUrl+'coreapi/';
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

        var new_skill = {name:'Skill Name',score:1}
        var skills_copy = Object.assign({},this.state.skills);
        skills_copy[''+this.nextNegativeId] = new_skill;

        
        this.negetiveIds.push(''+this.nextNegativeId);
        this.nextNegativeId--;
        
        this.setState({skills:skills_copy},()=>{
            this.pushNewDataToServer();
        });
        
        
    }

    render(){
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

        this.baseApiUrl = configs.apiHostUrl+'coreapi/';
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

class JobProfile extends React.Component{
    constructor(props){
        // @props: id: Job profile id       
        // @props: profile, company, location, start_time, end_time, is_current     
        // @props: onUpdate: To be called when state updates. Need to pass the entire this.state as arg
        // @props: onDelete: To be called when delete is pressed. Need to pass id as arg.
        super(props);
        this.state = {
            id      : this.props.id,
            profile : this.props.profile,
            company : this.props.company,
            location: this.props.location,
            start_time: this.props.start_time,
            end_time: this.props.end_time,
            is_current: this.props.is_current            
        }

        this.dispRef = React.createRef();
        this.formRef = React.createRef();

        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);

        this.prevState = null;
    }

    componentDidMount(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';
    }
    onEdit(){
        this.dispRef.current.style.display='None';
        this.formRef.current.style.display='';
        this.prevState = Object.assign({},this.state);        
    }
    onSave(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';

        for(var key in this.prevState){
            if(this.state[key] !== this.prevState[key]){
                this.prevState = null;
                this.props.onChange(this.state)
                break;
            }
        }

    }

    render(){
        var main = (
            <div className="row" ref={this.dispRef}>
                <div className="col-10 nopadding text-wrap">
                    <div className="section-content">
                        <div className="job-profile">
                            <div className="profile-name">
                                <span>{this.state.profile}</span>
                                <span onClick={this.onEdit}>{edit_icon}</span>
                            </div>
                            { this.state.company && <span className="company-name">{this.state.company}</span>}
                            { this.state.location && <span className="location">{this.state.location}</span>}
                            <div className="timeframe">
                                { this.state.start_time && <span className="start-time">From: {getDisplayDate(this.state.start_time)}</span>}
                                { this.state.end_time && <span className="end-time text-wrap">To: {getDisplayDate(this.state.end_time)}</span>}
                            </div>
                            <div className="is-present">
                                {this.state.is_current===true && <span>Currently Work here</span>}
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-2 nopadding">
                    <div className="delete-button" onClick={()=>{this.props.onDelete(this.state.id)}}>
                        {delete_icon}
                    </div>
                </div>
            </div>
        );

        var form = (
            <div className="row" ref={this.formRef}>
                <div className="col-10 nopadding text-wrap">
                    <div className="section-content">
                        <div className="job-profile">
                            <div className="profile-name">
                                <span>
                                    <input placeholder="Job profile" 
                                            value={this.state.profile} 
                                            onChange={(val)=>this.setState({profile:val.target.value})}/>
                                </span> 
                                <span onClick={this.onSave}>{done_icon}</span>
                            </div>
                            
                            <input className="company-name" 
                                    placeholder="Company Name" 
                                    value={this.state.company} 
                                    onChange={(val)=>this.setState({company:val.target.value})} />
                            
                            <input className="location" 
                                    placeholder="Location" 
                                    value={this.state.location}
                                    onChange={(val)=>this.setState({location:val.target.value})}/>
                            
                            <div className="timeframe">
                                <div className="start-time">
                                    Start time: <DatePicker selected={this.state.start_time} onChange={(date)=>{this.setState({start_time:date})}}/>
                                </div>
                                <div className="end-time">
                                    End time: <DatePicker selected={this.state.end_time} onChange={(date)=>{this.setState({end_time:date})}}/>
                                </div>
                            </div>

                            <div className="is-present">
                                <label className="form-check-label" for="exampleCheck1">Currently Work here?</label>
                                <input type="checkbox" 
                                        className="form-check-input" 
                                        id="exampleCheck1" 
                                        defaultChecked={this.state.is_current} 
                                        onChange={(e)=>this.setState({is_current:e.target.checked})}/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );

        return <div key={this.state.id}>{main}{form}</div>
    }
}

class ExperienceSection extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            xp : {}
        }
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);
        
        this.baseApiUrl = configs.apiHostUrl+'coreapi/';
        this.authHeaders = { 
            'Content-Type':'application/json',
            'Authorization': 'token '+window.localStorage.getItem('rb_access_token')
        };
    }

    onUpdate(obj){
        var xp_copy = Object.assign(this.state.xp);
        xp_copy[obj.id] = {
            profile : obj.profile,
            company : obj.company, 
            location: obj.location,
            start_time: obj.start_time,
            end_time: obj.end_time,
            is_current: obj.is_current
        }

        this.updateOnServer(obj.id,xp_copy[obj.id])
            .then(()=>{
                this.setState({xp:xp_copy});
            })

    }

    onDelete(id){
        var xp_copy = Object.assign({},this.state.xp);
        delete xp_copy[id];
        fetch(this.baseApiUrl+'jobprofiles/'+id+'/', { headers: this.authHeaders, method:'DELETE'})
            .then(resp => resp.json())
            .then((data)=>{
                this.setState({xp:xp_copy});
                },(error) => {
                    //TODO: Handle error here
                }
            );
        
    }

    onAdd(){
        var new_xp = {
            profile : "Job profile",
            company : null, 
            location: null,
            start_time: null,
            end_time: null,
            is_current: false
        }
        this.createOnServer(new_xp)
            .then((data)=>{
                let id = data['id'];
                var _d = Object.assign({},data);
                // Deleting the id, because we are passing an id prop to JobProfile component and a xp obj,
                // if both has id attribute it will be a problem
                delete _d['id'];
                var xp_copy = Object.assign({},this.state.xp);
                xp_copy[id] = _d;
                this.setState({xp:xp_copy});
            });
        
    }


    async getAllFromApi(){
        let resp = await fetch(this.baseApiUrl+'jobprofiles/',{ headers: this.authHeaders,method:"GET"});
        let data = await resp.json();

        let new_xp = {}
        for(var i of data){
            new_xp[i.id] = {
                profile : i.profile,
                company : i.company, 
                location: i.location,
                start_time: parseToDate(i.start_time),
                end_time: parseToDate(i.end_time),
                is_current: i.is_current
            }
        }
        this.setState({xp:new_xp});
    }

    async createOnServer(obj){
        // obj is a xp object
        let resp = await fetch(this.baseApiUrl+'jobprofiles/', { headers: this.authHeaders, method:"POST", body:JSON.stringify(obj) });
        let data = await resp.json();
        return data;
    }

    async updateOnServer(id,obj){
        let resp = await fetch(this.baseApiUrl+'jobprofiles/'+id+'/', { headers: this.authHeaders, method:"PUT", body:JSON.stringify(obj) });
        let data = await resp.json();
        return data;
    }

    componentDidMount(){
        // TODO: Catch shit here
        this.getAllFromApi();
    }

    render(){       
        var main = (
            <div className="history-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10 nopadding">
                            <div className="section-header">Experiences</div>
                        </div>
                        <div className="col-2 nopadding">
                            <div onClick={this.onAdd} className="add-button">
                                {add_icon}
                            </div>
                        </div>
                    </div>
                    {
                        Object.keys(this.state.xp).map((id,index)=>{
                            return <JobProfile key={id} id={id} {...this.state.xp[id]} onChange={this.onUpdate} onDelete={this.onDelete}/>
                        })
                    }                    
                </div>
            </div>

        );
        return main;
    }
}


class Eductaion extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            id : props.id,
            degree: props.degree,
            provider: props.provider,
            start_time: props.start_time,
            end_time: props.end_time,
            is_current: props.is_current
        }

        this.dispRef = React.createRef();
        this.formRef = React.createRef();
        
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);

        this.prevState = null;

    }

    componentDidMount(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';
    }

    onEdit(){
        this.dispRef.current.style.display='None';
        this.formRef.current.style.display='';
        this.prevState = Object.assign({},this.state);        
    }
    onSave(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';

        for(var key in this.prevState){
            if(this.state[key] !== this.prevState[key]){
                this.props.onChange(this.state)
                this.prevState = null;
                return;
            }
        }

    }

    render(){
        var main = (
            <div className="row" ref={this.dispRef}>
                <div className="col-10 nopadding text-wrap">
                    <div className="section-content">
                        <div className="job-profile">
                            <div className="profile-name">
                                <span>{this.state.degree}</span>
                                <span onClick={this.onEdit}>{edit_icon}</span>
                            </div>
                            { this.state.provider && <span className="company-name">{this.state.provider}</span>}
                            <div className="timeframe">
                                { this.state.start_time && <span className="start-time">From: {getDisplayDate(this.state.start_time)}</span>}
                                { this.state.end_time && <span className="end-time text-wrap">To: {getDisplayDate(this.state.end_time)}</span>}
                            </div>
                            <div className="is-present">
                                {this.state.is_current===true && <span>Currently studing</span>}
                            </div>
                            
                        </div>
                    </div>
                </div>
                <div className="col-2 nopadding">
                    <div className="delete-button" onClick={()=>{this.props.onDelete(this.state.id)}}>
                        {delete_icon}
                    </div>
                </div>
            </div>
        );

        var form = (
            <div className="row" ref={this.formRef}>
                <div className="col-10 nopadding text-wrap">
                    <div className="section-content">
                        <div className="job-profile">
                            <div className="profile-name">
                                <span>
                                    <input placeholder="Course name" 
                                            value={this.state.degree} 
                                            onChange={(val)=>this.setState({degree:val.target.value})}/>
                                </span> 
                                <span onClick={this.onSave}>{done_icon}</span>
                            </div>
                            
                            <input className="company-name" 
                                    placeholder="Univerisy/College" 
                                    value={this.state.provider} 
                                    onChange={(val)=>this.setState({provider:val.target.value})} />
                            
                            <div className="timeframe">
                                <div className="start-time">
                                    Start time: <DatePicker selected={this.state.start_time} onChange={(date)=>{this.setState({start_time:date})}}/>
                                </div>
                                <div className="end-time">
                                    End time: <DatePicker selected={this.state.end_time} onChange={(date)=>{this.setState({end_time:date})}}/>
                                </div>
                            </div>

                            <div className="is-present">
                                <label className="form-check-label" for="exampleCheck1">Studing here now?</label>
                                <input type="checkbox" 
                                        className="form-check-input" 
                                        id="exampleCheck1" 
                                        defaultChecked={this.state.is_current} 
                                        onChange={(e)=>this.setState({is_current:e.target.checked})}/>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
        return <div key={this.state.id}>{main}{form}</div>;
    }

}

class EductaionSection extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            edu : {}
        }

        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onAdd = this.onAdd.bind(this);

        this.baseApiUrl = configs.apiHostUrl+'coreapi/';
        this.authHeaders = { 
            'Content-Type':'application/json',
            'Authorization': 'token '+window.localStorage.getItem('rb_access_token')
        };
    }

    onUpdate(obj){
        var edu_copy = Object.assign(this.state.edu);
        let id = obj['id'];
        
        let obj_copy = Object.assign({},obj);
        delete obj_copy['id'];
        edu_copy[id] = obj_copy;


        this.updateOnServer(id,obj_copy)
            .then(()=>{
                this.setState({edu:edu_copy});
            });

    }

    onDelete(id){
        var edu_copy = Object.assign({},this.state.edu);
        delete edu_copy[id];
        fetch(this.baseApiUrl+'edus/'+id+'/', { headers: this.authHeaders, method:'DELETE'})
            .then(resp => resp.json())
            .then((data)=>{
                this.setState({edu:edu_copy});
                },(error) => {
                    //TODO: Handle error here
                }
            );
    }

    onAdd(){
        var new_edu = {
            degree: 'Name of degree',
            provider: null,
            start_time: null,
            end_time: null,
            is_current: false
        }
        this.createOnServer(new_edu)
            .then((data)=>{
                var new_id = data['id'];
                delete data['id'];
                var edu_copy = Object.assign({},this.state.edu);
                edu_copy[new_id] = data;
                this.setState({edu:edu_copy});
            });
    }
    
    async getAllFromApi(){
        let resp = await fetch(this.baseApiUrl+'edus/',{ headers: this.authHeaders,method:"GET"});
        let data = await resp.json();        

        let new_edu = {};
        for(var i of data){
            let new_id = i['id'];
            delete i['id']; 
            i['start_time'] = parseToDate(i['start_time']);
            i['end_time'] = parseToDate(i['end_time']);

            new_edu[new_id] = i;
        }

        this.setState({edu:new_edu});
        
    }

    async createOnServer(obj){
        // obj is a edu object
        let resp = await fetch(this.baseApiUrl+'edus/', { headers: this.authHeaders, method:"POST", body:JSON.stringify(obj) });
        let data = await resp.json();
        return data;
    }

    async updateOnServer(id,obj){
        let resp = await fetch(this.baseApiUrl+'edus/'+id+'/', { headers: this.authHeaders, method:"PUT", body:JSON.stringify(obj) });
        let data = await resp.json();
        return data;
    }

    componentDidMount(){
        this.getAllFromApi();
    }

    render(){
        var main = (
            <div className="history-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10 nopadding">
                            <div className="section-header">Education</div>
                        </div>
                        <div className="col-2 nopadding">
                            <div onClick={this.onAdd} className="add-button">
                                {add_icon}
                            </div>
                        </div>
                    </div>
                    {
                        Object.keys(this.state.edu).map((id,index)=>{
                            return <Eductaion key={id} id={id} {...this.state.edu[id]} onChange={this.onUpdate} onDelete={this.onDelete}/>
                        })
                    } 
                </div>
            </div>

        );
        return main;

    }
}

class ProfileSummary extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            id: props.id,
            name: props.name,
            summary: props.summary
        }

        this.dispRef = React.createRef();
        this.formRef = React.createRef();
        
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);

        this.prevState = null;

    }

    componentDidMount(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';
    }

    onEdit(){
        this.dispRef.current.style.display='None';
        this.formRef.current.style.display='';
        this.prevState = Object.assign({},this.state);        
    }
    onSave(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';

        for(var key in this.prevState){
            if(this.state[key] !== this.prevState[key]){
                this.props.onChange(this.state)
                this.prevState = null;
                return;
            }
        }

    }

    render(){
        var main = (
            <div className="row" ref={this.dispRef}>
                <div className="col-10 nopadding text-wrap">
                    <div className="section-content">
                        <div className="job-profile">
                            <div className="profile-name">
                                <span>{this.state.name}</span>
                                <span onClick={this.onEdit}>{edit_icon}</span>
                            </div>
                            { this.state.summary && <span className="company-name">{splitTextToPara(this.state.summary)}</span>}
                            
                        </div>
                    </div>
                </div>
                <div className="col-2 nopadding">
                    <div className="delete-button" onClick={()=>{this.props.onDelete(this.state.id)}}>
                        {delete_icon}
                    </div>
                </div>
            </div>
        );

        var form = (
            <div className="row" ref={this.formRef}>
                <div className="col-10 nopadding text-wrap">
                    <div className="section-content">
                        <div className="job-profile">
                            <div className="profile-name">
                                <span>
                                    <input placeholder="Summary name" 
                                            value={this.state.name} 
                                            onChange={(val)=>this.setState({name:val.target.value})}/>
                                </span> 
                                <span onClick={this.onSave}>{done_icon}</span>
                            </div>
                            
                            <span className="textarea-label">Sumarry:</span>
                            <textarea className="company-name" 
                                    placeholder="summary" 
                                    value={this.state.summary} 
                                    onChange={(val)=>this.setState({summary:val.target.value})} />
                            
                            
                        </div>
                    </div>
                </div>
            </div>
        );
        return <div key={this.state.id}>{main}{form}</div>;
    }   
}

class ProfileSummarySection extends React.Component{
    constructor(props){
        super(props);

        this.state = {
            profSum : {}
        }

        this.onAdd = this.onAdd.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);

        this.baseApiUrl = configs.apiHostUrl+'coreapi/';
        this.authHeaders = { 
            'Content-Type':'application/json',
            'Authorization': 'token '+window.localStorage.getItem('rb_access_token')
        };
    }
    onAdd(){
        var new_ps = {name:"Profile Summary",summary:"Edit this summary"};
        this.createOnServer(new_ps)
            .then((data)=>{
                let id = data['id'];
                delete data['id'];
                var _ps = Object.assign({},this.state.profSum);
                _ps[id] = data;
                this.setState({profSum:_ps});
            });

    }
    onUpdate(obj){
        var _ps = Object.assign({},this.state.profSum);
        var id = obj['id'];
        var _obj = Object.assign({},obj);
        delete _obj['id'];
        _ps[id] = _obj;

        this.updateOnServer(id,_obj)
            .then(()=>{
                this.setState({profSum:_ps});
            });

    }
    onDelete(id){
        var _ps = Object.assign({},this.state.profSum);
        delete _ps[id];
        fetch(this.baseApiUrl+'summaries/'+id+'/', { headers: this.authHeaders, method:'DELETE'})
            .then(resp => resp.json())
            .then((data)=>{
                this.setState({profSum:_ps});
                },(error) => {
                    //TODO: Handle error here
                }
            );
    }

    async getAllFromApi(){
        let resp = await fetch(this.baseApiUrl+'summaries/',{ headers: this.authHeaders,method:"GET"});
        let data = await resp.json();

        var new_ps = {}
        for(var i of data){
            var id = i['id'];
            delete i['id'];
            new_ps[id] = i;
        }

        this.setState({profSum:new_ps});
    }

    async updateOnServer(id,obj){
        let resp = await fetch(this.baseApiUrl+'summaries/'+id+'/', { headers: this.authHeaders, method:"PUT", body:JSON.stringify(obj) });
        let data = await resp.json();
        return data;
    }
    
    async createOnServer(obj){
        // obj is a edu object
        let resp = await fetch(this.baseApiUrl+'summaries/', { headers: this.authHeaders, method:"POST", body:JSON.stringify(obj) });
        let data = await resp.json();
        return data;
    }

    componentDidMount(){
        this.getAllFromApi();
    }
    render(){
        var main = (
            <div className="history-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10 nopadding">
                            <div className="section-header">Profile Summaries</div>
                        </div>
                        <div className="col-2 nopadding">
                            <div onClick={this.onAdd} className="add-button">
                                {add_icon}
                            </div>
                        </div>
                    </div>
                    {
                        Object.keys(this.state.profSum).map((id,index)=>{
                            return <ProfileSummary key={id} id={id} {...this.state.profSum[id]} onChange={this.onUpdate} onDelete={this.onDelete}/>
                        })
                    }
                </div>
            </div>

        );
        return main;
    }
}

class Project extends React.Component{
    constructor(props){
        super(props);
        this.state ={
            id : props.id,
            title: props.title,
            story: props.story,
            keywords : props.keywords
        }

        this.dispRef = React.createRef();
        this.formRef = React.createRef();
        
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);

        this.prevState = null;
    }

    componentDidMount(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';
    }

    onEdit(){
        this.dispRef.current.style.display='None';
        this.formRef.current.style.display='';
        this.prevState = Object.assign({},this.state);        
    }

    onSave(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';

        for(var key in this.prevState){
            if(this.state[key] !== this.prevState[key]){
                this.props.onChange(this.state)
                this.prevState = null;
                return;
            }
        }

    }
    
    getDispKeyword(str){
        var keywords = str.split(",");
        return (
            <span>
                {keywords.map(val=>{
                    return <span className="keyword-item">{val}</span>
                })}
            </span>
        );
    }
    render(){
        var main = (
            <div className="row" ref={this.dispRef}>
                <div className="col-10 nopadding text-wrap">
                    <div className="section-content">
                        <div className="job-profile">
                            <div className="profile-name">
                                <span>{this.state.title}</span>
                                <span onClick={this.onEdit}>{edit_icon}</span>
                            </div>
                            <div className="keywords">
                                {   this.state.keywords && <span>{this.getDispKeyword(this.state.keywords)}</span> }
                            </div>

                            <CollasableDisplay name="Story">
                                { this.state.story && <span className="company-name">{splitTextToPara(this.state.story)}</span>}
                            </CollasableDisplay>                       
                                    
                        </div>
                    </div>
                </div>
                <div className="col-2 nopadding">
                    <div className="delete-button" onClick={()=>{this.props.onDelete(this.state.id)}}>
                        {delete_icon}
                    </div>
                </div>
            </div>
        );

        var form = (
            <div className="row" ref={this.formRef}>
                <div className="col-10 nopadding text-wrap">
                    <div className="section-content">
                        <div className="job-profile">
                            <div className="profile-name">
                                <span>
                                    <input placeholder="Project Title" 
                                            value={this.state.title} 
                                            onChange={(val)=>this.setState({title:val.target.value})}/>
                                </span> 
                                <span onClick={this.onSave}>{done_icon}</span>
                            </div>

                            <span className="textarea-label">Keywords</span>
                                <textarea className="company-name" 
                                        placeholder="Specific keyword for the project" 
                                        value={this.state.keywords} 
                                        onChange={(val)=>this.setState({keywords:val.target.value})}
                                        style={{height:'50pt'}}
                                        />
                            
                            <span className="textarea-label">Story</span>
                            <textarea className="company-name" 
                                    placeholder="Write the story of the project." 
                                    value={this.state.story} 
                                    onChange={(val)=>this.setState({story:val.target.value})} />

                            
                            
                        </div>
                    </div>
                </div>
            </div>
        );
        return <div key={this.state.id}>{main}{form}</div>;
    }
}

class ProjectSection extends React.Component{
    constructor(props){
        super(props);

        this.state ={
            projects:{}
        }
        this.onAdd = this.onAdd.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);

        this.baseApiUrl = configs.apiHostUrl+'coreapi/';
        this.authHeaders = { 
            'Content-Type':'application/json',
            'Authorization': 'token '+window.localStorage.getItem('rb_access_token')
        };
    }

    

    onAdd(){
        

    }
    onUpdate(obj){
       

    }
    onDelete(id){
        
    }

    async getAllFromApi(){
        let resp = await fetch(this.baseApiUrl+'projects/',{ headers: this.authHeaders,method:"GET"});
        let data = await resp.json();

        var projects = {}
        for(var i of data){
            var id = i['id'];
            delete i['id'];
            projects[id] = i;
        }

        this.setState({projects:projects});
    }

    componentDidMount(){
        this.getAllFromApi();
    }
    render(){
        var main = (
            <div className="history-section">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-10 nopadding">
                            <div className="section-header">Projects</div>
                        </div>
                        <div className="col-2 nopadding">
                            <div onClick={this.onAdd} className="add-button">
                                {add_icon}
                            </div>
                        </div>
                    </div>
                    {
                        Object.keys(this.state.projects).map((id,index)=>{
                            return <Project key={id} id={id} {...this.state.projects[id]} onChange={this.onUpdate} onDelete={this.onDelete}/>
                        })
                    }
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
                        <ProjectSection/>
                        <ProfileSummarySection/>
                    </div>
                    <div className="col-lg-3 col-md-6">
                        <EductaionSection/>
                    </div>
                </div>
            </div>
        )

        
        return main;
    }
}