import React, { useEffect } from 'react';
import './FriendsComponent.css';
import { connect } from 'react-redux';
import ProfileHeader from '../ProfileHeader';
import { removeFriend, ShowMyFriends } from '../../redux/actions/friendship';
import { GetProfile } from '../../redux/actions/user';

function Friends(props) {
    useEffect(() => {
        props.dispatch(GetProfile(props.history, ShowMyFriends));
        // props.dispatch(ShowMyFriends());
    }, []);

    const remove = props.friends.isLoading6 === false
        ?
            <span></span>
        :
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>
    
    return (
        <div className="container">
           <ProfileHeader router={props.history} />
           <h1 className="text-white text-center">Friends {props.friends.myfriends.length}</h1>
           <div className="row d-flex justify-content-between" id="result1">
                {
                    props.friends.myfriends.map((item, index) => {
                        if (item.photo === '') {
                            item.photo = 'c8fy0voke0ep4pi1597782921750default-avatar.jpg';
                        }
                        return <div key={index} className="col-md-3 m-3 text-center">
                                    <img src={"http://localhost:5000/" + item.photo} alt="" />
                                    <h4>{item.name} {item.surname}</h4>
                                    <button 
                                        className="btn btn-danger btn-sm rej mx-auto"
                                        onClick={() => props.dispatch(removeFriend(index, item.id))}
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
                                        Delete
                                    </button>
                                </div>
                    })
                }
            </div>
        </div>
    )
}

export default connect(r => r) (Friends);

