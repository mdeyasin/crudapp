import React from 'react'
class SignInForm extends React.Component{
    render(){
        return(
            <article className="card-body">
                <h4 className="card-title mb-4">Sign in</h4>
                <p className={this.props.class}>{this.props.message ?? ""}</p>
                <form onSubmit={this.props.onSignIn}>
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
                            <button disabled={this.props.isEnabled ? "disabled" : ""} type="submit" className="btn btn-primary btn-block">SignIn</button>
                        </div>
                    </div>
                </form>
                <div className="row">
                    <div className="col-md-6">
                        <a style={{cursor: "pointer", marginTop:5+"px"}} onClick={() => this.props.onExternalLogin("google")} className="btn btn-danger btn-block">Sign in with Google</a>
                    </div>
                    <div className="col-md-6 text-right">
                        <a style={{cursor: "pointer"}} onClick={() => this.props.onNavigate("")} className="text-info">Create
                            a new account?</a>
                    </div>
                </div>
            </article>
        )
    }
};

export default SignInForm;