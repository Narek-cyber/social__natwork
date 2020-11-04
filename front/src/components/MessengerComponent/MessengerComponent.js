import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './MessengerComponent.css';
import ProfileHeader from '../ProfileHeader';
import { 
    AllUsers, 
    GetProfile 
} from '../../redux/actions/user';
import { 
    showMessages, 
    myMessangerFriends, 
    startChat, 
    changeInput, 
    sendMessage, 
    sendMessageMouse, 
    searchMessenger, 
    reloadMessenger
} from '../../redux/actions/messenger';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";
const socket = socketIOClient(ENDPOINT);

function Messenger(props) {
    // let [test, setTest] = useState("----");

    useEffect(() => {
        props.dispatch(GetProfile(props.history, myMessangerFriends));
        // props.dispatch(myMessangerFriends());
        socket.on("vekalNamakner", (data) => props.dispatch(showMessages(data)));
        // socket.on("norNamak", (data)=>setTest(data));
        socket.on("norNamak", (data) => props.dispatch(showMessages(data)));
        props.dispatch(AllUsers());
    }, []);

    let photo = null;

    if (props.user.profile.photo !== "") {
        photo = "http://localhost:5000/" + props.user.profile.photo;
    }

    else if(props.user.profile.photo === "") {
        photo = "http://localhost:5000/c8fy0voke0ep4pi1597782921750default-avatar.jpg";
    }

    let messagePhoto = null;
    let name = null;
    let surname = null;

    // if (props.user.allusers[props.messages.index] === undefined) {
    //     messagePhoto = '';
    // } else if (props.user.allusers[props.messages.index] !== undefined) {
    //     messagePhoto = "http://localhost:5000/" + props.user.allusers[props.messages.index].photo;
    //     name = props.user.allusers[props.messages.index].name + ' ';
    //     surname = props.user.allusers[props.messages.index].surname;
    // }
    
    if (props.messages.friends[props.messages.index] === undefined) {
        messagePhoto = '';
    } else if (props.messages.friends[props.messages.index] !== undefined) {
        messagePhoto = "http://localhost:5000/" + props.messages.friends[props.messages.index].photo;
        name = props.messages.friends[props.messages.index].name + ' ';
        surname = props.messages.friends[props.messages.index].surname;
    }
    
    return (
        <div className="fixed-top">
           <ProfileHeader router={props.history} />
            <div className="message">
                <div id="frame">
                    <div id="sidepanel">
                        <div id="profile">
                            <div className="wrap">
                                <img    
                                    id="profile-img" 
                                    src={photo} 
                                    className="online" 
                                    alt="" 
                                    onClick={() => props.dispatch(reloadMessenger(props))}
                                />
                                <p>{props.user.profile.name} {props.user.profile.surname}</p>
                                <i className="fa fa-chevron-down expand-button" aria-hidden="true"></i>
                                <div id="status-options">
                                    <ul>
                                        <li id="status-online" className="active">
                                            <span className="status-circle"></span> 
                                            <p>Online</p>
                                        </li>
                                        <li id="status-away">
                                            <span className="status-circle"></span> 
                                            <p>Away</p>
                                        </li>
                                        <li id="status-busy">
                                            <span className="status-circle"></span> 
                                            <p>Busy</p>
                                        </li>
                                        <li id="status-offline">
                                            <span className="status-circle"></span> 
                                            <p>Offline</p>
                                        </li>
                                    </ul>
                                </div>
                                <div id="expanded">
                                    <label>
                                        <i className="fa fa-facebook fa-fw" aria-hidden="true"></i>
                                    </label>
                                    <input name="twitter" type="text" />
                                    <label>
                                        <i className="fa fa-twitter fa-fw" aria-hidden="true"></i>
                                        </label>
                                    <input name="twitter" type="text"  />
                                    <label>
                                        <i className="fa fa-instagram fa-fw" aria-hidden="true"></i>
                                    </label>
                                    <input name="twitter" type="text"  />
                                </div>
                            </div>
                        </div>
                        <div id="search">
                            <label>
                                <i className="fa fa-search" aria-hidden="true"></i>
                            </label>
                            <input  
                                type="text" 
                                placeholder="Search contacts..." 
                                value={props.messages.searchText}
                                onChange={(e) => props.dispatch(searchMessenger(e.target.value, props.messages))} 
                            />
                        </div>
                        <div id="contacts">
                            <ul>
                                {   
                                    // props.user.allusers
                                    props.messages.friends
                                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                                    .map((item, index) => {
                                        let style = item.id === 
                                        props.messages.currentUser ? 
                                        "bg-success contact" : "contact";

                                        if (item.photo === '') {
                                            item.photo = 'c8fy0voke0ep4pi1597782921750default-avatar.jpg' 
                                        }
                                        
                                        return <li  
                                                    className={style} 
                                                    key={index} 
                                                    onClick={()=>props.dispatch(startChat(item.id, index, socket, props))}
                                                >
                                            <div className="wrap">
                                                <span className="contact-status online"></span>
                                                <img src={"http://localhost:5000/" + item.photo} alt="" />
                                                <div className="meta">
                                                    <p className="name">{item.name}</p>
                                                    <p className="preview">
                                                        You just got LITT up, 
                                                        {item.name}.
                                                    </p>
                                                </div>
                                            </div>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div id="bottom-bar">
                            <button id="addcontact">
                                <i className="fa fa-user-plus fa-fw" aria-hidden="true"></i> 
                                <span>Add contact</span>
                            </button>
                            <button id="settings">
                                <i className="fa fa-cog fa-fw" aria-hidden="true"></i> 
                                <span>Settings</span>
                            </button>
                        </div>
                    </div>
                    <div className="content">
                        <div className="contact-profile">
                            <img src={messagePhoto} alt="" />
                            <p>{name}{surname}</p>
                            <div className="social-media">
                                <a  
                                    href="https://www.facebook.com" 
                                    style={{color: "#32465A"}} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa fa-facebook" aria-hidden="true"></i>
                                </a>
                                <a  
                                    href="https://twitter.com/?lang=en" 
                                    style={{color: "#32465A"}} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa fa-twitter" aria-hidden="true"></i>
                                </a>
                                <a  
                                    href="https://www.instagram.com/?hl=en" 
                                    style={{color: "#32465A"}} 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <i className="fa fa-instagram" aria-hidden="true"></i>
                                </a>
                            </div>
                        </div>
                        <div className="messages">
                            <ul>
                                {
                                    props.messages.messages.map((item, index) => {
                                        let style = item.user2 === props.messages.currentUser ? "sent" : "replies";
                                        //   let photo = style=="sent" ? item.user2_photo : item.user1_photo;
                                        let photo = style === "sent" ? item.user1_photo : item.user2_photo;
                                        photo = "http://localhost:5000/" + photo
                                        return <li className={style}  key={index}>
                                                    <img src={photo}  alt="" />
                                                    <p>
                                                        {item.text}
                                                    </p>
                                                </li>
                                    })
                                }
                            </ul>
                        </div>
                        <div className="message-input">
                            <div className="wrap">
                                <input 
                                    type="text" placeholder="Write your message..." 
                                    value={props.messages.text}
                                    onChange={(e) => props.dispatch(changeInput(e.target.value))}
                                    onKeyDown={(e) => props.dispatch(sendMessage(e.key, props.messages.currentUser, socket))}
                                />
                                <i className="fa fa-paperclip attachment" aria-hidden="true"></i>
                                <button 
                                    className="submit"
                                    onClick={() => props.dispatch(sendMessageMouse(props.messages.currentUser, socket))}
                                >
                                    <i className="fa fa-paper-plane" aria-hidden="true"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(r => r) (Messenger);