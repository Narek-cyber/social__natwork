import PostState from '../state/post';

function addPostReducer(state=PostState, action) {
    let temp = {...state};

    if (action.type === 'post') {
        temp.postText = action.value;
        return temp;
    }

    if (action.type === 'updatePosts') {
        if (action.data[0] === undefined) return temp.current = '';
        temp.postText = "";
        temp.postPhotos = action.data;
        temp.postPhotosNote = action.data;
        temp.postPhotosNote = temp.postPhotosNote.filter(item => item.note_type !== 0);
        // temp.current = action.data[0].content;
        return temp;
    }


    if (action.type === "openSlider") {
        temp.current = temp.postPhotos[action.index].content;
        temp.showSlider = true;
        temp.postText1 = temp.postPhotos[action.index].text;
        temp.index = action.index;
        temp.index1 = action.index;
        return temp;

    }

    if (action.type === "closeSlider") {
        temp.showSlider = false;
        return temp;
    }

    if (action.type === "next") {
        if (temp.index === temp.postPhotos.length - 1) {
            temp.index = -1;
        }
        if (temp.index1 === temp.postPhotos.length - 1) {
            temp.index1 = -1;
        }

        temp.current = temp.postPhotos[++temp.index].content;
        temp.postText1 = temp.postPhotos[++temp.index1].text

        return temp;
    }

    if (action.type === "prev") {
        if (temp.index === 0) {
            temp.index = temp.postPhotos.length;
        }
        if (temp.index1 === 0) {
            temp.index1 = temp.postPhotos.length;
        }
        temp.current = temp.postPhotos[--temp.index].content;
        temp.postText1 = temp.postPhotos[--temp.index1].text;
        return temp;
    }

    if (action.type === 'savePostPhoto') {
        temp.isLoading = true;
        return temp;
    }

    if (action.type === 'loadSavePhoto') {
        temp.isLoading = false;
        return temp;
    }

    if (action.type === "showCommentMessages") {
        temp.comments = action.data;
        return temp;
    }

    if (action.type === 'startComment') {
        temp.index = action.index;
        action.socket.emit("startComment", { id: action.id, me: sessionStorage.currentUser, post_id: action.post_id});
        return temp;
    } else if (action.type === 'sendCommentMessages') {
        temp.comments = action.data.comments;
        return temp;
    }

    if (action.type === "changeCommentInput") {
        temp.text = action.value;
        return temp;
    }

    if (action.type === 'sendCommentMessage') {
        if (action.key === 'Enter') {
            action.socket.emit("newComment", { token: sessionStorage.currentUser, text: temp.text, id: action.id, post_id: action.post_id })
            temp.text = "";
            return temp;
        }
        return temp;
    }

    if (action.type === 'showNotePost') {
        temp.notification = action.text;
        temp.notifications.push(temp.notification);
        return temp;
    }

    if (action.type === 'showNoteDel') {
        temp.notification = action.text;
        temp.notifications.push(temp.notification);
        return temp;
    }
    
    return temp;
}

export default addPostReducer;

