import React from 'react';
import { Link } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import './UserNavbar.css';
import catProfile from '../../images/cat-profile1.jpg';

const UserNavbar = () => {
    const sessionEmail = sessionStorage.getItem('email');
    return (
        <div className="user-navbar">
            <h2>Fresh Mart</h2>
            <div className="menu">
                <Link to="/">Home</Link>
                <Link to="/showOrder">Orders</Link>
                <Link to="/admin">Admin</Link>
                <Link to="/deal">Deals</Link>
                {
                    sessionEmail ? <img className="cat" src={catProfile} alt="user-profile-picture" />
                    : <Link to="/login"><Button variant="success">Login</Button></Link>
                }
            </div>

        </div>
    );
};

export default UserNavbar;