import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './login.css'

class Login extends Component {
   render() {
      return (
         <div className="container login">
            <div className="row align-items-center justify-content-center text-center login-head">
                <div className="col">
                    <span className="login-title">SWOT</span>
                    <span className="login-sub-title">Analysis</span>
                </div>
            </div>
            <div className="row justify-content-center text-center login-form mt-5">
                <div className="col">
                    <form action="">
                        <div className="form-group">
                            <input type="text" placeholder="Username" required/>
                        </div>
                        <div className="form-group">
                            <input type="password" placeholder="Password" required/>
                        </div>
                        <button type="submit">LOG IN</button>
                    </form>
                    <a href="#">SIGN UP</a>
                </div>
            </div>
         </div>
      );
   }
}
export default Login;