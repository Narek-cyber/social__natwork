import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { changeOtherUserCommentInput, 
    closeOtherSlider, 
    nextOther, 
    prevOther, 
    share,
    showOtherCommentMessages,
    startOtherComment,
    sendOtherCommentMessage,
    like,
    dislike

} from '../../../redux/actions/otheruser';

// import { GetProfile } from '../../../redux/actions/user';
import "./OtherSlider.css";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";
const socket = socketIOClient(ENDPOINT);

function OtherSlider(props) {
    useEffect(() => {
        // props.dispatch(GetProfile(props.history));
        socket.on("takeOtherComment", (data) => props.dispatch(showOtherCommentMessages(data)));
        socket.on("newOtherComment", (data) => props.dispatch(showOtherCommentMessages(data)));
    }, []);

    if (!props.other.showSlider) {
        return <div></div>
    }

    // console.log(props.id);
    // console.log(props.other.index);

    let results = props.other.postPhotos[props.other.index].isLiked === undefined 
            ? 
                <i 
                    className="fa fa-heart-o text-white like mt-1" 
                    aria-hidden="true"
                    onClick={() => props.dispatch(like(postId))}
                >
                </i> 
            : 
                props.other.postPhotos[props.other.index].isLiked === true
            ?  <i 
                    className="fa fa-heart like mt-1" 
                    aria-hidden="true"
                    style={{ color: 'red' }}
                    onClick={() => props.dispatch(dislike(postId))}
                >
                </i>
            :        
                <i 
                    className="fa fa-heart-o text-white like mt-1" 
                    aria-hidden="true"
                    onClick={() => props.dispatch(like(postId))}
                >
                </i>

    // console.log(props.other.postPhotos[props.other.index].isLiked);
    
    let postId = null;
    let postContent = null;

    if (props.other.postPhotos === undefined) {
        postId = null;
        postContent = null;
    } else if (props.other.postPhotos[props.other.index] !== undefined) {
        postId =  props.other.postPhotos[props.other.index].id;
        postContent =  props.other.postPhotos[props.other.index].content;
    }

    return (
        <div id="content">
            <div className="cover"></div>
            <div className="messages messagesComment">
                    <ul>
                        {
                             props.other.comments.map((item, index) => {
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
                onClick={() => props.dispatch(closeOtherSlider())}
            >   x
            </button>
            <img src={'http://localhost:5000/' + props.other.current} />
            <div className="d-flex justify-content-center">
                <p className="text-white ttp text-center">{props.other.postText1}</p>
            </div>
            <div className="d-flex justify-content-center">
                <button 
                    className="btn" 
                    onClick={() => props.dispatch(prevOther())}
                >   prev
                </button>
                <button 
                    className="btn share" 
                    onClick={() => props.dispatch(share(props.other.index, props.id))}
                >   share
                </button>
                <button 
                    className="btn" 
                    onClick={() => props.dispatch(nextOther())}
                >   next
                </button>
                    {/* {
                        props.other.comments.map((item, index) => {
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
                    value={props.other.text}
                    onChange={(e) => props.dispatch(changeOtherUserCommentInput(e.target.value))}
                    onKeyDown={(e) => props.dispatch(sendOtherCommentMessage(e.key, props.id, postId, socket))}
                    onClick={() => props.dispatch(startOtherComment(props.id, props.other.index, postId, socket))}
                >
                </textarea>
                {/* {results} */}
            </div>
        </div>
    )
}

export default connect (r => r) (OtherSlider);