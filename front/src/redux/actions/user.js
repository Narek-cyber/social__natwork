import axios from 'axios';

export function GetProfile(router, anotherAction = null) {
    return function (dispatch) {
        let token = sessionStorage.currentUser;

        axios.post('http://localhost:5000/profile', { token })
            .then(r => {
                if ("user" in r.data) {
                    sessionStorage.currentUser = r.data.token;

                    dispatch(updateProfile(r.data.user));

                    if (anotherAction) {
                        dispatch(anotherAction());
                    }

                } else if ("error" in r.data) {
                    router.push("/login")
                    dispatch(showError(r.data.error));
                }
            })
    }
}

export function updateProfile(user) {
    return {
        type: "updateProfile",
        user
    }
}

export function showError(text) {
    return {
        type: "showError",
        text
    }
}
export function showError1(text) {
    return {
        type: "showError1",
        text
    }
}
export function showError2(text) {
    return {
        type: "showError2",
        text
    }
}

export function showError3(text) {
    return {
        type: "showError3",
        text
    }
}

export function showSuccess() {
    return {
        type: 'showSuccess'
    }
}

export function showSuccess1() {
    return {
        type: 'showSuccess1'
    }
}

export function showSuccess2() {
    return {
        type: 'showSuccess2'
    }
}

export function showSuccess3() {
    return {
        type: 'showSuccess3'
    }
}

export function savePhoto() {
    return {
        type: 'savePhoto'
    }
}

export function validateLogin(props, data) {
    return function (dispatch) {
        dispatch({type: 'loadLogin'});
        if (data.login === '') {
            dispatch(showError("Խնդրում ենք լրացնել login դաշտը"))
        }

        else if (data.password === '') {
            dispatch(showError("Խնդրում ենք լրացնել password դաշտը"))
        }

        else {
            axios.post('http://localhost:5000/login', data)
                .then(r => {
                    if ("success" in r.data) {
                        sessionStorage.currentUser = r.data.token;
                        props.push("/profile");
                        dispatch(showError(""));
                        dispatch(showSuccess());
                    } 

                    else if ("successadmin" in r.data) {
                        sessionStorage.currentUser = r.data.token;
                        props.push("/admin/dashboard");
                        dispatch(showError(""));
                        dispatch(showSuccess());
                    }
                                    
                    else if ("error" in r.data) {
                        dispatch(showError(r.data.error));
                    }
                })
        }
    }
}

export function validateLoginEnter(props, e, data) {
    return function (dispatch) {
        if (e.key === 'Enter') {
            dispatch({type: 'loadLogin'});
            if (data.login === '') {
                dispatch(showError("Խնդրում ենք լրացնել login դաշտը"))
            }
    
            else if (data.password === '') {
                dispatch(showError("Խնդրում ենք լրացնել password դաշտը"))
            }
    
            else {
                axios.post('http://localhost:5000/login', data)
                    .then(r => {
                        if ("success" in r.data) {
                            sessionStorage.currentUser = r.data.token;
                            props.push("/profile");
                            dispatch(showError(""));
                            dispatch(showSuccess());
                        } 
    
                        else if ("successadmin" in r.data) {
                            sessionStorage.currentUser = r.data.token;
                            props.push("/admin/dashboard");
                            dispatch(showError(""));
                            dispatch(showSuccess());
                        }
                                        
                        else if ("error" in r.data) {
                            dispatch(showError(r.data.error));
                        }
                    })
            }
        }
    }
}

export function validate(props, data) {
    return function (dispatch) {
        dispatch({ type: 'loadSignUp' });
        let reg = /(?=.*[0-9])(?=.*[!@#$%^&*()])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()]{6,}/g;
        if (!reg.test(String(data.password))) {
            dispatch(showError1("Խնդրում ենք լրացնել password դաշտը"));
        }
        
        else if (data.name === '') {
            dispatch(showError1("Խնդրում ենք լրացնել name դաշտը"));
        }

        else if (data.surname === '') {
            dispatch(showError1("Խնդրում ենք լրացնել surname դաշտը"));
        }

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (!re.test(String(data.login).toLowerCase())) {
            dispatch(showError1("Խնդրում ենք լրացնել login դաշտը"));
        }

        else if (data.surname && data.name && data.password && data.login) {
            axios.post('http://localhost:5000/add', data)
                .then(r => {
                    if ("success" in r.data) {
                        props.push("/login");
                        dispatch(showError1(""));
                        dispatch(showSuccess1());
                    } else if ("error" in r.data) {
                        dispatch(showError1(r.data.error));
                    }
                })
        }
    }
}

export function validateProfileEnter(props, e, data) {
    return function (dispatch) {
        if (e.key === 'Enter') {
            dispatch({ type: 'loadSignUp' });
            let reg = /(?=.*[0-9])(?=.*[!@#$%^&*()])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()]{6,}/g;
            if (!reg.test(String(data.password))) {
                dispatch(showError1("Խնդրում ենք լրացնել password դաշտը"));
            }
            
            else if (data.name === '') {
                dispatch(showError1("Խնդրում ենք լրացնել name դաշտը"));
            }

            else if (data.surname === '') {
                dispatch(showError1("Խնդրում ենք լրացնել surname դաշտը"));
            }

            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            if (!re.test(String(data.login).toLowerCase())) {
                dispatch(showError1("Խնդրում ենք լրացնել login դաշտը"));
            }

            else if (data.surname && data.name && data.password && data.login) {
                axios.post('http://localhost:5000/add', data)
                    .then(r => {
                        if ("success" in r.data) {
                            props.push("/login");
                            dispatch(showError1(""));
                            dispatch(showSuccess1());
                        } else if ("error" in r.data) {
                            dispatch(showError1(r.data.error));
                        }
                    })
            }
        }
    }
}

export function loginChange(props, data) {
    let token = sessionStorage.currentUser;
    return function (dispatch) {
        dispatch({ type: 'load2' });

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        if (!data.password) {
            dispatch(showError2("Խնդրում ենք լրացնել Password դաշտը"));
        }

        else if (!re.test(String(data.login).toLowerCase())) {
            dispatch(showError2("Խնդրում ենք լրացնել New Login դաշտը"));
        }

        else {
            axios.post('http://localhost:5000/changeYourLogin', { data, token })
                .then(r => {
                    if ("success" in r.data) {
                        sessionStorage.currentUser = r.data.token;
                        // props.push("/login");
                        dispatch(showError2(r.data.success));
                        dispatch(showSuccess2());
                    } else if ("error" in r.data) {
                        dispatch(showError2(r.data.error));
                    }
                })
        }
    }
}

export function changeInputSettingsLoginEnter(props, e, data) {
    let token = sessionStorage.currentUser;
    return function (dispatch) {
        if (e.key === 'Enter') {
            dispatch({ type: 'load2' });

            let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            
            if (!data.password) {
                dispatch(showError2("Խնդրում ենք լրացնել Password դաշտը"));
            }

            else if (!re.test(String(data.login).toLowerCase())) {
                dispatch(showError2("Խնդրում ենք լրացնել New Login դաշտը"));
            }

            else {
                axios.post('http://localhost:5000/changeYourLogin', { data, token })
                    .then(r => {
                        if ("success" in r.data) {
                            sessionStorage.currentUser = r.data.token;
                            // props.push("/login");
                            dispatch(showError2(r.data.success));
                            dispatch(showSuccess2());
                        } else if ("error" in r.data) {
                            dispatch(showError2(r.data.error));
                        }
                    })
            }
        }
    }
}

export function passwordChange(props, data) {
    let token = sessionStorage.currentUser;
    return function (dispatch) {
        dispatch({ type: 'load3' });

        let reg = /(?=.*[0-9])(?=.*[!@#$%^&*()])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()]{6,}/g;

        if (!data.oldPassword) {
            dispatch(showError3("Խնդրում ենք լրացնել Password դաշտը"));
        }


        else if (!reg.test(String(data.newPassword))) {
            dispatch(showError3("Խնդրում ենք լրացնել New Password դաշտը"));
        }
        
        else  {
            axios.post('http://localhost:5000/changeYourPassword',  { data, token })
                .then(r => {
                    if ("success" in r.data) {
                        sessionStorage.currentUser = r.data.token;
                        // props.push("/login");
                        dispatch(showError3(r.data.success));
                        dispatch(showSuccess3());
                    } else if ("error" in r.data) {
                        dispatch(showError3(r.data.error));
                    }
                })
                
        }
    }
}

export function changeInputSettingsPassEnter(props, e, data) {
    let token = sessionStorage.currentUser;
    return function (dispatch) {
        if (e.key === 'Enter') {
            dispatch({ type: 'load3' });
            let reg = /(?=.*[0-9])(?=.*[!@#$%^&*()])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()]{6,}/g;

            if (data.oldPassword === '') {
                dispatch(showError3("Խնդրում ենք լրացնել Password դաշտը"));
            }
    
    
            else if (!reg.test(String(data.newPassword))) {
                dispatch(showError3("Խնդրում ենք լրացնել New Password դաշտը"));
            }
            
            else  {
                axios.post('http://localhost:5000/changeYourPassword',  { data, token })
                    .then(r => {
                        if ("success" in r.data) {
                            sessionStorage.currentUser = r.data.token;
                            // props.push("/login");
                            dispatch(showError3(r.data.success));
                            dispatch(showSuccess3());
                        } else if ("error" in r.data) {
                            dispatch(showError3(r.data.error));
                        }
                    })
            }
        }
    }
}

export function upload() {
    return function (dispatch) {
        dispatch({ type: 'load4' });
        let form = new FormData(document.getElementById('myform'));
        form.append("user", sessionStorage.currentUser); 
        
        axios.post('http://localhost:5000/upload', form)
            .then(r => {
                // console.log(r);
                dispatch(showNoteUpload(r.data.notification));
                dispatch(savePhoto());
            })
        }
}

export function changeInput(key, value) {
    return {
        type: 'changeInput',
        key,
        value
    }
}

export function changeInputLogin(key, value) {
    return {
        type: 'changeInputLogin',
        key,
        value
    }
}

export function changeInputSettingsLogin(key, value) {
    return {
        type: 'changeInputSettingsLogin',
        key,
        value
    }
}

export function changeInputSettingsPassword(key, value) {
    return {
        type: 'changeInputSettingsPassword',
        key,
        value
    }
}

export function loadProfile(key, props) {
    return {
        type: 'loadProfile',
        key,
        history: props
    }
}

export function openMyMessanger(props) {
    return function() {
        props.push(`/profile/messenger`);
    }
}

export function AllUsers() {
    return function(dispatch) {
        axios.post('http://localhost:5000/allusers')
            .then(r => {
                dispatch(AllUsersList(r.data));
            })
    }
}

export function AllUsersList(data) {
    return {
        type: 'AllUsersList',
        data
    }
}

export function showNoteUpload(text) {
    return {
        type: 'showNoteUpload',
        text
    }
}

export function logOut(props) {
    return {
        type: 'logOut',
        history: props
    }
}


// export function validate(props, data) {
//     return function (dispatch) {
//         var validator = require("email-validator");
//         if (validator.validate(data.login) === false) {
//             dispatch(showError1("Խնդրում ենք լրացնել login դաշտը"));
//         } 

//         else if (data.name === '') {
//             dispatch(showError1("Խնդրում ենք լրացնել name դաշտը"));
//         }

//         else if (data.surname === '') {
//             dispatch(showError1("Խնդրում ենք լրացնել surname դաշտը"));
//         }

//         let reg = /(?=.*[0-9])(?=.*[!@#$%^&*()])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*()]{6,}/g;
//         if (!reg.test(String(data.password))) {
//             dispatch(showError1("Խնդրում ենք լրացնել password դաշտը"));
//         }

       
//         else if (data.surname && data.name && data.password && validator.validate(data.login) === true) {
//             axios.post('http://localhost:5000/add', data)
//                 .then(r => {
//                     if ("success" in r.data) {
//                         props.push("/login");
//                         dispatch(showError1(""));
//                         dispatch(showSuccess1());
//                     } else if ("error" in r.data) {
//                         dispatch(showError1(r.data.error));
//                     }
//                 })
//         }
//     }
// }