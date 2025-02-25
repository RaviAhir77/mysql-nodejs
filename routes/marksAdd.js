import express from "express";
import marksController from "../app/controllers/marksController.js";
import { verifyToken,roleAuthorization } from "../middleware/authMiddleware.js";
const marksRouter = express.Router();

marksRouter.post('/add-marks',verifyToken,roleAuthorization('faculty','admin'),marksController.addMarks);

export default marksRouter