import ageGroupController from "../app/controllers/ageGroupController.js";
import express from 'express'

const groupRouter = express.Router()

groupRouter.get('/group-student',ageGroupController.grouper);

export default groupRouter;