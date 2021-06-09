import axios from 'axios';


export function myMessangerFriends() {
    return function(dispatch) {
        axios.post("http://localhost:5000/friend/messagnerfriends", { token: sessionStorage.currentUser })
            .then(r => {
                dispatch(updateMessangerFriends(r.data));
            })
    }
}

export function startChat(id, index, socket, props){
    return {
        type:"startChat",
        id,
        index,
        socket,
        props
    }
}

export function showMessages(data) {
    return {
        type:"showMessages",
        data
    }
}

export function changeInput(value) {
    return {
        type:"changeInput",
        value
    }
}

export function sendMessage(key, id, socket) {
    return {
        type:"sendMessage",
        key,
        id: id,
        socket
    }
}

export function sendMessageMouse(id, socket) {
    return {
        type:"sendMessageMouse",
        id: id,
        socket
    }
}

export function searchMessenger (value, data) {
    return function(dispatch) {
        data.searchText = value;
        if (!value) {
            axios.post("http://localhost:5000/friend/messagnerfriends", { token: sessionStorage.currentUser })
                .then(r => {
                    dispatch(updateMessangerFriends(r.data));
                })
        } else {
            axios.post("http://localhost:5000/user/searchmessenger", { text: data.searchText, token: sessionStorage.currentUser })
            .then(r => {
                dispatch(updateResultMessenger(r.data));
            })
        }
    }
}

export function updateMessangerFriends(data) {
    return {
        type: 'updateMessangerFriends',
        data
    }
}

export function updateResultMessenger(data) {
    return {
        type: 'updateResultMessenger',
        data
    }
}

export function reloadMessenger(props) {
    return {
        type: 'reloadMessenger',
        props
    }
}

export function addUserFromFriendList(user) {
    return function(dispatch) {
        dispatch({ type: 'addUserFromFriendList', user})
    }
}

export function goToSettings(props) {
    return function() {
        props.push(`/profile/settings`);
    }
}