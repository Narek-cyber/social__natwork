import axios from 'axios';

export function searchPost (value) {
    return {
        type: 'post',
        value
    }
}

export function postGo(props, postText) {
    return function(dispatch) {
        dispatch({ type: 'savePostPhoto' })
        let form = new FormData(document.getElementById('mypost'));
        form.append("user", sessionStorage.currentUser); 
        form.append("text", postText);
        
        axios.post('http://localhost:5000/user/myposts', form)
            .then(r => {
                dispatch({ type: 'loadSavePhoto' });
                dispatch(showNotePost(r.data.notification));
                props.push("/profile/myposts");
            })
    }
}

export function myPosts(data) {
    return function(dispatch) {
        axios.post("http://localhost:5000/user/posts", { token: sessionStorage.currentUser })
            .then(r => {
                dispatch(updatePosts(r.data));
            })
    }
}

export function updatePosts(data) {
    return {
        type: 'updatePosts',
        data
    }    
}


export function openSlider(index) {
    return {
        type:"openSlider",
        index
    }
}

export function closeSlider() {
    return {
        type: "closeSlider"
    }
}

export function next() {
    return {
        type: "next"
    }
}

export function prev() {
    return {
        type: "prev"
    }
}

export function deletePost(index, id, content, data) {
    return function(dispatch) {
        data.postPhotos.splice(index, 1);
        axios.post("http://localhost:5000/user/posts/delete", { postId: id, token: sessionStorage.currentUser, content: content })
            .then(r => {
                dispatch(closeSlider());
                dispatch(showNoteDel(r.data.notification));
            })
    }
}

export function startComment(id, index, post_id, socket) {
    return {
        type:"startComment",
        id,
        index,
        post_id, 
        socket
    }
}

export function showCommentMessages(data) {
    return {
        type:"showCommentMessages",
        data
    }
}

export function changeCommentInput(value) {
    return {
        type:"changeCommentInput",
        value
    }
}

export function sendCommentMessage(key, id, post_id, socket) {
    return {
        type: 'sendCommentMessage',
        key,
        id: id,
        post_id,
        socket
    }
}

export function showNotePost(text) {
    return {
        type: 'showNotePost',
        text
    }
}

export function showNoteDel(text) {
    return {
        type: 'showNoteDel',
        text
    }
}





