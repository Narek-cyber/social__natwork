export default {
    signin: {
        login: "l35@mail.ru",
        password: "asdAS!@123",   
        error: "",
        isLoading: false
    },

    signup: {
        name: "",
        surname: "",
        login: "",
        password: "",
        error: "",
        isLoading: false
    },

    profile: {
        token: "",
        name: "",
        surname: "",
        photo:"",
        error: ""
    },
    
    settings: {
        loginChange: {
            login: "",
            password: "",
            error: "",
            isLoading: false
        },
        
        passwordChange: {
            oldPassword: "",
            newPassword: "",
            error: "",
            isLoading: false
        },
        
        savePhoto: {
            isLoading: false
        }
    },
    allusers: [],
    notification: "",
    notifications: [],
    myId: ''
}
