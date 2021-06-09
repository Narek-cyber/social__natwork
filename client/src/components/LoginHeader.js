import React from 'react'
import { Link } from 'react-router-dom';

function LoginHeader() {
    return (
        <nav className="navbar navbar-expand-sm">
            <ul className="navbar-nav">
                <li className="nav-item">
                    <Link 
                        className="nav-link text-white" 
                        to="/login"
                    >Login
                    </Link>
                </li>
                <li className="nav-item">
                    <Link 
                        className="nav-link text-white" 
                        to="/signup"
                    >Signup
                    </Link>
                </li>
            </ul>
        </nav>
    )
}

export default LoginHeader;