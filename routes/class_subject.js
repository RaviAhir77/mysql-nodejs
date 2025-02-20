import express from 'express'
import class_subjectController from '../app/controllers/class_subjectController.js'

const classSubjectRouter = express.Router();

classSubjectRouter.post('/create-cl_sub',class_subjectController.createClass_subject);
classSubjectRouter.get('/join-user-cl_sub',class_subjectController.findUserClass);
classSubjectRouter.get('/join-teacher',class_subjectController.findTeacherDetails)


export default classSubjectRouter;