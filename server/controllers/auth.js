const bcrypt = require('bcryptjs');
const User = require('../models/user.js');
const jwt = require('jsonwebtoken');


exports.postSignup = (req, res, next) => {
    const { email, password } = req.body;
    
    bcrypt
    .hash(password, 12)
    .then(hashedPassword=>{
        const user = new User({
            email: email,
            password: hashedPassword,
            cart: { items: []}
        });
        return user.save();
    })
    .then(result=>{
        console.log("Signup success")
        return res.json({message: 'Success'});
    })
    .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
    });
};

exports.postLogin = (req, res, next)=>{
    const { email, password } = req.body;
    let loadedUser;
    console.log(req.body)

    User.findOne({ email: email })
      .then(user => {
        if (!user) {
            const error = new Error("User not found");
            error.httpStatusCode = 500;
            return next(error);
        }
        loadedUser = user;
        return bcrypt.compare(password, user.password)})
      .then(doMatch=>{
        if(!doMatch){
          const error = new Error("Wrong password");
          error.httpStatusCode = 401;
          return next(error);
        }
        const token = jwt.sign(
          {
            email: loadedUser.email,
            userId: loadedUser._id.toString(),
          }, 'secret', {expiresIn: '6h'});
       return res.status(200).json({ token: token, userId: loadedUser._id.toString() });
      })
      .catch(err => {
        const error = new Error(err);
        error.httpStatusCode = 500;
        return next(error);
      });
  };