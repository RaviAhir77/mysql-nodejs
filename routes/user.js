import express from 'express'
import userController from '../app/controllers/userController.js';
import { verifyToken,roleAuthorization } from "../middleware/authMiddleware.js";
const userRouter = express.Router()

userRouter.get('/users',verifyToken,roleAuthorization('admin'),userController.allUser);
userRouter.get('/user/:id',verifyToken,roleAuthorization('admin','student','faculty'),userController.singleUser);
userRouter.get('/pagination',userController.pagination)
userRouter.put('/update-user',verifyToken,roleAuthorization('admin'),userController.updateUserr);
userRouter.delete('/delete-user',verifyToken,roleAuthorization('admin'),userController.deleteUserr);

export default userRouter