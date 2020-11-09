import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import './RequestsComponent.css';
import ProfileHeader from '../ProfileHeader';
import { 
    myRequests, 
    rejectFriend, 
    acceptFriend 
} from '../../redux/actions/friendship';
import { GetProfile } from '../../redux/actions/user';

function Requests(props) {
    useEffect(() => {
        props.dispatch(GetProfile(props.history, myRequests));
        // props.dispatch(myRequests());
    }, []);

    let requests = props.friends.myrequests.length === 0
        ?
            <h1 className="text-white text-center">Requests</h1>
        :
            <h1 className="text-white text-center">Requests {props.friends.myrequests.length}</h1>


    return (
        <div className="container">
           <ProfileHeader router={props.history} />
            {requests}
            <div className="row d-flex" id="result1">
                {
                    props.friends.myrequests.map((item, index) => {
                        if (item.photo === '') {
                            item.photo = 'c8fy0voke0ep4pi1597782921750default-avatar.jpg' 
                        }
                        return <div key={index} className="col-md-3 pt-4 text-center">
                                    <img 
                                        src={"http://localhost:5000/" + item.photo} 
                                        alt="" 
                                    />
                                    <h4>{item.name} {item.surname}</h4>
                                    <button 
                                        className="btn btn-success btn-sm acc mx-auto mb-3" 
                                        onClick={() => props.dispatch(acceptFriend(index, item.id))}
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
                                            Accept
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm rej mx-auto mb-3" 
                                        onClick={() => props.dispatch(rejectFriend(index, item.id))}
                                    >
                                            {
                                                item.isLoading1 && (
                                                    <span   
                                                        className="spinner-border spinner-border-sm" 
                                                        role="status" 
                                                        aria-hidden="true"
                                                    >
                                                    </span>
                                                )
                                            }
                                            Reject
                                    </button>
                                </div>
                    })
                }
            </div>
        </div>
    )
}

export default connect(r => r) (Requests);