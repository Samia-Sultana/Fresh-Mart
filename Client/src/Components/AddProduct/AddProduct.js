import React from 'react';
import { useForm } from "react-hook-form";
import './AddProduct.css'
const Input = ({ label, register, required }) => (
    <>
        <label>{label}</label>
        <input {...register(label, { required })} />
    </>
);
const AddProduct = () => {
    const { register, handleSubmit } = useForm();
    const onSubmit = data =>{
        
        const formData = new FormData();
        formData.append('name',data.name);
        formData.append('price',data.price);
        formData.append('weight',data.weight);
        formData.append('photo',data.photo[0]);
        
        fetch('http://localhost:4200/addProduct',{
            method:'POST',
            body: formData
        })
        .then(res =>{
            console.log(res);
        })
  }
    return (
        <div className="addProduct">
            <div className="heading">
                <h1>Add product</h1>
            </div>
            <div className="productForm">
                <form onSubmit={handleSubmit(onSubmit)} className="product">
                    <div className="inputs">
                        <div>
                            <lebel for="name">Product name</lebel>
                            <input {...register("name")} />
                        </div>
                        <div>
                            <lebel for="weight">Weight</lebel>
                            <input {...register("weight")} />
                        </div>
                        <div>
                            <lebel for="price">Product price</lebel>
                            <input {...register("price")} />
                        </div>
                        <div>
                            <lebel for="photo">Add photo</lebel>
                            <input type="file" {...register("photo")} />
                        </div>
                    </div>
                    <input type="submit" className="save" />
                </form>
            </div>
        </div>
    );
};

export default AddProduct;