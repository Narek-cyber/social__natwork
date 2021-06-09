import notificationState from '../state/notificationState';

function notificationReducer(state=notificationState, action) {
    let temp = {...state};
    if (action.type === 'updateMyNotifications') {
        temp.notifications = action.data.filter(item => item.note_type !== 0);
        temp.notificationsFilter = action.data.filter(item => item.note_type === 0);
        return temp;
    }
    return temp;
}

export default notificationReducer;