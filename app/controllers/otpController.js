import sendOtp from "../../utils/nodeMailer.js";

import {randomInt} from 'crypto';

export async function sendOtpToUser(req,res){
    const {email} = req.body

    try{
        const otp =  randomInt(100000,999999).toString();
        const result = await sendOtp(email,otp)
        res.status(200).json({message : 'otp sended succussecfully',reciverEmail : email,generatedOtp : otp,})
    }catch(error){
        res.status(500).json({message : 'server error',error})
    }
}
