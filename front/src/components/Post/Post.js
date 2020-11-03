import React, { useEffect, useState } from 'react';
import './Post.css';
import { connect } from 'react-redux';
import ProfileHeader from '../ProfileHeader';
import { searchPost, postGo } from '../../redux/actions/posts';
// import { GetProfile } from '../../redux/actions/user';

function AddPost(props) {
    useEffect(() => {
        // props.dispatch(GetProfile(props.history));
    }, []);

    const button = props.posts.isLoading === false
        ?      
            <span></span>
        :   
            <span   
                className="spinner-border spinner-border-sm" 
                role="status" 
                aria-hidden="true">
            </span>

    const [file, setFile] = useState(null);
        
    const fileHandler1 = (e) => {
        setFile(e.target.files[0]);
    }

    return (
        <div className="container">   
           <ProfileHeader router={props.history} />
            <div className="form-group">
                <textarea   
                    rows="5" 
                    cols="60" 
                    placeholder="Enter your post"
                    className="enterPost"
                    value={props.posts.postText}
                    onChange={(e) => props.dispatch(searchPost(e.target.value))}
                >
                </textarea>
            </div>
            <form 
                id="mypost" 
                method="post" 
                encType="multipart/form-data" 
                className="p1 form-group" 
                onChange={fileHandler1}>
                <input 
                    type="file" 
                    name="nkar" />
                <button 
                    type="button"
                    className="btn btn-success btn-sm d-block mt-3"
                    onClick={() => props.dispatch(postGo(props.history, props.posts.postText))}
                >   {button}
                    POST
                </button>
            </form>
            {file && (<img src={URL.createObjectURL(file)} alt={file.name} className="imagePreview1" />)}
        </div>
    )
}

export default connect(r => r) (AddPost);