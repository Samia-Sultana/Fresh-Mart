import React from 'react';
import { useContext } from 'react';
import Button from 'react-bootstrap/Button';
import { useHistory } from 'react-router';
import { SelectedProduct } from '../../App';
import './ReviewOrder.css';

const ReviewOrder = () => {
    const [selectedProducts, setSelectedProducts] = useContext(SelectedProduct);
    const path = useHistory();
    let total = 0;
    for( var i=0;i<selectedProducts.length;i++){
        total = total + Number(selectedProducts[i].price);
    }
    const handleCheckOut = () =>{
        const orderInfo = {...selectedProducts,email: sessionStorage.getItem('email')};
        fetch('http://localhost:4200/placeOrder',{
            method:'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderInfo)
        })
        .then(res => res.json())
        .then(data => {
            setSelectedProducts([]);
            path.replace('/');
        })
    }
    return (
        <div className="reviewOrder">
            <div className="heading">
                <h1>Checkout</h1>
            </div>
            <div className="review-table">
                <table className="review-product">
                    <thead className="review-head">
                        <tr className="heading-row">
                            <th scope="col" className="review-heading" >Description</th>
                            <th scope="col" className="review-heading" >Quantity</th>
                            <th scope="col" className="review-heading" >Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            selectedProducts?.map((product, index) => (
                                <tr key={index}>
                                    <td className="td">{product.name}-{product.weight}</td>
                                    <td className="td">1</td>
                                    <td className="td">${product.price}</td>
                                </tr>
                            ))
                        }
                        <tr className="total-row">
                            <td className="td">Total</td>
                            <td className="td"></td>
                            <td className="td">${total}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            <div className="checkout-btn">
            <Button variant="success" className="checkout" onClick={handleCheckOut}>Checkout</Button>
            </div>
        </div>
    );
};

export default ReviewOrder;