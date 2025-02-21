import express from 'express'
import userController from '../app/controllers/userController.js';
const userRouter = express.Router()

userRouter.get('/users',userController.allUser);
userRouter.get('/user/:id',userController.singleUser);
userRouter.get('/pagination',userController.pagination)
userRouter.put('/update-user',userController.updateUserr);
userRouter.delete('/delete-user',userController.deleteUserr);

export default userRouter