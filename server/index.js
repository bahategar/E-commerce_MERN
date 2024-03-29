const express = require('express');
const multer = require('multer');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');
const cors = require("cors");
// const session = require('express-session');

require('dotenv').config();

const app = express();
const port = 4000;
const uri = process.env.URI;

const shopRoutes = require('./routes/shop.js');
const adminRoutes = require('./routes/admin.js');
const authRoutes = require('./routes/auth.js');

// Setting multer
const fileStorage = multer.diskStorage({
    destination: (req, file , cb) => {
        cb(null, path.join('public', 'images'));
    },
    filename: (req, file, cb) => {
        cb(null, new Date().toISOString().replace(/:/g, '-') + '-' + file.originalname);
    }
});

const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === 'image/png' || 
        file.mimetype === 'image/jpg' ||
        file.mimetype === 'image/jpeg'
        ) {
            cb(null, true);
        } else {
            cb(null, false);
        }
    };

    
    
// CORS Setting
// app.use(cors());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // res.setHeader('Content-Type', '*');
    next();
});



// Middlewares
app.use('/public/images', express.static(path.join(__dirname, 'public', 'images')));
// app.use(session(
//     { 
//         secret: 'my secret', 
//         resave: false, 
//         saveUninitialized: false,
//     }));
app.use(bodyParser.json());
app.use(multer({storage: fileStorage, file:fileFilter}).single('image'));
// Define the user account.
// app.use((req, res, next) => {
//     console.log(req.session.user);
//     if (!req.session.user) {
//         return next();
//     }
//     User.findById(req.session.user._id)
//         .then(user => {
//             // console.log(user);
//             req.user = user;
//             next();
//         })
//         .catch(err => { 
//             // throw new Error(err);
//             next(new Error(err));
//         });
// });

// Routes
app.use(authRoutes);
app.use(shopRoutes);
app.use(adminRoutes);


app.use((error, req, res, next)=>{
    console.log("ERROR");
    if(!error.httpStatusCode){
        error.httpStatusCode = 500;
    }
    res.status(error.httpStatusCode).json({"error": {"code":error.httpStatusCode, "message":error.message}});
});

mongoose
    .connect(uri)
    .then(result => {
        app.listen(port, ()=>{
            console.log(`Server port is ${port}`);
        })
    })
    .catch(err => {
        console.log(err);
    });