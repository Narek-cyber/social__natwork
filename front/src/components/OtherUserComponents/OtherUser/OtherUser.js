import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './OtherUser.css';
import { 
    otherUser, 
    OtherUserPosts, 
    openOtherSlider, 
    openUserMessanger,
    OtherUserFriends,
    friendship1,
    cancelRequest1,
    unfriend1
} from '../../../redux/actions/otheruser';
// import { GetProfile } from '../../../redux/actions/user';
import OtherSlider from '../OtherSlider/OtherSlider';
import ProfileHeader from '../../ProfileHeader';
// import { startChat } from '../../../redux/actions/messenger';
import { AllUsers } from '../../../redux/actions/user';

import socketIOClient from "socket.io-client";

const ENDPOINT = "http://127.0.0.1:5000";
const socket = socketIOClient(ENDPOINT);


function OtherUserProfile(props) {
    let id = props.match.params.id;

    useEffect(() => {
        // props.dispatch(GetProfile(props.history));
        let key = sessionStorage.currentUser;
        props.dispatch(otherUser(id, key, props.history));
        props.dispatch(OtherUserPosts(id));
        props.dispatch(OtherUserFriends(id));
        props.dispatch(AllUsers());
    }, []);

    let photo = null;

    // props.user.allusers
    // .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)

    // let index = 0;

    // for (let i = 0; i < props.user.allusers.length; i++) {
    //     if (props.user.allusers[i].id == id) {
    //         index = i
    //     }
    // }

    let friendsCount = props.other.otherUserFriends.length > 0
        ?
            props.other.otherUserFriends.length
        : 
            null

    let postsCount = props.other.postPhotos.length > 0
        ?
            props.other.postPhotos.length 
        : 
            null


    
    if (props.other.otherUsersProfile.photo !== undefined) {
        photo = "http://localhost:5000/" + props.other.otherUsersProfile.photo;
    }

    if (props.other.otherUsersProfile.photo === "") {
        photo = "http://localhost:5000/c8fy0voke0ep4pi1597782921750default-avatar.jpg"
    }

    return (
        <div className="result">
            <ProfileHeader router={props.history} />
               <div className='container'>
                    <div className="card">
                        <img 
                            className="profile-pic" 
                            src={photo} 
                        />
                        <div className="card-body">
                            <h6 className="card-title text-center">
                                {props.other.otherUsersProfile.name} {props.other.otherUsersProfile.surname}
                            </h6>
                        </div>
                    </div>
                    <button 
                        style={{ fontSize: '15px' }} 
                        className="btn btn-sm mt-3 btn-primary messanger"
                        // onClick={()=>props.dispatch(startChat(id, index, socket, props))}
                        onClick={() => props.dispatch(openUserMessanger(props.history, id))}
                    >   Messanger 
                        <i className="fa fa-envelope ml-1" aria-hidden="true"></i>
                    </button>
                    <p className="text-danger searcherr">{props.other.error}</p>
                    <h1 className="text-center" style={{ color: 'darkcyan' }}>Friends {friendsCount}</h1>  
                    <div className="friendsCarcass"> 
                        <div className="row d-flex" id="result1">
                            {
                                props.other.otherUserFriends.map((item, index) => {
                                    if (item.photo === '') {
                                        item.photo = 'c8fy0voke0ep4pi1597782921750default-avatar.jpg';
                                    }

                                    let addFriendButton = null;

                                    if (item.isRequestSent.length > 0) {
                                        addFriendButton = 
                                        <button 
                                            className="btn btn-light btn-sm" 
                                            onClick={() => props.dispatch(cancelRequest1(index, item.id))}
                                        >
                                                {
                                                    item.isLoading && (
                                                        <span   className="spinner-border spinner-border-sm" 
                                                                role="status" 
                                                                aria-hidden="true">
                                                        </span>
                                                    )
                                                }
                                                Cancel Request
                                        </button>
                                    } else if (item.areWeFriends[0].qanak > 0) {
                                        addFriendButton = 
                                        <button 
                                            className="btn btn-danger btn-sm" 
                                            onClick={() => props.dispatch(unfriend1(index, item.id))}
                                        > 
                                                {
                                                    item.isLoading && (
                                                        <span   
                                                            className="spinner-border spinner-border-sm" 
                                                            role="status" 
                                                            aria-hidden="true">
                                                        </span>
                                                    )
                                                }
                                                Unfriends
                                        </button>
                                    } 
                                    else if (item.areWeFriends[0].qanak === 0) {
                                        addFriendButton = 
                                        <button 
                                            className="btn btn-info btn-sm mx-auto" 
                                            onClick={() => props.dispatch(friendship1(item.id))}
                                        > 
                                                {
                                                    item.isLoading && (
                                                        <span   
                                                            className="spinner-border spinner-border-sm" 
                                                            role="status" 
                                                            aria-hidden="true">
                                                        </span>
                                                    )
                                                }
                                                Add Friend
                                        </button>
                                    }

                                    return <div key={index} className="col-md-3 pt-4 text-center mb-3">
                                                <img src={"http://localhost:5000/" + item.photo} alt="" />
                                                <h4>{item.name} {item.surname}</h4>
                                                {addFriendButton}
                                            </div>
                                })
                            }
                        </div> 
                    </div>
                    <h1 className="text-center" style={{ color: 'mediumpurple' }}>Posts {postsCount}</h1>
                    <div className="postCarcass"> 
                        <div className="row mt-5 col-md-8">
                            {
                                props.other.postPhotos.map((item, index) => {
                                    return <div 
                                                key={index} 
                                                className="col-md-4 mb-5 hb" 
                                                onClick={() => props.dispatch(openOtherSlider(index))}
                                            >
                                                <div className="z">
                                                    <img    
                                                        src={"http://localhost:5000/" + item.content} 
                                                        alt="" 
                                                        className="postsImg" 
                                                    />
                                                    <p className="text-white">{item.text}</p>
                                                </div>
                                            </div>
                                })
                            }
                        </div>
                        <OtherSlider id={id} />
                    </div> 
                </div>
            </div>
        )
}

export default connect(r => r) (OtherUserProfile);