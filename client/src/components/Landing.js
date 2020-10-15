import React from 'react';
import { Link } from 'react-router-dom';

const Landing = () => {
    return (
        <div className="jumbotron mt-5">
            <h1>Welcome to Todo City</h1>
            <p>Sign In and start hacking your todo list</p>
            <Link to="/login" className="btn btn-primary">
                Login
            </Link>
            <Link to="/register" className="btn btn-primary ml-5">
                Register
            </Link>
        </div>
    );
};

export default Landing;
