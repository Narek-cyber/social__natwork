import axios from 'axios';

export function showMyNotifications() {
    return function(dispatch) {
        axios.post("http://localhost:5000/notifications", { token: sessionStorage.currentUser })
            .then(r => {
                dispatch(updateMyNotifications(r.data));
            })
    }
}

export function updateMyNotifications(data) {
    return {
        type:'updateMyNotifications',
        data
    }
}




