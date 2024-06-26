

import jwt from 'jsonwebtoken';

const auth=async(req,res,next)=> {

    try {
        var token=req.headers.authorization.split(' ')[1]
        const isCustomAuth=token.length<500;
        let decodedData;
    
        if(token && isCustomAuth) {
            decodedData=jwt.verify(token,'test');
            req.userId=decodedData?.id
        } else {
            decodedData=jwt.decode(token);
            req.userId=decodedData?.sub;
        }
        next();
        
    } catch (error) {
        console.log(error.message);
    }
}

export default auth;