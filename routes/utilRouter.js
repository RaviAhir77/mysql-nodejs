import express from 'express'
import utilController from '../app/controllers/utilController.js'

const utilRouter = express.Router();

utilRouter.get('/pdf-sender',utilController.pdfSender)

export default utilRouter