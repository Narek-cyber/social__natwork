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
                                className="nav-link head" 
                                to="/profile"
                                onClick={() => props.dispatch({ type: 'resetSearchInput' })}
                            >   
                                <i className="fa fa-user-circle-o mr-1" aria-hidden="true"></i>
                                Profile
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link head" 
                                to="/profile/settings"
                            >
                                <i className="fa fa-cog mr-1" aria-hidden="true"></i>   
                                Settings
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link head" 
                                to="/profile/requests"
                            >   
                                <i className="fa fa-circle mr-1" aria-hidden="true"></i>
                                Requests
                            </Link>
                          </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link head" 
                                to="/profile/friends"
                            >   
                                <i className="fa fa-users mr-1" aria-hidden="true"></i>
                                Friends
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link head" 
                                to="/profile/addpost"
                            >   
                                <i className="fa fa-file-image-o mr-1" aria-hidden="true"></i>
                                Add Post
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link head" 
                                to="/profile/myposts"
                            >   
                                <i className="fa fa-picture-o mr-1" aria-hidden="true"></i>
                                My Posts
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link head" 
                                to="/profile/messenger"
                            >   
                                <i className="fa fa-envelope mr-1" aria-hidden="true"></i>
                                Messenger
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link head" 
                                to="/profile/notification"
                            >   
                                <i className="fa fa-envelope-o mr-1" aria-hidden="true"></i>
                                Notification
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link 
                                className="nav-link text-danger" 
                                to="#" 
                                onClick={() => props.dispatch(logOut(props.router))}
                            >   
                                <i className="fa fa-sign-out" aria-hidden="true"></i>
                                Logout
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default connect (r => r) (ProfileHeader);