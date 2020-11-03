import axios from 'axios';

export function adminAllUsers() {
    return function(dispatch) {
        axios.post('http://localhost:5000/admin/dashboard')
            .then(r => {
                dispatch(adminAllUsersList(r.data));
            })
    }
}

export function adminAllUsersList(data) {
    return {
        type: 'adminAllUsersList',
        data
    }
}
 
export function Block(id, data) {
    return function(dispatch) {
        let obj = data.allusers.find(y => y.id === id);
        // console.log(obj)
        dispatch({ type: 'loading', payload: id })
        obj.block_status = 0;
        axios.post('http://localhost:5000/admin/dashboard/block', { id: id })
            .then(r => {
                dispatch({ type: 'successBlock', payload: id });
            })
    }
}

export function successBlock() {
    return {
        type: 'successBlock'
    }
}

export function Unblock(id, data) {
    return function(dispatch) {
        let obj = data.allusers.find(y => y.id === id);
        dispatch({ type: 'loading1', payload: id });
        // console.log(obj)
        axios.post('http://localhost:5000/admin/dashboard/unblock', { id: id })
            .then(r => {
                dispatch({ type: 'successUnblock', payload: id });
            })
        obj.block_status = 1;
    }
}

export function successUnblock() {
    return {
        type: 'successUnblock'
    }
}

export function showError4(text) {
    return {
        type: "showError4",
        text
    }
}