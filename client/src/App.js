import React from 'react';
import './App.css';

import LoginComponent from './components/LoginComponent/LoginComponent';
import SignupComponent from './components/SignupComponent/SignupComponent';
import HomeComponent from './components/HomeComponent/HomeComponent';
import ProfileComponent from './components/ProfileComponent/ProfileComponent';
import SettingsComponent from './components/SettingsComponent/SettingsComponent';
import RequestsComponent from './components/RequestsComponent/RequestsComponent';
import MessengerComponent from './components/MessengerComponent/MessengerComponent';
import FriendsComponent from './components/FriendsComponent/FriendsComponent';
import AddPostComponent from './components/Post/Post';
import MyPostComponent from './components/MyPosts/MyPosts';
import OtherUserComponent from './components/OtherUserComponents/OtherUser/OtherUser';
import AdminComponent from './components/AdminComponent/AdminComponent';
import NotificationComponent from './components/Notification/Notification';

import { BrowserRouter as Router, Route } from 'react-router-dom';

function App() {
  return (
    <div>
      <Router>
        <Route path="/" exact component={HomeComponent} />
        <Route path="/admin/dashboard" exact component={AdminComponent} />
        <Route path="/user/profile/:id" component={OtherUserComponent} />
        <Route path="/login" component={LoginComponent} />
        <Route path="/profile" exact component={ProfileComponent} />
        <Route path="/signup" component={SignupComponent} />
        <Route path="/profile/settings" component={SettingsComponent}/>
        <Route path="/profile/requests" component={RequestsComponent}/>
        <Route path="/profile/friends" component={FriendsComponent}/>
        <Route path="/profile/addpost" component={AddPostComponent}/>
        <Route path="/profile/myposts" component={MyPostComponent}/>
        <Route path="/profile/messenger" component={MessengerComponent}/>
        <Route path="/profile/notification" component={NotificationComponent}/>
      </Router>
    </div>
  );
}

export default App;
