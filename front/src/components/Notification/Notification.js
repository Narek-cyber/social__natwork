import React from 'react';
import { connect } from 'react-redux';
import ProfileHeader from '../ProfileHeader';
import './Notification.css';

function Notification(props) {
    return (
        <div className="container">
            <ProfileHeader router={props.history} />
            <ul>    
                {
                    props.friends.notifications.map((item, index) => {
                        return <li className="text-white" key={index}>{item}</li>
                    })
                          
                }
            </ul>
            <ul>    
                {
                    props.posts.notifications.map((item, index) => {
                        return <li className="text-white" key={index}>{item}</li>
                    })
                          
                }
            </ul>
            <ul>    
                {
                    props.other.notifications.map((item, index) => {
                        return <li className="text-white" key={index}>{item}</li>
                    })
                          
                }
            </ul>
            <ul>    
                {
                    props.user.notifications.map((item, index) => {
                        return <li className="text-white" key={index}>{item}</li>
                    })
                          
                }
            </ul>
        </div>
    )
}

export default connect(r => r) (Notification);