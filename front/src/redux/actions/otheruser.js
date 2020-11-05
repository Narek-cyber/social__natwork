import axios from 'axios';

export function otherUser(id, key, props) {
    return function(dispatch) {
        axios.post(`http://localhost:5000/user/profile/${id}`, { token: key })
            .then(r => {
                if ("user" in r.data){
                   dispatch(updateOtherUserProfile(r.data)); 
                } else if ("error" in r.data) {
                    props.push("/profile");
                }
            })
    }
}

export function updateOtherUserProfile(data) {
    return {
        type: 'updateOtherUserProfile',
        data
    }
}

export function OtherUserPosts(id) {
    return function(dispatch) {
        axios.post(`http://localhost:5000/otheruser/posts/${id}`)
            .then(r => {
                dispatch(OtherUpdatePosts(r.data));
            })
    }
}

export function OtherUpdatePosts(data) {
    return {
        type: 'OtherUpdatePosts',
        data
    }
}

export function openOtherSlider(index) {
    return {
        type:"openOtherSlider",
        index
    }
}

export function closeOtherSlider() {
    return {
        type: "closeOtherSlider"
    }
}

export function nextOther() {
    return {
        type: "nextOther"
    }
}

export function prevOther() {
    return {
        type: "prevOther"
    }
}

export function share(index, id) {
    return function (dispatch) {
        axios.post(`http://localhost:5000/share/${id}`, { index: index, token: sessionStorage.currentUser, id: id })
            .then(r => {
                dispatch({ type: 'share', index: index, id });
                dispatch(showShareNote(r.data.notification));
            })
    }
}

export function openUserMessanger(props, id) {
    return function() {
        props.push(`/profile/messenger/${id}`);
    }
}

export function changeOtherUserCommentInput(value) {
    return {
        type:"changeOtherUserCommentInput",
        value
    }
}

export function showOtherCommentMessages(data) {
    return {
        type:"showOtherCommentMessages",
        data
    }
}

export function sendOtherCommentMessage(key, id, post_id, socket) {
    return {
        type: 'sendOtherCommentMessage',
        key,
        id: id,
        post_id,
        socket
    }
}

export function startOtherComment(id, index, post_id, socket) {
    return {
        type:"startOtherComment",
        id,
        index,
        post_id,
        socket
    }
}

export function like(postId) {
    return function(dispatch) {
        dispatch({ type: 'like', postId: postId })
    }
}

export function dislike(postId) {
    return function(dispatch) {
        dispatch({ type: 'dislike', postId: postId })
    }
}

export function showShareNote(text) {
    return {
        type: 'showShareNote',
        text
    }
}

export function OtherUpdateFriends(data) {
    return {
        type: 'OtherUpdateFriends',
        data
    }
}

export function OtherUserFriends(id) {
    return function(dispatch) {
        axios.post(`http://localhost:5000/otheruser/friends/${id}`, {token: sessionStorage.currentUser})
            .then(r => {
                dispatch(OtherUpdateFriends(r.data));
            })
    }
}

export function friendship1(id) {
    return function(dispatch) {
        dispatch({ type: 'friendship1', payload: id });
        axios.post('http://localhost:5000/friendship',  { token: sessionStorage.currentUser, id })
            .then(r => {
                if ('success' in r.data) {
                    dispatch(requestSent1(id));
                    dispatch(showNote1(r.data.notification));
                } else if ('error' in r.data) {
                    dispatch(showError1(r.data.error));
                }
            })
    }
}


export function requestSent1(id) {
    return {
        type: "requestSent1",
        id
    }
}

export function showNote1(text) {
    return {
        type: 'showNote1',
        text
    }
}

export function showError1(text) {
    return {
        type: "showError1",
        text
    }
}


export function cancelRequest1(index, id) {
    return function(dispatch) { 
        dispatch({ type: 'cancelRequest1', payload: id })
        axios.post("http://localhost:5000/request/cancel", { token: sessionStorage.currentUser, id })
            .then(r => {
                if ('success' in r.data) {
                   dispatch(cancelRequests1(id));
                   dispatch(showNoteCancel1(r.data.notification))
                }
        }) 
    }
}


export function cancelRequests1(id) {
    return {
        type: 'cancelRequests1',
        id
    }
}

export function showNoteCancel1(text) {
    return {
        type: 'showNoteCancel1',
        text
    }
}

export function unfriend1(index, id) {
    return function(dispatch) { 
        dispatch({ type: 'unfriend1', payload: id });
        axios.post("http://localhost:5000/friend/unfriend", { token: sessionStorage.currentUser, id })
            .then(r => {
                dispatch(unfriendFriends1(index, id));
                dispatch(showNoteUnfriend1(r.data.notification));
            })
    }
}

export function unfriendFriends1(index, id) {
    return {
        type: 'unfriendFriends1',
        index,
        id
    }
}

export function showNoteUnfriend1(text) {
    return {
        type: 'showNoteUnfriend1',
        text
    }
}