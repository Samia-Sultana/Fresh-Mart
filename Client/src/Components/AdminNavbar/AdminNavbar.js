import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTasks, faPlus,faPenFancy } from '@fortawesome/free-solid-svg-icons'
import './AdminNavbar.css'

const AdminNavbar = () => {

    return (
        <div className="navigation">
            <div className="nav-heading">
                <h2>FRESH MART</h2>
            </div>
            <div className="nav-items">
                <Link to="/manage" className="item"> <FontAwesomeIcon icon={faTasks} /> Manage Product</Link>
                <Link to="/admin" className="item"><FontAwesomeIcon icon={faPlus} /> Add Product</Link>
                <Link to="/editProduct" className="item"> <FontAwesomeIcon icon={faPenFancy} /> Edit Product</Link>
            </div>

        </div>
    );
};

export default AdminNavbar;