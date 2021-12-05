import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen, faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import './ManageProduct.css'

const ManageProduct = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:4200/getAllProduct')
            .then(res => res.json())
            .then(data => setProducts(data))
    }, [])
    
    const handleDeleteProduct =(product)=>{
        const productId = product._id;
        fetch(`http://localhost:4200/delete/${productId}`)
        .then(res => res.json())
        .then(data => {
           console.log(data.deletedCount);
           const remainingProduct = products.filter(product =>{
               if(product._id !== productId){
                   return product._id;
               }
            })
            setProducts(remainingProduct);
        })
    
    }

    
    return (
        <div className="manage-product">
            <div className="heading">
                <h1>Manage Product</h1>
            </div>
              <div className="table-container">
              <table class="table table-borderless">
                <thead class="thead">
                    <tr className="tr">
                        <th scope="col">Product Name</th>
                        <th scope="col">Weight</th>
                        <th scope="col">Price</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                     { 
                     products?.map((product,index) =>(
                         <tr key={index} className="tr">
                             <td>{product.name}</td>
                             <td>{product.weight}</td>
                             <td>${product.price}</td>
                             <td><Button variant="success" style={{marginRight: "5px"}}><FontAwesomeIcon icon={faPen}/></Button> 
                             <Button variant="danger" onClick={()=>{handleDeleteProduct(product)}}><FontAwesomeIcon icon={faTrashAlt}/></Button>
                             </td>
                        </tr>
                     ))
                     }
                </tbody>
            </table>
              </div>
            
        </div>
    );
};

export default ManageProduct;