import express from 'express'
import { sendOtpToUser } from '../app/controllers/otpController.js'
const otpRouter = express.Router()


otpRouter.post('/otp-sender',sendOtpToUser)

export default otpRouter;