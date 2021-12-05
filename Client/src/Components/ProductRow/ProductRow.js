import React, { useState } from 'react';
import './ProductRow.css'

const ProductRow = (props) => {
    const order = props.orderInfo;
    const [products, setProducts] = useState([]);
    var productArray = [];
    var total = 0;
    for (const product in order) {
       if (typeof (order[product]) === 'object'){
            total = total + Number(order[product].price);
            productArray.push(order[product]);
       }
        
    }

    return (
        <div className="viewOrders">
            <table className="review-product review-orders">
                <thead className="review-head">
                    <tr className="heading-row">
                        <th scope="col" className="review-heading" >Description</th>
                        <th scope="col" className="review-heading" >Quantity</th>
                        <th scope="col" className="review-heading" >Price</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        productArray?.map(product => (
                            <tr>
                                <td>{product.name}-{product.weight}</td>
                                <td>1</td>
                                <td>${product.price}</td>
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

    );
};

export default ProductRow;