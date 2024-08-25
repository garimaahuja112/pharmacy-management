const jwt=require('jsonwebtoken');

const authMiddleware=(req, res, next) => {
    const authHeader = req.get('Authorization');
    if(!authHeader){
        res.status(401).json({message: 'No token, authorization denied'});
    }

    const token=authHeader.replace('Bearer ', '');
    console.log("Token received:", token);
    try{
        const decoded=jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        next(); 
    } 
    catch(error){
        res.status(401).json({message: 'Token is not valid'});
    }
};

module.exports=authMiddleware;