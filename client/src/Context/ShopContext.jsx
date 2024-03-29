import React, { createContext, useEffect, useState } from 'react';
import allProducts from '../Components/Assets/all_product.js';

export const ShopContext = createContext(null);
export const getDefaultCart = () => {
    let cart = {};
    for (let i = 0; i < 300 + 1; i++) {
        cart[i] = 0;
    }
    return cart;
};

const ShopContextProvider = (props) => {

    const [allProducts, setAllProducts] = useState([]);
    const [loadingProducts, setLoadingProducts] = useState(true);
    // const [cartItems, setCartItems] = useState(getDefaultCart());
    const [cartProducts, setCartProducts] = useState([]);
    const [loadingCart, setLoadingCart] = useState(true);


    useEffect(()=>{
        fetch('http://localhost:4000/products')
        .then((response)=>response.json())
        .then((data)=>{
            setAllProducts(data)
            setLoadingProducts(false)
        })
        .catch(err=>{
            setLoadingProducts(false)
            console.log(err)
        });

        if(localStorage.getItem('auth-token')){
            console.log("OK");
            fetch('http://localhost:4000/cart', {headers:{'Authorization':`${localStorage.getItem('auth-token')}`}})
            .then((response)=>response.json())
            .then((data)=>{
                console.log(data)
                setCartProducts(data)
                setLoadingCart(false)
            })
            .catch(err=>{
                setLoadingCart(false)
                console.log(err)
            })
        }
    }, []);

    const addingProduct = (itemId) => {
        console.log("Connected");
        setCartProducts((prev) => {
            return {...prev, [itemId]: prev[itemId]+1};
        });
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/cart', {
                method:'POST',
                headers:{
                    Accept: 'application/form-data',
                    'Authorization':`${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({"productId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    };

    const removeFromCart = (itemId) => {
        setCartProducts((prev) => {
            return {...prev, [itemId]: prev[itemId]-1};
        });
        if(localStorage.getItem('auth-token')){
            fetch('http://localhost:4000/removefromcart', {
                method:'POST',
                headers:{
                    Accept: 'application/form-data',
                    'auth-token': `${localStorage.getItem('auth-token')}`,
                    'Content-Type': 'application/json',
                },
                body:JSON.stringify({"productId":itemId}),
            })
            .then((response)=>response.json())
            .then((data)=>console.log(data));
        }
    };

    const getTotalCartAmount = () => {
        let totalAmount = 0;
        for(const item in cartProducts) {
            if(cartProducts[item] > 0) {
                let itemInfo = allProducts.find((product) => product.id === Number(item));
                totalAmount += itemInfo.new_price * cartProducts[item];
            }
        }
        return totalAmount;
    }

    const getTotalCartItems = () => {
        let totalItem = 0;
        for(const item in cartProducts.data) {
            if(cartProducts.data[item] > 0) {
                totalItem += cartProducts[item];
            }
        }
        return totalItem;
    }
    const contextValue = {getTotalCartItems, getTotalCartAmount, allProducts, loadingProducts, cartProducts, loadingCart ,addingProduct, removeFromCart};

    return (
        <ShopContext.Provider value={contextValue}>
            {props.children}
        </ShopContext.Provider>
    )
};

export default ShopContextProvider;