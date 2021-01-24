import axios from 'axios';

export function ShowMyFriends() {
    return function(dispatch) {
        axios.post("http://localhost:5000/friend/friends", { token: sessionStorage.currentUser })
            .then(r => {
                dispatch(updateFriends(r.data));
            })
    }
}

export function updateFriends(data) {
    return {
        type:'updateFriends',
        data
    }
}

export function searchText (value, data) {
    return function(dispatch) {
        data.searchText = value;
        dispatch({type: 'search'});
        
        if (!data.searchText.match(/^[ ]+$/)) {
            axios.post("http://localhost:5000/user/search", { text: data.searchText, token: sessionStorage.currentUser })
                .then(r => {
                    dispatch(updateResult(r.data));
                })
        }
    }
}

export function updateResult (data) {
    return {
        type:'updateResult',
        data
    }
}

export function friendship(id) {
    return function(dispatch) {
        dispatch({ type: 'friendship', payload: id });
        axios.post('http://localhost:5000/friendship',  { token: sessionStorage.currentUser, id })
            .then(r => {
                if ('success' in r.data) {
                    dispatch(requestSent(id));
                    dispatch(showNote(r.data.r));
                } else if ('error' in r.data) {
                    dispatch(showError5(r.data.error));
                }
            })
    }
}

export function showError5(text) {
    return {
        type: "showError5",
        text
    }
}

export function requestSent(id) {
    return {
        type: "requestSent",
        id
    }
}

export function myRequests() {
    return function(dispatch) {
        axios.post("http://localhost:5000/friend/requests", { token: sessionStorage.currentUser })
            .then(r => {
                dispatch(updateRequests(r.data));
            })
    }
}

export function updateRequests(data) {
    return {
        type:'updateRequests',
        data
    }
}

export function rejectFriend(index, id) {
    return function(dispatch) {
        dispatch({ type: 'rejectFriend', payload: id });
        axios.post("http://localhost:5000/friend/reject", { token: sessionStorage.currentUser, id })
            .then(r => {
                dispatch(rejectRequestsList(index));
                dispatch(showNoteReject(r.data.r));
            }) 
    }
}

export function rejectRequestsList(index) {
    return {
        type:'rejectRequestsList',
        index
    }
}

export function acceptFriend(index, id) {
    return function(dispatch) {
        dispatch({ type: 'acceptFriend', payload: id });
        axios.post("http://localhost:5000/friend/accept", { token: sessionStorage.currentUser, id })
            .then(r => {
                dispatch(updateRequestsList(index));
                // console.log(r.data.r);
                dispatch(showNoteAccept(r.data.r));
            }) 
        
    }
}

export function updateRequestsList(index) {
    return {
        type:'updateRequestsList',
        index
    }
}

export function removeFriend(index, id) {
    return function(dispatch) {
        dispatch({ type: 'removeFriend', payload: id });
        axios.post("http://localhost:5000/friend/remove", { token: sessionStorage.currentUser, id })
            .then(r => {
                dispatch(removeFriends(index));
                dispatch(showNoteDelete(r.data.r));
            }) 
    }
}

export function removeFriends(index) {
    return {
        type:'removeFriends',
        index
    }
}

export function cancelRequest(index, id) {
    return function(dispatch) { 
        dispatch({ type: 'cancelRequest', payload: id })
        axios.post("http://localhost:5000/request/cancel", { token: sessionStorage.currentUser, id })
            .then(r => {
                if ('success' in r.data) {
                   dispatch(cancelRequests(id));
                   dispatch(showNoteCancel(r.data.notification))
                }
        }) 
    }
}

export function cancelRequests (id) {
    return {
        type: 'cancelRequests',
        id
    }
}

export function unfriend(index, id) {
    return function(dispatch) { 
        dispatch({ type: 'unfriend', payload: id });
        axios.post("http://localhost:5000/friend/unfriend", { token: sessionStorage.currentUser, id })
            .then(r => {
                // console.log(r.data.r)
                dispatch(unfriendFriends(index, id));
                dispatch(showNoteUnfriend(r.data.r));
            })
    }
}

export function unfriendFriends(index, id) {
    return {
        type: 'unfriendFriends',
        index,
        id
    }
}

export function showError(text) {
    return {
        type: "showError",
        text
    }
}

export function showNote(text) {
    return {
        type: 'showNote',
        text
    }
}

export function showNoteCancel(text) {
    return {
        type: 'showNoteCancel',
        text
    }
}

export function showNoteUnfriend(text) {
    return {
        type: 'showNoteUnfriend',
        text
    }
}

export function showNoteAccept(text) {
    return {
        type: 'showNoteAccept',
        text
    }
}

export function showNoteReject(text) {
    return {
        type: 'showNoteReject',
        text
    }
}

export function showNoteDelete(text) {
    return {
        type: 'showNoteDelete',
        text
    }
}
