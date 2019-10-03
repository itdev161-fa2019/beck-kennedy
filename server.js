import express from 'express';
import connectDatabase from './config/db.js';
import { check, validationResult } from 'express-validator';


//const express = require('express');
//const db = require('config/db.js');
//old syntax, its weird, import is more concise

//init express app - calling a function
const app = express();
connectDatabase();

//middleware
app.use(express.json({extended: false}));

//API endpoints
/**
 * @route GET /
 * @desc Test endpoint
 */
app.get('/', (req, res) => 
    res.send('http get request sent to root api endpoint')
);
/*using express object app has get method which is http get a resource
-getting root page/folder
-has callback defined function with 2 parameters
-takes request and response and does something; an anonymous function
-send those params => that action
*/

/**
 * @route POST api/users
 * @desc register users
 */
app.post('/api/users',[
    check('name', 'Please enter your name').not().isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check('password', 'Please enter a password with 6 or more characters').isLength({ min: 6 })
], (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

//connection listener
app.listen(3000, () => console.log('Express server running on port 3000'));