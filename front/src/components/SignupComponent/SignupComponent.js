import React from 'react';
import './SignupComponent.css';
import { connect } from 'react-redux';
import { changeInput, validate, validateProfileEnter } from '../../redux/actions/user';
import LoginHeader from '../LoginHeader';

function Signup(props) {
    const spinner = props.user.signup.isLoading === false 
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
                                src="http://localhost:5000/c8fy07xskebasygz159844150976312.jpg" 
                                className="brand_logo" 
                                alt="Logo"/>
                        </div>
                    </div>
                    <p className="text-danger signuperr">{props.user.signup.error}</p>
                    <div className="d-flex justify-content-center form_container">
                        <form>
                            <div className="input-group mb-2">
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
                                    value={props.user.signup.login} 
                                    onChange={(e) => props.dispatch(changeInput('login', e.target.value))} 
                                    onKeyPress={(e) => props.dispatch(validateProfileEnter(props.history, e, props.user.signup))}
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
                                    name="" className="form-control input_pass" 
                                    placeholder="password"
                                    value={props.user.signup.password} 
                                    onChange={(e) => props.dispatch(changeInput('password', e.target.value))} 
                                    onKeyPress={(e) => props.dispatch(validateProfileEnter(props.history, e, props.user.signup))}
                                />
                            </div>
                            <div className="form-group">
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <input  
                                        type="text" 
                                        name="" 
                                        className="form-control input_user"
                                        placeholder="name" 
                                        value={props.user.signup.name} 
                                        onChange={(e) => props.dispatch(changeInput('name', e.target.value))} 
                                        onKeyPress={(e) => props.dispatch(validateProfileEnter(props.history, e, props.user.signup))}
                                    />
                                </div>
                                <div className="input-group mb-2">
                                    <div className="input-group-append">
                                        <span className="input-group-text">
                                            <i className="fa fa-user" aria-hidden="true"></i>
                                        </span>
                                    </div>
                                    <input  
                                        type="text" 
                                        name="" 
                                        className="form-control input_user"
                                        placeholder="surname" 
                                        value={props.user.signup.surname} 
                                        onChange={(e) => props.dispatch(changeInput('surname', e.target.value))} 
                                        onKeyPress={(e) => props.dispatch(validateProfileEnter(props.history, e, props.user.signup))}
                                    />
                                </div>
                            
                                </div>
                                <div className="d-flex justify-content-center mt-3 login_container">
                                <button 
                                    type="button" 
                                    name="button" 
                                    className="btn login_btn" 
                                    onClick={() => props.dispatch(validate(props.history, props.user.signup))}
                                >   SignUp
                                    {/* {spinner} */}
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="mt-3">
                        <div className="d-flex justify-content-center links">
                            Don't have an account? <a href="#" className="ml-2">Sign Up</a>
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

export default connect(r => r) (Signup);