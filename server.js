import express from 'express';
import connectDatabase from './config/db.js';
import { check, validationResult } from 'express-validator';
import cors from 'cors';


//const express = require('express');
//const db = require('config/db.js');
//old syntax, its weird, import is more concise

//init express app - calling a function
const app = express();
connectDatabase();

//middleware
app.use(express.json({extended: false}));
app.use(
    cors({
        origin: 'http://localhost:3000'
    })
);
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
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(422).json({ errors: errors.array() });
    } else {
        return res.send(req.body);
    }
    //res.send(req.body);
});

//connection listener
const port = 5000;
app.listen(port, () => console.log(`Express server running on port ${port}`));