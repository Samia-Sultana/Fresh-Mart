import React from 'react';
import { useHistory } from 'react-router';
import AddProduct from '../AddProduct/AddProduct';
import AdminNavbar from '../AdminNavbar/AdminNavbar';
import ManageProduct from '../ManageProduct/ManageProduct';
import './Admin.css'

const Admin = () => {
    const {location} = useHistory();
    return (
        <div className="admin">
            <div className="adminNavbar">
                <AdminNavbar></AdminNavbar>
            </div>
            <div className="conditionalRoute">
                {
                    location.pathname === '/manage' ? <ManageProduct></ManageProduct>
                    : <AddProduct></AddProduct> 
                }
            </div>
        </div>
    );
};

export default Admin;