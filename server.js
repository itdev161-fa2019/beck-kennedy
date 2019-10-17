import express from 'express';
import connectDatabase from './config/db.js';
import { check, validationResult } from 'express-validator';
import cors from 'cors';
import bcrypt from 'bcryptjs';
import User from './models/User';


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
app.post(
    '/api/users',
    [
        check('name', 'Please enter your name')
            .not()
            .isEmpty(),
    check('email', 'Please enter a valid email').isEmail(),
    check(
        'password', 'Please enter a password with 6 or more characters')
        .isLength({ min: 6 })
    ], 
    async (req, res) => {
    //console.log(req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    } else {
        const { name, email, password} = req.body;
        try {
            //check if user exists
            let user = await User.findOne({ email: email });
            if (user) {
                return res
                    .status(400)
                    .json({ errors: [{ msg: 'User already exists' }] });
            }
        
        //create a new user    
        user = new User({
            name: name,
            email: email,
            password: password
        });

        //encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //save to db and return
        await user.save();
        res.send('User sucessfully register');
    } catch (error) {
        res.status(500).send('Server error');
        }
        //return res.send(req.body);
    }
}
    //res.send(req.body);
);

//connection listener
app.listen(3000, () => console.log('Express server running on port 3000'));