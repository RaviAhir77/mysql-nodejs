import express from "express";
import marksController from "../app/controllers/marksController.js";
import { facultyToken } from "../middleware/authMiddleware.js";
const marksRouter = express.Router();

marksRouter.post('/add-marks',facultyToken,marksController.addMarks);

export default marksRouter