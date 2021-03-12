import React from 'react';
import _ from 'lodash';
import './App.css';

import Products from './Components/Products/Product';
import Home from './Components/Home/Home';

import AuthManager from "./Service/Auth";

class App extends React.Component{

    constructor(props){
        super(props);

        this.state  ={
            user:null
        }
    }

    componentDidMount = () => {
        this.listener = AuthManager.onAuthStateChanged((userAuth) => {
            if(!_.isEmpty(userAuth)) {
                this.setState({ user:userAuth});
            }else {
                this.setState({ user:null});
            }

        });
    };

    componentWillUnmount() {
        this.listener();
    }

    render() {
        return (
            <div className="App">
                { ! _.isEmpty(this.state.user) ? <Products/> : <Home />}
            </div>
        );
    }
}
export default App;
