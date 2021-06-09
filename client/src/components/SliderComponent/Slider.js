import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { 
    myPosts, 
    closeSlider, 
    next, 
    prev, 
    deletePost, 
    changeCommentInput, 
    sendCommentMessage, 
    showCommentMessages, 
    startComment 
} from '../../redux/actions/posts';
// import { GetProfile } from '../../redux/actions/user';
import { share } from '../../redux/actions/otheruser';
import "./slider.css";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";
const socket = socketIOClient(ENDPOINT);

function Slider(props) {
    useEffect(() => {
        // props.dispatch(GetProfile(props.history, myPosts));
        props.dispatch(myPosts());
        socket.on("takeComment", (data) => props.dispatch(showCommentMessages(data)));
        socket.on("newComment", (data) => props.dispatch(showCommentMessages(data)));
    }, []);

    let postId = null;
    let postContent = null;
    let myId = null;

    if (props.posts.postPhotos === undefined) {
        postId = null;
        postContent = null;
        myId = null;
    } else if (props.posts.postPhotos[props.posts.index] !== undefined) {
        postId =  props.posts.postPhotos[props.posts.index].id;
        postContent =  props.posts.postPhotos[props.posts.index].content;
        myId = props.posts.postPhotos[0].user_id;
    }

    if (!props.posts.showSlider) {
        return <div></div>
    }

    return (
        <div id="content">
            <div className="cover"></div>
            <div className="messages messagesComment">
                    <ul>
                        {
                             props.posts.comments.map((item, index) => {
                                return <li key={index} className="commentContent">
                                            <p className="commentText">
                                                {item.comment}
                                            </p>
                                        </li>
                            })
                        }
                    </ul>
                </div>
            <button 
                className="close-btn" 
                onClick={() => props.dispatch(closeSlider())}
            >   x
            </button>
            <img src={'http://localhost:5000/' + props.posts.current} />
            <div className="d-flex justify-content-center">
                <p className="text-white ttp text-center">{props.posts.postText1}</p>
            </div>
            <div className="d-flex justify-content-center">
                <button 
                    className="btn" 
                    onClick={() => props.dispatch(prev())}
                >   prev
                </button>  
                <button 
                    className="btn share" 
                    onClick={() => props.dispatch(share(props.posts.index, myId))}
                >   share
                </button>              
                <button 
                    className="btn btn-primary del" 
                    onClick={() => props.dispatch(deletePost(props.posts.index, postId, postContent, props.posts))}
                >   delete
                </button>
                <button 
                    className="btn" 
                    onClick={() => props.dispatch(next())}
                >   next
                </button>
                    {/* {
                        props.posts.comments.map((item, index) => {
                            return <div key={index} className="commentContent">
                                        <p className="commentText">{item.comment}</p>
                                    </div>
                        })
                    } */}
                <textarea   
                    rows="1" 
                    cols="50" 
                    className="comment"
                    placeholder="comments..."
                    value={props.posts.text}
                    onChange={(e) => props.dispatch(changeCommentInput(e.target.value))}
                    onKeyDown={(e) => props.dispatch(sendCommentMessage(e.key, myId, postId, socket))}
                    onClick={() => props.dispatch(startComment(myId, props.posts.index, postId, socket ))}
                >
                </textarea>
            </div>
        </div>
    )
}

export default connect (r => r) (Slider);