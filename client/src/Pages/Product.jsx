import React, { useContext, useEffect, useState } from 'react'
import { Item } from '../Components/Item/Item.jsx'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../Context/ShopContext'

export const Product = () => {
  const {allProducts, loadingProducts, addingProduct} = useContext(ShopContext)
  // const [allProducts, setAllProducts] = useState([]);
  // const [loading, setLoading] = useState(true);
  // useEffect(()=>{
  //   fetch('http://localhost:4000/products')
  //   .then((response)=>response.json())
  //   .then((data)=>{
  //       setAllProducts(data)
  //       setLoading(false)
  //     })
      
  //     .catch(err=>{
  //       console.log(err)
  //       setLoading(false)
  //     });
  // }, [])
  const { productId } = useParams();
  // console.log(allProducts);
  const product = !loadingProducts?allProducts.data.find((e) => e._id === productId):null;

  const addToCart = (e) => {
    const productId = e.currentTarget.querySelector('input[name="id"]').value;
    console.log("Product ID:", productId);
    console.log(localStorage.getItem('auth-token'));
    addingProduct(productId);
    // if(localStorage.getItem('auth-token')){
    //   fetch('http://localhost:4000/cart', {
    //       method:'POST',
    //       headers:{
    //           Accept: 'application/form-data',
    //           'Authorization':`${localStorage.getItem('auth-token')}`,
    //           'Content-Type':'application/json',
    //       },
    //       body:JSON.stringify({'productId':productId}),
    //   })
    // }
  };

  if (product){
  return (
    <div>
    <Item  
      product={product}
      isDetail={true}
      addToCart={addToCart}
    />
    </div>
    )
  } else{
    return null
  }
}
