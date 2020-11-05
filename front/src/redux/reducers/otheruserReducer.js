import otheruserState from '../state/otheruser';
// import myPostState from '../state/post';

function otheruserReducer(state=otheruserState, action) {
    let temp = {...state};

    if (action.type === 'updateOtherUserProfile') {
        temp.otherUsersProfile = action.data.user;
        return temp;
    }
    
    
    if (action.type === 'OtherUpdatePosts') {
        // console.log(action.data);
        // temp.postText = "";
        temp.postPhotos = action.data;
        // temp.current = action.data[0].content;
        return temp;
    }

    
    if (action.type === "openOtherSlider") {
        temp.current = temp.postPhotos[action.index].content;
        temp.showSlider = true;
        temp.postText1 = temp.postPhotos[action.index].text;
        temp.index = action.index;
        temp.index1 = action.index;
        return temp;
    }

    
    if (action.type === "closeOtherSlider") {
        temp.showSlider = false;
        return temp;
    }

    if (action.type === "nextOther") {
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

    if (action.type === "prevOther") {
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

    if (action.type === 'share') {
        // console.log(action.index);
        // console.log(temp.postPhotos[action.index].id);
        // myPostState.postPhotos.unshift(temp.postPhotos[action.index]);
        // console.log(myPostState.postPhotos);
        return temp;
    }

    if (action.type === 'openOtherUserMessanger') {
        // alert('ok')
        return temp;
    }

    if (action.type === "changeOtherUserCommentInput") {
        temp.text = action.value;
        return temp;
    }

    if (action.type === "showOtherCommentMessages") {
        temp.comments = action.data;
        return temp;
    }

    if (action.type === 'startOtherComment') {
        temp.index = action.index;
        action.socket.emit("startOtherComment", { id: action.id, me: sessionStorage.currentUser, post_id: action.post_id });
        return temp;
    } else if (action.type === 'sendOtherCommentMessages') {
        temp.comments = action.data.comments;
        return temp;
    }

    if (action.type === 'sendOtherCommentMessage') {
        if (action.key === 'Enter') {
            action.socket.emit("newOtherComment", { token: sessionStorage.currentUser, text: temp.text, id: action.id, post_id: action.post_id })
            temp.text = "";
            return temp;
        }
        return temp;
    }

    if (action.type === 'like') {
        temp.postPhotos.forEach(post => {
            post.isLiked = null
        })
        let obj = temp.postPhotos.filter(post => post.id === action.postId);
        obj[0].isLiked = true;
        return temp;
    }

    if (action.type === 'dislike') {
        temp.postPhotos.forEach(post => {
            post.isLiked = null
        })
        let obj = temp.postPhotos.filter(post => post.id === action.postId);
        obj[0].isLiked = false;
        return temp;
    }

    if (action.type === 'showShareNote') {
        temp.notification = action.text;
        temp.notifications.push(temp.notification);
        return temp;
    }

    if (action.type === 'OtherUpdateFriends') {
        temp.otherUserFriends = action.data;
        return temp;
    }

    
    if (action.type === 'friendship1') {
        let obj = temp.otherUserFriends.filter(item => item.id === action.payload);
        obj[0].isLoading = true;
        return temp;
    } else if (action.type === "friendYourSelf1") {
        temp.error = action.key;
        return temp;
    } else if (action.type === "requestSent1") {
        let id = action.id;
        let obj = temp.otherUserFriends.find(y => y.id === id);
        obj.isRequestSent.push(1);
        obj.isLoading = false;
        return temp;
    }

    if (action.type === "showError1") {
        temp.error = action.text;
        return temp;
    }

    if (action.type === "showNote1") {
        temp.notification = action.text;
        temp.notifications.push(temp.notification);
        return temp;
    }

    
    if (action.type === 'cancelRequest1') {
        let obj = temp.otherUserFriends.filter(item => item.id === action.payload);
        obj[0].isLoading = true;
        return temp;
    } else if (action.type === "cancelRequests1") {
        let id = action.id;
        let obj = temp.otherUserFriends.filter(y => y.id === id);
        obj[0].isRequestSent.splice(0, 1);
        obj[0].isLoading = false;
        return temp;
    }

    if (action.type === "showNoteCancel1") {
        temp.notification = action.text;
        temp.notifications.push(temp.notification);
        return temp;
    }

    if (action.type === 'unfriend1') {
        console.log(action.payload);
        let obj = temp.otherUserFriends.filter(item => item.id === action.payload);
        obj[0].isLoading = true;
        return temp;
    } else if (action.type === 'unfriendFriends1') {
        let id = action.id;
        let obj = temp.otherUserFriends.find(y => y.id === id);
        obj.areWeFriends[0].qanak = 0;
        obj.isLoading = false;
        return temp;
    }

    if (action.type === "showNoteUnfriend1") {
        temp.notification = action.text;
        temp.notifications.push(temp.notification);
        return temp;
    }

    return temp;
}

export default otheruserReducer;