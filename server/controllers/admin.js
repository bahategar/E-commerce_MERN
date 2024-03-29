const Product = require('../models/product.js');
const fs = require('fs');
// const path = require('path');
// const { validationResult } = require('express-validator');


exports.postAddProduct = (req, res, next) => {
    const {name, price, description} = req.body;
    const image = req.file;
    const imageUrl = image.path;
    const product = new Product({
        title: name,
        imageURL: imageUrl,
        price: price,
        description:description,
    })
    product
    .save()
    .then(result => {
        res.json({message: 'Success'});
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    })
};

exports.deleteProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.findById(prodId)
    .then(product => {
      if (!product) {
        return next(new Error('Product not found.'));
      }
      console.log(product.imageURL);
      fs.unlink(product.imageURL, (err)=>{
        if(err){
            throw(err);
        }
      });
      return Product.deleteOne({ _id: prodId });
    })
    .then(() => {
      return res.status(200).json({ message: 'Success' });
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};
