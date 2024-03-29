import React, { useState, useEffect } from 'react'
import './ListProduct.css'
import crossIcon from '../../assets/cross_icon.png'
// Add cross logo and fetch to delete item.

const ListProduct = () => {
    const APIPRODUCTS = 'http://localhost:4000/products';
    const APIREMOVE = 'http://localhost:4000/product/';
    const base = "http:\\\\localhost:4000\\";
    const [allproducts, setAllProducts] = useState();
    
    const fetchInfo = async () =>{
        await fetch(APIPRODUCTS)
        .then((res) => {
            return res.json()
        })
        .then((data) => {
            console.log(data);
            return setAllProducts(data);
        })
        .catch(err=>{
            console.log(err);
        })
    };

    useEffect(() => {
        fetchInfo();
    }, []);

    const removeProduct = async (id) => {
        console.log(APIREMOVE+id);
        await fetch(APIREMOVE+id, {
            method: 'DELETE',
            headers: {
                Accept: 'application/json',
                'Content-Type':'application/json',
            },
        })
        await fetchInfo();
    }

  return (
    <div className='list-product'>
        <h1>All Products List</h1>
        <div className='listproduct-format-main'>
            <p>Products</p>
            <p>Title</p>
            <p>Price</p>
            <p>Description</p>
            <p>Remove</p>
        </div>
        <div className='listproduct-allproducts'>
            <hr />
            {allproducts ? allproducts.data.map((product, i) => {
                return (
                    <div key={i} className='listproduct-format-main listproduct-format'>
                        <img src={base+product.imageURL} className='listproduct-product-icon' alt='error'/>
                        <p>{product.title}</p>
                        <p>${product.price}</p>
                        <p>{product.description}</p>
                        <img onClick={()=>{removeProduct(product._id)}} className='listproduct-remove-icon' src={crossIcon} alt=''/>
                    </div>                    
                )
            }) : null}
        </div>
    </div>
  )
}

export default ListProduct