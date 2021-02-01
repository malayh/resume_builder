import React from 'react';
import $ from 'jquery';

import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';

export default class LoginPage extends React.Component {
    constructor(props){
        super(props);
        this.toggle_signup = this.toggle_signup.bind(this);
    }

    toggle_signup() {
        $('#login-form form').animate({height: "toggle", opacity: "toggle"}, "slow");
    }

    render(){
        const content = (
            <div id="login-content">
                <div className="container-fluid">
                    <div className="row">
                        <div>Resume Builder</div>
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
                    <button>Create</button>
                    <p className="message">Already registered? <a href="#" onClick={this.toggle_signup}>Sign In</a></p>
                </form>
                <form className="login-form">
                    <input type="text" placeholder="Email"/>
                    <input type="password" placeholder="Password"/>
                    <button>Login</button>
                    <p className="message">Not registered? <a href="#" onClick={this.toggle_signup}>Create an account</a></p>
                </form>
                </div>
            </div>
        );

        const loginpage = (
            <div className="container-fluid">
                <div className="row">
                    <div className="col-lg-7 col-md-6 nopadding">
                        {content}
                    </div>
                    <div className="col-lg-5 col-md-6 nopadding">
                        {login_singup}
                    </div>
                </div>
            </div>
        );

        return loginpage;
    }    
}