import React from 'react';
import $ from 'jquery';
import {storageAvailable} from '../util'

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

export default class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.toggleSignup = this.toggleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);

        this.state = {
            formError:""
        }

        this.loginUrl = "http://localhost:8000/users/login/";
    }


    toggleSignup() {
        $('#login-form form').animate({height: "toggle", opacity: "toggle"}, "slow");
        this.setState({formError:""});
    }

    validateEmail(email) {
        if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
            return true;
        return false;
    }

    handleLoginSuccessful(data,status){
        if(status == 404){
            this.setState({formError:"Invalid Credentials."});
            return;
        }
        else if (status == 400){
            this.setState({formError:"Please provide both email and password."});
            return;
        }
    
        console.log(data.token);
    }
    handleLoginFailure(){
        this.setState({formError:"Sorry, Something went wrong."});
    }

    handleLogin(e){
        e.preventDefault();

        if(!this.validateEmail(e.target.email.value)){
            this.setState({formError:"Invalid Email"});
            return;
        }

        const requestOpts = {
            method  : "POST",
            headers : { 'Content-Type': 'application/json' },
            body    : JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
        };
        
        // fetch(this.loginUrl,requestOpts)
        //     .then(response => response.json())
        //     .then(data => this.handleLoginSuccessful(data), error => this.handleLoginFailure(error));

        fetch(this.loginUrl,requestOpts)
            .then((response) => { return { data : response.json(), status: response.status}; })
            .then((resp) => {this.handleLoginSuccessful(resp.data,resp.status)}, error => this.handleLoginFailure());

    }

    render(){
        const content = (
            <div id="login-content">
                <div className="container-fluid">
                    <div className="row">
                    </div>
                </div>                
            </div>
        );

        const login_singup = (
            <div id="login-page">
                <div id="login-form">
                <form className="register-form">
                    <input type="text" placeholder="Name"/>
                    <input type="text" placeholder="Email address"/>
                    <input type="password" placeholder="Password"/>
                    <input type="password" placeholder="Confirm password"/>
                    <p className="error-msg">{this.state.formError}</p>
                    <button>Create</button>
                    <p className="message">Already registered? <a href="#" onClick={this.toggleSignup}>Sign In</a></p>
                </form>
                <form className="login-form" onSubmit={this.handleLogin}>
                    <input type="text" name="email" placeholder="Email"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <p className="error-msg">{this.state.formError}</p>
                    <button type="submit" >Login</button>
                    <p className="message">Not registered? <a href="#" onClick={this.toggleSignup}>Create an account</a></p>
                </form>
                </div>
            </div>
        );

        const loginpage = (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-5 col-md-6 nopadding">
                        <h1 id="app_name">Resume Builder</h1>
                        {login_singup}
                    </div>
                    <div className="col-lg-7 col-md-6 nopadding">
                        {content}
                    </div>
                </div>
            </div>
        );

        return loginpage;
    }    
}
