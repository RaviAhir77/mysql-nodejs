import express from 'express'
import authController from '../app/controllers/authController.js';
import upload from '../utils/multer.js';
const router = express.Router()

router.post('/user',upload.single('image'),authController.createUser)
router.get('/users',authController.allUser);
router.get('/user/:id',authController.singleUser);
router.put('/update-user',authController.updateUserr);
router.delete('/delete-user',authController.deleteUserr);


export default router