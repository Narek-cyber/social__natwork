import React from 'react';
import './LoginComponent.css';
import { connect } from 'react-redux';
import { changeInputLogin, validateLogin, validateLoginEnter } from '../../redux/actions/user';
import LoginHeader from '../LoginHeader';

function Login(props) {
    const spinner = props.user.signin.isLoading === false 
        ? 
            <span></span>
        : 
            <span   
                className="spinner-border spinner-border-sm" 
                role="status" 
                aria-hidden="true">
            </span>

    return (
        <div>
            <LoginHeader />
            <div className="d-flex justify-content-center h-100">
                <div className="user_card">
                    <div className="d-flex justify-content-center">
                        <div className="brand_logo_container">
                            <img 
                                src="http://localhost:5000/c8fy07xskebap7s2159844133520211.png" 
                                className="brand_logo" 
                                alt="Logo" 
                            />
                        </div>
                    </div>
                    <p className="text-danger loginerr">{props.user.signin.error}</p>
                    <div className="d-flex justify-content-center form_container">
                        <form>
                            <div className="input-group mb-3">
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="fa fa-user" aria-hidden="true"></i>
                                    </span>
                                </div>
                                <input  
                                    type="text" 
                                    name="" 
                                    className="form-control input_user" 
                                    placeholder="login" 
                                    value={props.user.signin.login} 
                                    onChange={(e) => props.dispatch(changeInputLogin('login', e.target.value))} 
                                    onKeyPress={(e) => props.dispatch(validateLoginEnter(props.history, e, props.user.signin))}
                                    autoFocus
                                />
                            </div>
                            <div className="input-group mb-2">
                                <div className="input-group-append">
                                    <span className="input-group-text">
                                        <i className="fa fa-lock"></i>
                                    </span>
                                </div>
                                <input  
                                    type="password" 
                                    name="" 
                                    className="form-control input_pass" 
                                    placeholder="password"
                                    value={props.user.signin.password} 
                                    onChange={(e) => props.dispatch(changeInputLogin('password', e.target.value))}   
                                    onKeyPress={(e) => props.dispatch(validateLoginEnter(props.history, e, props.user.signin))}
                                />
                            </div>
                            <div className="form-group">
                            
                            </div>
                            <div className="d-flex justify-content-center mt-3 login_container">
                                <button 
                                    type="button" 
                                    name="button" 
                                    className="btn login_btn" 
                                    onClick={() => props.dispatch(validateLogin(props.history, props.user.signin ))}
                                >   Login 
                                    {/* {spinner} */}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-4">
                        <div className="d-flex justify-content-center links">
                            Don't have an account? <a href="http://localhost:3000/signup" className="ml-2">Sign Up</a>
                        </div>
                        <div className="d-flex justify-content-center links">
                            <a href="#">Forgot your password?</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(r => r) (Login);