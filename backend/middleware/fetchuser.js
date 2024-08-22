const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET;

const fetchuser = (req,res,next) => {
    const token = req.header('auth-token');
    //if token cannot be retrieved
    if(!token){
        res.status(401).send({error:"Token is not valid"});
    }
    
    //find the user with the token and append the req with the user
    try{
        const data = jwt.verify(token,JWT_SECRET);
        req.user = data.user;
        next();
    }catch(e){
        res.status(401).json({error:e.message});
    }
}

module.exports = fetchuser;