import express from 'express';
//const express = require('express)
//old syntax, its weird, import is more concise

//init express app - calling a function
const app = express();

//API endpoints
app.get('/', (req, res) => 
    res.send('http get request sent to root api endpoint')
);
/*using express object app has get method which is http get a resource
-getting root page/folder
-has callback defined function with 2 parameters
-takes request and response and does something; an anonymous function
-send those params => that action
*/

//connection listener
app.listen(3000, () => console.log('Express server running on port 3000'));