import React from 'react';
import $ from 'jquery';
import {storageAvailable , isValidEmail} from '../util'

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import '../main.css';

export default class LoginPage extends React.Component {
    
    constructor(props){
        // @props: onLogin
        super(props);
        this.toggleSignup = this.toggleSignup.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleSignup = this.handleSignup.bind(this);

        this.state = {
            formError:""
        }
        this.baseApiUrl = "http://localhost:8000/";
    }

    toggleSignup() {
        $('#login-form form').animate({height: "toggle", opacity: "toggle"}, "slow");
        this.setState({formError:""});
    }

    handleLoginSuccessful(resp){
        if(resp.status === 404){
            this.setState({formError:"Invalid credentials"});
            return;
        }

        if(resp.status === 400){
            this.setState({formError:"Provide both email and password"});
            return;
        }
        
        if(!('token' in resp.data)){
            this.setState({formError:"Sorry, Something went wrong."});
            return;

        }

        window.localStorage.setItem("rb_access_token",resp.data.token);
        this.setState({formError:""});
        this.props.onLogin();

    }

    handleLoginFailure(){
        this.setState({formError:"Sorry, Something went wrong."});
    }

    handleLogin(e){
        e.preventDefault();

        if(!isValidEmail(e.target.email.value)){
            this.setState({formError:"Invalid Email"});
            return;
        }

        const requestOpts = {
            method  : "POST",
            headers : { 'Content-Type': 'application/json' },
            body    : JSON.stringify({ email: e.target.email.value, password: e.target.password.value })
        };
        

        fetch(this.baseApiUrl+'users/login/',requestOpts)
            .then(resp => resp.json()
                .then(body => ({data:body, status:resp.status})))                
            .then(data => this.handleLoginSuccessful(data), error => this.handleLoginFailure(error));
    }

    handleSignupSuccess(resp,e){
        console.log(e);
        if(resp.status === 406 ){
            this.setState({formError: resp.data.msg})
            return;
        }
        if(resp.status == 400){
            this.setState({formError:"Sorry, Something went wrong."});
            return;
        }

        this.handleLogin(e);
    }

    handleSignup(e){
        e.preventDefault();
        
        if(e.target.name.value === ""){
            this.setState({formError:"Please enter your full name."});
            return;
        }

        if(!isValidEmail(e.target.email.value)){
            this.setState({formError:"Please enter a valid email address."});
            return;
        }

        if(e.target.password.value === "" )
        {
            this.setState({formError:"Password cannot be empty"});
            return;
        }

        if(e.target.password2.value === "" )
        {
            this.setState({formError:"Confirm your password"});
            return;
        }

        if(e.target.password.value !== e.target.password2.value){
            this.setState({formError:"Passwords don't match."});
            return;
        }

        const requestOpts = {
            method  : "POST",
            headers : { 'Content-Type': 'application/json' },
            body    : JSON.stringify({ email: e.target.email.value, password: e.target.password.value, name: e.target.name.value})
        };

        this.setState({formError:""});

        fetch(this.baseApiUrl+'users/signup/',requestOpts)
            .then(resp => resp.json()
                .then(body => ({data:body, status:resp.status})))                
            .then(data => this.handleSignupSuccess(data,e), error => this.setState({formError:"Sorry, Something went wrong."}));

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
                <form className="register-form" onSubmit={this.handleSignup}>
                    <input type="text" name="name" placeholder="Name"/>
                    <input type="text" name="email" placeholder="Email address"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <input type="password" name="password2" placeholder="Confirm password"/>
                    <p className="error-msg">{this.state.formError}</p>
                    <button>Create</button>
                    <p className="message">Already registered? <a onClick={this.toggleSignup}>Sign In</a></p>
                </form>
                <form className="login-form" onSubmit={this.handleLogin}>
                    <input type="text" name="email" placeholder="Email"/>
                    <input type="password" name="password" placeholder="Password"/>
                    <p className="error-msg">{this.state.formError}</p>
                    <button type="submit" >Login</button>
                    <p className="message">Not registered? <a onClick={this.toggleSignup}>Create an account</a></p>
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
