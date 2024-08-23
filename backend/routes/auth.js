const express = require('express');
const User = require('../models/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser');

const JWT_SECRET = process.env.JWT_SECRET;

//Route 1: Creating a user at /api/auth/createuser.

router.post('/createuser',[
    body('name','Enter a valid Name').isLength({min:3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').isLength({min:5})
    ],

    //if there is an error return bad request

    async (req,res) => {
        let success = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            return res.status(400).json({ success:success,errors: result.array() });
        }
            
        //ensuring no other user is with same email 

        try{
            let user = await User.findOne({email:req.body.email});

            if(user){
                return res.status(400).json({success:success,error:'A user with this email exists, You can Login directly'});
            }

            //generating hashed password

            const salt = bcrypt.genSaltSync(10);
            const secPass = await bcrypt.hash(req.body.password,salt);
            user = await User.create({
                name:req.body.name, 
                email:req.body.email,
                password:secPass
            })

            //providing the user an authtoken

            const data = {
                user:{
                    id:user.id
                }
            }

            const authtoken = jwt.sign(data,JWT_SECRET);
            success=true;
            res.json({success,authtoken})
        }

        //handling internal errors

        catch(e){
            console.log(e.message);
            res.status(500).json({success: false, error: "Some error occurred: " + e.message});
        }        
    }
)


//Route 2: logging a user at /api/auth/login.

router.post('/login',[
    body('email','Enter a valid email').isEmail(),
    body('password','Enter a valid password').exists()
    ],

    //if there is an error return bad request

    async (req,res) => {
        let success = false;
        const result = validationResult(req);
        if (!result.isEmpty()) {
            console.log(result.message);
            return res.status(400).json({ success:false,errors: result.array() });
        }
            
        //ensuring user exists

        const {email,password} = req.body;

        try{
            let user = await User.findOne({email:req.body.email});

            if(!user){
                return res.status(400).json({success:success,error:'No such user exists'});
            }

            //comparing the password with the users' hash

            const passCompare = await bcrypt.compare(password,user.password);
            if(!passCompare){
                return res.json({success:success,error:'Wrong Credentials'});
            }

            //Providing the user an auth-token

            const data = {
                user:{
                    id:user.id
                }
            }
            const authtoken = jwt.sign(data,JWT_SECRET);
            success=true;
            res.json({success,authtoken})
        }

        //handling internal errors

        catch(e){
            console.log(e.message);
            res.status(500).json({success:success,error:"Some error occured"});
        }
    }
)

//Route 3: fetching a users' details at /api/auth/getuser

router.post('/getuser',fetchuser,

    //Here fetchuser is a middleware

    async (req,res) => {
        
        try{
            const userId = req.user.id;
            const user = await User.findById(userId).select("-password");
            res.json({user});
        }

        //handling internal errors

        catch(e){
            console.log(e.message);
            res.status(500).json({success},"Some error occured");
        }
    }
)

module.exports = router