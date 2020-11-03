import { combineReducers } from 'redux';
import user from './userReducer';
import friends from './friendshipReducer';
import messenger from './messengerReducer';
import addpost from './postReducer';
import otheruser from './otheruserReducer';
import admin from './adminReducer';

let root = combineReducers ({ 
    user: user, 
    friends: friends, 
    messages: messenger, 
    posts: addpost, 
    other: otheruser, 
    adminuser: admin 
});

export default root;