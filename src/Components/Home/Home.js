import React from 'react';
import _ from 'lodash';
import AuthManager from '../../Service/Auth';
import Validator from '../../Libs/Validator';
import SignInForm from "../Common/SignInForm";
import SignUpForm from "../Common/SignUpForm";

export default class Home extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            loginInfo:{ email:"", password:""},
            isLogin: false,
            path:"login",
            message:"",
            user:null,
            class:'text-danger',
            isEnabled: false
        };

        this.onSignIn = this.onSignIn.bind(this);
        this.onSignUp = this.onSignUp.bind(this);
        this.onNavigate = this.onNavigate.bind(this);
        this.onChangeInput = this.onChangeInput.bind(this);
        this.onExternalLogin = this.onExternalLogin.bind(this);
    }

    onChangeInput(event){
        let keyName = event.target.name;
        let keyValue = event.target.value;
        let updateInfo = Object.assign({}, this.state.loginInfo);
        updateInfo[keyName] = keyValue;
        console.log(updateInfo);
        this.setState({loginInfo: updateInfo});
    }

    onSignIn(event){
        event.preventDefault();
        this.setState({message:"Login....", class:"text-success",  isEnabled:true});
        let {email, password} = this.state.loginInfo;

        if(!!Validator.isValidateEmail(email) || !!Validator.isValidatePassword(password)){
            this.setState({message:"Email Or Password invalid", class:"text-danger", isEnabled:false});
            return;
        }
        this.setState({isEnabled:true});

        AuthManager
            .signIn(email, password)
            .then((userCredential) => {
                // Signed in
               const user = userCredential.user;
               if(! _.isEmpty(user)) {
                   this.setState({message: "Success Login", isLogin: true, class: "text-success", isEnabled:false});
               }

            })
            .catch((error) => {
                this.setState({message:error.message, class:"text-danger",isEnabled:false});
            });

    }

    onExternalLogin(provider){
        if (provider === "google") {
            AuthManager
                .signInWihGoogle()
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;
                    if(! _.isEmpty(user)) {
                        this.setState({message: "Success Login", isLogin: true, class: "text-success"});
                    }

                })
                .catch((error) => {
                    this.setState({message:error.message, class:"text-danger"});
                });
        } else {
            this.setState({message:"Provider is missing", class:"text-danger"});
        }

    }
    onSignUp(event){
        event.preventDefault();
        this.setState({message:"Connecting....", class:"text-success", isEnabled:true});
        let {email, password} = this.state.loginInfo;

        if(!!Validator.isValidateEmail(email)){
            this.setState({message:"Email Or Password invalid", class:"text-danger", isEnabled:false});
            return;
        }

        if(!!Validator.isValidatePassword(password)){
            this.setState({message:"Password alpha and num required and min 7 and max 15", class:"text-danger", isEnabled:false});
            return;
        }

        AuthManager
            .signUp(email, password)
            .then((userCredential) => {
                //const user = userCredential.user;
                console.log(userCredential);
                this.setState({ class:"text-success", message:"Registered SuccessFully", isEnabled:false});
                this.onNavigate("login");
            })
            .catch((error) => {
                console.log(error);
                this.setState({message:error.message, class:"text-danger", isEnabled:false});
            });
    }


    onNavigate(path){
        this.setState({message:"", isEnabled:false});
        this.setState({path:path});
    }

     _renderSignInForm(){
        return (
            <SignInForm
                onNavigate={this.onNavigate}
                onSignIn={this.onSignIn}
                onChangeInput={this.onChangeInput}
                onExternalLogin={this.onExternalLogin}
                {...this.state}
            />
        );
    }


    _renderSignUpForm(){
        return (
            <SignUpForm
                onNavigate={this.onNavigate}
                onSignUp={this.onSignUp}
                onChangeInput={this.onChangeInput}
                {...this.state}
            />
        );
    }

    _buildForm(){
        if(this.state.path === "login")
            return this._renderSignInForm();
        else
            return  this._renderSignUpForm();
    }

    /**
     * render dom
     *
     * @returns {Component}
     */
    render() {
        return (
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card" style={{marginTop:100 + "px"}}>
                            {this._buildForm()}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}