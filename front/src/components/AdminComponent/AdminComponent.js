import React, { useEffect } from 'react';
import './AdminComponent.css';
import { connect } from 'react-redux';
import ProfileHeader from '../ProfileHeader';
import { GetProfile } from '../../redux/actions/user';
import { 
    adminAllUsers, 
    Block, 
    Unblock 
} from '../../redux/actions/admin';
import SearchComponent from '../SearchUsersComponent/SearchComponent';

function Admin(props) {
    useEffect(() => {
        props.dispatch(GetProfile(props.history));
        props.dispatch(adminAllUsers());
    }, []);

    let photo = null;
    
    if (props.user.profile.photo !== "") {
        photo = "http://localhost:5000/" + props.user.profile.photo;
    }

    else if(props.user.profile.photo === "") {
        photo = "http://localhost:5000/c8fy0voke0ep4pi1597782921750default-avatar.jpg"
    }

    return (
        <div>
            <ProfileHeader router={props.history} />
            <div className='container'>
                <div className="row">
                <div className="col-md-6">
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
                    <p className="text-danger searcherr">{props.friends.error}</p>
                    <SearchComponent />
                    </div>
                    <div className="col-md-6">
                        <h1 className="text-white text-center">Users List</h1>
                        <table className="table table-dark table-bordered position-relative">
                            <thead>
                                <tr>
                                    <th>name</th>
                                    <th>surname</th>
                                    <th>actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    props.adminuser.admin.allusers.map((item, index) => {
                                        let blockButton = null;
                                        if (item.block_status === 1) {
                                            blockButton = 
                                                <button 
                                                    className="btn btn-warning btn-sm shadow-none position-absolute" 
                                                    onClick={() => props.dispatch(Block(item.id, props.adminuser.admin))}
                                                >   Blocked
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
                                                </button>
                                        } else if (item.block_status === 0) {
                                            blockButton = 
                                            <button 
                                                className="btn btn-danger btn-sm shadow-none position-absolute" 
                                                onClick={() => props.dispatch(Unblock(item.id, props.adminuser.admin))}
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
                                                Unblocked
                                            </button>
                                        }
                                        return <tr key={index}>
                                            <td>{item.name}</td>
                                            <td>{item.surname}</td>
                                            <td>
                                                {blockButton}
                                            </td>
                                        </tr>
                                    })
                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default connect(r => r) (Admin);