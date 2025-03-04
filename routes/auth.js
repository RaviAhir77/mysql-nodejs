import express from 'express'
import authController from '../app/controllers/authController.js';
import {upload} from '../utils/multer.js';


const authRouter = express.Router()

authRouter.post('/user',upload.single('image'),authController.createUser)
authRouter.post('/login',authController.loginUser)
authRouter.post('/jwt-generater',authController.tokenGenerator)

export default authRouter