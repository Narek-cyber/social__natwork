import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import './SettingsComponent.css';
import { 
    changeInputSettingsLogin, 
    changeInputSettingsPassword, 
    loginChange, 
    GetProfile, 
    passwordChange, 
    upload, 
    changeInputSettingsLoginEnter,
    changeInputSettingsPassEnter 
} from '../../redux/actions/user';
import ProfileHeader from '../ProfileHeader';



function Settings(props) {
    useEffect(() => {
        // props.dispatch(GetProfile(props.history));
        return () => {
            props.dispatch({type: 'resetSettings'});
        }
    }, []);
    
    const button =  props.user.settings.savePhoto.isLoading === false
        ?      
            <span></span>
        :   
            <span   
                className="spinner-border spinner-border-sm" 
                role="status" 
                aria-hidden="true"
            >
            </span>

    const button1 = props.user.settings.loginChange.isLoading === false
        ?           
            <span></span>
        :
            <span   
                className="spinner-border spinner-border-sm" 
                role="status" 
                aria-hidden="true"
            >
            </span>

    const button2 = props.user.settings.passwordChange.isLoading === false
        ?  
            <span></span>
        :
            <span   
                className="spinner-border spinner-border-sm" 
                role="status" 
                aria-hidden="true"
            >
            </span>


    const [file, setFile] = useState(null);
        
    const fileHandler = (e) => {
        setFile(e.target.files[0]);
    }

    // const onFileUpload = event => {
    //     var reader = new FileReader();
    //     reader.readAsDataURL(event.target.files[0]);
    //     reader.onload = function (e) {
    //         setFile(e.target.result);
    //         // console.log(e.target.result);
    //     };
    // }
    // console.log(file)

    return (
        <div className="container uiui">
           <ProfileHeader router={props.history} />
           <form 
                id="myform" 
                method="post" 
                encType="multipart/form-data" 
                className="p form-group">
                <input 
                    type="file" 
                    name="nkar" 
                    onChange={fileHandler} 
                />

                {/* <input type="file" name="nkar" onChange={onFileUpload} />  */}
                {/* {file && (<img src={file} alt="" className="imagePreview" />)} */}
                
                <button 
                    type="button"
                    className="btn btn-success btn-sm d-block mt-3" 
                    onClick={() => props.dispatch(upload())}
                >   {button}
                    SAVE PHOTO
                </button>
            </form>
            {file && (<img src={URL.createObjectURL(file)} alt={file.name} className="imagePreview" />)}
            <div className="d-flex justify-content-center">
                <div className="row">
                    <div className="col-md-6">
                        <div className="user_card user__card">
                            <div className="d-flex justify-content-center">
                                <div className="brand_logo_container">
                                    <img src="data:image/png;base64,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" className="brand_logo" alt="Logo" />
                                </div>
                            </div>
                            <p className="text-danger loginerr1">{props.user.settings.loginChange.error}</p>
                            <div className="d-flex justify-content-center form_container">
                                <form>
                                    <h3 className="mb-4">Please Change Your Login</h3>
                                    <div className="input-group mb-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fa fa-lock"></i>
                                            </span>
                                        </div>
                                        <input  
                                            type="password" 
                                            name="" className="form-control input_pass" 
                                            placeholder="Password"
                                            value={props.user.settings.loginChange.password} 
                                            onChange={(e) => props.dispatch(changeInputSettingsLogin('password', e.target.value))} 
                                            onKeyPress={(e) => props.dispatch(changeInputSettingsLoginEnter(props.history, e, props.user.settings.loginChange))}
                                        />
                                    </div>
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
                                            placeholder="New Login"
                                            value={props.user.settings.loginChange.login} 
                                            onChange={(e) => props.dispatch(changeInputSettingsLogin('login', e.target.value))} 
                                            onKeyPress={(e) => props.dispatch(changeInputSettingsLoginEnter(props.history, e, props.user.settings.loginChange))}
                                        />
                                    </div>
                                    
                                    <div className="d-flex justify-content-center mt-3 login_container">
                                        <button 
                                            type="button" 
                                            name="button" 
                                            className="btn login_btn" 
                                            onClick={() => props.dispatch(loginChange(props.history, props.user.settings.loginChange))}
                                            // disabled={!props.user.settings.loginChange.password}
                                            disabled={
                                                (
                                                        props.user.settings.loginChange.login === '' 
                                                    || 
                                                        props.user.settings.loginChange.password === ''
                                                ) 
                                                    ? 
                                                        true 
                                                    : 
                                                        false
                                            }
                                        >   {button1}
                                            Change
                                        </button>
                                   </div>
                                </form>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="user_card user__card">
                            <div className="d-flex justify-content-center">
                                <div className="brand_logo_container">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcST0hg3pfqFzL9y6oW98m68QLzibeA-VEfk6g&usqp=CAU" className="brand_logo" alt="Logo" />
                                </div>
                            </div>
                            <p className="text-danger loginerr2">{props.user.settings.passwordChange.error}</p>
                            <div className="d-flex justify-content-center form_container">
                                <form>
                                    <h3 className="mb-4">Please Change Password</h3>

                                    <div className="input-group mb-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fa fa-lock"></i>
                                            </span>
                                        </div>
                                        <input  
                                            type="password" 
                                            name="" 
                                            className="form-control input_pass" 
                                            placeholder="Password"
                                            value={props.user.settings.passwordChange.oldPassword} 
                                            onChange={(e) => props.dispatch(changeInputSettingsPassword('oldPassword', e.target.value))} 
                                            onKeyPress={(e) => props.dispatch(changeInputSettingsPassEnter(props.history, e, props.user.settings.passwordChange))}
                                        />
                                    </div>
                                    <div className="input-group mb-3">
                                        <div className="input-group-append">
                                            <span className="input-group-text">
                                                <i className="fa fa-lock"></i>
                                            </span>
                                        </div>
                                        <input  
                                            type="password" 
                                            name="" 
                                            className="form-control input_pass" 
                                            placeholder="New Password" 
                                            value={props.user.settings.passwordChange.newPassword} 
                                            onChange={(e) => props.dispatch(changeInputSettingsPassword('newPassword', e.target.value))} 
                                            onKeyPress={(e) => props.dispatch(changeInputSettingsPassEnter(props.history, e, props.user.settings.passwordChange))}
                                        />
                                    </div>
                                    
                                    <div className="d-flex justify-content-center mt-3 login_container">
                                        <button 
                                            type="button" 
                                            name="button" 
                                            className="btn login_btn" 
                                            onClick={() => props.dispatch(passwordChange(props.history, props.user.settings.passwordChange))}
                                            // disabled={!props.user.settings.passwordChange.oldPassword}
                                            disabled={
                                                (
                                                        props.user.settings.passwordChange.oldPassword === '' 
                                                    || 
                                                        props.user.settings.passwordChange.newPassword === '' 
                                                ) 
                                                    ? 
                                                        true 
                                                    : 
                                                        false
                                            }
                                        >   {button2}
                                            Change
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(r => r) (Settings);