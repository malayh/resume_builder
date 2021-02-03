import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './main.css';

import { Navbar,Nav,NavDropdown,Form,FormControl,Button} from 'react-bootstrap'

class Navigation extends React.Component {
    constructor(props){
        // props.active_nav should be one of ('history','resumes')
        super(props);
        this.state = {
            'active': props.active_nav
        }
        this.baseUrl = '/'
    }
    render(){
        const nav = (
            <Navbar id="main-nav" collapseOnSelect expand="lg" bg="dark" variant="dark">
                <Navbar.Brand>Resume builder</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <ul className="navbar-nav mr-auto">
                        <li className={'nav-item '+ (this.state.active==='history'?'active':'')}>
                            <a className="nav-link" href={this.baseUrl+'history/'}>History</a>
                        </li>
                        <li className={'nav-item '+ (this.state.active==='resumes'?'active':'')}>
                            <a className="nav-link" href={this.baseUrl+'resumes/'}>Resumes</a>
                        </li>
                    </ul>
                    <ul className="navbar-nav mr-sm-4">
                        <NavDropdown title="Account" id="collasible-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Logout</NavDropdown.Item>
                        </NavDropdown>
                    </ul>
                </Navbar.Collapse>
            </Navbar>
        );


        return nav;
    }
}

export default class ResumeBuilder extends React.Component {
    constructor(props){
        super(props);
    }

    render(){
        const main = (
            <div className='container-fluid'>
                <div className="row">
                    <Navigation active_nav='history'/>
                </div>
            </div>
        );
        return main;
    }
}