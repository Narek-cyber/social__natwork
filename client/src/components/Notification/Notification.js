import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import ProfileHeader from '../ProfileHeader';
import './Notification.css';
import { myPosts } from '../../redux/actions/posts';
import { showMyNotifications } from '../../redux/actions/notificationAction';

function Notification(props) {
    useEffect(() => {
        props.dispatch(myPosts());
        props.dispatch(showMyNotifications());
    }, []);

    if (props.friends.notifications === undefined 
        || props.posts.notifications === undefined 
        || props.other.notifications === undefined 
        || props.user.notifications === undefined) {
        return <ProfileHeader router={props.history} />
    }
    
    return (
        <div className="container">
            <ProfileHeader router={props.history} />
            <ul>    
                {
                    props.posts.postPhotosNote.map((item, index) => {
                        return <li 
                                    className="text-white postPhotosLi" 
                                    key={index}
                                >
                                    <p className="ml-4 mb-3 mt-3">{item.notification} {item.time}</p>
                                    <img 
                                        
                                        className="postPhotoContent mb-4 ml-4" 
                                        src={'http://localhost:5000/' + item.content}
                                    />
                                </li>
                    })
                          
                }
            </ul>
            <ul>    
                {
                    props.notification.notifications.map((item, index) => {
                        return <li 
                                    className="text-white postPhotosLiUsers" 
                                    key={index}
                                >
                                    <img 
                                        className="postPhotoContentUser m-3" 
                                        src={'http://localhost:5000/' + item.myphoto} 
                                    />
                                    <p className="note_note">{item.notification} {item.time}</p>
                                    <img 
                                        className="postPhotoContentUser m-3" 
                                        src={'http://localhost:5000/' + item.otheruserphoto} 
                                    />
                                </li>
                    })
                          
                }
            </ul>
            <ul>    
                {
                    props.notification.notificationsFilter.map((item, index) => {
                        return <li 
                                    className="text-white postPhotosList" 
                                    key={index}
                                >
                                    <p className="ml-4 mb-3 mt-3">{item.notification} {item.time}</p>
                                    <img 
                                        className="postPhotoContent mb-4 ml-4" 
                                        src={'http://localhost:5000/' + item.myphoto} 
                                    />
                                </li>
                    })
                          
                }
            </ul>
        </div>
    )
}

export default connect(r => r) (Notification);