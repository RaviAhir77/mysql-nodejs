import jwtGenerator from "../utils/jwtGenerator.js";


const tokenHandler = async(req,res,next) => {
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

        console.log(req.user)
        next()
    }catch(error){
        res.status(400).json({message : 'catch block a authMiddelware'})
    }   
}

export default tokenHandler