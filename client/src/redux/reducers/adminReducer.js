import adminState from '../state/admin';

function adminReducer(state=adminState, action) {
    let temp = {...state};
    
    if (action.type === 'adminAllUsersList') {
        temp.admin.allusers = action.data;
        return temp;
    }

    if (action.type === "successBlock") {
        temp.admin.allusers.map(user => user.isLoading = false);
        let obj = temp.admin.allusers.filter(user => user.id === action.payload);
        obj[0].isLoading = false;
        return temp;
    }

    if (action.type === "showError"){
        temp.admin.error = action.text;
        return temp;
    }

    if (action.type === "successUnblock") {
        temp.admin.allusers.map(user => user.isLoading = false);
        let obj = temp.admin.allusers.filter(user => user.id === action.payload);
        obj[0].isLoading = false;
        console.log(action.payload)
        return temp;
    }

    if (action.type === "showError4"){
        temp.admin.error = action.text;
        return temp;
    }

    if (action.type === 'loading') {
        temp.admin.allusers.map(user => user.isLoading = false);

        let obj = temp.admin.allusers.filter(user => user.id === action.payload);
        obj[0].isLoading = true
        return temp;
    }

    if (action.type === 'loading1') {
        temp.admin.allusers.map(user => user.isLoading = false);

        let obj = temp.admin.allusers.filter(user => user.id === action.payload);
        obj[0].isLoading = true
        return temp;
    }


    return temp;
}

export default adminReducer;
