import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './resume_base.css';
import './Zhong.css';

import {DBEndpoint} from '../../common/DB';
import {add_icon,edit_icon,delete_icon,done_icon, downarrow} from '../../common/Icons'
import { map, timers } from 'jquery';

var icons = {
    mail_icon : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
        </svg>),
    glob_icon : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-globe" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
        </svg>
    ),
    linkdin : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
        </svg>
    ),
    github: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
    ),
    phone: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-telephone-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
        </svg>
    ),
    house : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-house-fill" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 3.293l6 6V13.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5V9.293l6-6zm5-.793V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"/>
        <path fill-rule="evenodd" d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"/>
        </svg>
    )
}

let icon_map = {
    mail_icon   : icons.mail_icon,
    glob_icon   : icons.glob_icon,
    linkdin_icon: icons.linkdin,
    github_icon : icons.github,
    phone_icon  : icons.phone,
    house_icon  : icons.house
}

export class TemplateZhong extends React.Component {
    // Why named Zhong? Becauce copied from https://mnjul.net/cv/resume.pdf
    render(){
        var main = (
            <div className="resume-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 nopadding" id="main-content-section">
                            {/* Main content body goes in this col*/}
                            <div className="resume-sub-section">
                                <div className="user-name">Malay Hazarika</div>
                                <div className="user-profile">Full-Stack Developer</div>
                                <div className="profile-summary">I am a software engineer with strong inclination towards well engineered solutions over quick fixes. I have implemented reliable systems that scales and are designed for easy of comprehension and maintenance.</div>
                            </div>
                            <div className="resume-sub-section">
                                <div className="heading">Projects</div>
                                <div className="labelled-desc">
                                    <div className="label-ld">Large scale web crawller</div>
                                    <ul>
                                        <li>
                                            <div className="desc">
                                                Built large scale web scraping tool using Python to gather and index data from over 150k ecommerce sites that monitor sales of 27 Million products. This data is used to predict sales patterns to help build effective business strategies for online retailer.
                                            </div>
                                        </li>
                                        <li>
                                            <div className="desc">
                                                Built large scale web scraping tool using Python to gather and index data from over 150k ecommerce sites that monitor sales of 27 Million products. This data is used to predict sales patterns to help build effective business strategies for online retailer.
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                                <div className="labelled-desc">
                                    <div className="label-ld">Lorem Ipusm project</div>
                                    <ul>
                                        <li>
                                            <div className="desc">
                                                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rutrum sapien enim, ut iaculis dolor feugiat ut. Nam rutrum tempus orci, aliquam vulputate velit venenatis vestibulum. Aenean gravida vitae urna hendrerit dictum. Quisque a orci eu ex pretium tempus luctus sed justo.
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="resume-sub-section">
                                <div className="heading">Experiences</div>
                                <div className="labelled-desc">
                                    <div className="label-ld">Software Engineer</div>
                                    <div className="timeframe">Jul 2019 - Nov 2020</div>
                                    <div className="sub-label">Subex, Banglore, KA</div>
                                    <ul>
                                        <li>
                                            <div className="desc">
                                                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rutrum sapien enim, ut iaculis dolor feugiat ut. Nam rutrum tempus orci, aliquam vulputate velit venenatis vestibulum. Aenean gravida vitae urna hendrerit dictum. Quisque a orci eu ex pretium tempus luctus sed justo.
                                            </div>
                                        </li>
                                    </ul>
                                </div>

                                <div className="labelled-desc">
                                    <div className="label-ld">Freelance Developer</div>
                                    <div className="timeframe">Jan 2018 - Present</div>
                                    {/* <div className="sub-label">Subex, Banglore, KA</div> */}
                                    <ul>
                                        <li>
                                            <div className="desc">
                                                Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Integer rutrum sapien enim, ut iaculis dolor feugiat ut. Nam rutrum tempus orci, aliquam vulputate velit venenatis vestibulum. Aenean gravida vitae urna hendrerit dictum. Quisque a orci eu ex pretium tempus luctus sed justo.
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                            <div className="resume-sub-section">
                                <div className="heading">Education</div>
                                <div className="labelled-desc">
                                    <div className="label-ld">B.Tech. Computer Science</div>
                                    <div className="timeframe">Aug 2015 - Jun 2019</div>
                                    <div className="sub-label">Dibrugarh Univerisy</div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 nopadding" id="sidebar-section">
                            {/* The side bar goes here */}
                            <div className="resume-sub-section">
                                <div className="heading">Portfolio</div>
                                <div className="labelled-info">
                                    <div className="label-ld">{icons.glob_icon}</div>
                                    <div className="info">thehazarika.com</div>  
                                </div>
                                <div className="labelled-info">
                                    <div className="label-ld">{icons.github}</div>
                                    <div className="info">github.com/malayh</div>  
                                </div>
                            </div>
                            <div className="resume-sub-section">
                                <div className="heading">Contact</div>
                                <div className="labelled-info">
                                    <div className="label-ld">{icons.phone}</div>
                                    <div className="info">+91 7896290374</div>  
                                </div>
                                <div className="labelled-info">
                                    <div className="label-ld">{icons.mail_icon}</div>
                                    <div className="info">malay.hazarika@gmail.com</div>  
                                </div>
                                <div className="labelled-info">
                                    <div className="label-ld">{icons.linkdin}</div>
                                    <div className="info">linkdin.com/malay-hazarika</div>  
                                </div>
                            </div>
                            <div className="resume-sub-section">
                                <div className="heading">Skills</div>
                                <div className="skill-section">
                                    <div className="skill-item">Python</div>
                                    <div className="skill-item">C++</div>
                                    <div className="skill-item">Javascript</div>
                                    <div className="skill-item">ReactJS</div>
                                    <div className="skill-item">Django</div>
                                    <div className="skill-item">Postgres</div>
                                    <div className="skill-item">Linux</div>
                                    <div className="skill-item">AWS</div>
                                    <div className="skill-item">Bash scripting</div>
                                    <div className="skill-item">System Design</div>
                                    <div className="skill-item">Data Modelling</div>
                                    <div className="skill-item">Multithreading</div>
                                    
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>
        );
        return main;
    }
}

class HoverDropdown extends React.Component {
    // @props: onSelect: callback when a item is selected
    // childern can have prop eventKey which will be passed to onSelect callback
    constructor(props){
        super(props);

        this.menuRef = React.createRef();
    }

    render(){
        return (
            <div className="dropdown"
        
            onMouseLeave={()=>{
                this.menuRef.current.style.display='none';
            }}
            
            onClick={()=>{
                // this.menuRef.current.style.display='block'; 
                // this.menuRef.current.style.margin=0
            }}
            onMouseEnter={()=>{
                this.menuRef.current.style.display='block'; 
                this.menuRef.current.style.margin=0
            }}
            >                
                <span>
                    {this.props.name}                
                </span> 

                <div ref={this.menuRef} className="dropdown-menu">
                    {this.props.heading && <div className="dropdown-header">{this.props.heading}</div>}
                    {
                        React.Children.map(this.props.children, (child, i) =>{
                            return (
                                <span key={i} key={i} className="dropdown-item" onClick={()=>{
                                    if(this.props.onSelect && child.props.eventKey) this.props.onSelect(child.props.eventKey);
                                }}>{child}</span>
                            )
                        })
                    }
                </div>
            </div>
        );
    }


}

class SummaryMappableMapping extends React.Component {
    render(){
        return (
            <>
            <div className="maping-editor">
                <div className="labelled-info" style={{display:"flex"}}>
                    <div className="label-ld">{this.props.title}</div>
                    <div className="dropdowns">
                        <HoverDropdown name={add_icon} heading="Select project summary">
                        </HoverDropdown>
                    </div>
                </div>
                <span className="button" onClick={()=>this.props.onDelete(this.props.id)}>{delete_icon}</span>
            </div>
            </>
        );
    }
}

class MainSubsection extends React.Component {
    //@props: xp_opts: id : { id : 1, profile:"Software Engineer", company: "subex", location: "", start_time:, end_time: is_current:}
    constructor(props){
        super(props);
        this.state = {
            id : props.id,
            resume_fk : props.resume_fk,
            title : props.title,
            position : props.position,

            xp_mapping : [
                // {id: 1, position: 1, template_prop:null, skill_fk: 53, name: "Python", score:""}
            ],

            project_mapping : [
                // {id: 1, position: 1, template_prop:null, project_fk: 53, title: "Some name"}
            ],

        }

        this.dispRef = React.createRef();
        this.formRef = React.createRef();
        
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        
        this.prevState = null;
        
        this.max_project_map_pos = 1;
        this.dbProjectMap = new DBEndpoint('coreapi/resumes/projects/');
        this.onAddProjectMap = this.onAddProjectMap.bind(this);
        this.onDeleteProjectMap = this.onDeleteProjectMap.bind(this);
    }

    async loadMappings(){
        let data = await this.dbProjectMap.addFilter({resume_subsection_fk:this.state.id}).readAll();
        data.sort((a,b) => (a.position > b.position ? 1 : -1));
        let _pm = [];
        for(let i of data){
            i['title'] = this.props.project_opts[i['project_fk']]['title'];
            _pm.push(i);
            if(i['position'] > this.max_project_map_pos)
                this.max_project_map_pos = i['position'];
        }

        this.setState({project_mapping:_pm});
        
    }
    componentDidMount(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';
        this.loadMappings();
    }

    onEdit(){
        this.dispRef.current.style.display='None';
        this.formRef.current.style.display='';
        this.prevState = {
            id : this.state.id,
            resume_fk : this.state.resume_fk,
            title : this.state.title,
            position : this.state.position
        };       
    }

    onSave(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';

        for(var key in this.prevState){
            if(this.state[key] !== this.prevState[key]){
                this.prevState = null;
                this.props.onChange({
                    id : this.state.id,
                    resume_fk : this.state.resume_fk,
                    title : this.state.title,
                    position : this.state.position
                });
                break;
            }
        }

    }

    onAddProjectMap(project_fk){
        let new_map = { 
            project_fk : project_fk, 
            resume_fk : this.state.resume_fk, 
            resume_subsection_fk : this.state.id,
            position : this.max_project_map_pos+1
        };
        this.dbProjectMap.createOne(new_map)
        .then(data => {
            data['title'] = this.props.project_opts[project_fk]['title'];
            let _pm = Object.assign([],this.state.project_mapping);
            _pm.push(data);
            this.setState({project_mapping:_pm});
            this.max_project_map_pos++;            
        });
    }
    onDeleteProjectMap(map_id){
        let _pm = Object.assign([],this.state.project_mapping);
        let index = -1;
        for(let i=0 ; i < _pm.length ; i++){
            if(_pm[i].id === map_id){
                index = i;
                break;
            }
        }
        if(index < 0)
            return;

        _pm.splice(index,1);

        this.dbProjectMap.deleteOne(map_id)
        .then(()=>{
            this.setState({project_mapping:_pm});            
        });
    }

    render(){
        var main = (
            <div className="resume-sub-section" ref={this.dispRef}>
                <div className="heading-edit">
                    <span style={{display:"flex"}}>
                        {this.state.title && <div className="heading">{this.state.title}</div> }
                        <span className="button" onClick={this.onEdit}>{edit_icon}</span>
                    </span>
                    <span className="button" onClick={()=>{this.props.onDelete(this.state.id)}}>{delete_icon}</span>
                </div>

                {
                    this.state.project_mapping.map(val=>{
                        return(
                            <div className="labelled-desc">
                                <div className="label-ld">{val.title}</div>
                            </div>
                        );

                    })
                }

            </div>
        );
        var form = (
            <div className="subsection-form" ref={this.formRef}>
                <div className="heading-edit">
                    <input placeholder="Section Title" 
                        value={this.state.title} 
                        onChange={(val)=>this.setState({title:val.target.value})}/>
                    <span className="button" onClick={this.onSave}>{done_icon}</span>
                </div>

                <div>
                {
                    // Project map edit
                    this.state.project_mapping.map(val =>{
                        return (
                            <SummaryMappableMapping
                                key={val.id}
                                id={val.id}
                                title={val.title}
                                onDelete={this.onDeleteProjectMap}/>
                        );
                    })
                }
                </div>

                <div className="heading-edit">
                    <div className="dropdowns">
                        <HoverDropdown name={add_icon} heading="Select Mapping">
                            <HoverDropdown name="Experiences">
                            {
                                Object.keys(this.props.xp_opts).map(key=>{
                                    return <span key={key} eventKey={key}>{this.props.xp_opts[key]['profile']}</span>
                                })
                            }
                            </HoverDropdown>
                            <HoverDropdown name="Projects" onSelect={this.onAddProjectMap}>
                            {
                                Object.keys(this.props.project_opts).map(key=>{
                                    return <span key={key} eventKey={key}>{this.props.project_opts[key]['title']}</span>
                                })
                            }
                            </HoverDropdown>
                        </HoverDropdown>
                    </div>
                </div>

            </div>

            
        );

        return <>{main}{form}</>;
    }
}

class ContactMapping extends React.Component {
    // For this template template_prop is a a string, which can be null or a key to the icon_map object
    //@props: onDelete : callback when delete is clicked.: Param: contact mapping id
    //@props: onUpdate : callback when template_prop is updated: Param: contact mapping id, template_prop
    constructor(props){
        super(props);
        this.onIconSelect = this.onIconSelect.bind(this);
        this.state ={
            template_prop : props.template_prop,
            current_label : props.template_prop === null || !icon_map[props.template_prop] ? props.label : icon_map[props.template_prop]
        }
    }
    onIconSelect(eventKey){
        if(this.state.template_prop !== eventKey){
            if(eventKey === "0"){
                this.setState({template_prop:null, current_label:this.props.label});
                this.props.onUpdate(this.props.id,null);
            }
            else{
                this.props.onUpdate(this.props.id,eventKey);
                this.setState({template_prop:eventKey, current_label:icon_map[eventKey]});
            }
        }

    }
    render(){
        return (
            <div className="maping-editor">
                <div className="labelled-info">
                    <div className="label-ld" style={{display:"flex"}}>
                        <HoverDropdown name={this.state.current_label} heading="Choose a label" onSelect={this.onIconSelect}>
                            <span key="0" eventKey="0">{this.props.label}</span>
                            {
                                Object.keys(icon_map).map(key=>{
                                    return <span key={key} eventKey={key}>{icon_map[key]}</span>                                    
                                })
                            }
                        </HoverDropdown>                        
                    </div>
                    <div className="info">{this.props.value}</div>  
                </div>
                <span className="button" onClick={()=>this.props.onDelete(this.props.id)}>{delete_icon}</span>
            </div>            
        );
    }
}

class SkillMapping extends React.Component {
    //@props: name
    //@props: id
    //@props: onDelete : callback for delete : Param : mapping id

    render(){
        return (
        <div className="maping-editor">
            <div>{this.props.name}</div>
            <span className="button" onClick={()=>this.props.onDelete(this.props.id)}>{delete_icon}</span>
        </div>
        );
    }
}

class SidebarSubsection extends React.Component {
    //@props onDelete: callback when sidebar subsection is deleted
    //@props onChange: callback when sidebar subsection is changed
    //@props contact_opts : obj of contacts : { id: {id : 1, label: "Phone", value: "1245" } }
    //@props skill_opts : obj of skills : { id: {id : 1, name: "C++", value: "75" } }


    constructor(props){
        super(props);
        this.state = {
            id : props.id,
            resume_fk : props.resume_fk,
            title : props.title,
            position : props.position,

            skill_mappings : [
                // {id: 1, position: 1, template_prop:null, skill_fk: 53, name: "Python", score:""}
            ],
            contact_mappings : [
                // {id: 1, position: 1, template_prop:null, contact_fk: 17, lable: "Lable", value:""}
            ],
        }

        
        this.dispRef = React.createRef();
        this.formRef = React.createRef();
        
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        
        this.prevState = null;
        
        this.max_contact_pos = 1;
        this.dbContactMap = new DBEndpoint('coreapi/resumes/contacts/');
        this.onContactMapAdd = this.onContactMapAdd.bind(this);
        this.onContactMapDel = this.onContactMapDel.bind(this);
        this.onContactMapUpdate = this.onContactMapUpdate.bind(this);


        this.max_skill_pos = 1;
        this.dbSkillMap = new DBEndpoint('coreapi/resumes/skills/');
        this.onSkillMapAdd = this.onSkillMapAdd.bind(this);
        this.onSkillMapDelete = this.onSkillMapDelete.bind(this);

    }

    async loadMappings(){
        let data = await this.dbContactMap.addFilter({resume_subsection_fk:this.state.id}).readAll();
        data.sort((a,b) => (a.position > b.position ? 1 : -1));
        let _cm = [];
        for(let i of data){
            i['label'] = this.props.contact_opts[i['contact_fk']]['label'];
            i['value'] = this.props.contact_opts[i['contact_fk']]['value'];
            _cm.push(i);
            if(i['position'] > this.max_contact_pos)
                this.max_contact_pos = i['position'];
        }

        this.setState({contact_mappings:_cm});

        data = await this.dbSkillMap.addFilter({resume_subsection_fk:this.state.id}).readAll()
        data.sort((a,b) => (a.position > b.position ? 1 : -1));
        let _sm = [];
        for(let i of data){
            i['name'] = this.props.skill_opts[i['skill_fk']]['name'];
            i['score'] = this.props.skill_opts[i['skill_fk']]['score'];
            _sm.push(i);
            if(i['position'] > this.max_skill_pos)
                this.max_skill_pos = i['position'];
        }

        this.setState({skill_mappings:_sm});
    }

    componentDidMount(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';
        this.loadMappings();
    }
    onEdit(){
        this.dispRef.current.style.display='None';
        this.formRef.current.style.display='';
        this.prevState = {
            id : this.state.id,
            resume_fk : this.state.resume_fk,
            title : this.state.title,
            position : this.state.position
        };        
    }
    onSave(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';

        for(var key in this.prevState){
            if(this.state[key] !== this.prevState[key]){
                this.prevState = null;
                this.props.onChange({
                    id : this.state.id,
                    resume_fk : this.state.resume_fk,
                    title : this.state.title,
                    position : this.state.position
                });
                break;
            }
        }

    }

    onContactMapAdd(contact_fk){
        let new_map = { 
            contact_fk : contact_fk, 
            resume_fk : this.state.resume_fk, 
            resume_subsection_fk : this.state.id,
            position : this.max_contact_pos+1
        };
        this.dbContactMap.createOne(new_map)
        .then(data =>{
            data['label'] = this.props.contact_opts[contact_fk]['label'];
            data['value'] = this.props.contact_opts[contact_fk]['value'];
            let _cm = Object.assign([],this.state.contact_mappings);
            _cm.push(data);
            this.setState({contact_mappings:_cm});
            this.max_contact_pos++;
        });
    }

    onContactMapDel(map_id){
        let _cm = Object.assign([],this.state.contact_mappings);
        let index = -1;
        for(let i=0 ; i < _cm.length ; i++){
            if(_cm[i].id === map_id){
                index = i;
                break;
            }
        }
        if(index < 0)
            return;

        _cm.splice(index,1);

        this.dbContactMap.deleteOne(map_id)
        .then(()=>{
            this.setState({contact_mappings:_cm});            
        });
    }

    onContactMapUpdate(map_id,template_prop){
        let _cm = Object.assign([],this.state.contact_mappings);
        let index = -1;
        for(let i=0 ; i < _cm.length ; i++){
            if(_cm[i].id === map_id){
                index = i;
                break;
            }
        }
        if(index < 0)
            return;

        _cm[index]['template_prop'] = template_prop;
        this.dbContactMap.updateOne(map_id,_cm[index])
        .then(()=>{
            this.setState({contact_mappings:_cm});
        });
    }

    onSkillMapAdd(skill_fk){
        let new_map = { 
            skill_fk : skill_fk, 
            resume_fk : this.state.resume_fk, 
            resume_subsection_fk : this.state.id,
            position : this.max_skill_pos+1
        };
        this.dbSkillMap.createOne(new_map)
        .then(data=>{
            data['name'] = this.props.skill_opts[skill_fk]['name'];
            data['score'] = this.props.skill_opts[skill_fk]['score'];

            let _sm = Object.assign([],this.state.skill_mappings);
            _sm.push(data);
            this.setState({skill_mappings:_sm});
            this.max_skill_pos++;
        });
    }

    onSkillMapDelete(map_id){
        let _sm = Object.assign([],this.state.skill_mappings);
        let index = -1;
        for(let i=0 ; i < _sm.length ; i++){
            if(_sm[i].id === map_id){
                index = i;
                break;
            }
        }
        if(index < 0)
            return;

        _sm.splice(index,1);

        this.dbSkillMap.deleteOne(map_id)
        .then(()=>{
            this.setState({skill_mappings:_sm});            
        });
    }


    render(){
        var main = (
            <div className="resume-sub-section" ref={this.dispRef}>
                <div className="heading-edit">
                    <span style={{display:"flex"}}>
                        {this.state.title && <div className="heading">{this.state.title}</div> }
                        <span className="button" onClick={this.onEdit}>{edit_icon}</span>
                    </span>
                    <span className="button" onClick={()=>{this.props.onDelete(this.state.id)}}>{delete_icon}</span>
                </div>
                
                {
                    // Contact mapping display
                    this.state.contact_mappings.map(i =>{
                        let label = i.template_prop === null || !icon_map[i.template_prop] ? i.label : icon_map[i.template_prop];
                        return (
                            <div className="labelled-info">
                                <div className="label-ld">{label}</div>
                                <div className="info">{i.value}</div>  
                            </div>
                        );
                    })
                }
                {
                    this.state.skill_mappings.length > 0 && <div className="skill-section">
                    {
                        this.state.skill_mappings.map( i => {
                            return <div className="skill-item">{i['name']}</div>
                        })
                    }
                    </div>
                }


            </div>
        );
        var form = (
            <div className="subsection-form" ref={this.formRef}>
                <div className="heading-edit">
                    <input placeholder="Section Title" 
                        value={this.state.title} 
                        onChange={(val)=>this.setState({title:val.target.value})}/>
                    <span className="button" onClick={this.onSave}>{done_icon}</span>
                </div>

                <div className="">
                {
                    this.state.contact_mappings.map(val=>{
                        return (
                            <ContactMapping 
                                key={val.id} 
                                id={val.id} 
                                label={val.label} 
                                value={val.value} 
                                template_prop={val.template_prop}
                                onUpdate={this.onContactMapUpdate}
                                onDelete={this.onContactMapDel}/>
                        );
                    })
                }
                </div>

                <div>
                {
                    this.state.skill_mappings.map(val =>{
                        return (
                            <SkillMapping 
                                key={val.id} 
                                id={val.id} 
                                name={val.name}
                                onDelete={this.onSkillMapDelete}/>
                        );
                    })
                }   
                </div>

                <div className="heading-edit">
                    <div className="dropdowns">
                        <HoverDropdown name={add_icon} heading="Select Mapping">
                            <HoverDropdown name="Contacts" onSelect={this.onContactMapAdd}>
                            {
                                Object.keys(this.props.contact_opts).map(key=>{
                                    return <span key={key} eventKey={key}>{this.props.contact_opts[key]['label']}</span>
                                })
                            }
                            </HoverDropdown>
                            <HoverDropdown name="Skill" onSelect={this.onSkillMapAdd}>
                            {
                                Object.keys(this.props.skill_opts).map(key=>{
                                    return <span key={key} eventKey={key}>{this.props.skill_opts[key]['name']}</span>
                                })
                            }
                            </HoverDropdown>
                        </HoverDropdown>
                    </div>
                </div>

            </div>
        );

        return <>{main}{form}</>;
    }
}

export class Composer extends React.Component {
    // TODO: Refector the add, delete, update to not repeat
    // @prop : resume : resume object : {id , title, job_profile_fk, profile_summary_fk }
    constructor(props){
        super(props);
        this.state = {
            resume: this.props.resume,
            user_name : null,
            profile : null,
            summary: null,
            sidebar_subsec : [
                // {"id": 8, "resume_fk": 22, "title": "Portfolio", "position": 101},
            ],

            main_subsec : [
                // {"id": 8, "resume_fk": 22, "title": "Projects", "position": 1},
            ],


            contacts : {
                // id: {id : 1, label: "Phone", value: "1245" }
            },
            skills : {
                // id : { id: 1, name: "Python", score: 95}
            },
            xp : {
                // id : { id : 1, profile:"Software Engineer", company: "subex", location: "", start_time:, end_time: is_current:}
            },
            projects : {
                // id : { id : 1, title:"Lorem Ipsum"}
            }
            
        }

        this.max_main_subsec_pos = 1;
        this.max_sidebar_subsec_pos = 101;

        this.dbSubSec = new DBEndpoint('coreapi/resumes/subsecs/');

        this.addSidebarSection = this.addSidebarSection.bind(this);
        this.onDeleteSidebar = this.onDeleteSidebar.bind(this);
        this.onUpdateSidebar = this.onUpdateSidebar.bind(this);

        this.onAddMainSections = this.onAddMainSections.bind(this);
        this.onDeleteMainSection = this.onDeleteMainSection.bind(this);
        this.onUpdateMainSection = this.onUpdateMainSection.bind(this);
    }

    onDeleteSidebar(id){

        let _ss = Object.assign([],this.state.sidebar_subsec);
        let index = -1;
        for(let i=0 ; i < _ss.length ; i++){
            if(_ss[i].id === id){
                index = i;
                break;
            }
        }
        if(index >= 0){
            _ss.splice(index,1);
        }
        
        this.dbSubSec.deleteOne(id)
        .then(()=>{
            this.setState({sidebar_subsec:_ss});            
        })

    }

    onUpdateSidebar(obj){
        let _ss = Object.assign([],this.state.sidebar_subsec);
        let index = -1;
        for(let i=0 ; i < _ss.length ; i++){
            if(_ss[i].id === obj.id){
                index = i;
                break;
            }
        }
        if(index < 0)
            return;
        
        for(let key in obj){
            _ss[index][key] = obj[key];
        }
        

        this.dbSubSec.updateOne(obj['id'],obj)
        .then(()=>{
            this.setState({sidebar_subsec:_ss})
        });
        
    }

    addSidebarSection(){
        let new_ss = {"resume_fk": this.state.resume.id, "title": "Subsection", "position": this.max_sidebar_subsec_pos+1};
        this.dbSubSec.createOne(new_ss)
        .then(data=>{
            let _ss = Object.assign([],this.state.sidebar_subsec);
            _ss.push(data);
            this.setState({sidebar_subsec:_ss});
            this.max_sidebar_subsec_pos++;
        });                
        
    }

    onAddMainSections(){
        // TODO: Add the following check

        // Mai section can have at most 100 subsections. Because subsection with position > 100 will become part of sidebar.
        // So adding and deleting continuously may increase the next usable position to be > 100. In that case we have to
        // alter positions of each subsection to be continuos so that we can use positions that were deleted and was never used.
        // So cheack if next avaiable positions > 100 and if number of subsections in main section < 100 then defragment 
        // the positions to make the continous. Then again check

        // TODO: Returning now. But need to run defragment before returning
        if(this.max_main_subsec_pos+1 > 99)
            return;

        let new_ss = {"resume_fk": this.state.resume.id, "title": "Subsection", "position": this.max_main_subsec_pos+1};
        this.dbSubSec.createOne(new_ss)
        .then(data=>{
            let _ss = Object.assign([],this.state.main_subsec);
            _ss.push(data);
            this.setState({main_subsec:_ss});
            this.max_main_subsec_pos++;
        });

    }

    onDeleteMainSection(id){
        let _ms = Object.assign([],this.state.main_subsec);
        let index = -1;
        for(let i=0 ; i < _ms.length ; i++){
            if(_ms[i].id === id){
                index = i;
                break;
            }
        }
        if(index >= 0){
            _ms.splice(index,1);
        }
        
        this.dbSubSec.deleteOne(id)
        .then(()=>{
            this.setState({main_subsec:_ms});            
        })
    }

    onUpdateMainSection(obj){
        let _ms = Object.assign([],this.state.main_subsec);
        let index = -1;
        for(let i=0 ; i < _ms.length ; i++){
            if(_ms[i].id === obj.id){
                index = i;
                break;
            }
        }
        if(index < 0)
            return;
        
        for(let key in obj){
            _ms[index][key] = obj[key];
        }
        

        this.dbSubSec.updateOne(obj['id'],obj)
        .then(()=>{
            this.setState({main_subsec:_ms})
        });
    }

    defragmentPositions(){

    }

    async loadSubsectionMenuData(){

        let _contacts = {};
        let data = await new DBEndpoint('coreapi/contacts/').readAll()
        for(let i of data)
            _contacts[i.id] = i;

        this.setState({contacts:_contacts});

        let _skills = {};
        data = await new DBEndpoint('coreapi/skills/').readAll();
        for(let i of data)
            _skills[i.id] = i;
            
        this.setState({skills:_skills});

        let _xp = {}
        data = await new DBEndpoint('coreapi/jobprofiles/').readAll();
        for(let i of data)
            _xp[i.id] = i;

        this.setState({xp:_xp});

        let _prj = {}
        data = await new DBEndpoint('coreapi/projects/').readAll();
        for(let i of data){
            _prj[i.id] = {id : i.id, title: i.title }
        }

        this.setState({projects:_prj});



        data = await this.dbSubSec.addFilter({resume_fk:this.state.resume.id}).readAll()
        data.sort((a,b) => (a.position > b.position ? 1 : -1));
        let _main_subsec = [];
        let _side_subsec = [];
        for(let i of data){
            if(i['position'] < 100){
                _main_subsec.push(i);
                if(i['position'] > this.max_main_subsec_pos)
                    this.max_main_subsec_pos = i.position;
            }
            else {
                _side_subsec.push(i);
                if(i['position'] > this.max_sidebar_subsec_pos)
                    this.max_sidebar_subsec_pos = i.position;
            }
        }

        
        this.setState({sidebar_subsec: _side_subsec});
        this.setState({main_subsec : _main_subsec});

    }

    componentDidMount(){
        new DBEndpoint('users/').readAll()
        .then(data => {
            this.setState({user_name:data['name']});
        });


        if(this.state.resume.job_profile_fk !== null){
            new DBEndpoint('coreapi/jobprofiles/').readOne(this.state.resume.job_profile_fk)
            .then(data => {
                this.setState({profile: data['profile']});
            });
        }
        


        if(this.state.resume.profile_summary_fk !== null){
            new DBEndpoint('coreapi/summaries/').readOne(this.state.resume.profile_summary_fk)
            .then(data =>{
                this.setState({summary: data['summary']});
            });
        }
        
        this.loadSubsectionMenuData();
    }

    

    render(){
        var main = (
            <div className="resume-body">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8 nopadding" id="main-content-section">
                            <div className="resume-sub-section">
                                <div className="user-name">{this.state.user_name}</div>
                                {this.state.profile && <div className="user-profile">{this.state.profile}</div>}
                                {this.state.summary && <div className="profile-summary">{this.state.summary}</div>}
                            </div>
                            {
                                this.state.main_subsec.map(subsec =>{
                                    return (
                                        <MainSubsection 
                                            key={subsec.id} 
                                            {...subsec}
                                            onDelete={this.onDeleteMainSection}
                                            onChange={this.onUpdateMainSection}
                                            xp_opts={this.state.xp}
                                            project_opts={this.state.projects}
                                        />)
                                    ;
                                })
                            }
                            <div className="resume-sub-section">
                                <span className="add-button" onClick={this.onAddMainSections}>
                                        <span>{add_icon}</span>
                                </span>                                             
                            </div>
                            
                        </div>
                        <div className="col-lg-4 nopadding" id="sidebar-section">
                            {
                                this.state.sidebar_subsec.map(subsec =>{
                                    return (
                                        <SidebarSubsection 
                                            key={subsec.id} 
                                            {...subsec} 
                                            onDelete={this.onDeleteSidebar} 
                                            onChange={this.onUpdateSidebar}
                                            contact_opts={this.state.contacts}
                                            skill_opts={this.state.skills}
                                        />
                                    );
                                })
                            }
                            
                            <div className="resume-sub-section">
                                <span className="add-button" onClick={this.addSidebarSection}>
                                    <span>{add_icon}</span>
                                </span>                                             
                            </div>                     
                        </div>
                    </div>
                </div>
            </div>
        );

        return main;
    }
}