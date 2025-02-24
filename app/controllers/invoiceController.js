import generateHtml from "../../utils/mailHtml.js";
import generateInvoiceHtml from "../../utils/generateInvoiceHtml.js";
import db from '../../config/db.js'
import nodemailer from 'nodemailer';
import dotenv from 'dotenv'
dotenv.config();


class invoiceController{
    static async sendInvoiceEmail(req,res){
        const {email} = req.body

        db.query('SELECT id,name,email FROM user',(err,result) => {
            if(err){
                return res.status(200).json({message : 'something is wrong please try again',err})
            }

            const htmlInvoice = generateInvoiceHtml();

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
                subject:'Your invoice',
                html : htmlInvoice
            }

            transporter.sendMail(mailOption,(error,info) => {
                if(error){
                    return res.status(400).json({message : 'error in a sending mail',error})
                }
                res.status(200).json({message : 'email send successfully : ',info})
            })
        })
    }

}

export default invoiceController;



