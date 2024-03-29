import React, { useContext, useEffect, useState } from 'react'
import './css/ShopCategory.css'
import { Item } from '../Components/Item/Item.jsx'
import { ShopContext } from '../Context/ShopContext'
// import dropdownIcon from '../Components/Assets/dropdown_icon.png'

export const ShopCategory = (props) => {
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

  return (
    <div className='shop-category'>
      <div className='shopcategory-products'>
        {!loadingProducts ? allProducts.data.map((item, i) => {
          return (
            <Item 
              key={i} 
              product={item}
              isDetail={false}
              addToCart={addToCart}
            />
          )
        }):null}
      </div>
    </div>
  )
}
