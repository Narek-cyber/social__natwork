import React, { useEffect } from 'react';
import './ProfileComponent.css';
import { connect } from 'react-redux';
import { GetProfile } from '../../redux/actions/user';
import ProfileHeader from '../ProfileHeader';
import SearchComponent from '../SearchUsersComponent/SearchComponent';
import { openMyMessanger } from '../../redux/actions/user';
import { openUserMessanger1 } from '../../redux/actions/otheruser';

function Profile(props) {
    useEffect(() => {       
        props.dispatch(GetProfile(props.history));
    }, []);

    let photo = null;
    
    // console.log(props.user.notifications);

    if (props.user.profile.photo === null) {
        photo = "http://localhost:5000/c8fy0voke0ep4pi1597782921750default-avatar.jpg"
    }

    else if (props.user.profile.photo !== "") {
        photo = "http://localhost:5000/" + props.user.profile.photo;
    }

    return (
        <div>
           <ProfileHeader router={props.history} />
           <div className='container'>
                <div className="card">
                    <img 
                        className="profile-pic" 
                        src={photo} 
                    />
                    <div className="card-body">
                        <h6 className="card-title text-center">
                            {props.user.profile.name} {props.user.profile.surname}
                        </h6>
                    </div>
                </div>
                <button 
                    style={{ fontSize: '15px' }} 
                    className="btn btn-sm mt-3 btn-primary messanger"
                    onClick={() => props.dispatch(openUserMessanger1(props.history, props.user.myId))}
                >   Messanger 
                    <i className="fa fa-envelope ml-1" aria-hidden="true"></i>
                </button>   
                <p className="text-danger searcherr">{props.friends.error}</p>
                <SearchComponent />
            </div>
        </div>
    )
}

export default connect(r => r) (Profile);