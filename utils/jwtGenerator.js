import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
dotenv.config();

const secret = process.env.JWT_SECRET;

async function generateJwt(data){
    return jwt.sign({id:data.id, username:data.username, usertype:data.usertype},secret,{expiresIn : '5d'})
}

async function verifyJwt(token){
    return jwt.verify(token,secret)
}

export default {generateJwt,verifyJwt}

