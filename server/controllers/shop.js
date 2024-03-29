const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const Product = require('../models/product.js');
const Order = require('../models/order.js');


exports.getProducts = (req, res, next) => {
    Product
    .find({})
    .then((products) => {
        res.json({"data":products});
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
};

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product
    .findById(prodId)
    .then((result) => {
        res.json({"data":result});
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
};

exports.getCart = (req, res, next) => {
    let cart;
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.httpStatusCode = 401;
        throw error;
    }
    let token = authHeader.split(' ');
    if(token.length > 1){
        token = token[1];
    } else{
        token = token[0];
    }
    // console.log(token);
    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret');
    } catch (err) {
        err.httpStatusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.httpStatusCode = 401;
        throw error;
    }
    // console.log(decodedToken);
    User.findById(decodedToken.userId)
    .then(result=>{
        cart = result.cart;
        res.json({'data':cart});
    })
    .catch(err=>{
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
}
exports.postCartAddProduct = (req, res, next) => {
    console.log("ADDING PRODUCT");
    const authHeader = req.get('Authorization');
    if (!authHeader) {
        const error = new Error('Not authenticated');
        error.httpStatusCode = 401;
        throw error;
    }
    let token = authHeader.split(' ');
    if(token.length > 1){
        token = token[1];
    } else{
        token = token[0];
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, 'secret');
        console.log("SUCCESS");
    } catch (err) {
        err.httpStatusCode = 500;
        throw err;
    }
    if (!decodedToken) {
        const error = new Error('Not authenticated.');
        error.httpStatusCode = 401;
        throw error;
    }
    
    const prodId = req.body.productId;
    Product
      .findById(prodId)
      .then(product => {
        if (!product){
            const error = new Error("Product not found");
            error.httpStatusCode = 500;
            return next(error); 
        }
        User.findById(decodedToken.userId)
        .then(user=>{
            user.addToCart(product);
            cart = user.cart;
        })
      })
      .catch(err=>{
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);        
      })
}