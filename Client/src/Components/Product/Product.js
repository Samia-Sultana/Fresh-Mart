import React from 'react';
import './Product.css';
import {Card, Button} from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Product = (props) => {
    const {name, weight, price, photo} = props.productInfo;
    
    return (
        <Card className="card">
            <Card.Img variant="top" src={photo} className="cardImg" />
            <Card.Body className="cardBody">
                <Card.Title>{name}-{weight}</Card.Title>
                <div className="priceAndBtn">
                    <Card.Text className="price">${price}</Card.Text>
                    <Link to="/reviewOrder">
                    <Button variant="success" className="buy" onClick={() => props.handleBuyNow(props.productInfo)}>Buy now</Button>
                    </Link>
                </div> 
            </Card.Body>
        </Card>
    );
};

export default Product;