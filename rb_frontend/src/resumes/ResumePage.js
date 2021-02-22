import React from 'react';
import {Form,Modal,Button,Jumbotron} from 'react-bootstrap'

import {SectionBody} from '../common/Section'

import {TemplateZhong, Composer} from './templates/Zhong';

import 'bootstrap/dist/css/bootstrap.min.css';
import './resumepage.css';
import '../add-history/historypage.css';

import {} from 'react-bootstrap';

import {delete_icon,download,edit_icon,done_icon} from '../common/Icons';
import {DBEndpoint,globalCache} from '../common/DB'


class ConfirmModal extends React.Component {
    // @prop: show : boolen
    // @prop: message : text to display
    // @prop: onCancel : call back on cancel
    // @prop: onConfirm : call back on confirm
    constructor(props){
        super(props);
    }
    render(){
        return (
            <Modal show={this.props.show} onHide={()=>this.props.onCancel}>
                <Modal.Header>
                    <Modal.Title>{this.props.message}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.onConfirm}>
                        Confirm
                    </Button>
                    <Button variant="primary" onClick={this.props.onCancel}>
                        Cancel
                    </Button>
                    </Modal.Footer>
            </Modal>
        );
    }
}

class ResumeItem extends React.Component {
    // @props: onChange: callback for when a resume item changes:
    //                 : Param: obj {id,title,job_profile_fk, profile_summary_fk}
    constructor(props){
        super(props);

        this.state = {
            id : props.id,
            title : props.title,
            job_profile_fk : props.job_profile_fk,
            profile_summary_fk : props.profile_summary_fk,
            jp_options : props.jp_options,
            ps_options : props.ps_options,
            show_delete_modal: false,
        }

        this.dispRef = React.createRef();
        this.formRef = React.createRef();
        
        this.onEdit = this.onEdit.bind(this);
        this.onSave = this.onSave.bind(this);
        this.onDeleteCancel = this.onDeleteCancel.bind(this);
        this.onDeleteConfirm = this.onDeleteConfirm.bind(this);

        this.prevState = null;
    }

    onDeleteCancel(){
        this.setState({show_delete_modal:false});
    }
    onDeleteConfirm(){
        this.setState({show_delete_modal:false});
        this.props.onDelete(this.state.id);
    }

    onEdit(){
        this.dispRef.current.style.display='None';
        this.formRef.current.style.display='';
        this.prevState = { 
            id : this.state.id ,
            title : this.state.title, 
            job_profile_fk : this.state.job_profile_fk,
            profile_summary_fk : this.state.profile_summary_fk        
        }
    }

    onSave(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';
        for(var key in this.prevState){
            if(this.state[key] !== this.prevState[key]){
                this.props.onChange({
                    id : this.state.id ,
                    title : this.state.title, 
                    job_profile_fk : this.state.job_profile_fk,
                    profile_summary_fk : this.state.profile_summary_fk
                });
                this.prevState = null;
                return;
            }
        }

    }

    componentDidMount(){
        this.formRef.current.style.display='None'; 
        this.dispRef.current.style.display='';
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
                        </div>
                    </div>
                </div>
                <div className="col-2 nopadding">
                    <div className="delete-button" onClick={()=>{this.setState({show_delete_modal:true})}}>
                        {delete_icon}
                    </div>

                    <ConfirmModal 
                        message="Deleting Resume" 
                        show={this.state.show_delete_modal} 
                        onCancel={this.onDeleteCancel} 
                        onConfirm={this.onDeleteConfirm}
                    />
                </div>
            </div>
        );
        var form = (
            <div className="row" ref={this.formRef}>
            <div className="col-10 nopadding text-wrap">
                <div className="section-content">
                    <div className="job-profile">
                        <div className="profile-name">
                            <span style={{width:"60%"}}>
                                <input placeholder="Resume title" 
                                        value={this.state.title} 
                                        onChange={(val)=>this.setState({title:val.target.value})}/>
                            </span> 
                            <span onClick={this.onSave}>{done_icon}</span>
                        </div>

                        <Form.Group>
                            <Form.Label>Job Profile</Form.Label>
                            <Form.Control size="sm" as="select" 
                                defaultValue={this.state.job_profile_fk === null ? "0" : this.state.job_profile_fk}
                                onChange={(e)=>{
                                    this.setState({job_profile_fk: e.target.value === "0" ? null : e.target.value});
                                }}>

                                <option value="0">None</option>
                                {
                                    this.state.jp_options.map(jp =>{
                                        return <option value={jp['id']}>{jp['profile']}</option>
                                    })
                                }        
                            </Form.Control>
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Profile Summary</Form.Label>
                            <Form.Control size="sm" as="select" 
                                defaultValue={this.state.profile_summary_fk === null ? "0" : this.state.profile_summary_fk} 
                                onChange={(e)=>{
                                    this.setState({profile_summary_fk: e.target.value === "0" ? null : e.target.value});
                                }}>
                                
                                <option value="0">None</option>
                                {
                                    this.state.ps_options.map((ps)=>{
                                        return <option value={ps['id']}>{ps.name}</option>
                                    })
                                }
                            </Form.Control>
                        </Form.Group>

                    </div>
                </div>
            </div>
        </div> 
        );
        return <div key={this.state.id}>{main}{form}</div>;
    }
}



class ResumeControl extends React.Component {
    // @props: onResumeSelect : callback when a resume is selected.
    //   callback param: obj {id , title, job_profile_fk, profile_summary_fk }
    constructor(props){
        super(props);

        this.state = {
            resumes : {
                // 1 : {title : "Resume 1", job_profile_fk: 2, profile_summary_fk:null}
            },
            selected_resume : 0 ,
            job_profile_options : [],
            profile_summary_options : []
        }

        this.onAdd = this.onAdd.bind(this);
        this.onUpdate = this.onUpdate.bind(this);
        this.onDelete = this.onDelete.bind(this);
        this.onSelect = this.onSelect.bind(this);
        this.onDownload = this.onDownload.bind(this);

        this.dbResume = new DBEndpoint('coreapi/resumes/');
        this.dbJobProfile = new DBEndpoint('coreapi/jobprofiles/');
        this.dbProfSum = new DBEndpoint('coreapi/summaries/');
    }

    onAdd(){
        var new_resume = {
            title : "New Resume"
        };
        
        this.dbResume.createOne(new_resume)
            .then(data =>{
                var _r = Object.assign({},this.state.resumes);
                _r[data['id']] = new_resume;
                this.setState({resumes:_r});
            });
    }

    onUpdate(obj){
        let id = obj['id'];
        let obj_copy = Object.assign({},obj);
        delete obj_copy['id'];
        var _r = Object.assign({},this.state.resumes);
        _r[id] = obj_copy;
        this.dbResume.updateOne(id,obj_copy)
            .then(()=>{
                this.setState({resumes:_r})
            });

    }

    onDelete(id){
        var _r = Object.assign({},this.state.resumes);
        delete _r[id];
        this.dbResume.deleteOne(id)
            .then(()=>{
                this.setState({resumes:_r});
            });

        if(id === this.state.selected_resume){
            this.setState({selected_resume:0});
            this.props.onResumeSelect(null);
        }
    }

    onSelect(id){
        this.setState({selected_resume:id});
        if(id != 0) {
            this.props.onResumeSelect({
                id : id,
                ...this.state.resumes[id]
            });
        }
        else {
            this.props.onResumeSelect(null)
        }
    }

    async loadData(){
        let jp_opt = [];
        let ps_opt = [];
        let _resumes = {};

        let data = await this.dbJobProfile.readAll();
        for(let i of data){
            jp_opt.push({id : i['id'], profile: i['profile']});
        }
        this.setState({job_profile_options:jp_opt});


        data = await this.dbProfSum.readAll();
        for(let i of data){
            ps_opt.push({id : i['id'], name: i['name']})
        }
        this.setState({profile_summary_options:ps_opt});


        data = await this.dbResume.readAll();
        for(let i of data){
            _resumes[i['id']] = {
                title : i['title'],
                job_profile_fk : i['job_profile_fk'],
                profile_summary_fk: i['profile_summary_fk']
            };
        }
        this.setState({resumes : _resumes});        


    }

    componentDidMount(){
        this.loadData();
    }

    onDownload(){
        if(this.state.selected_resume === 0)
            return

        new DBEndpoint('coreapi/rendered/').downloadPdf(this.state.selected_resume)
        .then(blob =>{
            const url = window.URL.createObjectURL( new Blob([blob]),);

            const link = document.createElement('a');
            let filename = this.state.resumes[this.state.selected_resume]['title'].replace(' ','')+".pdf";
            link.href = url;
            link.setAttribute('download',filename);
        
            // Append to html link element page
            document.body.appendChild(link);
        
            // Start download
            link.click();
        
            // Clean up and remove the link
            link.parentNode.removeChild(link);
        });
    }
    render(){
        var main = (
            <SectionBody heading="Resumes" onAdd={this.onAdd}>
            {
                Object.keys(this.state.resumes).map((id,index)=>{
                    return <ResumeItem 
                                key={id} 
                                id={id} 
                                onChange={this.onUpdate} 
                                onDelete={this.onDelete}
                                jp_options={this.state.job_profile_options}
                                ps_options={this.state.profile_summary_options}
                                {...this.state.resumes[id]} 
                            />
                })
            }
            
            <div id="resume-selector">
                <Form.Group>
                    <Form.Label>Select Resume</Form.Label>
                    <div className="row">
                        <div className="col-10">
                            <Form.Control size="sm" 
                                as="select"
                                defaultValue={this.state.selected_resume}
                                onChange={(e)=>{this.onSelect(e.target.value)}}
                            >

                                <option value="0">None</option>
                                {
                                     Object.keys(this.state.resumes).map((id,index)=>{
                                        return <option value={id}>{this.state.resumes[id].title}</option>
                                     })
                                }
                            </Form.Control>
                        </div>
                        <div className="col-2">
                            <span onClick={this.onDownload} className="download-button">{download}</span>
                        </div>
                    </div>
                </Form.Group>
            </div>

            </SectionBody>
        );

        return main;
    }
}


class EmptyComposer extends React.Component {
    render(){
        return (
            <div>
                <Jumbotron>
                    <h2>Resume composer is empty.</h2>
                    <p>Select a resume to edit it.</p>
                </Jumbotron>

            </div>

        )
    }
}

export default class ResumePage extends React.Component {
    // @props: onNav : function : takes 'history' or 'resumes'
    constructor(props){
        super(props);
        this.onResumeSelect = this.onResumeSelect.bind(this);
        this.state = {
            // {id , title, job_profile_fk, profile_summary_fk }
            selected_resume: null
        }
    }

    onResumeSelect(obj){
        this.setState({selected_resume:obj})
    }
    componentDidMount(){
        this.props.onNav('resumes');
    }

    render(){
        var main = (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-3 col-md-6">
                        <ResumeControl onResumeSelect={this.onResumeSelect}/>
                    </div>
                    <div className="col-lg-9 col-md-6">
                        <div id="resume-compose">

                            {this.state.selected_resume === null ? <EmptyComposer/> : <Composer key={this.state.selected_resume.id} resume={this.state.selected_resume}/>}
                        </div>
                    </div>
                </div>
            </div>
        )

        
        return main;
    }
}