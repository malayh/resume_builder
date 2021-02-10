import React from 'react';
import { Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import LoginPage from './login/Login';
import ResumePage from './resumes/ResumePage';
import HistoryPage from './add-history/HistoryPage';
import storageAvailable from './util'

import {Link, BrowserRouter as Router,Route, Switch, Redirect, useHistory} from 'react-router-dom';

class Navigation extends React.Component {
    constructor(props){
        // @props: active_nav should be one of ('history','resumes')
        // @props: onLogout : function: to be called when logout is clicked.
        // @props: historyPath : path to history page
        // @props: resumesPath : path to resumes page

        super(props);
    }
    render(){
        const nav = (
            <Navbar id="main-nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Resume builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <ul className="navbar-nav mr-auto">
                        
                        <li className={'nav-item '+ (this.props.active_nav==='history'?'active':'')}>
                            <Link   to={this.props.historyPath} 
                                    className="nav-link">History
                            </Link>
                        </li>
                        <li className={'nav-item '+ (this.props.active_nav==='resumes'?'active':'')}>
                            <Link   to={this.props.resumesPath} 
                                    className="nav-link">Resumes
                            </Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav mr-sm-4">
                        <NavDropdown title="Account" id="collasible-nav-dropdown">
                            <NavDropdown.Item onClick={this.props.onLogout}>Logout</NavDropdown.Item>
                        </NavDropdown>
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        );


        return nav;
    }
}

function LoginPageRoute(props){
    // @props: onLogin : Is ResumeBuilder.handleLogin method
    return <Route 
            {...props}
            // WHY THE FUCK does this work?
            // Copied from https://stackoverflow.com/questions/31079081/programmatically-navigate-using-react-router
            // I hate JS!
            render = {({history})=>{
                return <LoginPage onLogin={()=>{
                    if(history.location.state !=null)
                        props.onLogin(history,history.location.state.referrer);
                }}/>
            }}/>
}



export default class ResumeBuilder extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            active_nav  :'history',
            loggedIn    : false
        }
        this.handleNav = this.handleNav.bind(this);
        this.handleLogout = this.handleLogout.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        if(!storageAvailable('localStorage')){
            // Panic! Return.
            return;
        }

        this.basePath = '/';
        
        this.loginPath = this.basePath + 'login/';
        this.historyPath = this.basePath + 'history/';
        this.resumesPath = this.basePath + 'resumes/'

    }
    componentDidMount(){
        // TODO: Need to varify if the token is valid or not.
        if(window.localStorage.getItem('rb_access_token') !== null){
            this.setState({loggedIn:true});
        }
    }

    handleNav(curNav){
        this.setState({active_nav:curNav});
    }
    handleLogout(){
        this.setState({loggedIn:false});
        window.localStorage.clear();
    }
    handleLogin(history,previous_path){
        // @param: history : Router.history object
        // @param: previous_path : Refering path string
        if(history != null && previous_path != null){
            history.push(previous_path);
        }

        this.setState({loggedIn:true});
    }

    render(){      

        const main = (
            <Router>
                {/* When you type in the resume link without login and then login, it will not redirect to resume, it will redirect to home 
                    because of the following Route. Idk how to solve this. So I am not doing this.
                */}

                <Route path={this.loginPath}>
                    {this.state.loggedIn ? <Redirect to={this.basePath} /> : <LoginPageRoute onLogin={this.handleLogin} path={this.loginPath} />}
                </Route>

                <div className='container-fluid'>
                    <div className="row">
                    {
                        // Don't display the nav bar if not logged in
                        this.state.loggedIn ? 
                            <Navigation 
                                active_nav={this.state.active_nav}
                                onLogout={this.handleLogout}
                                resumesPath={this.resumesPath}
                                historyPath={this.historyPath}
                            /> : <div/> 
                    }
                    </div>
                    <div className="row">
                        <Switch>
                            <Route path={this.historyPath}>
                            { 
                                this.state.loggedIn ? 
                                    <HistoryPage onNav={this.handleNav}/> : 
                                    <Redirect to={{pathname : this.loginPath ,state : { referrer : this.historyPath } }}/> 
                            }    
                            </Route>
                            <Route path={this.resumesPath}>
                            {
                                this.state.loggedIn ? 
                                    <ResumePage onNav={this.handleNav}/> : 
                                    <Redirect to={{ pathname : this.loginPath, state : { referrer :this.resumesPath } }}/> 
                            }
                            </Route>
                            {/* Change the following route back to history page */}
                            <Redirect exact from={this.basePath} to={this.resumesPath} /> 
                        </Switch>
                    </div>
                </div>
            </Router>
        );
        return main;
    }
}