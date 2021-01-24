import React, { useEffect } from 'react';
import './FriendsComponent.css';
import { connect } from 'react-redux';
import ProfileHeader from '../ProfileHeader';
import { 
    removeFriend, 
    ShowMyFriends 
} from '../../redux/actions/friendship';
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

    let friends = props.friends.myfriends.length === 0
        ?
            <h1 className="text-white text-center">Friends</h1>
        :
            <h1 className="text-white text-center">Friends {props.friends.myfriends.length}</h1>
    
    return (
        <div className="container">
           <ProfileHeader router={props.history} />
           {friends}
           <div className="row d-flex" id="result1">
                {
                    props.friends.myfriends
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                    .map((item, index) => {
                        if (item.photo === '') {
                            item.photo = 'c8fy0voke0ep4pi1597782921750default-avatar.jpg';
                        }
                        
                        return <div key={index} className="col-md-3 pt-4 text-center">
                                    <img src={"http://localhost:5000/" + item.photo} alt="" />
                                    <h4>{item.name} {item.surname}</h4>
                                    <button 
                                        className="btn btn-danger btn-sm rej mx-auto mb-3"
                                        onClick={() => props.dispatch(removeFriend(index, item.id))}
                                    >
                                        {
                                            item.isLoading && (
                                                <span   
                                                    className="spinner-border spinner-border-sm" 
                                                    role="status" 
                                                    aria-hidden="true"
                                                >
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

