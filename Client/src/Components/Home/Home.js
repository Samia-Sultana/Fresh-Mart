import React, { useContext } from 'react';
import { useEffect, useState } from 'react';
import { SelectedProduct } from '../../App';
import Product from '../Product/Product';
import './Home.css';

const HomePage = () => {
    console.log(sessionStorage.getItem('email'))
    const [selectedProducts, setSelectedProducts] = useContext(SelectedProduct);
    const [products, setProducts] = useState([]);
    useEffect(() =>{
        fetch('http://localhost:4200/get12Product')
        .then( res => res.json())
        .then( data => {
            console.log(data);
           setProducts(data);
        });
    },[])

    const handleBuyNow = (product) =>{
        const newProducts = [...selectedProducts,product];
        setSelectedProducts(newProducts);
    }
    return (
            <div className="home-container">
            {
                products?.map(product =>(
                    <Product productInfo = {product} handleBuyNow={handleBuyNow}></Product>
                ))
            }
            </div>
    );
};

export default HomePage;