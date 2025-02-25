import express from 'express'
import class_subjectController from '../app/controllers/class_subjectController.js'
import { verifyToken,roleAuthorization } from "../middleware/authMiddleware.js";

const classSubjectRouter = express.Router();

classSubjectRouter.post('/create-cl_sub',verifyToken,roleAuthorization('admin'),class_subjectController.createClass_subject);
classSubjectRouter.get('/join-user-cl_sub',verifyToken,roleAuthorization('admin'),class_subjectController.findUserClass);
classSubjectRouter.get('/join-teacher',verifyToken,roleAuthorization('admin'),class_subjectController.findTeacherDetails);
classSubjectRouter.get('/user-marks',verifyToken,roleAuthorization('admin','student'),class_subjectController.joinMarks)


export default classSubjectRouter;