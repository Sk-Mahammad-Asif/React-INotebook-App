const express = require('express');
const User = require('../models/User');
const router =  express.Router(); //check for any plugin install or not from video
const { body, validationResult } = require('express-validator'); //npm install --save express-validator    install this into cmd  then import
const bcrypt = require('bcryptjs'); // install for bycrpt package   npm i bcryptjs
var jwt = require('jsonwebtoken'); //install  npm i jsonwebtoken
var fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = 'Harryisagoodb&oy';

/* ***************************************** SignUp **********************************************************/


//Route-1 Create a user using: POST "api/auth/createuser" . No login required  
router.post('/createuser', [

   // set valid name, email, password for exact length for i need.
    body('name', 'Enter a valid name ').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Enter a valid at least password').isLength({ min: 5 }),

], async(req, res)=> {
    
  // If there are errors, return Bad request and the errors copying from here
  //https://express-validator.github.io/docs/
    let success = false;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }

    //use try for error handling
    try{

    //check whether the user with this email already exists
    let user = await User.findOne({email: req.body.email});
    if(user){
      //return status error for email exists
        return res.status(400).json({success, error: "Sorry a user with this email already exists"})
    }

    //ading salt for password encryption/hashing
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);

    //User.js file we have to use this attributes here for create new user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        //for hasing security password
        password: secPass,
        //password: req.body.password,
      });

    // use JWT token for secret code
    const data = {
      user:{
        id : user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
  
    //pass token as json for testing data thunderclient api 
    success = true;
    res.json({success, authtoken})

    }catch (error){
      //for handling error message.
       console.error(error.message);
       res.status(500).send("Some Error Occured");
    }
  
})

/* ***************************************** Login **********************************************************/


// Route-2   Create a user using: POST "api/auth/login" . No login required  
router.post('/login', [

  // set valid name, email, password for exact length for i need.
   body('email', 'Enter a valid email').isEmail(),
   body('password', 'Password cannot be blank').exists(),

], async(req, res)=> {
  let success = false;
   
 // If there are errors, return Bad request and the errors copying from here
 //https://express-validator.github.io/docs/
   const errors = validationResult(req);
   if (!errors.isEmpty()) {
     return res.status(400).json({ errors: errors.array() });
   }
   //Fetching data from user interface such as email and password
   const {email, password} = req.body;

   try{
    //check email already exists or not
    let user = await User.findOne(({email}));
    if(!user){
      success = false;
      return res.status(400).json({success, error: "Please try to login with correct Credentials"});
    }

    //fetching password authentication key & check the password correct or not.
    const passwordcompare = await bcrypt.compare(password, user.password);
    if(!passwordcompare)
    {
      success = false;
      return res.status(400).json({success, error: "Please try to login with correct Credentials"});
    }

    //payload data user id to the server/backend
    const data = {
      user:{
        id : user.id
      }
    }
    const authtoken = jwt.sign(data, JWT_SECRET);
  
    //pass token as json for testing data thunderclient api 
    success = true;
    res.json({success, authtoken})

   }catch (error){
    //for handling error message.
     console.error(error.message);
     res.status(500).send("Internal server error");
  }
})


/****************************************** Decode Password **************************************************/

//Route-3 Create a user using: POST "api/auth/getuser" . No login required 
router.post('/getuser', fetchuser, async(req, res)=> {

  try{
    var userId = req.user.id;
    const user = await User.findById(userId).select("-password")
    res.send(user)

  }catch (error){
    //for handling error message.
     console.error(error.message);
     res.status(500).send("Internal server error");
  }

})



module.exports = router



    
       //useless code

//.then(user => res.json(user))
//.catch(err=> {console.log(err)
//res.json({error: 'Please enter a unique value for email', message: err.message})})
