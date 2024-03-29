import React, { useState } from 'react'
import './AddProduct.css'
import uploadArea from '../../assets/upload_area.svg'

const AddProduct = () => {
    const API = 'http://localhost:4000/add-product'
    
    const [image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name:'',
        image:'',
        price:'',
        description:''
    }); 

    const imageHandler = (e) => {
        setImage(e.target.files[0]);
    }
    const changeHandler = (e) => {
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }

    const addProduct = async () => {
        console.log(productDetails);
        let product = productDetails;
        // const fileInput = document.getElementById('file-input') ;
        // console.log(fileInput.files[0]);
        let responseData;

        let formData = new FormData();

        formData.append('image', image);
        formData.append('name', productDetails.name);
        formData.append('price', productDetails.price);
        formData.append('description', productDetails.description);
        console.log(formData.get('file'));
        await fetch(API, {
            method:'POST',
            // headers: {
            //     'Accept': 'application/json',
            //     'Content-Type': 'multipart/form-data'
            // },
            body:formData,
        })
        .then((resp)=>{return resp.json()})
        .then((data)=>{
            console.log(data);
        })
        .catch((err)=>{
            console.log("Error from here");
            console.log(err);
        })
    }

  return ( 
    <div className='add-product'>
        <div className='addproduct-itemfield'>
            <p>Product title</p>
            <input value={productDetails.name} onChange={changeHandler} type='text' name='name' placeholder='Type here' />
        </div>
        <div className='addproduct-price'>
            <div className='addproduct-itemfield'>
                <p>Price</p>
                <input value={productDetails.price} onChange={changeHandler} type='text' name='price' placeholder='Type here' />
            </div>
        </div>
        <div className='addproduct-itemfield'>
            <p>Description</p>
            <textarea name="description" id="description" rows="5" onChange={changeHandler} value={productDetails.description}/>
        </div>
        <div className='addproduct-itemfield'>
            <label htmlFor='file-input'>
                <img src={image?URL.createObjectURL(image):uploadArea} className='addproduct-thumbnail-img' alt='' />
            </label>
            <input onChange={imageHandler} type='file' name='image' id='file-input' hidden/>
        </div>
        <button onClick={() => {addProduct()}} className='addproduct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct