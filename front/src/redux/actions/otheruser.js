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
        axios.post(`http://localhost:5000/otheruser/friends/${id}`)
            .then(r => {
                dispatch(OtherUpdateFriends(r.data));
            })
    }
}