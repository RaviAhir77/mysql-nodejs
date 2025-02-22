import express from 'express'
import authController from '../app/controllers/authController.js';
import upload from '../utils/multer.js';
import {tokenHandler} from '../middleware/authMiddleware.js';

const authRouter = express.Router()

authRouter.post('/user',upload.single('image'),authController.createUser)
authRouter.post('/login',tokenHandler,authController.loginUser)
authRouter.post('/jwt-generater',authController.tokenGenerator)

export default authRouter