import React, { useEffect, useState } from 'react';
import ProductRow from '../../Components/ProductRow/ProductRow';
import './ShowOrder.css'

const ShowOrder = () => {
    const [orders, setOrders] = useState([]);
    useEffect(()=>{
        const email = sessionStorage.getItem('email');
        fetch(`http://localhost:4200/allOrder/${email}`)
        .then(res => res.json())
        .then(data => {
            setOrders(data);
            console.log(data);
        })
    },[])
    
    return (
        <div>
            <div className="orders-heading">
                <h3 >Your Orders</h3>
            </div>
            {
                orders?.map(order =>(
                    <ProductRow orderInfo = {order}></ProductRow>      
                ))
            }   
        </div>
    );
};

export default ShowOrder;