import userState from '../state/user';

function userReducer (state=userState, action) {
    let temp = {...state};

    if (action.type === 'changeInput') {
        temp.signup[action.key] = action.value;
        return temp;
    }

    if (action.type === 'changeInputLogin') {
        temp.signin[action.key] = action.value;
        return temp;
    }

    if (action.type === 'changeInputSettingsLogin') {
        temp.settings.loginChange[action.key] = action.value;
        return temp;
    }

    if (action.type === 'changeInputSettingsPassword') {
        temp.settings.passwordChange[action.key] = action.value;
        return temp;
    }

    if (action.type === "setSignUpError") {
        temp.signup.error = action.key;
        return temp;
    }

    if (action.type === "setSignInError") {
        temp.signin.error = action.key;
        return temp;
    }

    if (action.type === "setLoginChangeError") {
        temp.settings.loginChange.error = action.key;
        return temp;
    }

    if (action.type === "setPasswordChangeError") {
        temp.settings.passwordChange.error = action.key;
        return temp;
    }

    if (action.type === "updateProfile") {
        temp.profile.name = action.user.name;
        temp.profile.surname = action.user.surname;
        temp.profile.photo = action.user.photo;
        temp.myId = action.id;
        // console.log(action.id);
        return temp;
    }

    if (action.type === "showError") {
        temp.signin.error = action.text;
        return temp;
    }

    if (action.type === 'showSuccess') {
        // temp.signin.login = '';
        // temp.signin.password = '';
        temp.signin.isLoading = false;
        return temp;
    }

    if (action.type === "showError1") {
        temp.signup.error = action.text;
        return temp;
    }

    if (action.type === 'showSuccess1') {
        temp.signup.name = '';
        temp.signup.surname = '';
        temp.signup.login = '';
        temp.signup.password = '';
        temp.signup.isLoading = false;
        return temp;
    }


    if (action.type === "showError2") {
        temp.settings.loginChange.error = action.text;
        return temp;
    }

    if (action.type === 'showSuccess2') {
        temp.settings.loginChange.login = '';
        temp.settings.loginChange.password = '';
        temp.settings.loginChange.isLoading = false;
        return temp;
    }

    if (action.type === 'load2') {
        temp.settings.loginChange.isLoading = true;
        return temp;
    }

    if (action.type === "showError3"){
        temp.settings.passwordChange.error = action.text;
        return temp;
    }

    if (action.type === 'showSuccess3') {
        temp.settings.passwordChange.oldPassword = '';
        temp.settings.passwordChange.newPassword = '';
        temp.settings.passwordChange.isLoading = false;
        return temp;
    }

    if (action.type === 'load3') {
        temp.settings.passwordChange.isLoading = true;
        return temp;
    }

    if (action.type === 'savePhoto') {
        temp.settings.savePhoto.isLoading = false;
        return temp;
    }

    if (action.type === 'load4') {
        temp.settings.savePhoto.isLoading = true;
        return temp;
    }

    if (action.type === 'resetSettings') {
        // temp.settings.loginChange = {...userState.settings.loginChange};
        temp.settings.loginChange = { login: '', password: '', error: '', isLoading: false };
        temp.settings.passwordChange = { oldPassword: '', newPassword: '', error: '', isLoading: false}; 
        return temp;
    }

    if (action.type === 'AllUsersList') {
        temp.allusers = action.data;
        return temp;
    }

    if (action.type === 'showNoteUpload') {
        // temp.notification = action.text;
        // temp.notifications.push(temp.notification);
        temp.notifications = action.text;
        return temp;
    }

    if (action.type === 'loadLogin') {
        temp.signin.isLoading = true;
        return temp;
    }

    if (action.type === 'loadSignUp') {
        temp.signup.isLoading = true;
        return temp;
    }

    if (action.type === 'logOut') {
        delete  sessionStorage.currentUser;
        action.history.push('/login');
        return temp;
    }


    return state;
}

export default userReducer;