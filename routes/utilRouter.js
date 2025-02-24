import express from 'express'
import utilController from '../app/controllers/utilController.js'
import invoiceController from '../app/controllers/invoiceController.js';
const utilRouter = express.Router();

utilRouter.get('/pdf-sender',utilController.pdfSender);
utilRouter.get('/pdf-generator',utilController.generatePdf)
utilRouter.post('/invoice-mail',invoiceController.sendInvoiceEmail)

export default utilRouter