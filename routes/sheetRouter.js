import SheetController from "../app/controllers/sheetController.js";
import { xlUpload } from "../utils/multer.js";
import express from 'express'

const sheetRouter = express.Router()

sheetRouter.post('/sheet-to-data',xlUpload.single('file'),SheetController.UploadFromFile);
sheetRouter.get('/data-to-sheet',SheetController.exportData)

export default sheetRouter;