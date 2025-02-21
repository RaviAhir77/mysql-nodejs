import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();




async function sendOtp(email,otp){
    let transporter = nodemailer.createTransport({
        service:'gmail',
        auth:{
            user:process.env.NM_EMAIL,
            pass:process.env.NM_PASS            
        }
    });

    let mailOption = {
        from:process.env.NM_EMAIL,
        to:email,
        subject:'your otp',
        text : `your otp is for a email varification : ${otp}`
    }

    transporter.sendMail(mailOption,function(error,info){
        if (error) {
            console.log('Error:', error);
        } else {
            res.status(200).json({otp : otp})
            console.log('Email sent:', info.response);
        }
    });
}

export default sendOtp;