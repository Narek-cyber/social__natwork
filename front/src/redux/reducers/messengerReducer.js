import messangerState from '../state/messenger';

function messengerReducer(state=messangerState, action) {
    let temp = {...state};
    
    if (action.type === 'updateMessangerFriends') {
        temp.friends = action.data;
        return temp;
    }
    
    if (action.type === 'updateResultMessenger') {
        temp.friends = action.data;
        return temp;
    }

    if (action.type === "showMessages") {
        temp.messages = action.data;
        document.querySelector(".messages").scrollBy(0, 10000000000000);
        return temp;
    }

    if (action.type === "startChat") {
        temp.currentUser = action.id;
        temp.index = action.index;
        action.socket.emit("startChat", { id: action.id, me: sessionStorage.currentUser});
        action.props.history.push(`/profile/messenger/${action.id}`);
        return temp;
    } else if (action.type === 'sendChatMessages') {
        temp.messages = action.data.messages;
        return temp;
    }

    if (action.type === "changeInput") {
        temp.text = action.value;
        return temp;
    }

    if (action.type === "sendMessage") {
        if (action.key === "Enter") {
            action.socket.emit("norNamak", {token: sessionStorage.currentUser, text: temp.text, id: action.id})
            temp.text = "";
            return temp;
        } 
    } 

    if (action.type === "sendMessageMouse") {
        action.socket.emit("norNamak", { token: sessionStorage.currentUser, text: temp.text, id: action.id })
        temp.text = "";
        return temp;
    } 

    if (action.type === 'reloadMessenger') {
        action.props.history.push('/profile/messenger')
        window.location.reload();
        return temp;
    }

    return temp;
}


export default messengerReducer;
