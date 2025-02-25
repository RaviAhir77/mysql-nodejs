import express from "express";
import marksController from "../app/controllers/marksController.js";
import { verifyToken,roleAuthorization } from "../middleware/authMiddleware.js";
const marksRouter = express.Router();

marksRouter.post('/add-marks',verifyToken,roleAuthorization('faculty','admin'),marksController.addMarks);
marksRouter.get('/get-marks/:id',verifyToken,roleAuthorization('admin','student'),marksController.findMaksById)
export default marksRouter