import React, { useEffect } from 'react';
import './MyPosts.css';
import { connect } from 'react-redux';
import ProfileHeader from '../ProfileHeader';
import { 
    myPosts, 
    openSlider 
} from '../../redux/actions/posts';
// import { GetProfile } from '../../redux/actions/user';
import Slider from '../SliderComponent/Slider';

function MyPosts(props) {
    useEffect(() => {
        // props.dispatch(GetProfile(props.history));
        props.dispatch(myPosts());
    }, []);

    return (
        <div className="container">   
            <ProfileHeader router={props.history} />
            <div className="row">
                {
                    props.posts.postPhotos.map((item, index) => {
                        return <div 
                                    key={index} 
                                    className="col-md-4 mb-5 hb" 
                                    onClick={() => props.dispatch(openSlider(index))}
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
            <Slider />
        </div>
    )
}

export default connect (r => r) (MyPosts);