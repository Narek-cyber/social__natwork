import friendsState from '../state/friendship';

function friendshipReducer(state=friendsState, action) {
    let temp = {...state};

    if (action.type === "showError5") {
        temp.error = action.text;
        return temp;
    }

    if (action.type === "showNote") {
        temp.notification = action.text;
        temp.notifications.push(temp.notification);
        return temp;
    }

    if (action.type === "showNoteCancel") {
        temp.notification = action.text;
        temp.notifications.push(temp.notification);
        return temp;
    }

    if (action.type === "showNoteUnfriend") {
        temp.notification = action.text;
        temp.notifications.push(temp.notification);
        return temp;
    }

    if (action.type === "showNoteAccept") {
        temp.notification = action.text;
        temp.notifications.push(temp.notification);
        return temp;
    }

    if (action.type === "showNoteReject") {
        temp.notification = action.text;
        temp.notifications.push(temp.notification);
        return temp;
    }

    if (action.type === "showNoteDelete") {
        temp.notification = action.text;
        temp.notifications.push(temp.notification);
        return temp;
    }

    if (action.type === 'search') {
        temp.isLoading = true;
        return temp;
    } else if (action.type === 'updateResult') {
        if (!temp.searchText) {
            temp.searchedUsers = [];
            temp.isLoading = false;
            return temp;
        }

        action.data.forEach(user => {
            user.isLoading = false
        });

        temp.isLoading = false;

        temp.searchedUsers = action.data;
        
        return temp;
    }

    if (action.type === 'friendship') {
        let obj = temp.searchedUsers.filter(item => item.id === action.payload);
        obj[0].isLoading = true;
        return temp;
    } else if (action.type === "friendYourSelf") {
        temp.error = action.key;
        return temp;
    } else if (action.type === "requestSent") {
        let id = action.id;
        let obj = temp.searchedUsers.find(y => y.id === id);
        obj.isRequestSent.push(1);
        obj.isLoading = false;
        return temp;
    }

    if (action.type === 'updateRequests') {
        temp.myrequests = action.data;
        return temp;
    }

    if (action.type === 'acceptFriend') {
        temp.myrequests.forEach(user => {
            user.isLoading = false
        });
        let obj = temp.myrequests.filter(item => item.id === action.payload);
        obj[0].isLoading = true;
        return temp;
    } else if (action.type === "updateRequestsList") {
        let obj = temp.myrequests.splice(action.index, 1)
        obj[0].isLoading = false;
        return temp;
    }

    if (action.type === 'rejectFriend') {
        temp.myrequests.forEach(user => {
            user.isLoading1 = false
        });
        let obj = temp.myrequests.filter(item => item.id === action.payload);
        obj[0].isLoading1 = true;
        return temp;
    } else if (action.type === "rejectRequestsList") {
        let obj = temp.myrequests.splice(action.index, 1)
        obj[0].isLoading1 = false;
        return temp;
    }

    if (action.type === 'updateFriends') {
        temp.myfriends = action.data;
        return temp;
    }

    if (action.type === 'removeFriend') {
        temp.myfriends.forEach(user => {
            user.isLoading = false
        });
        
        let obj = temp.myfriends.filter(item => item.id === action.payload);
        obj[0].isLoading = true;
        return temp;
    } else if (action.type === 'removeFriends') {
        let obj = temp.myfriends.splice(action.index, 1)
        obj[0].isLoading = false;
        return temp;
    }

    if (action.type === 'cancelRequest') {
        let obj = temp.searchedUsers.filter(item => item.id === action.payload);
        obj[0].isLoading = true;
        return temp;
    } else if (action.type === "cancelRequests") {
        let id = action.id;
        let obj = temp.searchedUsers.filter(y => y.id === id);
        obj[0].isRequestSent.splice(0, 1);
        obj[0].isLoading = false;
        return temp;
    }

    if (action.type === 'unfriend') {
        console.log(action.payload);
        let obj = temp.searchedUsers.filter(item => item.id === action.payload);
        obj[0].isLoading = true;
        return temp;
    } else if (action.type === 'unfriendFriends') {
        temp.myfriends.splice(action.index, 1);
        let id = action.id;
        let obj = temp.searchedUsers.find(y => y.id === id);
        obj.areWeFriends[0].qanak = 0;
        obj.isLoading = false;
        return temp;
    }

    if (action.type === 'resetSearchInput') {
        temp = {...friendsState};
        temp.searchText = '';
        return temp;
    }

    return state;
}

export default friendshipReducer;
