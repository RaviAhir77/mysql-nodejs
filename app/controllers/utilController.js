import {generatePdf} from "../models/generatePdf.js";
import generateHtml from "../../utils/mailHtml.js";
import puppeteer from "puppeteer";
import db from '../../config/db.js';
import generateInvoiceHtml from "../../utils/generateInvoiceHtml.js";
import fs from 'fs/promises'

class utilController{
    static async pdfSender(req,res){
        res.setHeader('Content-disposition','attachment;filename="output.pdf"')
        res.setHeader('Content-type','application/pdf')
        
        await generatePdf(res)
    }

    static async pdfGenerator(req, res) {
        try {
            const users = await new Promise((resolve, reject) => {
                db.query('SELECT id,name,email FROM user', (err, result) => {
                    if (err) {
                        reject(err)
                    } else if (result.length === 0) {
                        resolve({ message: 'no user found', result: [] })
                    } else {
                        resolve(result)
                    }
                })
            })
    
            const htmlInvoice = generateHtml(users)
            
            const browser = await puppeteer.launch();
            const page = await browser.newPage();
            await page.setContent(htmlInvoice);
            const pdfPath = 'invoice.pdf'
            const pdf = await page.pdf({path : pdfPath,format:'A4'})
            await browser.close()

            res.set({
                'Content-Type': 'application/pdf',
            });

            res.send(pdf)
        } catch (error) {
            console.error('PDF Generation Error:', error);
            res.status(500).json({ message: 'Error generating PDF', error: error.message })
        }
    }


    static async generatePdf(req, res) {
        try {
            const browser = await puppeteer.launch({
                headless: 'new',
                args: ['--no-sandbox', '--disable-setuid-sandbox'],
                dumpio: true,
            });
            const page = await browser.newPage();
    
            console.log(await browser.version());
    
            page.on('error', err => console.error('PAGE ERROR:', err));
            page.on('pageerror', err => console.error('PAGE JS ERROR:', err));
            page.on('console', msg => console.log('PAGE CONSOLE:', msg.type(), msg.text()));
            page.on('requestfailed', request => console.error('REQUEST FAILED:', request.url(), request.failure().errorText));
            page.on('response', response => {if (response.status() >= 400) {console.error('BAD RESPONSE:', response.url(), response.status());}});
            
            
            await page.setContent(`
        <html>
        <head>
            <style>
                body { font-family: Arial, sans-serif; padding: 20px; }
                .invoice-container { max-width: 800px; margin: auto; border: 1px solid #ddd; padding: 20px; }
                .header { display: flex; justify-content: space-between; align-items: center; }
                .header img { width: 80px; }
                .company-info, .client-info { font-size: 14px; }
                .invoice-title { font-size: 28px; margin-top: 20px; }
                .invoice-details { display: flex; justify-content: space-between; margin: 20px 0; }
                .table { width: 100%; border-collapse: collapse; margin-top: 20px; }
                .table th, .table td { border: 1px solid #ddd; padding: 10px; text-align: left; }
                .table th { background: #f4f4f4; }
                .total-section { text-align: right; margin-top: 20px; font-size: 18px; }
                .total-section strong { font-size: 24px; }
                .download-btn { display: block; text-align: center; margin-top: 20px; }
                .button { background:rgba(88, 211, 117, 0.47); color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px; }
            </style>
        </head>
        <body>
            <div class="invoice-container">
                <div class="header">
                    <div class="company-info">
                        <h2>Company Name</h2>
                        <p>567 Street Name<br>City, State ZIP Code<br>Country</p>
                        <p>888-888-8888 | <a href="mailto:contact@email.com">contact@email.com</a><br>companywebsite.com</p>
                    </div>
                    <div>
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/87/Document_text_icon.svg/1200px-Document_text_icon.svg.png" width="80"/>
                    </div>
                </div>
                <hr>
                <div class="client-info">
                    <h3>Billed To:</h3>
                    <p>Your Client<br>Street Address<br>City, State ZIP Code<br>Country</p>
                </div>
                <h1 class="invoice-title">Invoice</h1>
                <div class="invoice-details">
                    <p><strong>Invoice Number:</strong> 00001</p>
                    <p><strong>Date of Issue:</strong> mm/dd/yyyy</p>
                </div>
                <table class="table">
                    <thead>
                        <tr>
                            <th>Description</th>
                            <th>Unit Cost</th>
                            <th>QTY/HR RATE</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Item name</td><td>$0</td><td>1</td><td>$0</td>
                        </tr>
                        <tr>
                            <td>Item name</td><td>$0</td><td>1</td><td>$0</td>
                        </tr>
                        <tr>
                            <td>Item name</td><td>$0</td><td>1</td><td>$0</td>
                        </tr>
                        <tr>
                            <td>Item name</td><td>$0</td><td>1</td><td>$0</td>
                        </tr>
                        <tr>
                            <td>Item name</td><td>$0</td><td>1</td><td>$0</td>
                        </tr>
                    </tbody>
                </table>
                <div class="total-section">
                    <p>Subtotal: $0</p>
                    <p>Discount: $0</p>
                    <p>(Tax Rate) 0%: $0</p>
                    <p><strong>Invoice Total: $5000</strong></p>
                </div>
                
            </div>

            
        </body>
        </html>
    `, { waitUntil: 'networkidle0' });
    
            await page.screenshot({ path: 'debug.png' });
            const pageContent = await page.content();
            console.log("Page Content : ", pageContent);
    
            const pdfBuffer = await page.pdf({
                format: 'A4',
                printBackground: true,
                margin: { top: '20px', right: '20px', bottom: '20px', left: '20px' }
            });
    
            console.log("PDF Buffer Length:", pdfBuffer.length); // Log the buffer length
    
            await browser.close();
    
            res.setHeader('Content-Disposition', 'attachment; filename="invoice.pdf"');
            res.setHeader('Content-Type', 'application/pdf');
            
            res.setHeader('Content-Length', pdfBuffer.length);
            res.end(pdfBuffer, 'binary');
    
        } catch (error) {
            console.error('Error generating PDF:', error);
            res.status(500).json({ message: 'Failed to generate PDF', error: error.toString() });
        }
    }
    
    
}

export default utilController