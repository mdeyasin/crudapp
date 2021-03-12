import React from 'react'
class SignUpForm extends React.Component{
    render(){
        return(
            <article className="card-body">
                <h4 className="card-title mb-4 mt-1">Sign Up</h4>
                <p className={this.props.class}>{this.props.message ?? ""}</p>
                <form onSubmit={this.props.onSignUp}>
                    <div className="form-group">
                        <input name="email" onChange={this.props.onChangeInput}
                               value={this.props.loginInfo.email}
                               className="form-control"
                               placeholder="Email or login"
                               type="email"/>
                    </div>
                    <div className="form-group">
                        <input name="password" onChange={this.props.onChangeInput}
                               value={this.props.loginInfo.password}
                               className="form-control"
                               placeholder="******"
                               type="password"/>
                    </div>
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <button disabled={this.props.isEnabled ? "disabled" : ""} type="submit" className="btn btn-primary btn-block"> SignUp
                                </button>
                            </div>
                        </div>
                        <div className="col-md-6 text-right">
                            <a style={{cursor:"pointer"}} onClick={() => this.props.onNavigate("login")} className="small">Login</a>
                        </div>
                    </div>
                </form>
            </article>
        )
    }
};

export default SignUpForm;