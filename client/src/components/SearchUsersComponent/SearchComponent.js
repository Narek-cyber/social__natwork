import React, { useEffect } from 'react';
import "./searchComponent.css";
import { connect } from 'react-redux';
import { 
    searchText, 
    friendship, 
    cancelRequest, 
    unfriend 
} from '../../redux/actions/friendship';
import { Link } from 'react-router-dom';

function SearchComponent(props) {
    useEffect(() => {
        // props.dispatch(GetProfile(props.history));
        return () => {
            props.dispatch({ type: 'resetSearchInput' })
        }
    }, []);
    
    const results = props.friends.searchedUsers.length === 0 
        ? 
            <p></p>
        : 
            <p className="text-white">{props.friends.searchedUsers.length} results</p>

    const spinner = props.friends.isLoading === false
        ?
            <span></span>
        :
            <div className="spinner-grow text-primary" role="status">
                <span className="sr-only">Loading...</span>
            </div>

    return (
        <div className="searchSector">
            <h1 className="text-white">SEARCH USERS</h1>
            <input  
                type="text"
                className="form-control" 
                placeholder="Search" 
                value={props.friends.searchText}
                onChange={(e) => props.dispatch(searchText(e.target.value, props.friends))} 
            />
            {results}
            <div className='row d-flex justify-content-between' id="result">
                {spinner}
                {
                    props.friends.searchedUsers
                    .sort((a, b) => a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1)
                    .map((item, index) => {
                    
                        let addFriendButton = null;

                        if (item.isRequestSent.length > 0) {
                            addFriendButton = 
                            <button 
                                className="btn btn-light btn-sm" 
                                onClick={() => props.dispatch(cancelRequest(index, item.id))}
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
                                    Cancel Request
                            </button>
                        } else if (item.areWeFriends[0].qanak > 0) {
                            addFriendButton = 
                            <button 
                                className="btn btn-danger btn-sm" 
                                onClick={() => props.dispatch(unfriend(index, item.id))}
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
                                    Unfriends
                            </button>
                        } else if (item.areWeFriends[0].qanak === 0) {
                            addFriendButton = 
                            <button 
                                className="btn btn-info btn-sm mx-auto" 
                                onClick={() => props.dispatch(friendship(item.id))}
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
                                    Add Friend
                            </button>
                        }

                        if (item.photo === '' || item.photo === null || item.photo === undefined) {
                            item.photo = 'c8fy0voke0ep4pi1597782921750default-avatar.jpg'; 
                        }

                        return  <div 
                                    key={index} 
                                    className="col-md-3 m-3 mx-auto text-center"   // col-md-4
                                >
                                    <img 
                                        src={"http://localhost:5000/" + item.photo} 
                                        alt="" 
                                    />
                                    <h4>{item.name} {item.surname}</h4>
                                    {addFriendButton}
                                    <Link 
                                        className="mx-auto p-3 mb-2 bg-gradient-primary ttr" 
                                        to={"/user/profile/" + item.id}>
                                        Show Profile
                                    </Link>
                                </div>
                    })
                }
            </div>
        </div>
    )
}

export default connect(r => r) (SearchComponent);