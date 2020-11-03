import React from 'react'
import { Link } from 'react-router-dom';
import { logOut } from '../redux/actions/user';
import { connect } from 'react-redux';
import './Profile.css';

function ProfileHeader(props) {
    return (
        <div className="container sticky-top fixed-top">
            <div className="fly">
                <a href='#' className='dropbtn'>
                    <i className="fa fa-bars" aria-hidden="true"></i>
                </a>
                <div className='menu'>
                    <ul className="nav nav-justified mb-4 text-nowrap">
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/profile"
                                onClick={() => props.dispatch({ type: 'resetSearchInput' })}
                            >   Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/profile/settings"
                            >   Settings
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/profile/requests"
                            >   Requests
                            </Link>
                          </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/profile/friends"
                            >   Friends
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/profile/addpost"
                            >   Add Post
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/profile/myposts"
                            >   My Posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/profile/messenger"
                            >   Messenger
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link" 
                                to="/profile/notification"
                            >   Notification
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link text-danger" 
                                to="#" 
                                onClick={() => props.dispatch(logOut(props.router))}
                            >   Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default connect (r => r) (ProfileHeader);