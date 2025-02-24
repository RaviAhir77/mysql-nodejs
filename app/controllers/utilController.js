import {generatePdf} from "../models/generatePdf.js";


class utilController{
    static async pdfSender(req,res){
        res.setHeader('Content-disposition','attachment;filename="output.pdf"')
        res.setHeader('Content-type','application/pdf')
        
        await generatePdf(res)
    }
}

export default utilController