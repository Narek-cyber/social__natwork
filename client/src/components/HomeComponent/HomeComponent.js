import React from 'react';
import './HomeComponent';
import { connect } from 'react-redux';
import LoginHeader from '../LoginHeader';

function HomeComponent(){
    return (
        <div>   
            <LoginHeader />
            <h1 className="text-white text-warning display-1 text-center">
                Social Network ...
            </h1>      
        </div>
    )
}

export default connect(r => r) (HomeComponent);