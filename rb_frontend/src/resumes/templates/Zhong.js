import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

import './resume_base.css';
import './Zhong.css';

import {DBEndpoint} from '../../common/DB';
import {add_icon} from '../../common/Icons'
var icons = {
    mail_icon : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-envelope-fill" viewBox="0 0 16 16">
            <path d="M.05 3.555A2 2 0 0 1 2 2h12a2 2 0 0 1 1.95 1.555L8 8.414.05 3.555zM0 4.697v7.104l5.803-3.558L0 4.697zM6.761 8.83l-6.57 4.027A2 2 0 0 0 2 14h12a2 2 0 0 0 1.808-1.144l-6.57-4.027L8 9.586l-1.239-.757zm3.436-.586L16 11.801V4.697l-5.803 3.546z"/>
        </svg>),
    glob_icon : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-globe" viewBox="0 0 16 16">
            <path d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm7.5-6.923c-.67.204-1.335.82-1.887 1.855A7.97 7.97 0 0 0 5.145 4H7.5V1.077zM4.09 4a9.267 9.267 0 0 1 .64-1.539 6.7 6.7 0 0 1 .597-.933A7.025 7.025 0 0 0 2.255 4H4.09zm-.582 3.5c.03-.877.138-1.718.312-2.5H1.674a6.958 6.958 0 0 0-.656 2.5h2.49zM4.847 5a12.5 12.5 0 0 0-.338 2.5H7.5V5H4.847zM8.5 5v2.5h2.99a12.495 12.495 0 0 0-.337-2.5H8.5zM4.51 8.5a12.5 12.5 0 0 0 .337 2.5H7.5V8.5H4.51zm3.99 0V11h2.653c.187-.765.306-1.608.338-2.5H8.5zM5.145 12c.138.386.295.744.468 1.068.552 1.035 1.218 1.65 1.887 1.855V12H5.145zm.182 2.472a6.696 6.696 0 0 1-.597-.933A9.268 9.268 0 0 1 4.09 12H2.255a7.024 7.024 0 0 0 3.072 2.472zM3.82 11a13.652 13.652 0 0 1-.312-2.5h-2.49c.062.89.291 1.733.656 2.5H3.82zm6.853 3.472A7.024 7.024 0 0 0 13.745 12H11.91a9.27 9.27 0 0 1-.64 1.539 6.688 6.688 0 0 1-.597.933zM8.5 12v2.923c.67-.204 1.335-.82 1.887-1.855.173-.324.33-.682.468-1.068H8.5zm3.68-1h2.146c.365-.767.594-1.61.656-2.5h-2.49a13.65 13.65 0 0 1-.312 2.5zm2.802-3.5a6.959 6.959 0 0 0-.656-2.5H12.18c.174.782.282 1.623.312 2.5h2.49zM11.27 2.461c.247.464.462.98.64 1.539h1.835a7.024 7.024 0 0 0-3.072-2.472c.218.284.418.598.597.933zM10.855 4a7.966 7.966 0 0 0-.468-1.068C9.835 1.897 9.17 1.282 8.5 1.077V4h2.355z"/>
        </svg>
    ),
    linkdin : (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-linkedin" viewBox="0 0 16 16">
            <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
        </svg>
    ),
    github: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-github" viewBox="0 0 16 16">
            <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.012 8.012 0 0 0 16 8c0-4.42-3.58-8-8-8z"/>
        </svg>
    ),
    phone: (
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-telephone-fill" viewBox="0 0 16 16">
            <path fill-rule="evenodd" d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
        </svg>
    )
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


class MainSubsection extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            id : props.id,
            resume_fk : props.resume_fk,
            title : props.title,
            position : props.position
        }
    }

    render(){
        return (
            <div className="resume-sub-section">
                {this.state.title && <div className="heading">{this.state.title}</div>}
                <div className="labelled-desc">
                {add_icon}
                </div>
            </div>
        );
    }
}

class SidebarSubsection extends React.Component {
    render(){
        return (
            <div className="resume-sub-section">
                Sidebar
            </div>
        )
    }
}
export class Composer extends React.Component{
    // @prop : resume : resume object : {id , title, job_profile_fk, profile_summary_fk }
    constructor(props){
        super(props);
        this.state = {
            resume: this.props.resume,
            user_name : null,
            profile : null,
            summary: null,
            sidebar_subsec : [],
            main_subsec : []
        }
        this.max_main_subsec_pos = 1;
        this.max_sidebar_subsec = 101;

        this.dbSubSec = new DBEndpoint('coreapi/resumes/subsecs/');
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
        

        this.dbSubSec.addFilter({resume_fk:this.state.resume.id}).readAll()
        .then(data => {
            data.sort((a,b) => (a.position > b.position ? 1 : -1));
            let _main_subsec = [];
            let _side_subsec = [];
            for(let i of data){
                if(i['position'] < 100){
                    _main_subsec.push(i);
                    if(i['position'] > this.max_main_subsec_pos)
                        this.max_main_subsec_pos = i['position'];
                }
                else {
                    _side_subsec.push(i);
                    if(i['position'] > this.max_sidebar_subsec)
                        this.max_sidebar_subsec = i['postition'];
                }
            }

            this.setState({sidebar_subsec: _side_subsec});
            this.setState({main_subsec : _main_subsec});
        });

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
                                    return <MainSubsection key={subsec.id} {...subsec} />
                                })
                            }
                            <div className="resume-sub-section">
                                <span className="add-button">{add_icon}</span>
                            </div>
                            
                        </div>
                        <div className="col-lg-4 nopadding" id="sidebar-section">
                            {
                                this.state.sidebar_subsec.map(subsec =>{
                                    return <SidebarSubsection key={subsec.id} {...subsec} />
                                })
                            }
                            <div className="resume-sub-section">
                                <span className="add-button">{add_icon}</span> 
                            </div>                       
                        </div>
                    </div>
                </div>
            </div>
        );

        return main;
    }
}