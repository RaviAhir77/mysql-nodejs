import jwtGenerator from "../utils/jwtGenerator.js";


export const tokenHandler = async(req,res,next) => {
    const HeaderToken  = req.headers.authorization;
    const token  = HeaderToken && HeaderToken.split(' ')[1];

    if(!token){
        return res.status(400).json({message : 'token is required'})
    }

    try{
        const decode = await jwtGenerator.verifyJwt(token);

        if(!decode){
            return res.status(400).json({message : 'token not valid'})
        }
        
        req.user = decode

        next()
    }catch(error){
        res.status(400).json({message : 'catch block a authMiddelware'})
    }   
}

export const facultyToken = async(req,res,next) => {
    const headerToken = req.headers.authorization;
    const token  = headerToken && headerToken.split(' ')[1];

    if(!token){
        return res.status(400).json({message : 'token is a required'})
    }

    try{
        const decode = await jwtGenerator.verifyJwt(token);

        if(decode.usertype !== 'faculty'){
            return res.status(400).json({message : 'only faculty can a add marks'})
        }

        // req.user = decode;
        next()
    }catch(error){
        res.status(500).json({message : 'faculty token middleware error'})
    }
}
